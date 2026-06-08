import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';

// Section header — the recurring "eyebrow + heading + optional subtitle, with an
// optional action on the right" row that tops most page sections (Our models,
// Community, Use cases…). Stacks on phone; the action moves to the right from
// mobile: (>=768). Built from EyebrowLabel + type tokens — no new colours.

const titleSizes = {
  lg: 'text-heading-lg',
  md: 'text-heading-md',
  sm: 'text-heading-sm',
} as const;

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Eyebrow label text (the `• Section name` kicker). */
  eyebrow?: React.ReactNode;
  /** Icon for the eyebrow label. */
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  /** Heading scale. Default 'md'. */
  titleSize?: keyof typeof titleSizes;
  /** Optional supporting line under the heading. */
  subtitle?: React.ReactNode;
  /** Right-aligned action — a Button, TextButton, or arrow group. */
  action?: React.ReactNode;
  /** Extra classes on the <h2> (e.g. a `max-w-[18ch]` measure). */
  titleClassName?: string;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, eyebrow, eyebrowIcon, title, titleSize = 'md', subtitle, action, titleClassName, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-lg',
        action && 'mobile:flex-row mobile:items-end mobile:justify-between',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col gap-md">
        {(eyebrow || eyebrowIcon) && (
          <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>
        )}
        <h2 className={cn(titleSizes[titleSize], 'text-text-primary', titleClassName)}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-body-md text-text-secondary max-w-body">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  ),
);
SectionHeader.displayName = 'SectionHeader';
