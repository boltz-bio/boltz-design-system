import * as React from 'react';
import { cn } from '../utils';

// Spec: DESIGN.md `button-primary` + Figma node 58-134
// Source of truth: components.html `.btn--outlined` / `.btn--white`
//
// One button type — the split-pill [label][circle ↗].
// Both label and circle are outlined (no filled label).
//
// Variants:
//   black (default) — black label fill + transparent circle, black borders
//                     → use on white / light / coloured backgrounds
//   white           — white label fill + transparent circle, white borders
//                     → use on dark / black backgrounds
//
// Suffix:
//   "arrow-icon"  (default) — animated split-pill [label][circle ↗]
//   "arrow-text"  — static inline ↗ inside label only
//   "none"        — label only

type Variant = 'black' | 'white';
type Suffix  = 'arrow-icon' | 'arrow-text' | 'none';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  suffix?: Suffix;
}

const labelStyles: Record<Variant, string> = {
  black: 'bg-action-primary text-text-on-dark border-action-primary',
  white: 'bg-white text-text-primary border-white',
};

const iconStyles: Record<Variant, string> = {
  black: 'bg-transparent text-text-primary border-action-primary',
  white: 'bg-transparent text-white border-white/50',
};

const iconHoverStyles: Record<Variant, string> = {
  black: 'group-hover:bg-action-primary group-hover:text-text-on-dark group-hover:border-action-primary',
  white: 'group-hover:bg-white group-hover:text-text-primary group-hover:border-white',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'black', suffix = 'arrow-icon', children, disabled, ...rest }, ref) => {
    const showCircle = suffix === 'arrow-icon';

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'group inline-flex items-center gap-0',
          'cursor-pointer select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
          'disabled:opacity-60 disabled:pointer-events-none',
          'active:scale-active',
          className,
        )}
        {...rest}
      >
        {/* Label pill */}
        <span
          className={cn(
            'h-[36px] rounded-full border',
            'inline-flex items-center',
            'font-sans font-regular text-body-sm whitespace-nowrap',
            'pl-[16px] pr-[16px]',
            showCircle && 'group-hover:pr-[52px]',
            'transition-[padding,background-color,border-color] duration-spring ease-spring',
            labelStyles[variant],
          )}
        >
          {children}
          {suffix === 'arrow-text' && (
            <span aria-hidden="true" className="ml-[6px] leading-none">↗</span>
          )}
        </span>

        {/* Icon circle */}
        {showCircle && (
          <span
            aria-hidden="true"
            className={cn(
              'h-[36px] w-[36px] overflow-hidden rounded-full border flex-shrink-0',
              'inline-flex items-center justify-center',
              'font-sans font-regular text-body-sm leading-none',
              'ml-0 group-hover:-ml-[36px]',
              'transition-[margin,background-color,border-color,color] duration-spring ease-spring',
              iconStyles[variant],
              iconHoverStyles[variant],
            )}
          >
            <span className="inline-block -rotate-45 group-hover:rotate-0 transition-transform duration-spring ease-spring">
              →
            </span>
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
