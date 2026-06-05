import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatBand } from '@boltz/ui';

const meta = {
  title: '04-Sections/StatBand',
  component: StatBand,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width page band that surfaces a row of headline metrics. Light and dark variants map to token text colours.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
} satisfies Meta<typeof StatBand>;

export default meta;
type Story = StoryObj<typeof meta>;

const stats = [
  { value: '1M+', label: 'scientists worldwide' },
  { value: '10,000+', label: 'total learners' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+', label: 'active integrations' },
];

export const Light: Story = {
  args: { stats, variant: 'light' },
};

export const Dark: Story = {
  args: { stats, variant: 'dark' },
  parameters: { backgrounds: { default: 'dark' } },
};
