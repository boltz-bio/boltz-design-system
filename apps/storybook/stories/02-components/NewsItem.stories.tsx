import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsItem } from '@boltz/ui';

// Placeholder thumbnail colours match the Figma article cover backgrounds
const THUMB_SAGE  = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3Crect fill="%23D9EED9"/%3E%3C/svg%3E';
const THUMB_TIERRA = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3Crect fill="%23F7F2E9"/%3E%3C/svg%3E';
const THUMB_BLUE  = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3Crect fill="%23EEF6FA"/%3E%3C/svg%3E';

const meta = {
  title: '02-Components/NewsItem',
  component: NewsItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['portrait', 'landscape', 'list'] },
  },
} satisfies Meta<typeof NewsItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Portrait ──────────────────────────────────────────────────────────────────

export const Portrait: Story = {
  args: {
    variant: 'portrait',
    title: 'Announcing Boltz-prot-1: state-of-the-art protein structure prediction',
    category: 'Product',
    date: 'Feb 10, 2026',
    thumbnail: THUMB_SAGE,
    thumbnailAlt: 'Boltz protein render',
  },
  parameters: { layout: 'centered' },
  render: (args) => <div style={{ width: 430 }}><NewsItem {...args} /></div>,
};

export const PortraitGrid: Story = {
  name: 'Portrait — 3-column grid',
  args: { variant: 'portrait', title: 'Boltz', category: 'Product', date: 'Feb 2026' },
  render: () => (
    <div className="grid grid-cols-3 gap-lg max-w-container">
      <NewsItem variant="portrait" title="Announcing Boltz-prot-1: state-of-the-art protein structure prediction" category="Product" date="Feb 10, 2026" thumbnail={THUMB_SAGE} />
      <NewsItem variant="portrait" title="The future we are building at Boltz" category="Company" date="Jan 28, 2026" thumbnail={THUMB_TIERRA} />
      <NewsItem variant="portrait" title="Boltz × Pfizer: accelerating small molecule discovery" category="Partnership" date="Jan 15, 2026" thumbnail={THUMB_BLUE} />
    </div>
  ),
};

// ── Landscape ─────────────────────────────────────────────────────────────────

export const Landscape: Story = {
  args: {
    variant: 'landscape',
    title: 'Announcing Boltz-prot-1: state-of-the-art protein structure prediction',
    category: 'Product',
    date: 'Feb 10, 2026',
    thumbnail: THUMB_SAGE,
    thumbnailAlt: 'Boltz protein render',
  },
  render: (args) => <div style={{ maxWidth: 660 }}><NewsItem {...args} /></div>,
};

export const LandscapeList: Story = {
  name: 'Landscape — stacked',
  args: { variant: 'landscape', title: 'Boltz', category: 'Product', date: 'Feb 2026' },
  render: () => (
    <div className="flex flex-col gap-lg max-w-[660px]">
      <NewsItem variant="landscape" title="Announcing Boltz-prot-1: state-of-the-art protein structure prediction" category="Product" date="Feb 10, 2026" thumbnail={THUMB_SAGE} />
      <NewsItem variant="landscape" title="The future we are building at Boltz" category="Company" date="Jan 28, 2026" thumbnail={THUMB_TIERRA} />
      <NewsItem variant="landscape" title="Boltz × Pfizer: accelerating small molecule discovery" category="Partnership" date="Jan 15, 2026" thumbnail={THUMB_BLUE} />
    </div>
  ),
};

// ── List ──────────────────────────────────────────────────────────────────────

export const List: Story = {
  name: 'List — hover to reveal thumbnail',
  args: { variant: 'list', title: 'Boltz', category: 'Product', date: 'Feb 2026' },
  render: () => (
    <div className="max-w-container border-t border-border-light">
      <NewsItem
        variant="list"
        title="Announcing Boltz-prot-1"
        summary="A state-of-the-art protein structure prediction model, now available via API and Boltz Lab."
        category="Product"
        date="Feb 10, 2026"
        thumbnail={THUMB_SAGE}
      />
      <NewsItem
        variant="list"
        title="The future we are building at Boltz"
        summary="Our vision for AI-native drug discovery and the infrastructure we're building to make it real."
        category="Company"
        date="Jan 28, 2026"
        thumbnail={THUMB_TIERRA}
      />
      <NewsItem
        variant="list"
        title="Boltz × Pfizer: accelerating small molecule discovery"
        summary="How Pfizer scientists are using Boltz's platform across large and small molecule discovery workflows."
        category="Partnership"
        date="Jan 15, 2026"
        thumbnail={THUMB_BLUE}
      />
      <NewsItem
        variant="list"
        title="Introducing the Boltz API: new primitives for molecular biology"
        summary="REST and Python SDK for structure prediction, molecular generation, and ADME modelling."
        category="Platform"
        date="Dec 20, 2025"
        thumbnail={THUMB_SAGE}
      />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  args: { variant: 'portrait', title: 'Boltz', category: 'Product', date: 'Feb 2026' },
  render: () => (
    <div className="flex flex-col gap-2xl max-w-container mx-auto p-xl">
      <section>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-lg">Portrait — grid of 3</p>
        <div className="grid grid-cols-3 gap-lg">
          <NewsItem variant="portrait" title="Announcing Boltz-prot-1" category="Product" date="Feb 10, 2026" thumbnail={THUMB_SAGE} />
          <NewsItem variant="portrait" title="The future we are building at Boltz" category="Company" date="Jan 28, 2026" thumbnail={THUMB_TIERRA} />
          <NewsItem variant="portrait" title="Boltz × Pfizer partnership" category="Partnership" date="Jan 15, 2026" thumbnail={THUMB_BLUE} />
        </div>
      </section>
      <section>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-lg">Landscape</p>
        <div className="flex flex-col gap-lg max-w-[660px]">
          <NewsItem variant="landscape" title="Announcing Boltz-prot-1: state-of-the-art protein structure prediction" category="Product" date="Feb 10, 2026" thumbnail={THUMB_SAGE} />
          <NewsItem variant="landscape" title="The future we are building at Boltz" category="Company" date="Jan 28, 2026" thumbnail={THUMB_TIERRA} />
        </div>
      </section>
      <section>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-sm">List — hover to reveal thumbnail</p>
        <div className="border-t border-border-light">
          <NewsItem variant="list" title="Announcing Boltz-prot-1" summary="A state-of-the-art protein structure prediction model." category="Product" date="Feb 10, 2026" thumbnail={THUMB_SAGE} />
          <NewsItem variant="list" title="The future we are building at Boltz" summary="Our vision for AI-native drug discovery." category="Company" date="Jan 28, 2026" thumbnail={THUMB_TIERRA} />
          <NewsItem variant="list" title="Boltz × Pfizer: accelerating discovery" summary="How Pfizer scientists use Boltz across molecule discovery workflows." category="Partnership" date="Jan 15, 2026" thumbnail={THUMB_BLUE} />
        </div>
      </section>
    </div>
  ),
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};
