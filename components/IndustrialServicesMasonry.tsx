"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { renderServiceDescription } from "../lib/serviceDescription";

/* ---------------------------------------------------------
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each `at` value is ms after scroll trigger.
 *
 *    0ms   section heading fades up
 *  120ms   card 01 fades in, translateY 28px -> 0
 *  200ms   card 02 fades in
 *  280ms   card 03 fades in
 *  hover   image scales slightly, overlay softens, accent bar extends
 * --------------------------------------------------------- */

const TIMING = {
  heading: 680,
  cardReveal: 620,
  cardStagger: 80,
  hover: 420,
} as const;

const EASING = {
  enter: [0.215, 0.61, 0.355, 1] as const,
  move: [0.645, 0.045, 0.355, 1] as const,
};

const BLUEPRINT_TEXTURE = {
  backgroundImage: `
    linear-gradient(rgba(24, 24, 27, 0.034) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 24, 27, 0.034) 1px, transparent 1px),
    linear-gradient(rgba(196, 22, 28, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(196, 22, 28, 0.04) 1px, transparent 1px)
  `,
  backgroundSize: "36px 36px, 36px 36px, 180px 180px, 180px 180px",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
} as const;

const SERVICES = [
  {
    number: "01",
    title: "Turnkey Factory Construction",
    description:
      "Design, engineering, construction, and commissioning delivered under one execution team.",
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Turnkey%20Factory%20Construction.jpg",
    imageAlt: "Industrial construction site with structural framing and cranes",
    tag: "Turnkey Delivery",
    tone: "featured",
    layoutClass: "md:col-span-2 lg:col-span-7 lg:row-span-4",
    heightClass: "min-h-[22rem] md:min-h-[23rem] lg:min-h-0 lg:h-full",
  },
  {
    number: "02",
    title: "Industrial Plant Builders",
    description:
      "Heavy-industry infrastructure for process, utility, and engineered plant environments.",
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Plant%20Builders.jpg",
    imageAlt: "Industrial plant framework and engineering infrastructure",
    tag: "Process Infrastructure",
    tone: "standard",
    layoutClass: "lg:col-span-5 lg:row-span-2",
    heightClass: "min-h-[18rem] md:min-h-[18.5rem] lg:min-h-0 lg:h-full",
  },
  {
    number: "03",
    title: "Manufacturing Facility Construction",
    description:
      "Construction of modern manufacturing facilities designed for efficient production, future expansion, and operational excellence.",
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/manufacturing.jpg",
    imageAlt: "Large industrial interior with manufacturing infrastructure",
    tag: "Factory Environments",
    tone: "standard",
    layoutClass: "lg:col-span-5 lg:row-span-2",
    heightClass: "min-h-[18rem] md:min-h-[18.5rem] lg:min-h-0 lg:h-full",
  },
  {
    number: "04",
    title: "Industrial Civil Works",
    description:
      "Comprehensive civil works for factories, industrial buildings, and infrastructure projects with precision engineering.",
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Civil.jpg",
    imageAlt: "Heavy civil works and structural construction for an industrial site",
    tag: "Structural Execution",
    tone: "featured",
    layoutClass: "md:col-span-2 lg:col-span-7 lg:row-span-4",
    heightClass: "min-h-[22rem] md:min-h-[23rem] lg:min-h-0 lg:h-full",
  },
  {
    number: "05",
    title: "Industrial Tank Construction",
    description:
      "ETP, STP, WTP, and custom tank systems built for plant operations.",
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Tank%20Construction.jpg",
    imageAlt: "Industrial tanks and plant storage infrastructure",
    tag: "Water Systems",
    tone: "standard",
    layoutClass: "lg:col-span-5 lg:row-span-2",
    heightClass: "min-h-[18rem] md:min-h-[18.5rem] lg:min-h-0 lg:h-full",
  },
  {
    number: "06",
    title: "Industrial MEP & Utility Systems",
    description:
      "Electrical, piping, and mechanical utility networks for industrial facilities.",
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20MEP%20%26%20Utility%20Systems.jpg",
    imageAlt: "Industrial piping and utility systems inside a plant environment",
    tag: "Utility Networks",
    tone: "standard",
    layoutClass: "lg:col-span-5 lg:row-span-2",
    heightClass: "min-h-[18rem] md:min-h-[18.5rem] lg:min-h-0 lg:h-full",
  },
  {
    number: "07",
    title: "EOT Crane Structural Systems",
    description:
      "Structural solutions engineered for heavy-duty industrial cranes and manufacturing plants.",
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/eot%20crane.jpg",
    imageAlt: "Steel crane structures inside a heavy industrial facility",
    tag: "Heavy Movement Systems",
    tone: "wide",
    layoutClass: "md:col-span-2 lg:col-span-12 lg:row-span-3",
    heightClass: "min-h-[17rem] md:min-h-[18rem] lg:min-h-0 lg:h-full",
  },
] as const;

export default function IndustrialServicesMasonry() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-45" style={BLUEPRINT_TEXTURE} />
      <div className="pointer-events-none absolute -left-16 top-24 h-56 w-56 border border-[#18181B]/6" />
      <div className="pointer-events-none absolute right-16 top-28 h-44 w-44 border border-[#C4161C]/8" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: prefersReducedMotion ? 0 : TIMING.heading / 1000,
            ease: EASING.enter,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#C4161C]">
            Capability Catalogue
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[#09090B] md:text-5xl">
            Complete Factory Construction &amp; Industrial EPC Services
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#52525B] md:text-xl">
            End-to-end capabilities for factories, manufacturing plants, process facilities, utility systems, and heavy industrial infrastructure.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-7 lg:grid-cols-12 lg:auto-rows-[112px] lg:gap-7">
          {SERVICES.map((service, index) => {
            const isFeatured = service.tone === "featured";
            const isWide = service.tone === "wide";
            const isStandard = service.tone === "standard";
            const showChip = isFeatured || isWide;

            return (
              <motion.article
                key={service.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={prefersReducedMotion ? undefined : "hover"}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : TIMING.cardReveal / 1000,
                  delay: prefersReducedMotion ? 0 : index * (TIMING.cardStagger / 1000),
                  ease: EASING.enter,
                }}
                className={`${service.layoutClass} ${service.heightClass} group relative overflow-hidden rounded-[1.05rem] border border-[#E4E4E7]/45 bg-[#09090B] shadow-[0_24px_52px_-42px_rgba(9,9,11,0.28)] md:rounded-[1.15rem]`}
              >
                <motion.div
                  variants={{
                    hover: { scale: 1.025 },
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : TIMING.hover / 1000,
                    ease: EASING.move,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover brightness-[0.78] saturate-[0.82]"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 50vw"
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hover: { opacity: 0.92 },
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : TIMING.hover / 1000,
                    ease: EASING.enter,
                  }}
                  className={`absolute inset-0 ${
                    isFeatured || isWide
                      ? "bg-[linear-gradient(180deg,rgba(9,9,11,0.34)_0%,rgba(24,24,27,0.66)_45%,rgba(9,9,11,0.9)_100%)]"
                      : "bg-[linear-gradient(180deg,rgba(9,9,11,0.42)_0%,rgba(24,24,27,0.7)_50%,rgba(9,9,11,0.94)_100%)]"
                  }`}
                />

                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#C4161C,transparent)] opacity-70" />

                <div
                  className={`relative z-10 flex h-full flex-col ${
                    isFeatured || isWide ? "justify-between" : "justify-end"
                  } ${isStandard ? "p-5 md:p-5" : "p-6 md:p-7"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#C4161C]">
                      {service.number}
                    </div>
                    {showChip ? (
                      <div className="inline-flex items-center rounded-md border border-[#E4E4E7]/18 bg-[#09090B]/36 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#E4E4E7]">
                        {service.tag}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <motion.div
                      variants={{
                        hover: { scaleX: 1, opacity: 1 },
                      }}
                      initial={false}
                      transition={{
                        duration: prefersReducedMotion ? 0 : TIMING.hover / 1000,
                        ease: EASING.enter,
                      }}
                      className={`mb-4 h-px origin-left bg-[#C4161C] ${
                        isFeatured ? "w-16" : isWide ? "w-14" : "w-10"
                      } opacity-65`}
                    />
                    <h3
                      className={`font-semibold tracking-[-0.03em] text-[#FFFFFF] ${
                        isFeatured
                          ? "max-w-[18rem] text-[2.15rem] leading-[1.12] md:max-w-[20rem] md:text-[2.45rem]"
                          : isWide
                            ? "max-w-[26rem] text-[2rem] leading-[1.14] md:text-[2.2rem]"
                            : "max-w-[16rem] text-[1.35rem] leading-[1.12] md:text-[1.5rem]"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-3 text-[#E4E4E7] ${
                        isFeatured
                          ? "max-w-[22rem] text-[0.98rem] leading-7 md:text-base"
                          : isWide
                            ? "max-w-[28rem] text-[0.96rem] leading-7 md:text-base"
                            : "max-w-[17rem] text-[0.86rem] leading-5"
                      }`}
                    >
                      {renderServiceDescription(service.description)}
                    </p>

                    {isFeatured || isWide ? (
                      <motion.div
                        variants={{
                          hover: { x: 4 },
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : TIMING.hover / 1000,
                          ease: EASING.enter,
                        }}
                        className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#FFFFFF]"
                      >
                        <span>Explore Capability</span>
                        <ArrowUpRight className="h-4 w-4 text-[#C4161C]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        variants={{
                          hover: { x: 3 },
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : TIMING.hover / 1000,
                          ease: EASING.enter,
                        }}
                        className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E4E4E7]/18 bg-[#09090B]/32"
                      >
                        <ArrowUpRight className="h-4 w-4 text-[#C4161C]" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
