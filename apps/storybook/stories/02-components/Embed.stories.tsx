import type { Meta, StoryObj } from '@storybook/react-vite';
import { Embed, Hero, Button, TextButton, placeholderImage } from '@boltz/ui';

// A frozen Boltz Studio view (Modal-hosted protein renderer). Replace with your own
// embed URL from Studio → "Generate embed".
const STUDIO_EMBED =
  'https://dylan-6--embed.modal.run?s=03f62994ea1ff55d98c0d9d835b70631&b=B&l=__NONE__';
const STUDIO_FULL = 'https://dylan-6--studio.modal.run/';
// Turntable .mp4 — a full 360° rotation, baked in Studio (Export → "Bake turntable").
// This one is baked on a white background, so pair it with surface="white".
const STUDIO_TURNTABLE = 'https://dylan-6--embed-video.modal.run?k=2cb075d35f668f998cc460ed08dd8f67';

const meta = {
  title: '02-Components/Embed',
  component: Embed,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A responsive, accessible iframe embed — drop a live external view (e.g. the Modal-hosted Boltz Studio protein renderer) into a section’s media slot instead of a static image. Supports a poster image (static fallback / shown while loading) and an optional scroll-reveal animation. Always pass a `title` for screen readers.',
      },
    },
  },
  argTypes: {
    aspect: { control: 'select', options: ['video', 'wide', 'square', 'portrait'] },
    radius: { control: 'select', options: ['md', 'lg', 'xl'] },
    surface: { control: 'select', options: ['none', 'surface', 'white', 'sage', 'blue', 'dark'] },
    kind: { control: 'inline-radio', options: ['iframe', 'video'] },
    reveal: { control: 'boolean' },
    scrub: { control: 'boolean' },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Embed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Studio: Story = {
  args: {
    src: STUDIO_EMBED,
    title: 'Boltz Studio — protein render',
    aspect: 'square',
    radius: 'lg',
  },
  render: (args) => <div className="max-w-[560px]"><Embed {...args} /></div>,
};

export const WithPoster: Story = {
  args: {
    src: STUDIO_EMBED,
    title: 'Boltz Studio — protein render',
    aspect: 'wide',
    poster: placeholderImage('boltz-protein', 800, 500),
  },
  render: (args) => <div className="max-w-[640px]"><Embed {...args} /></div>,
};

// Turntable .mp4 — autoplaying 360° rotation. Lighter than the live iframe and with no
// Modal chrome. The render bakes in its background colour — match the section you place it on.
export const Turntable: Story = {
  args: {
    src: STUDIO_TURNTABLE,
    kind: 'video',
    title: 'Boltz Studio — protein turntable',
    aspect: 'square',
    radius: 'lg',
    surface: 'white',
  },
  render: (args) => <div className="max-w-[560px]"><Embed {...args} /></div>,
};

// Click the turntable to swap in the live, drag-to-rotate iframe.
export const Interactive: Story = {
  args: {
    src: STUDIO_TURNTABLE,
    kind: 'video',
    title: 'Boltz Studio — protein',
    aspect: 'square',
    radius: 'lg',
    surface: 'white',
    interactive: true,
    interactiveSrc: STUDIO_EMBED,
  },
  render: (args) => <div className="max-w-[560px]"><Embed {...args} /></div>,
};

// Scroll-scrubbed turntable — the protein rotates with scroll position instead of
// autoplaying. Scroll the docs frame to drive the rotation. Honours reduced-motion.
export const TurntableOnScroll: Story = {
  args: {
    src: STUDIO_TURNTABLE,
    kind: 'video',
    title: 'Boltz Studio — protein turntable (scroll)',
    aspect: 'square',
    radius: 'lg',
    surface: 'white',
    scrub: true,
  },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="max-w-container mx-auto px-xl">
      <div className="h-[40vh]" />
      <div className="max-w-[460px] mx-auto"><Embed {...args} /></div>
      <p className="text-body-sm text-text-muted text-center mt-lg">Scroll to rotate ↑↓</p>
      <div className="h-[80vh]" />
    </div>
  ),
};

// Full interactive studio (heavier) — for a dedicated "Lab" page.
export const FullStudio: Story = {
  args: { src: STUDIO_FULL, title: 'Boltz Studio', aspect: 'video', reveal: true },
  parameters: { layout: 'fullscreen' },
  render: (args) => <div className="max-w-container mx-auto p-xl"><Embed {...args} /></div>,
};

// The real use case: a live render in the hero media slot instead of a placeholder.
export const InHero: Story = {
  args: { src: STUDIO_EMBED, title: 'Boltz Studio — protein render' },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Hero
      heading="Frontier models for biomolecular design."
      body="State-of-the-art structure prediction, served as production-ready infrastructure."
      actions={<>
        <Button variant="black">Try Boltz Lab</Button>
        <TextButton arrow>Read the paper</TextButton>
      </>}
      media={<div className="w-full max-w-[460px]"><Embed {...args} aspect="square" /></div>}
    />
  ),
};
