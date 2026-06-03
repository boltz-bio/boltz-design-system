import * as React from 'react';
import { cn } from '../utils';
import { CardWide } from './Card';

// Section — the call-to-action band. A full-width page region that wraps a single
// CardWide (eyebrow + heading + body + CTA, optional image) in the standard section
// container and vertical rhythm. Use once per page to drive the primary action.

export interface CTABandProps {
  eyebrowIcon?: React.ReactNode;
  eyebrowLabel?: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Optional image rendered in the right half of the CardWide. */
  image?: React.ReactNode;
  className?: string;
}

export const CTABand = React.forwardRef<HTMLElement, CTABandProps>(
  ({ className, eyebrowIcon, eyebrowLabel, heading, body, cta, onCtaClick, image }, ref) => (
    <section ref={ref} className={cn('w-full py-2xl', className)}>
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <CardWide
          eyebrowIcon={eyebrowIcon}
          eyebrowLabel={eyebrowLabel}
          heading={heading}
          body={body}
          cta={cta}
          onCtaClick={onCtaClick}
          image={image}
        />
      </div>
    </section>
  ),
);
CTABand.displayName = 'CTABand';
