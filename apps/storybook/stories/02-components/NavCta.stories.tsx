import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavCta } from '@boltz/ui';

const meta = {
  title: '02-Components/NavCta',
  component: NavCta,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['dark', 'light'] },
  },
} satisfies Meta<typeof NavCta>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default — black pill with white inner circle (Nav button on white surface)
export const Dark: Story = {
  args: { variant: 'dark', children: 'Get early access' },
};

// White pill with black inner circle (Nav button on dark surface)
export const Light: Story = {
  args: { variant: 'light', children: 'Get early access' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};

export const InNavBar: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex items-center justify-between h-60 px-40 bg-white border-b border-border-light w-full">
      <span className="text-text-primary font-regular">Boltz</span>
      <div className="flex items-center gap-4">
        <button className="h-36 px-20 rounded-full border border-black text-body-sm">Platform</button>
        <button className="h-36 px-20 rounded-full border border-black text-body-sm">API</button>
        <button className="h-36 px-20 rounded-full border border-black text-body-sm">News</button>
        <NavCta>Get early access</NavCta>
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
