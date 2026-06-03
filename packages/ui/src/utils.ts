import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge doesn't know about our custom text-* tokens.
// Without this, it treats `text-heading-md` and `text-text-primary` as the
// same group and drops the font-size when a color class follows.
//
// We register:
//   - font-size group:  text-heading-{lg,md,sm}, text-body-{lg,md,sm}, text-mono-md
//   - text-color group: text-text-*, text-white/*, text-sage-*, text-blue-*, etc.

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-heading-lg',
        'text-heading-md',
        'text-heading-sm',
        'text-body-lg',
        'text-body-md',
        'text-body-sm',
        'text-mono-md',
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
