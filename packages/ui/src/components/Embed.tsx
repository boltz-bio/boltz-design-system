import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

// Component — a responsive, accessible media embed. Drop a live external view
// (e.g. the Modal-hosted Boltz Studio protein renderer) into a section's media
// slot instead of a static image. Renders either an interactive iframe or an
// autoplaying turntable video. Supports a `poster` image (shown until the media
// loads / as a static fallback) and an optional scroll-reveal animation.
//
// Boltz Studio: https://dylan-6--studio.modal.run. Export formats:
//   • interactive iframe  → https://dylan-6--embed.modal.run?s=…       (kind="iframe")
//   • turntable video      → https://dylan-6--embed-video.modal.run?k=…  (kind="video")
// The Studio render bakes in its background colour — match the section you place it
// in (e.g. #FBFAF7 on surface-primary, #fff on a white band) for a seamless float.

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
  /** Media URL — a Boltz Studio embed iframe, or a turntable .mp4 (kind="video"). */
  src: string;
  /** Accessible title — required for screen readers. */
  title: string;
  /** Optional poster image (static fallback / shown while the media loads). */
  poster?: string;
  /** iframe `allow` attribute. Default 'fullscreen'. */
  allow?: string;
  /**
   * Render an interactive iframe or an autoplaying turntable video. Auto-detected
   * for .mp4/.webm and Boltz Studio `embed-video` URLs; pass explicitly to override.
   */
  kind?: 'iframe' | 'video';
  /** Fade + rise in when scrolled into view (IntersectionObserver; honours reduced-motion). */
  reveal?: boolean;
  /**
   * Video only: scrub the turntable by scroll position so the protein rotates as the
   * page scrolls (instead of autoplaying on a loop). Disabled under reduced-motion.
   */
  scrub?: boolean;
}

const isVideoSrc = (src: string, kind?: 'iframe' | 'video') =>
  kind === 'video' ||
  (kind !== 'iframe' && (/\.(mp4|webm)(\?|#|$)/i.test(src) || /embed-video\.modal\.run/i.test(src)));

export const Embed = React.forwardRef<HTMLDivElement, EmbedProps>(
  ({ className, src, title, poster, allow = 'fullscreen', kind, reveal = false, scrub = false, aspect, radius, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [shown, setShown] = React.useState(!reveal);
    const [loaded, setLoaded] = React.useState(false);

    const isVideo = isVideoSrc(src, kind);

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

    // Scroll-scrub: drive the turntable's currentTime by how far the element has
    // travelled through the viewport, so the protein rotates as the page scrolls.
    React.useEffect(() => {
      if (!isVideo || !scrub) return;
      const el = innerRef.current;
      const video = videoRef.current;
      if (!el || !video) return;
      if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

      video.pause();
      let raf = 0;
      const update = () => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        // 0 when the element's top reaches the viewport bottom, 1 when its bottom reaches the top
        const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        const d = video.duration;
        if (d && Number.isFinite(d)) video.currentTime = progress * d;
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
      const onMeta = () => update();
      video.addEventListener('loadedmetadata', onMeta);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      if (video.readyState >= 1) update();
      return () => {
        if (raf) cancelAnimationFrame(raf);
        video.removeEventListener('loadedmetadata', onMeta);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }, [isVideo, scrub]);

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
        {/* Poster — behind the media; fades out once it loads */}
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
        {isVideo ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            aria-label={title}
            autoPlay={!scrub}
            loop={!scrub}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow={allow}
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full border-0"
          />
        )}
      </div>
    );
  },
);
Embed.displayName = 'Embed';
