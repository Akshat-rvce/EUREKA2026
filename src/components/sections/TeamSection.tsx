"use client";

import React from "react";
import { TEAM } from "@/config/site";
import { playHoverSound } from "@/utils/audio";

export function TeamSection() {
  return (
    <section id="team" className="relative w-full py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header: Exactly one headline + at most one short line */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
            ORGANIZING TEAM
          </h2>
          <p className="font-mono text-sm sm:text-base text-slate-400">
            Dept. of Electrical &amp; Electronics Engineering, RVCE Bangalore
          </p>
        </div>

        {/* Minimal 4-column Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              onMouseEnter={playHoverSound}
              className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="font-display font-bold text-lg text-white mb-1">
                {member.name}
              </div>
              <div className="text-xs font-mono text-amber-400 mb-1">
                {member.role}
              </div>
              <div className="text-xs font-mono text-slate-500">
                {member.department}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
