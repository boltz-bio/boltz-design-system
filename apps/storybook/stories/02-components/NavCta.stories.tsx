import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavCta } from '@boltz/ui';

const meta = {
  title: '02-Components/Button/NavCta',
  component: NavCta,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['dark', 'light'] },
  },
} satisfies Meta<typeof NavCta>;

export default meta;
type Story = StoryObj<typeof meta>;

// dark variant — black pill, white circle — on white/light bg
export const OnWhite: Story = {
  args: { variant: 'dark', children: 'Get early access' },
  parameters: { backgrounds: { default: 'white' } },
};

// light variant — white pill, black circle — on coloured/sage bg
export const OnLight: Story = {
  args: { variant: 'light', children: 'Get early access' },
  parameters: { backgrounds: { default: 'sage-pale' } },
};

export const BothVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col gap-sm items-start p-xl bg-white rounded-lg border border-border-light">
        <span className="text-body-sm text-text-muted">Nav button on white</span>
        <NavCta variant="dark">Get early access</NavCta>
      </div>
      <div className="flex flex-col gap-sm items-start p-xl bg-sage-pale rounded-lg">
        <span className="text-body-sm text-text-muted">Nav button on light</span>
        <NavCta variant="light">Get early access</NavCta>
      </div>
    </div>
  ),
};

export const InNavBar: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex items-center justify-between h-[60px] px-[40px] bg-white border-b border-border-light w-full">
      <span className="font-sans font-regular text-body-sm text-text-primary">Boltz</span>
      <NavCta variant="dark">Get early access</NavCta>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
