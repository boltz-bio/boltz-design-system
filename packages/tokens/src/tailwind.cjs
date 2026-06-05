// Boltz Tailwind preset — generated from tokens.ts.
// Apps consume via: `presets: [require('@boltz/tokens/tailwind')]`

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // Boltz breakpoints (from tokens.ts `breakpoint`). Enables responsive
    // utilities, e.g. `tablet:flex`, `laptop:grid-cols-12`, `mobile:hidden`.
    screens: {
      mobile: '768px',
      tablet: '1024px',
      laptop: '1328px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#232323',
      surface: {
        // ── Neutral canvas ─────────────────────────────────────
        primary:    '#FBFAF7',   // warm cream — default page canvas
        secondary:  '#F0EFEC',   // slightly cool grey
        tertiary:   '#E8E7E3',
        'card-light': '#FFFFFF',
        'card-blue':  '#EEF6FA',
        'card-dark':  '#232323',
        white:      '#FFFFFF',
        black:      '#232323',
        // ── Sage family ────────────────────────────────────────
        'sage-dark':   '#003014',
        'sage-medium': '#C6E5C6',
        'sage-light':  '#D9EED9',
        'sage-pale':   '#EDF7ED',
        // ── Blue family ────────────────────────────────────────
        'blue-dark':   '#142D36',
        'blue-medium': '#C7E3EE',
        'blue-light':  '#E5F2F7',
        'blue-pale':   '#EEF6FA',
        // ── Tierra family ──────────────────────────────────────
        'tierra-500':  '#DACAB0',
        'tierra-200':  '#EEE7DB',
        'tierra-100':  '#F7F2E9',
        'tierra-50':   '#FBFAF7',
      },
      text: {
        primary: '#232323',
        secondary: '#505050',
        muted: '#6E6E6E',
        'on-dark': '#FFFFFF',
      },
      action: {
        primary: '#232323',
        'primary-active': '#111111',
      },
      sage: {
        dark: '#003014',
        medium: '#C6E5C6',
        light: '#D9EED9',
        pale: '#EDF7ED',
      },
      blue: {
        dark: '#142D36',
        deep: '#165A75',   // saturated mid teal — progress/bar fill (Figma 108:404)
        medium: '#C7E3EE',
        light: '#E5F2F7',
        pale: '#EEF6FA',
      },
      tierra: {
        500: '#DACAB0',
        200: '#EEE7DB',
        100: '#F7F2E9',
        50: '#FBFAF7',
      },
      neutral: {
        'grey-500': '#505050',
        'grey-200': '#7E7E7E',
        'grey-100': '#D9D9D9',
      },
      border: {
        light: '#D9D9D9',
        warm: '#EEE7DB',
        dark: '#333333',
      },
      status: {
        error: '#CC4444',
        'error-surface': '#FDF2F2',
        warning: '#C97B22',
        'warning-surface': '#FDF6ED',
        success: '#2D7A3F',
        'success-surface': '#F0FAF2',
        info: '#2E6DA4',
        'info-surface': '#EFF5FB',
      },
    },
    spacing: {
      0: '0',
      px: '1px',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '40px',
      '2xl': '80px',
      '3xl': '120px',
      section: '160px',
      // pixel values referenced in DESIGN.md component specs:
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '9': '9px',
      '10': '10px',
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '17': '17px',
      '18': '18px',
      '20': '20px',
      '24': '24px',
      '28': '28px',
      '32': '32px',
      '36': '36px',
      '40': '40px',
      '44': '44px',
      '52': '52px',
      '56': '56px',
      '60': '60px',
    },
    borderRadius: {
      none: '0',
      sm: '6px',
      md: '10px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    },
    fontFamily: {
      sans: ['"Stabil Grotesk"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
    },
    // Font sizes are driven by CSS variables (see tokens.css) so every text-*
    // utility steps down automatically on the mobile breakpoint. Desktop values
    // are identical to before.
    fontSize: {
      'heading-lg': ['var(--font-heading-lg)', { lineHeight: 'var(--lh-heading-lg)', letterSpacing: 'var(--ls-heading-lg)' }],
      'heading-md': ['var(--font-heading-md)', { lineHeight: 'var(--lh-heading-md)', letterSpacing: 'var(--ls-heading-md)' }],
      'heading-sm': ['var(--font-heading-sm)', { lineHeight: 'var(--lh-heading-sm)', letterSpacing: 'var(--ls-heading-sm)' }],
      'body-lg': ['var(--font-body-lg)', { lineHeight: 'var(--lh-body-lg)', letterSpacing: 'var(--ls-body-lg)' }],
      'body-md': ['var(--font-body-md)', { lineHeight: 'var(--lh-body-md)', letterSpacing: 'var(--ls-body-md)' }],
      'body-sm': ['var(--font-body-sm)', { lineHeight: 'var(--lh-body-sm)', letterSpacing: 'var(--ls-body-sm)' }],
      'mono-md': ['var(--font-mono-md)', { lineHeight: 'var(--lh-mono-md)' }],
    },
    fontWeight: {
      regular: '400',
    },
    extend: {
      keyframes: {
        'accordion-open': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-close': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'content-show': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'content-hide': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to:   { opacity: '0', transform: 'translateY(4px)' },
        },
      },
      animation: {
        'accordion-open':  'accordion-open 600ms cubic-bezier(0.175, 1.4, 0.32, 1) both',
        'accordion-close': 'accordion-close 400ms cubic-bezier(0.4, 0, 0.2, 1) both',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'standard-out': 'cubic-bezier(0.0, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 1.4, 0.32, 1)',
      },
      transitionDuration: {
        fast: '100ms',
        base: '200ms',
        slow: '350ms',
        spring: '1200ms',
      },
      maxWidth: {
        container: '1328px',
        body: '740px',
        hero: '636px',
      },
      scale: {
        active: '0.97',
      },
    },
  },
  plugins: [],
};
