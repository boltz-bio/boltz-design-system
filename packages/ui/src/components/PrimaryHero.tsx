import * as React from 'react';
import { cn } from '../utils';
import { Blob, BLOB_COUNT } from './Blob';

// Section — the page-top marketing hero (Figma "Primary hero", 246:345/329/370).
// Unlike the generic `Hero` (a contained text+media split), this is a tall band
// (~860px on desktop, like the Figma) whose media is OVERSIZED and bleeds off the
// band edges: the text sits vertically-centred on the left, the render/screenshot
// is absolutely positioned and clipped by the band's `overflow-hidden`.
//
// Pass the bleeding visual as `media` — an absolutely-positioned element you
// anchor yourself (e.g. `absolute right-0 top-1/2 -translate-y-1/2 …` for a
// protein render, or `absolute bottom-0 right-0 …` for a monitor stuck to the
// bottom edge).

type Tone = 'sage' | 'blue' | 'dark';

const toneBg: Record<Tone, string> = {
  sage: 'bg-sage-pale',
  blue: 'bg-blue-light',
  dark: 'bg-surface-card-dark',
};
const toneInk: Record<Tone, string> = {
  sage: 'text-text-primary',
  blue: 'text-text-primary',
  dark: 'text-text-on-dark',
};
const toneBody: Record<Tone, string> = {
  sage: 'text-text-secondary',
  blue: 'text-text-secondary',
  dark: 'text-white/60',
};
// The backdrop blob colour/opacity per tone — recoloured via the `text-*` token.
const toneBlob: Record<Tone, string> = {
  sage: 'text-sage-medium opacity-40',
  blue: 'text-blue-medium opacity-40',
  dark: 'text-white opacity-[0.14]',
};

export interface PrimaryHeroProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  heading: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  /** Oversized, self-anchored visual that bleeds off the band (absolute-positioned). */
  media?: React.ReactNode;
  /** Render the backdrop blob (recoloured per tone). Default true. */
  blob?: boolean;
}

export const PrimaryHero = React.forwardRef<HTMLElement, PrimaryHeroProps>(
  ({ className, tone = 'sage', heading, body, actions, media, blob = true, ...rest }, ref) => (
    <section
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden',
        // Tall band — mirrors the 860px Figma hero, responsive down on small screens.
        'min-h-[560px] tablet:min-h-[680px] laptop:min-h-[820px]',
        'flex items-center',
        toneBg[tone],
        className,
      )}
      {...rest}
    >
      {/* Backdrop blob — one consistent position across all primary heroes,
          recoloured per tone. Sits behind the media. */}
      {blob && (
        <Blob
          shape={BLOB_COUNT - 1}
          aria-hidden
          className={cn(
            'pointer-events-none absolute -top-[28%] right-0 h-auto w-[92%] translate-x-[16%]',
            toneBlob[tone],
          )}
        />
      )}
      {/* Media bleeds behind the text; the band clips it. */}
      {media && <div className="pointer-events-none absolute inset-0">{media}</div>}

      <div className="relative z-10 w-full max-w-container mx-auto px-md tablet:px-40">
        <div className="flex w-full max-w-[600px] flex-col gap-lg py-2xl">
          <h1 className={cn('text-heading-lg', toneInk[tone])}>{heading}</h1>
          {body && <p className={cn('text-body-lg max-w-hero', toneBody[tone])}>{body}</p>}
          {actions && <div className="mt-md flex flex-wrap items-center gap-md">{actions}</div>}
        </div>
      </div>
    </section>
  ),
);
PrimaryHero.displayName = 'PrimaryHero';
