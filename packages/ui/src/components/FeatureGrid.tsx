import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';
import { CardMedium, type CardColor } from './Card';

// Section — a full-width band that lays out a set of CardMedium tiles in a
// responsive grid, with an optional EyebrowLabel above it. Mobile-first: one
// column on phones, two at `tablet:`, and two or three at `laptop:` per `columns`.
//
// Content is prop-driven via `items`; each item maps to a CardMedium
// (color/heading/body/cta). Use for feature overviews, capability lists, etc.

const sectionVariants = cva('w-full py-2xl', {
  variants: {
    background: {
      none: '',
      secondary: 'bg-surface-secondary',
      'sage-pale': 'bg-sage-pale',
      'blue-pale': 'bg-blue-pale',
      'tierra-100': 'bg-tierra-100',
    },
  },
  defaultVariants: { background: 'none' },
});

export interface FeatureGridItem {
  heading: React.ReactNode;
  body?: React.ReactNode;
  cta?: string;
  color?: CardColor;
}

export interface FeatureGridProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    VariantProps<typeof sectionVariants> {
  /** Optional eyebrow label rendered above the grid. */
  eyebrow?: React.ReactNode;
  /** Icon for the eyebrow label (any Iconoir component / ReactNode). */
  eyebrowIcon?: React.ReactNode;
  /** The feature tiles — each maps to a CardMedium. */
  items: FeatureGridItem[];
  /** Columns from the tablet breakpoint up (mobile is always 1). Default 3. */
  columns?: 2 | 3;
  /** `contained` caps at the grid container; `fluid` spans full width. Default contained. */
  width?: 'contained' | 'fluid';
}

// Column count from tablet (1024px) up — so a 3-up grid isn't lopsided on laptops.
const tabletCols: Record<2 | 3, string> = {
  2: 'tablet:grid-cols-2',
  3: 'tablet:grid-cols-3',
};

export const FeatureGrid = React.forwardRef<HTMLElement, FeatureGridProps>(
  ({ className, eyebrow, eyebrowIcon, items, columns = 3, width = 'contained', background, ...rest }, ref) => (
    <section ref={ref} className={cn(sectionVariants({ background }), className)} {...rest}>
      <div className={cn('mx-auto px-md tablet:px-40', width === 'contained' ? 'max-w-container' : 'w-full')}>
        <div className="flex flex-col gap-xl">
          {eyebrow && (
            <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>
          )}
          <div className={cn('grid grid-cols-1 gap-lg', tabletCols[columns])}>
            {items.map((item, i) => (
              <CardMedium
                key={i}
                color={item.color}
                heading={item.heading}
                body={item.body}
                cta={item.cta}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
);
FeatureGrid.displayName = 'FeatureGrid';
