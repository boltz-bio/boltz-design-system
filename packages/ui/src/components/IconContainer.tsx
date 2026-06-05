import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Spec: DESIGN.md `icon-container` + `icon-container-dark`
// - 40×40, radius md (10px)
// - Background: surface-secondary on light, white/10 on dark
// - Icon color: text-secondary on light, white on dark

const iconContainerVariants = cva(
  ['inline-flex items-center justify-center', 'h-40 w-40'],
  {
    variants: {
      variant: {
        light: 'text-text-secondary',
        dark: 'text-white',
      },
    },
    defaultVariants: { variant: 'light' },
  },
);

export interface IconContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {
  children: React.ReactNode;
}

export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, variant, children, ...rest }, ref) => (
    <div ref={ref} className={cn(iconContainerVariants({ variant }), className)} {...rest}>
      {children}
    </div>
  ),
);
IconContainer.displayName = 'IconContainer';
