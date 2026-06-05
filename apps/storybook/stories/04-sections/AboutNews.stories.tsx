import type { Meta, StoryObj } from '@storybook/react-vite';
import { AboutNews } from '@boltz/ui';
import { BlogThumbnail } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/AboutNews',
  component: AboutNews,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A two-column section pairing a short mission statement (left) with a list of recent news items (right). Uses EyebrowLabel, NewsItem landscape variant, and a Button CTA.',
      },
    },
  },
} satisfies Meta<typeof AboutNews>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const PROTEIN = '/render-a.png';

const items = [
  {
    title: 'Announcing Boltz',
    category: 'Product',
    date: 'Feb 10, 2026',
    cover: <BlogThumbnail tone="sage" category="product-launch" title="Boltz-prot-1" renderSrc={PROTEIN} blobShape={8} className="h-[174px]" />,
  },
  {
    title: 'Announcing Boltz Lab and our first agents',
    category: 'Product',
    date: 'Feb 10, 2026',
    cover: <BlogThumbnail tone="blue" category="product-launch" title="Boltz Lab" renderSrc={PROTEIN} blobShape={11} className="h-[174px]" />,
  },
  {
    title: 'The future we are building at Boltz',
    category: 'Product',
    date: 'Feb 10, 2026',
    cover: <BlogThumbnail tone="tierra" align="center" titlePosition="center" title="The future we are building at Boltz" blobShape={5} className="h-[174px]" />,
  },
];

export const Default: Story = {
  args: {
    eyebrowIcon: <AllIcons.Community {...sz} />,
    eyebrow: 'About us',
    heading: 'Boltz is a frontier research lab building generative models for biology and chemistry',
    body: (
      <>
        <p>Our models are used by millions of scientists across biopharma, agriculture and consumer products and form the foundation of modern R&D.</p>
        <p className="mt-md">We founded Boltz PBC to advance the open frontier and build powerful new primitives for science.</p>
      </>
    ),
    items,
    cta: 'View all blog posts',
  },
};
