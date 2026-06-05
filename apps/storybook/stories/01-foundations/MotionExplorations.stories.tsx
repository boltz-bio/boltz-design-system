import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { motion, useReducedMotion, useInView, animate } from 'motion/react';
import { EyebrowLabel } from '@boltz/ui';

/**
 * 01-Foundations / Motion — SVG & brand
 *
 * A marketing "stat hero": a large display figure that counts up from 0 on
 * scroll-in, beside a type specimen whose glyphs stagger in. Display size is set
 * in container units (cqw) so it scales with the tile. Honours reduced motion.
 */

const meta = {
  title: '01-Foundations/Motion/SVG & brand',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DS_EASE = [0.4, 0, 0.2, 1] as const;

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
      <div className="mb-md flex items-end justify-between gap-lg">
        <div>
          <EyebrowLabel variant="light">{label}</EyebrowLabel>
          <p className="mt-sm max-w-body text-body-md text-text-secondary">{description}</p>
        </div>
        {onReplay ? (
          <button
            type="button"
            onClick={onReplay}
            className="shrink-0 rounded-full border border-border-light px-lg py-sm text-body-sm text-text-primary transition-colors hover:bg-surface-secondary"
          >
            Replay
          </button>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl border border-border-warm bg-surface-primary p-xl tablet:p-2xl">
        {children}
      </div>
    </section>
  );
}

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
      label="Big number + type"
      description="Stat-hero vibe. A large display figure counts up from 0 on scroll-in (formatted to 2 decimals), beside an 'AaBb' type specimen whose glyphs stagger in. Display size is set in container units, not a fixed px."
      onReplay={() => setKey((k) => k + 1)}
    >
      <div key={key} className="grid grid-cols-1 gap-2xl sm:grid-cols-2 sm:items-center [container-type:inline-size]">
        <div>
          <p className="mb-sm text-body-sm uppercase tracking-wide text-text-muted">Resolution rate</p>
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
  name: 'Big number + type',
  render: () => <BigNumberType />,
};
