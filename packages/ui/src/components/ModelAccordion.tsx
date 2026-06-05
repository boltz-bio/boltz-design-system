import * as React from 'react';
import { cn } from '../utils';
import { EyebrowLabel } from './EyebrowLabel';
import { Button } from './Button';
import { Accordion, AccordionItem, AccordionActions } from './Accordion';
import { Badge } from './Badge';
import { TextButton } from './TextButton';

// Section — model accordion (Figma node 246:452).
// tierra-100 background. Header row: eyebrow + heading left, CTA right.
// Two-column split: decorative rotated protein image left, accordion right.
// Each model item has a title, optional badge, optional body, and optional actions.

export interface ModelAccordionItem {
  id: string;
  title: React.ReactNode;
  /** Badge label e.g. "Beta", "MIT" */
  badge?: string;
  /** Badge variant — defaults to "tertiary" (tierra) */
  badgeVariant?: 'primary' | 'secondary' | 'tertiary';
  body?: React.ReactNode;
  /** Primary CTA label */
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Secondary text link label */
  secondaryCta?: string;
  onSecondaryCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ModelAccordionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrowIcon?: React.ReactNode;
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  /** CTA label in the header row */
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  models: ModelAccordionItem[];
  /** Decorative media slot — e.g. a protein render image */
  media?: React.ReactNode;
  /** Accordion default open item id — defaults to the first model */
  defaultValue?: string;
}

export const ModelAccordion = React.forwardRef<HTMLElement, ModelAccordionProps>(
  ({
    className,
    eyebrowIcon,
    eyebrow = 'Our models',
    heading,
    cta = 'View all models',
    onCtaClick,
    models,
    media,
    defaultValue,
    ...rest
  }, ref) => {
    const openId = defaultValue ?? models[0]?.id;

    return (
      <section ref={ref} className={cn('w-full py-2xl bg-tierra-100', className)} {...rest}>
        <div className="max-w-container mx-auto px-md tablet:px-40">

          {/* Header row */}
          <div className="flex items-end justify-between mb-2xl gap-lg flex-wrap">
            <div className="flex flex-col gap-md">
              <EyebrowLabel icon={eyebrowIcon ?? null}>{eyebrow}</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-body">{heading}</h2>
            </div>
            {cta && (
              <Button variant="black" suffix="arrow-icon" onClick={onCtaClick}>
                {cta}
              </Button>
            )}
          </div>

          {/* Two-column: media left, accordion right */}
          <div className="grid grid-cols-1 gap-2xl laptop:grid-cols-2 laptop:gap-0 items-center">

            {/* Media — decorative protein render, rotated */}
            <div className="relative flex items-center justify-center py-xl overflow-visible">
              {media && (
                <div className="-rotate-[30deg]">
                  {media}
                </div>
              )}
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible defaultValue={openId}>
              {models.map((model) => (
                <AccordionItem
                  key={model.id}
                  value={model.id}
                  title={model.title}
                  badge={
                    model.badge
                      ? <Badge variant={model.badgeVariant ?? 'tertiary'}>{model.badge}</Badge>
                      : undefined
                  }
                >
                  {model.body && (
                    <p className="text-body-md text-text-secondary">{model.body}</p>
                  )}
                  {(model.cta || model.secondaryCta) && (
                    <AccordionActions>
                      {model.cta && (
                        <Button variant="black" suffix="arrow-icon" onClick={model.onCtaClick}>
                          {model.cta}
                        </Button>
                      )}
                      {model.secondaryCta && (
                        <TextButton onClick={model.onSecondaryCtaClick}>
                          {model.secondaryCta}
                        </TextButton>
                      )}
                    </AccordionActions>
                  )}
                </AccordionItem>
              ))}
            </Accordion>

          </div>
        </div>
      </section>
    );
  },
);
ModelAccordion.displayName = 'ModelAccordion';
