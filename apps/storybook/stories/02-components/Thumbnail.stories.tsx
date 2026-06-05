import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Thumbnail, Logo, Blob } from '@boltz/ui';

const meta = {
  title: '02-Components/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Image placeholder + thumbnail handling. Renders an image when given a `src`; otherwise falls back to a tinted block with a faint Boltz mark watermark (never a broken/empty image). The `graphic="blob"` option adds an organic Boltz blob to the empty state. The "Blog covers" story shows the composed Figma blog-thumbnail layouts built on top.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=57-3218',
    },
  },
  argTypes: {
    aspect: { control: 'select', options: ['video', 'wide', 'square', 'portrait'] },
    radius: { control: 'select', options: ['md', 'lg'] },
    tone: { control: 'select', options: ['sage', 'blue', 'tierra', 'neutral'] },
    graphic: { control: 'select', options: ['none', 'blob'] },
    blobShape: { control: { type: 'number', min: 0 } },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── With image (wide cover) ───────────────────────────────────────────────────

export const WithImage: Story = {
  args: {
    src: '/brand/micro-3.jpg',
    alt: 'Boltz brand imagery — macro capsules',
    aspect: 'wide',
    radius: 'lg',
    className: 'w-[480px]',
  },
};

// ── Aspect ratios — varied sizes, real brand imagery ──────────────────────────

export const AspectRatios: Story = {
  render: () => (
    <div className="flex flex-wrap gap-lg items-start">
      <div className="w-[320px]">
        <Thumbnail src="/brand/micro-1.jpg" alt="" aspect="video" />
      </div>
      <div className="w-[320px]">
        <Thumbnail src="/brand/people-1.jpg" alt="" aspect="wide" />
      </div>
      <div className="w-[200px]">
        <Thumbnail src="/brand/micro-2.jpg" alt="" aspect="square" />
      </div>
      <div className="w-[200px]">
        <Thumbnail src="/brand/people-3.jpg" alt="" aspect="portrait" />
      </div>
    </div>
  ),
};

// ── Placeholder (no src) — faint Boltz mark watermark, all tones ───────────────

export const Placeholder: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-lg w-[640px]">
      <Thumbnail tone="neutral" />
      <Thumbnail tone="sage" />
      <Thumbnail tone="blue" />
      <Thumbnail tone="tierra" />
    </div>
  ),
};

// ── Blob placeholders — each tone with a decorative blob ──────────────────────

export const BlobPlaceholders: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-lg w-[640px]">
      <Thumbnail tone="sage" graphic="blob" blobShape={0} />
      <Thumbnail tone="blue" graphic="blob" blobShape={3} />
      <Thumbnail tone="tierra" graphic="blob" blobShape={7} />
      <Thumbnail tone="neutral" graphic="blob" blobShape={12} />
    </div>
  ),
};

// ── Blog covers — composed Figma "Blog thumbnails" (57:3218) ──────────────────
// Eight composed covers built from existing primitives (Logo wordmark + faint
// Blob line) over a tinted token card. NOTE the spacing scale is raw px here:
// h-20 = 20px (a small wordmark), NOT 5rem.

type Tone = 'sage' | 'blue' | 'tierra';

const toneBg: Record<Tone, string> = {
  sage: 'bg-sage-pale',
  blue: 'bg-blue-pale',
  tierra: 'bg-tierra-100',
};
const toneBlob: Record<Tone, string> = {
  sage: 'text-sage-medium',
  blue: 'text-blue-medium',
  tierra: 'text-tierra-500',
};
const toneInk: Record<Tone, string> = {
  sage: 'text-sage-dark',
  blue: 'text-blue-dark',
  tierra: 'text-text-primary',
};

const Cover = ({
  tone,
  blobShape = 0,
  blobClassName,
  children,
}: {
  tone: Tone;
  blobShape?: number;
  blobClassName?: string;
  children: React.ReactNode;
}) => (
  <div className={`relative aspect-[16/10] overflow-hidden rounded-lg ${toneBg[tone]}`}>
    <Blob
      shape={blobShape}
      aria-hidden
      className={`pointer-events-none absolute h-auto opacity-40 ${toneBlob[tone]} ${
        blobClassName ?? '-right-1/4 -top-1/4 w-2/3'
      }`}
    />
    {children}
  </div>
);

const Protein = ({ className }: { className: string }) => (
  <img src="/boltz-protein.png" alt="" aria-hidden className={`pointer-events-none absolute select-none ${className}`} />
);

export const BlogCovers: Story = {
  name: 'Blog covers',
  parameters: {
    docs: { description: { story: 'The eight composed blog-cover thumbnails from Figma 57:3218. Co-brand partner names are token text (only the Boltz wordmark exists as a brand asset).' } },
  },
  render: () => (
    <div className="mx-auto grid max-w-container grid-cols-1 gap-lg tablet:grid-cols-2">
      {/* 1 — sage: eyebrow, centred title, wordmark bottom */}
      <Cover tone="sage" blobShape={2}>
        <div className="absolute inset-0 flex flex-col items-center justify-between p-xl">
          <span className="text-body-sm uppercase tracking-wide text-text-muted">New product</span>
          <span className="text-heading-md text-sage-dark">Boltz-prot-1</span>
          <Logo className="h-20 w-auto text-sage-dark" />
        </div>
      </Cover>

      {/* 2 — tierra: big centred title, wordmark bottom */}
      <Cover tone="tierra" blobShape={5}>
        <div className="absolute inset-0 flex flex-col items-center justify-between p-xl">
          <span aria-hidden />
          <span className="max-w-[80%] text-center text-heading-md text-text-primary">
            The future we are building at Boltz
          </span>
          <Logo className="h-20 w-auto text-text-primary" />
        </div>
      </Cover>

      {/* 3 — sage: wordmark top, announce bottom-left, protein right */}
      <Cover tone="sage" blobShape={8} blobClassName="-bottom-1/4 -left-1/4 w-1/2">
        <Protein className="-right-[6%] top-1/2 w-[44%] -translate-y-1/2" />
        <div className="absolute inset-0 flex flex-col justify-between p-xl">
          <Logo className="h-20 w-auto text-sage-dark" />
          <div className="flex flex-col gap-xs">
            <span className="text-body-sm uppercase tracking-wide text-text-muted">Announcing</span>
            <span className="text-heading-sm text-sage-dark">Boltz-prot-1</span>
          </div>
        </div>
      </Cover>

      {/* 4 — blue: same as #3 but Boltz Lab */}
      <Cover tone="blue" blobShape={11} blobClassName="-bottom-1/4 -left-1/4 w-1/2">
        <Protein className="-right-[6%] top-1/2 w-[44%] -translate-y-1/2" />
        <div className="absolute inset-0 flex flex-col justify-between p-xl">
          <Logo className="h-20 w-auto text-blue-dark" />
          <div className="flex flex-col gap-xs">
            <span className="text-body-sm uppercase tracking-wide text-text-muted">Announcing</span>
            <span className="text-heading-sm text-blue-dark">Boltz Lab</span>
          </div>
        </div>
      </Cover>

      {/* 5 — blue: co-brand lockup centred */}
      <Cover tone="blue" blobShape={3} blobClassName="-top-1/4 left-1/4 w-1/2">
        <div className="absolute inset-0 flex items-center justify-center gap-md p-xl">
          <Logo className="h-20 w-auto text-blue-dark" />
          <span className="h-20 w-px bg-blue-dark/40" aria-hidden />
          <span className={`text-heading-sm font-semibold italic ${toneInk.blue}`}>Pfizer</span>
        </div>
      </Cover>

      {/* 6 — sage: co-brand dsm-firmenich centred */}
      <Cover tone="sage" blobShape={6} blobClassName="-top-1/4 right-1/4 w-1/2">
        <div className="absolute inset-0 flex items-center justify-center gap-md p-xl">
          <Logo className="h-20 w-auto text-sage-dark" />
          <span className="h-20 w-px bg-sage-dark/40" aria-hidden />
          <span className={`text-heading-sm font-semibold italic ${toneInk.sage}`}>dsm-firmenich</span>
        </div>
      </Cover>

      {/* 7 — blue: wordmark + protein, no title */}
      <Cover tone="blue" blobShape={14} blobClassName="-bottom-1/4 right-1/4 w-1/2">
        <Protein className="-right-[6%] top-1/2 w-[44%] -translate-y-1/2" />
        <div className="absolute inset-0 flex flex-col justify-between p-xl">
          <Logo className="h-20 w-auto text-blue-dark" />
          <span aria-hidden />
        </div>
      </Cover>

      {/* 8 — tierra: wordmark top, protein bleeding bottom-right */}
      <Cover tone="tierra" blobShape={9} blobClassName="-top-1/4 -left-1/4 w-1/2">
        <Protein className="-bottom-[10%] -right-[6%] w-[48%]" />
        <div className="absolute inset-0 flex flex-col justify-between p-xl">
          <Logo className="h-20 w-auto text-text-primary" />
          <span aria-hidden />
        </div>
      </Cover>
    </div>
  ),
};
