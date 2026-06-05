import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatMetric, StatMetricRow } from '@boltz/ui';
import { stats } from '../_data/boltz';

const meta = {
  title: '02-Components/StatMetric',
  component: StatMetric,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A single statistic pairing a large value with a descriptive label, used to highlight adoption or reach figures. Group several with StatMetricRow, and use the dark variant on dark surfaces.',
      },
    },
  },
} satisfies Meta<typeof StatMetric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { value: '1M+', label: 'scientists worldwide' },
};

export const OnLight: Story = {
  name: 'Row — on light background',
  args: { value: '1M+', label: 'scientists worldwide' },
  render: () => (
    <StatMetricRow>
      {stats.map((s) => <StatMetric key={s.label} value={s.value} label={s.label} />)}
    </StatMetricRow>
  ),
};

export const OnDark: Story = {
  name: 'Row — on dark background',
  args: { value: '1M+', label: 'scientists worldwide' },
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <StatMetricRow>
      {stats.map((s) => <StatMetric key={s.label} variant="dark" value={s.value} label={s.label} />)}
    </StatMetricRow>
  ),
};

export const BothVariants: Story = {
  args: { value: '1M+', label: 'scientists worldwide' },
  render: () => (
    <div className="flex flex-col gap-md">
      <StatMetricRow>
        <StatMetric value="1M+"     label="scientists worldwide" />
        <StatMetric value="10,000+" label="total learners" />
        <StatMetric value="Top 20"  label="pharma companies" />
        <StatMetric value="200+"    label="active integrations" />
      </StatMetricRow>
      <StatMetricRow>
        <StatMetric variant="dark" value="1M+"     label="scientists worldwide" />
        <StatMetric variant="dark" value="10,000+" label="total learners" />
        <StatMetric variant="dark" value="Top 20"  label="pharma companies" />
        <StatMetric variant="dark" value="200+"    label="active integrations" />
      </StatMetricRow>
    </div>
  ),
};
