import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import { Button, Card, CardSmall, EyebrowLabel, BlogThumbnail } from '@boltz/ui';
import { Sparks, Leaf, ArrowRight, FlashOff } from 'iconoir-react';

// Foundation — Motion / animation patterns.
//
// IMPORTANT: the @boltz/ui library ships NO animation runtime. Motion lives in
// the *app* layer — these patterns are built here in the Storybook app with the
// `motion` package (framer-motion's successor) via `motion/react`. Consume them
// in your product by importing `motion` and reusing the shared transition /
// variant constants below.
//
// Every pattern honours `prefers-reduced-motion`: when the OS setting is on,
// `useReducedMotion()` returns true and we drop the transforms / opacity tweens
// so content simply appears.

// ── Shared motion language ──────────────────────────────────────────────────
// DS feel: short transitions (0.2–0.5s) on the standard easing curve, with a
// springy option reserved for the more playful micro-interactions.
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

// Fade + rise — the canonical "section reveal" variant.
const fadeRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: transitionStandard },
};

// Stagger container — reveals its children one after another.
const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const meta = {
  title: '01-Foundations/Motion',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Motion patterns for the Boltz product surface — page / section reveals, section transitions, and micro-interactions — built with `motion/react` (framer-motion’s successor). ' +
          'Motion lives in the **app layer**: the `@boltz/ui` library ships none, so compose these patterns where you assemble pages and reuse the shared `transitionStandard` / `fadeRise` / `staggerParent` constants. ' +
          'The DS feel is short tweens (0.2–0.5s) on the standard easing `[0.4, 0, 0.2, 1]`, with a spring reserved for playful micro-interactions. ' +
          'Every pattern honours **prefers-reduced-motion** via `useReducedMotion()` — when on, transforms and opacity tweens are dropped so content just appears. Each story has a **Replay** button that remounts the demo (React `key`) to re-trigger the mount animation.',
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

// ── 1. Fade + rise on mount ─────────────────────────────────────────────────
export const FadeRiseOnMount: Story = {
  name: '1. Fade + rise on mount',
  render: () => {
    const reduce = useReducedMotion();
    return (
      <Section
        title="Fade + rise on mount"
        hint="opacity 0→1, y 16→0 on the standard easing. The building block for the rest of these patterns."
      >
        <ReplayFrame>
          {(replayKey) => (
            <motion.div
              key={replayKey}
              initial={reduce ? false : 'hidden'}
              animate="show"
              variants={fadeRise}
              className="flex flex-col gap-md"
            >
              <EyebrowLabel icon={<Sparks width={14} height={14} strokeWidth={1.5} />}>
                On mount
              </EyebrowLabel>
              <h3 className="text-heading-md text-text-primary">
                Content rises gently into place
              </h3>
              <p className="text-body-md text-text-secondary max-w-[60ch]">
                A heading and paragraph block fade up together. Use this for hero
                copy and above-the-fold sections that are visible at load — there
                is no scroll trigger, the animation runs as soon as it mounts.
              </p>
            </motion.div>
          )}
        </ReplayFrame>
      </Section>
    );
  },
};

// ── 2. Scroll reveal ────────────────────────────────────────────────────────
export const ScrollReveal: Story = {
  name: '2. Scroll reveal (sections)',
  render: () => {
    const reduce = useReducedMotion();
    const blocks = [
      {
        eyebrow: 'Section one',
        title: 'Sections reveal as you scroll',
        body: 'Each block uses whileInView with viewport={{ once: true, margin: ‘-15%’ }} so it animates the moment it enters the frame, and only once.',
        bg: 'bg-sage-pale',
      },
      {
        eyebrow: 'Section two',
        title: 'The key "page sections" pattern',
        body: 'Scroll the docs frame to trigger the next blocks. Reuse the shared fadeRise variant so every section on a page shares the same motion language.',
        bg: 'bg-blue-pale',
      },
      {
        eyebrow: 'Section three',
        title: 'Cheap and resilient',
        body: 'whileInView is observer-based, so it stays performant across long marketing pages without manual scroll listeners.',
        bg: 'bg-tierra-100',
      },
    ];
    return (
      <Section
        title="Scroll reveal"
        hint="whileInView · viewport once, margin -15%. Scroll the frame to trigger each section."
      >
        <ReplayFrame>
          {(replayKey) => (
            <div key={replayKey} className="flex flex-col gap-lg">
              {blocks.map((b, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : 'hidden'}
                  whileInView="show"
                  viewport={{ once: true, margin: '-15%' }}
                  variants={fadeRise}
                  className={`rounded-lg ${b.bg} p-xl flex flex-col gap-sm`}
                >
                  <EyebrowLabel icon={<Leaf width={14} height={14} strokeWidth={1.5} />}>
                    {b.eyebrow}
                  </EyebrowLabel>
                  <h3 className="text-heading-sm text-text-primary">{b.title}</h3>
                  <p className="text-body-md text-text-secondary max-w-[60ch]">
                    {b.body}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </ReplayFrame>
      </Section>
    );
  },
};

// ── 3. Stagger children ─────────────────────────────────────────────────────
export const StaggerChildren: Story = {
  name: '3. Stagger children (grid)',
  render: () => {
    const reduce = useReducedMotion();
    const cards = [
      { color: 'sage-pale' as const, heading: 'Atmospheric', body: 'Calm, sage-tinted surface.' },
      { color: 'blue-pale' as const, heading: 'Secondary', body: 'Cool blue-tinted surface.' },
      { color: 'tierra-100' as const, heading: 'Warm', body: 'Earthy tierra surface.' },
      { color: 'white' as const, heading: 'Neutral', body: 'Plain bordered surface.' },
    ];
    return (
      <Section
        title="Stagger children"
        hint="A parent variant with staggerChildren reveals each card in sequence."
      >
        <ReplayFrame>
          {(replayKey) => (
            <motion.div
              key={replayKey}
              initial={reduce ? false : 'hidden'}
              animate="show"
              variants={staggerParent}
              className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4"
            >
              {cards.map((c) => (
                <motion.div key={c.heading} variants={fadeRise}>
                  <CardSmall
                    color={c.color}
                    icon={<Sparks width={20} height={20} strokeWidth={1.5} />}
                    heading={c.heading}
                    body={c.body}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </ReplayFrame>
      </Section>
    );
  },
};

// ── 4. Section transition ───────────────────────────────────────────────────
const PANELS = {
  a: {
    eyebrow: 'Tab A',
    title: 'Crossfade + slide',
    body: 'AnimatePresence swaps the mounted panel: the outgoing one fades and slides out while the incoming one fades and slides in. mode="wait" keeps them from overlapping.',
    tone: 'sage' as const,
  },
  b: {
    eyebrow: 'Tab B',
    title: 'Same motion, new content',
    body: 'Toggling reuses one transition definition, so every tab swap across the product feels identical. Reduced motion drops the x offset and shortens the fade.',
    tone: 'blue' as const,
  },
};

export const SectionTransition: Story = {
  name: '4. Section transition (AnimatePresence)',
  render: () => {
    const reduce = useReducedMotion();
    const [tab, setTab] = React.useState<'a' | 'b'>('a');
    const panel = PANELS[tab];
    return (
      <Section
        title="Section transition"
        hint="AnimatePresence mode=wait crossfades + slides between two panels."
      >
        <div className="flex flex-col gap-md">
          <div className="flex gap-sm">
            {(['a', 'b'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-md px-md py-xs text-body-sm transition-colors ${
                  tab === t
                    ? 'bg-action-primary text-text-on-dark'
                    : 'border border-border-light bg-surface-secondary text-text-primary hover:bg-sage-pale'
                }`}
              >
                {PANELS[t].eyebrow}
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border-light bg-white p-xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={reduce ? { duration: 0.15 } : transitionStandard}
                className="flex flex-col gap-sm"
              >
                <EyebrowLabel
                  icon={<Sparks width={14} height={14} strokeWidth={1.5} />}
                >
                  {panel.eyebrow}
                </EyebrowLabel>
                <h3 className="text-heading-sm text-text-primary">{panel.title}</h3>
                <p className="text-body-md text-text-secondary max-w-[60ch]">
                  {panel.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>
    );
  },
};

// ── 5. Micro-interactions ───────────────────────────────────────────────────
export const MicroInteractions: Story = {
  name: '5. Micro-interactions (hover / tap / layout)',
  render: () => {
    const reduce = useReducedMotion();
    const [expanded, setExpanded] = React.useState(false);
    // Hover/tap scales — disabled under reduced motion.
    const hover = reduce ? undefined : { scale: 1.02 };
    const tap = reduce ? undefined : { scale: 0.98 };
    return (
      <Section
        title="Micro-interactions"
        hint="whileHover / whileTap scale (1.02 / 0.98) on the spring, plus a layout animation. Hover and tap the cards."
      >
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
          <motion.div
            whileHover={hover}
            whileTap={tap}
            transition={transitionSpring}
            className="cursor-pointer"
          >
            <BlogThumbnail
              tone="sage"
              category="new-research"
              title="Lift on hover, press on tap"
              className="aspect-[16/10] w-full"
            />
          </motion.div>

          <div className="flex flex-col gap-md">
            <motion.div whileHover={hover} whileTap={tap} transition={transitionSpring}>
              <Card variant="blue" className="p-lg">
                <div className="flex flex-col gap-xs">
                  <h3 className="text-heading-sm text-text-primary">
                    Wrap any component
                  </h3>
                  <p className="text-body-sm text-text-secondary">
                    A motion.div wrapper adds hover / tap feel without touching the
                    DS component itself.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={hover} whileTap={tap} transition={transitionSpring}>
              <Button onClick={() => setExpanded((e) => !e)}>
                {expanded ? 'Collapse' : 'Expand'}
              </Button>
            </motion.div>

            <motion.div
              layout={!reduce}
              transition={reduce ? { duration: 0 } : transitionStandard}
              className="overflow-hidden rounded-lg bg-tierra-100 p-lg"
            >
              <p className="text-body-sm text-text-secondary">
                Layout animation: the box smoothly resizes when its content
                changes.
              </p>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.p
                    layout={!reduce}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduce ? { duration: 0 } : transitionStandard}
                    className="text-body-sm text-text-primary mt-sm"
                  >
                    Toggling the button above grows this panel — `layout` tweens
                    the height change instead of snapping.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </Section>
    );
  },
};

// ── 6. Reduced motion ───────────────────────────────────────────────────────
export const ReducedMotion: Story = {
  name: '6. Reduced motion',
  render: () => {
    const reduce = useReducedMotion();
    return (
      <Section
        title="Reduced motion"
        hint="Toggle your OS “reduce motion” setting (or Storybook a11y addon) to see this disable the tween."
      >
        <div className="flex flex-col gap-lg">
          <div
            className={`flex items-start gap-md rounded-lg p-lg ${
              reduce ? 'bg-blue-pale' : 'bg-sage-pale'
            }`}
          >
            <FlashOff
              width={20}
              height={20}
              strokeWidth={1.5}
              className="text-text-primary shrink-0 mt-xs"
            />
            <div>
              <p className="text-body-md text-text-primary">
                prefers-reduced-motion is currently{' '}
                <strong>{reduce ? 'ON' : 'OFF'}</strong>.
              </p>
              <p className="text-body-sm text-text-secondary mt-xs max-w-[60ch]">
                Every story on this page calls `useReducedMotion()`. When it
                returns true we pass `initial={'{false}'}` and drop transform /
                opacity tweens so content appears instantly — no jank, no motion
                sickness.
              </p>
            </div>
          </div>

          <ReplayFrame>
            {(replayKey) => (
              <motion.div
                key={replayKey}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : transitionStandard}
                className="rounded-lg bg-surface-secondary p-xl flex flex-col gap-sm"
              >
                <EyebrowLabel icon={<Leaf width={14} height={14} strokeWidth={1.5} />}>
                  {reduce ? 'Animation disabled' : 'Animation enabled'}
                </EyebrowLabel>
                <h3 className="text-heading-sm text-text-primary">
                  {reduce
                    ? 'This block appears instantly'
                    : 'This block rises in — replay to compare'}
                </h3>
                <p className="text-body-md text-text-secondary max-w-[60ch]">
                  With reduce-motion on, hitting Replay shows the block snap in
                  with no movement. With it off, it fades and rises on the
                  standard easing.
                </p>
              </motion.div>
            )}
          </ReplayFrame>
        </div>
      </Section>
    );
  },
};
