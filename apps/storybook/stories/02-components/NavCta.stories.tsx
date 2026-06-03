import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavCta } from '@boltz/ui';

const meta = {
  title: '02-Components/NavCta',
  component: NavCta,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NavCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Get early access' },
};

export const InNavBar: Story = {
  render: () => (
    <div className="flex items-center justify-between h-60 px-40 bg-white border-b border-border-light w-full">
      <span className="text-text-primary font-regular">Boltz</span>
      <NavCta>Get early access</NavCta>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
