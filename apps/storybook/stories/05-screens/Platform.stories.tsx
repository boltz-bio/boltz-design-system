import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, EyebrowLabel, Button, TextButton,
  PrimaryHero, FeatureGrid, StatBand, CodeBlock, Carousel, ModelCard,
  CardSmall, PricingSection, CTABand, Footer, Blob, BLOB_COUNT,
} from '@boltz/ui';
import { Leaf, Code, Community, ShieldCheck, Lock, ServerConnection, ViewGrid } from 'iconoir-react';
import { navItems } from '../_data/boltz';

// Example page — "Platform - v2" (Figma 57:3935). A full responsive marketing /
// landing page assembled ONLY from existing @boltz/ui section components +
// token-styled markup. Screen-specific copy lives inline here.

const meta = {
  title: '05-Screens/Platform',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'The Boltz Platform landing page. Composes NavBar, Hero (protein render), a partner logo strip, FeatureGrid, a tabbed CodeBlock for the three API interfaces, a Security card grid, StatBand, an "Our models" Carousel of ModelCards, PricingSection, a CTABand, and the Footer.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const cardIcon = { width: 24, height: 24, strokeWidth: 1.5 } as const;

// ── Hero media — the platform dashboard, stuck to the bottom edge, bleeding right.
const DashboardBleed = () => (
  <>
    <Blob shape={BLOB_COUNT - 1} aria-hidden className="absolute -top-[25%] right-0 h-auto w-[88%] translate-x-[16%] opacity-[0.14] text-white" />
    <div className="absolute bottom-0 right-0 w-[1200px] max-w-[72vw] translate-x-[8%]">
      <img src="/platform-dashboard.png" alt="Boltz Platform dashboard" className="w-full h-auto select-none" />
    </div>
  </>
);

// ── Logo strip — token-styled (no shipped component for this) ───────────────────
const partners = [
  'Chemical Manufacturing',
  'Therapeutics',
  'Academic Research',
  'Biotech',
  'Agrochemistry',
];

const LogoStrip = () => (
  <section className="w-full py-2xl">
    <div className="max-w-container mx-auto px-md tablet:px-40">
      <p className="text-body-sm text-text-muted mb-lg">
        Trusted across research and industry
      </p>
      <div className="flex flex-wrap items-center gap-x-2xl gap-y-md">
        {partners.map((p) => (
          <span key={p} className="text-body-md text-text-muted whitespace-nowrap">
            {p}
          </span>
        ))}
      </div>
    </div>
  </section>
);

// ── API interfaces — short code per tab ─────────────────────────────────────────
const apiTabs = [
  {
    label: 'Python',
    code: `from boltz import Client

client = Client(api_key="bz_...")
result = client.predict(
    sequence="MKTAYIAKQR...",
    model="boltz-prot-1.1",
)
print(result.structure.pdb)`,
  },
  {
    label: 'REST API',
    code: `curl https://api.boltz.bio/v1/predict \\
  -H "Authorization: Bearer bz_..." \\
  -d '{
    "sequence": "MKTAYIAKQR...",
    "model": "boltz-prot-1.1"
  }'`,
  },
  {
    label: 'Agentic',
    code: `agent.use_tool("boltz.predict", {
  "sequence": seq,
  "model": "boltz-prot-1.1",
})
# Boltz returns a structured result the
# agent can reason over in-context.`,
  },
];

// ── Security feature points ─────────────────────────────────────────────────────
const securityPoints = [
  {
    icon: <ShieldCheck {...cardIcon} />,
    heading: 'SOC 2 Type II',
    body: 'Independently audited controls across security, availability, and confidentiality.',
  },
  {
    icon: <Lock {...cardIcon} />,
    heading: 'Private by default',
    body: 'Your sequences are never used for training. Encrypted in transit and at rest.',
  },
  {
    icon: <ServerConnection {...cardIcon} />,
    heading: 'Deploy anywhere',
    body: 'Run in our cloud, your VPC, or fully on-premise for regulated workloads.',
  },
];

// ── Stats — Community band ──────────────────────────────────────────────────────
const communityStats = [
  { value: '1M+', label: 'scientists worldwide' },
  { value: '6,000+', label: 'GitHub stars' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+', label: 'active integrations' },
];

// ── Models — carousel slides ────────────────────────────────────────────────────
const modelSlides = [
  {
    title: 'BoltzProt 1.1',
    tone: 'light' as const,
    body: 'State-of-the-art protein structure prediction, exceeding AlphaFold2 on novel folds.',
  },
  {
    title: 'BoltzMol 1.1',
    tone: 'sand' as const,
    body: 'Small-molecule screening and hit discovery over 200M+ compound–protein pairs.',
  },
  {
    title: 'BoltzDock 1.0',
    tone: 'clay' as const,
    body: 'High-throughput co-folding and docking for protein–ligand complex design.',
  },
  {
    title: 'BoltzRNA 1.0',
    tone: 'sage' as const,
    body: 'RNA secondary and tertiary structure prediction for therapeutic design.',
  },
];

// ── Pricing tabs ────────────────────────────────────────────────────────────────
const pricingTabs = [
  {
    icon: <Leaf {...sz} />,
    title: 'Starter',
    body: 'Prototype and benchmark with generous free credits.',
    header: { label: 'Starter', value: 'Free' },
    items: [
      { label: 'Predictions / month', cost: { display: '1,000', value: 1000 } },
      { label: 'Concurrent jobs', cost: { display: '2', value: 200 } },
      { label: 'Support', cost: { display: 'Community', value: 100 } },
    ],
  },
  {
    icon: <Code {...sz} />,
    title: 'Team',
    body: 'Production API access for research teams shipping daily.',
    header: { label: 'Team', value: '$2,400 / mo' },
    items: [
      { label: 'Predictions / month', cost: { display: '50,000', value: 50000 } },
      { label: 'Concurrent jobs', cost: { display: '20', value: 2000 } },
      { label: 'Support', cost: { display: 'Priority', value: 1500 } },
    ],
  },
  {
    icon: <Community {...sz} />,
    title: 'Enterprise',
    body: 'Dedicated capacity, VPC deployment, and an SLA.',
    header: { label: 'Enterprise', value: 'Custom' },
    items: [
      { label: 'Predictions / month', cost: { display: 'Unlimited', value: 100000 } },
      { label: 'Concurrent jobs', cost: { display: 'Custom', value: 5000 } },
      { label: 'Support', cost: { display: 'Dedicated', value: 3000 } },
    ],
  },
];

// ── Footer links per Figma ──────────────────────────────────────────────────────
const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const Platform: Story = {
  render: () => (
    <div className="bg-surface-primary">
      <NavBar tone="dark" cta="Get early access">
        {navItems.map((n) => (
          <NavLink key={n} href="#" active={n === 'Platform'}>{n}</NavLink>
        ))}
      </NavBar>

      <main className="-mt-60">
        {/* 1 — Hero */}
        <PrimaryHero
          tone="dark"
          heading="A New Foundation for End-to-End Discovery"
          body="Streamlined molecular design platform for all organizations. The Boltz Platform brings together frontier AI models and intelligent agents to accelerate drug discovery — from hit identification to lead optimization."
          media={<DashboardBleed />}
        />

        {/* 2 — Logo strip */}
        <LogoStrip />

        {/* 3 — Platform overview */}
        <FeatureGrid
          eyebrow="Platform"
          eyebrowIcon={<ViewGrid {...sz} />}
          background="secondary"
          items={[
            { color: 'sage-pale', heading: 'Frontier models', body: 'Best-in-class structure, docking, and generation models under one API.', cta: 'Explore models' },
            { color: 'blue-pale', heading: 'Production infra', body: 'Predictable latency and throughput, scaled for high-volume pipelines.', cta: 'Read the docs' },
            { color: 'tierra-100', heading: 'End-to-end design', body: 'From target to candidate — co-fold, screen, and rank in one workflow.', cta: 'See workflows' },
          ]}
        />

        {/* 4 — API interfaces */}
        <section className="w-full py-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-xl">
            <div className="flex flex-col gap-md">
              <EyebrowLabel icon={<Code {...sz} />}>API</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-body">
                Three powerful interfaces for calling Boltz
              </h2>
            </div>
            <CodeBlock contained color="sage" tabs={apiTabs} />
          </div>
        </section>

        {/* 5 — Security */}
        <section className="w-full py-2xl bg-surface-secondary">
          <div className="max-w-container mx-auto px-md tablet:px-40 flex flex-col gap-xl">
            <div className="flex flex-col gap-md">
              <EyebrowLabel icon={<ShieldCheck {...sz} />}>Security</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary max-w-body">
                Enterprise-grade security, from day one
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-lg tablet:grid-cols-3">
              {securityPoints.map((s) => (
                <CardSmall
                  key={s.heading}
                  color="white"
                  icon={s.icon}
                  heading={s.heading}
                  body={s.body}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 6 — Community stats */}
        <StatBand
          stats={communityStats}
        />

        {/* 7 — Our models carousel */}
        <section className="w-full py-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40">
            <Carousel
              controls="top"
              ariaLabel="Our models"
              slideClassName="basis-[88%] tablet:basis-[53%]"
              caption={<>
                <EyebrowLabel icon={<Leaf {...sz} />}>Our models</EyebrowLabel>
                <h2 className="text-heading-md text-text-primary">
                  A model for every step of discovery
                </h2>
              </>}
            >
              {modelSlides.map((m) => (
                <ModelCard
                  key={m.title}
                  title={m.title}
                  body={m.body}
                  tone={m.tone}
                  renderSrc="/boltz-protein.png"
                />
              ))}
            </Carousel>
          </div>
        </section>

        {/* 8 — Pricing */}
        <PricingSection
          eyebrow="Pricing"
          eyebrowIcon={<ViewGrid {...sz} />}
          heading="Pricing that scales with your research"
          tabs={pricingTabs}
        />

        {/* 9 — CTA */}
        <CTABand
          eyebrowIcon={<Leaf {...sz} />}
          eyebrowLabel="Get started"
          heading="A foundation for end-to-end discovery."
          body="Streamlined molecular design for modern research teams."
          cta="Get early access"
        />
      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
