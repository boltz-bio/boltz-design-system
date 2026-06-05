import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricComparison, type MetricItem } from '@boltz/ui';

// Pricing comparison data from Figma 108:404. Time values are illustrative.
const items: MetricItem[] = [
  { label: 'Boltz API',     cost: { display: '$2,700', value: 2700 }, time: { display: '2 hrs',  value: 2 } },
  { label: 'NVIDIA NIM',    cost: { display: '$3,100', value: 3100 }, time: { display: '5 hrs',  value: 5 } },
  { label: 'Amazon bedrock',cost: { display: '$3,600', value: 3600 }, time: { display: '8 hrs',  value: 8 } },
  { label: 'Local machine', cost: { display: '$4,200', value: 4200 }, time: { display: '24 hrs', value: 24 } },
];

const meta = {
  title: '02-Components/MetricComparison',
  component: MetricComparison,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comparison card: an optional header row, labelled rows with a value and a proportional ProgressBar, and a Cost/Time toggle that swaps the dataset. Bars scale relative to the largest value in the active mode. Use in pricing and benchmark sections.',
      },
    },
  },
  argTypes: {
    background: { control: 'select', options: ['blue', 'sage', 'none'] },
    defaultMode: { control: 'select', options: ['cost', 'time'] },
  },
} satisfies Meta<typeof MetricComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: { label: 'Number of Designs', value: '60,000' },
    items,
  },
  render: (args) => <div className="w-[560px] max-w-full"><MetricComparison {...args} /></div>,
};

export const NoHeader: Story = {
  args: { items },
  render: (args) => <div className="w-[560px] max-w-full"><MetricComparison {...args} /></div>,
};
