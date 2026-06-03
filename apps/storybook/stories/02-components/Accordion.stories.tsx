import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem, AccordionActions, Badge, Button, TextButton } from '@boltz/ui';
import { models } from '../_data/boltz';

const meta = {
  title: '02-Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'A collapsible disclosure list for grouping related content such as model overviews or FAQ entries. Use single mode to keep one panel open at a time, or multiple mode to allow several open at once.',
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Data-driven from the shared `models` fixture — the accordion maps over a typed
// array instead of hand-coding each item.
export const Default: Story = {
  args: { type: 'single' },
  render: () => (
    <Accordion type="single" collapsible defaultValue={models[0].id} className="max-w-body">
      {models.map((m, i) => (
        <AccordionItem
          key={m.id}
          value={m.id}
          title={m.name}
          badge={m.badge ? <Badge variant={m.badge.tone}>{m.badge.label}</Badge> : undefined}
        >
          <p className="text-body-md text-text-secondary">{m.body}</p>
          {i === 0 && (
            <AccordionActions>
              <Button variant="black" suffix="arrow-icon">Get early access</Button>
              <TextButton>Read technical report</TextButton>
            </AccordionActions>
          )}
        </AccordionItem>
      ))}
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
    <Accordion type="single" collapsible defaultValue="q1" className="max-w-body">
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

// On background — the accordion sits inside tinted surface panels (as on a real
// page). Items are transparent with a hairline separator, so they adapt to any
// Boltz canvas. Mirrors the "on background" treatment of the other components.
export const OnBackground: Story = {
  args: { type: 'single' },
  render: () => (
    <div className="flex flex-col gap-lg">
      {([
        { bg: 'bg-white border border-border-light', label: 'White card' },
        { bg: 'bg-surface-secondary', label: 'Surface secondary' },
        { bg: 'bg-sage-pale', label: 'Sage pale' },
        { bg: 'bg-blue-pale', label: 'Blue pale' },
      ] as const).map(({ bg, label }) => (
        <div key={label} className={`rounded-lg p-lg ${bg}`}>
          <p className="text-body-sm text-text-muted mb-sm">{label}</p>
          <Accordion type="single" collapsible defaultValue="a" className="max-w-body">
            <AccordionItem value="a" title="BoltzMol 1.1" badge={<Badge variant="primary">Beta</Badge>}>
              <p className="font-sans font-regular text-body-md text-text-secondary">
                Small-molecule screening and hit discovery, powered by multi-modal foundation models.
              </p>
            </AccordionItem>
            <AccordionItem value="b" title="BoltzProt 1.1" badge={<Badge variant="secondary">New</Badge>} />
          </Accordion>
        </div>
      ))}
    </div>
  ),
};
