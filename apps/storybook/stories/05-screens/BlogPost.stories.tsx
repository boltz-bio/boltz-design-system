import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, NavCta, Button, TextButton, Badge,
  CardWide, NewsGrid, Footer, placeholderImage, EyebrowLabel,
} from '@boltz/ui';
import { ArrowLeft, BookStack } from 'iconoir-react';
import { articles, navItems } from '../_data/boltz';

// Example Blog post page — a single article view assembled from existing @boltz/ui
// exports + fixtures. Mirrors Figma "Blog post" (node 57:2879): a shorter sibling of
// the case-study layout. Prose is token-styled markup (heading-md subheads, body-md
// secondary paragraphs); full-width sections use the standard container, while the
// reading column is capped at `max-w-body`.

const meta = {
  title: '05-Screens/Blog post',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'surface-primary' },
    docs: {
      description: {
        component:
          'A responsive blog-post article page built from the NavBar, an article header, a tinted hero feature block (CardWide), token-styled prose, an inline figure, a CTA row, a related NewsGrid, and the Footer. Use it as the reference for the long-form reading layout.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz = { width: 14, height: 14, strokeWidth: 1.5 } as const;

// Real footer links per Figma 58:379 — plain lists, no column titles.
const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const BlogPost: Story = {
  render: () => (
    <div className="bg-surface-primary min-h-screen">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>)}
        <NavCta>Get early access</NavCta>
      </NavBar>

      <main>
        {/* 2 — Article header (centered, capped at the reading column) */}
        <section className="max-w-container mx-auto px-md tablet:px-40 pt-2xl">
          <div className="max-w-body mx-auto flex flex-col gap-lg">
            <TextButton className="self-start" onClick={() => window.history.back()}>
              <ArrowLeft {...sz} />
              Back
            </TextButton>

            <div className="flex flex-col gap-md items-center text-center">
              <div className="flex items-center gap-sm">
                <Badge variant="primary">Product</Badge>
                <span className="text-body-sm text-text-muted">October 26th, 2025</span>
              </div>
              <h1 className="text-heading-lg text-text-primary">
                Announcing Boltz Lab and our first agents
              </h1>
              <p className="text-body-sm text-text-muted">Written by The Boltz Team</p>
            </div>
          </div>
        </section>

        {/* 3 — Hero feature block (Frame 3466214 — tinted CardWide with image) */}
        <section className="max-w-container mx-auto px-md tablet:px-40 py-xl">
          <div className="max-w-body mx-auto">
            <CardWide
              eyebrowIcon={<BookStack {...sz} />}
              eyebrowLabel="Boltz Lab"
              heading="Announcing Boltz Lab"
              body="An end-to-end environment for designing, running, and iterating on biomolecular experiments — with agents that do the heavy lifting."
              cta="Get access"
              image={
                <img
                  src="/boltz-protein.png"
                  alt="Boltz Lab protein render"
                  className="w-full h-full object-cover"
                />
              }
            />
          </div>
        </section>

        {/* 4 — Summary lead paragraph */}
        <section className="max-w-container mx-auto px-md tablet:px-40">
          <div className="max-w-body mx-auto">
            <p className="text-body-lg text-text-secondary">
              Today we are introducing Boltz Lab, a workspace where research teams move
              from a target to a validated design without leaving the platform. Alongside
              it, our first generation of agents can plan campaigns, run predictions, and
              triage results — turning weeks of manual iteration into hours.
            </p>
          </div>
        </section>

        {/* 5 — Article body: two subsections of prose */}
        <article className="max-w-container mx-auto px-md tablet:px-40 py-2xl">
          <div className="max-w-body mx-auto flex flex-col gap-2xl">
            <div className="flex flex-col gap-md">
              <h2 className="text-heading-md text-text-primary">Introducing Boltz Lab</h2>
              <p className="text-body-md text-text-secondary">
                Boltz Lab brings structure prediction, docking, and analysis into one
                connected surface. Instead of stitching together notebooks, queues, and
                spreadsheets, teams describe what they want to learn and the Lab assembles
                the pipeline — versioned, reproducible, and shareable by default.
              </p>
              <p className="text-body-md text-text-secondary">
                Every run is backed by the same production inference that powers our API,
                so what you prototype in the Lab behaves identically when you scale it out.
                Results are first-class objects you can compare, annotate, and hand off to
                an agent for the next iteration.
              </p>
            </div>

            {/* 6 — Inline figure */}
            <figure className="flex flex-col gap-sm">
              <img
                src={placeholderImage('boltz-lab-workspace', 1280, 720)}
                alt="The Boltz Lab workspace"
                className="w-full aspect-[16/9] object-cover rounded-lg"
              />
              <figcaption className="text-body-sm text-text-muted">
                The Boltz Lab workspace — campaigns, runs, and agent activity in one view.
              </figcaption>
            </figure>

            <div className="flex flex-col gap-md">
              <h2 className="text-heading-md text-text-primary">Agents that do the work</h2>
              <p className="text-body-md text-text-secondary">
                Our first agents are scoped to the parts of the workflow that are tedious
                but high-leverage: proposing candidate sequences, running batched
                predictions, and ranking outputs against your acceptance criteria. They
                operate inside the Lab with full provenance, so every decision is auditable.
              </p>
              <p className="text-body-md text-text-secondary">
                You stay in control. Agents draft plans you can edit, pause, or rerun, and
                they surface their reasoning alongside the artifacts they produce. As the
                models improve, the same interface gets more capable without changing how
                your team works.
              </p>
            </div>
          </div>
        </article>

        {/* 7 — CTA row */}
        <section className="max-w-container mx-auto px-md tablet:px-40 pb-2xl">
          <div className="max-w-body mx-auto flex flex-wrap items-center gap-md">
            <Button variant="black">Get access</Button>
            <TextButton arrow>Read technical report</TextButton>
          </div>
        </section>

        {/* 8 — Related articles */}
        <section className="max-w-container mx-auto px-md tablet:px-40">
          <div className="max-w-body mx-auto">
            <EyebrowLabel icon={<BookStack {...sz} />}>Related</EyebrowLabel>
          </div>
        </section>
        <NewsGrid items={articles} filterable={false} className="pt-lg" />
      </main>

      {/* 9 — Social links row + Footer */}
      <div className="max-w-container mx-auto px-md tablet:px-40 pb-xl">
        <div className="max-w-body mx-auto flex items-center gap-md border-t border-border-light pt-lg">
          <span className="text-body-sm text-text-muted">Share</span>
          <TextButton arrow>LinkedIn</TextButton>
          <TextButton arrow>Github</TextButton>
          <TextButton arrow>Slack</TextButton>
        </div>
      </div>

      <Footer columns={footerColumns} />
    </div>
  ),
};
