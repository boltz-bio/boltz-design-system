import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyebrowLabel } from '@boltz/ui';
import { Leaf, Search, Code, Cpu, ChatBubble } from 'iconoir-react';

const meta = {
  title: '02-Components/EyebrowLabel',
  component: EyebrowLabel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['light', 'dark'] },
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

export const IconOptions: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-md p-lg">
      <EyebrowLabel icon={<Leaf width={14} height={14} strokeWidth={1.5} />}>Discover</EyebrowLabel>
      <EyebrowLabel icon={<Search width={14} height={14} strokeWidth={1.5} />}>Search</EyebrowLabel>
      <EyebrowLabel icon={<Code width={14} height={14} strokeWidth={1.5} />}>API</EyebrowLabel>
      <EyebrowLabel icon={<Cpu width={14} height={14} strokeWidth={1.5} />}>Platform</EyebrowLabel>
      <EyebrowLabel icon={<ChatBubble width={14} height={14} strokeWidth={1.5} />}>Community</EyebrowLabel>
    </div>
  ),
};

export const ContextExamples: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-lg p-xl max-w-container w-full">
      <div className="rounded-lg p-lg bg-white border border-border-light flex flex-wrap gap-md">
        <EyebrowLabel>Our models</EyebrowLabel>
        <EyebrowLabel>Platform</EyebrowLabel>
        <EyebrowLabel>Community</EyebrowLabel>
      </div>
      <div className="rounded-lg p-lg bg-surface-card-dark flex flex-wrap gap-md">
        <EyebrowLabel variant="dark">News</EyebrowLabel>
        <EyebrowLabel variant="dark">Build on Boltz</EyebrowLabel>
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
