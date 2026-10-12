import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  HeartHandshake,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
  BookOpen,
  BadgeCheck,
  Check,
  Plus,
  Minus,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Tilt3D } from "@/components/tilt-3d";
import { AnimatedWords } from "@/components/animated-text";
import { Parallax } from "@/components/parallax";
import { CylinderCarousel } from "@/components/cylinder-carousel";
import hero from "@/assets/spouzy-hero.jpg";
import marriage from "@/assets/spouzy-marriage.jpg";
import wellness from "@/assets/spouzy-wellness.jpg";
import workplace from "@/assets/spouzy-workplace.jpg";
import intimacy from "@/assets/spouzy-intimacy.jpg";
import counselling from "@/assets/spouzy-counselling.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spouzy | Marriage, Intimacy & Relationship Counselling" },
      {
        name: "description",
        content:
          "Private, thoughtful support for marriage, intimacy, wellness and workplace safety. Explore guidance and resources for people across India.",
      },
      { property: "og:title", content: "Spouzy | Marriage, Intimacy & Relationship Counselling" },
      {
        property: "og:description",
        content:
          "Private, thoughtful support for marriage, intimacy, wellness and workplace safety across India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});
const pillars = [
  {
    label: "01 / RELATIONSHIPS",
    title: "Marriage",
    description: "For every stage of your story together.",
    href: "/marriage",
    image: marriage,
    alt: "An older couple walking hand in hand in a park",
    tint: "bg-rose",
  },
  {
    label: "02 / CONNECTION",
    title: "Intimacy",
    description: "Honest, respectful conversations about closeness.",
    href: "/intimacy",
    image: intimacy,
    alt: "An adult couple sharing a quiet moment of connection",
    tint: "bg-secondary",
  },
  {
    label: "03 / SELF-CARE",
    title: "Wellness",
    description: "Feel good in your body and your life.",
    href: "/wellness",
    image: wellness,
    alt: "A woman doing a skincare routine by a window",
    tint: "bg-sage",
  },
  {
    label: "04 / SAFETY",
    title: "Workplace safety",
    description: "Know your options. Build a culture of respect.",
    href: "/sexual-harassment",
    image: workplace,
    alt: "A team attending a workplace respect workshop",
    tint: "bg-blue-soft",
  },
];
const faqs = [
  [
    "Is counselling with Spouzy confidential?",
    "Privacy is central to how Spouzy is being built. Our full confidentiality and privacy policies will be published before sessions become available.",
  ],
  [
    "Do you offer online sessions?",
    "Online support is planned for people across India and NRIs. We will publish confirmed availability and session formats when booking opens.",
  ],
  [
    "Do I need to bring my partner?",
    "Not necessarily. Many people begin by speaking with someone on their own. You can explore relationship resources here while expert sessions are being prepared.",
  ],
  [
    "How much does a session cost?",
    "Session prices have not been confirmed yet. We will show all fees clearly before any booking or payment is offered.",
  ],
  [
    "What if I am in crisis right now?",
    "Spouzy is not an emergency service. In India, call 112 for immediate danger, or Tele MANAS at 14416 for free, 24/7 mental health support.",
  ],
];
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <main>
      <section className="relative overflow-hidden bg-secondary">
        <div className="container-site grid min-h-[660px] items-center gap-10 py-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-16">
          <div className="relative z-10 min-w-0 max-w-[660px]">
            <div className="anim-hero-in mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-2 text-[11px] font-bold uppercase tracking-normal text-primary">
              <span className="anim-pulse-dot size-1.5 rounded-full bg-primary" /> A space for
              honest conversations
            </div>
            <h1 className="anim-hero-in-1 hero-title">
              <AnimatedWords text="A little more" stagger={90} />{" "}
              <span className="text-shimmer font-normal italic">understanding.</span>
              <br />
              <AnimatedWords text="A lot more us." stagger={90} />
            </h1>
            <p className="anim-hero-in-2 mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Relationships can be complicated. Finding your way forward doesn’t have to be. Explore
              thoughtful support for marriage, intimacy, wellbeing and safer workplaces, made for
              life in India.
            </p>
            <div className="anim-hero-in-3 mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full px-7">
                <Link to="/marriage">
                  Explore how we can help <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-primary/40 bg-transparent px-7"
              >
                <Link to="/free">Find free resources</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-2">
                <LockKeyhole className="size-4 text-primary" /> Private by design
              </span>
              <span className="flex items-center gap-2">
                <HeartHandshake className="size-4 text-primary" /> Judgement-free guidance
              </span>
            </div>
          </div>
          <div className="relative">
            <Parallax speed={0.18} className="absolute -right-10 -top-10 hidden lg:block">
              <div
                aria-hidden="true"
                className="anim-spin-slow size-40 rounded-full border-2 border-dashed border-primary/30"
              />
            </Parallax>
            <div className="anim-hero-in-2 anim-img-tilt relative aspect-[1.08] w-full overflow-hidden rounded-[6px] lg:aspect-[.94]">
              <img
                src={hero}
                alt="A couple talking calmly together at home"
                width={1440}
                height={1152}
                fetchPriority="high"
                className="hero-photo anim-ken-burns"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
                <Parallax speed={0.08}>
                  <div className="anim-float flex items-center gap-3 rounded-md bg-background/95 p-3 shadow-lg sm:p-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
                      <Heart className="size-5 text-primary" />
                    </div>
                    <p className="text-xs font-semibold leading-5">
                      Real conversations.
                      <br />A better way forward.
                    </p>
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-border bg-background">
        <div className="container-site grid gap-5 py-7 text-xs font-medium text-muted-foreground md:grid-cols-3 md:gap-8">
          <span className="flex items-center gap-3">
            <BadgeCheck className="size-5 shrink-0 text-primary" /> Thoughtful, practical guidance
          </span>
          <span className="flex items-center gap-3">
            <LockKeyhole className="size-5 shrink-0 text-primary" /> A private, respectful space
          </span>
          <span className="flex items-center gap-3">
            <MapPin className="size-5 shrink-0 text-primary" /> Created for people across India
          </span>
        </div>
      </div>
      <section
        className="relative overflow-hidden py-16 sm:py-20 md:py-24"
        style={{ background: "linear-gradient(180deg, #FDF9F6 0%, #FAF5F0 50%, #F6EFE8 100%)" }}
      >
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#2B1B17] sm:text-4xl md:text-[44px] lg:text-[48px]">
              What’s on your mind?
            </h2>
            <p className="mt-3 text-base text-[#6E615A] sm:text-lg md:text-[19px] max-w-xl mx-auto">
              There’s no perfect way to begin. Choose what feels closest to what you’re going
              through.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12">
            <CylinderCarousel />
          </div>
        </div>
      </section>
      <section className="section-space bg-muted">
        <div className="container-site">
          <SectionHeading
            eyebrow="The Spouzy approach"
            title="Support for every part of life together."
            description="Our resources make room for the many sides of relationships, health and everyday life."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 110} variant="zoom">
                <Tilt3D max={7} className="h-full rounded-md">
                  <Link
                    to={p.href}
                    className="pillar-card anim-card group block h-full overflow-hidden rounded-md bg-card shadow-sm"
                  >
                    <div className={`relative aspect-[1.2] overflow-hidden ${p.tint}`}>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.alt}
                          width={1008}
                          height={800}
                          loading="lazy"
                          className="pillar-image transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="flex size-36 items-center justify-center rounded-full border border-primary/30">
                            <HeartHandshake className="size-20 text-primary" strokeWidth={0.7} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="eyebrow text-primary">{p.label}</p>
                      <div className="mt-4 flex items-start justify-between gap-2">
                        <h3 className="text-2xl font-semibold">{p.title}</h3>
                        <ArrowUpRight className="mt-1 size-5 text-primary" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                  </Link>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <Reveal variant="left">
            <p className="eyebrow text-primary">A simpler way to begin</p>
            <h2 className="section-title mt-4">You don’t need to have all the answers.</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Sometimes the first step is finding the words for what’s going on. Take your time.
              Read something useful, reflect on what matters, and reach out when you’re ready.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8 rounded-full px-7">
              <Link to="/free">
                Explore free resources <ArrowRight />
              </Link>
            </Button>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <div className="anim-img-zoom anim-img-tilt mb-6 rounded-md">
              <img
                src={counselling}
                alt="Illustrative counselling conversation with an adult couple"
                width={1200}
                height={960}
                loading="lazy"
                className="aspect-[1.6] w-full rounded-md object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="anim-card rounded-md bg-secondary p-7 sm:translate-y-7">
                <BookOpen className="size-8 text-primary" strokeWidth={1.5} />
                <h3 className="mt-10 text-xl font-semibold">Read & reflect</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Clear, down-to-earth ideas for the conversations that matter.
                </p>
                <Link
                  to="/free/tips"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  Relationship tips <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="rounded-md bg-sage p-7">
                <MessagesSquare className="size-8 text-primary" strokeWidth={1.5} />
                <h3 className="mt-10 text-xl font-semibold">Find your direction</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Explore topics at your own pace, without pressure or judgement.
                </p>
                <Link
                  to="/marriage"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  Browse topics <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-space bg-plum text-plum-foreground">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="left">
            <div className="anim-img-zoom anim-img-tilt overflow-hidden rounded-md">
              <img
                src={workplace}
                alt="HR trainer running a workplace session"
                width={1008}
                height={800}
                loading="lazy"
                className="aspect-[1.3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <p className="eyebrow text-accent">For workplaces</p>
            <h2 className="section-title mt-4">Respect at work is everyone’s business.</h2>
            <p className="mt-6 leading-8 text-plum-foreground/80">
              From understanding your rights to building a safer workplace, find clear guidance on
              India's POSH framework and how to take the next step.
            </p>
            <div className="mt-7 space-y-3 text-sm">
              {[
                "Understand your options",
                "Learn about POSH responsibilities",
                "Create a more respectful culture",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <Check className="size-4 text-accent" />
                  {t}
                </div>
              ))}
            </div>
            <Button asChild variant="secondary" size="lg" className="mt-9 rounded-full px-7">
              <Link to="/sexual-harassment">
                Explore workplace support <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
      <section className="section-space">
        <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <Reveal variant="left">
            <SectionHeading
              eyebrow="Good to know"
              title="Questions are welcome."
              description="Here are a few things people often want to know before taking a first step."
            />
            <div className="mt-8 flex items-center gap-3 rounded-md bg-secondary p-5">
              <ShieldCheck className="size-7 shrink-0 text-primary" />
              <p className="text-sm leading-6">
                For immediate help in India, call{" "}
                <a href="tel:112" className="font-bold underline">
                  112
                </a>
                . For mental health support, call{" "}
                <a href="tel:14416" className="font-bold underline">
                  14416
                </a>
                .
              </p>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120} className="border-t border-border">
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b border-border">
                <Button
                  variant="ghost"
                  className="flex h-auto min-h-20 w-full justify-between whitespace-normal rounded-none px-0 py-5 text-left text-base font-semibold hover:bg-transparent"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {q}
                  {openFaq === i ? (
                    <Minus className="ml-4 size-4 shrink-0" />
                  ) : (
                    <Plus className="ml-4 size-4 shrink-0" />
                  )}
                </Button>
                {openFaq === i && (
                  <p className="max-w-xl pb-6 text-sm leading-7 text-muted-foreground">{a}</p>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="bg-secondary py-16 lg:py-20">
        <div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-primary">Whenever you’re ready</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
              Every good change starts with a conversation.
            </h2>
          </div>
          <Button asChild size="lg" className="h-12 rounded-full px-8">
            <Link to="/contact">
              Get in touch <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
