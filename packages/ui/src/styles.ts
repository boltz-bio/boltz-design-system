// Shared className fragments — a single source for interactive states so every
// component doesn't re-declare (and drift on) the same focus ring / disabled /
// arrow logic. Compose these through `cn()`.

/** Keyboard focus ring used on all interactive elements. */
export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary';

/** Disabled appearance for buttons/controls. */
export const disabledState = 'disabled:opacity-60 disabled:pointer-events-none';

/** Pointer affordance for clickable, non-text-selectable controls. */
export const interactive = 'cursor-pointer select-none';

/**
 * ↗ arrow behaviour: an `ArrowRight` icon rotated -45° (so it reads as ↗) that
 * spins back to `→` on hover. Used by the pill CTAs (Button, NavCta). Use the SVG
 * icon, not the `→` text glyph — the glyph's ink sits off-centre in its text box
 * and drifts when rotated. Requires a `group` parent.
 */
export const arrowSpin =
  'inline-block -rotate-45 group-hover:rotate-0 transition-transform duration-spring ease-spring';

/**
 * Optical vertical centring for text inside fixed-height controls (buttons,
 * pills, tabs). Stabil Grotesk's line metrics sit the glyphs low: a mathematically
 * centred label renders ~0.7px low for capitals and ~2.3px low for lowercase.
 * 2px of bottom padding inside an `items-center` control lifts the text ~1.5px,
 * splitting the difference so mixed-case labels read as centred (measured:
 * optical centre within ±0.1px across the 36 / 40 / 44px controls).
 */
export const opticalTextCenter = 'pb-2';
