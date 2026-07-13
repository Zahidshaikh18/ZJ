import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function ParticleField() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-70 dark:opacity-90" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="g1" cx="50%" cy="30%">
          <stop offset="0%" stopColor="hsl(207 100% 55%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(207 100% 55%)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="80%" cy="80%">
          <stop offset="0%" stopColor="hsl(191 100% 50%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(191 100% 50%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g1)" />
      <rect width="100%" height="100%" fill="url(#g2)" />
    </svg>
  );
}

function FloatingCard({ x, y, delay = 0, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ left: x, top: y }}
      className={`absolute hidden lg:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(useTransform(mx, [-1, 1], [-20, 20]), { stiffness: 60, damping: 20 });
  const gy = useSpring(useTransform(my, [-1, 1], [-20, 20]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handler = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section data-testid="hero-section" className="relative overflow-hidden bg-[hsl(214_60%_8%)] text-white">
      <motion.div
        style={{ x: gx, y: gy }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <ParticleField />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(214_60%_8%)]" aria-hidden />

      {/* Floating enterprise cards */}
      <FloatingCard x="6%" y="22%" delay={0.2} className="w-56">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-4 shadow-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[hsl(191_100%_65%)]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" /> Uptime
          </div>
          <div className="mt-3 font-display text-3xl font-semibold">99.99%</div>
          <div className="text-xs text-white/60 mt-1">Managed cloud SLA</div>
        </div>
      </FloatingCard>
      <FloatingCard x="76%" y="28%" delay={0.5} className="w-60">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-4 shadow-2xl">
          <div className="text-xs uppercase tracking-widest text-[hsl(191_100%_65%)]">Zero Trust</div>
          <div className="mt-3 font-display text-lg font-semibold">Identity · Endpoint · Data</div>
          <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ delay: 1, duration: 1.4 }} className="h-full bg-gradient-to-r from-[hsl(207_100%_55%)] to-[hsl(191_100%_55%)]" />
          </div>
        </div>
      </FloatingCard>
      <FloatingCard x="70%" y="70%" delay={0.8} className="w-52">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-4 shadow-2xl">
          <div className="text-xs uppercase tracking-widest text-[hsl(191_100%_65%)]">Azure Ready</div>
          <div className="mt-3 font-display text-2xl font-semibold">Landing Zone</div>
          <div className="text-xs text-white/60 mt-1">Deployed in 14 days</div>
        </div>
      </FloatingCard>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 lg:pt-36 pb-32 lg:pb-44">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80"
        >
          <Sparkles className="h-3.5 w-3.5 text-[hsl(191_100%_65%)]" />
          Enterprise IT · Since 2021
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-headline"
          className="mt-8 font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight max-w-4xl leading-[1.05]"
        >
          Transforming Technology.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(207_100%_65%)] via-[hsl(191_100%_65%)] to-white">
            Empowering Businesses.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed"
        >
          ZJ Infosystem partners with enterprises, governments and growing businesses to design, secure and operate the technology that runs their organisation. Reliability, security and long-term partnership — engineered in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link to="/contact">
            <Button
              data-testid="hero-cta-get-started"
              size="lg"
              className="rounded-full px-7 h-12 bg-gradient-to-r from-[hsl(207_100%_45%)] to-[hsl(191_100%_45%)] text-white shadow-[0_20px_50px_-15px_hsl(207_100%_55%_/_0.65)] hover:opacity-95"
            >
              Schedule a consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/services">
            <Button
              data-testid="hero-cta-explore-services"
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              Explore services
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-white/50 text-xs uppercase tracking-widest"
        >
          Scroll
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
