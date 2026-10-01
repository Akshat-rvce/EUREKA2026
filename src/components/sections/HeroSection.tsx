"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Calendar, MapPin, ExternalLink, Zap, ArrowDown, ChevronRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playHoverSound, playClickSound } from "@/utils/audio";

// Lazy-load 3D Robot component
const EurekaRobotCanvas = React.lazy(() =>
  import("@/components/ui/EurekaRobotCanvas").then((m) => ({ default: m.EurekaRobotCanvas }))
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)] min-w-[72px]">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="font-display text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
        {label}
      </span>
    </div>
  );
}

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(SITE_CONFIG.eventDateISO).getTime();
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden pt-28 pb-12"
    >
      {/* Background Cyberpunk Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        
        {/* LEFT COLUMN: Clean, High-Impact Typography & Action Suite */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          
          {/* Institution & Department Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-medium text-slate-300">
              DEPT. OF ELECTRICAL &amp; ELECTRONICS ENGINEERING • RVCE
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.95] mb-4 text-white">
            EUREKA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              &apos;26
            </span>
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-lg sm:text-xl font-semibold text-slate-200 tracking-tight mb-3">
            National Project Expo-cum-Hackathon
          </p>

          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed mb-8 max-w-xl">
            India&apos;s premier engineering battleground for hardware builders, clean-tech innovators, and deep-tech pioneers. Compete across 5 frontier tracks for{" "}
            <span className="text-white font-semibold">₹1,00,000+ Prize Pool</span> and industry recognition.
          </p>

          {/* Clean HUD Countdown Box */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-8">
            <CountdownBlock label="Days" value={timeLeft.days} />
            <CountdownBlock label="Hours" value={timeLeft.hours} />
            <CountdownBlock label="Mins" value={timeLeft.minutes} />
            <CountdownBlock label="Secs" value={timeLeft.seconds} />
          </div>

          {/* Classy, Generously-Spaced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-display font-bold text-base shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Register on Unstop</span>
              <ExternalLink className="w-4 h-4 text-black" />
            </a>

            <button
              onClick={() => {
                playClickSound();
                scrollTo("#tracks", { offset: -80 });
              }}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/15 hover:border-white/30 font-display font-semibold text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore 5 Tracks</span>
              <ArrowDown className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Event Quick Meta Tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400 border-t border-white/10 pt-5 w-full">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{SITE_CONFIG.date}</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>RVCE Campus, Bangalore</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>₹1,00,000+ Prizes</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Robot Visual Experience */}
        <div className="flex-1 relative w-full h-[420px] lg:h-[540px] flex items-center justify-center">
          {/* Subtle Ambient Rings & Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[340px] h-[340px] rounded-full bg-cyan-500/10 blur-[90px]" />
            <div className="w-[280px] h-[280px] rounded-full border border-white/[0.06] animate-pulse" />
          </div>

          {/* Floating HUD Badge */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-right pointer-events-none">
            <div className="text-[10px] font-mono text-cyan-400 tracking-wider font-bold">EUREKA AI BOT</div>
            <div className="text-[9px] font-mono text-slate-400">Interactive 3D Unit</div>
          </div>

          <Suspense
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                <span className="text-xs font-mono text-slate-500">Initializing 3D unit...</span>
              </div>
            }
          >
            <EurekaRobotCanvas
              color="#dcdcdc"
              pantallaColor="#00F0FF"
              pantallaBrillo={1.6}
              blinkCycle={3.2}
              metalness={0.15}
              scale={1.05}
            />
          </Suspense>
        </div>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between z-10 pt-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Open to all UG/PG engineering students across India</span>
        </div>
        <button
          onClick={() => {
            playClickSound();
            scrollTo("#about", { offset: -80 });
          }}
          className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
