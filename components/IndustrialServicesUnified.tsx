"use client";

import type { CSSProperties } from "react";
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
    title: "Turnkey EPC & Factory Construction",
    description:
      "Complete EPC construction services including planning, design, engineering, PEB fabrication, civil works, steel structures, and project handover.",
    scopes: [
      "Architectural Design",
      "Structural Engineering",
      "Civil + Build",
      "Commissioning",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Turnkey%20Factory%20Construction.jpg",
    imageAlt: "Industrial factory construction site with steel framing",
    featured: true,
  },
  {
    number: "07",
    title: "Industrial Plant Builders & EPC Contractors",
    description:
      "Infrastructure solutions from a trusted EPC contractor for heavy industries, process plants, and engineered production environments.",
    scopes: [
      "Process Plants",
      "Heavy Industry",
      "EPC Contract",
      "Infrastructure",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Plant%20Builders.jpg",
    imageAlt: "Industrial plant framework and process infrastructure",
  },
  {
    number: "02",
    title: "Manufacturing Facility Construction",
    description:
      "Construction of modern manufacturing facilities designed for efficient production, future expansion, and operational excellence.",
    scopes: [
      "Smart Factories",
      "Assembly Plants",
      "Heavy Machinery",
      "Green Plants",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/manufacturing.jpg",
    imageAlt: "Modern manufacturing facility construction environment",
  },
  {
    number: "03",
    title: "PEB Manufacturing & Industrial Civil Works",
    description:
      "Comprehensive PEB manufacturing and civil works for factories, industrial buildings, and infrastructure projects with precision engineering.",
    scopes: [
      "PEB Manufacturing",
      "Civil Works",
      "Industrial Buildings",
      "Infrastructure",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Civil.jpg",
    imageAlt: "Industrial civil works and slab construction",
  },
  {
    number: "04",
    title: "Industrial Tank Construction",
    description:
      "ETP, STP, WTP, and custom industrial tank systems built for plant operations and storage.",
    scopes: ["ETP Tanks", "STP Tanks", "WTP Plants", "Storage Solutions"],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20Tank%20Construction.jpg",
    imageAlt: "Industrial tank and water system infrastructure",
  },
  {
    number: "05",
    title: "Industrial MEP & Utility Systems",
    description:
      "Electrical, piping, mechanical, and utility infrastructure integrated for industrial uptime.",
    scopes: ["Electrical", "Utility Piping", "Mechanical", "MEP Integration"],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/Industrial%20MEP%20%26%20Utility%20Systems.jpg",
    imageAlt: "Industrial utility piping and plant systems",
  },
  {
    number: "06",
    title: "EOT Crane & Mezzanine Flooring Systems",
    description:
      "Structural solutions engineered for heavy-duty industrial cranes, mezzanine flooring, and manufacturing plants.",
    scopes: [
      "Crane Supports",
      "Mezzanine Flooring",
      "Steel Structures",
      "Safe Operations",
    ],
    image:
      "/Industrial%20Construction%20Services/Complete%20Industrial%20Construction%20Services/eot%20crane.jpg",
    imageAlt: "Heavy industrial structural system for crane support",
  },
] as const;

const EXPERTISE_STRIP = [
  "Manufacturing Facility Builders",
  "Industrial Plant Construction",
  "Pre-Engineered Plant Buildings",
  "Factory Automation Infrastructure",
  "Industrial Facility Management Systems",
] as const;

const BLUEPRINT_TEXTURE = {
  backgroundImage: `
    linear-gradient(rgba(24, 24, 27, 0.034) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 24, 27, 0.034) 1px, transparent 1px),
    linear-gradient(rgba(196, 22, 28, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(196, 22, 28, 0.035) 1px, transparent 1px)
  `,
  backgroundSize: "34px 34px, 34px 34px, 170px 170px, 170px 170px",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
} satisfies CSSProperties;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

function ScopeChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#18181B] transition-colors duration-300 group-hover:border-[#C4161C]/32 group-hover:text-[#09090B]">
      {label}
    </span>
  );
}

function ServiceCard({
  service,
  index,
  prefersReducedMotion,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const isFeatured = "featured" in service && service.featured;

  if (isFeatured) {
    return (
      <motion.article
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.62,
          ease: EASE_OUT,
        }}
        whileHover={prefersReducedMotion ? undefined : "hover"}
        className="group relative overflow-hidden rounded-[1.6rem] border border-[#E4E4E7] bg-[#FFFFFF] shadow-[0_30px_80px_-58px_rgba(9,9,11,0.26)]"
      >
        <div className="relative lg:grid lg:min-h-[30rem] lg:grid-cols-2">
          <div className="relative min-h-[18rem] overflow-hidden md:min-h-[22rem] lg:min-h-full">
            <motion.div
              variants={{ hover: { scale: 1.03 } }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
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
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,27,0.16),rgba(9,9,11,0.4))]" />
          </div>

          <div className="relative flex flex-col justify-between p-6 md:p-8 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#C4161C,transparent)] opacity-80" />

            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="text-[3rem] font-bold leading-none tracking-[-0.08em] text-[#C4161C]/24 md:text-[4.15rem]">
                  {service.number}
                </div>
                <div className="rounded-full border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#52525B]">
                  Core Capability
                </div>
              </div>

              <div className="mt-5 h-px w-20 bg-[#C4161C]" />

              <h3 className="mt-6 max-w-xl text-[2.2rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#09090B] md:text-[2.55rem]">
                {service.title}
              </h3>

              <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[#52525B] md:text-base">
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
                duration: prefersReducedMotion ? 0 : 0.28,
                ease: EASE_OUT,
              }}
              className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#18181B]"
            >
              <span>Explore Capability</span>
              <ArrowUpRight className="h-4 w-4 text-[#C4161C]" />
            </motion.div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.58,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: EASE_OUT,
      }}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      className="group relative overflow-hidden rounded-[1.35rem] border border-[#E4E4E7] bg-[#FFFFFF] shadow-[0_24px_64px_-50px_rgba(9,9,11,0.24)]"
    >
      <div className="relative h-56 overflow-hidden md:h-60">
        <motion.div
          variants={{ hover: { scale: 1.04 } }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.45,
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,27,0.12),rgba(9,9,11,0.24))]" />
      </div>

      <div className="relative p-5 md:p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#C4161C,transparent)] opacity-80" />

        <div className="flex items-start justify-between gap-4">
          <div className="text-[2.5rem] font-bold leading-none tracking-[-0.08em] text-[#C4161C]/22 md:text-[2.95rem]">
            {service.number}
          </div>
          <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] text-[#18181B] transition-colors duration-300 group-hover:border-[#C4161C] group-hover:text-[#C4161C]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-4 h-px w-14 bg-[#C4161C]" />

        <h3 className="mt-5 max-w-sm text-[1.58rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#09090B]">
          {service.title}
        </h3>

        <p className="mt-4 max-w-md text-[0.92rem] leading-6 text-[#52525B]">
          {renderServiceDescription(service.description)}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {service.scopes.map((scope) => (
            <ScopeChip key={scope} label={scope} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function IndustrialServicesUnified() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const reordered: (typeof SERVICES)[number][] = [
    SERVICES[0],
    ...SERVICES.slice(2),
    SERVICES[1],
  ].map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, "0") as any,
  }));

  const [featured, ...services] = reordered;
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#FAFAFA] py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={BLUEPRINT_TEXTURE}
      />
      <div className="pointer-events-none absolute -left-16 top-24 h-56 w-56 border border-[#18181B]/6" />
      <div className="pointer-events-none absolute right-14 top-24 h-44 w-44 border border-[#C4161C]/8" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.62,
            ease: EASE_OUT,
          }}
          className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12"
        >
          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[#C4161C]">
              Capability Catalogue
            </div>
            <h2 className="mt-5 max-w-xl text-[2.8rem] font-semibold tracking-[-0.04em] text-[#09090B] md:text-[3.5rem] md:leading-[1.02]">
              Complete Factory Construction &amp; Industrial EPC Services
            </h2>
          </div>

          <div className="max-w-4xl">
            <p className="text-lg leading-8 text-[#52525B] md:text-[1.12rem] md:leading-9">
              {renderBoldPhrases(
                "From factory construction and manufacturing plant construction to industrial civil works and utility systems, Mekark delivers complete turnkey solutions for industrial projects. Our in-house engineering, manufacturing, and execution teams ensure quality, speed, and seamless project delivery.",
                SERVICE_INTRO_PHRASES,
              )}
            </p>
          </div>
        </motion.div>

        <div className="mt-14 md:mt-16">
          <ServiceCard
            index={0}
            prefersReducedMotion={prefersReducedMotion}
            service={featured}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              index={index + 1}
              prefersReducedMotion={prefersReducedMotion}
              service={service}
            />
          ))}
        </div>

        {/* <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.58,
            ease: EASE_OUT,
          }}
          className="mt-12 overflow-hidden rounded-[1.45rem] border border-[#E4E4E7] bg-[#FFFFFF] px-5 py-5 shadow-[0_24px_70px_-54px_rgba(9,9,11,0.22)] md:mt-14 md:px-7 md:py-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="max-w-sm">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[#C4161C]">
                Industrial Expertise
              </div>
              <p className="mt-3 text-sm leading-7 text-[#52525B]">
                Reliable infrastructure capability for large-scale industrial
                projects, integrated into the same service platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 md:max-w-3xl md:justify-end">
              {EXPERTISE_STRIP.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#18181B]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
