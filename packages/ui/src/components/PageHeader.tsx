import * as React from 'react';
import { cn } from '../utils';

// Section — the page header. A full-width band opening a content page (News,
// Docs, etc.) with an h1 headline and optional lead copy.
// Mobile-first: stacks naturally; body width is capped at `max-w-body`.

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** The page headline. */
  heading: React.ReactNode;
  /** Optional supporting copy below the heading. */
  body?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ className, heading, body, ...rest }, ref) => (
    <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
      <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-lg">
        <h1 className="text-heading-lg text-text-primary">{heading}</h1>
        {body && (
          <p className="text-body-lg text-text-secondary max-w-body">{body}</p>
        )}
      </div>
    </section>
  ),
);
PageHeader.displayName = 'PageHeader';
