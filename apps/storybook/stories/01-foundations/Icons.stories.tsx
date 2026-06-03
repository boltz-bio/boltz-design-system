import type { Meta, StoryObj } from '@storybook/react-vite';
import * as AllIcons from 'iconoir-react';
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
