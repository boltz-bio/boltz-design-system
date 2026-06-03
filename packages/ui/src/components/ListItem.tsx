import * as React from 'react';
import { cn } from '../utils';

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
//   enabled  — no background (default)
//   hover    — bg-blue-pale  (#EEF6FA)  via CSS :hover
//   active   — bg-blue-light (#E5F2F7)  when active={true}
//
// p-[20px], rounded-[16px]. Icon 48×48 + heading-sm + body-md.
// Use as a controlled tab: pass active + onClick.
// Stack multiple inside a flex-col container (no extra gap needed).

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
        'flex flex-col items-start p-[20px] rounded-lg w-full text-left',
        'bg-transparent border-none cursor-pointer',
        'transition-colors duration-base ease-standard',
        // Hover state
        'hover:bg-blue-pale',
        // Active state overrides hover
        active && 'bg-blue-light hover:bg-blue-light',
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
