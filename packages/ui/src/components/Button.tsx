import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';

// Source: components.html (designer's HTML reference) + Figma 58:226 componentSet.
// Structure: TWO elements — [label pill] [icon circle], gap 0.
//   Label pill: h 36, padding 0 16, radius 44px, border 1px, body-sm
//   Icon circle: 36×36, radius 44px, border 1px (except Filled where icon has no border)
// Variants from Figma componentSet:
//   - Filled    — on coloured/sage/tierra backgrounds (black label + white-filled icon)
//   - Outlined  — on white/light backgrounds (black label + outlined transparent icon)
//   - White     — on dark/black backgrounds (white label + outlined transparent icon, white/50 border)
//   - Text      — no pill, just text + ↗ at 14px

export type ButtonVariant = 'Filled' | 'Outlined' | 'White' | 'Text';

export interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  variant?: ButtonVariant;
  /** Render as different element. Defaults to <button>; use 'a' for links or pass `asChild` to wrap a Link. */
  as?: 'button' | 'a';
  asChild?: boolean;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const styles: Record<ButtonVariant, { container: string; label: string; icon: string }> = {
  Filled: {
    container: 'inline-flex items-center gap-0',
    label:
      'h-36 px-16 rounded-full border border-black bg-black text-white ' +
      'flex items-center font-sans font-regular text-body-sm leading-none whitespace-nowrap',
    icon:
      'flex items-center justify-center w-36 h-36 rounded-full ' +
      'bg-white text-black text-[14px] shrink-0',
  },
  Outlined: {
    container: 'inline-flex items-center gap-0',
    label:
      'h-36 px-16 rounded-full border border-black bg-black text-white ' +
      'flex items-center font-sans font-regular text-body-sm leading-none whitespace-nowrap',
    icon:
      'flex items-center justify-center w-36 h-36 rounded-full ' +
      'border border-black bg-transparent text-black text-[14px] shrink-0',
  },
  White: {
    container: 'inline-flex items-center gap-0',
    label:
      'h-36 px-16 rounded-full border border-white bg-white text-black ' +
      'flex items-center font-sans font-regular text-body-sm leading-none whitespace-nowrap',
    icon:
      'flex items-center justify-center w-36 h-36 rounded-full ' +
      'border border-white/50 bg-transparent text-white text-[14px] shrink-0',
  },
  Text: {
    // Inherits color from parent so caller can place on light or dark bg via className
    container: 'inline-flex items-center gap-[6px] h-36 text-text-primary',
    label: 'font-sans font-regular text-body-sm leading-none bg-transparent border-0',
    icon: 'text-[14px] leading-none',
  },
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    { variant = 'Outlined', as, asChild, className, disabled, children, ...rest },
    ref,
  ) => {
    const s = styles[variant];
    const Comp = asChild ? Slot : (as ?? (rest.href ? 'a' : 'button')) as 'a' | 'button';
    return (
      <Comp
        // @ts-expect-error — forwardRef union type is wide; runtime is correct
        ref={ref}
        className={cn(
          s.container,
          'transition-colors duration-base ease-standard',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
          'disabled:opacity-60 disabled:pointer-events-none',
          'cursor-pointer no-underline',
          className,
        )}
        {...(disabled ? { 'aria-disabled': true } : {})}
        {...rest}
      >
        {variant === 'Text' ? (
          <>
            <span className={s.label}>{children}</span>
            <span aria-hidden="true" className={s.icon}>↗</span>
          </>
        ) : (
          <>
            <span className={s.label}>{children}</span>
            <span aria-hidden="true" className={s.icon}>↗</span>
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
