"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { renderServiceDescription } from "../lib/serviceDescription";
import {
  renderBoldPhrases,
  SERVICE_INTRO_PHRASES,
} from "../lib/boldPhrases";

const SERVICES = [
  {
    number: "01",
    title: "Turnkey Factory Construction",
    description:
      "Integrated factory delivery from design coordination through execution and commissioning.",
    scopes: [
      "Architectural Design",
      "Structural Engineering",
      "Execution",
      "Commissioning",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Turnkey%20Factory%20Construction.jpg",
    imageAlt: "Industrial steel structure under construction",
    style: "featured",
    kicker: "Integrated Delivery",
  },
  {
    number: "02",
    title: "Industrial Plant Builders",
    description:
      "Infrastructure solutions for process plants, steel facilities, and heavy engineering environments.",
    scopes: [
      "Process Plants",
      "Heavy Industry",
      "Structural Build",
      "Infrastructure",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Plant%20Builders.jpg",
    imageAlt: "Industrial plant building with cranes and structural framing",
    style: "standard",
    kicker: "Process Infrastructure",
  },
  {
    number: "03",
    title: "Manufacturing Facility Construction",
    description:
      "Construction of modern manufacturing facilities designed for efficient production, future expansion, and operational excellence.",
    scopes: [
      "Assembly Planning",
      "Factory Build",
      "Workflow Layout",
      "Scalable Expansion",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/manufacturing.jpg",
    imageAlt: "Industrial construction site for a manufacturing facility",
    style: "tall",
    kicker: "Factory Environments",
  },
  {
    number: "04",
    title: "Industrial Civil Works",
    description:
      "Comprehensive civil works for factories, industrial buildings, and infrastructure projects with precision engineering.",
    scopes: [
      "Foundations",
      "Structural Frames",
      "Site Civil Works",
      "Steel Infrastructure",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Civil.jpg",
    imageAlt: "Large industrial slab and structural construction zone",
    style: "highlight",
    kicker: "Civil + Structural",
  },
  {
    number: "05",
    title: "Industrial Tank Construction",
    description:
      "Tank and treatment systems designed for plant operations, storage, and process reliability.",
    scopes: [
      "ETP / STP",
      "WTP Systems",
      "Storage Tanks",
      "Custom Fabrication",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Tank%20Construction.jpg",
    imageAlt: "Industrial utility and tank infrastructure",
    style: "tall",
    kicker: "Water + Process Systems",
  },
  {
    number: "06",
    title: "Industrial MEP & Utility Systems",
    description:
      "Electrical, piping, and mechanical utility networks structured for industrial uptime and serviceability.",
    scopes: ["Electrical", "Piping", "Mechanical", "Utilities"],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20MEP%20%26%20Utility%20Systems.jpg",
    imageAlt: "Industrial engineering controls and technical equipment",
    style: "compact",
    kicker: "Plant Utilities",
  },
  {
    number: "07",
    title: "EOT Crane Structural Systems",
    description:
      "Structural solutions engineered for heavy-duty industrial cranes and manufacturing plants.",
    scopes: [
      "Crane Support",
      "Heavy Movement",
      "Steel Structures",
      "Operational Safety",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/eot%20crane.jpg",
    imageAlt: "Industrial construction frame suitable for crane support systems",
    style: "standard",
    kicker: "Heavy Movement Systems",
  },
] as const;

const BLUEPRINT_TEXTURE = {
  backgroundImage: `
    linear-gradient(rgba(24, 24, 27, 0.038) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 24, 27, 0.038) 1px, transparent 1px),
    linear-gradient(rgba(196, 22, 28, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(196, 22, 28, 0.04) 1px, transparent 1px)
  `,
  backgroundSize: "34px 34px, 34px 34px, 170px 170px, 170px 170px",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
} as const;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

type Service = (typeof SERVICES)[number];
type MasonryStyle = Exclude<Service["style"], "featured">;

function ScopeChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#18181B] transition-colors duration-300 group-hover:border-[#C4161C]/28 group-hover:text-[#09090B]">
      {label}
    </span>
  );
}

function FeaturedServiceCard({
  service,
  prefersReducedMotion,
}: {
  service: Service;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: EASE_OUT,
      }}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      className="group relative overflow-hidden rounded-[1.6rem] border border-[#E4E4E7] bg-[#FFFFFF] shadow-[0_30px_80px_-58px_rgba(9,9,11,0.26)]"
    >
      <div className="relative lg:grid lg:min-h-[32rem] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[18rem] overflow-hidden md:min-h-[22rem] lg:min-h-full">
          <motion.div
            variants={{ hover: { scale: 1.03 } }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: EASE_OUT,
            }}
            className="absolute inset-0"
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 52vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,27,0.16),rgba(9,9,11,0.42))]" />
        </div>

        <div className="relative flex flex-1 flex-col justify-between p-6 md:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#C4161C,transparent)] opacity-80" />

          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="text-[3rem] font-bold leading-none tracking-[-0.08em] text-[#C4161C]/22 md:text-[4.35rem]">
                {service.number}
              </div>
              <div className="rounded-full border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#52525B]">
                {service.kicker}
              </div>
            </div>

            <motion.div
              variants={{ hover: { width: 124 } }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.32,
                ease: EASE_OUT,
              }}
              className="mt-5 h-px w-20 bg-[#C4161C]"
            />

            <h3 className="mt-6 max-w-[20rem] text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#09090B] md:max-w-[22rem] md:text-[2.65rem]">
              {service.title}
            </h3>

            <p className="mt-5 max-w-[28rem] text-[0.98rem] leading-7 text-[#52525B] md:text-base">
              {renderServiceDescription(service.description)}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {service.scopes.map((scope) => (
                <ScopeChip key={scope} label={scope} />
              ))}
            </div>
          </div>

          <motion.div
            variants={{ hover: { x: 4 } }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: EASE_OUT,
            }}
            className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#18181B]"
          >
            <span>Explore Scope</span>
            <ArrowUpRight className="h-4 w-4 text-[#C4161C]" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

function getImageHeight(style: MasonryStyle) {
  switch (style) {
    case "highlight":
      return "h-72 md:h-80";
    case "tall":
      return "h-64 md:h-72";
    case "compact":
      return "h-44 md:h-52";
    default:
      return "h-56 md:h-60";
  }
}

function getTitleClass(style: MasonryStyle) {
  switch (style) {
    case "highlight":
      return "max-w-[16rem] text-[1.95rem] leading-[1.05]";
    case "tall":
      return "max-w-[15rem] text-[1.72rem] leading-[1.08]";
    case "compact":
      return "max-w-[15rem] text-[1.46rem] leading-[1.08]";
    default:
      return "max-w-[16rem] text-[1.58rem] leading-[1.08]";
  }
}

function MasonryServiceCard({
  service,
  index,
  prefersReducedMotion,
}: {
  service: Service;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const style = service.style as MasonryStyle;

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.58,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: EASE_OUT,
      }}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      className="group mb-6 break-inside-avoid overflow-hidden rounded-[1.35rem] border border-[#E4E4E7] bg-[#FFFFFF] shadow-[0_28px_72px_-56px_rgba(9,9,11,0.24)] transition-colors duration-300 hover:border-[#18181B]/16 md:mb-7"
    >
      <div className={`relative overflow-hidden ${getImageHeight(style)}`}>
        <motion.div
          variants={{ hover: { scale: 1.03 } }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: EASE_OUT,
          }}
          className="absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,27,0.14),rgba(9,9,11,0.34))]" />
      </div>

      <div className="relative p-5 md:p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#C4161C,transparent)] opacity-80" />

        <div className="flex items-start justify-between gap-4">
          <div className="text-[2.7rem] font-bold leading-none tracking-[-0.08em] text-[#C4161C]/22 md:text-[3.2rem]">
            {service.number}
          </div>
          <div className="rounded-full border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#52525B]">
            {service.kicker}
          </div>
        </div>

        <motion.div
          variants={{ hover: { width: 96 } }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: EASE_OUT,
          }}
          className="mt-5 h-px w-14 bg-[#C4161C]"
        />

        <h3
          className={`mt-5 font-semibold tracking-[-0.03em] text-[#09090B] ${getTitleClass(style)}`}
        >
          {service.title}
        </h3>

        <p className="mt-4 max-w-[19rem] text-[0.92rem] leading-6 text-[#52525B]">
          {renderServiceDescription(service.description)}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {service.scopes.map((scope) => (
            <ScopeChip key={scope} label={scope} />
          ))}
        </div>

        <motion.div
          variants={{ hover: { x: 4 } }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: EASE_OUT,
          }}
          className="mt-7 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#18181B]"
        >
          <span>Explore Scope</span>
          <ArrowUpRight className="h-4 w-4 text-[#C4161C]" />
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function IndustrialServicesDetails() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [featuredService, ...masonryServices] = SERVICES;

  return (
    <section
      id="services-details"
      className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-55" style={BLUEPRINT_TEXTURE} />
      <div className="pointer-events-none absolute -right-14 top-20 h-48 w-48 border border-[#18181B]/8" />
      <div className="pointer-events-none absolute bottom-16 left-8 h-36 w-36 border border-[#C4161C]/10" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.65,
            ease: EASE_OUT,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#C4161C]">
            Detailed Service Scope
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[#09090B] md:text-5xl">
            Industrial Construction Expertise
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#52525B] md:text-xl">
            {renderBoldPhrases(
              "From factory construction and manufacturing plant construction to industrial civil works and utility systems, Mekark delivers complete turnkey solutions for industrial projects. Our in-house engineering, manufacturing, and execution teams ensure quality, speed, and seamless project delivery.",
              SERVICE_INTRO_PHRASES,
            )}
          </p>
        </motion.div>

        <div className="mt-16 md:mt-20">
          <FeaturedServiceCard
            prefersReducedMotion={prefersReducedMotion}
            service={featuredService}
          />

          <div className="mt-6 columns-1 [column-gap:1.5rem] md:mt-7 md:columns-2 md:[column-gap:1.75rem] xl:columns-3">
            {masonryServices.map((service, index) => (
              <MasonryServiceCard
                key={service.number}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
                service={service}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
