import * as React from 'react';
import { Leaf } from 'iconoir-react';
import { cn } from '../utils';

// Source: components.html `.tag` + Figma 58:294 component.
// Structure: TWO elements — [icon circle 28×28] [label pill 28h], gap 0, label margin-left -1px to overlap borders.
// Variants:
//   - light — on white/light surfaces: 1px black border, text-primary text
//   - dark  — on dark/black surfaces: 1px white/40 border, text-white/70

export type EyebrowVariant = 'light' | 'dark';

export interface EyebrowLabelProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  variant?: EyebrowVariant;
  /** Iconoir icon element. Defaults to <Leaf />. */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const EyebrowLabel = React.forwardRef<HTMLSpanElement, EyebrowLabelProps>(
  (
    { variant = 'light', icon = <Leaf width={14} height={14} strokeWidth={1.5} />, className, children, ...rest },
    ref,
  ) => {
    const isDark = variant === 'dark';
    const borderColor = isDark ? 'border-white/40' : 'border-black';
    const textColor = isDark ? 'text-white/70' : 'text-text-primary';

    return (
      <span ref={ref} className={cn('inline-flex items-center gap-0', className)} {...rest}>
        <span
          className={cn(
            'flex items-center justify-center w-28 h-28 rounded-full border bg-transparent shrink-0',
            'text-[14px]',
            borderColor,
            textColor,
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span
          className={cn(
            'flex items-center h-28 px-12 -ml-px rounded-full border whitespace-nowrap',
            'font-sans font-regular text-body-sm',
            borderColor,
            textColor,
          )}
        >
          {children}
        </span>
      </span>
    );
  },
);
EyebrowLabel.displayName = 'EyebrowLabel';
