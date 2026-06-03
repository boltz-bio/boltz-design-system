import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeatureGrid } from '@boltz/ui';
import { Cube } from 'iconoir-react';

const meta = {
  title: '04-Sections/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width section that arranges a set of CardMedium tiles in a responsive grid, with an optional eyebrow label above. One column on mobile, two at tablet, and two or three at laptop depending on the columns prop.',
      },
    },
  },
  argTypes: {
    columns: { control: 'inline-radio', options: [2, 3] },
    background: {
      control: 'select',
      options: ['none', 'secondary', 'sage-pale', 'blue-pale', 'tierra-100'],
    },
  },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const features = [
  {
    heading: 'Structure prediction',
    body: 'Predict biomolecular complexes — proteins, nucleic acids, ligands — with state-of-the-art accuracy.',
    cta: 'Run a prediction',
    color: 'sage-pale' as const,
  },
  {
    heading: 'Production API',
    body: 'A stable, documented REST API with predictable latency, built for teams shipping at scale.',
    cta: 'View the docs',
    color: 'blue-pale' as const,
  },
  {
    heading: 'Open ecosystem',
    body: 'Open weights and tooling you can self-host, fine-tune, and integrate into existing pipelines.',
    cta: 'Explore on GitHub',
    color: 'tierra-100' as const,
  },
];

export const ThreeColumns: Story = {
  args: {
    eyebrow: 'Platform',
    eyebrowIcon: <Cube width={14} height={14} strokeWidth={1.5} />,
    columns: 3,
    background: 'none',
    items: features,
  },
};

export const TwoColumnsColoured: Story = {
  args: {
    eyebrow: 'Capabilities',
    eyebrowIcon: <Cube width={14} height={14} strokeWidth={1.5} />,
    columns: 2,
    background: 'secondary',
    items: features.slice(0, 2),
  },
};
