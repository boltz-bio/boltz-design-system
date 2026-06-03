import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, EyebrowLabel, Button,
  CardMedium, CardWide, StatMetric, StatMetricRow,
  Accordion, AccordionItem, AccordionActions, Badge, TextButton,
} from '@boltz/ui';
import { Leaf, Code, Community } from 'iconoir-react';
import { models, stats, navItems } from '../_data/boltz';

// Example page — composition only, no new components. Proves tokens flow and the
// component set assembles into a real Boltz landing page. Data comes from fixtures.

const meta = {
  title: '05-Screens/Landing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface-primary' },
    docs: {
      description: {
        component:
          'A full landing page assembled entirely from existing components and fixture data, with no new components introduced. Use it as a reference for how the navbar, hero, cards, accordion, and stats compose into a complete screen.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const ProteinPlaceholder = () => (
  <div className="flex items-center justify-center h-[460px] w-[460px] rounded-full bg-sage-pale border border-sage-medium">
    <span className="text-body-sm text-text-muted">Protein render</span>
  </div>
);

export const Landing: Story = {
  render: () => (
    <div className="bg-surface-primary">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#">{n}</NavLink>)}
      </NavBar>

      {/* Hero */}
      <section className="py-section">
        <div className="max-w-container mx-auto px-40 grid grid-cols-12 gap-20 items-center">
          <div className="col-span-6 flex flex-col gap-lg">
            <EyebrowLabel icon={<Leaf {...sz} />}>Build on Boltz</EyebrowLabel>
            <h1 className="text-heading-lg text-text-primary">Frontier models for biomolecular design.</h1>
            <p className="text-body-lg text-text-secondary max-w-hero">
              State-of-the-art structure prediction, served as production-ready infrastructure. Built to integrate.
            </p>
            <div className="flex gap-md mt-md">
              <Button variant="black">Try Boltz Lab</Button>
              <TextButton arrow>Read the paper</TextButton>
            </div>
          </div>
          <div className="col-span-6 flex justify-end"><ProteinPlaceholder /></div>
        </div>
      </section>

      {/* Capabilities — CardMedium grid */}
      <section className="py-2xl">
        <div className="max-w-container mx-auto px-40 flex flex-col gap-xl">
          <EyebrowLabel icon={<Code {...sz} />}>Capabilities</EyebrowLabel>
          <div className="grid grid-cols-3 gap-lg">
            <CardMedium color="sage-pale" heading="Structure prediction" body="Atomic-resolution structures for proteins, RNA, and complexes." cta="Explore models" />
            <CardMedium color="blue-pale" heading="Production API" body="REST + Python SDK with predictable latency and throughput." cta="Read the docs" />
            <CardMedium color="tierra-100" heading="Open ecosystem" body="Weights, benchmarks, and tooling shared with the community." cta="View on GitHub" />
          </div>
        </div>
      </section>

      {/* Models — accordion from fixtures */}
      <section className="py-2xl">
        <div className="max-w-container mx-auto px-40 flex flex-col gap-xl">
          <EyebrowLabel icon={<Leaf {...sz} />}>Our models</EyebrowLabel>
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
                    <Button variant="black">Get early access</Button>
                    <TextButton arrow>Technical report</TextButton>
                  </AccordionActions>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Community stats */}
      <section className="py-2xl">
        <div className="max-w-container mx-auto px-40 flex flex-col gap-xl">
          <EyebrowLabel icon={<Community {...sz} />}>Community</EyebrowLabel>
          <div className="bg-surface-secondary rounded-lg p-xl">
            <StatMetricRow>
              {stats.map((s) => <StatMetric key={s.label} value={s.value} label={s.label} />)}
            </StatMetricRow>
          </div>
        </div>
      </section>

      {/* Platform CTA — wide dark card */}
      <section className="py-2xl">
        <div className="max-w-container mx-auto px-40">
          <CardWide
            eyebrowIcon={<Code {...sz} />}
            eyebrowLabel="Platform"
            heading="A foundation, not a paper."
            body="High-performance infrastructure built for biomolecular design teams."
            cta="Get early access"
          />
        </div>
      </section>
    </div>
  ),
};
