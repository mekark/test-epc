"use client";

import { motion } from "framer-motion";

export default function AboutMekark() {
  return (
    <section
      className="py-24 px-6 bg-zinc-50 border-b border-zinc-100"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C4161C] font-bold tracking-widest uppercase text-[10px] mb-4 block">
              About Mekark
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">
              Leading EPC Company &amp; Industrial Turnkey Contractor in South
              India
            </h2>
            <div className="space-y-6 text-zinc-600 text-base leading-relaxed font-light">
              <p>
                Mekark is one of the leading EPC companies based in Chennai,
                operating across South India, delivering high-performance
                pre-engineered steel buildings (PEB) and turnkey factory
                construction solutions for industrial and commercial sectors. We
                operate one of South India&apos;s largest PEB manufacturing
                facilities — with a 40,000-ton annual production capacity and a
                6 lakh sq. ft. integrated campus — ensuring faster execution and
                consistent quality.
              </p>
              <p>
                Our ISO-certified operations and in-house manufacturing facility
                make us a preferred partner for clients across Chennai,
                Bangalore, Hyderabad, Kochi, Visakapatnam, Amaravati Vijayawada,
                Goa, Hosur, Coimbatore, etc. We deliver complete EPC construction
                services — from design and engineering to manufacturing,
                mezzanine flooring, civil works, and project handover — all
                under one roof and one contract.
              </p>
              <p>
                With a team of 400+ engineers, Mekark handles industrial
                building construction, manufacturing facility construction,
                factory sheds, warehouses, and industrial infrastructure
                projects across India.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-zinc-200">
              <div>
                <p className="text-4xl font-bold text-zinc-900">
                  40000<span className="text-[#C4161C] text-2xl">Tons</span>
                </p>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mt-1">
                  Yearly Capacity
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-zinc-900">
                  6<span className="text-[#C4161C] text-2xl">Lakh</span>
                </p>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mt-1">
                  Sq. Ft. Campus
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white"
          >
            <img
              src="/Smart Factory Design & Engineering.jpeg"
              alt="Mekark Manufacturing Facility"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
