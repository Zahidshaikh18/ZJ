import * as Icons from "lucide-react";
import { Reveal } from "@/components/Motion";
import Counter from "@/components/Motion";
import { WHY_US, STATS } from "@/lib/company";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Ico = ({ name, className }) => {
  const I = Icons[name] || Icons.Sparkles;
  return <I className={className} aria-hidden />;
};

export default function WhyUs() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[hsl(214_60%_9%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[hsl(191_100%_70%)]">Why choose us</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Why enterprise IT leaders bet on us.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              We're the partner that shows up on day one — and stays on for year five. Here's what makes that possible.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {WHY_US.map((w, i) => {
            const size = i === 0 ? "md:col-span-2 md:row-span-2" : i === 4 ? "md:col-span-2" : "";
            const highlight = i === 0;
            return (
              <Reveal key={w.title} delay={i * 0.04}>
                <div
                  data-testid={`why-card-${i}`}
                  className={`h-full rounded-3xl border border-border p-8 card-lift relative overflow-hidden ${
                    highlight
                      ? "bg-gradient-to-br from-[hsl(214_60%_10%)] to-[hsl(207_100%_18%)] text-white"
                      : "bg-card"
                  } ${size}`}
                >
                  {highlight && <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[hsl(191_100%_45%)]/25 blur-3xl" />}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${highlight ? "bg-white/10" : "bg-primary/10 text-primary"}`}>
                    <Ico name={w.icon} className="h-6 w-6" />
                  </div>
                  <h3 className={`mt-6 font-display font-semibold ${highlight ? "text-2xl md:text-3xl" : "text-xl"}`}>{w.title}</h3>
                  <p className={`mt-3 leading-relaxed ${highlight ? "text-white/70 max-w-md" : "text-sm text-muted-foreground"}`}>{w.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">How we deliver</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            A repeatable delivery discipline — engineered for enterprise scale.
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { n: "01", t: "Discover", d: "Deep listening. Current-state analysis. Alignment on outcomes." },
            { n: "02", t: "Design", d: "Reference architecture, risk register and a candid delivery plan." },
            { n: "03", t: "Deploy", d: "Delivered in agile sprints with client sign-offs at every milestone." },
            { n: "04", t: "Operate", d: "SLA-backed managed services and continuous optimisation." },
          ].map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-7 h-full card-lift">
                <div className="font-display text-4xl font-semibold text-primary/30">{p.n}</div>
                <div className="mt-4 font-display font-semibold text-lg">{p.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{p.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-7xl relative overflow-hidden rounded-3xl border border-border bg-[hsl(214_60%_10%)] text-white p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
          <div className="relative grid md:grid-cols-[1.5fr_auto] gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                Ready to see what we can do for your organisation?
              </h3>
              <p className="mt-5 text-white/70 max-w-xl">Book a discovery call and we'll come back with a plan and references.</p>
            </div>
            <Link to="/contact">
              <Button data-testid="why-us-cta" size="lg" className="rounded-full h-12 px-8 bg-white text-[hsl(214_60%_10%)] hover:bg-white/90">
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
