import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { cn } from '../utils';

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

export interface AccordionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionBadge = ({ children, className }: AccordionBadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center justify-center h-[28px] px-[12px]',
      'bg-tierra-200 text-text-primary',
      'font-sans font-regular text-body-sm',
      'rounded-full shrink-0',
      className,
    )}
  >
    {children}
  </span>
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
    className={cn('border-b border-border-light', className)}
  >
    <RadixAccordion.Header asChild>
      <div>
        <RadixAccordion.Trigger
          className={cn(
            'group w-full flex items-end gap-[10px] py-md',
            'bg-transparent border-none cursor-pointer text-left',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
          )}
        >
          <span className="font-sans font-regular text-heading-md text-text-primary leading-[1.2] tracking-[-0.02em] flex-1">
            {title}
          </span>
          {badge}
          {/* +/− toggle — DESIGN.md uses typographic characters, Figma confirms */}
          <span
            aria-hidden="true"
            className="font-sans font-regular text-heading-md text-text-secondary leading-none select-none ml-auto shrink-0"
          >
            <span className="group-data-[state=open]:hidden">+</span>
            <span className="group-data-[state=closed]:hidden">−</span>
          </span>
        </RadixAccordion.Trigger>
      </div>
    </RadixAccordion.Header>

    <RadixAccordion.Content
      className={cn(
        'overflow-hidden',
        'data-[state=open]:animate-accordion-open',
        'data-[state=closed]:animate-accordion-close',
      )}
    >
      <div className="pb-lg">{children}</div>
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
