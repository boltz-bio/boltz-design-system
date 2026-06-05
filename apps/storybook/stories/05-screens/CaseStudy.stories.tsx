import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, Button, TextButton, Badge,
  CardWide, CodeBlock, PricingSection, Footer,
  placeholderImage,
} from '@boltz/ui';
import { ArrowLeft, Code, Leaf } from 'iconoir-react';
import { navItems } from '../_data/boltz';

// Example long-form article / case-study page (Figma node 76:921). Assembled
// ONLY from existing @boltz/ui exports + fixtures. The article prose (subheads
// and paragraphs) is plain token-styled markup constrained to `max-w-body`;
// full-width bands use `max-w-container mx-auto px-md tablet:px-40`.

const meta = {
  title: '05-Screens/Case study',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'A full responsive case-study / article page composed from the NavBar, an article header, a CardWide hero, token-styled prose sections, a tabbed CodeBlock, a PricingSection comparison, a closing image, a CTA row, and the Footer. Use it as a reference for long-form editorial layout.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// Tabbed code sample for the CodeBlock — Python / REST API / Agentic.
const codeTabs = [
  {
    label: 'Python',
    code: `from boltz import Lab

lab = Lab(api_key="sk-...")
job = lab.predict(
    sequence="MKTAYIAKQR...",
    model="boltz-prot-1.1",
)
print(job.structure.pdb)`,
  },
  {
    label: 'REST API',
    code: `curl https://api.boltz.bio/v1/predict \\
  -H "Authorization: Bearer $BOLTZ_KEY" \\
  -d '{
    "sequence": "MKTAYIAKQR...",
    "model": "boltz-prot-1.1"
  }'`,
  },
  {
    label: 'Agentic',
    code: `agent = lab.agent("design-binder")
result = agent.run(
    target="EGFR",
    budget="$500",
    objective="affinity",
)
result.plan.show()`,
  },
];

// Pricing / comparison tabs for the PricingSection.
const pricingTabs = [
  {
    icon: <Leaf {...sz} />,
    title: 'Structure prediction',
    body: 'Atomic-resolution folds, billed per residue.',
    header: { label: 'Per 1k predictions', value: '$0.12' },
    items: [
      { label: 'Boltz Lab', cost: { display: '$0.12', value: 12 } },
      { label: 'Legacy pipeline', cost: { display: '$0.94', value: 94 } },
      { label: 'In-house cluster', cost: { display: '$1.60', value: 160 } },
    ],
  },
  {
    icon: <Code {...sz} />,
    title: 'Agentic design',
    body: 'Multi-step binder design loops, billed per run.',
    header: { label: 'Per design run', value: '$48' },
    items: [
      { label: 'Boltz Lab', cost: { display: '$48', value: 48 } },
      { label: 'Manual workflow', cost: { display: '$310', value: 310 } },
      { label: 'External CRO', cost: { display: '$1,200', value: 1200 } },
    ],
  },
];

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const CaseStudy: Story = {
  render: () => (
    <div className="bg-surface-primary min-h-screen">
      {/* 1 — Nav */}
      <NavBar>
        {navItems.map((n) => (
          <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>
        ))}
      </NavBar>

      <main>
        {/* 2 — Article header */}
        <section className="w-full pt-2xl pb-xl">
          <div className="max-w-body mx-auto px-md tablet:px-40 flex flex-col gap-lg">
            <TextButton className="self-start">
              <ArrowLeft {...sz} /> Back
            </TextButton>
            <div className="flex items-center gap-sm">
              <Badge variant="primary">Product</Badge>
              <span className="text-body-sm text-text-secondary">October 26th, 2025</span>
            </div>
            <h1 className="text-heading-lg text-text-primary">
              Announcing Boltz Lab and our first agents
            </h1>
            <p className="text-body-sm text-text-secondary">Written by The Boltz Team</p>
          </div>
        </section>

        {/* 3 — Hero / feature card */}
        <section className="w-full pb-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40">
            <CardWide
              eyebrowIcon={<Leaf {...sz} />}
              eyebrowLabel="Announcing"
              heading="Boltz Lab"
              body="A unified workspace where prediction, design, and validation run as production infrastructure — not a notebook."
              cta="Get early access"
              image={
                <img
                  src="/boltz-protein.png"
                  alt="Boltz protein render"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              }
            />
          </div>
        </section>

        {/* 4 — Lead / summary */}
        <section className="w-full pb-xl">
          <div className="max-w-body mx-auto px-md tablet:px-40">
            <p className="text-body-lg text-text-secondary">
              Today we are introducing Boltz Lab, along with our first generation of
              biomolecular design agents. Breakthrough models only matter if they reach
              the bench, so we built Lab to close the gap between a prediction and a
              testable hypothesis — at the throughput a modern discovery team needs.
            </p>
          </div>
        </section>

        {/* 5 — Article body */}
        <article className="w-full pb-2xl">
          <div className="max-w-body mx-auto px-md tablet:px-40 flex flex-col gap-2xl">
            <section className="flex flex-col gap-md">
              <h2 className="text-heading-md text-text-primary">Introducing Boltz Lab</h2>
              <p className="text-body-md text-text-secondary">
                Breakthrough models only matter if they change what a scientist can do
                tomorrow morning. Boltz Lab packages our structure and small-molecule
                models behind a single, predictable interface — the same one our internal
                teams use — so you can move from sequence to candidate without managing
                GPUs, queues, or glue code.
              </p>
              <p className="text-body-md text-text-secondary">
                Every prediction is reproducible and versioned. Pin a model, and your
                results stay stable for the life of a project, even as the underlying
                weights continue to improve in the background.
              </p>
            </section>

            {/* Figure between sections */}
            <figure className="flex flex-col gap-sm">
              <img
                src={placeholderImage('boltz-lab-workspace', 1280, 640)}
                alt="Boltz Lab workspace"
                className="w-full rounded-lg aspect-[2/1] object-cover"
              />
              <figcaption className="text-body-sm text-text-muted">
                The Boltz Lab workspace — predictions, designs, and runs in one place.
              </figcaption>
            </figure>

            <section className="flex flex-col gap-md">
              <h2 className="text-heading-md text-text-primary">Agents that close the loop</h2>
              <p className="text-body-md text-text-secondary">
                Our first agents wrap the models in an objective-driven loop: give them a
                target and a budget, and they plan, predict, score, and refine candidates
                until they converge. Each step is transparent and auditable, so you can
                inspect the reasoning and intervene whenever you want.
              </p>
              <p className="text-body-md text-text-secondary">
                Because the agents run on the same infrastructure as the API, a workflow
                you prototype interactively scales to thousands of parallel designs without
                a rewrite.
              </p>
            </section>

            <section className="flex flex-col gap-md">
              <h2 className="text-heading-md text-text-primary">Built for production</h2>
              <p className="text-body-md text-text-secondary">
                Lab is built on the infrastructure that already serves over a million
                scientists. Predictable latency, throughput guarantees, and a single bill
                replace the operational overhead of running frontier models yourself.
              </p>
            </section>
          </div>
        </article>

        {/* 6 — Code example with tabs */}
        <section className="w-full pb-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40">
            <CodeBlock color="sage" contained tabs={codeTabs} />
          </div>
        </section>

        {/* 7 — Pricing / comparison */}
        <PricingSection
          eyebrow="Pricing"
          eyebrowIcon={<Code {...sz} />}
          heading="A fraction of the cost of building it yourself."
          tabs={pricingTabs}
        />

        {/* 8 — Closing image */}
        <section className="w-full pb-2xl">
          <div className="max-w-container mx-auto px-md tablet:px-40">
            <img
              src={placeholderImage('boltz-lab-closing', 1600, 900)}
              alt="Boltz Lab in production"
              className="w-full rounded-lg aspect-[16/9] object-cover"
            />
          </div>
        </section>

        {/* 9 — CTA row */}
        <section className="w-full pb-2xl">
          <div className="max-w-body mx-auto px-md tablet:px-40 flex flex-wrap items-center gap-md">
            <Button variant="black">Get access</Button>
            <TextButton arrow>Read technical report</TextButton>
          </div>
        </section>

        {/* 10 — Social links row */}
        <section className="w-full pb-2xl">
          <div className="max-w-body mx-auto px-md tablet:px-40 flex flex-wrap items-center gap-lg border-t border-border-light pt-lg">
            <span className="text-body-sm text-text-muted">Share</span>
            <a href="#" className="text-body-sm text-text-primary">Github</a>
            <a href="#" className="text-body-sm text-text-primary">LinkedIn</a>
            <a href="#" className="text-body-sm text-text-primary">Slack</a>
          </div>
        </section>
      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
