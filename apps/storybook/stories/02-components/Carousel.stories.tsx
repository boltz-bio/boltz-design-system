import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, EyebrowLabel, Button, TextButton } from '@boltz/ui';
import { ViewGrid } from 'iconoir-react';
import React from 'react';

// Boltz Studio (Modal) protein render, exported transparent from Figma 57:2519.
// Transparent PNG → floats on every card tone (no baked background to clash).
const PROTEIN_RENDER = '/boltz-protein.png';

const meta = {
  title: '02-Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=57-2560',
    },
    docs: {
      description: {
        component:
          'A horizontal scroll-snap carousel. Wide slides let the next slide peek so the row reads as scrollable. A caption block (eyebrow + heading) sits beside the circular prev/next arrow group — by default in a header row above the track (`controls="top"`, matching the Boltz "Our models" section), or pass `controls="bottom"` to sit it under the track. The arrows scroll one page at a time and disable at the start/end. Built with CSS scroll-snap (no JS animation), keyboard-operable, and honours prefers-reduced-motion.',
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// ── Simple tinted demo blocks (token backgrounds only — no images) ────────────

const TONES = ['bg-sage-light', 'bg-blue-light', 'bg-tierra-100', 'bg-sage-medium', 'bg-blue-medium'];

const slides = TONES.map((tone, i) => (
  <div key={i} className={`${tone} rounded-lg aspect-[16/10] flex items-end p-lg`}>
    <span className="text-heading-sm text-text-primary">Slide {i + 1}</span>
  </div>
));

export const Default: Story = {
  name: 'Carousel',
  args: { ariaLabel: 'Featured items', children: slides },
};

// ── With caption (eyebrow + heading beside the arrows) ────────────────────────

export const WithCaption: Story = {
  name: 'With caption',
  args: {
    ariaLabel: 'Featured stories',
    children: slides,
    caption: (
      <>
        <h2 className="text-heading-sm text-text-primary">Featured stories</h2>
        <p className="text-body-md text-text-secondary">
          Scroll through the latest highlights from across the platform.
        </p>
      </>
    ),
  },
};

// ── Controls under the track ──────────────────────────────────────────────────

export const ControlsBottom: Story = {
  name: 'Controls bottom',
  args: { ariaLabel: 'Featured items', children: slides, controls: 'bottom' },
};

// ── "Our models" — the real Boltz section (Figma 57:2560) ─────────────────────
// Wide tinted cards: title + body top-left, a black CTA + text-button bottom-left,
// a protein render bleeding off the bottom-right. The eyebrow + heading sit top-left
// with the prev/next arrows top-right.

type ModelCard = { name: string; body: string; tone: string };

const MODEL_CARDS: ModelCard[] = [
  { name: 'BoltzMol 1.1', body: 'A powerful end-to-end pipeline for de novo protein design powered by Boltz-2 and our state of the art protein interaction and ADME models', tone: 'bg-surface-card-light' },
  { name: 'BoltzProt 1.1', body: 'A powerful end-to-end pipeline for de novo protein design powered by Boltz-2 and our state of the art protein interaction and ADME models', tone: 'bg-tierra-100' },
  { name: 'Boltz-2', body: 'A powerful end-to-end pipeline for de novo protein design powered by Boltz-2 and our state of the art protein interaction and ADME models', tone: 'bg-tierra-200' },
  { name: 'BoltzRNA 1.0', body: 'RNA secondary and tertiary structure prediction for therapeutic design, served as production-ready infrastructure.', tone: 'bg-sage-pale' },
];

// The protein render is a transparent Boltz Studio (Modal) export, anchored to
// the bottom-right and bleeding off the corner. Body width is capped so the text
// never runs under it; the CTA row sits on z-10 above it.
const ModelCardView = ({ name, body, tone }: ModelCard) => (
  <div className={`relative overflow-hidden rounded-xl p-lg tablet:p-xl aspect-auto tablet:aspect-[4/3] flex flex-col ${tone}`}>
    <img
      src={PROTEIN_RENDER}
      alt=""
      aria-hidden
      className="pointer-events-none absolute -bottom-6 -right-6 w-[52%] h-auto select-none"
    />

    <h3 className="text-heading-md text-text-primary relative z-10">{name}</h3>
    <p className="text-body-md text-text-secondary mt-md max-w-none tablet:max-w-[54%] relative z-10">{body}</p>

    <div className="mt-auto pt-lg flex flex-col items-start gap-md tablet:flex-row tablet:items-center tablet:gap-lg relative z-10">
      <Button variant="black">Get access</Button>
      <TextButton arrow>Read technical report</TextButton>
    </div>
  </div>
);

const ourModelsCaption = (
  <>
    <EyebrowLabel icon={<ViewGrid {...sz} />}>Our models</EyebrowLabel>
    <h2 className="text-heading-lg text-text-primary max-w-[18ch] mt-md">
      We are building the most powerful generalizable models across large and small molecules
    </h2>
  </>
);

const ourModelsSlides = MODEL_CARDS.map((m) => <ModelCardView key={m.name} {...m} />);

// Proposal A — Contained. Header AND track both live inside the centred
// max-w-container. Cards never exceed the container; simplest, fully predictable.
export const OurModelsContained: Story = {
  name: 'Our models — contained',
  parameters: { layout: 'fullscreen' },
  args: {
    ariaLabel: 'Our models',
    controls: 'top',
    slideClassName: 'basis-[86%] tablet:basis-[58%] laptop:basis-[44%]',
    caption: ourModelsCaption,
    children: ourModelsSlides,
  },
  render: (args) => (
    <div className="bg-surface-primary py-2xl">
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <Carousel {...args} />
      </div>
    </div>
  ),
};

// Proposal B — Full-bleed track. Same centred container, but `bleed` breaks the
// track out to the right viewport edge: the header (caption + arrows) stays at
// container width while the cards stretch the whole browser and run off-screen.
export const OurModelsFullBleed: Story = {
  name: 'Our models — full-bleed',
  parameters: { layout: 'fullscreen' },
  args: {
    ariaLabel: 'Our models',
    controls: 'top',
    bleed: true,
    slideClassName: 'basis-[86%] tablet:basis-[46%] laptop:basis-[32%]',
    caption: ourModelsCaption,
    children: ourModelsSlides,
  },
  render: (args) => (
    <div className="bg-surface-primary py-2xl overflow-x-hidden">
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <Carousel {...args} />
      </div>
    </div>
  ),
};
