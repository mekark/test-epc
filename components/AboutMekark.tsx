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
              Leading{" "}
              <strong className="font-bold">Factory Construction Company</strong>{" "}
              &amp;{" "}
              <strong className="font-bold">Industrial EPC Contractor</strong> in
              Chennai
            </h2>
            <div className="space-y-6 text-zinc-600 text-base leading-relaxed font-light">
              <p>
                Mekark is a leading{" "}
                <strong className="font-semibold text-zinc-800">
                  industrial construction company
                </strong>{" "}
                in Chennai, delivering high-performance pre-engineered steel
                buildings and{" "}
                <strong className="font-semibold text-zinc-800">
                  factory construction
                </strong>{" "}
                solutions for industrial and commercial sectors. With one of
                Tamil Nadu&apos;s largest PEB manufacturing facilities, featuring
                a 40,000-ton annual production capacity and a 6 lakh sq. ft.
                integrated campus, we ensure faster execution and consistent
                quality.
              </p>
              <p>
                Our ISO-certified operations and advanced in-house manufacturing
                facility ensure superior quality, faster execution, and on-time
                delivery. As an experienced{" "}
                <strong className="font-semibold text-zinc-800">
                  industrial EPC contractor
                </strong>
                , we provide complete{" "}
                <strong className="font-semibold text-zinc-800">
                  factory construction services
                </strong>
                , from design and engineering to manufacturing, construction,
                and project handover.
              </p>
              <p>
                With a team of 400+ engineers and one of Tamil Nadu&apos;s
                largest manufacturing facilities, Mekark delivers{" "}
                <strong className="font-semibold text-zinc-800">
                  industrial building construction
                </strong>
                ,{" "}
                <strong className="font-semibold text-zinc-800">
                  manufacturing facility construction
                </strong>
                , factory sheds, warehouses, and industrial infrastructure
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
