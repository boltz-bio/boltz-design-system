import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';
import { focusRing, disabledState, interactive } from '../styles';

// Spec: DESIGN.md text button variant + Figma node 58-134
// Source of truth: components.html `.btn--text` / `.btn--text-dark`
//
// Structure: plain text — no pill, no border, no background.
//   body-sm (15px), inline-flex, optional ↗ suffix.
//
// Variants:
//   light (default) — black text  → light backgrounds
//   dark            — white text  → dark backgrounds

const textButtonVariants = cva(
  [
    'group relative inline-flex items-center gap-6',
    'h-36 bg-transparent border-none',
    'text-body-sm whitespace-nowrap',
    interactive,
    focusRing,
    disabledState,
  ],
  {
    variants: {
      variant: {
        light: 'text-text-primary',
        dark: 'text-text-on-dark',
      },
    },
    defaultVariants: { variant: 'light' },
  },
);

export interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textButtonVariants> {
  /** Show ↗ arrow after text. Defaults to false. */
  arrow?: boolean;
}

export const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ className, variant, arrow = false, children, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(textButtonVariants({ variant }), className)}
      {...rest}
    >
      {children}
      {arrow && (
        <span aria-hidden="true" className="leading-none text-[13px]">↗</span>
      )}
      {/* Underline — grows left → right on hover */}
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-0 h-px w-0 bg-current group-hover:w-full transition-[width] duration-spring ease-spring"
      />
    </button>
  ),
);
TextButton.displayName = 'TextButton';
