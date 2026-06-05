import type { Meta, StoryObj } from '@storybook/react-vite';
import * as AllIcons from 'iconoir-react';
import { Leaf } from 'iconoir-react';
import { Icon } from '@boltz/ui';
import React, { useState, useMemo } from 'react';

// All Iconoir icon names — resolved at render time
const ICON_NAMES: string[] = Object.keys(AllIcons)
  .filter((k) => /^[A-Z]/.test(k) && k !== 'IconoirProvider')
  .sort();

function SafeIcon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const Comp = (AllIcons as Record<string, unknown>)[name];
  if (!Comp || (typeof Comp !== 'function' && typeof Comp !== 'object')) return null;
  return React.createElement(
    Comp as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    { width: size, height: size, strokeWidth, color },
  );
}

// ── Icon browser component ────────────────────────────────────────────────────

function IconFoundation() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [size, setSize] = useState(20);
  const [strokeWidth, setStrokeWidth] = useState(1.5);

  const filtered = useMemo(
    () =>
      query.trim() === ''
        ? ICON_NAMES
        : ICON_NAMES.filter((n) => n.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ fontFamily: 'Stabil Grotesk, Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 15, color: '#505050', marginTop: 6, lineHeight: 1.5 }}>
          Iconoir open-source icon library — {ICON_NAMES.length} icons.
          Click any icon to copy its name for use in code.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${ICON_NAMES.length} icons…`}
          style={{
            flex: 1, minWidth: 200,
            height: 36, padding: '0 16px',
            borderRadius: 9999, border: '1px solid #D9D9D9',
            fontSize: 15, color: '#232323',
            outline: 'none', background: '#fff',
          }}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#505050' }}>
          Size
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{
              height: 32, padding: '0 10px', borderRadius: 9999,
              border: '1px solid #D9D9D9', fontSize: 13, background: '#fff',
            }}
          >
            {[14, 16, 20, 24, 32].map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#505050' }}>
          Stroke
          <select
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            style={{
              height: 32, padding: '0 10px', borderRadius: 9999,
              border: '1px solid #D9D9D9', fontSize: 13, background: '#fff',
            }}
          >
            {[1, 1.5, 2].map((sw) => (
              <option key={sw} value={sw}>{sw}</option>
            ))}
          </select>
        </label>

        <span style={{ fontSize: 13, color: '#7E7E7E' }}>
          {filtered.length} of {ICON_NAMES.length}
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 8,
          maxHeight: 600,
          overflowY: 'auto',
          paddingRight: 4,
        }}
      >
        {filtered.map((name) => {
          const isCopied = copied === name;
          return (
            <button
              key={name}
              onClick={() => copyName(name)}
              title={`Copy "${name}"`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 6px 10px',
                borderRadius: 10,
                border: '1px solid #E8E7E3',
                background: isCopied ? '#232323' : '#fff',
                color: isCopied ? '#fff' : '#232323',
                cursor: 'pointer',
                fontSize: 10,
                lineHeight: 1.4,
                textAlign: 'center',
                wordBreak: 'break-word',
                transition: 'background 150ms, border-color 150ms, color 150ms',
              }}
              onMouseEnter={(e) => {
                if (!isCopied) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#232323';
                  (e.currentTarget as HTMLButtonElement).style.background = '#FBFAF7';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCopied) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8E7E3';
                  (e.currentTarget as HTMLButtonElement).style.background = '#fff';
                }
              }}
            >
              {isCopied ? (
                <span style={{ fontSize: 12 }}>✓</span>
              ) : (
                <SafeIcon name={name} size={size} strokeWidth={strokeWidth} />
              )}
              <span style={{ color: isCopied ? '#fff' : '#505050' }}>
                {isCopied ? 'Copied!' : name}
              </span>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1 / -1', padding: '40px 0',
            textAlign: 'center', color: '#7E7E7E', fontSize: 15,
          }}>
            No icons match "{query}"
          </div>
        )}
      </div>

      {/* Usage hint */}
      <div style={{
        marginTop: 24, padding: '16px 20px',
        background: '#F7F2E9', borderRadius: 10,
        fontSize: 13, color: '#505050', lineHeight: 1.6,
      }}>
        <strong style={{ color: '#232323' }}>Usage in code</strong><br />
        <code style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 }}>
          {`import { Leaf } from 'iconoir-react'`}<br />
          {`<Leaf width={20} height={20} strokeWidth={1.5} />`}
        </code>
      </div>
    </div>
  );
}

// ── Custom icons — wrap any SVG via <Icon> ────────────────────────────────────

// A custom monochrome brand glyph authored with `currentColor`, so it recolours
// with a `text-*` token and scales with the Icon box.
const MOLECULE_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
  '<circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="17.5" r="2.4"/><circle cx="19" cy="17.5" r="2.4"/>' +
  '<path d="M12 7.4v3.6M10.3 12.6 6.7 15.5M13.7 12.6l3.6 2.9"/></svg>';

const SAMPLE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z"/>
  <path d="M9 12h6M12 9v6"/>
</svg>`;

function CustomIconsView() {
  const [markup, setMarkup] = useState(SAMPLE);
  return (
    <div className="flex flex-col gap-2xl max-w-container">
      <p className="text-body-md text-text-secondary max-w-body">
        The <code className="font-mono text-mono-md">{'<Icon>'}</code> wrapper normalises{' '}
        <strong className="text-text-primary">any</strong> icon — an iconoir component, a
        hand-authored <code className="font-mono text-mono-md">{'<svg>'}</code>, or a pasted SVG
        export — into one scalable box. Monochrome glyphs that use{' '}
        <code className="font-mono text-mono-md">currentColor</code> recolour with a{' '}
        <code className="font-mono text-mono-md">text-*</code> token.
      </p>

      {/* Scales with size */}
      <div className="flex flex-col gap-md">
        <p className="text-body-sm text-text-muted font-mono">Scales with `size`</p>
        <div className="flex items-end gap-xl text-text-primary">
          {[16, 24, 32, 48, 64].map((s) => (
            <div key={s} className="flex flex-col items-center gap-sm">
              <Icon svg={MOLECULE_SVG} size={s} label="Molecule" />
              <span className="text-body-sm text-text-muted">{s}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recolours via token */}
      <div className="flex flex-col gap-md">
        <p className="text-body-sm text-text-muted font-mono">Recolours via text-* token</p>
        <div className="flex items-center gap-xl">
          <Icon svg={MOLECULE_SVG} size={40} className="text-text-primary" />
          <Icon svg={MOLECULE_SVG} size={40} className="text-sage-dark" />
          <Icon svg={MOLECULE_SVG} size={40} className="text-blue-deep" />
          <Icon svg={MOLECULE_SVG} size={40} className="text-tierra-500" />
        </div>
      </div>

      {/* Sources */}
      <div className="flex flex-col gap-md">
        <p className="text-body-sm text-text-muted font-mono">Any source — iconoir node or custom SVG node</p>
        <div className="flex items-center gap-xl text-text-primary">
          <Icon size={32}><Leaf width={32} height={32} strokeWidth={1.5} /></Icon>
          <Icon size={32}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" opacity={0.15} />
              <path d="M12 2 4 7l8 5 8-5-8-5Z" />
            </svg>
          </Icon>
          <Icon svg={MOLECULE_SVG} size={32} />
        </div>
      </div>

      {/* Live paste playground */}
      <div className="flex flex-col gap-md">
        <p className="text-body-sm text-text-muted font-mono">Paste your SVG</p>
        <div className="grid grid-cols-1 gap-lg tablet:grid-cols-[1fr_auto] items-start">
          <textarea
            value={markup}
            onChange={(e) => setMarkup(e.target.value)}
            spellCheck={false}
            className="min-h-[160px] w-full rounded-md border border-border-light bg-white p-md font-mono text-mono-md text-text-primary outline-none focus-visible:border-action-primary"
          />
          <div className="flex flex-col items-center gap-sm rounded-lg bg-surface-secondary p-xl">
            <Icon svg={markup} size={64} className="text-text-primary" label="Pasted icon preview" />
            <span className="text-body-sm text-text-muted">preview · 64px</span>
          </div>
        </div>
        <p className="text-body-sm text-text-muted max-w-body">
          Tip: give paths <code className="font-mono text-mono-md">fill=&quot;currentColor&quot;</code> or{' '}
          <code className="font-mono text-mono-md">stroke=&quot;currentColor&quot;</code> so the glyph follows the
          token colour. Only paste SVG you trust.
        </p>
      </div>
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: '01-Foundations/Icons',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const IconLibrary: Story = {
  name: 'Iconoir — full library',
  render: () => <IconFoundation />,
};

export const CustomIcons: Story = {
  name: 'Custom icons',
  render: () => <CustomIconsView />,
};
