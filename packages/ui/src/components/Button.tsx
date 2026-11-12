import * as React from 'react';
import { ArrowRight } from 'iconoir-react';
import { cn } from '../utils';
import { focusRing, disabledState, interactive, arrowSpin, opticalTextCenter } from '../styles';

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
//   outlined        — transparent label + transparent circle, black borders
//                     → secondary action beside a black CTA on light surfaces
//                     (DESIGN.md `.btn--secondary`; keeps "one black CTA per band").
//                     On hover the circle's border fades so label + circle read
//                     as one outlined pill.
//   outlined-white  — the dark-surface twin of `outlined`: transparent label +
//                     circle, white text, white/50 borders → secondary action
//                     beside a `white` CTA on dark / black backgrounds.
//
// Sizes:
//   "md" (default) — 40px pill + circle, label-md (16px) label, 18px side padding
//                    (one step up from the original 36px / body-sm Figma spec)
//   "lg"           — 44px pill + circle, body-md label, 20px side padding
//                    → prominent CTAs, e.g. the primary hero
//
// Suffix:
//   "arrow-icon"  (default) — animated split-pill [label][circle ↗]
//   "arrow-text"  — static inline ↗ inside label only
//   "none"        — label only

type Variant = 'black' | 'white' | 'outlined' | 'outlined-white';
type Suffix  = 'arrow-icon' | 'arrow-text' | 'none';
type Size    = 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  suffix?: Suffix;
  size?: Size;
}

// Per-size geometry. On hover the label's right padding grows by the circle's
// width (md: 18 + 40 = 58, lg: 20 + 44 = 64) and the circle pulls back by the same.
const sizeStyles: Record<Size, { label: string; labelHover: string; circle: string; arrow: number }> = {
  md: { label: 'h-40 text-label-md pl-18 pr-18', labelHover: 'group-hover:pr-[58px]', circle: 'h-40 w-40 group-hover:-ml-40', arrow: 17 },
  lg: { label: 'h-44 text-body-md pl-20 pr-20', labelHover: 'group-hover:pr-[64px]', circle: 'h-44 w-44 group-hover:-ml-44', arrow: 18 },
};

const labelStyles: Record<Variant, string> = {
  black: 'bg-action-primary text-text-on-dark border-action-primary',
  white: 'bg-white text-text-primary border-white',
  outlined: 'bg-transparent text-text-primary border-action-primary',
  'outlined-white': 'bg-transparent text-white border-white/50',
};

const iconStyles: Record<Variant, string> = {
  black: 'bg-transparent text-text-primary border-action-primary',
  white: 'bg-transparent text-white border-white/50',
  outlined: 'bg-transparent text-text-primary border-action-primary',
  'outlined-white': 'bg-transparent text-white border-white/50',
};

const iconHoverStyles: Record<Variant, string> = {
  black: 'group-hover:bg-action-primary group-hover:text-text-on-dark group-hover:border-action-primary',
  white: 'group-hover:bg-white group-hover:text-text-primary group-hover:border-white',
  outlined: 'group-hover:border-transparent',
  'outlined-white': 'group-hover:border-transparent',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'black', suffix = 'arrow-icon', size = 'md', children, disabled, ...rest }, ref) => {
    const showCircle = suffix === 'arrow-icon';
    const sz = sizeStyles[size];

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
            opticalTextCenter,
            'rounded-full border',
            'inline-flex items-center',
            'whitespace-nowrap',
            sz.label,
            // On hover: expand right padding by the circle's width so the fill
            // stretches under the circle (see sizeStyles)
            showCircle && sz.labelHover,
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
              sz.circle,
              'overflow-hidden rounded-full border flex-shrink-0',
              'inline-flex items-center justify-center',
              'text-body-sm leading-none',
              // On hover: pull circle left so it sits on top of the extended label fill
              'ml-0',
              'transition-[margin,background-color,border-color,color] duration-spring ease-spring',
              iconStyles[variant],
              iconHoverStyles[variant],
            )}
          >
            {/* Arrow — always →, rotated -45° (looks like ↗) by default, rotates to 0° on hover.
                An SVG (not the → glyph) so it rotates about its true centre — font
                metrics put the glyph's ink ~1px off-centre in its text box. */}
            <ArrowRight width={sz.arrow} height={sz.arrow} strokeWidth={1.5} className={arrowSpin} />
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
