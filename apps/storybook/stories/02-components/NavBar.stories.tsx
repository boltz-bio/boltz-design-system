import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar, NavLink } from '@boltz/ui';

const meta = {
  title: '02-Components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The top-level site navigation bar holding the logo, NavLink items, and a call-to-action. It applies a backdrop blur as page content scrolls behind it.',
      },
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavBar>
      <NavLink href="#">Platform</NavLink>
      <NavLink href="#">API</NavLink>
      <NavLink href="#">News</NavLink>
    </NavBar>
  ),
};

export const WithActiveLink: Story = {
  render: () => (
    <NavBar>
      <NavLink href="#" active>Platform</NavLink>
      <NavLink href="#">API</NavLink>
      <NavLink href="#">News</NavLink>
    </NavBar>
  ),
};

export const NoCta: Story = {
  render: () => (
    <NavBar cta={null}>
      <NavLink href="#">Platform</NavLink>
      <NavLink href="#">API</NavLink>
      <NavLink href="#">News</NavLink>
    </NavBar>
  ),
};

export const CustomCta: Story = {
  render: () => (
    <NavBar cta="Try Boltz Lab">
      <NavLink href="#">Platform</NavLink>
      <NavLink href="#">API</NavLink>
      <NavLink href="#">News</NavLink>
      <NavLink href="#">About</NavLink>
    </NavBar>
  ),
};

export const DarkTone: Story = {
  name: 'Dark (hero overlay)',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div className="bg-surface-card-dark min-h-[120px]">
      <NavBar tone="dark">
        <NavLink href="#" tone="dark" active>Platform</NavLink>
        <NavLink href="#" tone="dark">API</NavLink>
        <NavLink href="#" tone="dark">News</NavLink>
      </NavBar>
    </div>
  ),
};
