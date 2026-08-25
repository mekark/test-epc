"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const HIGHLIGHTS = [
  "Turnkey factory construction",
  "Industrial civil works and infrastructure",
  "Manufacturing facility construction",
  "Industrial tanks and water treatment plants",
  "Industrial MEP and utility systems",
] as const;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function HeroServiceHighlights() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.08,
        ease: EASE_OUT,
      }}
      className="mx-auto mt-8 hidden w-full max-w-4xl md:block"
    >
      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.34em] text-white/72">
        Turnkey Construction for Factories, Manufacturing Plants &amp; Heavy Industries
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map((highlight, index) => (
          <motion.div
            key={highlight}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              delay: prefersReducedMotion ? 0 : 0.12 + index * 0.05,
              ease: EASE_OUT,
            }}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#09090B]/34 px-4 py-3 backdrop-blur-[1px]"
          >
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#C4161C] text-[#FFFFFF]">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="text-sm leading-6 text-white/92">{highlight}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
