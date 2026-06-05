import * as React from 'react';
import { cn } from '../utils';

// A tiny, scalable wrapper that normalises ANY icon — an iconoir component, a
// hand-authored <svg>, or a pasted raw SVG string — into a consistent square box
// that scales with `size` and recolours via a `text-*` token (monochrome icons
// that use `currentColor` follow it). Lets product teams drop in custom brand
// glyphs without bespoke markup.
//
//   <Icon><Leaf /></Icon>                       // wrap an iconoir icon
//   <Icon size={32} className="text-sage-dark"><MyGlyph /></Icon>
//   <Icon svg={'<svg viewBox=…>…</svg>'} />      // paste exported SVG markup
//
// NOTE: `svg` is injected with dangerouslySetInnerHTML — only pass SVG you trust
// (your own design exports), never untrusted user input.

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Square size in px. Default 24. Omit and use w-/h- classes to size by token. */
  size?: number;
  /** Accessible name. When omitted the icon is decorative (aria-hidden). */
  label?: string;
  /** Raw SVG markup to render inline (a pasted export). Trusted SVG only. */
  svg?: string;
  /** Or an icon node — an iconoir component, a custom <svg>, etc. */
  children?: React.ReactNode;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, size = 24, label, svg, children, style, ...rest }, ref) => {
    const a11y = label
      ? { role: 'img' as const, 'aria-label': label }
      : { 'aria-hidden': true };

    return (
      <span
        ref={ref}
        {...a11y}
        className={cn(
          'inline-flex shrink-0 items-center justify-center text-current',
          // Force the inner SVG to fill the box so any source scales cleanly.
          '[&>svg]:block [&>svg]:h-full [&>svg]:w-full',
          className,
        )}
        style={size ? { width: size, height: size, ...style } : style}
        {...(svg ? { dangerouslySetInnerHTML: { __html: svg } } : {})}
        {...rest}
      >
        {svg ? undefined : children}
      </span>
    );
  },
);
Icon.displayName = 'Icon';
