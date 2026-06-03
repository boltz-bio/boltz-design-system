import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: '01-Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Shared types ──────────────────────────────────────────────────────────────

interface TypeRow {
  token: string;
  desktop: { size: string; className: string };
  mobile: { size: string; className: string };
  sample: string;
  note: string;
}

const SCALE: TypeRow[] = [
  {
    token: 'heading-lg',
    desktop: { size: '62px', className: 'text-heading-lg' },
    mobile:  { size: '32px', className: 'text-heading-md' },
    sample: 'Frontier models',
    note: 'Hero headline',
  },
  {
    token: 'heading-md',
    desktop: { size: '32px', className: 'text-heading-md' },
    mobile:  { size: '24px', className: 'text-heading-sm' },
    sample: 'Build with our models',
    note: 'Section heading',
  },
  {
    token: 'heading-sm',
    desktop: { size: '24px', className: 'text-heading-sm' },
    mobile:  { size: '20px', className: 'text-body-lg' },
    sample: 'Card heading',
    note: 'Card & sub-heading',
  },
  {
    token: 'body-lg',
    desktop: { size: '20px', className: 'text-body-lg text-text-secondary' },
    mobile:  { size: '18px', className: 'text-body-md text-text-secondary' },
    sample: 'Hero body and intro copy lives here.',
    note: 'Intro / lead copy',
  },
  {
    token: 'body-md',
    desktop: { size: '18px', className: 'text-body-md' },
    mobile:  { size: '18px', className: 'text-body-md' },
    sample: 'Standard body and button text.',
    note: 'Body — holds all breakpoints',
  },
  {
    token: 'body-sm',
    desktop: { size: '15px', className: 'text-body-sm text-text-muted' },
    mobile:  { size: '15px', className: 'text-body-sm text-text-muted' },
    sample: 'Captions, metadata, eyebrow labels.',
    note: 'Captions — holds all breakpoints',
  },
  {
    token: 'mono-md',
    desktop: { size: '13px', className: 'text-mono-md font-mono' },
    mobile:  { size: '13px', className: 'text-mono-md font-mono' },
    sample: 'predict(seq="MVLS...")',
    note: 'Code — IBM Plex Mono',
  },
];

// ── Scale story ───────────────────────────────────────────────────────────────

export const Scale: Story = {
  render: () => (
    <div className="p-xl max-w-container mx-auto">
      <h1 className="text-heading-lg text-text-primary mb-sm">Type scale</h1>
      <p className="text-body-md text-text-secondary mb-xl">Stabil Grotesk regular</p>

      {/* Column headers */}
      <div className="grid grid-cols-[160px_1fr_1fr] gap-xl pb-sm border-b border-border-light mb-0">
        <span className="text-body-sm text-text-muted">Token</span>
        <span className="text-body-sm text-text-muted">Desktop</span>
        <span className="text-body-sm text-text-muted">Mobile  <span className="text-text-muted opacity-60">(&lt; 768px)</span></span>
      </div>

      {SCALE.map((row) => (
        <div
          key={row.token}
          className="grid grid-cols-[160px_1fr_1fr] gap-xl py-lg border-b border-border-light items-start"
        >
          {/* Token name + note */}
          <div className="flex flex-col gap-xs pt-xs">
            <code className="text-body-sm text-text-primary font-mono">{row.token}</code>
            <span className="text-body-sm text-text-muted">{row.desktop.size} → {row.mobile.size}</span>
            <span className="text-body-sm text-text-muted opacity-60">{row.note}</span>
          </div>

          {/* Desktop sample */}
          <div className={row.desktop.className}>
            {row.sample}
          </div>

          {/* Mobile sample */}
          <div className={row.mobile.className}>
            {row.sample}
          </div>
        </div>
      ))}

      {/* Mobile note */}
      <div className="mt-xl p-md bg-sage-pale rounded-lg">
        <p className="text-body-sm text-text-secondary">
          <strong className="text-text-primary">Live & automatic</strong> — the step-down is now
          implemented via CSS variables in <code className="font-mono text-body-sm">tokens.css</code>.
          Every <code className="font-mono text-body-sm">text-heading-*</code> utility shrinks on its
          own below the <code className="font-mono text-body-sm">mobile</code> breakpoint (768px) — no
          per-component classes needed. Switch the viewport tool to <em>Boltz — Mobile</em> to see the
          headings above resize. <code className="font-mono text-body-sm">body-md</code> (18px) and{' '}
          <code className="font-mono text-body-sm">body-sm</code> (15px) hold across all sizes.
        </p>
      </div>
    </div>
  ),
};
