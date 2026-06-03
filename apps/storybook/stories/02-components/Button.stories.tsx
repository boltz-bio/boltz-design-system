import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@boltz/ui';

const meta = {
  title: '02-Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    intent: { control: 'select', options: ['primary', 'secondary', 'onDark'] },
    suffix: { control: 'select', options: ['arrow-icon', 'arrow-text', 'none'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Single stories ────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { intent: 'primary', children: 'Try Boltz Lab' },
  parameters: { backgrounds: { default: 'sage-pale' } },
};

export const Secondary: Story = {
  args: { intent: 'secondary', children: 'Read the paper' },
  parameters: { backgrounds: { default: 'white' } },
};

// White — for dark/black backgrounds
export const White: Story = {
  args: { variant: 'White', children: 'Learn more' },
  parameters: { backgrounds: { default: 'surface-card-dark' } },
};

// ── All intents — mirrors the HTML showcase ───────────────────────────────────

export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-md w-[480px]">
      {/* Filled — on sage/coloured bg */}
      <div className="flex gap-md flex-wrap items-center p-md bg-sage-pale rounded-lg">
        <div className="text-body-sm text-text-muted w-full mb-xs">
          Filled — coloured bg: black label + white filled icon
        </div>
        <Button intent="primary">Get early access</Button>
        <Button intent="primary">Try Boltz Lab</Button>
        <Button intent="primary">Learn more</Button>
      </div>

      {/* Outlined — on white/light bg */}
      <div className="flex gap-md flex-wrap items-center p-md bg-white border border-border-light rounded-lg">
        <div className="text-body-sm text-text-muted w-full mb-xs">
          Outlined — light bg: black label + outlined icon
        </div>
        <Button intent="secondary">Learn more</Button>
        <Button intent="secondary">Get in touch</Button>
        <Button intent="secondary" suffix="arrow-text">Text button</Button>
      </div>

      {/* White — on dark bg */}
      <div className="flex gap-md flex-wrap items-center p-md bg-surface-card-dark rounded-lg">
        <div className="text-body-sm text-text-on-dark/50 w-full mb-xs">
          White — dark bg: white label + outlined icon
        </div>
        <Button intent="onDark">Learn more</Button>
        <Button intent="onDark">See more details</Button>
        <Button intent="onDark" suffix="arrow-text">Text button</Button>
      </div>
    </div>
  ),
};

export const SuffixVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-sm p-md bg-sage-pale rounded-lg">
      <div className="text-body-sm text-text-muted mb-xs">suffix variants</div>
      <Button intent="primary" suffix="arrow-icon">Arrow icon (default)</Button>
      <Button intent="primary" suffix="arrow-text">Arrow text</Button>
      <Button intent="primary" suffix="none">No arrow</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};
