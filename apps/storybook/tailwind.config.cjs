const boltzPreset = require('@boltz/tokens/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [boltzPreset],
  content: [
    './stories/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};
