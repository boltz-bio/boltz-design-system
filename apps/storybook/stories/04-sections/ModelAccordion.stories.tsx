import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModelAccordion } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';

const meta = {
  title: '04-Sections/ModelAccordion',
  component: ModelAccordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A tierra-100 section that lists models in a collapsible accordion. Header row has eyebrow + heading left and a CTA right. Left column holds a decorative media slot; right column holds the accordion.',
      },
    },
  },
} satisfies Meta<typeof ModelAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const PROTEIN = '/Small Molecule - Binder 01 - V2 1.png';

const models = [
  {
    id: 'boltz-mol',
    title: 'BoltzMol 1.1',
    badge: 'Beta',
    body: 'A step change in small molecule screening and hit discovery — 10x faster than the previous SOTA at 100x lower cost.',
    cta: 'Get access',
    secondaryCta: 'Read technical report',
  },
  {
    id: 'boltz-prot',
    title: 'BoltzProt 1.1',
    badge: 'Beta',
    body: 'State-of-the-art protein structure prediction with atomic-resolution accuracy across all protein families.',
    cta: 'Get access',
    secondaryCta: 'Read technical report',
  },
  {
    id: 'boltz-2',
    title: 'Boltz-2',
    badge: 'MIT',
    badgeVariant: 'tertiary' as const,
    body: 'Our open-weight foundation model for biomolecular structure prediction, released under the MIT license.',
    secondaryCta: 'Read technical report',
  },
];

export const Default: Story = {
  args: {
    eyebrowIcon: <AllIcons.Atom {...sz} />,
    eyebrow: 'Our models',
    heading: "We're creating top models for all molecule sizes.",
    cta: 'View all models',
    models,
    media: (
      <img
        src={PROTEIN}
        alt="Protein structure render"
        className="w-[500px] max-w-none"
      />
    ),
    defaultValue: 'boltz-mol',
  },
};
