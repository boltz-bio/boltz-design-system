import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';
import { CardCaseStudy } from './Card';
import { StatMetric, StatMetricRow } from './StatMetric';
import { Button } from './Button';

// Section — Community (Figma node 246:565).
// sage-pale background. Header: eyebrow + heading-md + prev/next nav (only when >1 case study).
// Case study carousel (CardCaseStudy). Stats strip (StatMetricRow).
// Two CTA rows: title + body + Button, separated by border-b.

export interface CommunityStat {
  value: React.ReactNode;
  label: React.ReactNode;
}

export interface CommunityCta {
  title: React.ReactNode;
  body: React.ReactNode;
  cta: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CommunityCaseStudy {
  logo?: React.ReactNode;
  heading: React.ReactNode;
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  image?: React.ReactNode;
}

export interface CommunitySectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrowIcon?: React.ReactNode;
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  caseStudies: CommunityCaseStudy[];
  stats: CommunityStat[];
  ctas: CommunityCta[];
}

export const CommunitySection = React.forwardRef<HTMLElement, CommunitySectionProps>(
  ({
    className,
    eyebrowIcon,
    eyebrow = 'Community',
    heading,
    caseStudies,
    stats,
    ctas,
    ...rest
  }, ref) => {
    const [index, setIndex] = React.useState(0);
    const showNav = caseStudies.length > 1;
    const current = caseStudies[index] ?? caseStudies[0];

    const prev = () => setIndex((i) => (i - 1 + caseStudies.length) % caseStudies.length);
    const next = () => setIndex((i) => (i + 1) % caseStudies.length);

    return (
      <section ref={ref} className={cn('w-full py-2xl bg-sage-pale', className)} {...rest}>
        <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">

          {/* Header row */}
          <div className="flex items-end justify-between gap-lg">
            <div className="flex flex-col gap-md max-w-body">
              <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary">{heading}</h2>
            </div>
            {showNav && (
              <div className="flex gap-sm flex-shrink-0">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className={cn(
                    'w-36 h-36 rounded-full border border-border-strong flex items-center justify-center',
                    'bg-transparent cursor-pointer opacity-50',
                    'transition-opacity duration-base ease-standard hover:opacity-100',
                  )}
                >
                  <span className="text-body-sm leading-none rotate-180 inline-block">→</span>
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className={cn(
                    'w-36 h-36 rounded-full border border-border-strong flex items-center justify-center',
                    'bg-transparent cursor-pointer',
                    'transition-opacity duration-base ease-standard hover:opacity-80',
                  )}
                >
                  <span className="text-body-sm leading-none">→</span>
                </button>
              </div>
            )}
          </div>

          {/* Case study card */}
          <CardCaseStudy
            logo={current.logo}
            heading={current.heading}
            cta={current.cta ?? 'Read more'}
            onCtaClick={current.onCtaClick}
            image={current.image}
          />

          {/* Stats strip */}
          <StatMetricRow>
            {stats.map((s, i) => (
              <StatMetric key={i} value={s.value} label={s.label} />
            ))}
          </StatMetricRow>

          {/* CTA rows */}
          <div className="flex flex-col">
            {ctas.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-lg py-lg border-b border-border-light first:border-t"
              >
                <div className="flex flex-col gap-sm max-w-[660px]">
                  <h3 className="text-heading-sm text-text-primary">{row.title}</h3>
                  <p className="text-body-md text-text-secondary">{row.body}</p>
                </div>
                <Button variant="black" suffix="arrow-icon" onClick={row.onCtaClick} className="flex-shrink-0">
                  {row.cta}
                </Button>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  },
);
CommunitySection.displayName = 'CommunitySection';
