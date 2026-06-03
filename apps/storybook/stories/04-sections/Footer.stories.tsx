import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer, NavCta } from '@boltz/ui';

// Per Figma 58:379 — plain link columns, no titles.
const columns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

const meta = {
  title: '04-Sections/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The page footer band (per Figma 58:379): logo on the left, plain link columns to the right, and a copyright note. Columns are titleless link lists by default; pass a title to add a heading. Light surface is the default; the dark variant paints action-primary with white text. Use once per page.',
      },
    },
  },
  argTypes: {
    background: { control: 'inline-radio', options: ['light', 'dark'] },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    background: 'light',
    columns,
    cta: <NavCta variant="dark">Get early access</NavCta>,
    note: '© 2026 Boltz',
  },
};

export const Dark: Story = {
  args: {
    background: 'dark',
    columns,
    cta: <NavCta variant="light">Get early access</NavCta>,
    note: '© 2026 Boltz',
  },
};
