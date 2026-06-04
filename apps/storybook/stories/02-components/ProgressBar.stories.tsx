import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from '@boltz/ui';

const meta = {
  title: '02-Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'blue-pale' },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=108-404',
    },
    docs: {
      description: {
        component:
          'A horizontal fill bar — a rounded track with a rounded fill showing how much of a value is reached. Reusable wherever a proportional bar is needed; the comparison/pricing card composes it.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    tone: { control: 'select', options: ['blue', 'sage', 'neutral'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 35, tone: 'blue', size: 'md', label: 'Boltz API cost' },
  render: (args) => <div className="w-[520px] max-w-full"><ProgressBar {...args} /></div>,
};

export const Scale: Story = {
  args: { value: 50, label: 'example' },
  render: () => (
    <div className="w-[520px] max-w-full flex flex-col gap-md">
      {[15, 35, 60, 100].map((v) => <ProgressBar key={v} value={v} label={`${v}%`} />)}
    </div>
  ),
};

export const Tones: Story = {
  args: { value: 60, label: 'example' },
  render: () => (
    <div className="w-[520px] max-w-full flex flex-col gap-md">
      <ProgressBar value={60} tone="blue" label="blue" />
      <ProgressBar value={60} tone="sage" label="sage" />
      <ProgressBar value={60} tone="neutral" label="neutral" />
    </div>
  ),
};
