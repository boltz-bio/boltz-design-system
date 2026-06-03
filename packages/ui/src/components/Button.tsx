import * as React from 'react';
import { cn } from '../utils';
import { focusRing, disabledState, interactive, arrowSpin } from '../styles';

// Spec: DESIGN.md `button-primary` + Figma node 58-134
// Source of truth: components.html `.btn--outlined` / `.btn--white`
//
// Structure: [label pill] [icon circle] — gap: 0, both fully rounded.
//
// Hover animation (arrow-icon mode):
//   1. Default:  [label pill][○ ↗]  — circle sits beside the pill, arrow is → rotated -45°.
//   2. Hover:    label pill's right padding expands by the circle width (16 + 36 = 52),
//                its fill extends under the circle; the circle pulls back via -ml-36 so it
//                sits on top of the pill fill → looks like one unified pill. Arrow → 0°.
//   3. Result:   [label pill fills through the circle (→)] — single unified pill.
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
          interactive,
          focusRing,
          disabledState,
          'active:scale-active',
          className,
        )}
        {...rest}
      >
        {/* Label pill */}
        <span
          className={cn(
            'h-36 rounded-full border',
            'inline-flex items-center',
            'font-sans font-regular text-body-sm whitespace-nowrap',
            'pl-16 pr-16',
            // On hover: expand right padding by the circle's width so the fill
            // stretches under the circle → 16 + 36 = 52
            showCircle && 'group-hover:pr-52',
            'transition-[padding,background-color,border-color] duration-spring ease-spring',
            labelStyles[variant],
          )}
        >
          {children}
          {suffix === 'arrow-text' && (
            <span aria-hidden="true" className="ml-6 leading-none">↗</span>
          )}
        </span>

        {/* Icon circle */}
        {showCircle && (
          <span
            aria-hidden="true"
            className={cn(
              'h-36 w-36 overflow-hidden rounded-full border flex-shrink-0',
              'inline-flex items-center justify-center',
              'font-sans font-regular text-body-sm leading-none',
              // On hover: pull circle left so it sits on top of the extended label fill
              'ml-0 group-hover:-ml-36',
              'transition-[margin,background-color,border-color,color] duration-spring ease-spring',
              iconStyles[variant],
              iconHoverStyles[variant],
            )}
          >
            {/* Arrow — always →, rotated -45° (looks like ↗) by default, rotates to 0° on hover */}
            <span className={arrowSpin}>→</span>
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
