import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '@boltz/ui';
import { ArrowLeft, ArrowRight, Linkedin, Twitter, Link } from 'iconoir-react';

const meta = {
  title: '02-Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A circular, icon-only button — the single home for round icon controls (carousel arrows, share rows, etc.). `outline` is the bordered control that fills on hover; `outline-on-dark` is its dark-surface twin; `ghost` is borderless with a faint hover fill for subtle inline controls. Sizes: xs (32) · sm (36) · md (40) · lg (44).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['outline', 'outline-on-dark', 'ghost'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const arrow = <ArrowRight width={16} height={16} strokeWidth={1.5} />;

export const Outline: Story = {
  args: { 'aria-label': 'Next', variant: 'outline', size: 'sm', children: arrow },
};

export const OutlineOnDark: Story = {
  name: 'Outline — on dark',
  args: { 'aria-label': 'Next', variant: 'outline-on-dark', size: 'sm', children: arrow },
  parameters: { backgrounds: { default: 'surface-card-dark', values: [{ name: 'surface-card-dark', value: '#232323' }] } },
  render: (args) => (
    <div className="bg-surface-card-dark p-xl rounded-lg">
      <IconButton {...args} />
    </div>
  ),
};

export const Ghost: Story = {
  name: 'Ghost — borderless',
  args: { 'aria-label': 'Copy link', variant: 'ghost', size: 'xs', children: <Link width={16} height={16} strokeWidth={1.5} /> },
};

// ── All sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: 'All sizes',
  args: { 'aria-label': 'Next' },
  render: () => (
    <div className="flex items-center gap-md">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <IconButton key={size} aria-label={`Next ${size}`} size={size} variant="outline">
          {arrow}
        </IconButton>
      ))}
    </div>
  ),
};

// ── Carousel arrow group (flush) ──────────────────────────────────────────────
export const ArrowGroup: Story = {
  name: 'Arrow group',
  args: { 'aria-label': 'Previous' },
  render: () => (
    <div className="flex gap-0">
      <IconButton aria-label="Previous"><ArrowLeft width={16} height={16} strokeWidth={1.5} /></IconButton>
      <IconButton aria-label="Next"><ArrowRight width={16} height={16} strokeWidth={1.5} /></IconButton>
    </div>
  ),
};

// ── Social / share row (ghost) ────────────────────────────────────────────────
export const SocialRow: Story = {
  name: 'Social row — ghost',
  args: { 'aria-label': 'Share' },
  render: () => (
    <div className="flex items-center gap-xs">
      <IconButton aria-label="LinkedIn" size="xs" variant="ghost"><Linkedin width={16} height={16} strokeWidth={1.5} /></IconButton>
      <IconButton aria-label="X / Twitter" size="xs" variant="ghost"><Twitter width={16} height={16} strokeWidth={1.5} /></IconButton>
      <IconButton aria-label="Copy link" size="xs" variant="ghost"><Link width={16} height={16} strokeWidth={1.5} /></IconButton>
    </div>
  ),
};
