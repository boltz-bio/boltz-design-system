import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Leaf } from 'iconoir-react';
import { cn } from '../utils';

// Spec: DESIGN.md `eyebrow-label` + Figma "Tag" component
//
// Rules:
// - Outlined pill (full radius), body-sm text, sentence case
// - Leading icon: leaf (Iconoir) by default — matches live Figma
// - Bullet variant available — matches DESIGN.md original
// - Light + dark variants for placement on warm/cold vs dark surfaces

const eyebrowVariants = cva(
  [
    'inline-flex items-center gap-sm',
    'font-sans font-regular text-body-sm',
    'rounded-full',
    'px-10 py-4',
  ],
  {
    variants: {
      variant: {
        light: 'border border-border-light text-text-secondary bg-transparent',
        dark: 'border border-white/15 text-white/60 bg-transparent',
      },
    },
    defaultVariants: { variant: 'light' },
  },
);

type Icon = 'leaf' | 'bullet' | 'none';

export interface EyebrowLabelProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof eyebrowVariants> {
  /** Leading marker. `leaf` matches Figma; `bullet` matches DESIGN.md original; `none` for plain text. */
  icon?: Icon;
  children: React.ReactNode;
}

export const EyebrowLabel = React.forwardRef<HTMLSpanElement, EyebrowLabelProps>(
  ({ className, variant, icon = 'leaf', children, ...rest }, ref) => {
    const iconColor = variant === 'dark' ? 'text-sage-medium' : 'text-sage-dark';
    return (
      <span ref={ref} className={cn(eyebrowVariants({ variant }), className)} {...rest}>
        {icon === 'leaf' && (
          <Leaf
            className={iconColor}
            width={14}
            height={14}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
        {icon === 'bullet' && (
          <span aria-hidden="true" className={iconColor}>
            •
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  },
);
EyebrowLabel.displayName = 'EyebrowLabel';
