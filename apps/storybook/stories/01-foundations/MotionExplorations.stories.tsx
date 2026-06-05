import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  animate,
} from 'motion/react';
import { BLOB_SHAPES, Logo, LogoMark, EyebrowLabel, Button } from '@boltz/ui';

/**
 * 01-Foundations / Motion — SVG & brand
 *
 * EXPLORATORY. A scratchpad of SVG + brand-motion experiments built on the
 * `motion` library, with a marketing-page flavour. Everything leans on the
 * Boltz blob graphics (`BLOB_SHAPES` — each item is `{ viewBox, paths }`),
 * the `Logo` / `LogoMark`, and token-only colour.
 *
 * Conventions used across every experiment:
 *  - DS easing `[0.4, 0, 0.2, 1]` for tweens; spring where it should feel playful.
 *  - `useReducedMotion()` → degrade to a static, finished end-state (no draw-on,
 *    no loops, no travel). Each demo checks `reduce` and bails to the resting view.
 *  - Mount-triggered demos expose a Replay button that remounts via a React key.
 *  - Mobile-first, `max-w-container mx-auto`.
 */

const meta = {
  title: '01-Foundations/Motion — SVG & brand',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DS_EASE = [0.4, 0, 0.2, 1] as const;

/* ------------------------------------------------------------------ helpers */

// Each BLOB_SHAPES item = { viewBox: string, paths: string[] }. The first paths
// are the outline + a few tiny crosshair "anchor" marks; the actual organic
// outline is simply the longest path string. Grab it so draw-on traces the blob,
// not a 2px tick mark.
function longestPath(shape: { paths: string[] }): string {
  return shape.paths.reduce((a, b) => (b.length > a.length ? b : a), shape.paths[0]);
}

// Small framed canvas so each experiment reads as a tidy marketing tile.
function Stage({
  label,
  description,
  children,
  onReplay,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
  onReplay?: () => void;
}) {
  return (
    <section className="max-w-container mx-auto">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <EyebrowLabel variant="light">{label}</EyebrowLabel>
          <p className="mt-3 max-w-prose text-body-md text-text-secondary">{description}</p>
        </div>
        {onReplay ? (
          <button
            type="button"
            onClick={onReplay}
            className="shrink-0 rounded-full border border-border-light px-4 py-2 text-body-sm text-text-primary transition-colors hover:bg-surface-secondary"
          >
            Replay
          </button>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl border border-border-warm bg-surface-primary p-6 sm:p-10">
        {children}
      </div>
    </section>
  );
}

/* ============================================================ 1. Path draw-on */

function PathDrawOn() {
  const reduce = useReducedMotion();
  const [key, setKey] = React.useState(0);

  // Three tones of the same family of blobs, each tracing its own outline.
  const tones = [
    { shape: 0, tone: 'text-sage-dark' },
    { shape: 2, tone: 'text-blue-deep' },
    { shape: 7, tone: 'text-tierra-500' },
  ];

  return (
    <Stage
      label="01 · Path draw-on"
      description="The signature move: a blob outline draws itself. Each path animates pathLength 0→1 with the DS ease. Three tones, staggered. The whole graphic is a single SVG inheriting currentColor from a text-* token."
      onReplay={() => setKey((k) => k + 1)}
    >
      <div key={key} className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {tones.map(({ shape, tone }, i) => {
          const s = BLOB_SHAPES[shape];
          const d = longestPath(s);
          return (
            <svg
              key={shape}
              viewBox={s.viewBox}
              fill="none"
              aria-hidden="true"
              className={`mx-auto h-48 w-auto ${tone}`}
            >
              <motion.path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { pathLength: { duration: 1.6, ease: DS_EASE, delay: i * 0.18 }, opacity: { duration: 0.3 } }
                }
              />
            </svg>
          );
        })}
      </div>
    </Stage>
  );
}

export const PathDrawOnStory: Story = {
  name: '1 · Path draw-on',
  render: () => <PathDrawOn />,
};

/* ================================================ 2. Blob-masked image reveal */

function BlobMaskedImage() {
  const reduce = useReducedMotion();
  const clipId = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  // Scroll-linked parallax: as the tile passes through the viewport the clipped
  // photo drifts a few percent — a subtle "alive" feel. Disabled under reduce.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  // A blob whose first path IS the outline → use it directly as the clip.
  const s = BLOB_SHAPES[2];
  const clipD = longestPath(s);

  const animateTo = reduce ? { opacity: 1, scale: 1 } : inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 };

  return (
    <Stage
      label="02 · Blob-masked image reveal"
      description="A photo clipped to a blob outline. The image group eases scale 1.08→1 and fades in on scroll-in (whileInView), with a small token '+' badge that pops. Mirrors the Figma blob-photo treatment."
    >
      <div ref={ref} className="relative mx-auto w-full max-w-md">
        <svg viewBox={s.viewBox} className="h-auto w-full" aria-hidden="true">
          <defs>
            <clipPath id={clipId}>
              <path d={clipD} />
            </clipPath>
          </defs>
          <motion.g
            clipPath={`url(#${clipId})`}
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={animateTo}
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: DS_EASE }}
            style={{ transformOrigin: 'center', y: reduce ? 0 : parallaxY }}
          >
            <image
              href="/brand/people-1.jpg"
              x="0"
              y="0"
              width={s.viewBox.split(' ')[2]}
              height={s.viewBox.split(' ')[3]}
              preserveAspectRatio="xMidYMid slice"
            />
          </motion.g>
        </svg>

        {/* Token "+" badge, pops in after the reveal. */}
        <motion.div
          aria-hidden="true"
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-card-dark text-white shadow-md"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={reduce ? { scale: 1, opacity: 1 } : inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 18, delay: 0.5 }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </Stage>
  );
}

export const BlobMaskedImageStory: Story = {
  name: '2 · Blob-masked image reveal',
  render: () => <BlobMaskedImage />,
};

/* ============================================================ 3. Animated logo */

function AnimatedLogo() {
  const reduce = useReducedMotion();
  const [key, setKey] = React.useState(0);

  // NOTE: a Lottie file could drop straight in here later — motion handles this
  // wordmark wipe + mark settle without one, so we keep the dependency surface small.

  return (
    <Stage
      label="03 · Animated logo"
      description="The wordmark reveals with a left→right clip-path wipe (scaleX mask), then settles. The LogoMark does a small scale + rotate-in alongside it. ~0.8s, tasteful."
      onReplay={() => setKey((k) => k + 1)}
    >
      <div key={key} className="flex flex-col items-center gap-10 py-6">
        <div className="flex items-center gap-6 text-sage-dark">
          {/* Mark: scale + rotate settle */}
          <motion.div
            initial={reduce ? false : { scale: 0.6, rotate: -18, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 18 }}
          >
            <LogoMark className="h-12 w-auto text-sage-dark" />
          </motion.div>

          {/* Wordmark: left→right wipe via a clip-path inset mask */}
          <motion.div
            className="origin-left"
            initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease: DS_EASE, delay: 0.15 }}
          >
            <motion.div
              initial={reduce ? false : { x: -6 }}
              animate={{ x: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: DS_EASE, delay: 0.7 }}
            >
              <Logo className="h-8 w-auto text-sage-dark" title="Boltz" />
            </motion.div>
          </motion.div>
        </div>

        <Button variant="black">Get started</Button>
      </div>
    </Stage>
  );
}

export const AnimatedLogoStory: Story = {
  name: '3 · Animated logo',
  render: () => <AnimatedLogo />,
};

/* ======================================================= 4. Big number + type */

function CountUp({ to, reduce }: { to: number; reduce: boolean | null }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = React.useState(reduce ? to : 0);

  React.useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: DS_EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(2)}%
    </span>
  );
}

function BigNumberType() {
  const reduce = useReducedMotion();
  const [key, setKey] = React.useState(0);
  const glyphs = 'AaBb'.split('');

  return (
    <Stage
      label="04 · Big number + type"
      description="Stat-hero vibe. A large display figure counts up from 0 on scroll-in (formatted to 2 decimals), beside an 'AaBb' type specimen whose glyphs stagger in. Display size is set in container units, not a fixed px."
      onReplay={() => setKey((k) => k + 1)}
    >
      <div key={key} className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:items-center @container">
        <div>
          <p className="mb-2 text-body-sm uppercase tracking-wide text-text-muted">Resolution rate</p>
          <div className="font-sans leading-none text-blue-deep" style={{ fontSize: 'clamp(3rem, 12cqw, 9rem)' }}>
            <CountUp to={72.8} reduce={reduce} />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="flex items-baseline justify-center gap-1 text-sage-dark"
          style={{ fontSize: 'clamp(4rem, 18cqw, 11rem)' }}
        >
          {glyphs.map((g, i) => (
            <motion.span
              key={g + i}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: DS_EASE, delay: 0.2 + i * 0.12 }}
            >
              {g}
            </motion.span>
          ))}
        </div>
      </div>
    </Stage>
  );
}

export const BigNumberTypeStory: Story = {
  name: '4 · Big number + type',
  render: () => <BigNumberType />,
};

/* ========================================================= 5. Dot grid + path */

function DotGridPath() {
  const reduce = useReducedMotion();
  const [key, setKey] = React.useState(0);
  const cols = 6;
  const rows = 6;
  const dots = Array.from({ length: cols * rows });

  const s = BLOB_SHAPES[18];
  const d = longestPath(s);

  return (
    <Stage
      label="05 · Dot grid + path"
      description="A 6×6 grid of token dots staggers in, then a blob outline draws on top of it (pathLength). Mirrors the Figma dot-grid + blob-line motif."
      onReplay={() => setKey((k) => k + 1)}
    >
      <div key={key} className="relative mx-auto aspect-square w-full max-w-sm">
        {/* dot grid */}
        <div className="grid h-full w-full place-items-center" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {dots.map((_, i) => (
            <motion.span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-neutral-grey-100"
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.4, ease: DS_EASE, delay: (i % cols) * 0.03 + Math.floor(i / cols) * 0.03 }}
            />
          ))}
        </div>

        {/* blob line over the grid */}
        <svg
          viewBox={s.viewBox}
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 h-full w-full text-blue-deep"
        >
          <motion.path
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 1.8, ease: DS_EASE, delay: 0.5 }}
          />
        </svg>
      </div>
    </Stage>
  );
}

export const DotGridPathStory: Story = {
  name: '5 · Dot grid + path',
  render: () => <DotGridPath />,
};

/* ======================================================= 6. Traveling marker */

// A trimmed blob outline expressed in a 0–292 / 0–349 box (shape 2's space),
// used both as the faint guide path and the CSS motion-path the marker rides.
const TRAVEL_PATH = longestPath(BLOB_SHAPES[2]);
const TRAVEL_VIEWBOX = BLOB_SHAPES[2].viewBox;

function TravelingMarker() {
  const reduce = useReducedMotion();

  return (
    <Stage
      label="06 · Traveling marker"
      description="A '+' marker rides a blob outline using CSS motion-path (offsetPath + offsetDistance 0→100%, looping linearly). The same path is drawn faintly behind it as a guide. Reduced-motion parks the marker at the start."
    >
      <div className="relative mx-auto w-full max-w-md">
        {/* faint guide path */}
        <svg viewBox={TRAVEL_VIEWBOX} fill="none" aria-hidden="true" className="h-auto w-full text-border-light">
          <path
            d={TRAVEL_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
        </svg>

        {/* traveling "+" marker, positioned in the same coordinate space via SVG overlay */}
        <svg
          viewBox={TRAVEL_VIEWBOX}
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <motion.g
            initial={false}
            animate={reduce ? { offsetDistance: '0%' } : { offsetDistance: ['0%', '100%'] }}
            transition={reduce ? { duration: 0 } : { repeat: Infinity, duration: 6, ease: 'linear' }}
            style={{ offsetPath: `path("${TRAVEL_PATH}")`, offsetRotate: '0deg' }}
          >
            <circle r={12} className="fill-blue-deep" />
            <path d="M-5 0H5M0 -5V5" className="stroke-white" strokeWidth={2} strokeLinecap="round" />
          </motion.g>
        </svg>
      </div>
    </Stage>
  );
}

export const TravelingMarkerStory: Story = {
  name: '6 · Traveling marker',
  render: () => <TravelingMarker />,
};
