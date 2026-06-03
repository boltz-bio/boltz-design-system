import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Section — the flexible text + media split band. The reusable base for most
// content sections: a content column and an optional media column whose position
// is configurable. Mobile-first: always stacks on phones, splits at `laptop:`.
//
// Compose anything into `content` / `media` (headings, EyebrowLabel, Buttons,
// Cards, images). For full pages, prefer the purpose-built sections (Hero, etc.)
// which wrap this with the right defaults.

const sectionVariants = cva('w-full', {
  variants: {
    background: {
      none: '',
      secondary: 'bg-surface-secondary',
      'sage-pale': 'bg-sage-pale',
      'blue-pale': 'bg-blue-pale',
      'tierra-100': 'bg-tierra-100',
      dark: 'bg-action-primary text-text-on-dark',
    },
    pad: {
      true: 'py-2xl tablet:py-section',
      false: '',
    },
  },
  defaultVariants: { background: 'none', pad: true },
});

type MediaPosition = 'left' | 'right' | 'above' | 'below';

export interface SplitSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'content'>,
    VariantProps<typeof sectionVariants> {
  /** The text / primary column. */
  content: React.ReactNode;
  /** Optional media column (image, render, card). Omit for a single column. */
  media?: React.ReactNode;
  /** Where the media sits relative to content. Stacks on mobile. Default 'right'. */
  mediaPosition?: MediaPosition;
  /** `contained` caps width at the grid container; `fluid` spans full width. */
  width?: 'contained' | 'fluid';
  /** Vertical alignment of the two columns when side-by-side. Default 'center'. */
  align?: 'start' | 'center';
}

// Side-by-side direction at laptop+; left/right swap order, above/below stay stacked.
const rowDir: Record<MediaPosition, string> = {
  right: 'laptop:flex-row',
  left: 'laptop:flex-row-reverse',
  above: 'flex-col-reverse',
  below: 'flex-col',
};

export const SplitSection = React.forwardRef<HTMLElement, SplitSectionProps>(
  (
    { className, content, media, mediaPosition = 'right', width = 'contained',
      align = 'center', background, pad, ...rest },
    ref,
  ) => {
    const stacked = mediaPosition === 'above' || mediaPosition === 'below';
    return (
      <section ref={ref} className={cn(sectionVariants({ background, pad }), className)} {...rest}>
        <div
          className={cn(
            'mx-auto px-md tablet:px-40',
            width === 'contained' ? 'max-w-container' : 'w-full',
          )}
        >
          <div
            className={cn(
              'flex gap-xl',
              media ? rowDir[mediaPosition] : 'flex-col',
              !stacked && (align === 'center' ? 'items-center' : 'items-start'),
              !stacked && 'laptop:gap-20',
            )}
          >
            <div className={cn('flex flex-col gap-lg', media && !stacked && 'laptop:flex-1')}>
              {content}
            </div>
            {media && (
              <div className={cn('flex justify-center', media && !stacked && 'laptop:flex-1 laptop:justify-end')}>
                {media}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  },
);
SplitSection.displayName = 'SplitSection';
