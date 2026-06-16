import * as React from 'react';
import { Copy, Check } from 'iconoir-react';
import { cn } from '../utils';
import { CodePattern } from './Patterns';

// Spec: Figma nodes 115:594 (contained) / 76:2531 (standalone)
//
// Two display modes:
//   contained  — centred white card inside a full-width coloured section band
//   standalone — white card with coloured border, no outer band
//
// Three colour variants: sage | blue | tierra
//
// Optional tabs: each tab has a label + code string.
//   Active tab: text-primary + 2px black underline.
//   Inactive:   text-muted.
//   No tabs:    code renders directly without a header bar.
//
// Copy button: top-right corner, copies active code to clipboard.

export type CodeBlockColor = 'sage' | 'blue' | 'tierra';

export interface CodeTab {
  label: string;
  code: string;
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: CodeBlockColor;
  /** Wrap in a full-width coloured section band (default: false = standalone) */
  contained?: boolean;
  /** Tab items. If omitted, renders `code` directly. */
  tabs?: CodeTab[];
  /** Code to show when no tabs provided */
  code?: string;
  /** Controlled active tab index. Omit for uncontrolled (internal state). */
  activeTab?: number;
  /** Called with the new index when a tab is selected. */
  onTabChange?: (index: number) => void;
}

// ── Color maps ────────────────────────────────────────────────────────────────

// Outer container band bg (contained mode)
const bandBg: Record<CodeBlockColor, string> = {
  sage:   'bg-sage-medium',
  blue:   'bg-blue-medium',
  tierra: 'bg-tierra-200',
};

// Card header bg + border
const headerBg: Record<CodeBlockColor, string> = {
  sage:   'bg-sage-pale',
  blue:   'bg-blue-pale',
  tierra: 'bg-tierra-100',
};

// Standalone card outer border
const cardBorder: Record<CodeBlockColor, string> = {
  sage:   'border border-sage-light',
  blue:   'border border-blue-light',
  tierra: 'border border-tierra-100',
};

// Header bottom border
const headerBorder: Record<CodeBlockColor, string> = {
  sage:   'border-b border-sage-light',
  blue:   'border-b border-blue-light',
  tierra: 'border-b border-tierra-100',
};

// Scroll-edge fade — gradient `from-<headerBg>` so the tab strip fades into the
// header colour when there are more tabs to scroll to. Not a drop shadow (the DS
// forbids those) — a colour fade affordance.
const headerFade: Record<CodeBlockColor, string> = {
  sage:   'from-sage-pale',
  blue:   'from-blue-pale',
  tierra: 'from-tierra-100',
};

// ── Per-line animated code ────────────────────────────────────────────────────
// Fades each line in with a staggered delay whenever `active` flips true.
// Two nested rAFs ensure the opacity-0 initial state is painted before
// the transition starts, so every tab-switch re-triggers the animation.

function CodeLines({ code, active }: { code: string; active: boolean }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!active) { setVisible(false); return; }
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setVisible(true));
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [active]);

  return (
    <>
      {code.split('\n').map((line, i) => (
        <span
          key={i}
          className="block transition-opacity"
          style={{
            opacity: visible ? 1 : 0,
            transitionDuration: '280ms',
            transitionTimingFunction: 'ease',
            transitionDelay: visible ? `${i * 35}ms` : '0ms',
          }}
        >
          {/* Preserve empty lines */}
          {line || ' '}
        </span>
      ))}
    </>
  );
}

// ── Inner sandbox card ─────────────────────────────────────────────────────────

interface SandboxProps {
  color: CodeBlockColor;
  tabs?: CodeTab[];
  code?: string;
  contained?: boolean;
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

function Sandbox({ color, tabs, code, contained, activeTab: controlledTab, onTabChange }: SandboxProps) {
  const [internalTab, setInternalTab] = React.useState(0);
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (i: number) => {
    onTabChange?.(i);
    if (controlledTab == null) setInternalTab(i);
  };
  const [copied, setCopied] = React.useState(false);

  // Sliding indicator — measure active tab's offsetLeft + offsetWidth.
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });
  React.useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeTab]);

  // Scroll affordance — show an edge fade when the tab strip can scroll further
  // in that direction (recomputed on scroll, on resize, and when tabs change).
  const stripRef = React.useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = React.useState({ start: false, end: false });
  const updateScroll = React.useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setScroll({ start: scrollLeft > 1, end: scrollLeft + clientWidth < scrollWidth - 1 });
  }, []);
  React.useEffect(() => {
    updateScroll();
    window.addEventListener('resize', updateScroll);
    return () => window.removeEventListener('resize', updateScroll);
  }, [updateScroll, tabs]);

  const handleCopy = async () => {
    const textToCopy = tabs ? tabs[activeTab]?.code : code;
    if (!textToCopy) return;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden',
        contained ? 'w-full max-w-[654px] shadow-none' : cn('w-full', cardBorder[color]),
      )}
    >
      {/* Header — tabs + copy button */}
      <div
        className={cn(
          'flex items-center justify-between gap-md h-[60px] px-md mobile:px-[32px]',
          headerBg[color],
          headerBorder[color],
        )}
      >
        {/* Tab strip — scrolls horizontally when there are too many tabs to fit
            (esp. on mobile) instead of overflowing or breaking the header. The
            inner row is full-height so the sliding underline sits at the bottom
            edge without being clipped by the scroll container. */}
        {tabs && tabs.length > 0 ? (
          <div className="relative h-full min-w-0">
            <div
              ref={stripRef}
              onScroll={updateScroll}
              className="h-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="relative flex items-center gap-[24px] h-full w-max">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    ref={el => { tabRefs.current[i] = el; }}
                    onClick={() => setActiveTab(i)}
                    className={cn(
                      'relative shrink-0 font-sans font-regular text-body-sm cursor-pointer bg-transparent border-none',
                      'focus-visible:outline-none transition-colors duration-base ease-standard',
                      i === activeTab ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary',
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
                {/* Sliding underline indicator — pinned to the header's bottom edge */}
                <div
                  className="absolute bottom-0 h-[2px] bg-action-primary transition-[left,width] duration-[200ms] ease-standard"
                  style={{ left: indicator.left, width: indicator.width }}
                />
              </div>
            </div>
            {/* Edge fades — hint that there are more tabs to scroll to */}
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r',
                'transition-opacity duration-base ease-standard',
                headerFade[color],
                scroll.start ? 'opacity-100' : 'opacity-0',
              )}
            />
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l',
                'transition-opacity duration-base ease-standard',
                headerFade[color],
                scroll.end ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
        ) : (
          <div /> // spacer so copy button stays right
        )}

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className={cn(
            'inline-flex items-center gap-[6px] shrink-0 whitespace-nowrap',
            'font-sans font-regular text-body-sm',
            'text-text-muted hover:text-text-primary',
            'bg-transparent border-none cursor-pointer',
            'transition-colors duration-base ease-standard',
          )}
        >
          {copied
            ? <Check width={14} height={14} strokeWidth={1.5} />
            : <Copy width={14} height={14} strokeWidth={1.5} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code area — all tabs in same grid cell; lines animate in on tab-switch */}
      <div className="grid p-md mobile:p-[32px]">
        {tabs && tabs.length > 0 ? tabs.map((tab, i) => (
          <pre
            key={i}
            aria-hidden={i !== activeTab}
            className={cn(
              'font-mono text-mono-md text-text-primary',
              'leading-[1.6] overflow-x-auto whitespace-pre m-0',
              '[grid-area:1/1]',
              i !== activeTab && 'pointer-events-none select-none',
            )}
          >
            <code>
              <CodeLines code={tab.code} active={i === activeTab} />
            </code>
          </pre>
        )) : (
          <pre className="font-mono text-mono-md text-text-primary leading-[1.6] overflow-x-auto whitespace-pre m-0 [grid-area:1/1]">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

// ── CodeBlock ─────────────────────────────────────────────────────────────────

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, color = 'sage', contained = false, tabs, code, activeTab, onTabChange, ...rest }, ref) => {

    if (contained) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative w-full rounded-lg overflow-hidden',
            'flex items-center justify-center',
            'py-xl px-md mobile:py-[70px] mobile:px-[40px]',
            bandBg[color],
            className,
          )}
          {...rest}
        >
          {/* Organic blob pattern — inherits color from parent */}
          <CodePattern />
          {/* Card sits above the pattern */}
          <div className="relative z-10 w-full max-w-[654px] min-w-0">
            <Sandbox color={color} tabs={tabs} code={code} activeTab={activeTab} onTabChange={onTabChange} contained />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        <Sandbox color={color} tabs={tabs} code={code} activeTab={activeTab} onTabChange={onTabChange} contained={false} />
      </div>
    );
  },
);
CodeBlock.displayName = 'CodeBlock';
