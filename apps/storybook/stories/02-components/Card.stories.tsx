import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, EyebrowLabel, Button } from '@boltz/ui';

const meta = {
  title: '02-Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { variant: { control: 'select', options: ['light', 'dark', 'blue'] } },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = ({ dark }: { dark?: boolean }) => (
  <div className="flex flex-col gap-md min-w-300">
    <EyebrowLabel variant={dark ? 'dark' : 'light'}>Platform</EyebrowLabel>
    <h3 className="text-heading-sm">A foundation, not a paper.</h3>
    <p className={`text-body-md ${dark ? 'text-white/60' : 'text-text-secondary'}`}>
      High-performance infrastructure built for biomolecular design teams.
    </p>
  </div>
);

export const Light: Story = {
  args: { variant: 'light', children: <SampleContent /> },
};

export const Dark: Story = {
  args: { variant: 'dark', children: <SampleContent dark /> },
  parameters: { backgrounds: { default: 'white' } },
};

export const Blue: Story = {
  args: { variant: 'blue', children: <SampleContent /> },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-md p-xl max-w-container">
      <Card variant="light"><SampleContent /></Card>
      <Card variant="dark"><SampleContent dark /></Card>
      <Card variant="blue"><SampleContent /></Card>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
