import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Spec: Figma "Badge" — nodes 58:232 (primary), 58:234 (secondary), 58:229 (tertiary)
// Verified live via Desktop Bridge 2026-06-03.
//
// Geometry (all variants): height 28px, padding 0 12px, border-radius full (pill),
//   NO border, fill only. Label = body-sm (15px) Stabil Grotesk Regular, text-primary.
//
// Variants map to Figma colour variables:
//   primary   → Primary/Sage - Medium    (#C6E5C6)
//   secondary → Secondary/Blue - Medium   (#C7E3EE)
//   tertiary  → Base neutrals/Tierra – 200 (#EEE7DB)
//   outlined  → No fill, border-text-primary — used for category/date labels in article headers

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'h-28 px-12 rounded-full',
    'text-body-sm whitespace-nowrap',
    'text-text-primary',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-sage-medium',
        secondary: 'bg-blue-medium',
        tertiary: 'bg-tierra-200',
        outlined: 'bg-transparent border border-text-primary',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...rest }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...rest} />
  ),
);
Badge.displayName = 'Badge';
