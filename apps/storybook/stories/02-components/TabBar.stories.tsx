import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabBar, FilterTabBar, ViewToggle } from '@boltz/ui';
import React, { useState } from 'react';

const meta = {
  title: '02-Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const NAV_TABS = [
  { value: 'tab1', label: 'Tab text' },
  { value: 'tab2', label: 'Tab text' },
  { value: 'tab3', label: 'Tab text' },
  { value: 'tab4', label: 'Tab text' },
  { value: 'tab5', label: 'Tab text' },
];

const FILTER_TABS = [
  { value: 'latest',       label: 'Latest' },
  { value: 'research',     label: 'Research' },
  { value: 'platform',     label: 'Platform' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'company',      label: 'Company' },
];

// ── TabBar ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'TabBar',
  render: () => {
    const [tab, setTab] = useState('tab1');
    return (
      <div className="bg-white border border-border-light rounded-lg p-lg">
        <TabBar items={NAV_TABS} value={tab} onValueChange={setTab} />
      </div>
    );
  },
};

// ── FilterTabBar ──────────────────────────────────────────────────────────────

export const Filter: Story = {
  name: 'FilterTabBar',
  render: () => {
    const [tab, setTab] = useState('latest');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    return (
      <div className="bg-white border border-border-light rounded-lg p-lg">
        <FilterTabBar
          items={FILTER_TABS}
          value={tab}
          onValueChange={setTab}
          view={view}
          onViewChange={setView}
        />
      </div>
    );
  },
};

// ── ViewToggle standalone ─────────────────────────────────────────────────────

export const ViewToggleStory: Story = {
  name: 'ViewToggle',
  render: () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    return <ViewToggle value={view} onValueChange={setView} />;
  },
};

// ── Both variants ─────────────────────────────────────────────────────────────

export const BothVariants: Story = {
  name: 'Both variants',
  render: () => {
    const [tab1, setTab1] = useState('tab1');
    const [tab2, setTab2] = useState('latest');
    const [view, setView]  = useState<'grid' | 'list'>('grid');
    return (
      <div className="flex flex-col gap-sm">
        <div className="bg-white border border-border-light rounded-lg p-lg">
          <p className="text-body-sm text-text-muted mb-md">Tab bar</p>
          <TabBar items={NAV_TABS} value={tab1} onValueChange={setTab1} />
        </div>
        <div className="bg-white border border-border-light rounded-lg p-lg">
          <p className="text-body-sm text-text-muted mb-md">Filter tab bar (news page — tab bar + view toggle)</p>
          <FilterTabBar
            items={FILTER_TABS}
            value={tab2}
            onValueChange={setTab2}
            view={view}
            onViewChange={setView}
          />
        </div>
      </div>
    );
  },
};
