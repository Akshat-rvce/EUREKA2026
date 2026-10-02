"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { TRACKS, SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

/* ───────────────────────────────────────────────────────────
   Each slide's content block — center-aligned over robot
─────────────────────────────────────────────────────────── */
function SlideContent({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pointer-events-auto z-20">
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
  const robotY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, -20, 10, -15, 5]);
  const robotScale = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [1, 1.02, 0.98, 1.01]);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white select-none">

      {/* ╔══════════════════════════════════════════════════════╗
          ║  PERSISTENT STICKY ROBOT — mounted once, never   ║
          ║  unmounts. Sits behind all slide text layers.    ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden pointer-events-none">
        {/* Full-viewport deep ambient glow — centers the spotlight on robot chest */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 68% 55%, rgba(255,255,255,0.06) 0%, transparent 65%)",
          }}
        />
        {/* Subtle floor glow beneath robot */}
        <div
          className="absolute bottom-0 right-0 w-[55%] h-[30%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 100%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* 3D Spline Robot — fills right ⅔, vertically centered */}
        <motion.div
          style={{ y: robotY, scale: robotScale }}
          className="absolute inset-0 flex items-center justify-end pointer-events-auto"
        >
          {/* Robot scene: right-biased, large, premium */}
          <div className="relative w-[75%] sm:w-[65%] lg:w-[58%] h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  5 SLIDE CONTENT LAYER — stacks over robot layer  ║
          ║  Uses -mt-[500vh] to overlay the 5×100vh stickies ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="relative -mt-[100vh] z-20 pointer-events-none">

        {/* ══════════ SLIDE 1 — HERO ══════════
            Wireframe: RVCE PRESENTS · EUREKA '26 · Robot · slide ↓
            Text: CENTER of the screen, above/beside robot
        ════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen w-full flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* CENTER text — sits in the left-center of viewport, spotlight hits it */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[11px] sm:text-xs font-mono tracking-[0.35em] uppercase text-slate-400 mb-5 font-semibold"
            >
              RVCE PRESENTS
            </motion.div>

            {/* Headline: EUREKA '26 — huge, centered */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(4rem,12vw,9rem)] font-black tracking-[-0.02em] leading-[0.88] text-white"
            >
              EUREKA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-500">
                &apos;26
              </span>
            </motion.h1>
          </div>

          {/* Scroll cue — pinned at bottom center */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => {
              playClickSound();
              scrollTo("#events", { offset: -60 });
            }}
            onMouseEnter={playHoverSound}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-1.5 text-[10px] font-mono tracking-[0.3em] text-slate-500 hover:text-white transition-colors duration-300"
          >
            <span>slide</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </motion.button>
        </section>

        {/* ══════════ SLIDE 2 — EVENT INTRO ══════════
            Center: "NATIONAL PROJECT EXPO" + "28 NOV '26"
            Two buttons
        ══════════════════════════════════════════ */}
        <SlideContent>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-black tracking-[-0.02em] leading-[0.95] text-white mb-5"
          >
            NATIONAL<br />PROJECT EXPO
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-mono text-base sm:text-xl tracking-[0.25em] text-slate-400 uppercase font-semibold mb-12"
          >
            28 NOV &apos;26
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                playClickSound();
                scrollTo("#tracks", { offset: -60 });
              }}
              onMouseEnter={playHoverSound}
              className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.07] text-white font-display font-medium text-sm transition-all duration-300 flex items-center gap-2"
            >
              <span>More Details</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-black font-display font-bold text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_45px_rgba(255,255,255,0.35)] transition-all duration-300 flex items-center gap-2"
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </SlideContent>

        {/* ══════════ SLIDE 3 — PRIZE POOL ══════════
            Center: Prize headline + one line below
        ══════════════════════════════════════════ */}
        <SlideContent>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.3em] text-amber-400/70 uppercase mb-5"
          >
            PRIZE POOL
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,9vw,7rem)] font-black tracking-[-0.02em] leading-[0.9] mb-8"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-500">
              ₹15,000
            </span>
            <br />
            <span className="text-white text-[0.65em] tracking-tight">PER TRACK</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-sm sm:text-base text-slate-400 tracking-widest"
          >
            + Industry Connect &nbsp;·&nbsp; Mentorship &nbsp;·&nbsp; Goodies
          </motion.p>
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
