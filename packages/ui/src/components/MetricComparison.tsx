import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';
import { ProgressBar } from './ProgressBar';
import { interactive, focusRing } from '../styles';

// Component — a comparison card: an optional header row, a list of labelled rows
// (label + value + proportional ProgressBar), and an optional Cost/Time toggle
// that swaps the dataset. Figma node 108:404 (Pricing). Bars are scaled relative
// to the largest value in the active mode.
//
// Built from the screenshots + tokens while the Figma bridge was down — verify
// exact surface/fill variables when reconnected.

const cardVariants = cva('rounded-xl p-xl flex flex-col gap-lg', {
  variants: {
    background: {
      blue: 'bg-blue-light',
      sage: 'bg-sage-pale',
      none: 'bg-surface-secondary',
    },
  },
  defaultVariants: { background: 'blue' },
});

export interface MetricDatum {
  /** Displayed value, e.g. "$2,700". */
  display: React.ReactNode;
  /** Numeric value used to size the bar (relative to the largest in the mode). */
  value: number;
}

export interface MetricItem {
  label: React.ReactNode;
  cost: MetricDatum;
  /** Optional alternate dataset; presence enables the Cost/Time toggle. */
  time?: MetricDatum;
}

export interface MetricComparisonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof cardVariants> {
  /** Optional header row (label left, value right) above a divider. */
  header?: { label: React.ReactNode; value: React.ReactNode };
  items: MetricItem[];
  /** Toggle labels — shown only when items carry `time`. Default ['Cost', 'Time']. */
  modes?: [string, string];
  defaultMode?: 'cost' | 'time';
}

export const MetricComparison = React.forwardRef<HTMLDivElement, MetricComparisonProps>(
  ({ className, header, items, modes = ['Cost', 'Time'], defaultMode = 'cost', background, ...rest }, ref) => {
    const hasTime = items.some((i) => i.time);
    const [mode, setMode] = React.useState<'cost' | 'time'>(defaultMode);
    const active = mode === 'time' && hasTime ? 'time' : 'cost';
    const datum = (i: MetricItem) => (active === 'time' && i.time ? i.time : i.cost);
    const max = Math.max(...items.map((i) => datum(i).value), 1);

    return (
      <div ref={ref} className={cn(cardVariants({ background }), className)} {...rest}>
        {header && (
          <div className="flex flex-col gap-lg">
            <div className="flex items-baseline justify-between gap-md">
              <span className="text-heading-sm text-text-primary">{header.label}</span>
              <span className="text-heading-sm text-text-primary">{header.value}</span>
            </div>
            <hr className="border-0 border-t border-border-light" />
          </div>
        )}

        <ul className="flex flex-col gap-lg">
          {items.map((item, i) => {
            const d = datum(item);
            return (
              <li key={i} className="flex flex-col gap-sm">
                <div className="flex items-baseline justify-between gap-md">
                  <span className="text-body-md text-text-primary">{item.label}</span>
                  <span className="text-body-md text-text-primary whitespace-nowrap">{d.display}</span>
                </div>
                <ProgressBar value={(d.value / max) * 100} label={`${item.label}`} delayMs={i * 90} />
              </li>
            );
          })}
        </ul>

        {hasTime && (
          <div className="flex justify-end gap-md">
            {(['cost', 'time'] as const).map((m, idx) => (
              <button
                key={m}
                type="button"
                aria-pressed={active === m}
                onClick={() => setMode(m)}
                className={cn(
                  'text-body-sm rounded-full',
                  interactive,
                  focusRing,
                  active === m ? 'text-text-primary' : 'text-text-secondary',
                )}
              >
                {modes[idx]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
MetricComparison.displayName = 'MetricComparison';
