import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Counter({ to, decimals = 0, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const textRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    const unsub = mv.on("change", (v) => {
      if (textRef.current) textRef.current.textContent = v.toFixed(decimals);
    });
    return () => { controls.stop(); unsub(); };
  }, [inView, to, decimals, duration, mv]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <span ref={textRef}>0</span>
      <span>{suffix}</span>
    </span>
  );
}

export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
