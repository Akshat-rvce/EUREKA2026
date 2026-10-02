"use client";

import React from "react";
import { SPONSORS } from "@/config/site";
import { playHoverSound } from "@/utils/audio";

export function SponsorsSection() {
  return (
    <section id="sponsors" className="relative w-full py-14 px-6 sm:px-12 md:px-20 lg:px-28 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header: Exactly one headline + at most one short line */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
            PARTNERS
          </h2>
          <p className="font-mono text-sm sm:text-base text-slate-400">
            Supporting hardware innovators and engineering research at RVCE.
          </p>
        </div>

        {/* Minimal Sponsor Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPONSORS.map((s) => (
            <div
              key={s.name}
              onMouseEnter={playHoverSound}
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-center items-center text-center min-h-[110px]"
            >
              <span className="font-display font-bold text-sm text-white">
                {s.logoPlaceholder}
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase mt-1 tracking-wider">
                {s.tier}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
