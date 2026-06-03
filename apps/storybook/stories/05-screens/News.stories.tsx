import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  NavBar, NavLink, EyebrowLabel, FilterTabBar, NewsItem,
} from '@boltz/ui';
import { BookStack } from 'iconoir-react';
import { articles, navItems } from '../_data/boltz';

// Example News page — NavBar + filter tabs + article grid/list, all composed
// from existing components. Article data comes from the shared fixture.

const meta = {
  title: '05-Screens/News',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'surface-primary' } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
const tabItems = categories.map((c) => ({ value: c, label: c }));

export const News: Story = {
  render: () => {
    const [tab, setTab] = React.useState('All');
    const [view, setView] = React.useState<'grid' | 'list'>('grid');
    const shown = tab === 'All' ? articles : articles.filter((a) => a.category === tab);

    return (
      <div className="bg-surface-primary min-h-screen">
        <NavBar>
          {navItems.map((n) => <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>)}
        </NavBar>

        <section className="max-w-container mx-auto px-40 py-2xl flex flex-col gap-xl">
          <div className="flex flex-col gap-md">
            <EyebrowLabel icon={<BookStack {...sz} />}>News</EyebrowLabel>
            <h1 className="text-heading-lg text-text-primary">Research, product & community.</h1>
          </div>

          <FilterTabBar
            items={tabItems}
            value={tab}
            onValueChange={setTab}
            view={view}
            onViewChange={setView}
          />

          {view === 'grid' ? (
            <div className="grid grid-cols-3 gap-lg">
              {shown.map((a) => (
                <NewsItem key={a.id} variant="portrait" title={a.title} category={a.category} date={a.date} />
              ))}
            </div>
          ) : (
            <div className="border-t border-border-light">
              {shown.map((a) => (
                <NewsItem key={a.id} variant="list" title={a.title} category={a.category} date={a.date} />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  },
};
