import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar, NavLink, PageHeader, NewsGrid, Footer } from '@boltz/ui';
import { BookStack } from 'iconoir-react';
import { articles, navItems } from '../_data/boltz';

// Example News page — assembled from section components: NavBar + PageHeader +
// NewsGrid (filter tabs + responsive article grid/list) + Footer. Data from fixtures.

const meta = {
  title: '05-Screens/News',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface-primary' },
    docs: {
      description: {
        component:
          'A full news index page composed from the NavBar, PageHeader, NewsGrid, and Footer sections with fixture data. Use it as a reference for the news browsing layout and category filtering.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// Real brand photos, cycled so adjacent cards differ.
const brandPhotos = [
  '/brand/people-1.jpg', '/brand/micro-1.jpg',
  '/brand/people-2.jpg', '/brand/micro-2.jpg',
  '/brand/people-3.jpg', '/brand/micro-3.jpg',
];

// Extend the read-only `articles` fixture with a brand-photo thumbnail per card.
const newsArticles = articles.map((a, i) => ({
  ...a,
  thumbnail: brandPhotos[i % brandPhotos.length],
}));

// Footer links per Figma — [Github, LinkedIn, Slack] / [Career, News, Pricing, Legal].
const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const News: Story = {
  render: () => (
    <div className="bg-surface-primary min-h-screen">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>)}
      </NavBar>
      <main>
        <PageHeader eyebrow="News" eyebrowIcon={<BookStack {...sz} />} heading="Research, product & community." />
        <NewsGrid items={newsArticles} />
      </main>
      <Footer columns={footerColumns} />
    </div>
  ),
};
