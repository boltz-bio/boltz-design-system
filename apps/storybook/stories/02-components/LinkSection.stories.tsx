import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkSection, LinkSectionRow } from '@boltz/ui';

const meta = {
  title: '02-Components/LinkSection',
  component: LinkSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof LinkSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Data-driven ───────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <LinkSection
      items={[
        {
          heading: 'Partner with us',
          body: 'We partner with pioneering teams to tackle the most challenging problems in drug discovery.',
          cta: 'Get in touch',
          href: '#',
        },
        {
          heading: 'Join our team',
          body: "We are building a world-class team to push the boundaries of AI-driven drug discovery.",
          cta: 'View open roles',
          href: '#',
        },
      ]}
    />
  ),
};

// ── Composable ────────────────────────────────────────────────────────────────

export const Composable: Story = {
  name: 'Composable — LinkSectionRow',
  render: () => (
    <LinkSection>
      <LinkSectionRow
        heading="Partner with us"
        body="We partner with pioneering teams to tackle the most challenging problems in drug discovery."
        cta="Get in touch"
        href="#"
      />
      <LinkSectionRow
        heading="Join our team"
        body="We're building a world-class team to push the boundaries of AI-driven drug discovery."
        cta="View open roles"
        href="#"
      />
    </LinkSection>
  ),
};

// ── Three rows ────────────────────────────────────────────────────────────────

export const ThreeRows: Story = {
  render: () => (
    <LinkSection>
      <LinkSectionRow
        heading="Partner with us"
        body="We partner with pioneering teams to tackle the most challenging problems in drug discovery."
        cta="Get in touch"
        href="#"
      />
      <LinkSectionRow
        heading="Enterprise plans"
        body="Private deployment, HIPAA-ready infrastructure, and dedicated model endpoints for regulated industries."
        cta="Talk to sales"
        href="#"
      />
      <LinkSectionRow
        heading="Join our team"
        body="We're building a world-class team to push the boundaries of AI-driven drug discovery."
        cta="View open roles"
        href="#"
      />
    </LinkSection>
  ),
};

// ── No body text ─────────────────────────────────────────────────────────────

export const HeadingOnly: Story = {
  render: () => (
    <LinkSection>
      <LinkSectionRow heading="Partner with us" cta="Get in touch" href="#" />
      <LinkSectionRow heading="Join our team" cta="View open roles" href="#" />
    </LinkSection>
  ),
};
