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
//   h: 60px, px: 16px → 40px from `tablet:` (aligned with page content),
//   bg: transparent → frosted white once scrolled.
//   Phones (<768px): links collapse behind a hamburger; opening it simply
//   expands the header downward into a plain list of text links (it pushes the
//   page down rather than covering it).
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

/** Text-link styling for items in the expanded phone menu. Exported so app-level
 *  nav items (e.g. a custom CTA link) can match it when NavBar passes `menu`. */
export const navMenuItemClass = (tone: 'light' | 'dark' = 'light') =>
  cn(
    'block w-full py-sm text-body-lg no-underline text-left',
    'transition-opacity duration-base ease-standard hover:opacity-70',
    tone === 'dark' ? 'text-white' : 'text-text-primary',
    focusRing,
  );

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  /** 'light' (dark pills, for light backgrounds) or 'dark' (inverted, for dark heroes). */
  tone?: 'light' | 'dark';
  /** Render as a plain text link for the phone menu (set by NavBar). */
  menu?: boolean;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, active, tone = 'light', menu = false, children, ...rest }, ref) =>
    menu ? (
      // Phone-menu item: just a text link in the expanded header.
      <a
        ref={ref}
        className={cn(navMenuItemClass(tone), className)}
        aria-current={active ? 'page' : undefined}
        {...rest}
      >
        {children}
      </a>
    ) : (
    <a
      ref={ref}
      className={cn(
        'h-36 px-20 rounded-full border inline-flex items-center',
        'text-body-sm whitespace-nowrap no-underline',
        'transition-colors duration-base ease-standard',
        tone === 'dark'
          ? cn('border-white/60 text-white', active ? 'bg-transparent' : 'bg-transparent hover:bg-white/10')
          : cn('border-action-primary text-text-primary', active ? 'bg-transparent' : 'bg-transparent hover:bg-surface-secondary'),
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

    // Phone menu: close on Escape or once the viewport widens past the phone
    // breakpoint (the inline links take over).
    React.useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
      const mq = window.matchMedia('(min-width: 768px)');
      const onWide = () => { if (mq.matches) setOpen(false); };
      window.addEventListener('keydown', onKey);
      mq.addEventListener('change', onWide);
      return () => {
        window.removeEventListener('keydown', onKey);
        mq.removeEventListener('change', onWide);
      };
    }, [open]);
    return (
    <nav
      ref={ref}
      className={cn(
        'w-full px-md tablet:px-40',
        'sticky top-0 z-50',
        'transition-[background-color,backdrop-filter] duration-300 ease-standard',
        // Open phone menu: the header expands, solid (instantly — no fade over the
        // hero), with a hairline below.
        open
          ? (dark ? 'bg-surface-card-dark border-b border-white/10 duration-0' : 'bg-white border-b border-border-light duration-0')
          : scrolled
            ? (dark ? 'bg-surface-card-dark/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md')
            : 'bg-transparent backdrop-blur-none',
        className,
      )}
      {...rest}
    >
      {/* Bar row — fixed 60px */}
      <div className="h-60 flex items-center justify-between">
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
      </div>

      {/* Phone menu — the header simply grows: a plain list of text links. */}
      {open && (
        <div id={panelId} className="mobile:hidden flex flex-col pb-md">
          {React.Children.map(children, (child, i) =>
            React.isValidElement<NavLinkProps>(child)
              ? React.cloneElement(child, { key: i, tone, menu: true, onClick: () => setOpen(false) })
              : child,
          )}
          {cta !== null && (
            <button type="button" className={navMenuItemClass(tone)}>{cta}</button>
          )}
        </div>
      )}
    </nav>
    );
  },
);
NavBar.displayName = 'NavBar';
