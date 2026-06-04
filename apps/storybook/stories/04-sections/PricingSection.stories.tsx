import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingSection, type PricingTab } from '@boltz/ui';
import { Flask } from 'iconoir-react';

const ico = { width: 48, height: 48, strokeWidth: 1 } as const;
const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// Each tab carries its own comparison — selecting a tab swaps the card on the right.
const tabs: PricingTab[] = [
  {
    icon: <Flask {...ico} />,
    title: 'Virtual Screen',
    body: 'A python CLI for running our most powerful models without leaving your notebook.',
    header: { label: 'Number of Designs', value: '60,000' },
    items: [
      { label: 'Boltz API',      cost: { display: '$2,700', value: 2700 }, time: { display: '2 hrs',  value: 2 } },
      { label: 'NVIDIA NIM',     cost: { display: '$3,100', value: 3100 }, time: { display: '5 hrs',  value: 5 } },
      { label: 'Amazon bedrock', cost: { display: '$3,600', value: 3600 }, time: { display: '8 hrs',  value: 8 } },
      { label: 'Local machine',  cost: { display: '$4,200', value: 4200 }, time: { display: '24 hrs', value: 24 } },
    ],
  },
  {
    icon: <Flask {...ico} />,
    title: 'De Novo Binder Design',
    body: 'A python CLI for running our most powerful models without leaving your notebook.',
    header: { label: 'Number of Binders', value: '12,000' },
    items: [
      { label: 'Boltz API',      cost: { display: '$5,400', value: 5400 }, time: { display: '6 hrs',  value: 6 } },
      { label: 'NVIDIA NIM',     cost: { display: '$6,200', value: 6200 }, time: { display: '12 hrs', value: 12 } },
      { label: 'Amazon bedrock', cost: { display: '$7,100', value: 7100 }, time: { display: '18 hrs', value: 18 } },
      { label: 'Local machine',  cost: { display: '$9,800', value: 9800 }, time: { display: '48 hrs', value: 48 } },
    ],
  },
  {
    icon: <Flask {...ico} />,
    title: 'Structure Prediction',
    body: 'A python CLI for running our most powerful models without leaving your notebook.',
    header: { label: 'Number of Structures', value: '250,000' },
    items: [
      { label: 'Boltz API',      cost: { display: '$1,200', value: 1200 }, time: { display: '1 hr',   value: 1 } },
      { label: 'NVIDIA NIM',     cost: { display: '$1,900', value: 1900 }, time: { display: '3 hrs',  value: 3 } },
      { label: 'Amazon bedrock', cost: { display: '$2,400', value: 2400 }, time: { display: '5 hrs',  value: 5 } },
      { label: 'Local machine',  cost: { display: '$3,800', value: 3800 }, time: { display: '14 hrs', value: 14 } },
    ],
  },
];

const meta = {
  title: '04-Sections/PricingSection',
  component: PricingSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=89-451',
    },
    docs: {
      description: {
        component:
          'The pricing / comparison section: eyebrow + heading, then selectable feature tabs (left, ListItemTab) that drive the comparison card (right, MetricComparison). Mobile-first: stacks on phones, splits at laptop. Composes existing components only.',
      },
    },
  },
} satisfies Meta<typeof PricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Pricing',
    eyebrowIcon: <Flask {...sz} />,
    heading: 'Our API is the best place to run Boltz models at drug development scale',
    tabs,
  },
};
