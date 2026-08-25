"use client";

import { ArrowUpRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function FinalProjectCTA() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative z-20 overflow-visible bg-[#FFFFFF] pb-0 pt-4 md:pt-6">
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.58,
            ease: EASE_OUT,
          }}
          className="relative mx-auto -mb-10 max-w-5xl overflow-hidden rounded-[1.45rem] border border-[#E4E4E7]/12 bg-[#C4161C] px-5 py-6 shadow-[0_36px_90px_-54px_rgba(9,9,11,0.28)] sm:-mb-12 sm:px-6 md:-mb-20 md:rounded-[1.7rem] md:px-8 md:py-8"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#C4161C,transparent)]" />

          <div className="grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="max-w-2xl">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/78">
                Strategic Discussion
              </div>
              <h2 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.03em] text-[#FFFFFF] sm:text-[2rem] md:text-[2.75rem] md:leading-[1.02]">
                Discuss Your Industrial Project
              </h2>
              <p className="mt-3 max-w-2xl text-[0.92rem] leading-6 text-[#E4E4E7] sm:text-[0.98rem] sm:leading-7 md:text-base">
                Speak with our team about your manufacturing facility, plant infrastructure, or turnkey construction requirement before submitting your project details.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#C4161C] shadow-[0_18px_34px_-22px_rgba(9,9,11,0.34)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#F4F4F5] sm:px-7 sm:py-4 sm:text-sm"
              >
                <span>Get Free Consultation</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="tel:9790924754"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-[#09090B]/20 px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-[1.02] hover:border-white/36 hover:bg-[#09090B]/28 sm:px-7 sm:py-4 sm:text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now: 97909 24754</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
