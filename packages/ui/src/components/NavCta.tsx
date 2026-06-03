import * as React from 'react';
import { cn } from '../utils';
import { focusRing, disabledState, interactive, arrowSpin } from '../styles';

// Spec: DESIGN.md `nav-cta` + Figma nodes 58:243 / 58:244
// Source of truth: components.html `.nav-cta` / `.nav-cta__icon`
//
// Structure: one continuous outer pill — text on the left, filled inner circle on the right.
//   h: 36px, rounded-full, pl: 20px, pr: 4px, gap: 8px
//   Inner circle: 28×28px, filled, rounded-full — sits inside the outer pill with 4px gap on right
//
// Variants:
//   dark  (default) — black outer pill, white text, white circle + black ↗
//                     → use on white / light backgrounds (e.g. navbar)
//   light           — white outer pill, black text, black circle + white ↗
//                     → use on coloured / sage / dark backgrounds

type Variant = 'dark' | 'light';

export interface NavCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children?: React.ReactNode;
}

const outerStyles: Record<Variant, string> = {
  dark:  'bg-action-primary text-text-on-dark',
  light: 'bg-white text-text-primary',
};

const circleStyles: Record<Variant, string> = {
  dark:  'bg-white text-text-primary',
  light: 'bg-action-primary text-text-on-dark',
};

export const NavCta = React.forwardRef<HTMLButtonElement, NavCtaProps>(
  ({ className, variant = 'dark', children, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'group inline-flex items-center gap-8',
        'h-36 pl-20 pr-4',
        'rounded-full',
        'text-body-sm whitespace-nowrap',
        interactive,
        'active:scale-active',
        focusRing,
        disabledState,
        outerStyles[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>

      {/* Inner filled circle — sits flush inside the pill's right edge */}
      <span
        aria-hidden="true"
        className={cn(
          'w-28 h-28 rounded-full flex-shrink-0',
          'inline-flex items-center justify-center',
          'text-[13px] leading-none',
          circleStyles[variant],
        )}
      >
        <span className={arrowSpin}>→</span>
      </span>
    </button>
  ),
);
NavCta.displayName = 'NavCta';
