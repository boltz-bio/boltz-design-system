import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Spec: DESIGN.md `button-primary`, `button-secondary`, `button-white`
// + Figma componentSet "Primary button" with variants Filled / outlined / white
//
// Rules:
// - Full pill (rounded-full) — Boltz canonical shape
// - body-md (18px) text — DESIGN.md: "Button text = body-md. No separate button token"
// - ↗ suffix on CTA — typographic by default, opt into icon-button via suffix="arrow-icon"
// - Active scale 0.97 — Boltz motion signature

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-sm',
    'font-sans font-regular text-body-md',
    'rounded-full',
    'transition-colors duration-base ease-standard',
    'active:scale-active',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
    'disabled:opacity-60 disabled:pointer-events-none',
  ],
  {
    variants: {
      intent: {
        primary:
          'bg-action-primary text-text-on-dark hover:bg-action-primary-active active:bg-action-primary-active',
        secondary:
          'bg-transparent text-text-primary border border-border-light hover:bg-surface-secondary active:bg-surface-secondary',
        onDark:
          'bg-white text-text-primary hover:bg-tierra-50 active:bg-tierra-50',
      },
      size: {
        md: 'h-10 px-18 py-10', // matches DESIGN.md padding "10px 18px"
        sm: 'h-9 px-14 py-8',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

type Suffix = 'arrow-text' | 'arrow-icon' | 'none';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Trailing ↗ marker. `arrow-text` is the typographic character; `arrow-icon` is the circular outlined icon-button. */
  suffix?: Suffix;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, intent, size, asChild, suffix = 'arrow-text', children, ...rest },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ intent, size }), className)}
        {...rest}
      >
        <span>{children}</span>
        {suffix === 'arrow-text' && (
          <span aria-hidden="true" className="leading-none">
            ↗
          </span>
        )}
        {suffix === 'arrow-icon' && (
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center h-28 w-28 rounded-full border border-current"
          >
            ↗
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
