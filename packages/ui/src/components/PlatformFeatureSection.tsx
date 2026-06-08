import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';
import { CardSmall } from './Card';

// Section — platform feature block (Figma node 246:808).
// A full-width black hero card (eyebrow + heading + body + media) stacked with
// a 4-column row of blue-pale feature cards (icon + title). 8px gap between all cards.

export interface PlatformFeature {
  icon: React.ReactNode;
  title: React.ReactNode;
}

export interface PlatformFeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrowIcon?: React.ReactNode;
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  body?: React.ReactNode;
  /** Right-side media in the hero card — e.g. a laptop screenshot */
  media?: React.ReactNode;
  features: PlatformFeature[];
}

export const PlatformFeatureSection = React.forwardRef<HTMLElement, PlatformFeatureSectionProps>(
  ({ className, eyebrowIcon, eyebrow = 'Platform', heading, body, media, features, ...rest }, ref) => (
    <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
      <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-sm">

        {/* Hero card — black, split: text left + media right. Stacks on phone,
            splits side-by-side at a fixed height from mobile: (>=768). */}
        <div className="relative bg-action-primary rounded-lg overflow-hidden w-full flex flex-col mobile:flex-row mobile:items-stretch mobile:h-[560px]">
          {/* Text column */}
          <div className="flex flex-col gap-md p-xl flex-1 justify-start">
            <EyebrowLabel variant="dark" icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>
            <h2 className="text-heading-md text-text-on-dark max-w-[565px]">{heading}</h2>
            {body && <p className="text-body-md text-white/60 max-w-[460px]">{body}</p>}
          </div>
          {/* Media column */}
          {media && (
            <div className="flex-1 relative overflow-hidden h-[240px] mobile:h-auto">
              {media}
            </div>
          )}
        </div>

        {/* Feature cards row */}
        <div className="grid grid-cols-1 mobile:grid-cols-2 gap-sm laptop:grid-cols-4">
          {features.map((f, i) => (
            <CardSmall
              key={i}
              color="blue-pale"
              icon={f.icon}
              heading={f.title}
              className="h-[320px] justify-between"
            />
          ))}
        </div>

      </div>
    </section>
  ),
);
PlatformFeatureSection.displayName = 'PlatformFeatureSection';
