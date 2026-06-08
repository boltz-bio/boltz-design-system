import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitSection, EyebrowLabel, Button, TextButton, Embed, Thumbnail } from '@boltz/ui';
import { Code, CpuWarning } from 'iconoir-react';

const STUDIO_TURNTABLE = 'https://dylan-6--embed-video.modal.run?k=2cb075d35f668f998cc460ed08dd8f67';
const STUDIO_LIVE = 'https://dylan-6--embed.modal.run?s=03f62994ea1ff55d98c0d9d835b70631&b=B&l=__NONE__';

const meta = {
  title: '04-Sections/SplitSection',
  component: SplitSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The flexible text-and-media split band that most content sections build on. Configure where the media sits (left, right, above, below), whether the band is contained or fluid, and its background surface. Stacks on mobile and splits at the laptop breakpoint.',
      },
    },
  },
  argTypes: {
    mediaPosition: { control: 'select', options: ['left', 'right', 'above', 'below'] },
    width: { control: 'select', options: ['contained', 'fluid'] },
    background: { control: 'select', options: ['none', 'secondary', 'sage-pale', 'blue-pale', 'tierra-100', 'dark'] },
    align: { control: 'select', options: ['start', 'center'] },
  },
} satisfies Meta<typeof SplitSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const Media = () => (
  <div className="w-full max-w-[460px]">
    <img src="/hero-protein.png" alt="Boltz protein render" className="w-full h-auto" />
  </div>
);

const Content = () => (
  <>
    <EyebrowLabel icon={<Code {...sz} />}>Platform</EyebrowLabel>
    <h2 className="text-heading-md text-text-primary">A foundation, not a paper.</h2>
    <p className="text-body-lg text-text-secondary max-w-body">
      High-performance infrastructure built for biomolecular design teams.
    </p>
    <div className="flex gap-md mt-md">
      <Button variant="black">Get early access</Button>
      <TextButton arrow>Read the docs</TextButton>
    </div>
  </>
);

export const MediaRight: Story = {
  args: { mediaPosition: 'right', width: 'contained', background: 'none', content: <Content />, media: <Media /> },
};

export const MediaLeft: Story = {
  args: { mediaPosition: 'left', width: 'contained', background: 'sage-pale', content: <Content />, media: <Media /> },
};

export const MediaAbove: Story = {
  args: { mediaPosition: 'above', width: 'contained', background: 'none', content: <Content />, media: <Media /> },
};

export const TextOnly: Story = {
  args: { width: 'contained', background: 'secondary', content: <Content /> },
};

// ── Real media: a brand image instead of the placeholder slot ─────────────────
export const WithImage: Story = {
  args: {
    mediaPosition: 'right',
    width: 'contained',
    background: 'none',
    content: <Content />,
    media: (
      <div className="w-full max-w-[460px]">
        <Thumbnail src="/brand/people-2.jpg" alt="Boltz scientist" aspect="square" radius="lg" />
      </div>
    ),
  },
};

// ── Text + highlight card (Figma node 246:940) ───────────────────────────────
// Left: eyebrow + large body text. Right: a tinted card with heading, body, and CTA.
const HighlightCard = () => (
  <div className="bg-blue-pale rounded-lg p-32 flex flex-col justify-between gap-xl h-full">
    <div className="flex flex-col gap-md">
      <h2 className="text-heading-md text-text-primary">
        Introducing the Boltz API: New Primitives for molecular biology
      </h2>
      <p className="text-body-md text-text-secondary">
        A powerful end-to-end pipeline for de novo protein design powered by Boltz-2
        and our state-of-the-art protein interaction and ADME models.
      </p>
    </div>
    <div className="flex items-center gap-sm">
      <Button variant="black" suffix="arrow-icon">Learn more</Button>
    </div>
  </div>
);

export const WithHighlightCard: Story = {
  args: {
    mediaPosition: 'right',
    width: 'contained',
    background: 'none',
    align: 'stretch',
    content: (
      <>
        <EyebrowLabel icon={<CpuWarning {...{ width: 14, height: 14, strokeWidth: 1.5 }} />}>API</EyebrowLabel>
        <p className="text-heading-sm text-text-primary max-w-body">
          Our open source models are used by over a million scientists as part of thousands of pipelines.
          {'\n\n'}
          With the Boltz API you can integrate our most powerful models running on our high-performance
          compute into your internal pipeline in new, more accessible ways.
        </p>
      </>
    ),
    media: <HighlightCard />,
  },
};

// ── Real media: an interactive Boltz Studio embed ─────────────────────────────
export const WithInteractiveEmbed: Story = {
  args: {
    mediaPosition: 'left',
    width: 'contained',
    background: 'sage-pale',
    content: <Content />,
    media: (
      <div className="w-full max-w-[460px]">
        <Embed
          src={STUDIO_TURNTABLE}
          kind="video"
          title="Boltz Studio — protein turntable"
          aspect="square"
          surface="sage"
          interactive
          interactiveSrc={STUDIO_LIVE}
        />
      </div>
    ),
  },
};
