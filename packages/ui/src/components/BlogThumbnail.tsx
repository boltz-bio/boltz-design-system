import * as React from 'react';
import { cn } from '../utils';
import { Logo } from './Logo';
import { Blob } from './Blob';

// Spec: Figma "Blog thumbnails" 57:3218 (57:3219 / 57:3246 / 57:3287 / 57:3329 / …).
//
// A flexible, fully-scalable blog/news cover. Everything inside is sized in
// container-query units (cqw) against the card's own width, so the SAME cover
// reads correctly whether it's a 1600px blog hero or a 360px news-grid card —
// the wordmark, title, eyebrow, padding and render all scale proportionally
// (no fixed px that breaks at small sizes).
//
// Supports: 3 background tones · a Blob behind or in front · the Boltz wordmark ·
// a co-brand partner (logo node or text) · title aligned left/centre and placed
// top/centre/bottom · a transparent 3D/PNG render bleeding the right edge.

type Tone = 'sage' | 'blue' | 'tierra';
type Category = 'new-research' | 'product-launch' | 'case-study' | 'other';

const toneBg: Record<Tone, string> = {
  sage: 'bg-sage-pale',
  blue: 'bg-blue-pale',
  tierra: 'bg-tierra-100',
};
const toneBlob: Record<Tone, string> = {
  sage: 'text-sage-medium',
  blue: 'text-blue-medium',
  tierra: 'text-tierra-500',
};
const toneInk: Record<Tone, string> = {
  sage: 'text-sage-dark',
  blue: 'text-blue-dark',
  tierra: 'text-text-primary',
};

// Sensible eyebrow per editorial category (overridable via `eyebrow`).
const categoryEyebrow: Record<Category, string | undefined> = {
  'new-research': 'New research',
  'product-launch': 'Announcing',
  'case-study': 'Case study',
  other: undefined,
};

export interface BlogThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background tint. Default 'sage'. */
  tone?: Tone;
  /** Editorial category — sets a default eyebrow. */
  category?: Category;
  /** Small uppercase eyebrow above the title. Overrides the category default. */
  eyebrow?: string;
  title?: string;
  /** Horizontal alignment of the text block. Default 'left'. */
  align?: 'left' | 'center';
  /** Vertical placement of the text block. Default 'bottom'. */
  titlePosition?: 'top' | 'center' | 'bottom';
  /** Show the Boltz wordmark. Default true. */
  showLogo?: boolean;
  /** Co-brand partner — a logo node or text. Renders a centred "Boltz | partner" lockup. */
  partner?: React.ReactNode;
  /** Transparent 3D / PNG render, bled off the right edge. */
  renderSrc?: string;
  /** Decorative blob shape index (wraps). */
  blobShape?: number;
  /** Whether the blob sits behind the content or in front of it. Default 'behind'. */
  blobLayer?: 'behind' | 'front';
}

export const BlogThumbnail = React.forwardRef<HTMLDivElement, BlogThumbnailProps>(
  (
    {
      className,
      tone = 'sage',
      category,
      eyebrow,
      title,
      align = 'left',
      titlePosition = 'bottom',
      showLogo = true,
      partner,
      renderSrc,
      blobShape = 0,
      blobLayer = 'behind',
      ...rest
    },
    ref,
  ) => {
    const ink = toneInk[tone];
    const resolvedEyebrow = eyebrow ?? (category ? categoryEyebrow[category] : undefined);
    const isCenter = align === 'center';
    // Logo sits opposite the title (announce: title bottom → logo top).
    const logoAtTop = titlePosition === 'bottom';

    const blob = (
      <Blob
        shape={blobShape}
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-1/4 -top-1/4 h-auto w-2/3',
          blobLayer === 'front' ? 'z-20 opacity-30' : 'z-0 opacity-40',
          toneBlob[tone],
        )}
      />
    );

    const wordmark = showLogo ? (
      <Logo aria-label="Boltz" className={cn('h-auto w-[18cqw] min-w-[52px] max-w-[150px]', ink)} />
    ) : null;

    // Keep the text clear of a right-side render; centred titles get more room.
    const titleMax = isCenter ? 'max-w-[86cqw]' : renderSrc ? 'max-w-[54cqw]' : 'max-w-[82cqw]';
    const titleBlock = (title || resolvedEyebrow) && (
      <div className={cn('flex flex-col gap-[1.5cqw]', titleMax, isCenter ? 'items-center text-center' : 'items-start text-left')}>
        {resolvedEyebrow && (
          <span className={cn('font-sans text-[6.4cqw] leading-[1.2] tracking-[-0.03em] opacity-50', ink)}>{resolvedEyebrow}</span>
        )}
        {title && <span className={cn('font-sans text-[6.4cqw] leading-[1.2] tracking-[-0.03em] [text-wrap:balance]', ink)}>{title}</span>}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full aspect-[16/10] overflow-hidden rounded-lg [container-type:inline-size]',
          toneBg[tone],
          className,
        )}
        {...rest}
      >
        {blobLayer === 'behind' && blob}

        {renderSrc && (
          <img
            src={renderSrc}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-[6%] -top-[6%] z-10 w-[48cqw] select-none"
          />
        )}

        {/* Co-brand lockup */}
        {partner ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-[4cqw] p-[6cqw]">
            {wordmark}
            <span className="h-[16cqw] w-px bg-border-light" aria-hidden />
            <span className={cn('text-[5.5cqw] font-semibold italic leading-none', ink)}>{partner}</span>
          </div>
        ) : (
          <div className={cn('absolute inset-0 z-10 flex flex-col p-[6cqw]', isCenter && 'items-center')}>
            {/* top row */}
            <div className={cn('flex w-full', isCenter && 'justify-center')}>
              {logoAtTop ? wordmark : titlePosition === 'top' ? titleBlock : null}
            </div>
            {/* middle */}
            <div className="flex flex-1 items-center">
              {titlePosition === 'center' && titleBlock}
            </div>
            {/* bottom row */}
            <div className={cn('flex w-full', isCenter && 'justify-center')}>
              {!logoAtTop ? wordmark : titlePosition === 'bottom' ? titleBlock : null}
            </div>
          </div>
        )}

        {blobLayer === 'front' && blob}
      </div>
    );
  },
);
BlogThumbnail.displayName = 'BlogThumbnail';
