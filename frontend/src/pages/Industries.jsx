import * as Icons from "lucide-react";
import { Reveal } from "@/components/Motion";
import { INDUSTRIES } from "@/lib/company";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Ico = ({ name, className }) => {
  const I = Icons[name] || Icons.Sparkles;
  return <I className={className} aria-hidden />;
};

export default function Industries() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[hsl(214_60%_9%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[hsl(191_100%_70%)]">Industries</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Regulated. Complex. Mission-critical. That's where we thrive.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              We tailor engagements to the language, constraints and outcomes of each sector — never with a generic playbook.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 0.04}>
              <div data-testid={`industry-card-${ind.title.toLowerCase()}`} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 card-lift h-full">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl group-hover:from-primary/25 group-hover:to-accent/25 transition-all" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Ico name={ind.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{ind.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 rounded-3xl border border-border bg-secondary/40 p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
                Don't see your industry? We probably serve it.
              </h3>
              <p className="mt-4 text-muted-foreground max-w-xl">Reach out with your context — we'll come back with references and a proposed approach.</p>
            </div>
            <Link to="/contact">
              <Button data-testid="industries-cta" className="rounded-full bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)]">
                Talk to an expert <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
