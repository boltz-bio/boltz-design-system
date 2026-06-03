import * as React from 'react';
import { cn } from '../utils';

// Spec: DESIGN.md `button-primary`, `button-secondary`, `button-white`
// Source of truth: Figma node 58-134
//
// Structure: [label pill] [icon circle] — gap: 0, both fully rounded (radius: 44px).
//
// Hover animation (arrow-icon mode):
//   1. Default:  [label pill][○ ↗]
//      Label has normal right padding. Circle sits beside it. Arrow is → rotated -45°.
//   2. Hover:    label pill's right padding expands by 36px (circle width),
//                its fill extends UNDER the circle. Circle pulls back via -ml-[36px]
//                so it stays at the same position but now sits on top of the pill fill.
//                Circle bg/border matches the pill fill → looks like one unified pill.
//                Arrow rotates from -45° back to 0° (→).
//   3. Result:   [label pill fills through the circle (→)]  — single unified pill.
//
// Variants:
//   primary   — black label + white filled circle  → coloured/sage backgrounds
//   secondary — black label + outlined circle      → white/light backgrounds
//   onDark    — white label + outlined circle      → dark backgrounds
//
// Suffix:
//   "arrow-icon"  (default) — animated split-pill
//   "arrow-text"  — static inline ↗ inside pill only
//   "none"        — label pill only

type Intent = 'primary' | 'secondary' | 'onDark';
type Suffix = 'arrow-icon' | 'arrow-text' | 'none';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent;
  suffix?: Suffix;
}

// Default circle styles
const iconStyles: Record<Intent, string> = {
  primary:   'bg-white text-text-primary border-transparent',
  secondary: 'bg-transparent text-text-primary border-action-primary',
  onDark:    'bg-transparent text-white border-white/50',
};

// On hover: circle bg/border fills to match label pill → they merge seamlessly
const iconHoverStyles: Record<Intent, string> = {
  primary:   'group-hover:bg-action-primary group-hover:text-text-on-dark group-hover:border-action-primary',
  secondary: 'group-hover:bg-action-primary group-hover:text-text-on-dark group-hover:border-action-primary',
  onDark:    'group-hover:bg-white group-hover:text-text-primary group-hover:border-white',
};

const labelStyles: Record<Intent, string> = {
  primary:   'bg-action-primary text-text-on-dark border-action-primary',
  secondary: 'bg-action-primary text-text-on-dark border-action-primary',
  onDark:    'bg-white text-text-primary border-white',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent = 'primary', suffix = 'arrow-icon', children, disabled, ...rest }, ref) => {
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
        {/* ── Label pill ─────────────────────────────────────────────────────── */}
        <span
          className={cn(
            'h-[36px] rounded-full border relative z-0',
            'inline-flex items-center',
            'font-sans font-regular text-body-sm whitespace-nowrap',
            'pl-[16px] pr-[16px]',
            // On hover: expand right padding by the circle's width (36px)
            // so the fill stretches under the circle
            showCircle && 'group-hover:pr-[52px]',
            'transition-[padding,background-color,border-color] duration-spring ease-spring',
            labelStyles[intent],
          )}
        >
          {children}

          {suffix === 'arrow-text' && (
            <span aria-hidden="true" className="ml-[6px] leading-none">↗</span>
          )}
        </span>

        {/* ── Icon circle ────────────────────────────────────────────────────── */}
        {showCircle && (
          <span
            aria-hidden="true"
            className={cn(
              'h-[36px] w-[36px] rounded-full border flex-shrink-0 relative z-10',
              'inline-flex items-center justify-center',
              'font-sans font-regular text-body-sm leading-none',
              // On hover: pull circle left so it sits on top of the extended label fill
              'ml-0 group-hover:-ml-[36px]',
              'transition-[margin,background-color,border-color,color] duration-spring ease-spring',
              iconStyles[intent],
              iconHoverStyles[intent],
            )}
          >
            {/* Arrow — always →, rotated -45° (looks like ↗) by default, rotates to 0° on hover */}
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
