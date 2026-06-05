import type { Meta, StoryObj } from '@storybook/react-vite';
import { Thumbnail, placeholderImage } from '@boltz/ui';

const meta = {
  title: '02-Components/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Temporary image placeholders + thumbnail handling. Renders an image when given a `src`, and otherwise falls back to a tinted placeholder block (no broken/empty image) — useful while real blog/article covers are still being produced.',
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

// ── With image ────────────────────────────────────────────────────────────────

export const WithImage: Story = {
  args: {
    src: placeholderImage('boltz-1'),
    alt: 'Demo blog cover',
    aspect: 'wide',
    radius: 'lg',
    className: 'w-[480px]',
  },
};

// ── Placeholder (no src) — all tones ──────────────────────────────────────────

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

// ── Aspect ratios ─────────────────────────────────────────────────────────────

export const AspectRatios: Story = {
  render: () => (
    <div className="flex gap-lg items-start">
      <div className="w-[200px]">
        <Thumbnail src={placeholderImage('boltz-video')} aspect="video" />
      </div>
      <div className="w-[200px]">
        <Thumbnail src={placeholderImage('boltz-wide')} aspect="wide" />
      </div>
      <div className="w-[200px]">
        <Thumbnail src={placeholderImage('boltz-square')} aspect="square" />
      </div>
      <div className="w-[200px]">
        <Thumbnail src={placeholderImage('boltz-portrait')} aspect="portrait" />
      </div>
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

// ── Blog cover — composed Figma "Blog thumbnails" look ────────────────────────
// A tinted Thumbnail card (tone + blob) used as the background, with an overlaid
// content layer (Boltz wordmark, eyebrow label, large title) using type tokens.

export const BlogCover: Story = {
  render: () => (
    <div className="relative w-[480px]">
      <Thumbnail tone="sage" graphic="blob" blobShape={2} aspect="wide" radius="lg" />
      <div className="absolute inset-0 flex flex-col justify-between p-lg pointer-events-none">
        <span className="text-body-md text-text-primary font-medium">Boltz</span>
        <div className="flex flex-col gap-sm">
          <span className="text-body-sm uppercase tracking-wide text-text-muted">
            Announcing · New product
          </span>
          <span className="text-heading-md text-text-primary">
            The future we are building at Boltz
          </span>
        </div>
      </div>
    </div>
  ),
};
