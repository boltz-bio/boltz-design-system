import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero, Button, TextButton, Embed, Thumbnail } from '@boltz/ui';
import { Leaf } from 'iconoir-react';

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
