import * as React from 'react';
import { cn } from '../utils';
import { StatMetric, StatMetricRow } from './StatMetric';

// Section — the stat band. A full-width page band that surfaces a row of headline metrics.
// Mobile-first: the metrics wrap on narrow screens via StatMetricRow.
//
// `light` (default): light StatMetric variant.
// `dark`: dark StatMetric variant — use on dark backgrounds.

type Variant = 'light' | 'dark';

export interface StatBandProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  variant?: Variant;
  /** The metrics rendered inside the band. */
  stats: { value: React.ReactNode; label: React.ReactNode }[];
}

export const StatBand = React.forwardRef<HTMLElement, StatBandProps>(
  ({ className, stats, variant = 'light', ...rest }, ref) => {
    const dark = variant === 'dark';
    return (
      <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
        <div className="max-w-container mx-auto px-md tablet:px-40">
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
      </section>
    );
  },
);
StatBand.displayName = 'StatBand';
