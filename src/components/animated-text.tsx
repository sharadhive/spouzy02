import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Word-by-word rise animation for headings. Splits text into words that
 * cascade up into place when scrolled into view. Reduced-motion users get
 * the plain heading via CSS.
 */
export function AnimatedWords({ text, className = '', stagger = 70 }: { text: string; className?: string; stagger?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');
  return (
    <span ref={ref} className={`anim-words ${visible ? 'is-visible' : ''} ${className}`} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="anim-word-wrap">
          <span className="anim-word" style={{ transitionDelay: `${i * stagger}ms` } as CSSProperties}>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
