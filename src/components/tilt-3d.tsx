import { useRef, type ReactNode } from 'react';

/**
 * Pointer-driven 3D tilt. The element rotates toward the cursor with a
 * perspective transform and a moving glare highlight. Disabled for touch
 * and reduced-motion users via CSS/media checks.
 */
export function Tilt3D({ children, className = '', max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    el.style.setProperty('--glare-x', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--glare-y', `${(py + 0.5) * 100}%`);
    el.classList.add('is-tilting');
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.classList.remove('is-tilting');
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt-3d ${className}`}>
      {children}
    </div>
  );
}
