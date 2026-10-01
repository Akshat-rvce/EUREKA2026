"use client";

import React from "react";
import { Handshake, Mail, Building2 } from "lucide-react";
import { SPONSORS, SITE_CONFIG } from "@/config/site";
import { playHoverSound, playClickSound } from "@/utils/audio";

export function SponsorsSection() {
  const titleSponsors = SPONSORS.filter((s) => s.tier === "Title");
  const goldSponsors = SPONSORS.filter((s) => s.tier === "Gold");
  const otherSponsors = SPONSORS.filter((s) => s.tier === "Silver" || s.tier === "Bronze" || s.tier === "Partner");

  return (
    <section id="sponsors" className="relative w-full py-24 bg-black border-t border-white/[0.08] overflow-hidden text-white">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono mb-4">
            <Handshake className="w-3.5 h-3.5" />
            <span>PARTNERS &amp; PATRONS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
            Backed by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              Industry Leaders
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal leading-relaxed">
            Supporting hardware innovators with component testing sandboxes, incubation mentorship, and career pathways.
          </p>
        </div>

        {/* Title Patron */}
        {titleSponsors.length > 0 && (
          <div className="mb-12 max-w-3xl mx-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-center text-amber-400 mb-4">
              TITLE ACADEMIC &amp; RESEARCH PATRON
            </div>
            {titleSponsors.map((s) => (
              <div
                key={s.name}
                className="p-8 rounded-3xl bg-white/[0.03] border border-amber-400/40 text-center flex flex-col items-center justify-center shadow-xl backdrop-blur-xl"
              >
                <div className="font-display text-xl sm:text-2xl font-bold text-white mb-1.5">
                  {s.name}
                </div>
                <div className="text-xs font-mono text-amber-300">
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gold Tier */}
        {goldSponsors.length > 0 && (
          <div className="mb-10 max-w-4xl mx-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-center text-slate-400 mb-4">
              GOLD PARTNERS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goldSponsors.map((s) => (
                <div
                  key={s.name}
                  onMouseEnter={playHoverSound}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all text-center flex flex-col items-center justify-center"
                >
                  <div className="font-display text-lg font-bold text-slate-200 mb-1">
                    {s.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {s.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Silver & Bronze Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
          {otherSponsors.map((s) => (
            <div
              key={s.name}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center flex flex-col items-center justify-center"
            >
              <div className="text-[10px] font-mono text-cyan-400 uppercase mb-1">{s.tier} Tier</div>
              <div className="font-display text-sm font-semibold text-white mb-0.5">{s.name}</div>
              <div className="text-[11px] text-slate-400">{s.description}</div>
            </div>
          ))}
        </div>

        {/* Sponsor Us Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-1">
              Interested in Sponsoring EUREKA &apos;26?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Showcase your hardware tools and recruit from 500+ top engineering candidates at RVCE.
            </p>
          </div>
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}?subject=EUREKA%2026%20Sponsorship%20Inquiry`}
            onClick={() => playClickSound()}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-2 transition-colors flex-shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Organizers</span>
          </a>
        </div>
      </div>
    </section>
  );
}
