import type { Meta, StoryObj } from '@storybook/react-vite';
import { Thumbnail, BlogThumbnail } from '@boltz/ui';

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

// ── Blog covers — the BlogThumbnail component (Figma "Blog thumbnails" 57:3218) ─

const PROTEIN = '/boltz-protein.png';

export const BlogCovers: Story = {
  name: 'Blog covers',
  parameters: {
    docs: { description: { story: 'Composed blog-cover thumbnails via the `BlogThumbnail` component (announce / title / cobrand / mark layouts). Co-brand partner names are token text (only the Boltz wordmark exists as a brand asset).' } },
  },
  render: () => (
    <div className="mx-auto grid max-w-container grid-cols-1 gap-lg tablet:grid-cols-2">
      <BlogThumbnail tone="sage" layout="announce" eyebrow="Announcing" title="Boltz-prot-1" renderSrc={PROTEIN} blobShape={8} />
      <BlogThumbnail tone="tierra" layout="title" title="The future we are building at Boltz" blobShape={5} />
      <BlogThumbnail tone="blue" layout="cobrand" partner="Pfizer" blobShape={3} />
      <BlogThumbnail tone="blue" layout="announce" eyebrow="Announcing" title="Boltz Lab" renderSrc={PROTEIN} blobShape={11} />
      <BlogThumbnail tone="sage" layout="cobrand" partner="dsm-firmenich" blobShape={6} />
      <BlogThumbnail tone="tierra" layout="mark" renderSrc={PROTEIN} blobShape={9} />
    </div>
  ),
};
