import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';
import { StatMetric, StatMetricRow } from './StatMetric';

// Section — the stat band. A full-width page band that surfaces a row of headline
// metrics inside a rounded surface panel, with an optional eyebrow label above it.
// Mobile-first: the metrics wrap on narrow screens via StatMetricRow.
//
// `light` (default): secondary surface panel, light StatMetric + eyebrow.
// `dark`: action-primary panel, dark StatMetric + eyebrow.

type Variant = 'light' | 'dark';

const panelVariants = cva('rounded-lg p-xl', {
  variants: {
    variant: {
      light: 'bg-surface-secondary',
      dark: 'bg-action-primary',
    },
  },
  defaultVariants: { variant: 'light' },
});

export interface StatBandProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    VariantProps<typeof panelVariants> {
  /** Optional eyebrow label rendered above the panel. */
  eyebrow?: React.ReactNode;
  /** Icon for the eyebrow circle. Pass `null` for a text-only eyebrow. */
  eyebrowIcon?: React.ReactNode;
  /** The metrics rendered inside the panel. */
  stats: { value: React.ReactNode; label: React.ReactNode }[];
}

export const StatBand = React.forwardRef<HTMLElement, StatBandProps>(
  ({ className, eyebrow, eyebrowIcon, stats, variant = 'light', ...rest }, ref) => {
    const dark = variant === 'dark';
    return (
      <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
        <div className="max-w-container mx-auto px-md tablet:px-40">
          {eyebrow && (
            <div className="mb-lg">
              <EyebrowLabel variant={dark ? 'dark' : 'light'} icon={eyebrowIcon ?? null}>
                {eyebrow}
              </EyebrowLabel>
            </div>
          )}
          <div className={cn(panelVariants({ variant }))}>
            <StatMetricRow>
              {stats.map((stat, i) => (
                <StatMetric
                  key={i}
                  value={stat.value}
                  label={stat.label}
                  variant={dark ? 'dark' : 'light'}
                />
              ))}
            </StatMetricRow>
          </div>
        </div>
      </section>
    );
  },
);
StatBand.displayName = 'StatBand';
