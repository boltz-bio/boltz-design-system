import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, EyebrowLabel, Button, TextButton,
  Hero, FeatureGrid, StatBand, CTABand, Footer,
  Accordion, AccordionItem, AccordionActions, Badge,
} from '@boltz/ui';
import { Leaf, Code, Community } from 'iconoir-react';
import { models, stats, navItems } from '../_data/boltz';

// Example page — assembled from section components (Hero, FeatureGrid, StatBand,
// CTABand, Footer) + a Models accordion block. Data comes from fixtures.

const meta = {
  title: '05-Screens/Landing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface-primary' },
    docs: {
      description: {
        component:
          'A full landing page assembled from section components and fixture data. Use it as a reference for how Hero, FeatureGrid, the models accordion, StatBand, CTABand, and Footer compose into a complete screen.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

const ProteinPlaceholder = () => (
  <div className="flex items-center justify-center h-[280px] w-[280px] tablet:h-[460px] tablet:w-[460px] rounded-full bg-sage-pale border border-sage-medium">
    <span className="text-body-sm text-text-muted">Protein render</span>
  </div>
);

// Real footer links per Figma 58:379 — plain lists, no column titles.
const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const Landing: Story = {
  render: () => (
    <div className="bg-surface-primary">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#">{n}</NavLink>)}
      </NavBar>

      <Hero
        eyebrow="Build on Boltz"
        eyebrowIcon={<Leaf {...sz} />}
        heading="Frontier models for biomolecular design."
        body="State-of-the-art structure prediction, served as production-ready infrastructure. Built to integrate."
        actions={<>
          <Button variant="black">Try Boltz Lab</Button>
          <TextButton arrow>Read the paper</TextButton>
        </>}
        media={<ProteinPlaceholder />}
      />

      <FeatureGrid
        eyebrow="Capabilities"
        eyebrowIcon={<Code {...sz} />}
        items={[
          { color: 'sage-pale', heading: 'Structure prediction', body: 'Atomic-resolution structures for proteins, RNA, and complexes.', cta: 'Explore models' },
          { color: 'blue-pale', heading: 'Production API', body: 'REST + Python SDK with predictable latency and throughput.', cta: 'Read the docs' },
          { color: 'tierra-100', heading: 'Open ecosystem', body: 'Weights, benchmarks, and tooling shared with the community.', cta: 'View on GitHub' },
        ]}
      />

      {/* Models — accordion block (documented pattern, not a shipped section) */}
      <section className="py-2xl">
        <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-xl">
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

      <StatBand eyebrow="Community" eyebrowIcon={<Community {...sz} />} stats={stats} />

      <CTABand
        eyebrowIcon={<Code {...sz} />}
        eyebrowLabel="Platform"
        heading="A foundation, not a paper."
        body="High-performance infrastructure built for biomolecular design teams."
        cta="Get early access"
      />

      <Footer columns={footerColumns} note="© 2026 Boltz" />
    </div>
  ),
};
