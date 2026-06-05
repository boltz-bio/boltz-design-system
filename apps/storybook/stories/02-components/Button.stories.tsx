import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@boltz/ui';

const meta = {
  title: '02-Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The primary action control, available as a black variant for light surfaces and a white variant for dark surfaces. Supports an optional trailing arrow suffix for navigational actions.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['black', 'white'] },
    suffix: { control: 'select', options: ['arrow-icon', 'arrow-text', 'none'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Black: Story = {
  args: { variant: 'black', children: 'Try Boltz Lab' },
};

export const White: Story = {
  args: { variant: 'white', children: 'Get early access' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};

export const BothVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex gap-md items-center p-lg bg-surface-primary rounded-lg border border-border-light">
        <span className="text-body-sm text-text-muted w-[120px]">On light</span>
        <Button variant="black">Get early access</Button>
        <Button variant="black">Read the paper</Button>
      </div>
      <div className="flex gap-md items-center p-lg bg-surface-card-dark rounded-lg">
        <span className="text-body-sm text-white/40 w-[120px]">On dark</span>
        <Button variant="white">Get early access</Button>
        <Button variant="white">Read the paper</Button>
      </div>
    </div>
  ),
};

export const SuffixVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-sm p-lg bg-surface-primary rounded-lg border border-border-light">
      <Button variant="black" suffix="arrow-icon">Arrow icon (hover to animate)</Button>
      <Button variant="black" suffix="arrow-text">Arrow text</Button>
      <Button variant="black" suffix="none">No arrow</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: 'black', children: 'Disabled', disabled: true },
};
