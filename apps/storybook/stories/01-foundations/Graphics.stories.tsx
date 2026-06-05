import type { Meta, StoryObj } from '@storybook/react-vite';
import { Blob, BLOB_COUNT } from '@boltz/ui';

// Foundation — the Boltz organic "blob" graphics (Figma 155:363): 25 hand-drawn
// shapes (outline + crosshair anchor marks). Colour follows the parent text colour
// (currentColor), so any `text-*` token tints them. Centralised + imported where
// needed (footer/code-block backdrops, section accents) instead of inlined.

const meta = {
  title: '01-Foundations/Graphics',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const ALL = Array.from({ length: BLOB_COUNT }, (_, i) => i);
const tones = [
  { label: 'border-warm (default)', cls: 'text-border-warm' },
  { label: 'sage-medium', cls: 'text-sage-medium' },
  { label: 'blue-deep', cls: 'text-blue-deep' },
  { label: 'tierra-500', cls: 'text-tierra-500' },
];

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-2xl" style={{ fontFamily: 'Stabil Grotesk, Inter, sans-serif' }}>
      <div>
        <p className="text-body-md text-text-secondary mb-lg max-w-body">
          All {BLOB_COUNT} blob shapes (Figma 155:363) — outline + crosshair anchor marks. Colour follows{' '}
          <code className="font-mono text-mono-md">currentColor</code> — set a{' '}
          <code className="font-mono text-mono-md">text-*</code> token. Size with width/height utilities.
        </p>
        <div className="grid grid-cols-5 gap-lg tablet:grid-cols-8">
          {ALL.map((i) => (
            <div key={i} className="flex flex-col items-center gap-xs">
              <Blob shape={i} className="w-[88px] h-[88px] text-text-primary" />
              <code className="text-body-sm text-text-muted font-mono">{i}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Tones */}
      <div>
        <p className="text-body-sm text-text-muted mb-md">Tinted via text colour</p>
        <div className="flex flex-wrap gap-xl items-center">
          {tones.map((t) => (
            <div key={t.cls} className="flex flex-col items-center gap-sm">
              <Blob shape={0} className={`w-[100px] h-[100px] ${t.cls}`} />
              <code className="text-body-sm text-text-muted font-mono">{t.label}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Usage hint */}
      <div className="p-md bg-tierra-100 rounded-lg max-w-body">
        <p className="text-body-sm text-text-secondary">
          <strong className="text-text-primary">Usage</strong> —{' '}
          <code className="font-mono text-mono-md">{'<Blob shape={3} className="w-[200px] h-[200px] text-border-warm" />'}</code>.
          Decorative only (aria-hidden). Compose several, absolutely positioned, for a backdrop pattern.
        </p>
      </div>
    </div>
  ),
};
