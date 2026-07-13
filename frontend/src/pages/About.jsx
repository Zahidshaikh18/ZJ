import { Reveal } from "@/components/Motion";
import { COMPANY, TIMELINE } from "@/lib/company";
import { Link } from "react-router-dom";
import { ShieldCheck, Zap, Handshake, Star, Compass, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VALUES = [
  { icon: Zap, title: "Innovation", desc: "We keep raising the bar — evaluating new approaches so our clients don't have to." },
  { icon: ShieldCheck, title: "Integrity", desc: "Straight-forward conversations, transparent estimates, honest trade-offs." },
  { icon: Star, title: "Reliability", desc: "SLA-backed delivery and support — because uptime is a business KPI." },
  { icon: Compass, title: "Security", desc: "Security-first thinking runs through architecture, code and operations." },
  { icon: Users, title: "Customer Success", desc: "Named account teams and quarterly reviews on every engagement." },
  { icon: Handshake, title: "Long-Term Partnership", desc: "Multi-year relationships built on outcomes and mutual growth." },
];

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[hsl(214_60%_9%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[hsl(191_100%_70%)]">About {COMPANY.name}</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Building the technology backbone of ambitious organisations.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              Founded in {COMPANY.founded} by {COMPANY.founder}, {COMPANY.name} exists to make enterprise-grade IT — infrastructure, security, cloud and software — accessible, reliable and aligned to business outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-10">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Mission</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                Deliver the technology outcomes our clients bet their business on.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                We combine deep engineering with disciplined delivery to design, secure and operate systems that scale with our clients — from ambitious SMEs to national enterprises.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-accent/10 p-10">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Vision</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                The most trusted enterprise IT partner in India.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                To be the technology partner recognised across sectors for engineering excellence, integrity and long-term customer relationships.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-secondary/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Core values</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
              Six values. Non-negotiable.
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div data-testid={`value-${v.title.toLowerCase()}`} className="rounded-2xl border border-border bg-card p-7 card-lift h-full">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-4xl px-6 lg:px-10 py-28 lg:py-36">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Our journey</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
            From founding to national footprint.
          </h2>
        </Reveal>
        <ol className="mt-16 relative border-l border-border pl-8 space-y-12">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <li className="relative">
                <span className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-[hsl(207_100%_45%)] to-[hsl(191_100%_45%)] ring-4 ring-background" />
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-primary">{t.year}</div>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{t.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* LEADERSHIP */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-32">
        <div className="rounded-3xl border border-border bg-card overflow-hidden grid md:grid-cols-[1fr_1.2fr]">
          <div className="p-10 md:p-14">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Leadership philosophy</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Lead with clarity. Deliver with discipline. Grow together.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Under the founding leadership of {COMPANY.founder}, {COMPANY.name} operates on three principles — deep customer focus, engineering excellence, and long-term partnerships that stand the test of time.
            </p>
            <Link to="/contact" className="inline-block mt-8">
              <Button data-testid="about-cta" className="rounded-full bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)]">
                Meet the team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1758691737124-05c5bffe46f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB0ZWFtfGVufDB8fHx8MTc4Mzg4MDUzNXww&ixlib=rb-4.1.0&q=85"
              alt="ZJ Infosystem team"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
