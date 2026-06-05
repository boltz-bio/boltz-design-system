import * as React from 'react';
import { cn } from '../utils';
import { Blob } from './Blob';

// Spec: Figma "Blog thumbnails" 57:3218
//
// A temporary image placeholder + thumbnail handler. Renders an <img> when a
// `src` is given; otherwise the tinted block itself stands in as a placeholder
// (no broken-image icon, no empty box). Used to fill article/blog covers while
// real imagery is still being produced.

// ── Aspect ratios ─────────────────────────────────────────────────────────────
// `aspect-[16/10]` (blog cover) and `aspect-[3/4]` are arbitrary RATIOS, not
// hardcoded pixel dimensions — allowed per ARCHITECTURE.md.
const aspects: Record<NonNullable<ThumbnailProps['aspect']>, string> = {
  video: 'aspect-video',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
};

const radii: Record<NonNullable<ThumbnailProps['radius']>, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
};

// Placeholder background tokens (no inline colours).
const tones: Record<NonNullable<ThumbnailProps['tone']>, string> = {
  sage: 'bg-sage-light',
  blue: 'bg-blue-light',
  tierra: 'bg-tierra-100',
  neutral: 'bg-surface-secondary',
};

// Decorative blob FILL tokens — a slightly deeper but still soft member of the
// same colour family as the bg tint above (set via `text-*`, the Blob fills with
// `currentColor`). Neutral has no family equivalent → fall back to `text-border-warm`.
const blobFills: Record<NonNullable<ThumbnailProps['tone']>, string> = {
  sage: 'text-sage-medium',
  blue: 'text-blue-medium',
  tierra: 'text-tierra-500',
  neutral: 'text-border-warm',
};

export interface ThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. If omitted, a tinted placeholder is rendered (no broken image). */
  src?: string;
  alt?: string;
  /** Aspect ratio. Default 'wide' (16:10, the Figma blog cover). */
  aspect?: 'video' | 'wide' | 'square' | 'portrait';
  /** Corner radius. Default 'lg'. */
  radius?: 'md' | 'lg';
  /** Placeholder background tone (only visible when there is no `src`). Default 'neutral'. */
  tone?: 'sage' | 'blue' | 'tierra' | 'neutral';
  /**
   * Placeholder decoration (only used when there is no `src`). 'blob' renders a
   * large organic Boltz blob bleeding off the top-right corner; 'none' keeps the
   * minimal `—` dash. Default 'none'.
   */
  graphic?: 'none' | 'blob';
  /** Which blob shape to use when `graphic='blob'`. Index into BLOB_SHAPES; wraps. Default 0. */
  blobShape?: number;
}

export const Thumbnail = React.forwardRef<HTMLDivElement, ThumbnailProps>(
  (
    {
      className,
      src,
      alt = '',
      aspect = 'wide',
      radius = 'lg',
      tone = 'neutral',
      graphic = 'none',
      blobShape = 0,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        aspects[aspect],
        radii[radius],
        // Tinted block only shows through when there is no image.
        !src && tones[tone],
        className,
      )}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : graphic === 'blob' ? (
        // Decorative blob bleeding off the top-right corner, clipped by the
        // card's `overflow-hidden`. Fill is a deeper member of the tone family.
        <Blob
          shape={blobShape}
          aria-hidden
          className={cn(
            'pointer-events-none absolute -top-1/4 -right-1/4 w-2/3 h-auto',
            blobFills[tone],
          )}
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-body-sm text-text-muted select-none"
        >
          —
        </span>
      )}
    </div>
  ),
);
Thumbnail.displayName = 'Thumbnail';

/**
 * Deterministic dummy image URL for demo/dummy thumbnails in stories
 * (Lorem Picsum). The same `seed` always returns the same image.
 */
export const placeholderImage = (seed: string, w = 800, h = 500): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
