"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_BOLD_PHRASES, renderBoldPhrases } from "../lib/boldPhrases";

const faqs = [
  {
    q: "What makes Mekark one of the leading EPC companies in Chennai?",
    a: "Mekark is a leading EPC company in Chennai with an in-house PEB manufacturing facility offering 40,000-ton annual capacity. As an industrial EPC contractor, we handle design, fabrication, civil works, and handover under one roof.",
  },
  {
    q: "What is PEB, and why choose a PEB manufacturer like Mekark?",
    a: "PEB (Pre-Engineered Building) is a steel system fabricated off-site, cutting construction time by 30–40%. As a PEB manufacturer in Chennai, our automated, ISO-certified production ensures consistent quality on every project.",
  },
  {
    q: "Do you work as an EPC contractor in Chennai and Coimbatore?",
    a: "Yes. Mekark operates as an EPC contractor in Chennai and is also among the trusted EPC companies in Coimbatore, serving industrial clients across Tamil Nadu.",
  },
  {
    q: "Does Mekark offer turnkey EPC services?",
    a: "Yes, as a turnkey construction company, we deliver a fully completed facility — design, civil, MEP, and commissioning — without the client managing separate vendors. We function as a complete EPC project contractor.",
  },
  {
    q: "What industries does Mekark's EPC contracting company serve?",
    a: "As an experienced EPC contracting company, we serve steel, electronics, chemical, power, automobile, pharma, FMCG, and textile sectors with tailored factory construction and PEB solutions.",
  },
  {
    q: "Do you provide mezzanine flooring under your EPC construction services?",
    a: "Yes. Our EPC construction services include mezzanine flooring, EOT crane structural systems, and heavy-duty steel frameworks, fabricated in-house alongside our PEB manufacturing.",
  },
  {
    q: "How is Mekark different from other PEB contractors in Chennai?",
    a: "Unlike most PEB contractors in Chennai who outsource fabrication, Mekark owns one of Tamil Nadu's largest PEB facilities with 400+ engineers — enabling 30–40% faster delivery.",
  },
  {
    q: "What quality standards does Mekark follow as an industrial EPC contractor?",
    a: "Our operations are ISO-certified, with rigorous quality protocols applied from steel production to final handover — ensuring safety and consistency on every EPC construction project.",
  },
  {
    q: "How long does a PEB or factory construction project take?",
    a: "As a turnkey EPC contractor with automated in-house manufacturing, Mekark typically delivers projects 30–40% faster than conventional construction methods.",
  },
  {
    q: "Why should I choose Mekark as my EPC company in Chennai?",
    a: "We combine the reliability of an established EPC company in Chennai with automated PEB manufacturing and true turnkey construction company accountability — backed by 400+ engineers and a large fabrication facility.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#18181B]">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-[#C4161C] mx-auto mt-6 rounded-full"></div>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                  isOpen 
                    ? 'border-[#C4161C] bg-[#FAFAFA] shadow-[#C4161C]/10' 
                    : 'border-[#E4E4E7] bg-[#FAFAFA]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex justify-between items-center p-6 sm:p-8 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-[#C4161C]' : 'text-[#18181B]'}`}>
                    {renderBoldPhrases(faq.q, FAQ_BOLD_PHRASES)}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                    className="flex-shrink-0 ml-4 sm:ml-6"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#C4161C]/10' : 'bg-[#F4F4F5]'}`}>
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#C4161C]' : 'text-[#C4161C]/70'}`} />
                    </div>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 sm:px-8 pb-8 text-[#52525B] leading-relaxed text-lg">
                        {renderBoldPhrases(faq.a, FAQ_BOLD_PHRASES)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
