import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar, NavLink, PageHeader, NewsGrid, Footer, BlogThumbnail } from '@boltz/ui';
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
const PROTEIN = '/boltz-protein.png';

// On-brand blog-thumbnail covers (Figma 57:3218), cycled across the cards.
const covers = [
  <BlogThumbnail tone="sage" layout="announce" eyebrow="Announcing" title="Boltz-prot-1" renderSrc={PROTEIN} blobShape={8} />,
  <BlogThumbnail tone="tierra" layout="title" title="The future we are building at Boltz" blobShape={5} />,
  <BlogThumbnail tone="blue" layout="cobrand" partner="Pfizer" blobShape={3} />,
  <BlogThumbnail tone="blue" layout="announce" eyebrow="Announcing" title="Boltz Lab" renderSrc={PROTEIN} blobShape={11} />,
  <BlogThumbnail tone="sage" layout="cobrand" partner="dsm-firmenich" blobShape={6} />,
  <BlogThumbnail tone="tierra" layout="mark" renderSrc={PROTEIN} blobShape={9} />,
];

// Extend the read-only `articles` fixture with a composed blog cover per card.
const newsArticles = articles.map((a, i) => ({
  ...a,
  cover: covers[i % covers.length],
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
        <PageHeader eyebrow="News" eyebrowIcon={<BookStack {...sz} />} heading="Research, product & community." className="pb-0" />
        <NewsGrid items={newsArticles} className="pt-xl" />
      </main>
      <Footer columns={footerColumns} />
    </div>
  ),
};
