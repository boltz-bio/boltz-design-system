import * as React from 'react';
import { cn } from '../utils';
import { Button } from './Button';

// Spec: Figma node 57:4853 "Link section"
// Source of truth: components.html `.footer-cta` / `.footer-cta-title` / `.footer-cta-body`
//
// Structure: a vertical list of rows, each with:
//   Left:  heading-sm (24px) + body-md (18px, text-secondary)  — max-w ~880px
//   Right: Button (split-pill, black variant)
//   Separator: border-top (1px, border-light) + py-xl (40px) on each row
//
// Usage (composable):
//   <LinkSection>
//     <LinkSectionRow heading="Partner with us" body="..." cta="Get in touch" href="#" />
//     <LinkSectionRow heading="Join our team"   body="..." cta="View open roles" href="#" />
//   </LinkSection>
//
// Usage (data-driven):
//   <LinkSection items={[{ heading, body, cta, href }]} />

export interface LinkSectionItem {
  heading: React.ReactNode;
  body?: React.ReactNode;
  cta: string;
  href?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// ── LinkSectionRow ────────────────────────────────────────────────────────────

export interface LinkSectionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  body?: React.ReactNode;
  cta?: string;
  href?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const LinkSectionRow = React.forwardRef<HTMLDivElement, LinkSectionRowProps>(
  ({ className, heading, body, cta, href, onCtaClick, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between',
        'border-t border-border-light py-xl',
        'gap-xl',
        className,
      )}
      {...rest}
    >
      {/* Text — heading + body */}
      <div className="flex flex-col gap-md flex-1 min-w-0 max-w-[880px]">
        <h3 className="font-sans font-regular text-heading-sm text-text-primary">
          {heading}
        </h3>
        {body && (
          <p className="font-sans font-regular text-body-md text-text-secondary">
            {body}
          </p>
        )}
      </div>

      {/* CTA */}
      {cta && (
        href
          ? (
            <a href={href} className="flex-shrink-0 no-underline">
              <Button variant="black" onClick={onCtaClick}>
                {cta}
              </Button>
            </a>
          )
          : (
            <Button variant="black" className="flex-shrink-0" onClick={onCtaClick}>
              {cta}
            </Button>
          )
      )}
    </div>
  ),
);
LinkSectionRow.displayName = 'LinkSectionRow';

// ── LinkSection ───────────────────────────────────────────────────────────────

export interface LinkSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Data-driven API — pass items array */
  items?: LinkSectionItem[];
}

export const LinkSection = React.forwardRef<HTMLDivElement, LinkSectionProps>(
  ({ className, items, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col w-full', className)}
      {...rest}
    >
      {items
        ? items.map((item, i) => (
            <LinkSectionRow
              key={i}
              heading={item.heading}
              body={item.body}
              cta={item.cta}
              href={item.href}
              onCtaClick={item.onCtaClick}
            />
          ))
        : children}
    </div>
  ),
);
LinkSection.displayName = 'LinkSection';
