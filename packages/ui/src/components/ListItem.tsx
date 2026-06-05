import * as React from 'react';
import { cn } from '../utils'; // v2

// Spec: Figma node 118:823
//
// Two variants:
//
// ListItem (with icon)
//   Row: [icon 48×48] [title heading-sm + description body-md muted]
//   Gap between icon and text: 20px.
//   Stack multiple with gap-[56px] using ListItemGroup or flex flex-col gap-[56px].
//
// ListItemApp (with app icon)
//   Row: [app icon 77×77 rounded-[10px] coloured bg] [title body-md + description body-sm muted]
//   Gap between icon and text: 16px.
//   App icon bg colour is configurable; image/SVG inside is configurable.

// ── ListItem — Iconoir/SVG icon ───────────────────────────────────────────────

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon slot — pass any Iconoir component at 48×48.
   * Example: <Microscope width={48} height={48} strokeWidth={1} />
   */
  icon: React.ReactNode;
  heading: React.ReactNode;
  description?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ className, icon, heading, description, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex gap-[20px] items-start', className)}
      {...rest}
    >
      {/* Icon — 48×48 */}
      <div className="w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center text-text-primary">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[10px] flex-1 min-w-0">
        <h3 className="font-sans font-regular text-heading-sm text-text-primary">
          {heading}
        </h3>
        {description && (
          <p className="font-sans font-regular text-body-md text-text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  ),
);
ListItem.displayName = 'ListItem';

// ── ListItemApp — app icon square ─────────────────────────────────────────────

export interface ListItemAppProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Background colour for the app icon square.
   * Use any Tailwind bg class or inline style. Defaults to sage-dark.
   * Example: "bg-[#d77655]" or "bg-sage-dark"
   */
  iconBg?: string;
  /**
   * Image source URL for the app icon.
   * Upload or reference any image file — it renders at 54×54 inside the 77×77 square.
   * Example: iconSrc="/icons/claude-code.png" or iconSrc={import('./claude.png')}
   */
  iconSrc?: string;
  iconAlt?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
}

export const ListItemApp = React.forwardRef<HTMLDivElement, ListItemAppProps>(
  ({ className, iconBg = 'bg-sage-dark', iconSrc, iconAlt = '', heading, description, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex gap-[16px] items-center', className)}
      {...rest}
    >
      {/* App icon — 77×77, rounded-[10px], coloured bg */}
      <div
        className={cn(
          'w-[77px] h-[77px] rounded-[10px] flex-shrink-0',
          'flex items-center justify-center overflow-hidden',
          iconBg,
        )}
      >
        {iconSrc && (
          <img
            src={iconSrc}
            alt={iconAlt}
            className="w-[54px] h-[54px] object-contain"
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[8px] flex-1 min-w-0">
        <p className="font-sans font-regular text-body-md text-text-primary">
          {heading}
        </p>
        {description && (
          <p className="font-sans font-regular text-body-sm text-text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  ),
);
ListItemApp.displayName = 'ListItemApp';

// ── ListItemTab — clickable tab with hover + active states ────────────────────
// Spec: Figma node 118:863
//
// Three visual states:
//   enabled  — no background, 80% opacity
//   hover    — bg-tierra-50 via CSS :hover
//   active   — full opacity (managed by ListItemTabGroup's sliding bg)
//
// Use standalone with active/onClick, or inside ListItemTabGroup for
// the animated sliding-background variant.

export interface ListItemTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  heading: React.ReactNode;
  description?: React.ReactNode;
  active?: boolean;
}

export const ListItemTab = React.forwardRef<HTMLButtonElement, ListItemTabProps>(
  ({ className, icon, heading, description, active = false, ...rest }, ref) => (
    <button
      ref={ref}
      role="tab"
      aria-selected={active}
      className={cn(
        'relative z-10 flex flex-col items-start p-[20px] rounded-lg w-full text-left',
        'border-none cursor-pointer',
        'transition-[opacity,background-color] duration-base ease-standard',
        // Inactive: 80% opacity, blue-pale on hover
        !active && 'bg-transparent opacity-80 hover:bg-blue-pale',
        // Active: full opacity + blue-light bg (group overrides bg with its sliding pill)
        active && 'bg-blue-light opacity-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
        className,
      )}
      {...rest}
    >
      <div className="flex gap-[20px] items-start w-full">
        {/* Icon — 48×48 */}
        <div className="w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center text-text-primary">
          {icon}
        </div>
        {/* Text */}
        <div className="flex flex-col gap-[10px] flex-1 min-w-0">
          <span className="font-sans font-regular text-heading-sm text-text-primary">
            {heading}
          </span>
          {description && (
            <span className="font-sans font-regular text-body-md text-text-primary/75">
              {description}
            </span>
          )}
        </div>
      </div>
    </button>
  ),
);
ListItemTab.displayName = 'ListItemTab';

// ── ListItemTabGroup — animated sliding background ─────────────────────────────
// Wraps multiple ListItemTab children and renders an absolutely-positioned
// tierra-100 pill that slides vertically to the active item on each press.
//
// Usage:
//   <ListItemTabGroup active={idx} onActiveChange={setIdx} items={[...]} />

export interface ListItemTabGroupItem {
  icon: React.ReactNode;
  heading: React.ReactNode;
  description?: React.ReactNode;
}

export interface ListItemTabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ListItemTabGroupItem[];
  active?: number;
  onActiveChange?: (index: number) => void;
}

export const ListItemTabGroup = React.forwardRef<HTMLDivElement, ListItemTabGroupProps>(
  ({ className, items, active = 0, onActiveChange, ...rest }, ref) => {
    const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const [bg, setBg] = React.useState({ top: 0, height: 0 });

    // Measure the active item and move the sliding background to it.
    React.useEffect(() => {
      const el = itemRefs.current[active];
      if (el) setBg({ top: el.offsetTop, height: el.offsetHeight });
    }, [active]);

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn('relative flex flex-col', className)}
        {...rest}
      >
        {/* Animated background pill */}
        <div
          className="absolute left-0 right-0 bg-blue-light rounded-lg pointer-events-none"
          style={{
            top: bg.top,
            height: bg.height,
            transition: 'top 420ms cubic-bezier(0.76, 0, 0.24, 1), height 420ms cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />
        {items.map((item, i) => (
          <ListItemTab
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            icon={item.icon}
            heading={item.heading}
            description={item.description}
            active={i === active}
            onClick={() => onActiveChange?.(i)}
          />
        ))}
      </div>
    );
  },
);
ListItemTabGroup.displayName = 'ListItemTabGroup';
