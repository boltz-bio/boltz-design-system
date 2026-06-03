import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Spec: DESIGN.md `card-light`, `card-dark`, `card-blue`
// - radius lg (16px), padding lg (24px)
// - card-light: white bg, text-primary, 1px border-light
// - card-dark: bg surface-card-dark, white text, no border
// - card-blue: bg blue-pale, text-primary, no border

const cardVariants = cva(['rounded-lg', 'p-lg'], {
  variants: {
    variant: {
      light: 'bg-surface-card-light text-text-primary border border-border-light',
      dark: 'bg-surface-card-dark text-text-on-dark',
      blue: 'bg-surface-card-blue text-text-primary',
    },
  },
  defaultVariants: { variant: 'light' },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...rest }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...rest} />
  ),
);
Card.displayName = 'Card';
