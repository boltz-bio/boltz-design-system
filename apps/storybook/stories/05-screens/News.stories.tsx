import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar, NavLink, PageHeader, NewsGrid } from '@boltz/ui';
import { BookStack } from 'iconoir-react';
import { articles, navItems } from '../_data/boltz';

// Example News page — assembled from section components: NavBar + PageHeader +
// NewsGrid (filter tabs + responsive article grid/list). Data from fixtures.

const meta = {
  title: '05-Screens/News',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface-primary' },
    docs: {
      description: {
        component:
          'A full news index page composed from the NavBar, PageHeader, and NewsGrid sections with fixture data. Use it as a reference for the news browsing layout and category filtering.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

export const News: Story = {
  render: () => (
    <div className="bg-surface-primary min-h-screen">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>)}
      </NavBar>
      <PageHeader eyebrow="News" eyebrowIcon={<BookStack {...sz} />} heading="Research, product & community." />
      <NewsGrid items={articles} />
    </div>
  ),
};
