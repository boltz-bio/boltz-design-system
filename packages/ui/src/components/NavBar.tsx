import * as React from 'react';
import { Menu, Xmark } from 'iconoir-react';
import { cn } from '../utils';
import { focusRing, interactive } from '../styles';
import { NavCta } from './NavCta';
import { Logo } from './Logo';

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

// Spec: DESIGN.md `navbar` + components.html `.nav-demo`
// Source of truth: components.html Navigation section
//
// Structure:
//   [logo] ←————————————————→ [.nav-link][.nav-link][.nav-link][NavCta]
//   Logo left, all nav items right-aligned (margin-left: auto on the cluster).
//   Nav links are merged-border outline pills (gap:0, -ml-px after first).
//   h: 60px, px: 40px, bg: white, border-bottom: 1px border-light.
//
// Usage:
//   <NavBar>
//     <NavLink href="/platform">Platform</NavLink>
//     <NavLink href="/api">API</NavLink>
//     <NavLink href="/news">News</NavLink>
//     <NavCta>Get early access</NavCta>
//   </NavBar>

// ── NavLink ───────────────────────────────────────────────────────────────────
// Outline pill — h:36, px:20, rounded-full, 1px black border.
// Adjacent links merge borders via -ml-px (applied by NavBar on siblings).

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  /** 'light' (dark pills, for light backgrounds) or 'dark' (inverted, for dark heroes). */
  tone?: 'light' | 'dark';
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, active, tone = 'light', children, ...rest }, ref) => (
    <a
      ref={ref}
      className={cn(
        'h-36 px-20 rounded-full border inline-flex items-center',
        'text-body-sm whitespace-nowrap no-underline',
        'transition-colors duration-base ease-standard',
        tone === 'dark'
          ? cn('border-white/60 text-white', active ? 'bg-white text-text-primary' : 'bg-transparent hover:bg-white/10')
          : cn('border-action-primary text-text-primary', active ? 'bg-action-primary text-text-on-dark' : 'bg-transparent hover:bg-surface-secondary'),
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  ),
);
NavLink.displayName = 'NavLink';

// ── NavBar ────────────────────────────────────────────────────────────────────

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo slot — defaults to Boltz wordmark SVG */
  logo?: React.ReactNode;
  /** CTA label — defaults to "Get early access". Pass null to hide. */
  cta?: string | null;
  /** 'light' (dark nav, for light backgrounds) or 'dark' (inverted, for dark heroes). */
  tone?: 'light' | 'dark';
  /** Nav link items rendered as children */
  children?: React.ReactNode;
}

export const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  ({ className, logo, cta = 'Get early access', tone = 'light', children, ...rest }, ref) => {
    const scrolled = useScrolled();
    const [open, setOpen] = React.useState(false);
    const panelId = React.useId();
    const dark = tone === 'dark';
    // Inject the nav tone into NavLink children so they invert on dark heroes.
    const tonedChildren = React.Children.map(children, (child) =>
      React.isValidElement<NavLinkProps>(child) ? React.cloneElement(child, { tone }) : child,
    );
    return (
    <nav
      ref={ref}
      className={cn(
        'relative w-full h-60 px-40',
        'flex items-center justify-between',
        'sticky top-0 z-50',
        'transition-[background-color,backdrop-filter] duration-300 ease-standard',
        scrolled
          ? (dark ? 'bg-surface-card-dark/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md')
          : 'bg-transparent backdrop-blur-none',
        className,
      )}
      {...rest}
    >
      {/* Logo */}
      <a href="/" className={cn('flex items-center flex-shrink-0', dark ? 'text-white' : 'text-text-primary')}>
        {logo ?? <Logo title="Boltz" className={dark ? 'text-white' : undefined} />}
      </a>

      {/* Nav cluster — links + CTA, merged borders.
          Inline links show at ≥768px (`mobile:`); below that they collapse into
          the hamburger dropdown so the bar doesn't overflow on phones. */}
      <div className="flex items-center ml-auto">
        {/* Wrap children so we can apply -ml-px to merge link borders */}
        <div className="hidden mobile:flex items-center">
          {React.Children.map(tonedChildren, (child, i) => (
            <span key={i} className={i > 0 ? '-ml-px' : ''}>
              {child}
            </span>
          ))}
        </div>
        {cta !== null && (
          <span className="hidden mobile:inline-flex mobile:-ml-px">
            <NavCta variant={dark ? 'light' : 'dark'}>{cta}</NavCta>
          </span>
        )}

        {/* Hamburger — phones only (<768px). Toggles the dropdown panel. */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'mobile:hidden',
            'h-36 w-36 rounded-full border',
            'inline-flex items-center justify-center',
            'transition-colors duration-base ease-standard',
            dark
              ? 'border-white/60 text-white hover:bg-white/10'
              : 'border-action-primary text-text-primary hover:bg-surface-secondary',
            interactive,
            focusRing,
          )}
        >
          {open ? (
            <Xmark width={20} height={20} strokeWidth={1.5} />
          ) : (
            <Menu width={20} height={20} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile dropdown panel — phones only, same links stacked + CTA. */}
      {open && (
        <div
          id={panelId}
          className={cn(
            'mobile:hidden',
            'absolute left-0 right-0 top-full',
            'flex flex-col gap-12',
            dark ? 'bg-surface-card-dark border-b border-white/10' : 'bg-white border-b border-border-light',
            'px-40 py-20',
          )}
        >
          {React.Children.map(tonedChildren, (child, i) => (
            <span key={i} className="flex w-full">
              {child}
            </span>
          ))}
          {cta !== null && (
            <span className="flex w-full">
              <NavCta variant={dark ? 'light' : 'dark'}>{cta}</NavCta>
            </span>
          )}
        </div>
      )}
    </nav>
    );
  },
);
NavBar.displayName = 'NavBar';
