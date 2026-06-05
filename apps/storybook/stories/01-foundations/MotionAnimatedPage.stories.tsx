import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react';
import {
  NavBar,
  NavLink,
  EyebrowLabel,
  Button,
  TextButton,
  BlogThumbnail,
  StatBand,
  Footer,
  IconContainer,
} from '@boltz/ui';
import {
  Leaf,
  Community,
  Code,
  Flash,
  Lock,
  Cpu,
  Database,
  ShieldCheck,
  GraphUp,
} from 'iconoir-react';
import { navItems } from '../_data/boltz';

// ─────────────────────────────────────────────────────────────────────────────
// Landing (animated)
//
// A single, fully-animated marketing page for Boltz, composed from @boltz/ui
// sections and wrapped in `motion/react`. The DS ships NO animation runtime —
// motion lives here in the app layer (see 01-Foundations/Motion for the shared
// language). Every animated block degrades gracefully under
// `prefers-reduced-motion`: when on, content renders statically with no
// transforms, parallax, marquee or count-up.
// ─────────────────────────────────────────────────────────────────────────────

const meta = {
  title: '01-Foundations/Motion — Animated page',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A polished, fully-animated Boltz landing page built with `motion/react` over @boltz/ui. ' +
          'Includes a scroll-progress bar, a mount-revealed nav + hero with a floating protein, an infinite logo marquee, ' +
          'scroll-staggered feature cards, count-up stats, a blog row, a dark CTA band and a fading footer. ' +
          'All motion honours prefers-reduced-motion via `useReducedMotion()`.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Shared motion language ──────────────────────────────────────────────────
// Mirrors 01-Foundations/Motion: short tweens on the standard easing, with a
// spring reserved for playful hover/tap micro-interactions.
const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

const transitionStandard = { duration: 0.45, ease: EASE_STANDARD } as const;
const transitionSpring = { type: 'spring', stiffness: 380, damping: 26 } as const;

const fadeRise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: transitionStandard },
};

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const iconLg = { width: 20, height: 20, strokeWidth: 1.5 } as const;
const PROTEIN = '/render-a.png';

// ── Reveal helpers ──────────────────────────────────────────────────────────
// A shared section-reveal wrapper so every block degrades identically: under
// reduced motion we skip the initial state entirely (content just appears).
function useMotionGuard() {
  const reduce = useReducedMotion();
  return {
    reduce: !!reduce,
    // hover / tap scales — undefined (disabled) under reduced motion.
    hover: reduce ? undefined : { scale: 1.02 },
    tap: reduce ? undefined : { scale: 0.98 },
  };
}

const Reveal: React.FC<
  React.ComponentProps<typeof motion.div> & { stagger?: boolean }
> = ({ stagger, children, ...rest }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-15%' }}
      variants={stagger ? staggerParent : fadeRise}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const SECTION_INSET = 'max-w-container mx-auto px-md tablet:px-40';

// ── Count-up number (stats band) ────────────────────────────────────────────
// Animates from 0 → target with requestAnimationFrame when scrolled into view.
// Under reduced motion it renders the final value immediately. `format` rebuilds
// the display string (prefix/suffix, thousands separators) each frame.
const CountUp: React.FC<{
  to: number;
  duration?: number;
  format: (n: number) => string;
}> = ({ to, duration = 1.4, format }) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [value, setValue] = React.useState(reduce ? to : 0);

  React.useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;
      const p = Math.min(elapsed / duration, 1);
      // easeOut for a settled finish
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  return <span ref={ref}>{format(value)}</span>;
};

// ── Content data ────────────────────────────────────────────────────────────
const marqueeLabels = [
  'Biopharma',
  'Agriculture',
  'Academia',
  'Biotech',
  'Materials',
  'Genomics',
  'Diagnostics',
  'Consumer R&D',
];

const features = [
  {
    icon: <Cpu {...iconLg} />,
    title: 'Frontier models',
    body: 'State-of-the-art structure prediction and generative design across every molecule size.',
  },
  {
    icon: <Flash {...iconLg} />,
    title: 'Blazing inference',
    body: 'High-performance compute serves predictions 10× faster than the previous SOTA.',
  },
  {
    icon: <Database {...iconLg} />,
    title: 'Powerful APIs',
    body: 'Clean, typed endpoints and SDKs that drop straight into your existing pipelines.',
  },
  {
    icon: <ShieldCheck {...iconLg} />,
    title: 'Secure deployment',
    body: 'Run in your VPC or on dedicated hardware with full data isolation and audit trails.',
  },
];

const stats: { node: React.ReactNode; label: string }[] = [
  {
    node: <CountUp to={1} format={(n) => `${n.toFixed(0)}M+`} />,
    label: 'scientists worldwide',
  },
  {
    node: (
      <CountUp
        to={6000}
        format={(n) => `${Math.round(n).toLocaleString('en-US')}+`}
      />
    ),
    label: 'GitHub stars',
  },
  {
    node: <CountUp to={20} format={(n) => `Top ${Math.round(n)}`} />,
    label: 'pharma companies',
  },
  {
    node: <CountUp to={200} format={(n) => `${Math.round(n)}+`} />,
    label: 'active integrations',
  },
];

const blogPosts = [
  {
    id: 'b1',
    tone: 'sage' as const,
    category: 'product-launch' as const,
    title: 'Announcing Boltz',
    renderSrc: PROTEIN,
    blobShape: 8,
  },
  {
    id: 'b2',
    tone: 'blue' as const,
    category: 'new-research' as const,
    title: 'Boltz Lab and our first agents',
    renderSrc: PROTEIN,
    blobShape: 11,
  },
  {
    id: 'b3',
    tone: 'tierra' as const,
    category: 'case-study' as const,
    title: 'The future we are building at Boltz',
    blobShape: 5,
  },
];

const footerColumns = [
  {
    heading: 'Community',
    links: [
      { label: 'Github', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Slack', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Career', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Legal', href: '#' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export const LandingAnimated: Story = {
  render: () => <LandingPage />,
};

const LandingPage: React.FC = () => {
  const { reduce, hover, tap } = useMotionGuard();

  // Scroll-progress bar — scaleX driven by overall page scroll.
  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Hero protein parallax: gentle infinite float, disabled under reduced motion.
  const float = reduce
    ? undefined
    : {
        y: [0, -14, 0],
        transition: { duration: 6, ease: 'easeInOut' as const, repeat: Infinity },
      };

  return (
    <div className="bg-surface-primary">
      {/* ── Scroll-progress bar (fixed, token-tinted) ── */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-blue-deep"
        style={{ scaleX: reduce ? 1 : progressScaleX }}
      />

      {/* ── 1. NavBar — slides/fades down on mount ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionStandard}
      >
        <NavBar>
          {navItems.map((n) => (
            <NavLink key={n} href="#">
              {n}
            </NavLink>
          ))}
        </NavBar>
      </motion.div>

      <main>
        {/* ── 2. Hero — staggered reveal + floating protein ── */}
        <section className="bg-sage-pale overflow-hidden">
          <div
            className={`${SECTION_INSET} py-2xl tablet:py-section grid grid-cols-1 items-center gap-2xl laptop:grid-cols-2`}
          >
            <motion.div
              initial={reduce ? false : 'hidden'}
              animate="show"
              variants={staggerParent}
              className="flex flex-col gap-lg max-w-hero"
            >
              <motion.div variants={fadeRise}>
                <EyebrowLabel icon={<Leaf {...sz} />}>Build on Boltz</EyebrowLabel>
              </motion.div>
              <motion.h1
                variants={fadeRise}
                className="text-heading-lg text-text-primary"
              >
                Foundational AI for biology and chemistry.
              </motion.h1>
              <motion.p
                variants={fadeRise}
                className="text-body-lg text-text-secondary max-w-body"
              >
                Frontier models and high-performance compute for designing all of
                life&rsquo;s molecules.
              </motion.p>
              <motion.div
                variants={fadeRise}
                className="flex flex-col gap-md mobile:flex-row mobile:items-center"
              >
                <motion.div whileHover={hover} whileTap={tap} transition={transitionSpring}>
                  <Button variant="black">Start building with Boltz</Button>
                </motion.div>
                <motion.div whileHover={hover} whileTap={tap} transition={transitionSpring}>
                  <Button variant="white">Read the docs</Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Protein media — scales + fades in, then gently floats. */}
            <motion.div
              className="flex justify-center"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...transitionStandard, duration: 0.6, delay: 0.15 }}
            >
              <motion.img
                src={PROTEIN}
                alt="Boltz protein render"
                className="w-[260px] tablet:w-[440px]"
                animate={float}
              />
            </motion.div>
          </div>
        </section>

        {/* ── 3. Logo strip — infinite marquee ── */}
        <section className="py-xl border-y border-border-light overflow-hidden">
          <Marquee labels={marqueeLabels} reduce={reduce} />
        </section>

        {/* ── 4. Feature grid — scroll-reveal with stagger, hover lift ── */}
        <section className="py-2xl tablet:py-section">
          <div className={`${SECTION_INSET} flex flex-col gap-2xl`}>
            <Reveal className="flex flex-col gap-md max-w-body">
              <EyebrowLabel icon={<Code {...sz} />}>Platform</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-[20ch]">
                Everything you need to design molecules, end to end.
              </h2>
            </Reveal>

            <Reveal
              stagger
              className="grid grid-cols-1 gap-lg mobile:grid-cols-2 laptop:grid-cols-4"
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  variants={fadeRise}
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={transitionSpring}
                  className="flex min-h-[180px] flex-col justify-between gap-2xl rounded-lg border border-border-light bg-surface-card-light p-lg transition-colors hover:border-sage-medium"
                >
                  <IconContainer variant="light">{f.icon}</IconContainer>
                  <div className="flex flex-col gap-xs">
                    <h3 className="text-body-lg text-text-primary font-semibold">
                      {f.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary">{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 5. Stats band — numbers count up in view ── */}
        <section className="py-2xl tablet:py-section bg-sage-pale">
          <div className={SECTION_INSET}>
            <Reveal>
              <StatBand
                eyebrow="Trusted by scientists"
                eyebrowIcon={<GraphUp {...sz} />}
                stats={stats.map((s) => ({ value: s.node, label: s.label }))}
              />
            </Reveal>
          </div>
        </section>

        {/* ── 6. Blog/news row — reveal on scroll, scale on hover ── */}
        <section className="py-2xl tablet:py-section">
          <div className={`${SECTION_INSET} flex flex-col gap-2xl`}>
            <Reveal className="flex items-end justify-between gap-lg">
              <div className="flex flex-col gap-md">
                <EyebrowLabel icon={<Leaf {...sz} />}>Latest</EyebrowLabel>
                <h2 className="text-heading-md text-text-primary max-w-[18ch]">
                  News from the frontier.
                </h2>
              </div>
              <TextButton arrow>View all posts</TextButton>
            </Reveal>

            <Reveal
              stagger
              className="grid grid-cols-1 gap-lg mobile:grid-cols-3"
            >
              {blogPosts.map((p) => (
                <motion.div key={p.id} variants={fadeRise} className="cursor-pointer">
                  <motion.div whileHover={hover} whileTap={tap} transition={transitionSpring}>
                    <BlogThumbnail
                      tone={p.tone}
                      category={p.category}
                      title={p.title}
                      renderSrc={p.renderSrc}
                      blobShape={p.blobShape}
                      className="aspect-[4/3] w-full"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 7. CTA band (dark) — reveals on scroll ── */}
        <section className="py-2xl tablet:py-section">
          <div className={SECTION_INSET}>
            <Reveal>
              <div className="flex flex-col items-start gap-lg rounded-xl bg-surface-card-dark p-xl tablet:p-2xl">
                <EyebrowLabel variant="dark" icon={<Community {...sz} />}>
                  Partner with us
                </EyebrowLabel>
                <h2 className="text-heading-md text-text-on-dark max-w-[22ch]">
                  Accelerate your research with the foundation models for science.
                </h2>
                <p className="text-body-md text-white/70 max-w-body">
                  We partner with pioneering teams to tackle the hardest problems in
                  drug discovery. Reach out to explore how we can accelerate your work.
                </p>
                <motion.div whileHover={hover} whileTap={tap} transition={transitionSpring}>
                  <Button variant="white">Get in touch</Button>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── 8. Footer — fades in ── */}
      <Reveal>
        <Footer columns={footerColumns} />
      </Reveal>
    </div>
  );
};

// ── Infinite horizontal marquee ─────────────────────────────────────────────
// Two identical label tracks translate -50% on loop, giving a seamless scroll.
// Under reduced motion the track is static (no animation, no duplicate offset).
const Marquee: React.FC<{ labels: string[]; reduce: boolean }> = ({
  labels,
  reduce,
}) => {
  const [paused, setPaused] = React.useState(false);
  const track = (
    <div className="flex shrink-0 items-center gap-2xl px-[40px]">
      {labels.map((label) => (
        <span
          key={label}
          className="text-body-md text-text-muted whitespace-nowrap"
        >
          {label}
        </span>
      ))}
    </div>
  );

  if (reduce) {
    return (
      <div className={`${SECTION_INSET} flex flex-wrap justify-center gap-x-2xl gap-y-md`}>
        {labels.map((label) => (
          <span key={label} className="text-body-md text-text-muted">
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex"
        animate={{ x: paused ? undefined : ['0%', '-50%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {track}
        {track}
      </motion.div>
    </div>
  );
};
