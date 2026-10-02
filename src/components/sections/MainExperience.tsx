"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { TRACKS, SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

/* ───────────────────────────────────────────────────────────
   Each slide's content block — center-aligned over robot
─────────────────────────────────────────────────────────── */
function SlideContent({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative min-h-screen w-full flex items-center justify-center pointer-events-auto z-20">
      <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
        {children}
      </div>
    </section>
  );
}

export function MainExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Robot subtle parallax — drifts gently as user scrolls through slides
  const robotY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -15, 10, -10, 0]);
  const robotScale = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [1, 1.02, 0.98, 1.01]);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white select-none">

      {/* ╔══════════════════════════════════════════════════════╗
          ║  PERSISTENT STICKY ROBOT — mounted once, never   ║
          ║  unmounts. Sits behind all slide text layers.    ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden pointer-events-none">
        {/* Full-viewport deep ambient spotlight — covers whole page without shrinking */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 75% 50%, rgba(255,255,255,0.08) 0%, transparent 65%), radial-gradient(ellipse 70% 60% at 20% 40%, rgba(255,209,102,0.06) 0%, transparent 70%), radial-gradient(ellipse 100% 45% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 75%)",
          }}
        />

        {/* 3D Spline Robot — positioned prominently on the right */}
        <motion.div
          style={{ y: robotY, scale: robotScale }}
          className="absolute inset-0 flex items-center justify-end pointer-events-auto"
        >
          <div className="relative w-full sm:w-[68%] lg:w-[58%] h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  SLIDE CONTENT LAYER — stacks over robot layer     ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="relative -mt-[100vh] z-20 pointer-events-none">

        {/* ══════════ SLIDE 1 — HERO / INITIAL LANDING ══════════
            First landing page: Directly alongside the robot on the left
            RVCE PRESENTS · EUREKA '26 · slide ↓
        ══════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative h-screen w-full flex items-center pointer-events-auto px-6 sm:px-12 lg:px-24"
        >
          <div className="relative z-10 max-w-xl lg:max-w-2xl flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-amber-400 font-semibold mb-6 backdrop-blur-sm"
            >
              <span>RVCE PRESENTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-slate-400">DEPT. OF EEE</span>
            </motion.div>

            {/* Massive Headline: EUREKA '26 directly adjacent to robot */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(4.2rem,11vw,9.5rem)] font-black tracking-[-0.03em] leading-[0.85] text-white"
            >
              EUREKA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-amber-400">
                &apos;26
              </span>
            </motion.h1>
          </div>

          {/* Minimalist Slide cue pinned at bottom */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              playClickSound();
              scrollTo("#expo-intro", { offset: 0 });
            }}
            onMouseEnter={playHoverSound}
            className="absolute bottom-10 left-6 sm:left-12 lg:left-24 group flex items-center gap-2.5 text-[11px] font-mono tracking-[0.3em] text-slate-500 hover:text-white transition-colors duration-300"
          >
            <span>slide</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
          </motion.button>
        </section>

        {/* ══════════ SLIDE 2 — NATIONAL PROJECT EXPO & LIVE TIMER ══════════
            Appears as user slides down:
            NATIONAL PROJECT EXPO · 28 NOV 2026 · Countdown Timer · Buttons
        ══════════════════════════════════════════════════════════════════ */}
        <section
          id="expo-intro"
          className="relative min-h-screen w-full flex items-center pointer-events-auto px-6 sm:px-12 lg:px-24"
        >
          <div className="relative z-10 max-w-2xl lg:max-w-3xl flex flex-col items-start text-left py-16">
            {/* Headline: NATIONAL PROJECT EXPO (Big & Commanding) */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.6rem,7.5vw,6rem)] font-black tracking-[-0.02em] leading-[0.92] text-white mb-4"
            >
              NATIONAL<br />PROJECT EXPO
            </motion.h2>

            {/* Date Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-mono text-base sm:text-2xl tracking-[0.25em] text-amber-300 uppercase font-bold mb-8 flex items-center gap-3"
            >
              <span>28 NOV 2026</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 text-sm sm:text-lg">RVCE BANGALORE</span>
            </motion.div>

            {/* Live Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mb-10"
            >
              <CountdownTimer />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={UNSTOP_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                onMouseEnter={playHoverSound}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-display font-bold text-sm shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2"
              >
                <span>Register on Unstop</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  playClickSound();
                  scrollTo("#prizes", { offset: 0 });
                }}
                onMouseEnter={playHoverSound}
                className="px-7 py-3.5 rounded-full border border-white/20 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.08] text-white font-display font-medium text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <span>More Details</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ══════════ SLIDE 3 — PRIZE POOL ══════════
            Center: Prize headline + details
        ══════════════════════════════════════════ */}
        <SlideContent id="prizes">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase mb-4"
          >
            PRIZE POOL &amp; INCENTIVES
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,9vw,6.5rem)] font-black tracking-[-0.02em] leading-[0.92] mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-500">
              ₹15,000
            </span>
            <br />
            <span className="text-white text-[0.6em] tracking-tight">PER TRACK</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-sm sm:text-base text-slate-300 tracking-wider mb-8"
          >
            ₹1,00,000+ TOTAL REWARDS · INDUSTRY JURY · INCUBATION &amp; MENTORSHIP
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => {
              playClickSound();
              scrollTo("#tracks", { offset: -60 });
            }}
            onMouseEnter={playHoverSound}
            className="px-7 py-3 rounded-full border border-white/20 hover:border-white/50 bg-white/[0.04] text-white text-xs font-mono tracking-wider flex items-center gap-2"
          >
            <span>VIEW 5 COMPETITION TRACKS</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
          </motion.button>
        </SlideContent>

        {/* ══════════ SLIDE 4 — TRACKS ══════════
            Center: "TRACKS" + 5 clean rows
        ══════════════════════════════════════ */}
        <section
          id="tracks"
          className="relative min-h-screen w-full flex items-center justify-center pointer-events-auto z-20"
        >
          <div className="w-full max-w-2xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] font-black tracking-[-0.02em] text-white mb-10"
            >
              TRACKS
            </motion.h2>

            {/* 5 Clean rows */}
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

        {/* ══════════ SLIDE 5 — REGISTER CTA ══════════
            Center: Claim headline + 3 data points + button
        ═════════════════════════════════════════════ */}
        <section
          id="register"
          className="relative min-h-screen w-full flex items-center justify-center pointer-events-auto z-20"
        >
          <div className="w-full max-w-2xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.2rem,6.5vw,4.5rem)] font-black tracking-[-0.02em] leading-[1.05] text-white mb-10"
            >
              Claim Your Spot<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                at EUREKA &apos;26
              </span>
            </motion.h2>

            {/* 3 labeled data points — clean inline strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12 py-6 border-y border-white/10 w-full"
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
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-white hover:bg-slate-100 text-black font-display font-bold text-base shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_55px_rgba(255,255,255,0.45)] transition-all duration-300"
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </section>

      </div>{/* end slides layer */}
    </div>
  );
}
