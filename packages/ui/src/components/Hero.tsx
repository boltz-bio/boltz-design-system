import * as React from 'react';
import { cn } from '../utils';
import { SplitSection, type SplitSectionProps } from './SplitSection';

// Section — the page hero. Headline (heading-lg) + lead copy + actions,
// with an optional media slot (e.g. the protein render). Built on SplitSection,
// so it stacks on mobile and splits on laptop. Use once per page, near the top.

export interface HeroProps {
  heading: React.ReactNode;
  body?: React.ReactNode;
  /** CTA row (Buttons / TextButtons). */
  actions?: React.ReactNode;
  /** Visual slot (protein render, image). Omit for a text-only hero. */
  media?: React.ReactNode;
  mediaPosition?: SplitSectionProps['mediaPosition'];
  background?: SplitSectionProps['background'];
  className?: string;
}

export const Hero = ({
  heading, body, actions, media,
  mediaPosition = 'right', background, className,
}: HeroProps) => {
  const dark = background === 'dark';
  return (
    <SplitSection
      className={className}
      background={background}
      media={media}
      mediaPosition={mediaPosition}
      content={
        <>
          <h1 className={cn('text-heading-lg', dark ? 'text-text-on-dark' : 'text-text-primary')}>
            {heading}
          </h1>
          {body && (
            <p className={cn('text-body-lg max-w-hero', dark ? 'text-white/60' : 'text-text-secondary')}>
              {body}
            </p>
          )}
          {actions && <div className="flex gap-md mt-md flex-wrap items-center">{actions}</div>}
        </>
      }
    />
  );
};
Hero.displayName = 'Hero';
