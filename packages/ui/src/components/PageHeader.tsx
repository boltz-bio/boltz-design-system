import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';

// Section — the page header. A full-width band opening a content page (News,
// Docs, etc.) with an eyebrow label, an h1 headline, and optional lead copy.
// Mobile-first: stacks naturally; body width is capped at `max-w-body`.

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Optional eyebrow label rendered above the heading. */
  eyebrow?: React.ReactNode;
  /** Icon for the eyebrow circle. Pass `null` for a text-only eyebrow. */
  eyebrowIcon?: React.ReactNode;
  /** The page headline. */
  heading: React.ReactNode;
  /** Optional supporting copy below the heading. */
  body?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ className, eyebrow, eyebrowIcon, heading, body, ...rest }, ref) => (
    <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
      <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-lg">
        {eyebrow && (
          <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>
        )}
        <h1 className="text-heading-lg text-text-primary">{heading}</h1>
        {body && (
          <p className="text-body-lg text-text-secondary max-w-body">{body}</p>
        )}
      </div>
    </section>
  ),
);
PageHeader.displayName = 'PageHeader';
