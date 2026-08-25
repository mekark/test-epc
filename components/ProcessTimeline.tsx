"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Cable,
  CircleCheckBig,
  DraftingCompass,
  Factory,
  ScanSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

/* ---------------------------------------------------------
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. The section follows a wide alternating
 * process layout with overlapping image circles and a single
 * scroll-linked center spine.
 *
 *    0ms   heading settles in
 *  scroll  spine fills from top to bottom
 *  160ms   step markers settle onto the spine
 *  220ms   wide step panels slide in by side
 *  hover   image circle scales softly, panel lifts slightly
 * --------------------------------------------------------- */

const TIMING = {
  headerReveal: 0.56,
  sectionReveal: 0.62,
  stepReveal: 0.58,
  markerReveal: 0.38,
  hoverLift: 0.22,
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

const STEPS: Array<{
  number: string;
  label: string;
  title: string;
  description: string;
  chips: string[];
  image: string;
  imageAlt: string;
  icon: LucideIcon;
}> = [
  {
    number: "01",
    label: "Discovery",
    title: "Understanding Your Production Vision",
    description:
      "We study your manufacturing process, production targets, site constraints, and future expansion needs so the project begins with a clear operational foundation.",
    chips: ["Production Brief", "Site Realities"],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial planning discussion and early project review",
    icon: ScanSearch,
  },
  {
    number: "02",
    label: "Planning",
    title: "Smart Factory Design & Engineering",
    description:
      "We shape layout logic, structural direction, service coordination, and delivery planning into a build-ready engineering path for efficient industrial execution.",
    chips: ["Factory Layout", "Engineering Coordination"],
    image: "/Smart%20Factory%20Design%20%26%20Engineering.jpeg",
    imageAlt: "Smart factory design and engineering planning for an industrial facility",
    icon: DraftingCompass,
  },
  {
    number: "03",
    label: "Execution",
    title: "Building the Industrial Backbone",
    description:
      "Civil works, foundations, steel framing, and primary infrastructure are executed with disciplined sequencing to create a strong operational base.",
    chips: ["Structural Shell", "Core Infrastructure"],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial civil works and structural construction activity on site",
    icon: Factory,
  },
  {
    number: "04",
    label: "Integration",
    title: "Integrating Plant Utilities & Systems",
    description:
      "Electrical systems, piping, mechanical services, and water treatment infrastructure are integrated so the facility works as one coordinated plant environment.",
    chips: ["MEP Systems", "Utility Integration"],
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial plant systems and utility coordination equipment",
    icon: Cable,
  },
  {
    number: "05",
    label: "Handover",
    title: "Ready for Production",
    description:
      "Testing, commissioning, final checks, and closeout are completed so the facility is handed over ready for safe and stable manufacturing operations.",
    chips: ["Commissioning", "Operational Readiness"],
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial inspection and commissioning review before final production handover",
    icon: CircleCheckBig,
  },
] as const;

function TimelineStep({
  index,
  step,
  prefersReducedMotion,
}: {
  index: number;
  step: (typeof STEPS)[number];
  prefersReducedMotion: boolean;
}) {
  const stepRef = useRef<HTMLDivElement | null>(null);
  const isActive = useInView(stepRef, {
    amount: 0.38,
    margin: "0px 0px -14% 0px",
  });
  const isRight = index % 2 === 1;
  const Icon = step.icon;

  return (
    <motion.div
      ref={stepRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: prefersReducedMotion ? 0 : TIMING.stepReveal,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: EASING.easeOut,
      }}
      className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6"
    >
      <div className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-1 lg:items-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 10 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: prefersReducedMotion ? 0 : TIMING.markerReveal,
            delay: prefersReducedMotion ? 0 : index * 0.04,
            ease: EASING.easeOut,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: isActive ? 1.08 : 1,
                  backgroundColor: isActive ? "#C4161C" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#C4161C",
                  borderColor: isActive ? "rgba(196,22,28,0.42)" : "rgba(196,22,28,0.16)",
                  boxShadow: isActive
                    ? "0 24px 54px -28px rgba(196,22,28,0.5)"
                    : "0 16px 42px -30px rgba(9,9,11,0.18)",
                }
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-[0.72rem] font-semibold tracking-[0.16em] sm:h-[3.25rem] sm:w-[3.25rem] sm:text-[0.8rem] lg:h-[3.75rem] lg:w-[3.75rem]"
        >
          {step.number}
        </motion.div>
      </div>

      <div className={`${isRight ? "lg:col-start-3" : "lg:col-start-1"} relative`}>
        <div
          className={`absolute left-6 top-6 h-[2px] w-6 bg-[linear-gradient(90deg,rgba(196,22,28,0.24),rgba(196,22,28,0.58))] lg:hidden ${
            isActive ? "opacity-100" : "opacity-70"
          }`}
        />
        <div
          className={`absolute top-1/2 hidden h-[2px] -translate-y-1/2 bg-[linear-gradient(90deg,rgba(196,22,28,0.14),rgba(196,22,28,0.62))] lg:block ${
            isRight ? "-left-6 w-6" : "-right-6 w-6 rotate-180"
          }`}
        />

        <motion.article
          whileHover={prefersReducedMotion ? undefined : { y: -4 }}
          transition={{
            duration: prefersReducedMotion ? 0 : TIMING.hoverLift,
            ease: "easeOut",
          }}
          className={`group relative rounded-[1.7rem] border bg-white shadow-[0_28px_90px_-58px_rgba(9,9,11,0.22)] transition-colors sm:rounded-[2rem] lg:min-h-[18rem] ${
            isActive ? "border-[#C4161C]/28" : "border-[#E4E4E7]"
          } ${
            isRight
              ? "px-5 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-10 lg:pl-10 lg:pr-32"
              : "px-5 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-10 lg:pl-32 lg:pr-10"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(196,22,28,0.42),transparent)]" />
          <div
            className={`pointer-events-none absolute inset-0 rounded-[1.7rem] sm:rounded-[2rem] transition-opacity duration-300 ${
              isActive
                ? "opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(196,22,28,0.08),transparent_38%)]"
                : "opacity-0"
            }`}
          />

          <div className="relative mb-5 flex justify-center lg:hidden">
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                ease: EASING.easeOut,
              }}
              className="relative h-[6.9rem] w-[6.9rem] rounded-full"
            >
              <div className="absolute inset-0 rounded-full border-[7px] border-[#FAFAFA] bg-white shadow-[0_22px_52px_-34px_rgba(9,9,11,0.28)]" />
              <div className="absolute inset-[0.36rem] overflow-hidden rounded-full border border-[#C4161C]/18">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover"
                  sizes="7rem"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.08),rgba(9,9,11,0.42))]" />
              </div>
              <div className="absolute bottom-[0.42rem] right-[0.42rem] flex h-8 w-8 items-center justify-center rounded-full bg-[#C4161C] text-white shadow-[0_14px_30px_-18px_rgba(196,22,28,0.62)]">
                <Icon className="h-4 w-4" />
              </div>
            </motion.div>
          </div>

          <div
            className={`absolute top-6 h-[6.75rem] w-[6.75rem] rounded-full sm:h-[7.5rem] sm:w-[7.5rem] lg:top-1/2 lg:h-40 lg:w-40 lg:-translate-y-1/2 ${
              isRight
                ? "left-6 lg:left-auto lg:-right-8"
                : "left-6 lg:-left-8"
            } hidden lg:block`}
          >
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                ease: EASING.easeOut,
              }}
              className="relative h-full w-full rounded-full"
            >
              <div className="absolute inset-0 rounded-full border-[8px] border-[#FAFAFA] bg-white shadow-[0_28px_70px_-40px_rgba(9,9,11,0.32)]" />
              <div className="absolute inset-[0.4rem] overflow-hidden rounded-full border border-[#C4161C]/18">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 8rem, 14rem"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.1),rgba(9,9,11,0.48))]" />
              </div>
              <div className="absolute bottom-[0.55rem] right-[0.55rem] flex h-9 w-9 items-center justify-center rounded-full bg-[#C4161C] text-white shadow-[0_16px_34px_-20px_rgba(196,22,28,0.65)] sm:h-10 sm:w-10">
                <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex rounded-full border border-[#C4161C]/14 bg-[#C4161C]/6 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#C4161C]">
                    {step.label}
                  </div>
                  <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-zinc-600 lg:hidden">
                    Step {step.number}
                  </div>
                </div>
                <h3 className="mt-4 max-w-2xl text-[1.22rem] font-semibold tracking-[-0.035em] text-[#09090B] sm:text-[1.45rem] lg:mt-5 lg:text-[1.85rem]">
                  {step.title}
                </h3>
              </div>
              <div className="hidden shrink-0 text-[2.7rem] font-semibold tracking-[-0.08em] text-[#C4161C]/12 sm:text-[3rem] lg:block lg:text-[3.55rem]">
                {step.number}
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-[0.92rem] leading-6 text-[#52525B] sm:mt-5 sm:text-[0.98rem] sm:leading-7 lg:text-[1rem] lg:leading-8">
              {step.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
              {step.chips.map((chip) => (
                <span
                  key={chip}
                  className={`rounded-full border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] sm:text-[0.64rem] sm:tracking-[0.18em] ${
                    isActive
                      ? "border-[#C4161C]/18 bg-[#C4161C]/8 text-[#C4161C]"
                      : "border-zinc-200 bg-zinc-50 text-zinc-600"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

export default function ProcessTimeline() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.82", "end 0.18"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0.24, 0.92, 1]);

  return (
    <section id="process" className="relative bg-[#FAFAFA] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-70" style={SECTION_TEXTURE} />
        <div className="absolute left-12 top-16 h-40 w-40 rounded-full border border-[#18181B]/8" />
        <div className="absolute bottom-20 right-12 h-52 w-52 rounded-full border border-[#C4161C]/10" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{
            duration: prefersReducedMotion ? 0 : TIMING.headerReveal,
            ease: EASING.easeOut,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#C4161C]">
            Execution Framework
          </div>
          <h2 className="mt-5 text-[2.5rem] font-semibold tracking-[-0.04em] text-[#09090B] md:text-5xl lg:text-[3.6rem]">
            Our Process
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#52525B] md:text-xl">
            A connected five-step project path that moves from production intent to engineering, execution, systems integration, and production-ready handover.
          </p>
        </motion.div>

        <motion.div
          ref={timelineRef}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{
            duration: prefersReducedMotion ? 0 : TIMING.sectionReveal,
            delay: prefersReducedMotion ? 0 : 0.08,
            ease: EASING.easeOut,
          }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <div className="absolute bottom-6 left-6 top-6 w-[2px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(24,24,27,0.08),rgba(24,24,27,0.14),rgba(24,24,27,0.06))] lg:left-1/2" />
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : {
                    scaleY: lineScaleY,
                    opacity: lineOpacity,
                  }
            }
            initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0.2 }}
            className="absolute bottom-6 left-6 top-6 origin-top w-[2px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(196,22,28,0.16),rgba(196,22,28,0.94),rgba(196,22,28,0.22))] lg:left-1/2"
          />

          <div className="space-y-10 sm:space-y-12 lg:space-y-14">
            {STEPS.map((step, index) => (
              <TimelineStep
                key={step.number}
                index={index}
                step={step}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#C4161C] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-[#C4161C]"
            >
              Start Project Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
