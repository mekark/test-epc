"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ENGINEERING_PARTNER_CTA_ASSETS,
  ENGINEERING_PARTNER_CTA_CONTENT,
} from "./engineering-partner-cta-data";

const WHATSAPP_NUMBER = "919790924754";
const WHATSAPP_MESSAGE =
  "Hello Mekark, I would like to discuss my industrial construction project.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function EngineeringPartnerCta() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.12]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#ed2024]"
      aria-label="Engineering partner call to action"
    >
      <div className="absolute inset-0">
        <motion.img
          src={ENGINEERING_PARTNER_CTA_ASSETS.background}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
          style={{ y: backgroundY, scale: backgroundScale }}
          initial={{ opacity: 0, scale: 1.14 }}
          whileInView={{ opacity: 1, scale: 1.06 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(237,32,36,0)_60.59%,#000000_100%)] opacity-50 mix-blend-overlay"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[#ed2024]/35 lg:bg-transparent"
          aria-hidden
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 max-lg:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        aria-hidden
      >
        <motion.span
          className="absolute left-[12%] top-[22%] h-16 w-16 rounded-full bg-white/10 blur-2xl"
          animate={{ y: [0, -10, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-[28%] top-[18%] h-20 w-20 rounded-full bg-black/15 blur-2xl"
          animate={{ y: [0, 8, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[-16px] left-1/2 hidden h-[161px] w-[222px] translate-x-[90px] lg:block"
        initial={{ y: 48, opacity: 0, scale: 0.92 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.78, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <img
          src={ENGINEERING_PARTNER_CTA_ASSETS.workers}
          alt=""
          className="size-full object-cover"
          aria-hidden
        />
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12 md:gap-8 lg:min-h-[228px] lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-20 lg:py-10">
        <motion.h2
          className="max-w-[42rem] text-[clamp(1.25rem,3.6vw,2.15rem)] font-extrabold leading-[1.22] tracking-[-0.04em] text-white sm:leading-[1.25] lg:max-w-[720px] lg:shrink-0 lg:text-[34px] lg:leading-[42px] lg:tracking-[-1.2px]"
          initial={{ y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {ENGINEERING_PARTNER_CTA_CONTENT.heading}
        </motion.h2>

        <div className="flex w-full flex-col gap-3 sm:max-w-md lg:w-[241px] lg:max-w-none lg:shrink-0">
          <motion.a
            href={ENGINEERING_PARTNER_CTA_CONTENT.quoteHref}
            className="relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-full bg-white px-5 py-3 text-sm font-bold leading-5 text-[#e5091f] sm:h-[46px] lg:flex-none"
            initial={{ y: 28, opacity: 0, scale: 0.94 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{
              scale: 1.04,
              y: -2,
              boxShadow: "0 14px 28px -10px rgba(0,0,0,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            <motion.span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0) 100%)",
              }}
              initial={{ x: "-130%" }}
              whileInView={{ x: "130%" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.35 }}
              aria-hidden
            />
            {ENGINEERING_PARTNER_CTA_CONTENT.quoteLabel}
          </motion.a>

          <motion.a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold leading-5 text-white sm:h-[46px] lg:flex-none"
            initial={{ y: 28, opacity: 0, scale: 0.94 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{
              scale: 1.04,
              y: -2,
              boxShadow: "0 14px 28px -10px rgba(0,0,0,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.06 }}
          >
            <img
              src={ENGINEERING_PARTNER_CTA_ASSETS.whatsappIcon}
              alt=""
              className="absolute left-5 h-4 w-4"
              aria-hidden
            />
            WhatsApp Us
          </motion.a>
        </div>
      </div>
    </section>
  );
}
