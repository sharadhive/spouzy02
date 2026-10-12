import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, ChevronRight, ShieldCheck, HeartHandshake, Heart, Leaf, BriefcaseBusiness, MessageCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { AnimatedWords } from '@/components/animated-text';
import { pages, topicLabels, navigation } from '@/lib/site-content';
import counselling from '@/assets/spouzy-counselling.jpg';
import marriage from '@/assets/spouzy-marriage.jpg';
import intimacy from '@/assets/spouzy-intimacy.jpg';
import wellness from '@/assets/spouzy-wellness.jpg';
import workplace from '@/assets/spouzy-workplace.jpg';

export function getPage(path: string) {
  const exact = pages[path];
  if (exact) return exact;
  const segments = path.split('/').filter(Boolean);
  const parent = pages['/' + (segments[0] ?? '')];
  const slug = segments[segments.length-1] ?? '';
  if (!parent || !topicLabels[slug]) return null;
  const title = topicLabels[slug];
  return { title, intro: parent.intro, description: `${title} is part of Spouzy’s ${parent.title.toLowerCase()} resources. We are preparing thoughtful, practical guidance for people in India. Explore the related topics below, or get in touch with a question.`, section: 'Explore this topic', points: parent.points, next: '/' + segments[0], nextLabel: `Explore ${parent.title}` };
}
export function ContentView({path}: {path: string}) {
  const page = getPage(path);
  if (!page) return <main className="container-site py-28 text-center"><p className="eyebrow text-primary">404</p><h1 className="section-title mt-4">We couldn’t find that page.</h1><p className="mx-auto mt-5 max-w-lg text-muted-foreground">The page may have moved. Take a look at our topics or return to the beginning.</p><Button asChild className="mt-8 rounded-full"><Link to="/">Back to Spouzy <ArrowRight /></Link></Button></main>;
  const parentPath = '/' + path.split('/').filter(Boolean).slice(0,-1).join('/');
  const parent = path.split('/').filter(Boolean).length > 1 ? pages[parentPath] : undefined;
  const related = navigation.find(n => path === n.href || path.startsWith(n.href + '/'));
  const sensitive = path.startsWith('/sexual-harassment') || path === '/marriage/divorce';
  const visual = path.startsWith('/marriage') ? { image: marriage, alt: 'A couple walking together in a park', Icon: HeartHandshake } : path.startsWith('/intimacy') ? { image: intimacy, alt: 'An adult couple sharing a quiet moment together', Icon: Heart } : path.startsWith('/wellness') ? { image: wellness, alt: 'A woman taking time for her wellbeing', Icon: Leaf } : path.startsWith('/sexual-harassment') || path === '/corporates' ? { image: workplace, alt: 'A workplace respect training session', Icon: ShieldCheck } : { image: counselling, alt: 'Illustrative counselling conversation with an adult couple', Icon: path.startsWith('/services') ? BriefcaseBusiness : path.startsWith('/free') ? BookOpen : MessageCircle };
  return <main>
    <div className="border-b border-border bg-muted"><div className="container-site py-3 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="mx-2 inline size-3" />{parent && <><Link to={parentPath} className="hover:text-primary">{parent.title}</Link><ChevronRight className="mx-2 inline size-3" /></>}<span className="text-foreground">{page.title}</span></div></div>
    <section className="container-site grid min-h-[440px] items-center gap-10 py-20 lg:grid-cols-[1.2fr_.8fr] lg:py-28"><div><p className="anim-hero-in eyebrow flex items-center gap-2 text-primary"><visual.Icon className="size-4" aria-hidden="true" />Spouzy / {related?.label || 'Information'}</p><h1 className="anim-hero-in-1 hero-title mt-5 max-w-3xl"><AnimatedWords text={page.title} stagger={60} /></h1><p className="anim-hero-in-2 mt-6 max-w-2xl text-xl font-medium leading-relaxed text-primary">{page.intro}</p><p className="anim-hero-in-2 mt-5 max-w-2xl leading-8 text-muted-foreground">{page.description}</p><div className="anim-hero-in-3 mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full px-7"><Link to={page.next || '/contact'}>{page.nextLabel || 'Get in touch'} <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg" className="rounded-full px-7"><Link to="/free">Free resources</Link></Button></div></div><div className="anim-hero-in-2 anim-img-zoom anim-img-tilt overflow-hidden rounded-md bg-secondary"><img src={visual.image} alt={visual.alt} width={1200} height={960} className="aspect-[1.35] w-full object-cover lg:aspect-[1.05]" /></div></section>
    <section className="section-space bg-card"><div className="container-site"><div className="max-w-2xl"><p className="eyebrow text-primary">A place to start</p><h2 className="section-title mt-4">{page.section}</h2></div><div className="mt-10 grid gap-4 md:grid-cols-3">{page.points.map((point,i)=><Reveal key={point} delay={i*110} variant="up"><div className="anim-card h-full rounded-md border border-border bg-background p-7"><span className="text-xs font-bold text-primary">0{i+1}</span><p className="mt-5 text-lg font-medium leading-relaxed">{point}</p></div></Reveal>)}</div>{related && <div className="mt-12 flex flex-wrap gap-3">{related.children.filter(([,href])=>href!==path).map(([label,href])=><Link key={href} to={href} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:border-primary hover:text-primary">{label}<ArrowUpRight className="size-3" /></Link>)}</div>}</div></section>
    {sensitive && <section className="bg-blue-soft py-10"><div className="container-site flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><p className="max-w-2xl text-sm leading-7"><ShieldCheck className="mr-2 inline size-5" />If you are in danger, call 112. For workplace complaints, visit the <a className="underline" href="https://shebox.wcd.gov.in/">government SHe-Box portal</a>. General information, not legal advice.</p><Button variant="outline" onClick={()=>{window.location.replace('https://www.google.com')}}>Quick exit <ArrowUpRight /></Button></div></section>}
    <section className="bg-plum py-16 text-plum-foreground"><div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow opacity-70">Whenever you’re ready</p><h2 className="mt-3 text-3xl font-semibold">You don’t have to figure it out alone.</h2></div><Button asChild size="lg" variant="secondary" className="rounded-full px-7"><Link to="/contact">Contact Spouzy <ArrowRight /></Link></Button></div></section>
  </main>;
}
