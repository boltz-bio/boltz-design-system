import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, EyebrowLabel, Button, TextButton,
  Hero, FeatureGrid, StatBand, CTABand, Footer, Embed,
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

// Boltz Studio turntable (Modal-hosted) as the hero media. The .mp4 is a full 360°
// rotation baked on a white background — `surface="white"` matches the frame to it so it
// floats. `scrub` eases the rotation to scroll position; `interactive` lets a click swap
// in the live drag-to-rotate iframe (STUDIO_LIVE).
const STUDIO_TURNTABLE =
  'https://dylan-6--embed-video.modal.run?k=2cb075d35f668f998cc460ed08dd8f67';
const STUDIO_LIVE =
  'https://dylan-6--embed.modal.run?s=03f62994ea1ff55d98c0d9d835b70631&b=B&l=__NONE__&t=eyJiZyI6IiNmZmZmZmYiLCJyYyI6IiNjMWZiZDgiLCJiYyI6IiNhYmUzZjgiLCJwYyI6IiM1ZmVjYzIiLCJyciI6MSwicnQiOjAuNCwicmsiOjQsInJjbCI6MCwicnMiOjAsImJyIjowLjc2LCJiY2wiOjAuMDEsImEiOjAuOTMsImsiOjAuODUsInJtIjoxLjIsInAiOjM0LjUsInBkIjo2MCwiYmwiOjAuNCwiYmxUIjoxLjEsImUiOjJ9&c=eyJwIjpbMCwwLDY1LjA3NV0sInQiOlswLDAsMF19';

const ProteinRender = () => (
  <div className="w-[280px] tablet:w-[460px]">
    <Embed
      src={STUDIO_TURNTABLE}
      kind="video"
      title="Boltz Studio — protein turntable"
      aspect="square"
      surface="white"
      reveal
      scrub
      interactive
      interactiveSrc={STUDIO_LIVE}
      className="rounded-none"
    />
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

      <main>
      <Hero
        eyebrow="Build on Boltz"
        eyebrowIcon={<Leaf {...sz} />}
        heading="Frontier models for biomolecular design."
        body="State-of-the-art structure prediction, served as production-ready infrastructure. Built to integrate."
        actions={<>
          <Button variant="black">Try Boltz Lab</Button>
          <TextButton arrow>Read the paper</TextButton>
        </>}
        media={<ProteinRender />}
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

      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
