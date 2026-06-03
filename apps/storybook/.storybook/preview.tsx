import type { Preview } from '@storybook/react-vite';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { breakpoint, grid } from '@boltz/tokens';
import '@boltz/tokens/tokens.css';
import '../src/global.css';

// ── Responsive viewports ────────────────────────────────────────────────────────
// Storybook 9 ships the viewport tool in core (no separate addon). We register
// Boltz's own breakpoints (from @boltz/tokens) first, then the standard device
// presets, so the toolbar can test layouts at the real design-system widths.
const boltzViewports = {
  'boltz-mobile': {
    name: `Boltz — Mobile (${breakpoint.mobile})`,
    styles: { width: breakpoint.mobile, height: '900px' },
    type: 'mobile',
  },
  'boltz-tablet': {
    name: `Boltz — Tablet (${breakpoint.tablet})`,
    styles: { width: breakpoint.tablet, height: '1000px' },
    type: 'tablet',
  },
  'boltz-laptop': {
    name: `Boltz — Laptop (${breakpoint.laptop})`,
    styles: { width: breakpoint.laptop, height: '900px' },
    type: 'desktop',
  },
  'boltz-container': {
    name: `Boltz — Container max (${grid.containerMax})`,
    styles: { width: grid.containerMax, height: '900px' },
    type: 'desktop',
  },
} as const;

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'surface-primary',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'surface-primary', value: '#FBFAF7' },
        { name: 'surface-secondary', value: '#F0EFEC' },
        { name: 'sage-pale', value: '#EDF7ED' },
        { name: 'sage-light', value: '#D9EED9' },
        { name: 'blue-pale', value: '#EEF6FA' },
        { name: 'tierra-100', value: '#F7F2E9' },
        // surface-card-dark removed from the switcher — no dark mode yet.
        // Dark-surface component variants + their per-story backdrop still exist.
      ],
    },

    // ── Responsive testing (core viewport tool) ──────────────────────────────
    viewport: {
      options: {
        ...boltzViewports,
        ...MINIMAL_VIEWPORTS,
      },
    },

    // ── Accessibility testing (@storybook/addon-a11y) ────────────────────────
    // `test: 'todo'` surfaces axe-core violations in the a11y panel and the
    // test widget without failing the build — appropriate while the system is
    // still being built. Switch to 'error' once components are stable to gate CI.
    a11y: {
      test: 'todo',
      config: {
        rules: [
          // Boltz canvases are warm/low-contrast by design; keep contrast on so
          // we catch genuine failures, but it's the rule we tune most often.
          { id: 'color-contrast', enabled: true },
        ],
      },
    },

    // ── Props / attribute controls (core controls tool) ──────────────────────
    // Controls are auto-generated from each component's TypeScript props via
    // react-docgen-typescript (see .storybook/main.ts). `expanded` shows the
    // description + default columns; matchers infer color/date editors.
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    layout: 'centered',
    options: {
      storySort: {
        order: [
          '00-overview',
          '01-foundations',
          '02-components',
          '04-sections',
          '05-screens',
        ],
      },
    },
  },

  // Start unconstrained; the viewport toolbar lets you switch to any preset above.
  initialGlobals: {
    viewport: { value: undefined, isRotated: false },
  },
};

export default preview;
