"use client";

import React, { useState } from "react";
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

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD166", "#00F0FF", "#10B981", "#FFFFFF"],
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
    <section id="register" className="relative w-full py-14 bg-[#030305] border-t border-white/[0.08] overflow-hidden text-white">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-mono mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>APPLICATIONS OPEN ON UNSTOP</span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
          Claim Your Spot at{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
            EUREKA &apos;26
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
          Showcase your hardware prototype before India&apos;s leading engineering directors, researchers, and venture scouts at RVCE Bangalore.
        </p>

        {/* Large CTA Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 max-w-3xl mx-auto shadow-2xl mb-12 backdrop-blur-xl">
          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-left border-b border-white/10 pb-8">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 text-amber-400 border border-white/10">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">TEAM SIZE</div>
                <div className="text-sm font-bold text-white mt-0.5">{SITE_CONFIG.registration.teamSize}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 text-cyan-400 border border-white/10">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">REGISTRATION FEE</div>
                <div className="text-sm font-bold text-white mt-0.5">{SITE_CONFIG.registration.fee}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 text-emerald-400 border border-white/10">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">DEADLINE</div>
                <div className="text-sm font-bold text-white mt-0.5">20 Nov 2026</div>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={UNSTOP_EVENT_URL}
              onClick={handleRegisterClick}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-display font-bold text-base shadow-[0_0_35px_rgba(251,191,36,0.3)] hover:shadow-[0_0_45px_rgba(251,191,36,0.5)] flex items-center justify-center gap-2.5 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 text-black" />
              <span>{isRedirecting ? "Connecting to Unstop..." : "Register Now on Unstop"}</span>
              <ArrowUpRight className="w-5 h-5 text-black" />
            </a>

            <button
              onClick={handleShareLink}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Link Copied!" : "Share Event"}</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400 mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure registration &amp; team verification managed directly via Unstop.</span>
          </div>
        </div>

        {/* Eligibility Note */}
        <div className="max-w-xl mx-auto text-xs text-slate-400 font-mono">
          {SITE_CONFIG.registration.eligibility}
        </div>
      </div>
    </section>
  );
}
