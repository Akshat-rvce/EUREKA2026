"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/config/site";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    playClickSound();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-14 px-6 sm:px-12 md:px-20 lg:px-28 bg-black text-white border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        {/* Header: Exactly one headline + at most one short line */}
        <div className="mb-10">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
            FAQ
          </h2>
          <p className="font-mono text-sm sm:text-base text-slate-400">
            Key details on participation, physical hardware exhibition, and logistics.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  onMouseEnter={playHoverSound}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-display font-medium text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed font-normal border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
