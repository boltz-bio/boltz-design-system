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

// ── Blog covers — the BlogThumbnail component (Figma "Blog thumbnails" 57:3218) ─
// Four editorial categories. Every cover is fully scalable (container-query units)
// so it reads correctly at any width — see the small/large pair at the bottom.

const PROTEIN = '/render-a.png';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-md">
    <p className="text-body-sm text-text-muted font-mono">{title}</p>
    <div className="grid grid-cols-1 gap-lg tablet:grid-cols-2">{children}</div>
  </div>
);

export const BlogCovers: Story = {
  name: 'Blog covers',
  parameters: {
    docs: { description: { story: 'The `BlogThumbnail` component across the four editorial categories (new research / product launch / case study / other). Configurable tone, blob layer (behind/front), title alignment + position, co-brand partner, and a 3D/PNG render — all sized in container-query units so a cover scales proportionally at any width.' } },
  },
  render: () => (
    <div className="mx-auto flex max-w-container flex-col gap-2xl">
      <Section title="New research">
        <BlogThumbnail tone="sage" category="new-research" title="Scaling laws for biomolecular structure" renderSrc={PROTEIN} blobShape={8} />
        <BlogThumbnail tone="blue" category="new-research" align="center" titlePosition="center" title="Benchmarking de novo design" blobShape={4} />
      </Section>

      <Section title="Product launch">
        <BlogThumbnail tone="sage" category="product-launch" title="Boltz-prot-1" renderSrc={PROTEIN} blobShape={8} />
        <BlogThumbnail tone="blue" category="product-launch" title="Boltz Lab" renderSrc={PROTEIN} blobShape={11} />
      </Section>

      <Section title="Case study">
        <BlogThumbnail tone="blue" partner="Pfizer" blobShape={3} />
        <BlogThumbnail tone="sage" partner="dsm-firmenich" blobShape={6} />
      </Section>

      <Section title="Other">
        <BlogThumbnail tone="tierra" align="center" titlePosition="center" title="The future we are building at Boltz" blobShape={5} />
        <BlogThumbnail tone="tierra" category="other" title="Inside the Boltz inference stack" titlePosition="top" blobLayer="front" blobShape={9} />
      </Section>

      <Section title="Scalable — same cover at 240px and full width">
        <div className="w-[240px]"><BlogThumbnail tone="sage" category="product-launch" title="Boltz-prot-1" renderSrc={PROTEIN} blobShape={8} /></div>
        <BlogThumbnail tone="sage" category="product-launch" title="Boltz-prot-1" renderSrc={PROTEIN} blobShape={8} />
      </Section>
    </div>
  ),
};
