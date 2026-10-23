"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/config/site";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="paper-section border-t border-[#dcd8ce] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="section-kicker">05 / Good to know</p>
          <h2 className="editorial-heading mt-4">A few clear answers.</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#656962]">Practical information for teams preparing to exhibit at EUREKA ’26.</p>
        </div>
        <div className="divide-y divide-[#d8d4c9] border-y border-[#d8d4c9]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div key={faq.question}>
                <h3>
                  <button id={`faq-question-${index}`} type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => { playClickSound(); setOpenIndex(isOpen ? null : index); }} onMouseEnter={playHoverSound} className="flex min-h-[66px] w-full items-center justify-between gap-5 py-4 text-left text-sm font-semibold leading-6 text-[#242a27] sm:text-base">
                    <span>{faq.question}</span>
                    <ChevronDown size={17} aria-hidden="true" className={`shrink-0 text-[#92784c] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                {isOpen && <div id={answerId} role="region" aria-labelledby={`faq-question-${index}`} className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-[#626660]">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
