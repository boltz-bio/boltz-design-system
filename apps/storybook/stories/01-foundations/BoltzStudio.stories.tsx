import type { Meta, StoryObj } from '@storybook/react-vite';
import { Embed, placeholderImage } from '@boltz/ui';

// Foundation — Boltz Studio integration. Studio is a Modal-hosted (serverless
// Python/ML) 3D protein renderer: input a PDB code or sequence, render the complex,
// then export a PNG, an interactive 3D view, a baked turntable, or an embeddable
// iframe. Drop a live render into any section's media slot via the <Embed> component
// (02-Components/Embed) instead of a static image.
//
// Studio:  https://dylan-6--studio.modal.run
// Embeds:  https://dylan-6--embed.modal.run?s=…   (Studio → "Generate embed")

const STUDIO_EMBED =
  'https://dylan-6--embed.modal.run?s=03f62994ea1ff55d98c0d9d835b70631&b=B&l=__NONE__';
const STUDIO_TURNTABLE = 'https://dylan-6--embed-video.modal.run?k=2cb075d35f668f998cc460ed08dd8f67';

const meta = {
  title: '01-Foundations/Boltz Studio',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-body-sm text-text-muted mb-sm font-mono">{children}</p>
);

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-2xl max-w-container">
      <p className="text-body-md text-text-secondary max-w-body">
        <strong className="text-text-primary">Boltz Studio</strong> renders protein complexes on
        Modal and exports a live <em>iframe</em>, a static <em>PNG</em>, an interactive 3D view, or a
        baked turntable. Use the <code className="font-mono text-mono-md">{'<Embed>'}</code> component
        to place a live render where you would otherwise put an image.
      </p>

      <div className="grid grid-cols-1 gap-xl tablet:grid-cols-3">
        {/* Live iframe */}
        <div>
          <Label>iframe — interactive, live WebGL</Label>
          <Embed src={STUDIO_EMBED} title="Boltz Studio — live render" aspect="square" radius="lg" />
        </div>

        {/* Turntable video */}
        <div>
          <Label>video — baked 360° turntable (.mp4)</Label>
          <Embed src={STUDIO_TURNTABLE} kind="video" title="Boltz Studio — turntable" aspect="square" radius="lg" surface="white" />
        </div>

        {/* Static PNG fallback */}
        <div>
          <Label>poster — static PNG fallback</Label>
          <Embed
            src="about:blank"
            title="Boltz Studio — static poster"
            aspect="square"
            radius="lg"
            poster={placeholderImage('boltz-protein', 600, 600)}
          />
        </div>
      </div>

      <div className="p-md bg-tierra-100 rounded-lg max-w-body flex flex-col gap-sm">
        <p className="text-body-sm text-text-secondary">
          <strong className="text-text-primary">Use in a section</strong> — pass{' '}
          <code className="font-mono text-mono-md">{'<Embed … />'}</code> as the{' '}
          <code className="font-mono text-mono-md">media</code> slot of{' '}
          <code className="font-mono text-mono-md">Hero</code> /{' '}
          <code className="font-mono text-mono-md">SplitSection</code> instead of an image (see
          05-Screens/Landing → the hero uses a live render). Add{' '}
          <code className="font-mono text-mono-md">reveal</code> for a scroll-in fade,{' '}
          <code className="font-mono text-mono-md">scrub</code> (video only) to rotate the turntable
          on scroll, <code className="font-mono text-mono-md">poster</code> for a static fallback.
        </p>
        <p className="text-body-sm text-text-secondary">
          <strong className="text-text-primary">Background</strong> — the render bakes in its
          background colour. <em>transparent</em> won’t float on a coloured section (Modal’s embed
          page paints a dark chrome behind the canvas), so set the Studio background to the section’s
          colour (e.g. <code className="font-mono text-mono-md">#FBFAF7</code> on surface-primary,{' '}
          <code className="font-mono text-mono-md">#fff</code> on a white band) before exporting.
        </p>
      </div>
    </div>
  ),
};
