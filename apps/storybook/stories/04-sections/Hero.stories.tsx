import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero, PrimaryHero, Button, TextButton, Embed, Thumbnail, Blob, BLOB_COUNT } from '@boltz/ui';
import { Leaf } from 'iconoir-react';

// The Boltz hero protein render (transparent, exported from Figma 246:385) — has
// breathing room around the protein so it doesn't read as cropped.
const PROTEIN = '/hero-protein.png';

// The hero backdrop blob — the large solid blob from the shape library (the last
// BLOB_SHAPES entry, added from Figma 245:487). Filled (not stroked), faint and
// recoloured via the `text-*` token.
const HERO_BLOB = BLOB_COUNT - 1;

// Boltz Studio (Modal) embeds — a baked turntable video + the live drag-to-rotate iframe.
const STUDIO_TURNTABLE = 'https://dylan-6--embed-video.modal.run?k=2cb075d35f668f998cc460ed08dd8f67';
const STUDIO_LIVE = 'https://dylan-6--embed.modal.run?s=03f62994ea1ff55d98c0d9d835b70631&b=B&l=__NONE__';

const meta = {
  title: '04-Sections/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The page hero: eyebrow, headline, lead copy, action row, and an optional media slot. Built on SplitSection, so it stacks on mobile and splits on laptop. Use once near the top of a page.',
      },
    },
  },
  argTypes: {
    mediaPosition: { control: 'select', options: ['left', 'right', 'above', 'below'] },
    background: { control: 'select', options: ['none', 'secondary', 'sage-pale', 'blue-pale', 'tierra-100', 'dark'] },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const ProteinPlaceholder = () => (
  <div className="h-[280px] w-[280px] tablet:h-[460px] tablet:w-[460px] rounded-full bg-sage-pale border border-sage-medium flex items-center justify-center">
    <span className="text-body-sm text-text-muted">Protein render</span>
  </div>
);

export const Default: Story = {
  args: {
    eyebrow: 'Build on Boltz',
    eyebrowIcon: <Leaf {...sz} />,
    heading: 'Frontier models for biomolecular design.',
    body: 'State-of-the-art structure prediction, served as production-ready infrastructure. Built to integrate.',
    actions: (
      <>
        <Button variant="black">Try Boltz Lab</Button>
        <TextButton arrow>Read the paper</TextButton>
      </>
    ),
    media: <ProteinPlaceholder />,
  },
};

export const TextOnly: Story = {
  args: {
    eyebrow: 'Build on Boltz',
    eyebrowIcon: <Leaf {...sz} />,
    heading: 'Frontier models for biomolecular design.',
    body: 'State-of-the-art structure prediction, served as production-ready infrastructure.',
    actions: <Button variant="black">Try Boltz Lab</Button>,
  },
};

const baseArgs = {
  eyebrow: 'Build on Boltz',
  eyebrowIcon: <Leaf {...sz} />,
  heading: 'Frontier models for biomolecular design.',
  body: 'State-of-the-art structure prediction, served as production-ready infrastructure. Built to integrate.',
  actions: (
    <>
      <Button variant="black">Try Boltz Lab</Button>
      <TextButton arrow>Read the paper</TextButton>
    </>
  ),
} as const;

// ── Media: transparent protein PNG (static, lightest) ─────────────────────────
export const WithProteinPNG: Story = {
  name: 'Media — protein PNG',
  args: {
    ...baseArgs,
    media: (
      <div className="w-full max-w-[460px]">
        <img src="/boltz-protein.png" alt="Boltz protein render" className="w-full h-auto" />
      </div>
    ),
  },
};

// ── Media: a wide brand/blog image ────────────────────────────────────────────
export const WithImage: Story = {
  name: 'Media — image',
  args: {
    ...baseArgs,
    media: (
      <div className="w-full max-w-[520px]">
        <Thumbnail src="/brand/micro-1.jpg" alt="Boltz brand imagery" aspect="wide" radius="lg" />
      </div>
    ),
  },
};

// ── Media: interactive Boltz Studio embed (click the turntable to rotate live) ─
export const WithInteractiveEmbed: Story = {
  name: 'Media — interactive embed',
  args: {
    ...baseArgs,
    media: (
      <div className="w-full max-w-[460px]">
        <Embed
          src={STUDIO_TURNTABLE}
          kind="video"
          title="Boltz Studio — protein turntable"
          aspect="square"
          surface="white"
          interactive
          interactiveSrc={STUDIO_LIVE}
        />
      </div>
    ),
  },
};

// ── On a coloured background band ─────────────────────────────────────────────
export const OnSageBackground: Story = {
  name: 'On background — sage',
  args: {
    ...baseArgs,
    background: 'sage-pale',
    media: <ProteinPlaceholder />,
  },
};

export const OnDarkBackground: Story = {
  name: 'On background — dark',
  args: {
    ...baseArgs,
    background: 'dark',
    media: (
      <div className="w-full max-w-[460px]">
        <img src="/boltz-protein.png" alt="Boltz protein render" className="w-full h-auto" />
      </div>
    ),
  },
};

// ── Primary heroes — the three subpage heroes (Figma 246:370 / 246:329 / 246:345)
// The canonical page-top heroes (tall band, oversized media bleeding off the
// edges) used on Landing, API and Platform — via the PrimaryHero component.

// A large solid blob that spans the hero and bleeds off the edges, with the
// protein render sitting on top toward the right.
const ProteinBleed = ({ blob }: { blob: string }) => (
  <>
    <Blob
      shape={HERO_BLOB}
      aria-hidden
      className={`absolute -top-[28%] right-0 h-auto w-[92%] translate-x-[16%] opacity-40 ${blob}`}
    />
    <div className="absolute right-0 top-1/2 w-[820px] max-w-[64vw] -translate-y-1/2 laptop:translate-x-[8%]">
      <img src={PROTEIN} alt="Boltz protein render" className="relative w-full h-auto" />
    </div>
  </>
);

export const PrimaryHeroLanding: Story = {
  name: 'Primary hero — Landing',
  parameters: { layout: 'fullscreen' },
  args: { heading: '' },
  render: () => (
    <PrimaryHero
      tone="sage"
      heading="Foundational AI for Biology and Chemistry"
      body="Frontier models and high-performance compute for designing all of life’s molecules."
      actions={<Button variant="black">Start building with Boltz</Button>}
      media={<ProteinBleed blob="text-sage-medium" />}
    />
  ),
};

export const PrimaryHeroApi: Story = {
  name: 'Primary hero — API',
  parameters: { layout: 'fullscreen' },
  args: { heading: '' },
  render: () => (
    <PrimaryHero
      tone="blue"
      heading="New Primitives for Agentic Science"
      body="Integrate state-of-the-art biomolecular models into your agentic product or pipeline."
      actions={<Button variant="black">Read the Docs</Button>}
      media={<ProteinBleed blob="text-blue-medium" />}
    />
  ),
};

export const PrimaryHeroPlatform: Story = {
  name: 'Primary hero — Platform',
  parameters: { layout: 'fullscreen' },
  args: { heading: '' },
  render: () => (
    <PrimaryHero
      tone="dark"
      heading="A New Foundation for End-to-End Discovery"
      body="Streamlined molecular design platform for all organizations. The Boltz Platform brings together frontier AI models and intelligent agents to accelerate drug discovery — from hit identification to lead optimization."
      // Monitor stuck to the bottom edge, bleeding off the right.
      media={
        <>
          <Blob shape={HERO_BLOB} aria-hidden className="absolute -top-[25%] right-0 h-auto w-[88%] translate-x-[16%] opacity-[0.14] text-white" />
          <div className="absolute bottom-0 right-0 w-[1200px] max-w-[72vw] translate-x-[8%]">
            <img src="/platform-dashboard.png" alt="Boltz Platform dashboard" className="relative w-full h-auto" />
          </div>
        </>
      }
    />
  ),
};
