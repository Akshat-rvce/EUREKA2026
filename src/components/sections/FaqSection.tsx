"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search, Sparkles } from "lucide-react";
import { FAQS, FAQItem } from "@/config/site";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Participation", "Judging", "Logistics", "General"];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (idx: number) => {
    playClickSound();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-24 bg-[#0a0618] border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-300 text-xs font-mono mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked <span className="text-gradient-eureka">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-purple-200/70 font-body max-w-lg">
            Everything you need to know about registering, exhibiting, and competing at EUREKA '26.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(255,209,102,0.3)]"
                    : "bg-white/5 text-purple-300/70 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
            <input
              type="text"
              placeholder="Search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-purple-950/40 border border-white/10 rounded-full text-xs font-mono text-white placeholder-purple-400/40 focus:outline-none focus:border-amber-300/60 transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-purple-900/30 border-amber-300/40 shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                    : "bg-[#140c30]/40 border-white/5 hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  onMouseEnter={playHoverSound}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-amber-300 font-bold">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-base md:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-1 rounded-full bg-white/5 flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-amber-300" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-purple-200/80 font-body leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-purple-300/50">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
