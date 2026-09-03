"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const POLICY_LINKS: Array<{ label: string; href: string }> = [];
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mekark",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mekarkindustrial/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mekarkindustrialmanufacturers",
    icon: Facebook,
  },
] as const;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function PremiumFooter() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <footer className="relative overflow-hidden bg-[#09090B] text-[#FFFFFF]">
      {/* Engineered Technical Background */}
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen">
        <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
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
          <g stroke="#C4161C" strokeOpacity="0.15" strokeWidth="1" fill="none" strokeDasharray="4 6">
            <line x1="33%" y1="0" x2="33%" y2="100%" />
            <line x1="66%" y1="0" x2="66%" y2="100%" />
            <line x1="0" y1="33%" x2="100%" y2="33%" />
            <line x1="0" y1="66%" x2="100%" y2="66%" />
          </g>

          {/* Elevation / Scale Marking Element */}
          <g stroke="#E4E4E7" strokeOpacity="0.4" strokeWidth="1" fill="none">
            <path d="M 20 40 L 20 280" />
            <path d="M 14 40 L 26 40 M 14 100 L 26 100 M 14 160 L 26 160 M 14 220 L 26 220 M 14 280 L 26 280" />
            <path d="M 17 70 L 23 70 M 17 130 L 23 130 M 17 190 L 23 190 M 17 250 L 23 250" strokeOpacity="0.2" />
          </g>
        </svg>

        {/* Dynamic vignette map */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.96)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:gap-14">
            {[
              <motion.div
                key="brand"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  delay: prefersReducedMotion ? 0 : 0.04,
                  ease: EASE_OUT,
                }}
              >
                <a href="https://www.mekark.com" target="_blank" rel="noreferrer">
                  <Image
                    src="/LogoMekark.png"
                    alt="Mekark"
                    width={227}
                    height={80}
                    className="h-auto w-[11.5rem] sm:w-[12.5rem]"
                  />
                </a>
                <p className="mt-5 max-w-sm text-sm leading-7 text-[#E4E4E7]">
                  We deliver turnkey industrial construction solutions for factories, manufacturing plants, utility systems, and heavy infrastructure projects with a focus on quality, safety, and execution discipline.
                </p>
                <div className="mt-6 border-t border-[#E4E4E7]/10 pt-5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#A1A1AA]">
                  Turnkey Factory Construction | Industrial Civil Works | MEP | Tanks | Utility Systems
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#E4E4E7]/14 bg-[#18181B]/46 px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#E4E4E7] transition-colors duration-300 hover:border-[#C4161C]/34 hover:text-[#FFFFFF]"
                      >
                        <Icon className="h-3.5 w-3.5 text-[#C4161C]" />
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>,

              <motion.div
                key="contact"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  delay: prefersReducedMotion ? 0 : 0.28,
                  ease: EASE_OUT,
                }}
              >
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#C4161C]">
                  Contact Information
                </div>
                <div className="mt-5 space-y-4">
                  <a
                    href="tel:9790924754"
                    className="group flex items-start gap-3 rounded-xl border border-[#E4E4E7]/10 bg-[#18181B]/46 px-4 py-4 transition-colors duration-300 hover:border-[#e11d48]/32"
                  >
                    <Phone className="mt-0.5 h-4 w-4 flex-none text-[#e11d48]" />
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#A1A1AA]">
                        Phone
                      </div>
                      <div className="mt-1 text-sm leading-6 text-[#FFFFFF] transition-colors duration-300 group-hover:text-[#e11d48]">
                        +91 97909 24754
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 rounded-xl border border-[#E4E4E7]/10 bg-[#18181B]/46 px-4 py-4">
                    <Mail className="mt-0.5 h-4 w-4 flex-none text-[#C4161C]" />
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#A1A1AA]">
                        Email
                      </div>
                      <div className="mt-1 text-sm leading-6 text-[#E4E4E7]">
                        admin@mekark.com
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=5th+Floor+Polyhose+Towers+Anna+Salai+Little+Mount+Guindy+Chennai+Tamil+Nadu+600032"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-xl border border-[#E4E4E7]/10 bg-[#18181B]/46 px-4 py-4 transition-colors duration-300 hover:border-[#C4161C]/32"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-[#C4161C]" />
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#A1A1AA]">
                        Office
                      </div>
                      <div className="mt-1 text-sm leading-6 text-[#E4E4E7] transition-colors duration-300 group-hover:text-[#FFFFFF]">
                        5th Floor, Polyhose Towers, Anna Salai, Little Mount,
                        Guindy, Chennai, Tamil Nadu 600032
                      </div>
                    </div>
                  </a>

                  <p className="pt-2 text-sm leading-7 text-[#E4E4E7]">
                    For project enquiries, share your requirements with our team and we will coordinate the next discussion.
                  </p>
                </div>
              </motion.div>,
            ]}
          </div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.14,
            ease: EASE_OUT,
          }}
          className="mt-12 border-t border-[#E4E4E7]/12 pt-6 md:mt-14"
        >
          <div className="flex flex-col gap-4 text-sm text-[#A1A1AA] md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <span>
                &copy; {new Date().getFullYear()} Mekark Structures Pvt. Ltd. All rights reserved.
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#C4161C] md:block" />
              <span>Designed for industrial excellence.</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {POLICY_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-300 hover:text-[#FFFFFF]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
