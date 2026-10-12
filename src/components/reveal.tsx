import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** Animation style: fade-up (default), fade, zoom, slide-left, slide-right, pop */
  variant?: 'up' | 'fade' | 'zoom' | 'left' | 'right' | 'pop';
};

/**
 * Scroll-triggered reveal. Elements start hidden and animate in when they
 * enter the viewport. Respects prefers-reduced-motion via CSS.
 */
export function Reveal({ children, className = '', delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  return (
    <div ref={ref} style={style} className={`reveal reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
