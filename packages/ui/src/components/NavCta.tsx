import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';

// Spec: DESIGN.md `nav-cta` + Figma "Nav button" component
// - Filled black pill, h 36, body-sm, ↗ suffix
// - Used as the persistent nav CTA ("Get early access ↗")

export interface NavCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const NavCta = React.forwardRef<HTMLButtonElement, NavCtaProps>(
  ({ className, asChild, children, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center gap-sm',
          'h-36 px-20',
          'rounded-full bg-action-primary text-text-on-dark',
          'font-sans font-regular text-body-sm',
          'transition-colors duration-base ease-standard',
          'hover:bg-action-primary-active active:scale-active',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
          className,
        )}
        {...rest}
      >
        <span>{children}</span>
        <span aria-hidden="true" className="leading-none">
          ↗
        </span>
      </Comp>
    );
  },
);
NavCta.displayName = 'NavCta';
