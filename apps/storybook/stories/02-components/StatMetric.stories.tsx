import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatMetric, StatMetricRow } from '@boltz/ui';

const meta = {
  title: '02-Components/StatMetric',
  component: StatMetric,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StatMetric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { value: '1M+', label: 'scientists worldwide' },
};

export const OnLight: Story = {
  name: 'Row — on light background',
  render: () => (
    <div className="bg-surface-secondary rounded-lg p-xl">
      <StatMetricRow>
        <StatMetric value="1M+"    label="scientists worldwide" />
        <StatMetric value="10,000+" label="total learners" />
        <StatMetric value="Top 20" label="pharma companies" />
        <StatMetric value="200+"   label="active integrations" />
      </StatMetricRow>
    </div>
  ),
};

export const OnDark: Story = {
  name: 'Row — on dark background',
  render: () => (
    <div className="bg-action-primary rounded-lg p-xl">
      <StatMetricRow>
        <StatMetric variant="dark" value="1M+"    label="scientists worldwide" />
        <StatMetric variant="dark" value="10,000+" label="total learners" />
        <StatMetric variant="dark" value="Top 20" label="pharma companies" />
        <StatMetric variant="dark" value="200+"   label="active integrations" />
      </StatMetricRow>
    </div>
  ),
};

export const BothVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="bg-surface-secondary rounded-lg p-xl">
        <StatMetricRow>
          <StatMetric value="1M+"     label="scientists worldwide" />
          <StatMetric value="10,000+" label="total learners" />
          <StatMetric value="Top 20"  label="pharma companies" />
          <StatMetric value="200+"    label="active integrations" />
        </StatMetricRow>
      </div>
      <div className="bg-action-primary rounded-lg p-xl">
        <StatMetricRow>
          <StatMetric variant="dark" value="1M+"     label="scientists worldwide" />
          <StatMetric variant="dark" value="10,000+" label="total learners" />
          <StatMetric variant="dark" value="Top 20"  label="pharma companies" />
          <StatMetric variant="dark" value="200+"    label="active integrations" />
        </StatMetricRow>
      </div>
    </div>
  ),
};
