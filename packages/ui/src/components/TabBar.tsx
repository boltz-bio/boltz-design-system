import * as React from 'react';
import { ViewGrid, List } from 'iconoir-react';
import { cn } from '../utils';
import { focusRing, interactive } from '../styles';

// Spec: components.html tab-bar / filter-tab-bar (Figma node 57-4617)
//
// Structure: connected pill strip — h:36, border-radius:44px, border:1px black.
//   gap:0, -ml-px on all tabs after first to merge borders.
//   Active: black fill, white text, z-1. Inactive: transparent, black border.
//
// Variants:
//   TabBar        — just the pill strip (controlled)
//   FilterTabBar  — strip + ViewToggle on the right (news page pattern)
//   ViewToggle    — standalone grid/list switcher

// ── Tab (individual pill) ─────────────────────────────────────────────────────

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, active, children, ...rest }, ref) => (
    <button
      ref={ref}
      role="tab"
      aria-selected={active}
      className={cn(
        'h-36 px-20 rounded-full border border-action-primary',
        'inline-flex items-center',
        'text-body-sm whitespace-nowrap',
        interactive,
        '-ml-px first:ml-0',   // merge border seam
        active
          ? 'bg-action-primary text-text-on-dark relative z-10'
          : 'bg-transparent text-text-primary hover:bg-surface-secondary',
        focusRing,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  ),
);
Tab.displayName = 'Tab';

// ── TabBar ────────────────────────────────────────────────────────────────────
// Controlled. Pass `value` (active tab key) + `onValueChange`.
// Or use uncontrolled by composing <Tab active={...}> directly as children.

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: TabItem[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>(
  ({ className, items, value, onValueChange, children, ...rest }, ref) => (
    <div
      ref={ref}
      role="tablist"
      // Connected pills can't wrap (the -ml-px border seam breaks), so on overflow
      // (e.g. many tabs on mobile) the strip scrolls horizontally instead.
      className={cn(
        'inline-flex items-center max-w-full min-w-0 overflow-x-auto',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...rest}
    >
      {items
        ? items.map((item) => (
            <Tab
              key={item.value}
              active={item.value === value}
              onClick={() => onValueChange?.(item.value)}
            >
              {item.label}
            </Tab>
          ))
        : children}
    </div>
  ),
);
TabBar.displayName = 'TabBar';

// ── ViewToggle ────────────────────────────────────────────────────────────────
// Grid / list view switcher — two 36×36 pill buttons, gap-4.
// Uses Unicode chars by default; swap for Iconoir icons via `gridIcon`/`listIcon`.

export type ViewMode = 'grid' | 'list';

export interface ViewToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: ViewMode;
  onValueChange?: (value: ViewMode) => void;
  gridIcon?: React.ReactNode;
  listIcon?: React.ReactNode;
}

export const ViewToggle = React.forwardRef<HTMLDivElement, ViewToggleProps>(
  ({ className, value = 'grid', onValueChange, gridIcon, listIcon, ...rest }, ref) => (
    <div ref={ref} className={cn('flex gap-4', className)} {...rest}>
      {(['grid', 'list'] as ViewMode[]).map((mode) => {
        const isActive = value === mode;
        const icon = mode === 'grid'
          ? (gridIcon ?? <ViewGrid width={16} height={16} strokeWidth={1.5} />)
          : (listIcon ?? <List width={16} height={16} strokeWidth={1.5} />);
        return (
          <button
            key={mode}
            aria-label={`${mode} view`}
            aria-pressed={isActive}
            onClick={() => onValueChange?.(mode)}
            className={cn(
              'w-36 h-36 rounded-full border border-action-primary',
              'inline-flex items-center justify-center',
              'text-body-sm',
              interactive,
              focusRing,
              isActive
                ? 'bg-action-primary text-text-on-dark'
                : 'bg-transparent text-text-primary hover:bg-surface-secondary',
            )}
          >
            {icon}
          </button>
        );
      })}
    </div>
  ),
);
ViewToggle.displayName = 'ViewToggle';

// ── FilterTabBar ──────────────────────────────────────────────────────────────
// Tab strip (left) + ViewToggle (right) — news/blog page pattern.

export interface FilterTabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
  /** Replace the default ViewToggle with a custom right-side element */
  rightSlot?: React.ReactNode;
}

export const FilterTabBar = React.forwardRef<HTMLDivElement, FilterTabBarProps>(
  ({ className, items, value, onValueChange, view, onViewChange, rightSlot, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-md mobile:flex-row mobile:items-center mobile:justify-between', className)}
      {...rest}
    >
      <TabBar items={items} value={value} onValueChange={onValueChange} />
      {rightSlot !== undefined
        ? rightSlot
        : <ViewToggle value={view} onValueChange={onViewChange} />}
    </div>
  ),
);
FilterTabBar.displayName = 'FilterTabBar';
