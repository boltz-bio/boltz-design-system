import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, PageHeader, FilterTabBar, NewsItem,
  Badge, BlogThumbnail, TextButton, Footer,
  type ViewMode, type BlogThumbnailProps,
} from '@boltz/ui';
import { BookStack } from 'iconoir-react';
import { articles, navItems } from '../_data/boltz';

// Example "Recent news" index page — mirrors Figma 57:2801 / 57:2692. Two
// variants of the same page assembled from existing @boltz/ui sections:
//   RecentNews     — featured story on top + filtered grid (57:2692)
//   RecentNewsGrid — plain grid, no featured story (57:2801)
//
// NavBar (with its built-in "Get early access" CTA) + PageHeader + a
// FilterTabBar (category tabs + grid/list view toggle, client state) over a
// responsive NewsItem grid, capped by a "Load more" TextButton + Footer.

const meta = {
  title: '05-Screens/Recent news',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface-primary' },
    docs: {
      description: {
        component:
          'A responsive news index page. `RecentNews` leads with a featured story; `RecentNewsGrid` is the plain grid. Both wire the FilterTabBar category filter + view toggle to local state and reuse the `articles` fixture, extended inline for a fuller grid.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// ── Article data ──────────────────────────────────────────────────────────────
// Reuse the shared `articles` fixture, extended inline (read-only fixtures must
// not change) with a few more items + thumbnails for a fuller grid.
type Article = (typeof articles)[number] & { cover?: BlogThumbnailProps; summary?: string };

const moreArticles: (typeof articles)[number][] = [
  { id: 'a5', category: 'Partnerships', title: 'Boltz joins the open biomolecular design consortium', date: 'Jan 2026' },
  { id: 'a6', category: 'Company', title: 'Scaling the team behind frontier structure models', date: 'Dec 2025' },
  { id: 'a7', category: 'Platform', title: 'Predictable latency: inside the Boltz inference stack', date: 'Nov 2025' },
  { id: 'a8', category: 'Research', title: 'De novo binder design at atomic resolution', date: 'Oct 2025' },
];

const PROTEIN = '/boltz-protein.png';

// On-brand blog-thumbnail covers (Figma 57:3218), cycled across cards as prop specs.
const coverSpecs: BlogThumbnailProps[] = [
  { tone: 'sage', layout: 'announce', eyebrow: 'Announcing', title: 'Boltz-prot-1', renderSrc: PROTEIN, blobShape: 8 },
  { tone: 'tierra', layout: 'title', title: 'The future we are building at Boltz', blobShape: 5 },
  { tone: 'blue', layout: 'cobrand', partner: 'Pfizer', blobShape: 3 },
  { tone: 'blue', layout: 'announce', eyebrow: 'Announcing', title: 'Boltz Lab', renderSrc: PROTEIN, blobShape: 11 },
  { tone: 'sage', layout: 'cobrand', partner: 'dsm-firmenich', blobShape: 6 },
  { tone: 'tierra', layout: 'mark', renderSrc: PROTEIN, blobShape: 9 },
];

const allArticles: Article[] = [...articles, ...moreArticles].map((a, i) => ({
  ...a,
  cover: coverSpecs[i % coverSpecs.length],
}));

// Tab categories per Figma (Latest = the "all" view).
const TABS = ['Latest', 'Research', 'Platform', 'Partnerships', 'Company'] as const;
const tabItems = TABS.map((t) => ({ value: t, label: t }));

// Featured story (top of 57:2692).
const featured = allArticles[0];

// Footer columns per Figma — [Github, LinkedIn, Slack] / [Career, News, Pricing, Legal].
const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

// ── Article band — FilterTabBar + responsive grid/list (client state) ──────────
function ArticleBand({ items, exclude }: { items: Article[]; exclude?: string }) {
  const [tab, setTab] = React.useState<string>('Latest');
  const [view, setView] = React.useState<ViewMode>('grid');

  const filtered = items
    .filter((a) => a.id !== exclude)
    .filter((a) => tab === 'Latest' || a.category === tab);

  return (
    <section className="w-full pt-xl pb-2xl">
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <FilterTabBar
          className="mb-xl"
          items={tabItems}
          value={tab}
          onValueChange={setTab}
          view={view}
          onViewChange={setView}
        />

        {view === 'grid' ? (
          <div className="grid grid-cols-1 gap-lg tablet:grid-cols-2 laptop:grid-cols-3">
            {filtered.map((a) => (
              <NewsItem
                key={a.id}
                variant="portrait"
                title={a.title}
                category={a.category}
                date={a.date}
                cover={a.cover ? <BlogThumbnail {...a.cover} /> : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="border-t border-border-light">
            {filtered.map((a) => (
              <NewsItem
                key={a.id}
                variant="list"
                title={a.title}
                category={a.category}
                date={a.date}
              />
            ))}
          </div>
        )}

        <div className="mt-2xl flex justify-center">
          <TextButton arrow>Load more</TextButton>
        </div>
      </div>
    </section>
  );
}

// ── Featured story — large cover + category Badge + title + date ──────────────
function FeaturedStory({ article }: { article: Article }) {
  return (
    <section className="w-full">
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <a href="#" className="group flex flex-col gap-lg no-underline">
          {article.cover && <BlogThumbnail {...article.cover} className="aspect-video" />}
          <div className="flex flex-col gap-md">
            <Badge variant="primary">{article.category}</Badge>
            <h2 className="text-heading-md text-text-primary max-w-body group-hover:underline">
              {article.title}
            </h2>
            <span className="text-body-sm text-text-muted">{article.date}</span>
          </div>
        </a>
      </div>
    </section>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────

// 57:2692 — featured story on top, then the filtered grid.
export const RecentNews: Story = {
  render: () => (
    <div className="bg-surface-primary min-h-screen">
      <NavBar>
        {navItems.map((n) => (
          <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>
        ))}
      </NavBar>
      <main>
        <PageHeader
          eyebrow="News"
          eyebrowIcon={<BookStack {...sz} />}
          heading="Latest news"
          className="pb-lg"
        />
        <FeaturedStory article={featured} />
        <ArticleBand items={allArticles} exclude={featured.id} />
      </main>
      <Footer columns={footerColumns} />
    </div>
  ),
};

// 57:2801 — plain grid, no featured story.
export const RecentNewsGrid: Story = {
  render: () => (
    <div className="bg-surface-primary min-h-screen">
      <NavBar>
        {navItems.map((n) => (
          <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>
        ))}
      </NavBar>
      <main>
        <PageHeader
          eyebrow="Research"
          eyebrowIcon={<BookStack {...sz} />}
          heading="Latest news"
          className="pb-lg"
        />
        <ArticleBand items={allArticles} />
      </main>
      <Footer columns={footerColumns} />
    </div>
  ),
};
