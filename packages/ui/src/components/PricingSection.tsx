import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';

// Section — the pricing / comparison band (Figma node 89:451). Eyebrow + heading,
// then a two-column split: a feature list on the left and a comparison card slot
// on the right (drop in <MetricComparison>). Mobile-first: stacks on phones,
// splits at laptop. Composes existing components only.

export interface PricingFeature {
  icon?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Highlights the row with a tinted surface (the selected feature). */
  active?: boolean;
}

export interface PricingSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: React.ReactNode;
  eyebrowIcon?: React.ReactNode;
  heading: React.ReactNode;
  features: PricingFeature[];
  /** Comparison card slot — typically a <MetricComparison>. */
  card: React.ReactNode;
}

export const PricingSection = React.forwardRef<HTMLElement, PricingSectionProps>(
  ({ className, eyebrow, eyebrowIcon, heading, features, card, ...rest }, ref) => (
    <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
      <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
        {/* Header */}
        <div className="flex flex-col gap-md">
          {eyebrow && <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>}
          <h2 className="text-heading-md text-text-primary max-w-body">{heading}</h2>
        </div>

        {/* Split: feature list + comparison card */}
        <div className="grid grid-cols-1 gap-xl laptop:grid-cols-2 laptop:gap-2xl items-start">
          <ul className="flex flex-col gap-sm">
            {features.map((f, i) => (
              <li
                key={i}
                className={cn(
                  'flex gap-md rounded-lg p-lg',
                  f.active ? 'bg-blue-pale' : 'bg-transparent',
                )}
              >
                {f.icon && (
                  <span aria-hidden="true" className="flex-shrink-0 text-text-primary">{f.icon}</span>
                )}
                <div className="flex flex-col gap-sm">
                  <h3 className="text-heading-sm text-text-primary">{f.title}</h3>
                  {f.body && <p className="text-body-md text-text-secondary">{f.body}</p>}
                </div>
              </li>
            ))}
          </ul>

          <div>{card}</div>
        </div>
      </div>
    </section>
  ),
);
PricingSection.displayName = 'PricingSection';
