"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Flag, HardHat, Cog, Clock } from "lucide-react";

const CREDENTIALS = [
  {
    id: "01",
    title: "Experienced Industrial Engineering Team",
    description: "Specialized professionals with deep domain knowledge in heavy infrastructure execution.",
    icon: HardHat,
    spec1: "15+ Years",
    spec2: "Core Team",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial engineering team reviewing project drawings",
  },
  {
    id: "02",
    title: "Expertise in Turnkey Execution",
    description: "End-to-end management spanning civil works, MEP, and structural steel networks.",
    icon: Cog,
    spec1: "Full Lifecycle",
    spec2: "Single Point",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial turnkey construction site with steel framing",
  },
  {
    id: "03",
    title: "Advanced Construction Technology",
    description: "Integration of modern operational systems, safety tech, and material tracking.",
    icon: ShieldCheck,
    spec1: "Modern Methods",
    spec2: "Tech-Driven",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial technology system with digital interface",
  },
  {
    id: "04",
    title: "Strong Project Management",
    description: "Rigorous milestone tracking and contractor coordination for zero-friction delivery.",
    icon: Flag,
    spec1: "Milestone Sync",
    spec2: "Lean Control",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Project management discussion around industrial planning",
  },
  {
    id: "05",
    title: "High Safety & Quality Standards",
    description: "Adherence to rigorous plant safety audits and structural integrity protocols.",
    icon: CheckCircle2,
    spec1: "ISO Compliant",
    spec2: "Zero Incident",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial inspection and quality review inside a plant environment",
  },
  {
    id: "06",
    title: "On-Time Delivery",
    description: "Production-ready handover sequenced logically to avoid operational downtime.",
    icon: Clock,
    spec1: "Gantt Driven",
    spec2: "JIT Delivery",
    image: "/On-Time%20Delivery.jpeg",
    imageAlt: "On-time delivery coordination for an industrial construction project",
  },
] as const;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32">
      {/* Engineered Technical Background */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tech-grid-sm-why"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#E4E4E7"
                strokeWidth="0.5"
                strokeOpacity="0.7"
              />
            </pattern>
            <pattern
              id="tech-grid-lg-why"
              width="144"
              height="144"
              patternUnits="userSpaceOnUse"
            >
              <rect width="144" height="144" fill="url(#tech-grid-sm-why)" />
              <path
                d="M 144 0 L 0 0 0 144"
                fill="none"
                stroke="#18181B"
                strokeWidth="1"
                strokeOpacity="0.08"
              />
              <path
                d="M 0 0 L 8 0 M 0 0 L 0 8 M 144 144 L 136 144 M 144 144 L 144 136 M 144 0 L 136 0 M 144 0 L 144 8 M 0 144 L 8 144 M 0 144 L 0 136"
                fill="none"
                stroke="#C4161C"
                strokeWidth="1.5"
                strokeOpacity="0.12"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid-lg-why)" />

          {/* Structural Guideline Dashes */}
          <g stroke="#C4161C" strokeOpacity="0.08" strokeWidth="1" fill="none" strokeDasharray="4 6">
            <line x1="25%" y1="0" x2="25%" y2="100%" />
            <line x1="75%" y1="0" x2="75%" y2="100%" />
          </g>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start gap-6 md:mb-24 md:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="max-w-2xl"
          >
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#C4161C]">
              Execution Credibility
            </div>
            <h2 className="mt-4 text-[2.4rem] font-semibold tracking-[-0.03em] text-[#09090B] md:mt-5 md:text-5xl lg:text-6xl">
              Engineered for <br className="hidden md:block" /> Industrial Excellence
            </h2>
          </motion.div>
          
          <motion.div
             initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
             whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
             className="max-w-sm lg:pb-2"
          >
            <p className="text-base leading-7 text-[#52525B] md:text-lg md:leading-relaxed">
              We integrate core engineering disciplines and robust project control methodologies to deliver industrial spaces that meet tomorrow&apos;s scaling requirements.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map((col, index) => {
            const Icon = col.icon;
            
            return (
              <motion.div
                key={col.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  ease: EASE_OUT,
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] p-1 shadow-[0_24px_54px_-44px_rgba(9,9,11,0.24)] transition-colors hover:border-[#C4161C]/32"
              >
                <motion.div
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_OUT }}
                  className="pointer-events-none absolute inset-0 opacity-100 transition-all duration-500 lg:group-hover:scale-[1.04]"
                >
                  <Image
                    src={col.image}
                    alt={col.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.34),rgba(24,24,27,0.9))]" />
                </motion.div>

                <div className="relative flex flex-1 flex-col p-6 sm:p-8 md:p-10">
                  <div className="mb-10 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C4161C] text-[#FFFFFF] ring-1 ring-[#C4161C]/30 transition-colors md:h-12 md:w-12">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#E4E4E7] transition-colors duration-300">
                      SEC. {col.id}
                    </div>
                  </div>

                  <h3 className="mb-4 text-[1.3rem] font-semibold tracking-tight text-[#FFFFFF] transition-colors duration-300 md:text-xl">
                    {col.title}
                  </h3>
                  
                  <p className="mb-10 text-[0.94rem] leading-7 text-[#E4E4E7] transition-colors duration-300 md:text-[0.98rem]">
                    {col.description}
                  </p>

                  {/* Technical Specs Footer */}
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <div className={`flex h-8 items-center rounded-md border px-3 text-[0.65rem] font-bold uppercase tracking-widest transition-colors duration-300 ${
                      col.spec1 === "ISO Compliant"
                        ? "border-[#f08519]/34 bg-[#f08519]/88 text-[#FFFFFF]"
                        : "border-[#E4E4E7]/24 bg-[#FFFFFF]/10 text-[#FFFFFF]"
                    }`}>
                      {col.spec1}
                    </div>
                    <div className="flex h-8 items-center rounded-md border border-[#C4161C]/36 bg-[#C4161C] px-3 text-[0.65rem] font-bold uppercase tracking-widest text-[#FFFFFF] transition-colors duration-300">
                      {col.spec2}
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute -right-6 -top-6 h-12 w-12 rotate-45 bg-[#C4161C] opacity-10 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
