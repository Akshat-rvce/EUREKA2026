"use client";

import React from "react";
import { Clock, CheckCircle2, Calendar, MapPin, Flag } from "lucide-react";
import { TIMELINE } from "@/config/site";
import { playHoverSound } from "@/utils/audio";

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative w-full py-24 bg-black border-t border-white/[0.08] overflow-hidden text-white"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>EVENT DAY SCHEDULE • 28 NOV 2026</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
              Expo &amp; Hackathon{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                Timeline
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-normal leading-relaxed">
            From morning prototype registration to the high-voltage Grand Stage pitch defense and award distribution.
          </p>
        </div>

        {/* Timeline Grid (Clean 5 Stages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE.map((item, idx) => (
            <div
              key={item.round}
              onMouseEnter={playHoverSound}
              className={`p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl ${
                idx === 4 ? "md:col-span-2 lg:col-span-1 bg-amber-500/[0.03] border-amber-400/30" : ""
              }`}
            >
              <div>
                {/* Time Badge and Stage Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.time}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-white/30">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                {/* Location and Round */}
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.badge}</span>
                </div>

                {/* Title and Description */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {item.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
