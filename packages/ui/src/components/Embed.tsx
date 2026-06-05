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
// The Studio render bakes in its background colour. Rather than typing an exact hex,
// pick a `surface` preset that matches one of Studio's background swatches — they are
// the Boltz tokens: surface→#FBFAF7, white→#fff, sage→#EDF7ED, blue→#EEF6FA, dark→#142D36.
// Bake the matching swatch in Studio and the render floats seamlessly on that surface.

const frame = cva('relative w-full overflow-hidden', {
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
    // Frame background — match the colour baked into the Studio render so there's no box.
    surface: {
      none: 'bg-surface-secondary',
      surface: 'bg-surface-primary',
      white: 'bg-white',
      sage: 'bg-sage-pale',
      blue: 'bg-blue-pale',
      dark: 'bg-blue-dark',
    },
  },
  defaultVariants: { aspect: 'video', radius: 'lg', surface: 'none' },
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
   * page scrolls (instead of autoplaying on a loop). Eased for smoothness; disabled
   * under reduced-motion.
   */
  scrub?: boolean;
  /**
   * Video only: let the viewer click the turntable to swap in the live, drag-to-rotate
   * iframe (`interactiveSrc`). Shows a subtle "drag to rotate" hint until activated.
   */
  interactive?: boolean;
  /** The live iframe URL used when `interactive` is activated (a Boltz Studio embed view). */
  interactiveSrc?: string;
}

const isVideoSrc = (src: string, kind?: 'iframe' | 'video') =>
  kind === 'video' ||
  (kind !== 'iframe' && (/\.(mp4|webm)(\?|#|$)/i.test(src) || /embed-video\.modal\.run/i.test(src)));

export const Embed = React.forwardRef<HTMLDivElement, EmbedProps>(
  (
    {
      className, src, title, poster, allow = 'fullscreen', kind,
      reveal = false, scrub = false, interactive = false, interactiveSrc,
      aspect, radius, surface, ...rest
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [shown, setShown] = React.useState(!reveal);
    const [loaded, setLoaded] = React.useState(false);
    const [active, setActive] = React.useState(false); // interactive iframe engaged

    const isVideo = isVideoSrc(src, kind);
    const canInteract = isVideo && interactive && !!interactiveSrc;

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

    // Scroll-scrub: map how far the element has travelled through the viewport to the
    // turntable's currentTime, eased toward the target each frame so the rotation glides
    // rather than snapping. Skipped under reduced-motion or once interaction takes over.
    React.useEffect(() => {
      if (!isVideo || !scrub || active) return;
      const el = innerRef.current;
      const video = videoRef.current;
      if (!el || !video) return;
      if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

      video.pause();
      let target = video.currentTime || 0;
      let current = target;
      let raf = 0;
      let running = false;

      const tick = () => {
        const d = video.duration;
        current += (target - current) * 0.12; // ease factor — lower = smoother/slower
        if (Math.abs(target - current) < 0.004) {
          current = target;
          running = false;
          if (d && Number.isFinite(d)) video.currentTime = current;
          return;
        }
        if (d && Number.isFinite(d)) video.currentTime = current;
        raf = requestAnimationFrame(tick);
      };
      const ensureRunning = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
      const computeTarget = () => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        const d = video.duration;
        target = progress * (d && Number.isFinite(d) ? d : 0);
        ensureRunning();
      };
      const onScroll = () => computeTarget();
      const onMeta = () => computeTarget();
      video.addEventListener('loadedmetadata', onMeta);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      if (video.readyState >= 1) computeTarget();
      return () => {
        if (raf) cancelAnimationFrame(raf);
        video.removeEventListener('loadedmetadata', onMeta);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }, [isVideo, scrub, active]);

    const setRefs = (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={setRefs}
        className={cn(
          frame({ aspect, radius, surface }),
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
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              'transition-opacity duration-base ease-standard',
              active ? 'opacity-0' : 'opacity-100',
            )}
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

        {/* Interactive swap — click the turntable to drag-rotate the live model */}
        {canInteract && active && (
          <iframe
            src={interactiveSrc}
            title={`${title} — interactive`}
            loading="lazy"
            allow={allow}
            className="absolute inset-0 w-full h-full border-0"
          />
        )}
        {canInteract && !active && (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Interact with ${title}`}
            className={cn(
              'group absolute inset-0 flex items-end justify-center pb-md',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
            )}
          >
            <span
              className={cn(
                'rounded-full bg-surface-card-dark/70 px-md py-xs',
                'text-body-sm text-text-on-dark',
                'opacity-0 translate-y-1 transition-[opacity,transform] duration-base ease-standard',
                'group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0',
                'motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0',
              )}
            >
              Drag to rotate
            </span>
          </button>
        )}
      </div>
    );
  },
);
Embed.displayName = 'Embed';
