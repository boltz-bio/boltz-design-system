import * as React from 'react';
import { cn } from '../utils';
import { Thumbnail } from './Thumbnail';

// Spec: Figma nodes 115:553 (Portrait) / 115:554 (Landscape) / 115:552 (List)
//
// Three layout variants for news/article items.
//
// Portrait  — thumbnail (16:10, full width, rounded-lg) above text block
//             title body-md + meta body-sm. gap-[20px].
//
// Landscape — text (flex-1) left, thumbnail (278×174, rounded-[12px]) right.
//             title body-md + meta body-sm. gap-[40px].
//
// List      — horizontal row: meta column (240px) | title+summary | thumbnail
//             Meta: category body-sm + date body-sm muted, stacked.
//             Title: heading-sm (24px). Summary: body-md text-secondary.
//             Thumbnail (168×105): hidden by default, fades in on hover.
//             Separated from adjacent items by a 1px border-border-light.

// ── Shared types ──────────────────────────────────────────────────────────────

export interface NewsItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  variant: 'portrait' | 'landscape' | 'list';
  title: string;
  category: string;
  date: string;
  /** Article summary — used in list variant */
  summary?: string;
  /** Thumbnail image src */
  thumbnail?: string;
  thumbnailAlt?: string;
  /** Composed cover node (e.g. <BlogThumbnail/>). Overrides the image thumbnail. */
  cover?: React.ReactNode;
  href?: string;
}

// ── Meta sub-component ────────────────────────────────────────────────────────

const Meta = ({ category, date, stacked = false }: { category: string; date: string; stacked?: boolean }) => (
  <div className={cn(
    'font-sans font-regular text-body-sm',
    stacked ? 'flex flex-col gap-[6px]' : 'flex gap-[10px] items-center',
  )}>
    <span className="text-text-primary whitespace-nowrap">{category}</span>
    <span className="text-text-muted whitespace-nowrap">{date}</span>
  </div>
);

// ── NewsItem ──────────────────────────────────────────────────────────────────

export const NewsItem = React.forwardRef<HTMLAnchorElement, NewsItemProps>(
  ({
    className,
    variant,
    title,
    category,
    date,
    summary,
    thumbnail,
    thumbnailAlt = '',
    cover,
    href = '#',
    ...rest
  }, ref) => {

    // ── Portrait ──────────────────────────────────────────────────────────────
    if (variant === 'portrait') {
      return (
        <a
          ref={ref}
          href={href}
          className={cn('group flex flex-col gap-[20px] items-start no-underline w-full', className)}
          {...rest}
        >
          {/* Cover — a composed BlogThumbnail node, else an image/tinted placeholder */}
          {cover ?? (
            <Thumbnail
              src={thumbnail}
              alt={thumbnailAlt}
              aspect="wide"
              radius="lg"
              className="w-full"
            />
          )}
          {/* Text */}
          <div className="flex flex-col gap-[12px] w-full">
            <p className="font-sans font-regular text-body-md text-text-primary group-hover:underline decoration-current underline-offset-2 transition-all duration-base ease-standard" style={{ textDecorationThickness: '1px' }}>
              {title}
            </p>
            <Meta category={category} date={date} />
          </div>
        </a>
      );
    }

    // ── Landscape ─────────────────────────────────────────────────────────────
    if (variant === 'landscape') {
      return (
        <a
          ref={ref}
          href={href}
          className={cn('group flex flex-col mobile:flex-row gap-md mobile:gap-[40px] items-start no-underline w-full', className)}
          {...rest}
        >
          {/* Text */}
          <div className="flex flex-col gap-[12px] flex-1 min-w-0 order-2 mobile:order-1">
            <p className="font-sans font-regular text-body-md text-text-primary group-hover:underline decoration-current underline-offset-2 transition-all duration-base ease-standard" style={{ textDecorationThickness: '1px' }}>
              {title}
            </p>
            <Meta category={category} date={date} />
          </div>
          {/* Cover node, else a fixed 278×174 thumbnail box. Full width on phone,
              fixed 278px from mobile: (>=768). Image sits above text on phone. */}
          {cover ? (
            <div className="w-full mobile:w-[278px] flex-shrink-0 order-1 mobile:order-2">{cover}</div>
          ) : (
            <Thumbnail
              src={thumbnail}
              alt={thumbnailAlt}
              radius="md"
              className="w-full mobile:w-[278px] h-[174px] aspect-auto flex-shrink-0 order-1 mobile:order-2"
            />
          )}
        </a>
      );
    }

    // ── List ──────────────────────────────────────────────────────────────────
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'group flex flex-col gap-xs mobile:flex-row mobile:gap-0 mobile:items-start mobile:justify-between no-underline w-full',
          'py-lg border-b border-border-light',
          className,
        )}
        {...rest}
      >
        {/* Meta column — full width above the title on phone, fixed 240px from mobile: */}
        <div className="w-full mobile:w-[240px] flex-shrink-0">
          <Meta category={category} date={date} stacked />
        </div>

        {/* Title + summary */}
        <div className="flex flex-col gap-[8px] flex-1 min-w-0 mr-0 mobile:mr-[40px]">
          <h3 className="font-sans font-regular text-heading-sm text-text-primary group-hover:underline decoration-current underline-offset-2" style={{ textDecorationThickness: '1px' }}>
            {title}
          </h3>
          {summary && (
            <p className="font-sans font-regular text-body-md text-text-secondary">
              {summary}
            </p>
          )}
        </div>

        {/* Thumbnail — hover-reveal; hidden on phone (no hover on touch, and it
            would otherwise reserve dead space) */}
        <div className={cn(
          'hidden mobile:block w-[168px] h-[105px] flex-shrink-0',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-200 ease-standard',
        )}>
          <Thumbnail
            src={thumbnail}
            alt={thumbnailAlt}
            radius="md"
            className="w-full h-full aspect-auto"
          />
        </div>
      </a>
    );
  },
);
NewsItem.displayName = 'NewsItem';
