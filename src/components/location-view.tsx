import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, MapPin, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityFinder } from '@/components/city-finder';
import { Reveal } from '@/components/reveal';
import { AnimatedWords } from '@/components/animated-text';
import { cities, regions, services, nearbyCities, type City, type LocationRegion } from '@/lib/locations';

function Crumbs({ items }: { items: { label: string; to?: string; params?: Record<string, string> }[] }) {
  return (
    <div className="border-b border-border bg-muted">
      <div className="container-site py-3 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        {items.map((it) => (
          <span key={it.label}>
            <ChevronRight className="mx-2 inline size-3" />
            {it.to ? <Link to={it.to as never} params={it.params as never} className="hover:text-primary">{it.label}</Link> : <span className="text-foreground">{it.label}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function Faqs({ faqs }: { faqs: [string, string][] }) {
  return (
    <section className="section-space">
      <div className="container-site max-w-3xl">
        <p className="eyebrow text-primary">Questions</p>
        <h2 className="section-title mt-4">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map(([q, a]) => (
            <details key={q} className="py-5">
              <summary className="cursor-pointer text-lg font-medium">{q}</summary>
              <p className="mt-3 leading-7 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetyBand() {
  return (
    <section className="bg-plum py-14 text-plum-foreground">
      <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-7 opacity-90"><ShieldCheck className="mr-2 inline size-5" />Not an emergency service. In danger call 112. Free mental health support 24/7: Tele MANAS 14416. General information, not medical or legal advice.</p>
        <Button asChild variant="secondary" size="lg" className="rounded-full px-7"><Link to="/contact">Register your interest <ArrowRight /></Link></Button>
      </div>
    </section>
  );
}

function CityCard({ city }: { city: City }) {
  return (
    <Link to="/locations/$region/$city" params={{ region: city.region, city: city.slug }} className="anim-card group rounded-md border border-border bg-background p-6 transition-colors hover:border-primary">
      <MapPin className="anim-card-icon size-5 text-primary" />
      <h3 className="mt-4 text-xl font-semibold group-hover:text-primary">{city.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{city.languages.join(' · ')}</p>
    </Link>
  );
}

export function LocationsHub() {
  return (
    <main>
      <Crumbs items={[{ label: 'Locations' }]} />
      <section className="container-site py-20 lg:py-28">
        <p className="anim-hero-in eyebrow text-primary">Spouzy / Locations</p>
        <h1 className="anim-hero-in-1 hero-title mt-5 max-w-3xl"><AnimatedWords text="Find counselling support near you" stagger={80} /></h1>
        <p className="anim-hero-in-2 mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Confidential marriage, relationship and intimacy counselling across the Mumbai region and Gujarat, planned as online sessions in your language.</p>
        <div className="anim-hero-in-3"><CityFinder className="mt-9" /></div>
      </section>
      {regions.map((r) => (
        <section key={r.slug} className="section-space border-t border-border bg-card">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-title">{r.heading}</h2>
              <Link to="/locations/$region" params={{ region: r.slug }} className="text-sm font-semibold text-primary">All of {r.name} <ArrowRight className="inline size-4" /></Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cities.filter((c) => c.region === r.slug).map((c) => <CityCard key={c.slug} city={c} />)}
            </div>
          </div>
        </section>
      ))}
      <SafetyBand />
    </main>
  );
}

export function RegionView({ region }: { region: LocationRegion }) {
  const list = cities.filter((c) => c.region === region.slug);
  return (
    <main>
      <Crumbs items={[{ label: 'Locations', to: '/locations' }, { label: region.name }]} />
      <section className="container-site py-20 lg:py-24">
        <p className="anim-hero-in eyebrow text-primary">Spouzy / {region.name}</p>
        <h1 className="anim-hero-in-1 hero-title mt-5 max-w-3xl">{region.h1}</h1>
        <div className="mt-8 max-w-3xl space-y-5 leading-8 text-muted-foreground">{region.paragraphs.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
      </section>
      <section className="section-space bg-card">
        <div className="container-site">
          <h2 className="section-title">Cities we cover</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{list.map((c) => <CityCard key={c.slug} city={c} />)}</div>
        </div>
      </section>
      <Faqs faqs={region.faqs} />
      <SafetyBand />
    </main>
  );
}

export function CityView({ city }: { city: City }) {
  const region = regions.find((r) => r.slug === city.region)!;
  const near = nearbyCities(city);
  return (
    <main>
      <Crumbs items={[{ label: 'Locations', to: '/locations' }, { label: region.name, to: '/locations/$region', params: { region: region.slug } }, { label: city.name }]} />
      <section className="container-site py-20 lg:py-24">
        <p className="anim-hero-in eyebrow text-primary">Spouzy / {city.name}</p>
        <h1 className="anim-hero-in-1 hero-title mt-5 max-w-3xl">Marriage & relationship counselling in {city.name}</h1>
        <p className="anim-hero-in-2 mt-6 max-w-2xl text-xl font-medium leading-relaxed text-primary">{city.intro}</p>
        <div className="anim-hero-in-3 mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-7"><Link to="/book" search={{ city: city.slug } as never}>Book in {city.name} <ArrowRight /></Link></Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-7"><Link to="/contact">Ask a question</Link></Button>
        </div>
      </section>
      <section className="section-space bg-card">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 leading-8 text-muted-foreground">{city.paragraphs.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Why Spouzy in {city.name}</h2>
            {city.whyPoints.map((w, i) => <Reveal key={w} delay={i*100} variant="right"><div className="anim-card rounded-md border border-border bg-background p-5"><span className="text-xs font-bold text-primary">0{i + 1}</span><p className="mt-2">{w}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Support available</h2>
            <ul className="mt-5 space-y-2">{services.map((s) => <li key={s.slug}><Link to={s.sitePath as never} className="hover:text-primary">{s.keyword(city.name)} <ArrowRight className="inline size-3" /></Link></li>)}</ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Areas served</h2>
            <p className="mt-5 leading-8 text-muted-foreground">{city.areasServed.join(', ')} and nearby, through online sessions.</p>
            <p className="mt-4 text-sm text-muted-foreground">Languages: {city.languages.join(', ')}</p>
          </div>
        </div>
      </section>
      <section className="section-space bg-card">
        <div className="container-site">
          <h2 className="section-title">Local resources</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{city.resources.map((r, i) => <Reveal key={r.title} delay={i*100} variant="up"><div className="anim-card h-full rounded-md border border-border bg-background p-6"><h3 className="font-semibold">{r.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{r.detail}</p></div></Reveal>)}</div>
        </div>
      </section>
      <Faqs faqs={city.faqs} />
      {near.length > 0 && (
        <section className="pb-16"><div className="container-site"><h2 className="text-xl font-semibold">Nearby cities</h2><div className="mt-5 flex flex-wrap gap-3">{near.map((c) => <Link key={c.slug} to="/locations/$region/$city" params={{ region: c.region, city: c.slug }} className="rounded-full border border-border px-5 py-2.5 text-sm hover:border-primary hover:text-primary">{c.name}</Link>)}</div></div></section>
      )}
      <SafetyBand />
    </main>
  );
}
