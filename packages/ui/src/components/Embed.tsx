import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Component — a responsive, accessible iframe embed. Drop a live external view
// (e.g. the Modal-hosted Boltz Studio protein renderer) into a section's media
// slot instead of a static image. Supports a `poster` image (shown until the
// iframe loads / as a static fallback) and an optional scroll-reveal animation.
//
// Boltz Studio embed: https://dylan-6--studio.modal.run (frozen views via
// https://dylan-6--embed.modal.run?s=…). Use the embed URL for hero/section media.

const frame = cva('relative w-full overflow-hidden bg-surface-secondary', {
  variants: {
    aspect: {
      video: 'aspect-video',
      wide: 'aspect-[16/10]',
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
    },
    radius: {
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  defaultVariants: { aspect: 'video', radius: 'lg' },
});

export interface EmbedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof frame> {
  /** Iframe URL (e.g. a Boltz Studio embed view). */
  src: string;
  /** Accessible title for the iframe — required for screen readers. */
  title: string;
  /** Optional poster image (static fallback / shown while the iframe loads). */
  poster?: string;
  /** iframe `allow` attribute. Default 'fullscreen'. */
  allow?: string;
  /** Fade + rise in when scrolled into view (IntersectionObserver; honours reduced-motion). */
  reveal?: boolean;
}

export const Embed = React.forwardRef<HTMLDivElement, EmbedProps>(
  ({ className, src, title, poster, allow = 'fullscreen', reveal = false, aspect, radius, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const [shown, setShown] = React.useState(!reveal);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
      if (!reveal || shown) return;
      const el = innerRef.current;
      if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
        { rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(el);
      return () => io.disconnect();
    }, [reveal, shown]);

    const setRefs = (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={setRefs}
        className={cn(
          frame({ aspect, radius }),
          reveal && [
            'transition-[opacity,transform] duration-slow ease-standard-out motion-reduce:transition-none',
            shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ],
          className,
        )}
        {...rest}
      >
        {/* Poster — behind the iframe; fades out once the iframe loads */}
        {poster && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              'transition-opacity duration-base ease-standard motion-reduce:transition-none',
              loaded ? 'opacity-0' : 'opacity-100',
            )}
          />
        )}
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow={allow}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  },
);
Embed.displayName = 'Embed';
