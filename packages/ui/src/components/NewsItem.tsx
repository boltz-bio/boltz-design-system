import * as React from 'react';
import { cn } from '../utils';

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

// ── Thumbnail sub-component ───────────────────────────────────────────────────

const Thumb = ({ src, alt = '', className }: { src?: string; alt?: string; className?: string }) => (
  <div className={cn('overflow-hidden flex-shrink-0 bg-surface-secondary', className)}>
    {src && (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
      />
    )}
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
          {/* Thumbnail — 16:10 aspect */}
          <Thumb
            src={thumbnail}
            alt={thumbnailAlt}
            className="w-full aspect-[16/10] rounded-lg"
          />
          {/* Text */}
          <div className="flex flex-col gap-[12px] w-full">
            <p className="font-sans font-regular text-body-md text-text-primary group-hover:underline">
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
          className={cn('group flex gap-[40px] items-start no-underline w-full', className)}
          {...rest}
        >
          {/* Text */}
          <div className="flex flex-col gap-[12px] flex-1 min-w-0">
            <p className="font-sans font-regular text-body-md text-text-primary group-hover:underline">
              {title}
            </p>
            <Meta category={category} date={date} />
          </div>
          {/* Thumbnail */}
          <Thumb
            src={thumbnail}
            alt={thumbnailAlt}
            className="w-[278px] h-[174px] rounded-[12px] flex-shrink-0"
          />
        </a>
      );
    }

    // ── List ──────────────────────────────────────────────────────────────────
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'group flex items-start justify-between no-underline w-full',
          'py-lg border-b border-border-light',
          className,
        )}
        {...rest}
      >
        {/* Meta column */}
        <div className="w-[240px] flex-shrink-0">
          <Meta category={category} date={date} stacked />
        </div>

        {/* Title + summary */}
        <div className="flex flex-col gap-[8px] flex-1 min-w-0 mr-[40px]">
          <h3 className="font-sans font-regular text-heading-sm text-text-primary group-hover:underline">
            {title}
          </h3>
          {summary && (
            <p className="font-sans font-regular text-body-md text-text-secondary">
              {summary}
            </p>
          )}
        </div>

        {/* Thumbnail — hidden by default, fades in on hover */}
        <div className={cn(
          'w-[168px] h-[105px] rounded-[12px] flex-shrink-0 overflow-hidden',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-200 ease-standard',
          'bg-surface-secondary',
        )}>
          {thumbnail && (
            <img
              src={thumbnail}
              alt={thumbnailAlt}
              className="w-full h-full object-cover pointer-events-none"
            />
          )}
        </div>
      </a>
    );
  },
);
NewsItem.displayName = 'NewsItem';
