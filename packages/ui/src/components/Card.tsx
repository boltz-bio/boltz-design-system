import * as React from 'react';
import { cn } from '../utils';
import { Button } from './Button';
import { EyebrowLabel } from './EyebrowLabel';

// ── Color system ──────────────────────────────────────────────────────────────
//
// Full card colour palette — 14 variants across 3 families + black + white.
//
//   black     #232323   — platform/dark sections only
//   white     #FFFFFF   — always has border-light
//
//   sage-dark    #003014   dark text → white
//   sage-medium  #C6E5C6   dark text
//   sage-light   #D9EED9   dark text
//   sage-pale    #EDF7ED   dark text, border-light
//
//   blue-dark    #142D36   dark text → white
//   blue-medium  #C7E3EE   dark text
//   blue-light   #E5F2F7   dark text
//   blue-pale    #EEF6FA   dark text, border-light
//
//   tierra-500   #DACAB0   dark text
//   tierra-200   #EEE7DB   dark text
//   tierra-100   #F7F2E9   dark text
//   tierra-50    #FBFAF7   dark text, border-light
//
// Placement rules (documented, not enforced):
//   White page     → pale variants
//   Light section  → light / medium variants
//   Coloured sect  → same family, darker scale
//   4+ cards/row   → all same colour
//   Max 3 medium/row; preferred different scale, same family
//
// ── Stacking gaps ─────────────────────────────────────────────────────────────
//   Always gap-sm (8px) between cards

export type CardColor =
  | 'black' | 'white'
  | 'sage-dark'    | 'sage-medium'  | 'sage-light'  | 'sage-pale'
  | 'blue-dark'    | 'blue-medium'  | 'blue-light'  | 'blue-pale'
  | 'tierra-500'   | 'tierra-200'   | 'tierra-100'  | 'tierra-50';

// Dark backgrounds require white text + white buttons
const DARK_COLORS = new Set<CardColor>(['black', 'sage-dark', 'blue-dark']);
export const isDarkColor = (c: CardColor) => DARK_COLORS.has(c);

// Pale backgrounds get a border-light
const PALE_COLORS = new Set<CardColor>(['white', 'sage-pale', 'blue-pale', 'tierra-50']);

const bgClass: Record<CardColor, string> = {
  'black':       'bg-action-primary',
  'white':       'bg-white border border-border-light',
  'sage-dark':   'bg-sage-dark',
  'sage-medium': 'bg-sage-medium',
  'sage-light':  'bg-sage-light',
  'sage-pale':   'bg-sage-pale',
  'blue-dark':   'bg-blue-dark',
  'blue-medium': 'bg-blue-medium',
  'blue-light':  'bg-blue-light',
  'blue-pale':   'bg-blue-pale',
  'tierra-500':  'bg-tierra-500',
  'tierra-200':  'bg-tierra-200',
  'tierra-100':  'bg-tierra-100',
  'tierra-50':   'bg-tierra-50',
};

// ── CardGroup ─────────────────────────────────────────────────────────────────
// Wrapper that applies the correct gap based on visual relationship.
//   connected  — 8px  gap  (shared visual group, cards feel unified)
//   standalone — 24px gap  (independent elements, cards feel separate)

export interface CardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid columns — defaults to flex row */
  columns?: number;
}

export const CardGroup = React.forwardRef<HTMLDivElement, CardGroupProps>(
  ({ className, columns, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        columns
          ? `grid grid-cols-${columns}`
          : 'flex flex-wrap',
        'gap-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
);
CardGroup.displayName = 'CardGroup';

// ── CardSmall ─────────────────────────────────────────────────────────────────
// Max 3+ per row. heading-sm (24px) + optional body-md + optional icon (56×56).
// No button. p-lg (24px), rounded-lg (16px).

export interface CardSmallProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: CardColor;
  /** Icon rendered at 56×56 above the heading */
  icon?: React.ReactNode;
  heading: React.ReactNode;
  body?: React.ReactNode;
}

export const CardSmall = React.forwardRef<HTMLDivElement, CardSmallProps>(
  ({ className, color = 'blue-pale', icon, heading, body, ...rest }, ref) => {
    const dark = isDarkColor(color);
    return (
      <div
        ref={ref}
        className={cn('rounded-lg p-lg flex flex-col gap-md', bgClass[color], className)}
        {...rest}
      >
        {icon && (
          <div className={cn('w-56 h-56 flex items-center justify-center', dark ? 'text-text-on-dark' : 'text-text-primary')}>
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-sm">
          <h3 className={cn('text-heading-sm', dark ? 'text-text-on-dark' : 'text-text-primary')}>
            {heading}
          </h3>
          {body && (
            <p className={cn('text-body-md', dark ? 'text-white/55' : 'text-text-secondary')}>
              {body}
            </p>
          )}
        </div>
      </div>
    );
  },
);
CardSmall.displayName = 'CardSmall';

// ── CardMedium ────────────────────────────────────────────────────────────────
// Max 3 per row. heading-md + body-md + Button. p-xl (40px), rounded-lg, min-h 333px.

export interface CardMediumProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: CardColor;
  heading: React.ReactNode;
  body?: React.ReactNode;
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CardMedium = React.forwardRef<HTMLDivElement, CardMediumProps>(
  ({ className, color = 'blue-light', heading, body, cta, onCtaClick, ...rest }, ref) => {
    const dark = isDarkColor(color);
    return (
      <div
        ref={ref}
        className={cn('rounded-lg p-xl flex flex-col justify-between gap-xl min-h-[333px]', bgClass[color], className)}
        {...rest}
      >
        <div className="flex flex-col gap-md">
          <h2 className={cn('text-heading-md', dark ? 'text-text-on-dark' : 'text-text-primary')}>
            {heading}
          </h2>
          {body && (
            <p className={cn('text-body-md', dark ? 'text-white/55' : 'text-text-secondary')}>
              {body}
            </p>
          )}
        </div>
        {cta && (
          <Button variant={dark ? 'white' : 'black'} onClick={onCtaClick}>
            {cta}
          </Button>
        )}
      </div>
    );
  },
);
CardMedium.displayName = 'CardMedium';

// ── CardWide ──────────────────────────────────────────────────────────────────
// One per row/section only. Always black (#232323). h-560 with image, flex otherwise.
// Eyebrow + heading-md + body-md + Button white. Optional image on right half.

export interface CardWideProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrowIcon?: React.ReactNode;
  eyebrowLabel?: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  image?: React.ReactNode;
}

export const CardWide = React.forwardRef<HTMLDivElement, CardWideProps>(
  ({ className, eyebrowIcon, eyebrowLabel, heading, body, cta, onCtaClick, image, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg bg-action-primary overflow-hidden w-full',
        image ? 'flex items-stretch h-[560px]' : 'flex flex-col',
        className,
      )}
      {...rest}
    >
      <div className={cn('flex flex-col gap-xl p-xl', image ? 'flex-1 justify-between' : 'gap-lg')}>
        <div className="flex flex-col gap-md">
          {(eyebrowIcon || eyebrowLabel) && (
            <EyebrowLabel variant="dark" icon={eyebrowIcon ?? null}>
              {eyebrowLabel}
            </EyebrowLabel>
          )}
          <h2 className="text-heading-md text-text-on-dark">{heading}</h2>
          {body && (
            <p className="text-body-md text-white/55">{body}</p>
          )}
        </div>
        {cta && <Button variant="white" onClick={onCtaClick}>{cta}</Button>}
      </div>
      {image && (
        <div className="flex-1 overflow-hidden relative">{image}</div>
      )}
    </div>
  ),
);
CardWide.displayName = 'CardWide';

// ── CardCaseStudy ─────────────────────────────────────────────────────────────
// Two panels: dark content left + image right. h-350px.
// Left always sage-dark. Right is an image slot.

export interface CardCaseStudyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Client/partner logotype — pass an <img> or inline SVG file.
   * Rendered at h-32, white-tinted on the dark background.
   * Example: <img src={pfizerLogo} alt="Pfizer" className="h-32 w-auto brightness-0 invert" />
   */
  logo?: React.ReactNode;
  heading: React.ReactNode;
  cta?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  image?: React.ReactNode;
}

export const CardCaseStudy = React.forwardRef<HTMLDivElement, CardCaseStudyProps>(
  ({ className, logo, heading, cta = 'Read more', onCtaClick, image, ...rest }, ref) => (
    <div ref={ref} className={cn('flex gap-sm items-stretch w-full', className)} {...rest}>
      <div className="w-1/2 bg-sage-dark rounded-lg p-xl flex flex-col justify-between h-[350px] overflow-hidden">
        <div className="flex flex-col gap-lg">
          {logo && <div className="h-32 flex items-center">{logo}</div>}
          <h3 className="text-heading-sm text-text-on-dark">{heading}</h3>
        </div>
        {cta && <Button variant="white" onClick={onCtaClick}>{cta}</Button>}
      </div>
      <div className="w-1/2 rounded-lg h-[350px] overflow-hidden bg-surface-secondary relative">
        {image}
      </div>
    </div>
  ),
);
CardCaseStudy.displayName = 'CardCaseStudy';

// ── Legacy Card (backward compat) ─────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'blue';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'light', ...rest }, ref) => {
    const cls = {
      light: 'bg-surface-card-light border border-border-light text-text-primary',
      dark:  'bg-surface-card-dark text-text-on-dark',
      blue:  'bg-surface-card-blue text-text-primary',
    }[variant];
    return <div ref={ref} className={cn('rounded-lg p-lg', cls, className)} {...rest} />;
  },
);
Card.displayName = 'Card';
