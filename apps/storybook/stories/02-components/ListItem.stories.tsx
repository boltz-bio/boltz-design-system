import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListItem, ListItemApp, ListItemTab, ListItemTabGroup } from '@boltz/ui';
import * as AllIcons from 'iconoir-react';
import React, { useState } from 'react';

const sz = { width: 48, height: 48, strokeWidth: 1 } as const;

// Placeholder image URLs — replace with real app icon images
// e.g. iconSrc="/icons/claude-code.png" or iconSrc={claudeCodeIcon}
const PLACEHOLDER_ICON = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"%3E%3Crect width="54" height="54" fill="none"/%3E%3Cpath d="M27 10L38 38H16L27 10Z" fill="white" fill-opacity="0.9"/%3E%3C/svg%3E';

const meta = {
  title: '02-Components/ListItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Three variants for presenting features, integrations, and navigation items in a vertical list.

| Variant | Use case | Gap between items |
|---|---|---|
| **ListItem** (icon) | Feature lists, capability overviews | \`gap-[56px]\` |
| **ListItemApp** (app icon) | Integration listings, SDK entries | \`gap-[24px]\` |
| **ListItemTab** (clickable) | Tab selectors, navigation rows | flush (no gap) |
        `.trim(),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ── List item with icon ───────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'List item with icon',
  parameters: {
    docs: {
      description: {
        story: 'A 48×48 Iconoir icon alongside a `heading-sm` title and `body-md` description. Stack multiple with `gap-[56px]`. Pass any of the 1,672 Iconoir icons — always use `width={48} height={48} strokeWidth={1}`.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-[56px] max-w-[560px]">
      <ListItem
        icon={<AllIcons.Microscope {...sz} />}
        heading="Structure prediction"
        description="A python CLI for running our most powerful models without leaving your notebook."
      />
      <ListItem
        icon={<AllIcons.Dna {...sz} />}
        heading="Molecular generation"
        description="Generate novel small molecules optimised for binding affinity and ADME properties."
      />
      <ListItem
        icon={<AllIcons.Cpu {...sz} />}
        heading="Platform infrastructure"
        description="Low-latency APIs with autoscaling, full observability, and enterprise-grade security."
      />
    </div>
  ),
};

export const WithIconSingle: Story = {
  name: 'List item with icon — single',
  render: () => (
    <div className="max-w-[560px]">
      <ListItem
        icon={<AllIcons.Microscope {...sz} />}
        heading="Structure prediction"
        description="A python CLI for running our most powerful models without leaving your notebook."
      />
    </div>
  ),
};

export const WithIconExamples: Story = {
  name: 'List item with icon — icon examples',
  render: () => (
    <div className="flex flex-col gap-[56px] max-w-[560px]">
      {([
        [AllIcons.Microscope,    'Microscope'],
        [AllIcons.Flask,         'Flask'],
        [AllIcons.BrainResearch, 'BrainResearch'],
        [AllIcons.Rocket,        'Rocket'],
      ] as const).map(([Icon, name]) => (
        <ListItem
          key={name}
          icon={<Icon {...sz} />}
          heading={name}
          description="Pass any Iconoir icon at width={48} height={48} strokeWidth={1}."
        />
      ))}
    </div>
  ),
};

// ── List item with app icon ───────────────────────────────────────────────────

export const WithAppIcon: Story = {
  name: 'List item with app icon',
  parameters: {
    docs: {
      description: {
        story: 'A 77×77 coloured rounded square (radius 10px) with an uploaded image inside. Use `iconBg` for the square background colour and `iconSrc` for the image URL. Title renders as `body-md`, description as `body-sm`. Stack with `gap-[24px]`.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-[24px] max-w-[400px]">
      <ListItemApp
        iconBg="bg-[#d77655]"
        iconSrc={PLACEHOLDER_ICON}
        iconAlt="Claude Code"
        heading="Claude Code"
        description="Call Boltz models from your favorite agents"
      />
      <ListItemApp
        iconBg="bg-sage-dark"
        iconSrc={PLACEHOLDER_ICON}
        iconAlt="Boltz Lab"
        heading="Boltz Lab"
        description="Interactive structure prediction in the browser"
      />
      <ListItemApp
        iconBg="bg-blue-dark"
        iconSrc={PLACEHOLDER_ICON}
        iconAlt="Python SDK"
        heading="Python SDK"
        description="Integrate Boltz models directly in your pipeline"
      />
    </div>
  ),
};

export const WithAppIconColours: Story = {
  name: 'List item with app icon — colour variants',
  render: () => (
    <div className="flex flex-col gap-[24px] max-w-[400px]">
      {([
        ['bg-[#d77655]',     'Orange   — bg-[#d77655]'],
        ['bg-sage-dark',     'Forest green — bg-sage-dark'],
        ['bg-blue-dark',     'Navy — bg-blue-dark'],
        ['bg-action-primary','Black — bg-action-primary'],
        ['bg-[#7B61FF]',     'Purple — bg-[#7B61FF]'],
      ] as const).map(([bg, label]) => (
        <ListItemApp
          key={bg}
          iconBg={bg}
          iconSrc={PLACEHOLDER_ICON}
          iconAlt="App icon"
          heading="App name"
          description={label}
        />
      ))}
    </div>
  ),
};

// ── List item tab ─────────────────────────────────────────────────────────────

const TAB_ITEMS = [
  { icon: AllIcons.Microscope, heading: 'De Novo Binder Design',  description: 'A python CLI for running our most powerful models without leaving your notebook.' },
  { icon: AllIcons.Dna,        heading: 'Virtual Screen',          description: 'A python CLI for running our most powerful models without leaving your notebook.' },
  { icon: AllIcons.Cpu,        heading: 'Structure Prediction',    description: 'A python CLI for running our most powerful models without leaving your notebook.' },
];

export const WithTab: Story = {
  name: 'List item tab — interactive',
  parameters: {
    docs: {
      description: {
        story: 'Animated sliding background via `ListItemTabGroup`. The tierra-100 pill slides to the active item on press. Inactive items are at 80% opacity; hover shows tierra-50.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <ListItemTabGroup
        className="max-w-[480px]"
        active={active}
        onActiveChange={setActive}
        items={TAB_ITEMS.map(({ icon: Icon, heading, description }) => ({
          icon: <Icon {...sz} />,
          heading,
          description,
        }))}
      />
    );
  },
};

export const WithTabStates: Story = {
  name: 'List item tab — all states',
  parameters: {
    docs: {
      description: {
        story: 'The three visual states side by side. Hover over the enabled/active items to see the blue-pale hover fill.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col max-w-[480px]">
      <div className="text-body-sm text-text-muted mb-sm">Enabled (default)</div>
      <ListItemTab
        icon={<AllIcons.Microscope {...sz} />}
        heading="De Novo Binder Design"
        description="A python CLI for running our most powerful models without leaving your notebook."
      />
      <div className="text-body-sm text-text-muted mt-md mb-sm">Active</div>
      <ListItemTab
        icon={<AllIcons.Dna {...sz} />}
        heading="Virtual Screen"
        description="A python CLI for running our most powerful models without leaving your notebook."
        active
      />
      <div className="text-body-sm text-text-muted mt-md mb-sm">Hover — hover over the item above to see</div>
      <ListItemTab
        icon={<AllIcons.Cpu {...sz} />}
        heading="Structure Prediction"
        description="A python CLI for running our most powerful models without leaving your notebook."
      />
    </div>
  ),
};

// ── Both variants ─────────────────────────────────────────────────────────────

export const BothVariants: Story = {
  name: 'Both variants',
  render: () => (
    <div className="grid grid-cols-2 gap-xl max-w-container">
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-lg">List item with icon</p>
        <div className="flex flex-col gap-[56px]">
          <ListItem icon={<AllIcons.Microscope {...sz} />} heading="Structure prediction" description="A python CLI for running our most powerful models without leaving your notebook." />
          <ListItem icon={<AllIcons.Dna {...sz} />} heading="Molecular generation" description="Generate novel small molecules optimised for binding affinity and ADME properties." />
          <ListItem icon={<AllIcons.Cpu {...sz} />} heading="Platform infrastructure" description="Low-latency APIs with autoscaling and enterprise-grade security." />
        </div>
      </div>
      <div>
        <p className="text-body-sm text-text-muted uppercase tracking-widest mb-lg">List item with app icon</p>
        <div className="flex flex-col gap-[24px]">
          <ListItemApp iconBg="bg-[#d77655]" iconSrc={PLACEHOLDER_ICON} iconAlt="Claude Code" heading="Claude Code" description="Call Boltz models from your favorite agents" />
          <ListItemApp iconBg="bg-sage-dark" iconSrc={PLACEHOLDER_ICON} iconAlt="Boltz Lab" heading="Boltz Lab" description="Interactive structure prediction in the browser" />
          <ListItemApp iconBg="bg-blue-dark" iconSrc={PLACEHOLDER_ICON} iconAlt="Python SDK" heading="Python SDK" description="Integrate Boltz models directly in your pipeline" />
        </div>
      </div>
    </div>
  ),
};
