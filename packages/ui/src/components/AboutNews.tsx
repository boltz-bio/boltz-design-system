import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';
import { NewsItem, type NewsItemProps } from './NewsItem';
import { Button } from './Button';

// Section — about + news split (Figma node 246:703).
// Left: eyebrow + heading-md mission statement + body-md copy.
// Right: up to 3 news items in landscape variant, separated by border-b, + CTA.

export interface AboutNewsItem {
  title: string;
  category: string;
  date: string;
  cover?: NewsItemProps['cover'];
  thumbnail?: string;
  href?: string;
}

export interface AboutNewsProps extends React.HTMLAttributes<HTMLElement> {
  /** Eyebrow icon */
  eyebrowIcon?: React.ReactNode;
  /** Eyebrow label — defaults to "About us" */
  eyebrow?: React.ReactNode;
  /** Main heading */
  heading: React.ReactNode;
  /** Body copy — supports multiple paragraphs via an array */
  body: React.ReactNode;
  /** Up to 3 news items shown on the right */
  items: AboutNewsItem[];
  /** CTA label — defaults to "View all blog posts" */
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AboutNews = React.forwardRef<HTMLElement, AboutNewsProps>(
  ({
    className,
    eyebrowIcon,
    eyebrow = 'About us',
    heading,
    body,
    items,
    cta = 'View all blog posts',
    onCtaClick,
    ...rest
  }, ref) => (
    <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <div className="grid grid-cols-1 gap-2xl laptop:grid-cols-2 laptop:gap-[128px] items-start">

          {/* Left — about copy */}
          <div className="flex flex-col gap-md">
            <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>
            <h2 className="text-heading-md text-text-primary">{heading}</h2>
            <div className="text-body-md text-text-secondary">{body}</div>
          </div>

          {/* Right — news list + CTA */}
          <div className="flex flex-col">
            {items.slice(0, 3).map((item, i) => (
              <NewsItem
                key={i}
                variant="landscape"
                title={item.title}
                category={item.category}
                date={item.date}
                cover={item.cover}
                thumbnail={item.thumbnail}
                href={item.href ?? '#'}
                className="py-lg border-b border-border-light first:pt-0"
              />
            ))}
            {cta && (
              <div className="mt-lg">
                <Button variant="black" suffix="arrow-icon" onClick={onCtaClick}>
                  {cta}
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  ),
);
AboutNews.displayName = 'AboutNews';
