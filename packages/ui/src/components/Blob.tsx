import * as React from 'react';
import { cn } from '../utils';
import { BLOB_SHAPES } from './blobShapes';

// Foundation graphic — the Boltz organic "blob" shapes (Figma frame 155:363).
// 25 hand-drawn shapes, each an outline + small crosshair anchor marks. Decorative
// only. Colour follows the parent text colour via `currentColor`, so set a `text-*`
// token. Size via `className` (w-/h-). Always aria-hidden.
//
// Source data: blobShapes.ts (generated from the Figma SVG exports).

export const BLOB_COUNT = BLOB_SHAPES.length;

export interface BlobProps extends React.SVGProps<SVGSVGElement> {
  /** Which blob shape, 0…24. Wraps around. Default 0. */
  shape?: number;
}

export const Blob = ({ shape = 0, className, ...rest }: BlobProps) => {
  const i = ((Math.trunc(shape) % BLOB_COUNT) + BLOB_COUNT) % BLOB_COUNT;
  const s = BLOB_SHAPES[i];
  return (
    <svg
      viewBox={s.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className={cn('text-border-warm', className)}
      {...rest}
    >
      {s.paths.map((d, k) => {
        // All paths: stroke only the outer contour (first sub-path) so the
        // main blob and crosshair marks share the same 1.5px visual weight.
        const outerContour = d.slice(0, d.indexOf('Z') + 1) || d;
        return (
          <path key={k} d={outerContour} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        );
      })}
    </svg>
  );
};
Blob.displayName = 'Blob';
