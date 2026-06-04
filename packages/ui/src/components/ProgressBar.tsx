import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Component — a horizontal fill bar: a rounded track with a rounded fill showing
// how much of a value is reached. Used in comparison/pricing tables (see
// MetricComparison) but reusable anywhere a proportional bar is needed.
//
// Figma node 108:404 (Pricing) — verified via bridge: track = blue-medium
// (#C7E3EE), fill = blue-deep (#165A75), height 20px, full radius.
//
// The fill width is a runtime value (data), so an inline `width: %` is correct —
// it is not a hardcoded design dimension.

const trackVariants = cva('w-full rounded-full overflow-hidden', {
  variants: {
    tone: {
      blue: 'bg-blue-medium',
      sage: 'bg-sage-light',
      neutral: 'bg-surface-secondary',
    },
    size: {
      sm: 'h-8',
      md: 'h-20',
    },
  },
  defaultVariants: { tone: 'blue', size: 'md' },
});

const fillTone: Record<NonNullable<VariantProps<typeof trackVariants>['tone']>, string> = {
  blue: 'bg-blue-deep',
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
  /** Animate the fill from 0 on mount / on value change. Default true. Honours prefers-reduced-motion. */
  animate?: boolean;
  /** Stagger delay (ms) for the fill animation — e.g. row index × 90. */
  delayMs?: number;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, tone, size, label, animate = true, delayMs = 0, ...rest }, ref) => {
    const pct = Math.max(0, Math.min(100, value));
    // Start at 0 and flip to the target after mount so the width transition runs.
    const [shown, setShown] = React.useState(animate ? 0 : pct);
    React.useEffect(() => {
      if (!animate) { setShown(pct); return; }
      const id = requestAnimationFrame(() => setShown(pct));
      return () => cancelAnimationFrame(id);
    }, [pct, animate]);

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
          className={cn(
            'h-full rounded-full',
            fillTone[tone ?? 'blue'],
            animate && 'transition-[width] duration-slow ease-standard-out motion-reduce:transition-none',
          )}
          style={{ width: `${shown}%`, transitionDelay: animate && delayMs ? `${delayMs}ms` : undefined }}
        />
      </div>
    );
  },
);
ProgressBar.displayName = 'ProgressBar';
