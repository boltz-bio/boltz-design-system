// Boltz Tailwind preset — generated from tokens.ts.
// Apps consume via: `presets: [require('@boltz/tokens/tailwind')]`

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#232323',
      surface: {
        primary: '#FBFAF7',
        secondary: '#F0EFEC',
        tertiary: '#E8E7E3',
        'card-light': '#FFFFFF',
        'card-blue': '#EEF6FA',
        'card-dark': '#232323',
      },
      text: {
        primary: '#232323',
        secondary: '#505050',
        muted: '#7E7E7E',
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
    fontSize: {
      'heading-lg': ['62px', { lineHeight: '1.0', letterSpacing: '-0.04em' }],
      'heading-md': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      'heading-sm': ['24px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      'body-lg': ['20px', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
      'body-md': ['18px', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
      'body-sm': ['15px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      'mono-md': ['13px', { lineHeight: '1.6' }],
    },
    fontWeight: {
      regular: '400',
    },
    extend: {
      keyframes: {
        'accordion-open': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-close': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        'accordion-open': 'accordion-open 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        'accordion-close': 'accordion-close 350ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'standard-out': 'cubic-bezier(0.0, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '100ms',
        base: '200ms',
        slow: '350ms',
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
