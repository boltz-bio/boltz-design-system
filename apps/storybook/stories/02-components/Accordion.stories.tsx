import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem, AccordionActions, Badge, Button, TextButton } from '@boltz/ui';

const meta = {
  title: '02-Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'white' } },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: 'single' },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="max-w-[700px]">
      <AccordionItem
        value="item-1"
        title="BoltzMol 1.1"
        badge={<Badge variant="primary">Beta</Badge>}
      >
        <p className="font-sans font-regular text-body-md text-text-secondary">
          A one-designed small molecule screening and hit discovery platform. Powered by
          multi-modal foundation models trained on 200M+ compound-protein interaction pairs.
        </p>
        <AccordionActions>
          <Button variant="black" suffix="arrow-icon">Get early access</Button>
          <TextButton>Read technical report</TextButton>
        </AccordionActions>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        title="BoltzProt 1.1"
        badge={<Badge variant="secondary">New</Badge>}
      />

      <AccordionItem
        value="item-3"
        title="BoltzRNA 1.0"
        badge={<Badge variant="tertiary">Coming soon</Badge>}
      />
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  args: { type: 'multiple' },
  render: () => (
    <Accordion type="multiple" className="max-w-[700px]">
      <AccordionItem value="item-1" title="What is Boltz?">
        <p className="font-sans font-regular text-body-md text-text-secondary">
          Boltz is a computational biology platform that uses AI to accelerate drug discovery
          and protein engineering.
        </p>
      </AccordionItem>
      <AccordionItem value="item-2" title="Who is it for?">
        <p className="font-sans font-regular text-body-md text-text-secondary">
          Research teams at pharma, biotech, and academic institutions who need fast,
          accurate structure prediction and hit discovery at scale.
        </p>
      </AccordionItem>
      <AccordionItem value="item-3" title="How do I get access?">
        <p className="font-sans font-regular text-body-md text-text-secondary">
          Request early access through the lab or API plan. Enterprise contracts available.
        </p>
        <AccordionActions>
          <Button variant="black" suffix="arrow-icon">Get early access</Button>
          <TextButton>Read the docs</TextButton>
        </AccordionActions>
      </AccordionItem>
    </Accordion>
  ),
};

export const NoBadge: Story = {
  args: { type: 'single' },
  render: () => (
    <Accordion type="single" collapsible defaultValue="q1" className="max-w-[700px]">
      <AccordionItem value="q1" title="How accurate are the predictions?">
        <p className="font-sans font-regular text-body-md text-text-secondary">
          BoltzProt achieves state-of-the-art accuracy on CASP15 benchmarks, with a GDT_TS
          score exceeding AlphaFold2 on novel folds.
        </p>
      </AccordionItem>
      <AccordionItem value="q2" title="What input formats are supported?" />
      <AccordionItem value="q3" title="Is there an API?" />
    </Accordion>
  ),
};
