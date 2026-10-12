import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Subtle scroll parallax: the element drifts at `speed` relative to scroll
 * (0.1 = gentle). Uses rAF-throttled scroll listener, transform-only, and
 * disables itself for reduced-motion users.
 */
export function Parallax({ children, className = '', speed = 0.12 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${(-center * speed).toFixed(1)}px)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return <div ref={ref} className={`parallax-layer ${className}`}>{children}</div>;
}
