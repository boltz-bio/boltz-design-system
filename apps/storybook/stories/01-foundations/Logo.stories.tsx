import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo, LogoMark } from '@boltz/ui';

// Foundation — the Boltz logo system (Figma "Guidelines" → Logo, node 57:5438).
// The wordmark and the standalone mark both inherit `currentColor`, so they
// recolour with a `text-*` token. The app icon / favicon is the mark on a
// sage-medium rounded tile (served at /favicon.svg).

const meta = {
  title: '01-Foundations/Logo',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=57-5438',
    },
    docs: {
      description: {
        component:
          'The Boltz logo system: the full wordmark (`<Logo />`), the standalone brand mark (`<LogoMark />`), and the favicon / app icon. Both SVGs inherit `currentColor` — set a `text-*` token to recolour. Keep clear space around the wordmark equal to the height of the mark, and never recolour it outside the brand palette.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-body-sm text-text-muted mb-md font-mono">{children}</p>
);

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-2xl max-w-container">
      {/* Wordmark */}
      <section>
        <Label>Wordmark — primary</Label>
        <div className="flex items-center justify-center bg-surface-secondary rounded-lg py-2xl">
          <Logo title="Boltz" className="h-10 text-text-primary" />
        </div>
      </section>

      {/* Mark */}
      <section className="grid grid-cols-1 gap-xl tablet:grid-cols-3">
        <div>
          <Label>Mark</Label>
          <div className="flex items-center justify-center bg-surface-secondary rounded-lg aspect-square">
            <LogoMark title="Boltz" className="h-16 text-text-primary" />
          </div>
        </div>
        <div>
          <Label>Favicon / app icon</Label>
          <div className="flex items-center justify-center bg-surface-secondary rounded-lg aspect-square">
            <img src="/favicon.svg" alt="Boltz favicon" className="h-20 w-20" />
          </div>
        </div>
        <div>
          <Label>On dark</Label>
          <div className="flex items-center justify-center bg-blue-dark rounded-lg aspect-square">
            <Logo title="Boltz" className="h-8 text-white" />
          </div>
        </div>
      </section>

      {/* Colour ways */}
      <section>
        <Label>Recolouring — inherits currentColor</Label>
        <div className="flex flex-wrap items-center gap-xl bg-surface-secondary rounded-lg p-xl">
          <Logo title="Boltz" className="h-8 text-text-primary" />
          <Logo title="Boltz" className="h-8 text-sage-dark" />
          <Logo title="Boltz" className="h-8 text-blue-deep" />
        </div>
      </section>
    </div>
  ),
};
