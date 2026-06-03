import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyebrowLabel } from '@boltz/ui';

const meta = {
  title: '02-Components/EyebrowLabel',
  component: EyebrowLabel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['light', 'dark'] },
    icon: { control: 'select', options: ['leaf', 'bullet', 'none'] },
  },
} satisfies Meta<typeof EyebrowLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { variant: 'light', children: 'Our models' },
};

export const Dark: Story = {
  args: { variant: 'dark', children: 'Platform' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};

export const IconVariants: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-md">
      <EyebrowLabel icon="leaf">Leaf (Figma default)</EyebrowLabel>
      <EyebrowLabel icon="bullet">Bullet (DESIGN.md original)</EyebrowLabel>
      <EyebrowLabel icon="none">No icon</EyebrowLabel>
    </div>
  ),
};

export const ContextExamples: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-md">
      <EyebrowLabel>Our models</EyebrowLabel>
      <EyebrowLabel>Platform</EyebrowLabel>
      <EyebrowLabel>Community</EyebrowLabel>
      <EyebrowLabel>Build on Boltz</EyebrowLabel>
      <EyebrowLabel>News</EyebrowLabel>
    </div>
  ),
};
