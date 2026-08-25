"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_BOLD_PHRASES, renderBoldPhrases } from "../lib/boldPhrases";

const faqs = [
  {
    q: "What makes Mekark different from other industrial civil construction companies?",
    a: "Mekark is a trusted industrial civil construction company with expertise in industrial building construction, factory development, and infrastructure projects. We focus on engineering precision, transparent execution, and timely project delivery.",
  },
  {
    q: "Can you handle large-scale factory and industrial construction projects?",
    a: "Yes. As experienced industrial civil contractors and factory construction contractors, we execute manufacturing facilities, warehouses, industrial buildings, and large-scale infrastructure developments across India.",
  },
  {
    q: "Do you provide turnkey factory construction services?",
    a: "Yes. Our turnkey factory construction solutions cover planning, engineering, civil works, project management, and execution, ensuring seamless delivery from concept to handover.",
  },
  {
    q: "Do you specialize in manufacturing facility construction?",
    a: "Absolutely. As a leading manufacturing facility construction company, we develop production plants, assembly units, processing facilities, and industrial campuses tailored to operational requirements.",
  },
  {
    q: "What types of industrial projects do you undertake?",
    a: "We specialize in industrial facility construction, industrial factory construction, warehouses, utility buildings, commercial-industrial developments, and supporting infrastructure projects.",
  },
  {
    q: "Do you provide industrial infrastructure construction services?",
    a: "Yes. Our industrial infrastructure construction services include site development, internal roads, drainage systems, utility networks, foundations, and factory support infrastructure.",
  },
  {
    q: "Why choose Mekark as your industrial turnkey contractor?",
    a: "As experienced industrial turnkey contractors, we provide single-point accountability, efficient project management, quality execution, and predictable outcomes for industrial construction projects.",
  },
  {
    q: "Do you undertake factory building construction projects across India?",
    a: "Yes. We deliver factory building construction projects for manufacturers and industrial businesses across Chennai, Tamil Nadu, and major industrial hubs throughout India.",
  },
  {
    q: "Do you provide industrial foundation and civil work services?",
    a: "Yes. Our team includes experienced industrial foundation contractors and industrial civil work contractors, delivering foundations, structural works, and critical civil infrastructure for industrial projects.",
  },
  {
    q: "Do you provide RCC construction services for industrial buildings?",
    a: "Yes. As established RCC building contractors, RCC construction contractors, and industrial RCC building contractors, we deliver durable reinforced concrete structures for factories, warehouses, and industrial facilities.",
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
