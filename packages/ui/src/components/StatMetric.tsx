import * as React from 'react';
import { cn } from '../utils';

// Spec: DESIGN.md stat-chip + components.html `.stat-metric` / `.stats-row`
//
// Structure: [value heading-sm] [label body-sm] — inline-flex, gap 8px
//   value: heading-sm (24px), text-primary (or white on dark)
//   label: body-sm (15px), text-secondary (or white/60 on dark)
//
// StatMetricRow: flex-wrap, gap-lg (24px) vertical × gap-2xl (80px) horizontal

type Variant = 'light' | 'dark';

export interface StatMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: React.ReactNode;
  variant?: Variant;
}

export const StatMetric = React.forwardRef<HTMLDivElement, StatMetricProps>(
  ({ className, value, label, variant = 'light', ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('inline-flex items-center gap-[8px]', className)}
      {...rest}
    >
      <span className={cn(
        'font-sans font-regular text-heading-sm whitespace-nowrap',
        variant === 'dark' ? 'text-text-on-dark' : 'text-text-primary',
      )}>
        {value}
      </span>
      <span className={cn(
        'font-sans font-regular text-body-sm whitespace-nowrap',
        variant === 'dark' ? 'text-white/60' : 'text-text-secondary',
      )}>
        {label}
      </span>
    </div>
  ),
);
StatMetric.displayName = 'StatMetric';

// ── StatMetricRow ─────────────────────────────────────────────────────────────
// Wraps a set of StatMetric items with the correct gap:
//   gap-lg (24px) vertically, gap-2xl (80px) horizontally

export interface StatMetricRowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StatMetricRow = React.forwardRef<HTMLDivElement, StatMetricRowProps>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap gap-y-lg gap-x-2xl', className)}
      {...rest}
    >
      {children}
    </div>
  ),
);
StatMetricRow.displayName = 'StatMetricRow';
