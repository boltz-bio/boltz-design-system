import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from 'motion/react';
import { Button, EyebrowLabel, BlogThumbnail } from '@boltz/ui';
import { ArrowRight, Sparks, Leaf, NavArrowDown } from 'iconoir-react';

// Foundation — Motion PATTERNS.
//
// Advanced, reusable motion recipes built on top of the canonical
// 01-Foundations/Motion language (those are the building blocks; these are the
// finished, real-world patterns). All built in the *app* layer with the
// `motion` package via `motion/react` — `@boltz/ui` ships no animation runtime.
//
// Every pattern honours `prefers-reduced-motion`: when `useReducedMotion()`
// returns true, transforms / loops / scroll effects are dropped and the content
// degrades to a clean static state.

// ── Shared motion language (mirrors the base Motion story) ──────────────────
const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

const transitionStandard = {
  duration: 0.35,
  ease: EASE_STANDARD,
} as const;

const transitionSpring = {
  type: 'spring',
  stiffness: 380,
  damping: 26,
} as const;

const meta = {
  title: '01-Foundations/Motion/Patterns',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Advanced, reusable motion **patterns** for the Boltz product surface — text reveals, count-ups, marquees, magnetic buttons, hover-lift cards, parallax, scroll progress and image reveals — built with `motion/react` (framer-motion’s successor). ' +
          'These complement the building blocks in **01-Foundations/Motion**: same easing `[0.4, 0, 0.2, 1]`, same spring for playful interactions, same app-layer approach (the `@boltz/ui` library ships no motion runtime). ' +
          'Every pattern honours **prefers-reduced-motion** via `useReducedMotion()` — loops, scroll effects and transforms are dropped so content degrades to a clean static state. Mount-triggered demos have a **Replay** button that remounts via a React `key`.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ── Layout helpers ──────────────────────────────────────────────────────────
const Section = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <section className="max-w-container mx-auto">
    <div className="mb-lg">
      <h2 className="text-heading-sm text-text-primary">{title}</h2>
      {hint ? <p className="text-body-sm text-text-muted mt-xs">{hint}</p> : null}
    </div>
    {children}
  </section>
);

// A small Replay affordance that remounts its children by bumping a key.
const ReplayFrame = ({
  children,
}: {
  children: (replayKey: number) => React.ReactNode;
}) => {
  const [replayKey, setReplayKey] = React.useState(0);
  return (
    <div className="flex flex-col gap-md">
      <div>
        <button
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
          className="inline-flex items-center gap-xs rounded-md border border-border-light bg-surface-secondary px-md py-xs text-body-sm text-text-primary transition-colors hover:bg-sage-pale"
        >
          <ArrowRight width={14} height={14} strokeWidth={2} />
          Replay
        </button>
      </div>
      <div className="rounded-lg border border-border-light bg-white p-xl">
        {children(replayKey)}
      </div>
    </div>
  );
};

// A tall, internally-scrollable frame for the scroll-driven patterns. We expose
// the scroll container ref so useScroll can target it instead of the window.
const ScrollFrame = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; height?: number }
>(({ children, height = 320 }, ref) => (
  <div className="flex flex-col gap-xs">
    <div className="flex items-center gap-xs text-body-sm text-text-muted">
      <NavArrowDown width={14} height={14} strokeWidth={2} />
      Scroll inside this frame
    </div>
    <div
      ref={ref}
      className="relative overflow-y-auto rounded-lg border border-border-light bg-white"
      style={{ height }}
    >
      {children}
    </div>
  </div>
));
ScrollFrame.displayName = 'ScrollFrame';

// ── 1. Text reveal (word by word) ───────────────────────────────────────────
export const TextReveal: Story = {
  name: '1. Text reveal (word by word)',
  render: () => {
    const reduce = useReducedMotion();
    const text = 'Foundation models that read the language of biology.';
    const words = text.split(' ');
    return (
      <Section
        title="Text reveal"
        hint="The heading is split on spaces; each word rises and fades in on a stagger. Reduced motion → full text appears at once."
      >
        <ReplayFrame>
          {(replayKey) => (
            <div key={replayKey} className="flex flex-col gap-md">
              <EyebrowLabel icon={<Sparks width={14} height={14} strokeWidth={1.5} />}>
                Hero headline
              </EyebrowLabel>
              {reduce ? (
                <h3 className="text-heading-md text-text-primary max-w-[20ch]">{text}</h3>
              ) : (
                <motion.h3
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
                  }}
                  className="text-heading-md text-text-primary max-w-[20ch]"
                  aria-label={text}
                >
                  {words.map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className="inline-block overflow-hidden align-bottom"
                    >
                      <motion.span
                        aria-hidden
                        className="inline-block"
                        variants={{
                          hidden: { y: '100%', opacity: 0 },
                          show: { y: '0%', opacity: 1, transition: transitionStandard },
                        }}
                      >
                        {word}
                        {i < words.length - 1 ? ' ' : ''}
                      </motion.span>
                    </span>
                  ))}
                </motion.h3>
              )}
            </div>
          )}
        </ReplayFrame>
      </Section>
    );
  },
};

// ── 2. Number count-up ──────────────────────────────────────────────────────
const CountUpStat = ({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const format = React.useCallback(
    (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`,
    [prefix, suffix, decimals],
  );
  const [display, setDisplay] = React.useState(() => (reduce ? format(to) : format(0)));

  React.useEffect(() => {
    if (reduce) {
      setDisplay(format(to));
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE_STANDARD,
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, format]);

  return (
    <div className="flex flex-col gap-xs rounded-lg bg-sage-pale p-lg">
      <span ref={ref} className="text-heading-lg text-text-primary tabular-nums">
        {display}
      </span>
      <span className="text-body-sm text-text-secondary">{label}</span>
    </div>
  );
};

export const NumberCountUp: Story = {
  name: '2. Number count-up',
  render: () => {
    return (
      <Section
        title="Number count-up"
        hint="Each stat counts from 0 to its target via animate() once it scrolls into view (useInView). Reduced motion → final value shown immediately."
      >
        <ReplayFrame>
          {(replayKey) => (
            <div
              key={replayKey}
              className="grid grid-cols-1 gap-md sm:grid-cols-3"
            >
              <CountUpStat to={1200000} prefix="" suffix="" decimals={0} label="Tabletop placeholder" />
              <CountUpStat to={99.4} suffix="%" decimals={1} label="Structure accuracy" />
              <CountUpStat to={48} suffix="×" decimals={0} label="Faster than baseline" />
            </div>
          )}
        </ReplayFrame>
      </Section>
    );
  },
};

// ── 3. Marquee ──────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'Foundation models',
  'Protein folding',
  'Docking',
  'Generative design',
  'Affinity',
  'Co-folding',
  'Open weights',
];

export const Marquee: Story = {
  name: '3. Marquee (infinite loop)',
  render: () => {
    const reduce = useReducedMotion();
    const [paused, setPaused] = React.useState(false);
    const row = (
      <div className="flex shrink-0 items-center gap-md pr-md" aria-hidden>
        {MARQUEE_ITEMS.map((item) => (
          <span
            key={item}
            className="whitespace-nowrap rounded-full border border-border-light bg-surface-secondary px-md py-xs text-body-sm text-text-primary"
          >
            {item}
          </span>
        ))}
      </div>
    );
    return (
      <Section
        title="Marquee"
        hint="The row is duplicated and x animates 0 → -50% on a linear loop, so the seam is invisible. Hover to pause. Reduced motion → a static, wrapping row."
      >
        {reduce ? (
          <div className="flex flex-wrap gap-md rounded-lg border border-border-light bg-white p-lg">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={item}
                className="whitespace-nowrap rounded-full border border-border-light bg-surface-secondary px-md py-xs text-body-sm text-text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div
            className="group relative overflow-hidden rounded-lg border border-border-light bg-white py-lg"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2xl bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-2xl bg-gradient-to-l from-white to-transparent" />
            <motion.div
              className="flex w-max"
              animate={paused ? { x: 0 } : { x: '-50%' }}
              style={paused ? undefined : { x: 0 }}
              transition={
                paused
                  ? { duration: 0 }
                  : { duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
              }
            >
              {row}
              {row}
            </motion.div>
          </div>
        )}
      </Section>
    );
  },
};

// ── 4. Magnetic button ──────────────────────────────────────────────────────
const MagneticButton = () => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    // Pull is a fraction of the offset, capped so it stays gentle.
    const strength = 0.35;
    const max = 18;
    x.set(Math.max(-max, Math.min(max, relX * strength)));
    y.set(Math.max(-max, Math.min(max, relY * strength)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x: springX, y: springY }}
      whileTap={reduce ? undefined : { scale: 0.95 }}
      className="inline-block"
    >
      <Button>Get started</Button>
    </motion.div>
  );
};

export const MagneticButtonStory: Story = {
  name: '4. Magnetic button',
  render: () => {
    return (
      <Section
        title="Magnetic button"
        hint="The button follows the cursor within a small radius (useMotionValue + useSpring), springing back on leave. whileTap presses it. Reduced motion → it stays put."
      >
        <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-border-light bg-white p-xl">
          <MagneticButton />
        </div>
      </Section>
    );
  },
};

// ── 5. Hover-lift card ──────────────────────────────────────────────────────
export const HoverLiftCard: Story = {
  name: '5. Hover-lift card',
  render: () => {
    const reduce = useReducedMotion();
    return (
      <Section
        title="Hover-lift card"
        hint="The card lifts (y + scale) on hover and reveals a CTA overlay. Reduced motion → no lift; the CTA simply shows."
      >
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              { tone: 'sage', category: 'new-research', title: 'Reading the language of biology' },
              { tone: 'blue', category: 'product-launch', title: 'Generative protein design' },
              { tone: 'tierra', category: 'case-study', title: 'Open weights, open science' },
            ] as const
          ).map((card) => (
            <motion.div
              key={card.title}
              initial="rest"
              animate="rest"
              whileHover={reduce ? undefined : 'hover'}
              variants={
                reduce
                  ? undefined
                  : { rest: { y: 0, scale: 1 }, hover: { y: -8, scale: 1.02 } }
              }
              transition={transitionSpring}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
            >
              <BlogThumbnail
                tone={card.tone}
                category={card.category}
                title={card.title}
                className="aspect-[16/10] w-full"
              />
              {/* CTA overlay — fades/rises in on hover (or always visible when reduced) */}
              <motion.div
                variants={
                  reduce
                    ? undefined
                    : { rest: { opacity: 0, y: 8 }, hover: { opacity: 1, y: 0 } }
                }
                transition={transitionStandard}
                className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-sm bg-white/90 px-md py-sm backdrop-blur ${
                  reduce ? '' : 'pointer-events-none'
                }`}
              >
                <span className="text-body-sm text-text-primary">Read article</span>
                <ArrowRight
                  width={16}
                  height={16}
                  strokeWidth={2}
                  className="text-text-primary"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>
    );
  },
};

// ── 6. Parallax on scroll ───────────────────────────────────────────────────
export const ParallaxOnScroll: Story = {
  name: '6. Parallax on scroll',
  render: () => {
    const reduce = useReducedMotion();
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: scrollRef });
    // Move the render up as you scroll down; the panel drifts the other way.
    const renderY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
    const panelY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);
    return (
      <Section
        title="Parallax on scroll"
        hint="useScroll tracks the frame; useTransform maps progress to y so layers move at different rates. Reduced motion → layers hold still."
      >
        <ScrollFrame ref={scrollRef} height={360}>
          {/* Spacer above so there is room to scroll into the scene */}
          <div className="h-[200px]" />
          <div className="relative mx-auto flex h-[280px] max-w-container items-center justify-center overflow-hidden px-lg">
            <motion.div
              style={{ y: panelY }}
              className="absolute inset-x-lg top-1/2 h-[180px] -translate-y-1/2 rounded-lg bg-blue-pale"
            />
            <motion.img
              src="/render-a.png"
              alt="Boltz 3D render"
              style={{ y: renderY }}
              className="relative z-10 h-[200px] w-auto object-contain"
            />
          </div>
          <div className="h-[260px]" />
        </ScrollFrame>
      </Section>
    );
  },
};

// ── 7. Scroll progress ──────────────────────────────────────────────────────
export const ScrollProgress: Story = {
  name: '7. Scroll progress bar',
  render: () => {
    const reduce = useReducedMotion();
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: scrollRef });
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 120,
      damping: 24,
      restDelta: 0.001,
    });
    return (
      <Section
        title="Scroll progress"
        hint="A bar pinned to the top of the frame fills via useScroll → scaleX as you read. Reduced motion still tracks progress (it’s an indicator, not decoration)."
      >
        <ScrollFrame ref={scrollRef} height={320}>
          {/* Sticky progress track */}
          <div className="sticky top-0 z-10 h-[6px] w-full bg-surface-secondary">
            <motion.div
              style={{ scaleX: reduce ? scrollYProgress : scaleX, transformOrigin: '0% 50%' }}
              className="h-full w-full bg-blue-deep"
            />
          </div>
          <div className="mx-auto flex max-w-body flex-col gap-md p-xl">
            <EyebrowLabel icon={<Leaf width={14} height={14} strokeWidth={1.5} />}>
              Long-form
            </EyebrowLabel>
            <h3 className="text-heading-sm text-text-primary">Reading progress</h3>
            {Array.from({ length: 6 }).map((_, i) => (
              <p key={i} className="text-body-md text-text-secondary">
                The bar above advances as this column scrolls. Driving a spring off
                scrollYProgress smooths the motion so the indicator glides instead
                of snapping to each scroll tick — a small, on-brand touch for docs
                and articles.
              </p>
            ))}
          </div>
        </ScrollFrame>
      </Section>
    );
  },
};

// ── 8. Image reveal ─────────────────────────────────────────────────────────
const ImageReveal = ({ src, alt }: { src: string; alt: string }) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        reduce
          ? { clipPath: 'inset(0% 0% 0% 0%)' }
          : inView
            ? { clipPath: 'inset(0% 0% 0% 0%)' }
            : { clipPath: 'inset(0% 0% 100% 0%)' }
      }
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_STANDARD }}
      whileHover={reduce ? undefined : 'hover'}
      className="group overflow-hidden rounded-lg"
    >
      <motion.img
        src={src}
        alt={alt}
        variants={reduce ? undefined : { hover: { scale: 1.05 } }}
        initial={reduce ? undefined : { scale: 1.08 }}
        animate={reduce ? undefined : inView ? { scale: 1 } : { scale: 1.08 }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_STANDARD }}
        className="aspect-[4/3] w-full object-cover"
      />
    </motion.div>
  );
};

export const ImageRevealStory: Story = {
  name: '8. Image reveal',
  render: () => {
    return (
      <Section
        title="Image reveal"
        hint="Each image clip-reveals upward with a slow settle-zoom when scrolled into view (useInView), then nudges in further on hover. Reduced motion → static image."
      >
        <ReplayFrame>
          {(replayKey) => (
            <div
              key={replayKey}
              className="grid grid-cols-1 gap-md sm:grid-cols-3"
            >
              <ImageReveal src="/brand/micro-1.jpg" alt="Microscopy detail" />
              <ImageReveal src="/brand/micro-2.jpg" alt="Microscopy detail" />
              <ImageReveal src="/brand/micro-3.jpg" alt="Microscopy detail" />
            </div>
          )}
        </ReplayFrame>
      </Section>
    );
  },
};
