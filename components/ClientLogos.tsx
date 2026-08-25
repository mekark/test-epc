"use client";

import Image from "next/image";

const ROW1 = [
  {
    name: "Blue Star",
    src: "71b6caee-03fd-4a74-ac30-0081b93aeb0c_Blue_Star_primary_logo.png",
  },
  { name: "Adityaram", src: "adityaram.png" },
  { name: "Agile", src: "agile.png" },
  { name: "Alliance", src: "alliance.png" },
  { name: "Arun Excello", src: "arun excello.png" },
  { name: "Bosch", src: "Bosch.png" },
  { name: "Casagrand", src: "Casagrand-Logo.png" },
  { name: "CavinKare", src: "cavinkare.png" },
  { name: "CTCI", src: "ctci.png" },
  { name: "Eastman", src: "eastman.png" },
  { name: "EPI", src: "epi.png" },
  { name: "Exaktheit", src: "exaktheit.png" },
  { name: "Ford", src: "Ford_logo.png" },
  { name: "Hero MotoCorp", src: "Hero_MotoCorp-Logo.png" },
  { name: "Hyundai", src: "hyundai.png" },
  { name: "Igarashi", src: "igarashi.png" },
  { name: "JK Tyre", src: "jk tyre.svg" },
  { name: "Johnson Electric", src: "johnson electric.png" },
];

const ROW2 = [
  { name: "Komatsu", src: "komatsu.png" },
  { name: "La Freightlift", src: "la freighlift.png" },
  { name: "L&T", src: "LT.png" },
  { name: "MRF", src: "Mrf-logo.png" },
  { name: "NS Instruments", src: "ns-instruments.png" },
  { name: "Orbittal", src: "orbittal.png" },
  { name: "Reliance", src: "Reliance-Industries-Limited-Logo.png" },
  { name: "Sanmar 1", src: "sanmar 1.png" },
  { name: "Sanmar", src: "Sanmar.png" },
  { name: "Sarvam Safety", src: "sarvam saftey.png" },
  { name: "Saveetha", src: "saveetha.png" },
  { name: "SRF", src: "srf.png" },
  { name: "Stetter", src: "stetter.png" },
  { name: "Tata Electronics", src: "tataelectronicspvtltd_logo.png" },
  { name: "TVS Motor", src: "TVS_Motor_Company-Logo.png" },
  { name: "Voltas", src: "voltas.png" },
  { name: "VWU", src: "vwu.png" },
];

export default function ClientLogos() {
  const logoClass =
    "h-10 w-auto max-w-[150px] object-contain transition-all duration-300";

  return (
    <section className="py-16 border-y border-zinc-100 bg-white overflow-hidden space-y-12">
      {/* Row 1: Right to Left */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] select-none w-full group gap-16">
        <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-16 min-w-full">
          {ROW1.map((logo, i) => (
            <div
              key={`r1-${i}`}
              className="w-32 h-12 flex items-center justify-center"
            >
              <img
                src={`/Clients/${logo.src.replace(/ /g, "%20")}`}
                alt={logo.name}
                className={logoClass}
              />
            </div>
          ))}
        </div>
        <div
          className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-16 min-w-full"
          aria-hidden="true"
        >
          {ROW1.map((logo, i) => (
            <div
              key={`r1-clone-${i}`}
              className="w-32 h-12 flex items-center justify-center"
            >
              <img
                src={`/Clients/${logo.src.replace(/ /g, "%20")}`}
                alt={logo.name}
                className={logoClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] select-none w-full group gap-16">
        <div className="flex shrink-0 animate-[marquee-reverse_40s_linear_infinite] items-center gap-16 min-w-full">
          {ROW2.map((logo, i) => (
            <div
              key={`r2-${i}`}
              className="w-32 h-12 flex items-center justify-center"
            >
              <img
                src={`/Clients/${logo.src.replace(/ /g, "%20")}`}
                alt={logo.name}
                className={logoClass}
              />
            </div>
          ))}
        </div>
        <div
          className="flex shrink-0 animate-[marquee-reverse_40s_linear_infinite] items-center gap-16 min-w-full"
          aria-hidden="true"
        >
          {ROW2.map((logo, i) => (
            <div
              key={`r2-clone-${i}`}
              className="w-32 h-12 flex items-center justify-center"
            >
              <img
                src={`/Clients/${logo.src.replace(/ /g, "%20")}`}
                alt={logo.name}
                className={logoClass}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
