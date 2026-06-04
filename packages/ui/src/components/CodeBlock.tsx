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

// ── Inner sandbox card ─────────────────────────────────────────────────────────

interface SandboxProps {
  color: CodeBlockColor;
  tabs?: CodeTab[];
  code?: string;
  contained?: boolean;
}

function Sandbox({ color, tabs, code, contained }: SandboxProps) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const activeCode = tabs ? tabs[activeTab]?.code : code;

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
          'flex items-center justify-between h-[60px] px-[32px]',
          headerBg[color],
          headerBorder[color],
        )}
      >
        {/* Tab strip */}
        {tabs && tabs.length > 0 ? (
          <div className="flex items-center gap-[24px]">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'relative pb-[2px] font-sans font-regular text-body-sm cursor-pointer bg-transparent border-none',
                  'focus-visible:outline-none',
                  i === activeTab
                    ? 'text-text-primary after:absolute after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-action-primary'
                    : 'text-text-muted hover:text-text-secondary',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div /> // spacer so copy button stays right
        )}

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className={cn(
            'inline-flex items-center gap-[6px]',
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

      {/* Code area — all tabs rendered in same grid cell so height = tallest tab */}
      <div className="grid p-[32px]">
        {tabs && tabs.length > 0 ? tabs.map((tab, i) => (
          <pre
            key={i}
            aria-hidden={i !== activeTab}
            className={cn(
              'font-mono text-mono-md text-text-primary',
              'leading-[1.6] overflow-x-auto whitespace-pre m-0',
              '[grid-area:1/1]', // all tabs occupy the same cell
              i !== activeTab && 'invisible pointer-events-none select-none',
            )}
          >
            <code>{tab.code}</code>
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
  ({ className, color = 'sage', contained = false, tabs, code, ...rest }, ref) => {

    if (contained) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative w-full rounded-lg overflow-hidden',
            'flex items-center justify-center',
            'py-[70px] px-[40px]',
            bandBg[color],
            className,
          )}
          {...rest}
        >
          {/* Organic blob pattern — inherits color from parent */}
          <CodePattern />
          {/* Card sits above the pattern */}
          <div className="relative z-10 w-full max-w-[654px] min-w-0">
            <Sandbox color={color} tabs={tabs} code={code} contained />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        <Sandbox color={color} tabs={tabs} code={code} contained={false} />
      </div>
    );
  },
);
CodeBlock.displayName = 'CodeBlock';
