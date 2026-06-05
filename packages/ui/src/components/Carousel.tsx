import * as React from 'react';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import { cn } from '../utils';
import { focusRing, interactive, disabledState } from '../styles';

// Spec: Figma node 57:2514 "Frame 3466219"
//
// Structure (vertical stack, 64px gap between track and controls):
//   Track     (Frame 3466204) — horizontal scroll-snap row, 24px gap between
//             slides. Slides are wide (~708px) so the next slide peeks. Hidden
//             scrollbar, scroll-smooth, snap-x mandatory, each slide snap-start.
//   Controls  (Frame 3466215) — space-between row. Left = optional caption
//             block (heading + body). Right = arrow group (Frame 3466203):
//             two 36×36 circular icon buttons.
//
// Behaviour:
//   - Arrows scroll the track by one "page" (slide width + gap) via scrollBy.
//   - A passive scroll listener computes atStart / atEnd to disable the arrows
//     at the ends; recomputed on resize + mount.
//   - Reduced motion → behavior:'auto' instead of 'smooth'.

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The slides. Each child is wrapped in a snap slide. */
  children: React.ReactNode;
  /** Optional left-side caption block shown under the track (heading + body). */
  caption?: React.ReactNode;
  /** Accessible region label. Default 'Carousel'. */
  ariaLabel?: string;
  /** Applied to each slide wrapper — override the default responsive width. */
  slideClassName?: string;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, caption, ariaLabel = 'Carousel', slideClassName, ...rest }, ref) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = React.useState(true);
    const [atEnd, setAtEnd] = React.useState(false);

    const updateEdges = React.useCallback(() => {
      const el = trackRef.current;
      if (!el) return;
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    }, []);

    React.useEffect(() => {
      const el = trackRef.current;
      if (!el) return;
      updateEdges();
      el.addEventListener('scroll', updateEdges, { passive: true });
      window.addEventListener('resize', updateEdges);
      return () => {
        el.removeEventListener('scroll', updateEdges);
        window.removeEventListener('resize', updateEdges);
      };
    }, [updateEdges]);

    const scrollByPage = (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      // One "page" = the width of the first slide + the gap between slides.
      const first = el.firstElementChild as HTMLElement | null;
      const slideWidth = first?.offsetWidth ?? el.clientWidth;
      const styles = window.getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      el.scrollBy({
        left: direction * (slideWidth + gap),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    };

    const arrowClass = cn(
      'w-9 h-9 rounded-full border border-border-light',
      'inline-flex items-center justify-center shrink-0',
      'text-text-primary bg-transparent',
      'transition-colors duration-base ease-standard hover:bg-surface-secondary',
      'active:scale-active',
      interactive,
      focusRing,
      disabledState,
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className={cn('flex flex-col gap-[64px]', className)}
        {...rest}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(
            'flex gap-lg overflow-x-auto scroll-smooth motion-reduce:scroll-auto',
            'snap-x snap-mandatory',
            // Hide scrollbar (Firefox + WebKit). Not colours — layout only.
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          {React.Children.map(children, (child) => (
            <div
              className={cn(
                'flex-none snap-start',
                'basis-[85%] tablet:basis-[55%]',
                slideClassName,
              )}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-end justify-between gap-lg">
          {caption ? <div className="flex flex-col gap-sm">{caption}</div> : <div />}

          <div className="flex gap-0 shrink-0">
            <button
              type="button"
              aria-label="Previous"
              aria-disabled={atStart}
              disabled={atStart}
              onClick={() => scrollByPage(-1)}
              className={arrowClass}
            >
              <NavArrowLeft width={20} height={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next"
              aria-disabled={atEnd}
              disabled={atEnd}
              onClick={() => scrollByPage(1)}
              className={arrowClass}
            >
              <NavArrowRight width={20} height={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    );
  },
);
Carousel.displayName = 'Carousel';
