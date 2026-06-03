import * as React from 'react';
import { cn } from '../utils';
import { FilterTabBar, type ViewMode } from './TabBar';
import { NewsItem } from './NewsItem';

// Section — the news/article band. Composes an optional FilterTabBar (category
// filter + grid/list view toggle) above a responsive article grid or list.
// Full-width with the standard inner container. Filtering and view mode are held
// in internal state; pass `items` and optionally disable filtering or change the
// default view. Mobile-first: the grid stacks on phones and expands at
// `tablet:`/`laptop:`.

export interface NewsGridArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  summary?: string;
  thumbnail?: string;
}

export interface NewsGridProps extends React.HTMLAttributes<HTMLElement> {
  items: NewsGridArticle[];
  /** Show the category filter + view toggle bar. Default true. */
  filterable?: boolean;
  /** Initial view mode. Default 'grid'. */
  defaultView?: ViewMode;
}

export const NewsGrid = React.forwardRef<HTMLElement, NewsGridProps>(
  ({ className, items, filterable = true, defaultView = 'grid', ...rest }, ref) => {
    const [activeCategory, setActiveCategory] = React.useState('All');
    const [view, setView] = React.useState<ViewMode>(defaultView);

    const categories = React.useMemo(
      () => ['All', ...Array.from(new Set(items.map((item) => item.category)))],
      [items],
    );
    const tabItems = React.useMemo(
      () => categories.map((c) => ({ value: c, label: c })),
      [categories],
    );

    const filtered = React.useMemo(
      () =>
        activeCategory === 'All'
          ? items
          : items.filter((item) => item.category === activeCategory),
      [items, activeCategory],
    );

    return (
      <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
        <div className="max-w-container mx-auto px-md tablet:px-40">
          {filterable && (
            <FilterTabBar
              className="mb-xl"
              items={tabItems}
              value={activeCategory}
              onValueChange={setActiveCategory}
              view={view}
              onViewChange={setView}
            />
          )}

          {view === 'grid' ? (
            <div className="grid grid-cols-1 gap-lg tablet:grid-cols-2 laptop:grid-cols-3">
              {filtered.map((article) => (
                <NewsItem
                  key={article.id}
                  variant="portrait"
                  title={article.title}
                  category={article.category}
                  date={article.date}
                  summary={article.summary}
                  thumbnail={article.thumbnail}
                />
              ))}
            </div>
          ) : (
            <div className="border-t border-border-light">
              {filtered.map((article) => (
                <NewsItem
                  key={article.id}
                  variant="list"
                  title={article.title}
                  category={article.category}
                  date={article.date}
                  summary={article.summary}
                  thumbnail={article.thumbnail}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);
NewsGrid.displayName = 'NewsGrid';
