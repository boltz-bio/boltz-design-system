import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Spec: DESIGN.md `eyebrow-label` + Figma "Tag" component
//
// Rules:
// - Outlined pill (full radius), body-sm text, sentence case
// - Leading icon: leaf (Iconoir) by default — matches live Figma
// - Bullet variant available — matches DESIGN.md original
// - Light + dark variants for placement on warm/cold vs dark surfaces

const eyebrowVariants = cva(
  [
    'inline-flex items-center gap-sm',
    'font-sans font-regular text-body-sm',
    'rounded-full',
    'px-10 py-4',
  ],
  {
    variants: {
      variant: {
        light: 'border border-border-light text-text-secondary bg-transparent',
        dark: 'border border-white/15 text-white/60 bg-transparent',
      },
    },
    defaultVariants: { variant: 'light' },
  },
);

type Icon = 'leaf' | 'bullet' | 'none';

export interface EyebrowLabelProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof eyebrowVariants> {
  /** Leading marker. `leaf` matches Figma; `bullet` matches DESIGN.md original; `none` for plain text. */
  icon?: Icon;
  children: React.ReactNode;
}

// Iconoir leaf — inline SVG so we don't ship Iconoir CSS for one icon.
// Reference: iconoir.com/icons/leaf
const LeafIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="14"
    height="14"
    aria-hidden="true"
  >
    <path d="M3 21c5 0 13-2 18-9 1-2 1-7-1-9-2 0-7 0-9 1C4 8 2 16 2 21" />
    <path d="M3 21c2-8 8-14 14-16" />
  </svg>
);

export const EyebrowLabel = React.forwardRef<HTMLSpanElement, EyebrowLabelProps>(
  ({ className, variant, icon = 'leaf', children, ...rest }, ref) => {
    return (
      <span ref={ref} className={cn(eyebrowVariants({ variant }), className)} {...rest}>
        {icon === 'leaf' && (
          <LeafIcon className={variant === 'dark' ? 'text-sage-medium' : 'text-sage-dark'} />
        )}
        {icon === 'bullet' && (
          <span
            aria-hidden="true"
            className={variant === 'dark' ? 'text-sage-medium' : 'text-sage-dark'}
          >
            •
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  },
);
EyebrowLabel.displayName = 'EyebrowLabel';
