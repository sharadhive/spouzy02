import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, CalendarDays, Heart, HeartHandshake, Leaf, MessageCircle, PanelRightOpen, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'Marriage support', to: '/marriage', Icon: HeartHandshake, tint: 'bg-rose' },
  { label: 'Intimacy & connection', to: '/intimacy', Icon: Heart, tint: 'bg-secondary' },
  { label: 'Wellness', to: '/wellness', Icon: Leaf, tint: 'bg-sage' },
  { label: 'Workplace safety', to: '/sexual-harassment', Icon: ShieldCheck, tint: 'bg-blue-soft' },
] as const;

/**
 * Sliding side panel: a slim tab pinned to the right edge of the screen
 * slides out a quick-actions drawer. Slides in with a spring-like ease,
 * closes on Escape, backdrop click, or the close button.
 */
export function SidePanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Edge tab */}
      <button
        type="button"
        aria-label="Open quick actions panel"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`side-tab fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-md border border-r-0 border-border bg-primary px-2.5 py-4 text-primary-foreground shadow-lg transition-transform hover:-translate-x-1 md:flex ${open ? 'pointer-events-none opacity-0' : ''}`}
      >
        <PanelRightOpen className="size-5" />
        <span className="side-tab-text text-[11px] font-bold uppercase tracking-wider">Quick help</span>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-foreground/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      {/* Sliding panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Quick actions"
        className={`side-panel fixed inset-y-0 right-0 z-50 flex w-[min(92vw,380px)] flex-col bg-card shadow-2xl ${open ? 'is-open' : ''}`}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <p className="eyebrow text-primary">Quick help</p>
          <Button variant="ghost" size="icon" aria-label="Close panel" onClick={() => setOpen(false)}><X /></Button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          <p className="text-sm leading-6 text-muted-foreground">Jump straight to the support that fits — no searching needed.</p>
          {quickLinks.map(({ label, to, Icon, tint }, i) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
              className={`side-panel-item group flex items-center gap-4 rounded-md border border-border p-4 hover:border-primary ${tint}`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background"><Icon className="size-5 text-primary" /></span>
              <span className="flex-1 font-semibold">{label}</span>
              <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          ))}
        </div>
        <div className="space-y-3 border-t border-border p-5">
          <Button asChild className="w-full rounded-full"><Link to="/book" onClick={() => setOpen(false)}>Book a session <CalendarDays /></Link></Button>
          <Button asChild variant="outline" className="w-full rounded-full"><Link to="/contact" onClick={() => setOpen(false)}>Ask a question <MessageCircle /></Link></Button>
          <p className="pt-1 text-center text-xs text-muted-foreground">In danger? Call <a href="tel:112" className="font-bold underline">112</a> · Tele MANAS <a href="tel:14416" className="font-bold underline">14416</a></p>
        </div>
      </aside>
    </>
  );
}
