import * as React from 'react';
import { Leaf } from 'iconoir-react';
import { cn } from '../utils';

// Spec: DESIGN.md `eyebrow-label` + Figma node 58-294 "Tag"
// Source of truth: components.html `.tag` / `.tag__icon` / `.tag__label`
//
// Structure: [icon circle 28×28] [text pill] — gap: 0, both fully rounded, 1px border.
//   Text pill uses -ml-px to merge the border seam with the icon circle.
//
// icon prop accepts any React node — pass any Iconoir component:
//   <EyebrowLabel icon={<Leaf />}>Our models</EyebrowLabel>
//   <EyebrowLabel icon={<Code />}>API</EyebrowLabel>
//   <EyebrowLabel icon={null}>No icon</EyebrowLabel>   ← text pill only
//
// Variants:
//   light — black border, black text  → white/light/coloured backgrounds
//   dark  — white/40 border, white/70 text  → dark backgrounds

type Variant = 'light' | 'dark';

export interface EyebrowLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  /**
   * Icon rendered inside the 28×28 circle.
   * Pass any Iconoir component (or any ReactNode).
   * Pass `null` to hide the icon circle entirely.
   * Defaults to `<Leaf />`.
   */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const borderColor: Record<Variant, string> = {
  light: 'border-action-primary text-text-primary',
  dark:  'border-white/40 text-white/70',
};

const iconColor: Record<Variant, string> = {
  light: 'text-text-primary',
  dark:  'text-white/70',
};

export const EyebrowLabel = React.forwardRef<HTMLSpanElement, EyebrowLabelProps>(
  ({ className, variant = 'light', icon = <Leaf width={14} height={14} strokeWidth={1.5} />, children, ...rest }, ref) => {
    const showCircle = icon !== null && icon !== false && icon !== undefined;

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-0', className)}
        {...rest}
      >
        {/* Icon circle */}
        {showCircle && (
          <span
            aria-hidden="true"
            className={cn(
              'w-28 h-28 rounded-full border flex-shrink-0',
              'inline-flex items-center justify-center',
              iconColor[variant],
              borderColor[variant],
            )}
          >
            {icon}
          </span>
        )}

        {/* Text pill — -ml-px merges the shared border seam */}
        <span
          className={cn(
            'h-28 px-12 rounded-full border',
            'inline-flex items-center',
            'text-body-sm whitespace-nowrap',
            showCircle && '-ml-px',
            borderColor[variant],
          )}
        >
          {children}
        </span>
      </span>
    );
  },
);
EyebrowLabel.displayName = 'EyebrowLabel';
