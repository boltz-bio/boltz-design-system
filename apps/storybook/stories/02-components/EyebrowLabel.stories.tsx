import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyebrowLabel } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';
import React, { useState, useMemo } from 'react';

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// Icon names only — resolved dynamically at render time so the browser
// bundle doesn't freeze on undefined exports
const ICON_NAMES: string[] = Object.keys(AllIcons)
  .filter((k) => /^[A-Z]/.test(k) && k !== 'IconoirProvider')
  .sort();

// Safe renderer — handles both function components and forwardRef objects
function SafeIcon({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) {
  const Comp = (AllIcons as Record<string, unknown>)[name];
  // forwardRef returns an object, not a function — accept both
  if (!Comp || (typeof Comp !== 'function' && typeof Comp !== 'object')) return null;
  return React.createElement(Comp as React.ComponentType<React.SVGProps<SVGSVGElement>>, props);
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: '02-Components/EyebrowLabel',
  component: EyebrowLabel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['light', 'dark'] },
    icon: { control: false },
  },
} satisfies Meta<typeof EyebrowLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Light: Story = {
  args: { variant: 'light', children: 'Our models' },
  render: (args) => <EyebrowLabel {...args} icon={<AllIcons.Leaf {...sz} />} />,
};

export const Dark: Story = {
  args: { variant: 'dark', children: 'Platform' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
  render: (args) => <EyebrowLabel {...args} icon={<AllIcons.Leaf {...sz} />} />,
};

export const ContextExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-sm">
      <EyebrowLabel icon={<AllIcons.Leaf        {...sz} />}>Our models</EyebrowLabel>
      <EyebrowLabel icon={<AllIcons.Code        {...sz} />}>API</EyebrowLabel>
      <EyebrowLabel icon={<AllIcons.Community   {...sz} />}>Community</EyebrowLabel>
      <EyebrowLabel icon={<AllIcons.ShieldCheck {...sz} />}>Security</EyebrowLabel>
      <EyebrowLabel icon={<AllIcons.Flask       {...sz} />}>Research</EyebrowLabel>
      <EyebrowLabel icon={<AllIcons.BookStack   {...sz} />}>News</EyebrowLabel>
      <EyebrowLabel icon={null}>No icon</EyebrowLabel>
    </div>
  ),
};

// ── Icon browser ──────────────────────────────────────────────────────────────

function IconBrowser() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('Leaf');
  const [label, setLabel] = useState('Our models');
  const [variant, setVariant] = useState<'light' | 'dark'>('light');

  const filtered = useMemo(
    () =>
      query.trim() === ''
        ? ICON_NAMES
        : ICON_NAMES.filter((n) => n.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="flex flex-col gap-lg" style={{ width: 640 }}>

      {/* Preview */}
      <div className={variant === 'dark'
        ? 'flex items-center justify-center p-xl rounded-lg bg-surface-card-dark'
        : 'flex items-center justify-center p-xl rounded-lg bg-surface-primary border border-border-light'
      }>
        <EyebrowLabel variant={variant} icon={<SafeIcon name={selected} {...sz} />}>
          {label}
        </EyebrowLabel>
      </div>

      {/* Controls row */}
      <div className="flex gap-sm flex-wrap">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label text"
          className="h-[36px] px-[12px] rounded-full border border-border-light font-sans text-body-sm text-text-primary bg-white outline-none focus:border-action-primary"
        />
        <button
          onClick={() => setVariant(v => v === 'light' ? 'dark' : 'light')}
          className="h-[36px] px-[16px] rounded-full border border-action-primary font-sans text-body-sm text-text-primary bg-transparent cursor-pointer"
        >
          {variant === 'light' ? 'Switch to dark' : 'Switch to light'}
        </button>
        <span className="h-[36px] px-[16px] inline-flex items-center font-sans text-body-sm text-text-muted">
          Selected: <strong className="ml-1 text-text-primary">{selected}</strong>
        </span>
      </div>

      {/* Search */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${ICON_NAMES.length} icons…`}
        className="h-[36px] px-[16px] rounded-full border border-border-light font-sans text-body-sm text-text-primary bg-white outline-none focus:border-action-primary w-full"
      />

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
        gap: 6,
        maxHeight: 480,
        overflowY: 'auto',
        paddingRight: 4,
      }}>
        {filtered.map((name) => {
          const isActive = name === selected;
          return (
            <button
              key={name}
              onClick={() => setSelected(name)}
              title={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '10px 4px',
                borderRadius: 10,
                border: `1px solid ${isActive ? '#232323' : '#D9D9D9'}`,
                background: isActive ? '#232323' : 'transparent',
                color: isActive ? '#fff' : '#232323',
                cursor: 'pointer',
                fontSize: 10,
                fontFamily: 'Stabil Grotesk, Inter, sans-serif',
                lineHeight: 1.3,
                textAlign: 'center',
                wordBreak: 'break-word',
              }}
            >
              <SafeIcon name={name} width={18} height={18} strokeWidth={1.5}
                style={{ color: isActive ? '#fff' : '#232323' }} />
              {name}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-body-sm text-text-muted col-span-full text-center py-lg">
            No icons match "{query}"
          </p>
        )}
      </div>

      <p className="text-body-sm text-text-muted">
        {filtered.length} of {ICON_NAMES.length} icons shown
      </p>
    </div>
  );
}

export const IconBrowserStory: Story = {
  name: '🔍 Icon browser — all icons',
  parameters: { layout: 'padded' },
  render: () => <IconBrowser />,
};
