import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@boltz/ui';

const meta = {
  title: '02-Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'white' } },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Single variants ─────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', children: 'Beta' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'New' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', children: 'MIT' },
};

// ── All variants — mirrors the Figma "Badge" component set ────────────────────

export const AllVariants: Story = {
  args: { children: 'Badge' },
  render: () => (
    <div className="flex gap-md items-center">
      <Badge variant="primary">Beta</Badge>
      <Badge variant="secondary">New</Badge>
      <Badge variant="tertiary">MIT</Badge>
    </div>
  ),
};
