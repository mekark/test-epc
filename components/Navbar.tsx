"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1760px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <a
          href="https://www.mekark.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center"
        >
          <Image
            src="/LogoMekark.webp"
            alt="Mekark"
            width={227}
            height={80}
            priority
            className="h-auto w-[7.5rem] sm:w-[8.5rem]"
          />
        </a>

        <a
          href="#consultation"
          className="shrink-0 rounded-full bg-[#C4161C] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105 sm:px-6 sm:py-3"
        >
          Get Quote
        </a>
      </div>
    </header>
  );
}
