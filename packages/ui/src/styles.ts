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
 * ↗ glyph behaviour: a `→` rotated -45° (so it reads as ↗) that spins back to
 * `→` on hover. Used by the pill CTAs (Button, NavCta). Requires a `group` parent.
 */
export const arrowSpin =
  'inline-block -rotate-45 group-hover:rotate-0 transition-transform duration-spring ease-spring';
