import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from '@boltz/ui';
import React from 'react';

const meta = {
  title: '02-Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A horizontal scroll-snap carousel. Wide slides let the next slide peek so the row reads as scrollable. The track scrolls one page at a time via the circular prev/next arrow group, which disables at the start/end. Built with CSS scroll-snap (no JS animation), keyboard-operable, and honours prefers-reduced-motion.',
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Tinted demo blocks (token backgrounds only — no images).
const TONES = [
  'bg-sage-light',
  'bg-blue-light',
  'bg-tierra-100',
  'bg-sage-medium',
  'bg-blue-medium',
];

const slides = TONES.map((tone, i) => (
  <div
    key={i}
    className={`${tone} rounded-lg aspect-[16/10] flex items-end p-lg`}
  >
    <span className="text-heading-sm text-text-primary">Slide {i + 1}</span>
  </div>
));

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Carousel',
  args: { ariaLabel: 'Featured items', children: slides },
};

// ── With caption ──────────────────────────────────────────────────────────────

export const WithCaption: Story = {
  name: 'With caption',
  args: {
    ariaLabel: 'Featured stories',
    children: slides,
    caption: (
      <>
        <h2 className="text-heading-sm text-text-primary">Featured stories</h2>
        <p className="text-body-md text-text-secondary">
          Scroll through the latest highlights from across the platform.
        </p>
      </>
    ),
  },
};
