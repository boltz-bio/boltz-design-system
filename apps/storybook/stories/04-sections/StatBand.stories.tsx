import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatBand } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/StatBand',
  component: StatBand,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width page band that surfaces a row of headline metrics inside a rounded surface panel, with an optional eyebrow label. Light and dark variants map to token surfaces.',
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

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const stats = [
  { value: '1M+', label: 'scientists worldwide' },
  { value: '10,000+', label: 'total learners' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+', label: 'active integrations' },
];

export const Light: Story = {
  args: {
    eyebrow: 'By the numbers',
    eyebrowIcon: <AllIcons.Leaf {...sz} />,
    stats,
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    eyebrow: 'By the numbers',
    eyebrowIcon: <AllIcons.Leaf {...sz} />,
    stats,
    variant: 'dark',
  },
};

export const NoEyebrow: Story = {
  name: 'No eyebrow',
  args: {
    stats,
    variant: 'light',
  },
};
