"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Industries", href: "#industries" },
    { name: "Our Process", href: "#process" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        {/* Logo */}
        <a
          href="https://www.mekark.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 z-50"
        >
          <Image
            src="/LogoMekark.png"
            alt="Mekark"
            width={227}
            height={80}
            priority
            className="h-auto w-[9.5rem] sm:w-[8.5rem]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-[#C4161C] ${
                isScrolled ? "text-[#52525B]" : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          <a
            href="tel:9790924754"
            className={`flex items-center gap-2 font-bold ${isScrolled ? "text-[#18181B]" : "text-white"} hover:text-[#e11d48] transition-colors`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            97909 24754
          </a>
          <a
            href="#contact"
            className="bg-[#C4161C] hover:bg-[#C4161C] text-white px-6 py-3 rounded-full transition-all shadow-sm font-bold transform hover:scale-105"
          >
            Get Consultation
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden z-50 p-2 ${isScrolled || isMobileMenuOpen ? "text-[#18181B]" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-transform duration-300 md:hidden overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 text-xl font-medium h-full pb-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#18181B] hover:text-[#C4161C] transition-colors border-b border-[#E4E4E7]/60 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-auto flex flex-col gap-4">
            <a
              href="tel:9790924754"
              className="text-[#18181B] flex flex-col gap-2 pt-4 items-center justify-center text-center font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
               <span className="text-sm text-[#71717A] font-normal">Call us anytime</span>
               <div className="text-2xl text-[#e11d48] flex items-center gap-2">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                 97909 24754
               </div>
            </a>
            <a
              href="#contact"
              className="bg-[#C4161C] text-white text-center py-4 rounded-xl mt-4 font-bold text-lg shadow-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Free Consultation
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
