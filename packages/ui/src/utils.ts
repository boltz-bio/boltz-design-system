import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Boltz uses custom token names for font sizes (`text-body-sm`, `text-heading-lg`…)
// and a single custom weight (`font-regular`). Default tailwind-merge can't tell
// `text-body-sm` (a size) from `text-text-primary` (a color), nor `font-regular`
// (a weight) from `font-sans` (a family), so it would silently drop the size /
// family when both appear in one className. Registering the tokens fixes that.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['heading-lg', 'heading-md', 'heading-sm', 'body-lg', 'body-md', 'body-sm', 'mono-md'] },
      ],
      'font-weight': ['font-regular'],
    },
  },
});

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
