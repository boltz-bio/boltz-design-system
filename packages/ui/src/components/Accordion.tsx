import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { Badge, type BadgeProps } from './Badge';
import { cn } from '../utils';
import { focusRing } from '../styles';

// Spec: DESIGN.md `model-accordion-item`
// Figma: node 57:4644 — Accordion with expanded/collapsed items + optional badge
//
// Visual rules:
// - Header: heading-md (32px) title, optional tierra-200 badge pill, +/− toggle
// - Separator: 1px border-border-light below each item
// - Body: body-md text-text-secondary + optional actions slot
// - Motion: duration-slow (350ms) ease-standard for expand/collapse
// - No drop shadows

// ── Badge ────────────────────────────────────────────────────────────────────
// AccordionBadge is a thin alias over the shared <Badge>, defaulting to the
// `tertiary` (tierra) tone used in the model accordion. Pass `variant` to switch
// to primary (sage) / secondary (blue). For standalone use, import <Badge> directly.

export type AccordionBadgeProps = BadgeProps;

export const AccordionBadge = ({ variant = 'tertiary', ...rest }: AccordionBadgeProps) => (
  <Badge variant={variant} {...rest} />
);

// ── Item ─────────────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  value: string;
  title: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const AccordionItem = ({
  value,
  title,
  badge,
  children,
  className,
}: AccordionItemProps) => (
  <RadixAccordion.Item
    value={value}
    className={cn(
      'border-b border-border-light',
      'transition-[border-color,padding] duration-spring ease-spring',
      className,
    )}
  >
    <RadixAccordion.Header asChild>
      <div>
        <RadixAccordion.Trigger
          className={cn(
            'group w-full flex items-center gap-10 py-md',
            'bg-transparent border-none cursor-pointer text-left',
            focusRing,
          )}
        >
          {/* Title + badge cluster left (10px gap from the row); toggle is pushed
              right by the ml-auto on the +/− control below.
              Line-height + tracking come from the text-heading-md token (which is
              responsive) — do not re-specify them here. */}
          <span className="text-heading-md text-text-primary">
            {title}
          </span>
          {badge}
          {/* Animated +/− toggle — vertical bar scales to 0 on open */}
          <span
            aria-hidden="true"
            className="relative inline-flex items-center justify-center w-20 h-20 shrink-0 ml-auto text-text-secondary"
          >
            {/* Horizontal bar — always visible. 1.5px = hairline stroke (not a spacing-scale value). */}
            <span className="absolute w-16 h-[1.5px] bg-current rounded-full" />
            {/* Vertical bar — collapses on open */}
            <span className="absolute w-[1.5px] h-16 bg-current rounded-full transition-transform duration-spring ease-spring origin-center group-data-[state=open]:scale-y-0" />
          </span>
        </RadixAccordion.Trigger>
      </div>
    </RadixAccordion.Header>

    <RadixAccordion.Content
      className={cn(
        'group/content overflow-hidden',
        'data-[state=open]:animate-accordion-open',
        'data-[state=closed]:animate-accordion-close',
      )}
    >
      {/* Content fades + slides up after height starts opening */}
      <div
        className={cn(
          'pb-lg',
          'transition-[opacity,transform] ease-standard',
          // Show: delayed 120ms so height panel opens first, then content fades up
          'group-data-[state=open]/content:opacity-100 group-data-[state=open]/content:translate-y-0 group-data-[state=open]/content:duration-[300ms] group-data-[state=open]/content:delay-[120ms]',
          // Hide: instant fade-down before panel collapses
          'group-data-[state=closed]/content:opacity-0 group-data-[state=closed]/content:translate-y-6 group-data-[state=closed]/content:duration-fast',
        )}
      >
        {children}
      </div>
    </RadixAccordion.Content>
  </RadixAccordion.Item>
);

// ── Actions row ───────────────────────────────────────────────────────────────

export interface AccordionActionsProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionActions = ({ children, className }: AccordionActionsProps) => (
  <div className={cn('flex gap-sm flex-wrap items-center mt-md', className)}>
    {children}
  </div>
);

// ── Root ─────────────────────────────────────────────────────────────────────

export type AccordionProps = (
  | RadixAccordion.AccordionSingleProps
  | RadixAccordion.AccordionMultipleProps
) & { className?: string };

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref) => (
    <RadixAccordion.Root
      ref={ref}
      className={cn('flex flex-col w-full', className)}
      {...(props as RadixAccordion.AccordionSingleProps)}
    />
  ),
);
Accordion.displayName = 'Accordion';
