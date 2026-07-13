import * as SiIcons from "react-icons/si";
import { Reveal } from "@/components/Motion";
import { TECHNOLOGIES } from "@/lib/company";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { title: "Cloud Platforms", tags: ["Microsoft Azure", "AWS", "Google Cloud", "Oracle"] },
  { title: "Microsoft Stack", tags: ["Microsoft", "Windows Server", "Microsoft 365"] },
  { title: "Virtualization", tags: ["VMware"] },
  { title: "Networking", tags: ["Cisco", "Cloudflare"] },
  { title: "Security", tags: ["Fortinet"] },
  { title: "Linux & Containers", tags: ["Linux", "Ubuntu", "Red Hat", "Docker", "Kubernetes"] },
];

export default function Technologies() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[hsl(214_60%_9%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[hsl(191_100%_70%)]">Technologies</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              The engineered stack behind enterprise outcomes.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              Certified expertise across the vendors and open platforms our clients rely on — deployed with senior engineers on every project.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {TECHNOLOGIES.map((t, i) => {
            const Icon = SiIcons[t.key] || SiIcons.SiCloudflare;
            return (
              <Reveal key={t.name} delay={i * 0.03}>
                <div
                  data-testid={`tech-card-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group aspect-square rounded-2xl border border-border bg-card flex flex-col items-center justify-center gap-4 card-lift relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/10 transition-colors" />
                  <Icon className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="text-sm font-medium">{t.name}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Practice areas</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
              Organized by capability. Delivered as one team.
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-7 card-lift h-full">
                  <div className="font-display font-semibold text-lg">{c.title}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full border border-border bg-secondary/60 px-3 py-1.5">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-7xl relative overflow-hidden rounded-3xl border border-border bg-secondary/40 p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
              Want a technical deep-dive on any of these?
            </h3>
            <p className="mt-4 text-muted-foreground max-w-xl">Our solution architects are happy to walk you through reference designs, case studies and options.</p>
          </div>
          <Link to="/contact">
            <Button data-testid="tech-cta" className="rounded-full bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)]">
              Book an architect <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
