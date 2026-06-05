import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';
import { focusRing, interactive } from '../styles';

// Spec: Figma node 57:2560 (carousel arrow group) + the icon-circle inside Button.
// A circular, icon-only button — the single home for round icon controls (carousel
// arrows, etc.) so we don't re-declare a bordered circle in every component.
//
// Figma states: 36×36, transparent fill, 1px border in action-primary (#232323).
//   active   → opacity 1
//   inactive → opacity 0.5  (use `disabled`)

const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0 rounded-full border',
    'transition-colors duration-base ease-standard active:scale-active',
    // Figma inactive state is the whole control at 50% opacity.
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-36 w-36', // 36×36 — carousel arrows
        md: 'h-40 w-40',
        lg: 'h-44 w-44',
      },
      variant: {
        // On light backgrounds: dark border, fills dark on hover.
        outline:
          'border-action-primary text-text-primary bg-transparent hover:bg-action-primary hover:text-text-on-dark',
        // On dark backgrounds.
        'outline-on-dark':
          'border-white/50 text-white bg-transparent hover:bg-white hover:text-text-primary',
      },
    },
    defaultVariants: { size: 'sm', variant: 'outline' },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Required for screen readers — the button has no text label. */
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, variant, type = 'button', children, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ size, variant }), interactive, focusRing, className)}
      {...rest}
    >
      {children}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
