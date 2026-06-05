import * as React from 'react';
import { cn } from '../utils';

// The base section wrapper every page band builds on — so vertical rhythm and the
// container inset live in ONE place (Figma "use case section" 246:941: 120px top
// & bottom padding on desktop, 136px side gutters = the centred max-w-container).
//
// `spacing` controls the vertical padding:
//   default → 120px desktop (py-3xl), 80px on phones — the standard band rhythm
//   compact → 80px desktop / 40px phones
//   none    → no padding (caller owns it)
// `tone` paints a full-width background; the content sits in a centred container
// unless `bleed` is set.

type SectionTone = 'none' | 'secondary' | 'sage-pale' | 'blue-pale' | 'tierra-100' | 'dark';

const toneStyles: Record<SectionTone, string> = {
  none: '',
  secondary: 'bg-surface-secondary',
  'sage-pale': 'bg-sage-pale',
  'blue-pale': 'bg-blue-pale',
  'tierra-100': 'bg-tierra-100',
  dark: 'bg-surface-card-dark text-text-on-dark',
};

const spacingStyles = {
  default: 'py-2xl tablet:py-3xl', // 80 → 120px
  compact: 'py-xl tablet:py-2xl', // 40 → 80px
  none: '',
} as const;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  spacing?: keyof typeof spacingStyles;
  /** Skip the centred container (content spans full width). */
  bleed?: boolean;
  /** Inner container className (e.g. flex layout). */
  innerClassName?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone = 'none', spacing = 'default', bleed = false, innerClassName, children, ...rest }, ref) => (
    <section
      ref={ref}
      className={cn('w-full', toneStyles[tone], spacingStyles[spacing], className)}
      {...rest}
    >
      {bleed ? (
        children
      ) : (
        <div className={cn('max-w-container mx-auto px-md tablet:px-40', innerClassName)}>{children}</div>
      )}
    </section>
  ),
);
Section.displayName = 'Section';
