"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { TRACKS, SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function MainExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white select-none">

      {/* ══════════════════════════════════════════════════════════
          SLIDE 1 — HERO: EUREKA '26 left + Robot right, full-screen flex row
          Robot is always visible — no sticky/negative-margin tricks.
      ══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative h-screen w-full overflow-hidden flex flex-row"
      >
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 70% 50%, rgba(255,255,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 15% 40%, rgba(255,209,102,0.05) 0%, transparent 60%)",
          }}
        />

        {/* LEFT — EUREKA '26 text block */}
        <div className="relative z-10 w-[42%] h-full flex flex-col items-start justify-center px-8 sm:px-12 lg:px-16 shrink-0">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-amber-400 font-semibold mb-6 backdrop-blur-sm"
          >
            <span>RVCE PRESENTS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-slate-400">DEPT. OF EEE</span>
          </motion.div>

          {/* EUREKA '26 headline — one line, slightly bigger */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(3.2rem, 6.5vw, 6.5rem)" }}
            className="font-display font-black tracking-[-0.03em] leading-none text-white whitespace-nowrap"
          >
            EUREKA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-amber-400">
              &apos;26
            </span>
          </motion.h1>

          {/* Scroll cue */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={() => { playClickSound(); scrollTo("#expo-intro", { offset: 0 }); }}
            onMouseEnter={playHoverSound}
            className="mt-12 group flex items-center gap-2.5 text-[11px] font-mono tracking-[0.3em] text-slate-500 hover:text-white transition-colors duration-300"
          >
            <span>scroll</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
          </motion.button>
        </div>

        {/* RIGHT — 3D Spline Robot fills the remaining width */}
        <div className="relative z-10 flex-1 h-full">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SLIDE 2 — NATIONAL PROJECT EXPO + Countdown (centered)
      ══════════════════════════════════════════════════════════ */}
      <section
        id="expo-intro"
        className="relative w-full flex items-center justify-center px-6 sm:px-10 py-12 sm:py-16"
        style={{ background: "rgba(0,0,0,0.94)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,209,102,0.04) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* NATIONAL PROJECT EXPO — BIG, centered */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
            className="font-display font-black tracking-[-0.02em] leading-[0.92] text-white mb-6"
          >
            NATIONAL<br />PROJECT EXPO
          </motion.h2>

          {/* Date — big, amber, prominent */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <span
              style={{ fontSize: "clamp(1.2rem, 3vw, 2.2rem)" }}
              className="font-mono font-bold tracking-[0.2em] text-amber-300 uppercase"
            >
              28 NOV 2026
            </span>
            <span className="text-slate-600 text-2xl">·</span>
            <span
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.4rem)" }}
              className="font-mono font-semibold tracking-[0.15em] text-slate-300 uppercase"
            >
              RVCE BANGALORE
            </span>
          </motion.div>

          {/* High-tech Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="w-full mb-8"
          >
            <CountdownTimer />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="px-10 py-4 rounded-full font-display font-bold text-base flex items-center gap-2.5 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #f97316 100%)",
                color: "#000",
                boxShadow: "0 0 35px rgba(245,158,11,0.45), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span>Register on Unstop</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => { playClickSound(); scrollTo("#prizes", { offset: 0 }); }}
              onMouseEnter={playHoverSound}
              className="px-8 py-4 rounded-full border border-white/25 hover:border-white/50 bg-white/[0.05] hover:bg-white/[0.10] text-white font-display font-medium text-base transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
            >
              <span>More Details</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SLIDE 3 — PRIZE POOL: ₹15,000 TOTAL
      ══════════════════════════════════════════════════════════ */}
      <section
        id="prizes"
        className="relative w-full flex items-center justify-center px-6 sm:px-10 py-10 sm:py-12"
        style={{ background: "rgba(0,0,0,0.95)" }}
      >
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase mb-3 font-semibold"
          >
            PRIZE POOL &amp; INCENTIVES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
            className="font-display font-black tracking-[-0.02em] leading-[0.92] mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-500">
              ₹15,000
            </span>
            <br />
            <span className="text-white" style={{ fontSize: "0.55em", letterSpacing: "-0.01em" }}>TOTAL PRIZE POOL</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-xs sm:text-base text-slate-300 tracking-wider mb-6"
          >
            INDUSTRY JURY CONNECT · INCUBATION &amp; MENTORSHIP · CERTIFICATES &amp; GOODIES
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => { playClickSound(); scrollTo("#tracks", { offset: -30 }); }}
            onMouseEnter={playHoverSound}
            className="px-7 py-3 rounded-full border border-white/20 hover:border-white/50 bg-white/[0.04] text-white text-xs font-mono tracking-wider flex items-center gap-2 transition-all duration-300"
          >
            <span>EXPLORE 5 COMPETITION TRACKS</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
          </motion.button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SLIDE 4 — TRACKS
      ══════════════════════════════════════════════════════════ */}
      <section
        id="tracks"
        className="relative w-full flex items-center justify-center px-6 sm:px-10 py-10 sm:py-12"
        style={{ background: "rgba(0,0,0,0.95)" }}
      >
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
            className="font-display font-black tracking-[-0.02em] text-white mb-6"
          >
            TRACKS
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full space-y-3"
          >
            {TRACKS.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
              >
                <Link
                  href={`/tracks/${track.id}`}
                  prefetch={true}
                  onClick={() => playClickSound()}
                  onMouseEnter={playHoverSound}
                  className="group flex items-center justify-between py-4 px-5 rounded-2xl bg-black/40 hover:bg-white/[0.06] border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="font-mono text-sm font-bold text-slate-600 group-hover:text-amber-400 transition-colors w-6">
                      {track.number}
                    </span>
                    <span className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-slate-100 transition-colors">
                      {track.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SLIDE 5 — REGISTER CTA
      ══════════════════════════════════════════════════════════ */}
      <section
        id="register"
        className="relative w-full flex items-center justify-center px-6 sm:px-10 py-10 sm:py-14"
        style={{ background: "rgba(0,0,0,0.97)" }}
      >
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 4.5rem)" }}
            className="font-display font-black tracking-[-0.02em] leading-[1.05] text-white mb-6"
          >
            Claim Your Spot<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
              at EUREKA &apos;26
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8 py-5 border-y border-white/10 w-full"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">TEAM SIZE</span>
              <span className="font-display font-bold text-xl text-white">2–4</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">REG. FEE</span>
              <span className="font-display font-bold text-xl text-white">{SITE_CONFIG.registration.fee}</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">DEADLINE</span>
              <span className="font-display font-bold text-xl text-white">26 Nov 2026</span>
            </div>
          </motion.div>
          <motion.a
            href={UNSTOP_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            onMouseEnter={playHoverSound}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-display font-bold text-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #f97316 100%)",
              color: "#000",
              boxShadow: "0 0 45px rgba(245,158,11,0.5), 0 6px 30px rgba(0,0,0,0.5)",
            }}
          >
            <span>Register Now</span>
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>
      </section>

    </div>
  );
}
