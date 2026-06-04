import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';
import { ListItemTab } from './ListItem';
import { MetricComparison, type MetricItem } from './MetricComparison';

// Section — the pricing / comparison band (Figma node 89:451). Eyebrow + heading,
// then a two-column split: selectable feature **tabs** (left) drive the comparison
// **card** (right). Composes existing components only — ListItemTab + MetricComparison.
// Mobile-first: stacks on phones, splits at laptop.

export interface PricingTab {
  icon?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** The comparison shown on the right when this tab is selected. */
  header?: { label: React.ReactNode; value: React.ReactNode };
  items: MetricItem[];
}

export interface PricingSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: React.ReactNode;
  eyebrowIcon?: React.ReactNode;
  heading: React.ReactNode;
  /** Feature tabs — selecting one swaps the comparison card. */
  tabs: PricingTab[];
  defaultIndex?: number;
}

export const PricingSection = React.forwardRef<HTMLElement, PricingSectionProps>(
  ({ className, eyebrow, eyebrowIcon, heading, tabs, defaultIndex = 0, ...rest }, ref) => {
    const [active, setActive] = React.useState(defaultIndex);
    const current = tabs[active] ?? tabs[0];

    return (
      <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
        <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
          {/* Header */}
          <div className="flex flex-col gap-md">
            {eyebrow && <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>}
            <h2 className="text-heading-md text-text-primary max-w-body">{heading}</h2>
          </div>

          {/* Split: feature tabs (left) drive the comparison card (right) */}
          <div className="grid grid-cols-1 gap-xl laptop:grid-cols-2 laptop:gap-2xl items-start">
            <div role="tablist" aria-label="Pricing scenarios" className="flex flex-col gap-sm">
              {tabs.map((tab, i) => (
                <ListItemTab
                  key={i}
                  icon={tab.icon}
                  heading={tab.title}
                  description={tab.body}
                  active={i === active}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>

            {current && <MetricComparison header={current.header} items={current.items} />}
          </div>
        </div>
      </section>
    );
  },
);
PricingSection.displayName = 'PricingSection';
