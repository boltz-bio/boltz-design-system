import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, EyebrowLabel, Button, TextButton,
  PrimaryHero, SplitSection, Section, TabBar, CodeBlock, IntegrationsSection,
  ModelAccordion, PricingSection, CommunitySection, Footer,
} from '@boltz/ui';
import {
  Code, Terminal, Cpu, Puzzle, Community, Atom, GitFork,
} from 'iconoir-react';
// Terminal is used in pricingTabs; kept above.
import { navItems } from '../_data/boltz';

// API marketing page — Figma "API - v2", node 57:3512.
// Assembled exclusively from existing @boltz/ui section components.

const meta = {
  title: '05-Screens/API',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'The API marketing page (Figma "API - v2", 57:3512): hero, intro split with highlight card, tabbed CodeBlock, integrations grid, model accordion, pricing, community, and footer.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz  = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const igSz      = { width: 20, height: 20, strokeWidth: 1.5 } as const;
const pricingIco = { width: 48, height: 48, strokeWidth: 1   } as const;

const PROTEIN = '/boltz-protein.png';

// ── Hero media ───────────────────────────────────────────────────────────────
const HeroMedia = () => (
  <div className="absolute right-0 top-1/2 w-[820px] max-w-[64vw] -translate-y-1/2 laptop:translate-x-[8%]">
    <img src="/hero-protein.png" alt="Boltz protein structure render" className="w-full h-auto select-none" />
  </div>
);

// ── Section 2 — intro split + highlight card ─────────────────────────────────
const HighlightCard = () => (
  <div className="bg-blue-pale rounded-lg p-32 flex flex-col justify-between gap-xl h-full">
    <div className="flex flex-col gap-md">
      <h2 className="text-heading-md text-text-primary">
        Introducing the Boltz API: New Primitives for molecular biology
      </h2>
      <p className="text-body-md text-text-secondary">
        A powerful end-to-end pipeline for de novo protein design powered by Boltz-2
        and our state-of-the-art protein interaction and ADME models.
      </p>
    </div>
    <div className="flex items-center gap-sm">
      <Button variant="black" suffix="arrow-icon">Learn more</Button>
    </div>
  </div>
);

// ── Section 3 — Use Cases (persona switcher + CodeBlock) ─────────────────────
type Persona = { value: string; label: string; color: 'sage' | 'blue' | 'tierra'; desc: string; tabs: { label: string; code: string }[] };

const personas: Persona[] = [
  {
    value: 'scientists',
    label: 'Scientists',
    color: 'sage',
    desc: 'A Python CLI for running our most powerful models without leaving your notebook.',
    tabs: [
      { label: 'Python', code: `from boltz import Client\n\nclient = Client(api_key="bz_...")\n\nresult = client.predict(\n    model="boltz-prot-1.1",\n    sequence="MKTAYIAKQR...",\n)\nprint(result.structure.pdb)` },
      { label: 'REST API', code: `curl https://api.boltz.bio/v1/predict \\\n  -H "Authorization: Bearer bz_..." \\\n  -d '{"model":"boltz-prot-1.1","sequence":"MKTAYIAKQR..."}'` },
      { label: 'Agentic SDK', code: `from boltz.agent import BoltzTool\n\ntools = [BoltzTool(api_key="bz_...")]\nagent.run("Fold this sequence.", tools=tools)` },
    ],
  },
  {
    value: 'developers',
    label: 'Developers',
    color: 'blue',
    desc: 'Typed SDKs and a predictable REST API that drop straight into your product or pipeline.',
    tabs: [
      { label: 'Python', code: `from boltz import Client\n\nclient = Client()\nfor job in client.batch(sequences):\n    store(job.result)` },
      { label: 'REST API', code: `POST /v1/batch\n{\n  "model": "boltz-prot-1.1",\n  "sequences": ["...", "..."],\n  "webhook": "https://app/api/boltz"\n}` },
      { label: 'Agentic SDK', code: `import { Boltz } from '@boltz/sdk'\n\nconst boltz = new Boltz()\nconst { pdb } = await boltz.predict({ sequence })` },
    ],
  },
  {
    value: 'agents',
    label: 'Agents',
    color: 'tierra',
    desc: 'Expose Boltz models as tools your agents can call mid-reasoning, with calibrated confidence.',
    tabs: [
      { label: 'Python', code: `from boltz.agent import BoltzTool\n\ntools = [BoltzTool()]\nagent.run(\n    "Fold this target and rank binding pockets.",\n    tools=tools,\n)` },
      { label: 'REST API', code: `POST /v1/tools/fold\n{\n  "sequence": "MKTAYIAKQR...",\n  "return": ["structure", "pockets"]\n}` },
      { label: 'Agentic SDK', code: `import { streamText } from 'ai'\nimport { boltzTools } from '@boltz/ai'\n\nstreamText({ model, tools: boltzTools, prompt })` },
    ],
  },
];

function UseCasesSection() {
  const [active, setActive] = React.useState('scientists');
  const persona = personas.find((p) => p.value === active) ?? personas[0];
  return (
    <Section className="bg-tierra-50" innerClassName="flex flex-col items-center gap-xl">
      <h2 className="text-heading-md text-text-primary text-center">How you can use Boltz</h2>
      <TabBar
        items={personas.map((p) => ({ value: p.value, label: p.label }))}
        value={active}
        onValueChange={setActive}
      />
      <p className="max-w-body text-body-lg text-text-secondary text-center">{persona.desc}</p>
      <div className="w-full pt-md">
        <CodeBlock color={persona.color} contained tabs={persona.tabs} />
      </div>
    </Section>
  );
}

// ── Section 5 — ModelAccordion data ──────────────────────────────────────────
const models = [
  {
    id: 'boltz-mol',
    title: 'BoltzMol 1.1',
    badge: 'Beta',
    body: 'A step change in small molecule screening and hit discovery — 10× faster than the previous SOTA at 100× lower cost.',
    cta: 'Get access',
    secondaryCta: 'Read technical report',
  },
  {
    id: 'boltz-prot',
    title: 'BoltzProt 1.1',
    badge: 'Beta',
    body: 'State-of-the-art protein structure prediction served as a production endpoint with predictable latency.',
    cta: 'Get access',
    secondaryCta: 'Read technical report',
  },
  {
    id: 'boltz-2',
    title: 'Boltz-2',
    badge: 'MIT',
    body: 'Our flagship open-weight model for protein–ligand co-folding and binding affinity prediction.',
    cta: 'Get access',
    secondaryCta: 'Read technical report',
  },
];

// ── Section 6 — PricingSection tabs ──────────────────────────────────────────
const pricingTabs = [
  {
    icon: <Terminal {...pricingIco} />,
    title: 'Single prediction',
    body: 'On-demand inference, billed per call.',
    header: { label: 'Per call', value: '$0.04' },
    items: [
      { label: 'Boltz API',        cost: { display: '$0.04',  value: 0.04  } },
      { label: 'Self-hosted GPU',  cost: { display: '$0.21',  value: 0.21  } },
      { label: 'Legacy pipeline',  cost: { display: '$0.38',  value: 0.38  } },
    ],
  },
  {
    icon: <Cpu {...pricingIco} />,
    title: 'Batch screening',
    body: 'High-throughput jobs across a compound library.',
    header: { label: 'Per 10k', value: '$320' },
    items: [
      { label: 'Boltz API',        cost: { display: '$320',   value: 320   } },
      { label: 'Self-hosted GPU',  cost: { display: '$1,450', value: 1450  } },
      { label: 'Legacy pipeline',  cost: { display: '$2,700', value: 2700  } },
    ],
  },
];

// ── Section 7 — CommunitySection data ────────────────────────────────────────
const communityStats = [
  { value: '8M+',    label: 'scientists worldwide' },
  { value: '6,000+', label: 'GitHub stars' },
  { value: 'Top 20', label: 'pharma companies' },
  { value: '200+',   label: 'active integrations' },
];

const PfizerLogo = () => (
  <svg height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pfizer">
    <text y="24" fontFamily="sans-serif" fontSize="22" fontWeight="700" fill="white">Pfizer</text>
  </svg>
);

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const API: Story = {
  render: () => (
    <div className="bg-white">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#" active={n === 'API'}>{n}</NavLink>)}
      </NavBar>

      <main className="-mt-60">
        {/* 1 — Hero */}
        <PrimaryHero
          tone="blue"
          heading="New Primitives for Agentic Science"
          body="Integrate state-of-the-art biomolecular models into your agentic product or pipeline."
          actions={<Button variant="black">Read the Docs</Button>}
          media={<HeroMedia />}
        />

        {/* 2 — Intro split + highlight card */}
        <SplitSection
          mediaPosition="right"
          width="contained"
          background="none"
          align="stretch"
          content={
            <>
              <EyebrowLabel icon={<GitFork {...sz} />}>API</EyebrowLabel>
              <p className="text-heading-sm text-text-primary">
                Our open source models are used by over a million scientists as part of thousands of pipelines.
                {'\n\n'}
                With the Boltz API you can integrate our most powerful models running on our high-performance
                compute into your internal pipeline in new, more accessible ways.
              </p>
            </>
          }
          media={<HighlightCard />}
        />

        {/* 3 — Use Cases */}
        <UseCasesSection />

        {/* 4 — Integrations */}
        <IntegrationsSection
          eyebrowIcon={<Puzzle {...sz} />}
          eyebrow="Integrations"
          heading="We've partnered with the leading life science software companies, agentic startups and AI labs so that you can run Boltz models from wherever you work today"
          cta="Get access"
          secondaryCta="See all the Integrations"
          integrations={[
            { iconBg: 'bg-[#d77655]',       name: 'Claude Code',       description: 'Run Boltz models from Claude agents', iconSrc: '/favicon.svg' },
            { iconBg: 'bg-surface-secondary', name: 'OpenAI Codex',    description: 'Integrate with OpenAI pipelines',     iconSrc: '/favicon.svg' },
            { iconBg: 'bg-[#000cb5]',        name: 'Benchling',        description: 'Embed predictions in your ELN',       iconSrc: '/favicon.svg' },
            { iconBg: 'bg-[#f2f1e7]',        name: 'Biomni IBE',       description: 'Agentic biomolecular workflows',      iconSrc: '/favicon.svg' },
            { iconBg: 'bg-surface-secondary', name: 'Edison Scientific', description: 'Scientific data pipelines',         iconSrc: '/favicon.svg' },
            { iconBg: 'bg-[#f2f2f2]',        name: 'Mirror Physics',   description: 'Physics-informed ML workflows',       iconSrc: '/favicon.svg' },
          ]}
        />

        {/* 5 — Model accordion */}
        <ModelAccordion
          eyebrowIcon={<Atom {...sz} />}
          eyebrow="Our models"
          heading="We're creating top models for all molecule sizes."
          cta="View all models"
          models={models}
          media={
            <img
              src={PROTEIN}
              alt="Protein structure render"
              className="w-[500px] max-w-none"
            />
          }
        />

        {/* 6 — Pricing */}
        <PricingSection
          eyebrow="Pricing"
          eyebrowIcon={<Code {...sz} />}
          heading="Our API is the best place to run Boltz models on drug development tasks"
          tabs={pricingTabs}
        />

        {/* 7 — Community */}
        <CommunitySection
          eyebrowIcon={<Community {...sz} />}
          eyebrow="Community"
          heading="Boltz models are used by over 8M scientists spanning biotech, biopharma, agriculture, and academia"
          caseStudies={[
            {
              logo: <PfizerLogo />,
              heading: "How Pfizer scientists are using Boltz's platform across large and small molecule discovery",
              cta: 'Read more',
              image: (
                <img
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80"
                  alt="Lab scientist"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ),
            },
          ]}
          stats={communityStats}
          ctas={[
            {
              title: 'Partner with us',
              body: 'We partner with pioneering teams to tackle the most challenging problems in drug discovery. Reach out to explore how we can accelerate your research.',
              cta: 'Get in touch',
            },
            {
              title: 'Join our team',
              body: "We're building a world-class team to push the boundaries of AI-driven drug discovery. See our open positions and help us shape the future of medicine.",
              cta: 'View open roles',
            },
          ]}
        />
      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
