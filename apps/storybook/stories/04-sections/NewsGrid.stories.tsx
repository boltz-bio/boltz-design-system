import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsGrid } from '@boltz/ui';

const meta = {
  title: '04-Sections/NewsGrid',
  component: NewsGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-width news section composing a category filter + grid/list view toggle (FilterTabBar) above a responsive article grid or list. Filtering and view mode are held in internal state; the grid stacks on mobile and expands to two columns at tablet and three at laptop.',
      },
    },
  },
} satisfies Meta<typeof NewsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const articles = [
  {
    id: '1',
    title: 'Boltz-2 sets a new bar for biomolecular structure prediction',
    category: 'Research',
    date: 'May 28, 2026',
    summary:
      'Our latest model jointly predicts structure and binding affinity at near-experimental accuracy.',
  },
  {
    id: '2',
    title: 'The Boltz API is now generally available',
    category: 'Platform',
    date: 'May 14, 2026',
    summary:
      'Run frontier structure prediction in production with a single endpoint and pay-per-call pricing.',
  },
  {
    id: '3',
    title: 'Highlights from the first Boltz community workshop',
    category: 'Community',
    date: 'Apr 30, 2026',
    summary:
      'Researchers shared open benchmarks, notebooks, and fine-tuning recipes built on Boltz.',
  },
  {
    id: '4',
    title: 'Boltz partners with leading labs to expand open structural data',
    category: 'Partnership',
    date: 'Apr 9, 2026',
    summary:
      'A new collaboration brings curated, openly licensed datasets to the Boltz ecosystem.',
  },
];

export const Default: Story = {
  args: {
    items: articles,
  },
};

export const ListView: Story = {
  name: 'List view',
  args: {
    items: articles,
    defaultView: 'list',
  },
};
