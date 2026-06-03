import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextButton } from '@boltz/ui';

const meta = {
  title: '02-Components/Button/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['light', 'dark'] },
    arrow: { control: 'boolean' },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnLight: Story = {
  args: { variant: 'light', children: 'Text button' },
};

export const OnDark: Story = {
  args: { variant: 'dark', children: 'Text button' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};

export const BothVariants: Story = {
  render: () => (
    <div className="flex gap-xl items-center">
      <div className="flex flex-col gap-xs items-start p-lg bg-white border border-border-light rounded-lg">
        <span className="text-body-sm text-text-muted">Text button on light</span>
        <TextButton variant="light">Text button</TextButton>
      </div>
      <div className="flex flex-col gap-xs items-start p-lg bg-surface-card-dark rounded-lg">
        <span className="text-body-sm text-white/40">Text button on dark</span>
        <TextButton variant="dark">Text button</TextButton>
      </div>
    </div>
  ),
};

export const WithArrow: Story = {
  args: { variant: 'light', arrow: true, children: 'Read the paper' },
};
