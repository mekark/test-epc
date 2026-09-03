"use client";

import { motion } from "framer-motion";
import { Factory, Settings, Cpu, ShieldCheck, WatchIcon } from "lucide-react";

const REASONS = [
  {
    title: "40,000+ MT High-Capacity Fabrication",
    icon: Factory,
    description:
      "One of the highest PEB manufacturing capacities in the region for massive scale industrial demands.",
  },
  {
    title: "Fully Automated Steel Production",
    icon: Settings,
    description:
      "Latest automation technology ensuring consistency and eliminates human error.",
  },
  {
    title: "Advanced CNC-Based Precision Engineering",
    icon: Cpu,
    description:
      "High-accuracy fabrication for complex structural components, backed by in-house EPC construction expertise.",
  },
  {
    title: "ISO-Certified Quality Systems",
    icon: ShieldCheck,
    description:
      "Rigorous quality protocols ensuring durability and safety compliance.",
  },
  {
    title: "30–40% Faster Project Delivery",
    icon: WatchIcon,
    description:
      "Optimized workflows and in-house execution for rapid turnkey facility handover — from EPC contractor to client, under one roof.",
  },
];

export default function WhyTopIndustries() {
  return (
    <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,22,28,0.15),transparent_40%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#C4161C] font-bold tracking-widest uppercase text-[10px] mb-3 block">
            Mekark Advantage
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Why Top Industries Choose Mekark
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto font-light text-sm leading-relaxed">
            Leading EPC companies trust Mekark for the industrial construction
            sector&apos;s unmatched capacity and precision as a PEB manufacturer
            and turnkey construction company.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#C4161C]/20 flex items-center justify-center text-[#C4161C] mb-6">
                <reason.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3">{reason.title}</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
