import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingSection, MetricComparison, type MetricItem } from '@boltz/ui';
import { Flask } from 'iconoir-react';

const items: MetricItem[] = [
  { label: 'Boltz API',     cost: { display: '$2,700', value: 2700 }, time: { display: '2 hrs',  value: 2 } },
  { label: 'NVIDIA NIM',    cost: { display: '$3,100', value: 3100 }, time: { display: '5 hrs',  value: 5 } },
  { label: 'Amazon bedrock',cost: { display: '$3,600', value: 3600 }, time: { display: '8 hrs',  value: 8 } },
  { label: 'Local machine', cost: { display: '$4,200', value: 4200 }, time: { display: '24 hrs', value: 24 } },
];

const ico = { width: 28, height: 28, strokeWidth: 1.5 } as const;
const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

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
          'The pricing / comparison section: eyebrow + heading, then a feature list (left) beside a comparison card (right). Drop a MetricComparison into the card slot. Mobile-first: stacks on phones, splits at laptop.',
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
    features: [
      { icon: <Flask {...ico} />, title: 'Virtual Screen', body: 'A python CLI for running our most powerful models without leaving your notebook.', active: true },
      { icon: <Flask {...ico} />, title: 'De Novo Binder Design', body: 'A python CLI for running our most powerful models without leaving your notebook.' },
      { icon: <Flask {...ico} />, title: 'De Novo Binder Design', body: 'A python CLI for running our most powerful models without leaving your notebook.' },
    ],
    card: <MetricComparison header={{ label: 'Number of Designs', value: '60,000' }} items={items} />,
  },
};
