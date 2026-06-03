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
            'group w-full flex items-center gap-[10px] py-md',
            'bg-transparent border-none cursor-pointer text-left',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
          )}
        >
          <span className="font-sans font-regular text-heading-md text-text-primary leading-[1.2] tracking-[-0.02em] flex-1">
            {title}
          </span>
          {badge}
          {/* Animated +/− toggle — vertical bar scales to 0 on open */}
          <span
            aria-hidden="true"
            className="relative inline-flex items-center justify-center w-[20px] h-[20px] shrink-0 ml-auto text-text-secondary"
          >
            {/* Horizontal bar — always visible */}
            <span className="absolute w-[16px] h-[1.5px] bg-current rounded-full" />
            {/* Vertical bar — collapses on open */}
            <span className="absolute w-[1.5px] h-[16px] bg-current rounded-full transition-transform duration-spring ease-spring origin-center group-data-[state=open]:scale-y-0" />
          </span>
        </RadixAccordion.Trigger>
      </div>
    </RadixAccordion.Header>

    <RadixAccordion.Content
      className={cn(
        'group overflow-hidden',
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
          'group-data-[state=open]:opacity-100 group-data-[state=open]:translate-y-0 group-data-[state=open]:duration-[300ms] group-data-[state=open]:delay-[120ms]',
          // Hide: instant fade-down before panel collapses
          'group-data-[state=closed]:opacity-0 group-data-[state=closed]:translate-y-[6px] group-data-[state=closed]:duration-[100ms]',
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
