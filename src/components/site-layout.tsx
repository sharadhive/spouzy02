import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronDown, Heart, Menu, Search, X, ShieldCheck, CalendarDays, MessageCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigation } from '@/lib/site-content';
import spouzyLogo from '@/assets/Rose Gold Spouzy Infinity Logo.png';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const overlay = document.querySelector<HTMLElement>('[data-site-overlay]');
    const getControls = () => Array.from(overlay?.querySelectorAll<HTMLElement>('a[href], button, input, summary, [tabindex="0"]') ?? []).filter(el => el.getClientRects().length > 0);
    const first = overlay?.querySelector<HTMLElement>('input') ?? getControls()[0];
    first?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); }
      if (event.key !== 'Tab') return;
      const controls = getControls();
      const start = controls[0];
      const end = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === start) { event.preventDefault(); end?.focus(); }
      else if (!event.shiftKey && document.activeElement === end) { event.preventDefault(); start?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [menuOpen, searchOpen]);
  return <>
    <div className="bg-plum text-plum-foreground"><div className="container-site flex min-h-9 items-center justify-center text-center text-[11px] font-medium tracking-wide sm:justify-between"><Link to="/free-consultation" className="hover:underline">Free first consultation for students & Army families <span aria-hidden="true">→</span></Link><span className="hidden sm:block">Private support. Wherever you are.</span></div></div>
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md"><div className="container-site flex h-[74px] items-center justify-between gap-5 lg:h-[86px]">
      <Link to="/" aria-label="Spouzy home" className="flex shrink-0 items-center">
        <img 
          src={spouzyLogo} 
          alt="Spouzy" 
          className="h-11 w-36 object-contain object-left sm:h-14 sm:w-44" 
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
            const fb = e.currentTarget.nextElementSibling as HTMLElement;
            if (fb) fb.style.display = 'inline-block';
          }}
        />
        <span style={{ display: 'none' }} className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Spouzy
        </span>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-4 xl:flex 2xl:gap-6">{navigation.map(item => <div className="nav-group relative flex h-[86px] items-center" key={item.href}><Link to={item.href} className="flex items-center gap-1 text-[13px] font-semibold text-foreground transition-colors hover:text-primary">{item.label}<ChevronDown className="size-3" /></Link><div className="nav-dropdown absolute left-1/2 top-[76px] w-72 -translate-x-1/2 rounded-md border border-border bg-card p-3 shadow-xl"><Link to={item.href} className="block rounded px-3 py-2 text-sm font-bold text-primary hover:bg-muted">Explore {item.label} <ArrowRight className="ml-1 inline size-3" /></Link>{item.children.map(([label,href])=><Link to={href} key={href} className="block rounded px-3 py-2.5 text-sm text-foreground hover:bg-muted">{label}</Link>)}</div></div>)}</nav>
      <div className="flex items-center gap-1 sm:gap-3"><Button variant="ghost" size="icon" aria-label="Search" title="Search" onClick={() => setSearchOpen(true)}><Search /></Button><Button asChild size="lg" className="hidden rounded-full px-6 sm:inline-flex"><Link to="/book">Book a session <ArrowRight /></Link></Button><Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu" title="Menu" onClick={() => setMenuOpen(true)}><Menu /></Button></div>
    </div></header>
    {menuOpen && <div data-site-overlay role="dialog" aria-modal="true" aria-label="Spouzy menu" className="fixed inset-0 z-50 overflow-y-auto bg-background px-5 pb-16 pt-5 xl:hidden"><div className="mb-8 flex items-center justify-between"><Link to="/" onClick={()=>setMenuOpen(false)}><img src={spouzyLogo} alt="Spouzy" className="h-16 w-48 object-contain object-left" /></Link><Button variant="ghost" size="icon" aria-label="Close menu" onClick={()=>setMenuOpen(false)}><X /></Button></div><nav className="space-y-1">{navigation.map(item=><details key={item.href} className="border-b border-border py-3"><summary className="cursor-pointer list-none text-lg font-semibold">{item.label} <ChevronDown className="float-right mt-1 size-5" /></summary><div className="mt-3 grid gap-1 pl-4"><Link to={item.href} onClick={()=>setMenuOpen(false)} className="py-2 font-semibold text-primary">Overview</Link>{item.children.map(([label,href])=><Link key={href} to={href} onClick={()=>setMenuOpen(false)} className="py-2 text-muted-foreground">{label}</Link>)}</div></details>)}</nav><Button asChild className="mt-8 w-full rounded-full"><Link to="/book" onClick={()=>setMenuOpen(false)}>Book a session</Link></Button></div>}
    {searchOpen && <div data-site-overlay className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 px-4 pt-[15vh]" onClick={()=>setSearchOpen(false)}><div role="dialog" aria-modal="true" aria-label="Search Spouzy" className="w-full max-w-xl rounded-lg bg-card p-6 shadow-xl" onClick={e=>e.stopPropagation()}><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">Search Spouzy</h2><Button variant="ghost" size="icon" aria-label="Close search" onClick={()=>setSearchOpen(false)}><X /></Button></div><form action="/search" method="get"><label htmlFor="site-search" className="mb-2 block text-sm font-medium">What are you looking for?</label><div className="flex gap-2"><input id="site-search" name="q" autoFocus placeholder="Marriage, counselling, wellbeing..." className="min-w-0 flex-1 rounded-md border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" /><Button type="submit" className="h-auto rounded-md">Search</Button></div></form></div></div>}
  </>;
}
export function SiteFooter() {
  return <footer className="bg-plum text-plum-foreground"><div className="container-site grid gap-12 py-16 md:grid-cols-[1.7fr_1fr_1fr_1fr] lg:py-20"><div><Link to="/" aria-label="Spouzy home" className="inline-block"><img src={spouzyLogo} alt="Spouzy" className="h-20 w-52 object-contain object-left" /></Link><p className="mt-5 max-w-sm text-sm leading-7 opacity-80">A thoughtful space for conversations about relationships, intimacy, wellbeing and safer workplaces.</p><p className="mt-6 text-xs opacity-60">Part of <a href="https://problemsolvers.in" className="underline underline-offset-4">Problem Solver Group</a></p></div><div><h3 className="mb-5 text-sm font-bold">Explore</h3><div className="grid gap-3 text-sm opacity-80"><Link to="/marriage">Marriage</Link><Link to="/intimacy">Intimacy</Link><Link to="/wellness">Wellness</Link><Link to="/sexual-harassment">Workplace safety</Link></div></div><div><h3 className="mb-5 text-sm font-bold">Support</h3><div className="grid gap-3 text-sm opacity-80"><Link to="/services">Services</Link><Link to="/free">Free resources</Link><Link to="/experts">Our experts</Link><Link to="/free-consultation">Free consultation</Link><Link to="/locations">Locations</Link></div></div><div><h3 className="mb-5 text-sm font-bold">Spouzy</h3><div className="grid gap-3 text-sm opacity-80"><Link to="/about">About us</Link><Link to="/work-with-us">Work with us</Link><Link to="/contact">Contact</Link><Link to="/about/policies">Policies</Link></div></div></div><div className="border-y border-plum-foreground/20 py-5"><div className="container-site flex items-start gap-3 text-xs leading-6 opacity-85"><ShieldCheck className="mt-0.5 size-4 shrink-0" /><p>Not for emergencies: call <a href="tel:112" className="underline">112</a>. Mental health support: Tele MANAS <a href="tel:14416" className="underline">14416</a> (free, 24/7).</p></div></div><div className="container-site flex flex-col justify-between gap-4 py-7 text-xs opacity-70 sm:flex-row"><span>© {new Date().getFullYear()} Spouzy, a Problem Solver Group brand.</span><div className="flex flex-wrap gap-x-5 gap-y-2"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/disclaimer">Disclaimer</Link></div></div></footer>;
}
export function MobileActionBar() { return <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-border bg-background p-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-lg sm:hidden"><Link to="/book" className="flex flex-col items-center gap-1 py-1 text-[11px] font-semibold"><CalendarDays className="size-5" />Book</Link><Link to="/contact" className="flex flex-col items-center gap-1 py-1 text-[11px] font-semibold"><MessageCircle className="size-5" />Contact</Link><Link to="/free" className="flex flex-col items-center gap-1 py-1 text-[11px] font-semibold"><BookOpen className="size-5" />Free tools</Link></div> }
