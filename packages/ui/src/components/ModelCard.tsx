import * as React from 'react';
import { cn } from '../utils';
import { Button } from './Button';
import { TextButton } from './TextButton';

// Spec: Figma "our models" section 57:2513 (cards 57:2516 / 57:2520 / 57:2534).
// A wide tinted card (708×350 ≈ 2:1) used as a carousel slide: title + body
// top-left, a black CTA + a text-button bottom-left, and a transparent Boltz
// Studio protein render bleeding off the bottom-right corner. The render is a
// transparent PNG so it floats on every tone.
//
// Figma card tones: light #FFFFFF · sand #EEE7DB (tierra-200) · clay #DACAB0
// (tierra-500) · sage #EDF7ED (sage-pale).

const toneStyles = {
  light: 'bg-surface-card-light',
  sand: 'bg-tierra-200',
  clay: 'bg-tierra-500',
  sage: 'bg-sage-pale',
} as const;

export type ModelCardTone = keyof typeof toneStyles;

export interface ModelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  body: string;
  tone?: ModelCardTone;
  /** Black CTA label. Default 'Get access'. Omit with `ctaLabel={null}`. */
  ctaLabel?: string | null;
  /** Secondary text-button label. Default 'Read technical report'. */
  reportLabel?: string | null;
  /** Transparent protein render (Boltz Studio export). */
  renderSrc?: string;
}

export const ModelCard = React.forwardRef<HTMLDivElement, ModelCardProps>(
  (
    {
      className,
      title,
      body,
      tone = 'light',
      ctaLabel = 'Get access',
      reportLabel = 'Read technical report',
      renderSrc,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-lg flex flex-col',
        'p-lg tablet:p-32',
        // 708×350 ≈ 2:1 on desktop; let mobile grow to its content so the CTA
        // never clips.
        'aspect-auto tablet:aspect-[708/350]',
        toneStyles[tone],
        className,
      )}
      {...rest}
    >
      {renderSrc && (
        <img
          src={renderSrc}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute bottom-0 right-0 w-[47%] h-auto translate-x-[11%] translate-y-[16%]"
        />
      )}

      <h3 className="text-heading-md text-text-primary relative z-10">{title}</h3>
      <p className="text-body-md text-text-secondary mt-md max-w-none tablet:max-w-[56%] relative z-10">
        {body}
      </p>

      {(ctaLabel || reportLabel) && (
        <div className="mt-auto pt-lg flex flex-col items-start gap-md tablet:flex-row tablet:items-center tablet:gap-20 relative z-10">
          {ctaLabel && <Button variant="black">{ctaLabel}</Button>}
          {reportLabel && <TextButton arrow>{reportLabel}</TextButton>}
        </div>
      )}
    </div>
  ),
);
ModelCard.displayName = 'ModelCard';
