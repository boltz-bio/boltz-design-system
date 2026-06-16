// Source: ./DESIGN.md + Figma file LvTmQRNQ2FZ6GcrSpwuvgl (verified 2026-06-03)
// When Figma and DESIGN.md disagree, Figma wins. See ./AUDIT-2026-06-03.md.

export const colors = {
  surface: {
    // Neutral canvas
    primary:    '#FBFAF7',
    secondary:  '#F0EFEC',
    tertiary:   '#E8E7E3',
    cardLight:  '#FFFFFF',
    cardBlue:   '#EEF6FA',
    cardDark:   '#232323',
    white:      '#FFFFFF',
    black:      '#232323',
    // Sage family
    sageDark:   '#003014',
    sageMedium: '#C6E5C6',
    sageLight:  '#D9EED9',
    sagePale:   '#EDF7ED',
    // Blue family
    blueDark:   '#142D36',
    blueMedium: '#C7E3EE',
    blueLight:  '#E5F2F7',
    bluePale:   '#EEF6FA',
    // Tierra family
    tierra500:  '#DACAB0',
    tierra200:  '#EEE7DB',
    tierra100:  '#F7F2E9',
    tierra75:   '#F9F6EF',
    tierra50:   '#FBFAF7',
  },
  text: {
    primary: '#232323',
    secondary: '#505050',
    muted: '#6E6E6E',
    onDark: '#FFFFFF',
  },
  action: {
    primary: '#232323',
    primaryActive: '#111111',
  },
  sage: {
    dark: '#003014',
    medium: '#C6E5C6',
    light: '#D9EED9',
    pale: '#EDF7ED',
  },
  blue: {
    dark: '#142D36',
    deep: '#165A75',
    medium: '#C7E3EE',
    light: '#E5F2F7',
    pale: '#EEF6FA',
  },
  tierra: {
    500: '#DACAB0',
    200: '#EEE7DB',
    100: '#F7F2E9',
    75: '#F9F6EF',
    50: '#FBFAF7',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#232323',
    grey500: '#505050',
    grey200: '#7E7E7E',
    grey100: '#D9D9D9',
  },
  border: {
    light: '#D9D9D9',
    warm: '#EEE7DB',
    dark: '#333333',
  },
  status: {
    error: '#CC4444',
    errorSurface: '#FDF2F2',
    warning: '#C97B22',
    warningSurface: '#FDF6ED',
    success: '#2D7A3F',
    successSurface: '#F0FAF2',
    info: '#2E6DA4',
    infoSurface: '#EFF5FB',
  },
} as const;

export const typography = {
  family: {
    sans: '"Stabil Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  weight: { regular: 400 },
  size: {
    headingLg: '62px',
    headingMd: '32px',
    headingSm: '24px',
    bodyLg: '20px',
    bodyMd: '18px',
    bodySm: '15px',
    monoMd: '13px',
  },
  lineHeight: {
    headingLg: 1.0,
    headingMd: 1.2,
    headingSm: 1.2,
    bodyLg: 1.4,
    bodyMd: 1.4,
    bodySm: 1.3,
    monoMd: 1.6,
  },
  tracking: {
    headingLg: '-0.04em',
    headingMd: '-0.02em',
    headingSm: '-0.01em',
    bodyLg: '-0.02em',
    bodyMd: '-0.01em',
    bodySm: '-0.01em',
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  '2xl': '80px',
  '3xl': '120px',
  section: '160px',
} as const;

export const radius = {
  none: '0px',
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

export const motion = {
  duration: {
    fast: '100ms',
    base: '200ms',
    slow: '350ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    out: 'cubic-bezier(0.0, 0, 0.2, 1)',
  },
  activeScale: 0.97,
} as const;

export const grid = {
  containerMax: '1328px',
  cols: 12,
  colWidth: '96px',
  gutter: '20px',
  textBodyMax: '740px',
  heroTextColMax: '636px',
} as const;

export const breakpoint = {
  mobile: '768px',
  tablet: '1024px',
  laptop: '1328px',
} as const;
