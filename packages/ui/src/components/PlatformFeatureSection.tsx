import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';

// Section — platform feature block (Figma node 246:808).
// A full-width black hero card (eyebrow + heading + body + media) stacked with
// a 4-column row of surface-secondary feature cards (visual + title + description).

export interface PlatformFeature {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Line-art visual shown above the title (preferred over icon). */
  visual?: React.ReactNode;
}

export interface PlatformFeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrowIcon?: React.ReactNode;
  eyebrow?: React.ReactNode;
  /** Hero card heading. Omit to render only the feature tiles (no black card). */
  heading?: React.ReactNode;
  body?: React.ReactNode;
  /** Right-side media in the hero card — e.g. a laptop screenshot */
  media?: React.ReactNode;
  features: PlatformFeature[];
}

export const PlatformFeatureSection = React.forwardRef<HTMLElement, PlatformFeatureSectionProps>(
  ({ className, eyebrowIcon, eyebrow = 'Platform', heading, body, media, features, ...rest }, ref) => (
    <section ref={ref} className={cn('w-full py-xl tablet:py-2xl', className)} {...rest}>
      <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-sm">

        {/* Hero card — black, split: text left + media right. Rendered only when a
            heading is provided; omit it to render just the feature tiles. */}
        {heading && (
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
        )}

        {/* Feature cards row — on phones a swipeable row (each card 80% wide, so
            the next one peeks in as a cue; bleeds to the screen edges and snaps
            card by card) instead of a tall stack. 2-up grid from `mobile:` (an
            odd last card spans the row so it isn't left half-empty); three
            tiles go 3-up from `tablet:`, four go 4-up at `laptop:`. */}
        <div
          className={cn(
            'flex gap-sm overflow-x-auto snap-x snap-mandatory scroll-px-md -mx-md px-md',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'mobile:grid mobile:grid-cols-2 mobile:items-stretch mobile:overflow-visible mobile:mx-0 mobile:px-0',
            features.length === 3 ? 'tablet:grid-cols-3' : 'laptop:grid-cols-4',
          )}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className={cn(
                // Phones: no fixed height so the row's default stretch makes every card
                // as tall as the tallest (a % height would block that); grid from `mobile:`.
                'flex flex-col self-stretch w-4/5 shrink-0 snap-start mobile:h-full mobile:w-auto mobile:shrink rounded-lg border border-border-light bg-surface-secondary overflow-hidden',
                // Odd count: last card spans the 2-up row, back to one column once
                // the grid widens (3-up at tablet for three, 4-up at laptop otherwise).
                features.length % 2 === 1 && i === features.length - 1 &&
                  (features.length === 3 ? 'mobile:col-span-2 tablet:col-span-1' : 'mobile:col-span-2 laptop:col-span-1'),
              )}
            >
              <div className="flex p-lg h-[210px]">
                {f.visual ?? (f.icon ? <div className="m-auto text-text-primary">{f.icon}</div> : null)}
              </div>
              <div className="flex flex-col gap-xs p-lg pt-0">
                <h3 className="text-heading-sm text-text-primary">{f.title}</h3>
                {f.description && <p className="text-body-sm text-text-secondary">{f.description}</p>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  ),
);
PlatformFeatureSection.displayName = 'PlatformFeatureSection';
