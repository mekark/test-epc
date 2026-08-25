"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const INDUSTRIES = [
  {
    title: "Steel & Metal Industries",
    description:
      "Infrastructure for steel plants, rolling mills, and heavy structural expansion projects.",
    image:
      "/industries we serve/Industries We Serve/Steel %26 Metal Industries.jpg",
    imageAlt: "Steel manufacturing environment",
  },
  {
    title: "Electronics Manufacturing",
    description:
      "Clean, controlled environments for precision assembly and high-volume electronics production.",
    image:
      "/industries we serve/Industries We Serve/electronic manufacturing.jpg",
    imageAlt: "Electronics manufacturing",
  },
  {
    title: "Chemical & Process",
    description:
      "Process-ready structures designed for safety, utility integration, and continuous operations.",
    image: "/industries we serve/Industries We Serve/Chemical %26 process.jpg",
    imageAlt: "Chemical process plant",
  },
  {
    title: "Power Plants",
    description:
      "Structural systems and civil infrastructure for large-scale power generation facilities.",
    image: "/industries we serve/Industries We Serve/power plant.jpg",
    imageAlt: "Power generation facility",
  },
  {
    title: "Automobile Industry",
    description:
      "Heavy-duty steel structures for automotive manufacturing plants and assembly lines.",
    image: "/industries we serve/Industries We Serve/automobile.jpg",
    imageAlt: "Automobile manufacturing",
  },
  {
    title: "Pharmaceutical Facilities",
    description:
      "Compliance-driven steel buildings for pharma production, labs, and regulated environments.",
    image: "/industries we serve/Industries We Serve/pharma.jpg",
    imageAlt: "Pharmaceutical facility",
  },
  {
    title: "FMCG & Consumer Goods",
    description:
      "Efficient structures for high-speed production, packaging, and distribution operations.",
    image:
      "/Industrial Construction Services/Complete Industrial Construction Services/manufacturing.jpg",
    imageAlt: "FMCG production",
  },
  {
    title: "Textile & Processing Units",
    description:
      "Large-span steel buildings optimized for textile manufacturing and workflow efficiency.",
    image: "/industries we serve/Industries We Serve/textile.jpg",
    imageAlt: "Textile manufacturing",
  },
  {
    title: "Cold Storage Facilities",
    description:
      "Temperature-controlled steel structures designed for storage, logistics, and preservation systems.",
    image: "/industries we serve/Industries We Serve/cold storage.jpg",
    imageAlt: "Cold storage facility",
  },
  {
    title: "Windmill Infrastructure",
    description:
      "Structural solutions for wind energy components, fabrication yards, and support facilities.",
    image: "/industries we serve/Industries We Serve/wind mill.jpg",
    imageAlt: "Windmill structure",
  },
  {
    title: "Cleanroom Environments",
    description:
      "Precision-engineered structures for controlled environments in pharma, electronics, and biotech.",
    image: "/industries we serve/Industries We Serve/clean rooms.jpg",
    imageAlt: "Cleanroom environment",
  },
  {
    title: "Industrial HVAC Systems",
    description:
      "Reliable airflow systems engineered for consistent performance, energy efficiency, and controlled industrial environments.",
    image: "/industries we serve/Industries We Serve/Industrial.jpeg", // 👈 make sure file exists
    imageAlt: "Industrial HVAC systems with large ducts and air handling units",
  },
] as const;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function IndustriesShowcase() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [showAllIndustries, setShowAllIndustries] = useState(false);


  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-[#09090B] py-24 text-[#FFFFFF] md:py-32"
    >
      {/* Engineered Technical Background */}
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen">
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="tech-grid-sm"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#A1A1AA"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
            </pattern>
            <pattern
              id="tech-grid-lg"
              width="144"
              height="144"
              patternUnits="userSpaceOnUse"
            >
              <rect width="144" height="144" fill="url(#tech-grid-sm)" />
              <path
                d="M 144 0 L 0 0 0 144"
                fill="none"
                stroke="#52525B"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              {/* Corner Registration Marks */}
              <path
                d="M 0 0 L 8 0 M 0 0 L 0 8 M 144 144 L 136 144 M 144 144 L 144 136 M 144 0 L 136 0 M 144 0 L 144 8 M 0 144 L 8 144 M 0 144 L 0 136"
                fill="none"
                stroke="#C4161C"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid-lg)" />

          {/* Structural Guideline Dashes */}
          <g
            stroke="#C4161C"
            strokeOpacity="0.15"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 6"
          >
            <line x1="33%" y1="0" x2="33%" y2="100%" />
            <line x1="66%" y1="0" x2="66%" y2="100%" />
            <line x1="0" y1="33%" x2="100%" y2="33%" />
            <line x1="0" y1="66%" x2="100%" y2="66%" />
          </g>

          {/* Elevation / Scale Marking Element */}
          <g stroke="#E4E4E7" strokeOpacity="0.4" strokeWidth="1" fill="none">
            <path d="M 20 40 L 20 280" />
            <path d="M 14 40 L 26 40 M 14 100 L 26 100 M 14 160 L 26 160 M 14 220 L 26 220 M 14 280 L 26 280" />
            <path
              d="M 17 70 L 23 70 M 17 130 L 23 130 M 17 190 L 23 190 M 17 250 L 23 250"
              strokeOpacity="0.2"
            />
          </g>
        </svg>

        {/* Dynamic vignette to draw focus to content and darken edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(9,9,11,0.96)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: EASE_OUT,
          }}
          className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12"
        >
          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[#C4161C]">
              Industry Focus
            </div>
            <h2 className="mt-4 max-w-xl text-[2.2rem] font-semibold tracking-[-0.04em] text-[#FFFFFF] md:mt-5 md:text-[3.5rem] md:leading-[1.02]">
              Industries We Serve
            </h2>
          </div>

          <p className="max-w-4xl text-base leading-7 text-[#E4E4E7] md:text-[1.15rem] md:leading-9">
            We support multiple sectors with industrial construction capability
            tailored to metal, electronics, pharma, energy, and high-speed
            production environments.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
          {(showAllIndustries
            ? INDUSTRIES
            : INDUSTRIES.slice(0, 6)
          ).map((industry, index) => (
            <motion.a
              key={industry.title}
              href="#contact"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.58,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: EASE_OUT,
              }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="group block"
            >
              <div className="relative aspect-[1.16/0.76] overflow-hidden bg-[#18181B]">
                <motion.div
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    ease: EASE_OUT,
                  }}
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.04 }
                  }
                  className="absolute inset-0"
                >
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,27,0.12),rgba(9,9,11,0.2))]" />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="max-w-xs text-[1.5rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#FFFFFF] transition-colors duration-300 group-hover:text-[#C4161C] sm:max-w-sm sm:text-[1.8rem]">
                  {industry.title}
                </h3>
                <span className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#E4E4E7]/18 text-[#FFFFFF] transition-colors duration-300 group-hover:border-[#C4161C] group-hover:text-[#C4161C] sm:h-10 sm:w-10">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              <p className="mt-3 max-w-sm text-[0.92rem] leading-6 text-[#E4E4E7] sm:text-[0.98rem] sm:leading-7">
                {industry.description}
              </p>
            </motion.a>
          ))}
        </div>
        {/* VIEW MORE BUTTON */}

        {INDUSTRIES.length > 6 && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() =>
                setShowAllIndustries(!showAllIndustries)
              }
              className="inline-flex items-center justify-center rounded-full border border-[#E4E4E7]/15 bg-[#18181B] px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-[#C4161C] hover:bg-[#C4161C]"
            >
              {showAllIndustries
                ? "View Less"
                : "View More Industries"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
