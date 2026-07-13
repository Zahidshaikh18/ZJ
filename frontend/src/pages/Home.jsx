import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import { SERVICES, INDUSTRIES, WHY_US, STATS, TECHNOLOGIES, COMPANY } from "@/lib/company";
import { Reveal } from "@/components/Motion";
import Counter from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as SiIcons from "react-icons/si";

const Ico = ({ name, className }) => {
  const I = Icons[name] || Icons.Sparkles;
  return <I className={className} aria-hidden />;
};

export default function Home() {
  return (
    <div>
      <Hero />

      {/* STATS STRIP */}
      <section className="relative -mt-12 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-2xl border border-border bg-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border overflow-hidden">
            {STATS.map((s, i) => (
              <div key={i} data-testid={`stat-${i}`} className="p-8">
                <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Who we are</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight">
              An enterprise IT partner — engineered for the long term.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Since 2021, {COMPANY.name} has helped organisations modernise, secure and operate the technology that runs their business. From cloud landing zones to national managed-service programmes, we take ownership from architecture to operations.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/about">
                <Button data-testid="home-about-btn" size="lg" className="rounded-full bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)]">
                  Our story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/why-us">
                <Button variant="outline" size="lg" className="rounded-full">Why choose us</Button>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border">
              <img
                src="https://images.unsplash.com/photo-1775519520461-6b6e068d9250?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxkYXRhJTIwY2VudGVyJTIwYmx1ZXxlbnwwfHx8fDE3ODM4ODA1Njl8MA&ixlib=rb-4.1.0&q=85"
                alt="Modern data centre"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(214_60%_10%)]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Where we operate</div>
                  <div className="font-display text-2xl font-semibold text-white mt-1">Cloud · Network · Security</div>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 px-3 py-2 text-white text-xs">Pune, IN</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-secondary/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">What we do</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                Thirteen focused practices. One accountable partner.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
                All services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  to="/services"
                  data-testid={`service-card-${s.slug}`}
                  className="group card-lift block h-full rounded-2xl border border-border bg-card p-7"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(207_100%_38%)] to-[hsl(191_100%_45%)] text-white flex items-center justify-center">
                    <Ico name={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Industries we power</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            Tailored technology for regulated, high-stakes environments.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 0.04}>
              <Link
                to="/industries"
                data-testid={`industry-tile-${ind.title.toLowerCase()}`}
                className="group block rounded-2xl border border-border bg-card p-6 card-lift"
              >
                <div className="h-11 w-11 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Ico name={ind.icon} className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-5 font-display font-semibold">{ind.title}</div>
                <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{ind.desc}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TECHNOLOGIES MARQUEE */}
      <section className="border-y border-border bg-[hsl(214_60%_8%)] text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/60">Technology partners</span>
            <Link to="/technologies" className="text-xs uppercase tracking-widest text-white/70 hover:text-white">Full stack →</Link>
          </div>
        </div>
        <div className="relative overflow-hidden pb-16">
          <div className="flex gap-16 animate-marquee whitespace-nowrap items-center px-10">
            {[...TECHNOLOGIES, ...TECHNOLOGIES].map((t, i) => {
              const I = SiIcons[t.key] || SiIcons.SiCloudflare;
              return (
                <div key={i} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <I className="h-8 w-8" />
                  <span className="font-display text-lg">{t.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US TEASER */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
        <div className="grid lg:grid-cols-3 gap-12">
          <Reveal className="lg:col-span-1">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Why teams choose us</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
              The partner behind the platform.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We're the team enterprise IT leaders trust to translate strategy into running systems — with the discipline of a large SI and the responsiveness of a boutique.
            </p>
            <Link to="/why-us" className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary">
              See all reasons <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {WHY_US.slice(0, 6).map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div data-testid={`why-tile-${i}`} className="rounded-2xl border border-border bg-card p-6 card-lift">
                  <Ico name={w.icon} className="h-6 w-6 text-primary" />
                  <div className="mt-4 font-display font-semibold">{w.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{w.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-7xl relative overflow-hidden rounded-3xl border border-border bg-[hsl(214_60%_10%)] text-white p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[hsl(191_100%_45%)]/20 blur-3xl" aria-hidden />
          <div className="relative grid md:grid-cols-[1.5fr_auto] gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                Let's design your next enterprise technology chapter.
              </h3>
              <p className="mt-5 text-white/70 max-w-xl">
                Book a 30-minute discovery call. We'll listen, sketch an approach, and share a candid perspective — no obligations.
              </p>
            </div>
            <Link to="/contact">
              <Button data-testid="home-cta-band" size="lg" className="rounded-full h-12 px-8 bg-white text-[hsl(214_60%_10%)] hover:bg-white/90">
                Schedule consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
