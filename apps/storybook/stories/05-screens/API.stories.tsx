import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, EyebrowLabel, Button, TextButton,
  PrimaryHero, SplitSection, CodeBlock, IconContainer, StatBand,
  Carousel, ModelCard, PricingSection, Footer, Blob, BLOB_COUNT,
} from '@boltz/ui';
import {
  Code, Terminal, GitFork, Community, Cpu, Puzzle,
  DatabaseScript, Cloud, Packages, Sparks, NetworkLeft, RoundFlask,
} from 'iconoir-react';
import { navItems } from '../_data/boltz';

// Example page — the "API" marketing screen (Figma "API - v2", node 57:3512).
// Assembled ONLY from existing @boltz/ui section components + screen-specific
// data declared inline. Mirrors the Landing pattern.

const meta = {
  title: '05-Screens/API',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface-primary' },
    docs: {
      description: {
        component:
          'The API marketing page (Figma "API - v2", 57:3512): hero, logo strip, intro statement, a tabbed CodeBlock of the three calling interfaces, an integrations grid, a stat band, the "Our models" carousel, a pricing comparison, and the footer. Composed entirely from @boltz/ui sections.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const igSz = { width: 20, height: 20, strokeWidth: 1.5 } as const;

const PROTEIN = '/boltz-protein.png';

// ── Hero media — protein render bleeding off the right + a solid library blob ───
const HeroProteinBleed = () => (
  <>
    <Blob shape={BLOB_COUNT - 1} aria-hidden className="absolute -top-[28%] right-0 h-auto w-[92%] translate-x-[16%] opacity-40 text-blue-medium" />
    <div className="absolute right-0 top-1/2 w-[820px] max-w-[64vw] -translate-y-1/2 laptop:translate-x-[8%]">
      <img src="/hero-protein.png" alt="Boltz protein structure render" className="w-full h-auto select-none" />
    </div>
  </>
);

// ── Logo strip — muted industry labels (no logo assets in the package) ──────────
const logoLabels = [
  'Chemical Manufacturing',
  'Biotech R&D',
  'Pharma',
  'Academic Labs',
  'AgTech',
];

// ── API personas — the three calling interfaces, one CodeBlock tab each ─────────
const apiTabs = [
  {
    label: 'Python',
    code: `from boltz import Client

client = Client(api_key="bz_...")

result = client.predict(
    model="boltz-prot-1.1",
    sequence="MKTAYIAKQR...",
)
print(result.structure.pdb)`,
  },
  {
    label: 'REST API',
    code: `curl https://api.boltz.bio/v1/predict \\
  -H "Authorization: Bearer bz_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "boltz-prot-1.1",
    "sequence": "MKTAYIAKQR..."
  }'`,
  },
  {
    label: 'Agentic',
    code: `from boltz.agent import BoltzTool

tools = [BoltzTool(api_key="bz_...")]

agent.run(
    "Fold this sequence and score "
    "the top binding pockets.",
    tools=tools,
)`,
  },
];

// ── Integrations grid — icon + label tiles (Card/IconContainer markup) ──────────
const integrations: { label: string; icon: React.ReactNode }[] = [
  { label: 'Benchling',  icon: <RoundFlask {...igSz} /> },
  { label: 'AWS Bedrock', icon: <Cloud {...igSz} /> },
  { label: 'LangChain',  icon: <NetworkLeft {...igSz} /> },
  { label: 'Hugging Face', icon: <Sparks {...igSz} /> },
  { label: 'Snowflake',  icon: <DatabaseScript {...igSz} /> },
  { label: 'Modal',      icon: <Cpu {...igSz} /> },
  { label: 'LlamaIndex', icon: <Packages {...igSz} /> },
  { label: 'Vercel',     icon: <Puzzle {...igSz} /> },
];

// ── Stat band — API-page metrics (inline; fixture's "total learners" doesn't fit) ─
const apiStats = [
  { value: '1M+',    label: 'scientists worldwide' },
  { value: '6,000+', label: 'GitHub stars' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+',   label: 'active integrations' },
];

// ── "Our models" carousel slides ───────────────────────────────────────────────
const modelCards = [
  { title: 'BoltzProt 1.1', body: 'State-of-the-art protein structure prediction, served as a production endpoint.', tone: 'light' as const },
  { title: 'BoltzMol 1.1',  body: 'Small-molecule screening and hit discovery over 200M+ interaction pairs.', tone: 'sand' as const },
  { title: 'BoltzRNA 1.0',  body: 'RNA secondary and tertiary structure prediction for therapeutic design.', tone: 'clay' as const },
  { title: 'BoltzDock',     body: 'Fast protein–ligand docking with calibrated confidence scores.', tone: 'sage' as const },
];

// ── Pricing comparison — tabs drive a MetricComparison card ─────────────────────
const pricingTabs = [
  {
    icon: <Terminal {...igSz} />,
    title: 'Single prediction',
    body: 'On-demand inference, billed per call.',
    header: { label: 'Per call', value: '$0.04' },
    items: [
      { label: 'Boltz API',  cost: { display: '$0.04', value: 0.04 } },
      { label: 'Self-hosted GPU', cost: { display: '$0.21', value: 0.21 } },
      { label: 'Legacy pipeline', cost: { display: '$0.38', value: 0.38 } },
    ],
  },
  {
    icon: <Cpu {...igSz} />,
    title: 'Batch screening',
    body: 'High-throughput jobs across a compound library.',
    header: { label: 'Per 10k', value: '$320' },
    items: [
      { label: 'Boltz API',  cost: { display: '$320', value: 320 } },
      { label: 'Self-hosted GPU', cost: { display: '$1,450', value: 1450 } },
      { label: 'Legacy pipeline', cost: { display: '$2,700', value: 2700 } },
    ],
  },
];

// ── Footer links per Figma — plain lists, no column titles ──────────────────────
const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const API: Story = {
  render: () => (
    <div className="bg-surface-primary">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#" active={n === 'API'}>{n}</NavLink>)}
      </NavBar>

      <main>
        {/* 1 + 2 — Hero */}
        <PrimaryHero
          tone="blue"
          heading="New Primitives for Agentic Science"
          body="Integrate state-of-the-art biomolecular models into your agentic product or pipeline."
          actions={<Button variant="black">Read the Docs</Button>}
          media={<HeroProteinBleed />}
        />

        {/* 3 — Logo strip */}
        <section className="pb-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40">
            <ul className="flex flex-wrap items-center gap-x-2xl gap-y-md">
              {logoLabels.map((label) => (
                <li key={label} className="text-body-sm text-text-muted whitespace-nowrap">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — Intro band (centered statement) */}
        <section className="py-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40">
            <p className="max-w-body text-heading-md text-text-primary">
              Our open source models are used by over 1M scientists worldwide.
            </p>
          </div>
        </section>

        {/* 5 — API personas + tabbed CodeBlock */}
        <section className="py-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
            <div className="flex flex-col gap-md">
              <EyebrowLabel icon={<Terminal {...sz} />}>For developers</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-body">
                Three powerful interfaces for calling Boltz
              </h2>
              <p className="text-body-lg text-text-secondary max-w-body">
                A python CLI for running our most powerful models.
              </p>
            </div>
            <CodeBlock color="sage" contained tabs={apiTabs} />
          </div>
        </section>

        {/* 6 — Integrations grid */}
        <section className="py-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
            <div className="flex flex-col gap-md">
              <EyebrowLabel icon={<Puzzle {...sz} />}>Integrations</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-body">
                Call Boltz models from your favorite agent
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-lg tablet:grid-cols-4">
              {integrations.map((ig) => (
                <div
                  key={ig.label}
                  className="flex items-center gap-md rounded-lg bg-surface-card-light border border-border-light p-lg"
                >
                  <IconContainer>{ig.icon}</IconContainer>
                  <span className="text-body-md text-text-primary">{ig.label}</span>
                </div>
              ))}
            </div>

            <TextButton arrow>See all the integrations</TextButton>
          </div>
        </section>

        {/* 7 — Stat band */}
        <StatBand
          eyebrow="Community"
          eyebrowIcon={<Community {...sz} />}
          stats={apiStats}
        />

        {/* 8 — "Our models" carousel */}
        <section className="py-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40">
            <Carousel
              controls="top"
              ariaLabel="Our models"
              slideClassName="basis-[88%] tablet:basis-[53%]"
              caption={<>
                <EyebrowLabel icon={<GitFork {...sz} />}>Our models</EyebrowLabel>
                <h2 className="text-heading-md text-text-primary">Built for production</h2>
              </>}
            >
              {modelCards.map((m) => (
                <ModelCard
                  key={m.title}
                  title={m.title}
                  body={m.body}
                  tone={m.tone}
                  ctaLabel="Get access"
                  reportLabel="Read technical report"
                  renderSrc={PROTEIN}
                />
              ))}
            </Carousel>
          </div>
        </section>

        {/* 9 — Pricing comparison */}
        <PricingSection
          eyebrow="Pricing"
          eyebrowIcon={<Code {...sz} />}
          heading="Predictable inference at any scale"
          tabs={pricingTabs}
        />
      </main>

      {/* 10 — Footer */}
      <Footer columns={footerColumns} />
    </div>
  ),
};
