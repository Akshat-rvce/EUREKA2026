"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Users, CreditCard, CalendarCheck, ShieldCheck, Share2, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { playClickSound, playSuccessChime, playHoverSound } from "@/utils/audio";

export function RegisterSection() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playSuccessChime();
    setIsRedirecting(true);

    // Fire celebratory confetti bursts
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD166", "#FF6B6B", "#4DDBC5", "#B266FF"],
    });

    setTimeout(() => {
      window.open(UNSTOP_EVENT_URL, "_blank", "noopener,noreferrer");
      setIsRedirecting(false);
    }, 600);
  };

  const handleShareLink = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="register" className="relative w-full py-28 bg-[#0a0618] border-t border-white/5 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-600/15 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono mb-8 shadow-[0_0_20px_rgba(255,209,102,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>APPLICATIONS LIVE ON UNSTOP</span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Claim Your Spot at <span className="text-gradient-eureka">EUREKA '26</span>
        </h2>

        <p className="font-body text-base sm:text-xl text-purple-200/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Showcase your hardware prototype before India's leading tech leaders, academic mentors, and venture scouts at RVCE Bangalore.
        </p>

        {/* Large Magnetic CTA Card */}
        <div className="p-8 md:p-12 rounded-3xl glass-panel-gold border border-amber-300/40 max-w-3xl mx-auto shadow-[0_25px_70px_rgba(0,0,0,0.7)] mb-12">
          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-left border-b border-white/10 pb-8">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-900/60 text-amber-300 border border-purple-400/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-purple-300/60">TEAM COMPOSITION</div>
                <div className="text-sm font-bold text-white mt-0.5">{SITE_CONFIG.registration.teamSize}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-900/60 text-teal-300 border border-purple-400/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-purple-300/60">ENTRY FEE</div>
                <div className="text-sm font-bold text-white mt-0.5">{SITE_CONFIG.registration.fee.split("(")[0]}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-900/60 text-rose-300 border border-purple-400/20">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-purple-300/60">DEADLINE</div>
                <div className="text-sm font-bold text-white mt-0.5">20 Nov 2026</div>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={UNSTOP_EVENT_URL}
              onClick={handleRegisterClick}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 text-black font-display font-black text-lg md:text-xl shadow-[0_0_40px_rgba(255,209,102,0.6)] hover:shadow-[0_0_60px_rgba(255,209,102,0.9)] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.03] active:scale-95"
            >
              <Sparkles className="w-6 h-6 text-black" />
              <span>{isRedirecting ? "Connecting to Unstop..." : "Register Now on Unstop"}</span>
              <ArrowUpRight className="w-6 h-6 text-black" />
            </a>

            <button
              onClick={handleShareLink}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-6 py-5 rounded-full bg-white/5 hover:bg-white/10 text-purple-200 border border-white/10 hover:border-white/20 text-sm font-mono flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Link Copied!" : "Share Event"}</span>
            </button>
          </div>

          <div className="text-xs font-mono text-purple-300/60 mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Secure registration & verified payment handled directly on Unstop portal.</span>
          </div>
        </div>

        {/* Eligibility Note */}
        <div className="max-w-xl mx-auto text-xs text-purple-300/70 font-mono">
          {SITE_CONFIG.registration.eligibility}
        </div>
      </div>
    </section>
  );
}
