import * as React from 'react';
import { cn } from '../utils';
import { Logo } from './Logo';
import { Blob } from './Blob';

// Spec: Figma "Blog thumbnails" 57:3218.
// A composed, on-brand cover card (16:10) used as a blog/news thumbnail: a tinted
// token surface with a faint Blob line, the Boltz wordmark, and one of four
// layouts. NOTE the spacing scale here is raw px — h-20 = 20px (a small wordmark).

type Tone = 'sage' | 'blue' | 'tierra';

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

export interface BlogThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Surface tint. Default 'sage'. */
  tone?: Tone;
  /**
   * Composition:
   *  - 'announce' — wordmark top, eyebrow + title bottom-left, render bleeds right
   *  - 'title'    — big centred title + wordmark below
   *  - 'cobrand'  — centred "Boltz | partner" lockup
   *  - 'mark'     — wordmark top-left, render bleeding a corner (no title)
   * Default 'announce'.
   */
  layout?: 'announce' | 'title' | 'cobrand' | 'mark';
  title?: string;
  /** Small uppercase eyebrow (announce layout). */
  eyebrow?: string;
  /** Co-brand partner name (cobrand layout) — rendered as text. */
  partner?: string;
  /** Transparent protein render to bleed off a corner. */
  renderSrc?: string;
  /** Decorative blob shape index (wraps). */
  blobShape?: number;
}

const Protein = ({ src, className }: { src: string; className: string }) => (
  <img src={src} alt="" aria-hidden className={cn('pointer-events-none absolute select-none', className)} />
);

export const BlogThumbnail = React.forwardRef<HTMLDivElement, BlogThumbnailProps>(
  (
    { className, tone = 'sage', layout = 'announce', title, eyebrow, partner, renderSrc, blobShape = 0, ...rest },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn('relative w-full aspect-[16/10] overflow-hidden rounded-lg', toneBg[tone], className)}
      {...rest}
    >
      <Blob
        shape={blobShape}
        aria-hidden
        className={cn('pointer-events-none absolute h-auto w-2/3 opacity-40 -right-1/4 -top-1/4', toneBlob[tone])}
      />

      {layout === 'announce' && (
        <>
          {renderSrc && <Protein src={renderSrc} className="-right-[6%] top-1/2 w-[44%] -translate-y-1/2" />}
          <div className="absolute inset-0 flex flex-col justify-between p-xl">
            <Logo className={cn('h-20 w-auto', toneInk[tone])} />
            <div className="flex flex-col gap-xs">
              {eyebrow && <span className="text-body-sm uppercase tracking-wide text-text-muted">{eyebrow}</span>}
              {title && <span className={cn('text-heading-sm', toneInk[tone])}>{title}</span>}
            </div>
          </div>
        </>
      )}

      {layout === 'title' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-xl">
          <span aria-hidden />
          {title && <span className={cn('max-w-[80%] text-center text-heading-md', toneInk[tone])}>{title}</span>}
          <Logo className={cn('h-20 w-auto', toneInk[tone])} />
        </div>
      )}

      {layout === 'cobrand' && (
        <div className="absolute inset-0 flex items-center justify-center gap-md p-xl">
          <Logo className={cn('h-20 w-auto', toneInk[tone])} />
          <span className="h-20 w-px bg-border-light" aria-hidden />
          {partner && <span className={cn('text-heading-sm font-semibold italic', toneInk[tone])}>{partner}</span>}
        </div>
      )}

      {layout === 'mark' && (
        <>
          {renderSrc && <Protein src={renderSrc} className="-bottom-[10%] -right-[6%] w-[48%]" />}
          <div className="absolute inset-0 flex flex-col justify-between p-xl">
            <Logo className={cn('h-20 w-auto', toneInk[tone])} />
            <span aria-hidden />
          </div>
        </>
      )}
    </div>
  ),
);
BlogThumbnail.displayName = 'BlogThumbnail';
