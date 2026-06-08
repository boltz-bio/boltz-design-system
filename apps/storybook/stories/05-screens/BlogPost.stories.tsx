import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, NavCta, Button, TextButton, Badge, IconButton,
  BlogThumbnail, NewsGrid, Footer, placeholderImage,
} from '@boltz/ui';
import { ArrowLeft, Linkedin, Twitter, Link } from 'iconoir-react';
import { articles, navItems } from '../_data/boltz';

const meta = {
  title: '05-Screens/Blog post',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'A responsive blog-post article page. White background, left-aligned article header with category/date badges, BlogThumbnail hero, summary + CTA split, and article prose.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const szSm = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const szMd = { width: 16, height: 16, strokeWidth: 1.5 } as const;

const PROTEIN = '/Small Molecule - Binder 01 - V2 1.png';

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

export const BlogPost: Story = {
  render: () => (
    <div className="bg-white min-h-screen">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#" active={n === 'News'}>{n}</NavLink>)}
        <NavCta>Get early access</NavCta>
      </NavBar>

      <main>
        {/* Article header */}
        <section className="max-w-container mx-auto px-md tablet:px-40 pt-2xl pb-lg">
          <div className="max-w-body mx-auto flex flex-col gap-lg">

            {/* Back */}
            <TextButton className="self-start" onClick={() => window.history.back()}>
              <ArrowLeft {...szSm} />
              Back
            </TextButton>

            {/* Category + date */}
            <div className="flex items-center gap-0">
              <Badge variant="outlined">Product</Badge>
              <Badge variant="outlined">October 26th, 2025</Badge>
            </div>

            {/* Title */}
            <h1 className="text-heading-lg text-text-primary">
              Announcing Boltz Lab and our first agents
            </h1>

            {/* Author + social links */}
            <div className="flex items-center justify-between">
              <p className="text-body-sm text-text-muted">Written by The Boltz Team</p>
              <div className="flex items-center gap-xs">
                {[
                  { icon: <Linkedin {...szMd} />, label: 'LinkedIn' },
                  { icon: <Twitter {...szMd} />, label: 'X / Twitter' },
                  { icon: <Link {...szMd} />, label: 'Copy link' },
                ].map(({ icon, label }) => (
                  <IconButton key={label} aria-label={label} size="xs" variant="ghost">
                    {icon}
                  </IconButton>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BlogThumbnail hero */}
        <section className="max-w-container mx-auto px-md tablet:px-40 pb-xl">
          <div className="max-w-body mx-auto">
            <BlogThumbnail
              tone="blue"
              category="product-launch"
              title="Boltz Lab"
              renderSrc={PROTEIN}
              blobShape={11}
            />
          </div>
        </section>

        {/* Summary + CTA */}
        <section className="max-w-container mx-auto px-md tablet:px-40 pb-2xl">
          <div className="max-w-body mx-auto flex flex-col gap-xl laptop:flex-row laptop:gap-2xl laptop:items-start">
            <p className="text-body-lg text-text-secondary flex-1">
              Summary text.... Boltzgen is a new state-of-the-art model for protein binder
              design built on Boltz-2. In a technical report we show high success rates on a
              wide range of targets including enzymes, small molecules and proteins with
              highly disordered regions.
            </p>
            <div className="flex flex-col gap-md flex-shrink-0">
              <Button variant="black" suffix="arrow-icon">Get access</Button>
              <TextButton>Read technical report</TextButton>
            </div>
          </div>
        </section>

        {/* Article prose */}
        <article className="max-w-container mx-auto px-md tablet:px-40 pb-2xl">
          <div className="max-w-body mx-auto flex flex-col gap-2xl">
            <div className="flex flex-col gap-md">
              <h2 className="text-heading-md text-text-primary">Introducing Boltz Lab</h2>
              <p className="text-body-md text-text-secondary">
                Breakthrough models only matter if they can be turned into reliable tools that
                do real drug discovery work: tools built for chemists and biologists, embedded
                in their workflows, and supported as production-grade systems. We founded Boltz
                PBC to make frontier biomolecular AI accessible to more scientists.
              </p>
              <p className="text-body-md text-text-secondary">
                Today, we're taking the first step on that roadmap with the launch of Boltz Lab,
                our platform, and its first agents for small-molecule and protein design. Boltz
                Lab combines state-of-the-art models and agents with cost-efficient compute,
                scalable, robust infrastructure, and intuitive, collaborative interfaces.
              </p>
            </div>

            {/* Inline figure */}
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
                Our first agents are scoped to the parts of the workflow that are tedious but
                high-leverage: proposing candidate sequences, running batched predictions, and
                ranking outputs against your acceptance criteria.
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
