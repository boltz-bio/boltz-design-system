import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@boltz/ui';

const meta = {
  title: '02-Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    intent: { control: 'select', options: ['primary', 'secondary', 'onDark'] },
    size: { control: 'select', options: ['md', 'sm'] },
    suffix: { control: 'select', options: ['arrow-text', 'arrow-icon', 'none'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { intent: 'primary', children: 'Try Boltz Lab' },
};

export const Secondary: Story = {
  args: { intent: 'secondary', children: 'Read the paper' },
};

export const OnDark: Story = {
  args: { intent: 'onDark', children: 'Get early access' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};

export const SuffixVariants: Story = {
  args: { children: 'Build with the API' },
  render: (args) => (
    <div className="flex flex-col gap-md">
      <Button {...args} suffix="arrow-text" />
      <Button {...args} suffix="arrow-icon" />
      <Button {...args} suffix="none" />
    </div>
  ),
};

export const Sizes: Story = {
  args: { children: 'Action' },
  render: (args) => (
    <div className="flex items-center gap-md">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-lg p-xl bg-surface-primary rounded-lg">
      <div className="flex gap-md">
        <Button intent="primary">Try Boltz Lab</Button>
        <Button intent="secondary">Read the paper</Button>
      </div>
      <div className="flex gap-md p-md bg-surface-card-dark rounded-lg">
        <Button intent="onDark">Get early access</Button>
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};
