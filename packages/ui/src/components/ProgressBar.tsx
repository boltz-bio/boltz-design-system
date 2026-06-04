import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Component — a horizontal fill bar: a rounded track with a rounded fill showing
// how much of a value is reached. Used in comparison/pricing tables (see
// MetricComparison) but reusable anywhere a proportional bar is needed.
//
// Figma node 108:404 / 89:451 (Pricing). NOTE: exact fill colour built from the
// design screenshots + nearest token (blue-dark) while the Figma bridge was down —
// verify the bound colour variable when the bridge is back.
//
// The fill width is a runtime value (data), so an inline `width: %` is correct —
// it is not a hardcoded design dimension.

const trackVariants = cva('w-full rounded-full overflow-hidden', {
  variants: {
    tone: {
      blue: 'bg-blue-light',
      sage: 'bg-sage-light',
      neutral: 'bg-surface-secondary',
    },
    size: {
      sm: 'h-8',
      md: 'h-16',
    },
  },
  defaultVariants: { tone: 'blue', size: 'md' },
});

const fillTone: Record<NonNullable<VariantProps<typeof trackVariants>['tone']>, string> = {
  blue: 'bg-blue-dark',
  sage: 'bg-sage-dark',
  neutral: 'bg-action-primary',
};

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role' | 'aria-valuenow'>,
    VariantProps<typeof trackVariants> {
  /** Fill amount, 0–100. Clamped. */
  value: number;
  /** Accessible label for the bar (e.g. "Boltz API cost"). */
  label?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, tone, size, label, ...rest }, ref) => {
    const pct = Math.max(0, Math.min(100, value));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn(trackVariants({ tone, size }), className)}
        {...rest}
      >
        <div
          className={cn('h-full rounded-full', fillTone[tone ?? 'blue'])}
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  },
);
ProgressBar.displayName = 'ProgressBar';
