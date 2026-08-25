"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TIMING = {
  headerReveal: 0.5,
  cardReveal: 0.55,
} as const;

const EASING = {
  easeOut: [0.215, 0.61, 0.355, 1] as const,
};

const SECTION_TEXTURE = {
  backgroundImage: `
    linear-gradient(rgba(24, 24, 27, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 24, 27, 0.04) 1px, transparent 1px)
  `,
  backgroundSize: "28px 28px, 28px 28px",
  backgroundPosition: "-1px -1px, -1px -1px",
} satisfies CSSProperties;

const TESTIMONIALS = [
  {
    id: "precision-components",
    title: "Reliable Industrial Contractors",
    quote:
      "The team delivered our manufacturing plant construction project with excellent quality and professional execution.",
  },
  {
    id: "integrated-process",
    title: "Professional Industrial Builders",
    quote:
      "They handled our complete factory setup services efficiently from planning to commissioning.",
  },
  {
    id: "axis-heavy",
    title: "Trusted Industrial Construction Partner",
    quote:
      "Strong expertise in industrial civil works and manufacturing facility infrastructure.",
  },
] as const;

export default function TestimonialsSpotlight() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={SECTION_TEXTURE}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: prefersReducedMotion ? 0 : TIMING.headerReveal,
            ease: EASING.easeOut,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#C4161C]">
            Client Testimonials
          </div>
          <h2 className="mt-5 text-[2.35rem] font-semibold tracking-[-0.03em] text-[#09090B] md:text-5xl">
            What Clients Say
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#52525B] md:text-xl">
            Feedback from industrial project teams on execution quality,
            coordination, and delivery.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: prefersReducedMotion ? 0 : TIMING.cardReveal,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: EASING.easeOut,
              }}
              className="flex h-full flex-col rounded-[1.5rem] border border-[#E4E4E7] bg-white p-6 shadow-[0_24px_60px_-48px_rgba(9,9,11,0.18)] md:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 text-[#C4161C]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C4161C]/10 text-[#C4161C]">
                  <Quote className="h-5 w-5" />
                </div>
              </div>

              <blockquote className="mt-6 flex-1 text-[1.02rem] leading-8 text-[#18181B]">
                {testimonial.quote}
              </blockquote>

              <div className="mt-8 border-t border-[#E4E4E7] pt-5">
                <div className="text-[0.98rem] font-semibold text-[#18181B]">
                  {testimonial.title}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
