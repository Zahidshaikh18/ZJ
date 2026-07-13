import { useState } from "react";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/company";
import { Reveal } from "@/components/Motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Ico = ({ name, className }) => {
  const I = Icons[name] || Icons.Sparkles;
  return <I className={className} aria-hidden />;
};

export default function Services() {
  const [active, setActive] = useState(null);
  return (
    <div>
      <section className="relative overflow-hidden bg-[hsl(214_60%_9%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[hsl(191_100%_70%)]">Services</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Thirteen specialised practices. One accountable delivery team.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              Whether you need a landing-zone in Azure, a data-centre modernisation, or a fractional CFO — our practices are engineered to work together for enterprise-grade outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.03}>
              <button
                data-testid={`service-open-${s.slug}`}
                onClick={() => setActive(s)}
                className="group text-left w-full h-full rounded-2xl border border-border bg-card p-7 card-lift"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(207_100%_38%)] to-[hsl(191_100%_45%)] text-white flex items-center justify-center">
                  <Ico name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{s.short}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActive(null)}
            data-testid="service-modal-overlay"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-background border border-border shadow-2xl"
              data-testid="service-modal"
            >
              <div className="p-8 md:p-10">
                <button
                  onClick={() => setActive(null)}
                  data-testid="service-modal-close"
                  className="absolute top-4 right-4 h-9 w-9 rounded-lg border border-border bg-background/80 hover:bg-secondary flex items-center justify-center"
                  aria-label="Close"
                >
                  <XIcon className="h-4 w-4" />
                </button>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[hsl(207_100%_38%)] to-[hsl(191_100%_45%)] text-white flex items-center justify-center">
                  <Ico name={active.icon} className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-display text-3xl md:text-4xl font-semibold tracking-tight">{active.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{active.overview}</p>

                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Business benefits</div>
                    <ul className="mt-4 space-y-2.5">
                      {active.benefits.map((b) => (
                        <li key={b} className="flex gap-3 text-sm">
                          <Check className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Key features</div>
                    <ul className="mt-4 space-y-2.5">
                      {active.features.map((b) => (
                        <li key={b} className="flex gap-3 text-sm">
                          <Check className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Industries served</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.industries.map((i) => (
                      <span key={i} className="text-xs rounded-full border border-border bg-secondary/60 px-3 py-1.5">{i}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link to="/contact">
                    <Button data-testid="service-cta-contact" className="rounded-full bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)]">
                      Discuss this service <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <button onClick={() => setActive(null)} className="text-sm text-muted-foreground hover:text-foreground">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
