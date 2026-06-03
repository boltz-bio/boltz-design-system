import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';

// Source: components.html `.nav-cta` + Figma node 58:243.
// Structure: ONE continuous outer pill with INNER 28×28 circle on the right.
// Outer pill: h 36, padding 4px 4px 4px 16px, radius full, body-sm.
// Inner circle: 28×28, radius full, bg contrasts outer (white on dark / black on light).
// Variants:
//   - dark — black outer pill, white inner circle (for light surfaces). The "Get early access" default.
//   - light — white outer pill, black inner circle (for dark surfaces).

export type NavCtaVariant = 'dark' | 'light';

export interface NavCtaProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  variant?: NavCtaVariant;
  as?: 'button' | 'a';
  asChild?: boolean;
  href?: string;
  children: React.ReactNode;
}

export const NavCta = React.forwardRef<HTMLElement, NavCtaProps>(
  ({ variant = 'dark', as, asChild, className, children, ...rest }, ref) => {
    const isDark = variant === 'dark';
    const outer = isDark ? 'bg-black text-white' : 'bg-white text-black border border-border-light';
    const inner = isDark ? 'bg-white text-black' : 'bg-black text-white';
    const Comp = asChild ? Slot : (as ?? (rest.href ? 'a' : 'button')) as 'a' | 'button';

    return (
      <Comp
        // @ts-expect-error union ref
        ref={ref}
        className={cn(
          'inline-flex items-center justify-between gap-sm',
          'h-36 pl-16 pr-[4px] rounded-full',
          'font-sans font-regular text-body-sm leading-none no-underline cursor-pointer',
          'transition-colors duration-base ease-standard',
          outer,
          className,
        )}
        {...rest}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex items-center justify-center w-28 h-28 rounded-full shrink-0 text-[13px]',
            inner,
          )}
        >
          ↗
        </span>
      </Comp>
    );
  },
);
NavCta.displayName = 'NavCta';
