import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar, NavLink } from '@boltz/ui';

const meta = {
  title: '02-Components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
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
