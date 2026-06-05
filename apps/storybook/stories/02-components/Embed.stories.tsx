import type { Meta, StoryObj } from '@storybook/react-vite';
import { Embed, Hero, Button, TextButton, placeholderImage } from '@boltz/ui';
import { Leaf } from 'iconoir-react';

// A frozen Boltz Studio view (Modal-hosted protein renderer). Replace with your own
// embed URL from Studio → "Generate embed".
const STUDIO_EMBED =
  'https://dylan-6--embed.modal.run?s=03f62994ea1ff55d98c0d9d835b70631&b=B&l=__NONE__';
const STUDIO_FULL = 'https://dylan-6--studio.modal.run/';

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
    reveal: { control: 'boolean' },
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
      eyebrow="Build on Boltz"
      eyebrowIcon={<Leaf width={14} height={14} strokeWidth={1.5} />}
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
