import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, ModelCard, EyebrowLabel } from '@boltz/ui';
import { ViewGrid } from 'iconoir-react';
import React from 'react';

// Boltz Studio (Modal) protein render, exported transparent from Figma 57:2519.
const PROTEIN_RENDER = '/boltz-protein.png';

const meta = {
  title: '02-Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=57-2513',
    },
    docs: {
      description: {
        component:
          'A horizontal scroll-snap carousel. Wide slides let the next slide peek so the row reads as scrollable. A caption block (eyebrow + heading) sits beside the prev/next arrow group (the shared IconButton primitive — flush 36×36 circles, dark border, inactive at 50% opacity). Per the Boltz "Our models" section the caption + arrows sit below the track (`controls="bottom"`); pass `controls="top"` to flip it. `bleed` breaks the track out to both viewport edges so cards stretch full-browser while the header stays at container width. CSS scroll-snap (no JS animation), keyboard-operable, honours prefers-reduced-motion.',
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// Real "Our models" content (Figma 57:2513). Card tones match the design exactly:
// light · sand (tierra-200) · clay (tierra-500) · sage (sage-pale).
const MODELS = [
  { title: 'BoltzMol 1.1', tone: 'light' as const },
  { title: 'BoltzProt 1.1', tone: 'sand' as const },
  { title: 'Boltz-2', tone: 'clay' as const },
  { title: 'BoltzRNA 1.0', tone: 'sage' as const },
];
const MODEL_BODY =
  'A powerful end-to-end pipeline for de novo protein design powered by Boltz-2 and our state of the art protein interaction and ADME models';

const modelSlides = MODELS.map((m) => (
  <ModelCard key={m.title} title={m.title} body={MODEL_BODY} tone={m.tone} renderSrc={PROTEIN_RENDER} />
));

const ourModelsCaption = (
  <>
    <EyebrowLabel icon={<ViewGrid {...sz} />}>Our models</EyebrowLabel>
    <h2 className="text-heading-lg text-text-primary max-w-[18ch] mt-md">
      We are building the most powerful generalizable models across large and small molecules
    </h2>
  </>
);

// ── Default — the real "Our models" carousel (caption + arrows below) ─────────

export const Default: Story = {
  name: 'Carousel',
  args: {
    ariaLabel: 'Our models',
    controls: 'bottom',
    caption: ourModelsCaption,
    slideClassName: 'basis-[88%] tablet:basis-[53%]',
    children: modelSlides,
  },
};

// ── Caption + arrows above the track ─────────────────────────────────────────

export const ControlsTop: Story = {
  name: 'Controls top',
  args: {
    ariaLabel: 'Our models',
    controls: 'top',
    caption: ourModelsCaption,
    slideClassName: 'basis-[88%] tablet:basis-[53%]',
    children: modelSlides,
  },
};

// ── No caption — arrows only ─────────────────────────────────────────────────

export const WithCaption: Story = {
  name: 'No caption',
  args: {
    ariaLabel: 'Models',
    controls: 'bottom',
    slideClassName: 'basis-[88%] tablet:basis-[53%]',
    children: modelSlides,
  },
};

// ── Full section — contained (header + track inside the container) ────────────

export const OurModelsContained: Story = {
  name: 'Our models — contained',
  parameters: { layout: 'fullscreen' },
  args: {
    ariaLabel: 'Our models',
    controls: 'bottom',
    caption: ourModelsCaption,
    slideClassName: 'basis-[88%] tablet:basis-[53%]',
    children: modelSlides,
  },
  render: (args) => (
    <div className="bg-surface-primary py-2xl">
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <Carousel {...args} />
      </div>
    </div>
  ),
};

// ── Full section — full-bleed (track stretches to both viewport edges) ────────

export const OurModelsFullBleed: Story = {
  name: 'Our models — full-bleed',
  parameters: { layout: 'fullscreen' },
  args: {
    ariaLabel: 'Our models',
    controls: 'bottom',
    bleed: true,
    caption: ourModelsCaption,
    slideClassName: 'basis-[88%] tablet:basis-[44%] laptop:basis-[36%]',
    children: modelSlides,
  },
  render: (args) => (
    <div className="bg-surface-primary py-2xl overflow-x-hidden">
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <Carousel {...args} />
      </div>
    </div>
  ),
};
