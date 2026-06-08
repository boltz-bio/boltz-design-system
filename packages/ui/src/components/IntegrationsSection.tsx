import * as React from 'react';
import { cn } from '../utils';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { TextButton } from './TextButton';
import { ListItemApp } from './ListItem';

// Section — Integrations (Figma node 246:989).
// White background. Two-column split: copy + CTAs left, 2×N integration grid right.
// Each integration rendered with ListItemApp (branded square icon + name + description).

export interface Integration {
  iconSrc: string;
  iconAlt?: string;
  /** Tailwind bg class, e.g. "bg-[#d77655]". Passed to ListItemApp's iconBg. */
  iconBg?: string;
  name: string;
  description?: string;
}

export interface IntegrationsSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrowIcon?: React.ReactNode;
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  secondaryCta?: string;
  onSecondaryCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  integrations: Integration[];
}

export const IntegrationsSection = React.forwardRef<HTMLElement, IntegrationsSectionProps>(
  ({
    className,
    eyebrowIcon,
    eyebrow = 'Integrations',
    heading,
    cta = 'Get access',
    onCtaClick,
    secondaryCta = 'See all the Integrations',
    onSecondaryCtaClick,
    integrations,
    ...rest
  }, ref) => (
    <section ref={ref} className={cn('w-full py-2xl', className)} {...rest}>
      <div className="max-w-container mx-auto px-md tablet:px-40">
        <div className="grid grid-cols-1 gap-2xl laptop:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] laptop:gap-[128px] items-start">

          {/* Left — copy + CTAs */}
          <div className="flex flex-col gap-xl">
            <SectionHeader eyebrowIcon={eyebrowIcon} eyebrow={eyebrow} title={heading} titleSize="sm" />
            <div className="flex items-center gap-md flex-wrap">
              <Button variant="black" suffix="arrow-icon" onClick={onCtaClick}>
                {cta}
              </Button>
              <TextButton onClick={onSecondaryCtaClick}>
                {secondaryCta}
              </TextButton>
            </div>
          </div>

          {/* Right — integration grid using ListItemApp. One column on phones
              (two 77px-icon items won't fit side-by-side), two from mobile: (768). */}
          <div className="grid grid-cols-1 gap-y-xl mobile:grid-cols-2 mobile:gap-x-2xl">
            {integrations.map((item, i) => (
              <ListItemApp
                key={i}
                iconBg={item.iconBg ?? 'bg-surface-secondary'}
                iconSrc={item.iconSrc}
                iconAlt={item.iconAlt}
                heading={item.name}
                description={item.description}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  ),
);
IntegrationsSection.displayName = 'IntegrationsSection';
