"use client";

import Image from "next/image";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What makes Mekark one of the leading EPC companies in Chennai?",
    answer:
      "Mekark is a leading EPC company in Chennai with an in-house PEB manufacturing facility offering 40,000-ton annual capacity. As an industrial EPC contractor, we handle design, fabrication, civil works, and handover under one roof.",
  },
  {
    question: "What is PEB, and why choose a PEB manufacturer like Mekark?",
    answer:
      "PEB (Pre-Engineered Building) is a steel system fabricated off-site, cutting construction time by 30–40%. As a PEB manufacturer in Chennai, our automated, ISO-certified production ensures consistent quality on every project.",
  },
  {
    question: "Do you work as an EPC contractor in Chennai and Coimbatore?",
    answer:
      "Yes. Mekark operates as an EPC contractor in Chennai and is also among the trusted EPC companies in Coimbatore, serving industrial clients across Tamil Nadu.",
  },
  {
    question: "Does Mekark offer turnkey EPC services?",
    answer:
      "Yes, as a turnkey construction company, we deliver a fully completed facility — design, civil, MEP, and commissioning — without the client managing separate vendors. We function as a complete EPC project contractor.",
  },
  {
    question: "What industries does Mekark's EPC contracting company serve?",
    answer:
      "As an experienced EPC contracting company, we serve steel, electronics, chemical, power, automobile, pharma, FMCG, and textile sectors with tailored factory construction and PEB solutions.",
  },
  {
    question:
      "Do you provide mezzanine flooring under your EPC construction services?",
    answer:
      "Yes. Our EPC construction services include mezzanine flooring, EOT crane structural systems, and heavy-duty steel frameworks, fabricated in-house alongside our PEB manufacturing.",
  },
  {
    question: "How is Mekark different from other PEB contractors in Chennai?",
    answer:
      "Unlike most PEB contractors in Chennai who outsource fabrication, Mekark owns one of Tamil Nadu's largest PEB facilities with 400+ engineers — enabling 30–40% faster delivery.",
  },
  {
    question:
      "What quality standards does Mekark follow as an industrial EPC contractor?",
    answer:
      "Our operations are ISO-certified, with rigorous quality protocols applied from steel production to final handover — ensuring safety and consistency on every EPC construction project.",
  },
  {
    question: "How long does a PEB or factory construction project take?",
    answer:
      "As a turnkey EPC contractor with automated in-house manufacturing, Mekark typically delivers projects 30–40% faster than conventional construction methods.",
  },
  {
    question: "Why should I choose Mekark as my EPC company in Chennai?",
    answer:
      "We combine the reliability of an established EPC company in Chennai with automated PEB manufacturing and true turnkey construction company accountability — backed by 400+ engineers and a large fabrication facility.",
  },
] as const;

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-clip bg-[#F9F6F7]"
    >
      <div className="mx-auto grid w-full min-w-0 max-w-[1760px] gap-6 px-5 py-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] xl:items-start xl:gap-12 xl:px-10 xl:py-16">
        <div className="min-w-0 xl:sticky xl:top-28 xl:self-start">
          <div className="relative z-10 flex max-w-[758px] flex-col gap-3 pb-1.5 xl:pb-0">
            <p className="inline-flex w-fit items-center rounded-full border border-[#FCD5D0] bg-[#FEEAE7] px-[18.67px] py-2 text-[16px] font-semibold leading-[26px] text-[#CC000A]">
              FAQ
            </p>
            <h2
              id="faq-title"
              className="text-[28px] font-bold leading-8 text-[#070506] xl:text-[clamp(2rem,5vw,4.125rem)] xl:leading-[1.04] xl:tracking-[-0.025em]"
            >
              Frequently asked
              <span className="block text-[#CC000A]">questions.</span>
            </h2>
            <p className="text-[14px] font-medium leading-[23px] text-[#64748B] xl:max-w-[700px] xl:text-[clamp(1rem,2vw,1.5rem)] xl:leading-relaxed">
              Everything you need to know about PEB construction and our
              manufacturing capability.
            </p>
          </div>

          <Image
            src="/faq/industrial-building.webp"
            alt="Modern Mekark industrial and office building"
            width={849}
            height={566}
            sizes="(min-width: 1280px) 42vw, 100vw"
            className="relative z-0 mt-0 h-[220px] w-full object-cover xl:mt-8 xl:h-auto xl:max-h-[max(180px,calc(100dvh-440px))] xl:max-w-[849px] xl:object-contain xl:object-left"
          />
        </div>

        <div className="min-w-0">
          <div className="flex w-full flex-col gap-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;

              return (
                <article
                  key={item.question}
                  className="border-b border-[#E2E2E2] pb-3 last:border-b-0"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span
                      className={`min-w-0 text-[16px] font-medium leading-6 transition-colors xl:text-[24px] xl:leading-8 ${
                        isOpen ? "text-[#C4161C]" : "text-[#080808]"
                      }`}
                    >
                      {index + 1}. {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex size-6 shrink-0 items-center justify-center rounded-[18.667px] text-[21.333px] font-normal leading-none transition-transform duration-200 xl:size-[37.333px] ${
                        isOpen
                          ? "rotate-45 bg-[#C4161C] text-[#F5F5F5]"
                          : "bg-[#F0F0F0] text-[#9A9A9A]"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={panelId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "mt-2.5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[876px] text-[14px] font-medium leading-normal text-[#5A5A5A] xl:text-[20px] xl:leading-[30px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
