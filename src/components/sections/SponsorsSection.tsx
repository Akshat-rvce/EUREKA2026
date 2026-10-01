"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake, Mail, Download, Sparkles, Building } from "lucide-react";
import { SPONSORS, SITE_CONFIG } from "@/config/site";
import { playHoverSound, playClickSound } from "@/utils/audio";

export function SponsorsSection() {
  const titleSponsors = SPONSORS.filter((s) => s.tier === "Title");
  const goldSponsors = SPONSORS.filter((s) => s.tier === "Gold");
  const silverSponsors = SPONSORS.filter((s) => s.tier === "Silver");
  const bronzeSponsors = SPONSORS.filter((s) => s.tier === "Bronze");

  return (
    <section id="sponsors" className="relative w-full py-24 bg-[#080414] border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-4">
            <Handshake className="w-3.5 h-3.5" />
            <span>PATRONS & PARTNERS</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Backed by <span className="text-gradient-gold">Industry Leaders</span>
          </h2>
          <p className="text-sm md:text-base text-purple-200/70 font-body max-w-xl">
            Powering young hardware pioneers with industry resources, testing benches, incubation fellowships, and career pathways.
          </p>
        </div>

        {/* Title Patron */}
        {titleSponsors.length > 0 && (
          <div className="mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-center text-amber-300/80 mb-6">
              TITLE ACADEMIC & RESEARCH PATRON
            </div>
            <div className="max-w-3xl mx-auto">
              {titleSponsors.map((s) => (
                <div
                  key={s.name}
                  className="p-8 md:p-10 rounded-3xl glass-panel-gold border-2 border-amber-300/40 text-center flex flex-col items-center justify-center shadow-[0_0_40px_rgba(255,209,102,0.15)]"
                >
                  <div className="font-display text-2xl md:text-3xl font-black text-white mb-2">
                    {s.name}
                  </div>
                  <div className="text-xs font-mono text-amber-300 uppercase tracking-wider">
                    {s.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gold Tier */}
        {goldSponsors.length > 0 && (
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-center text-amber-300/70 mb-6">
              GOLD SPONSORS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {goldSponsors.map((s) => (
                <motion.div
                  key={s.name}
                  whileHover={{ y: -4 }}
                  onMouseEnter={playHoverSound}
                  className="p-8 rounded-3xl glass-panel border border-amber-300/30 hover:border-amber-300/60 transition-all text-center flex flex-col items-center justify-center min-h-[160px]"
                >
                  <div className="font-display text-xl md:text-2xl font-bold text-amber-200 mb-1">
                    {s.name}
                  </div>
                  <div className="text-xs font-mono text-purple-300/60">
                    {s.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Silver & Bronze Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {[...silverSponsors, ...bronzeSponsors].map((s) => (
            <div
              key={s.name}
              className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all text-center flex flex-col items-center justify-center min-h-[130px]"
            >
              <div className="text-xs font-mono text-teal-300 uppercase mb-1">{s.tier} Tier</div>
              <div className="font-display text-base font-bold text-white mb-1">{s.name}</div>
              <div className="text-[11px] font-mono text-purple-300/60">{s.description}</div>
            </div>
          ))}
        </div>

        {/* Sponsor Us Callout */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-purple-950/60 border border-purple-400/20 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
              Interested in Partnering with EUREKA '26?
            </h3>
            <p className="text-xs md:text-sm text-purple-200/70 font-body">
              Engage with 500+ top engineering talent and showcase your brand at RVCE Bangalore.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}?subject=EUREKA%2026%20Sponsorship%20Inquiry`}
              onClick={() => playClickSound()}
              className="px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-display font-bold text-xs md:text-sm flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Organizers</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
