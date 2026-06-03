import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@boltz/ui';

const meta = {
  title: '02-Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['Filled', 'Outlined', 'White', 'Text'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Filled — for coloured/sage/tierra backgrounds
export const Filled: Story = {
  args: { variant: 'Filled', children: 'Get early access' },
  parameters: { backgrounds: { default: 'sage-pale' } },
};

// Outlined — for white/light backgrounds
export const Outlined: Story = {
  args: { variant: 'Outlined', children: 'Learn more' },
  parameters: { backgrounds: { default: 'white' } },
};

// White — for dark/black backgrounds
export const White: Story = {
  args: { variant: 'White', children: 'Learn more' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};

export const Text: Story = {
  args: { variant: 'Text', children: 'Text button' },
};

export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-md p-xl max-w-container w-full">
      <div className="rounded-lg p-lg bg-sage-pale">
        <div className="text-body-sm text-text-secondary mb-md">Filled — coloured/sage bg: black label + white filled icon</div>
        <div className="flex gap-md flex-wrap items-center">
          <Button variant="Filled">Get early access</Button>
          <Button variant="Filled">Try Boltz Lab</Button>
          <Button variant="Filled">Learn more</Button>
        </div>
      </div>

      <div className="rounded-lg p-lg bg-white border border-border-light">
        <div className="text-body-sm text-text-secondary mb-md">Outlined — white/light bg: black label + outlined icon</div>
        <div className="flex gap-md flex-wrap items-center">
          <Button variant="Outlined">Learn more</Button>
          <Button variant="Outlined">Get in touch</Button>
          <Button variant="Outlined">View open roles</Button>
          <Button variant="Text">Text button</Button>
        </div>
      </div>

      <div className="rounded-lg p-lg bg-surface-card-dark">
        <div className="text-body-sm text-white/50 mb-md">White — dark bg: white label + outlined icon</div>
        <div className="flex gap-md flex-wrap items-center">
          <Button variant="White">Learn more</Button>
          <Button variant="White">See more details</Button>
          <Button variant="Text" className="text-white">Text button</Button>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
