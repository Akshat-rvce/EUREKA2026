"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Trophy, Calendar, MapPin, ExternalLink, Zap, ArrowDown, ChevronRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playHoverSound } from "@/utils/audio";

// Dynamic import for the heavy 3D component
const EurekaRobotCanvas = React.lazy(() =>
  import("@/components/ui/EurekaRobotCanvas").then((m) => ({ default: m.EurekaRobotCanvas }))
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Particle Background ──────────────────────────────────────────────────────
function ParticleOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large ambient blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-900/15 blur-[140px]" />
      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const dotColor = i % 3 === 0 ? "#FFD166" : i % 3 === 1 ? "#B266FF" : "#4DDBC5";
        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + (i * 5.3) % 80}%`,
              top: `${15 + (i * 7.1) % 70}%`,
              backgroundColor: dotColor,
              boxShadow: `0 0 6px ${dotColor}`,
              animation: `floatY ${3 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.4,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Countdown Unit ───────────────────────────────────────────────────────────
function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-3 rounded-2xl bg-purple-950/40 border border-purple-400/20 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.3)] min-w-[64px]">
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="font-display text-2xl sm:text-3xl font-bold text-amber-300 font-mono tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-purple-300/60 mt-1 uppercase">
        {label}
      </span>
    </div>
  );
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

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
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 0%, #1a0f3c 0%, #0e0825 40%, #070412 100%)" }}
    >
      {/* Ambient Particle Background */}
      <ParticleOrbs />

      {/* Grid line overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* ── Layout: Left text + Right robot ── */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center">

        {/* ── LEFT: Text content ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY } as React.CSSProperties}
          className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-32 pb-8 lg:py-0 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          {/* Department Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-400/20 backdrop-blur-md text-xs font-mono text-amber-300 mb-6 shadow-[0_0_20px_rgba(255,209,102,0.15)] self-center lg:self-start"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>DEPT. OF ELECTRONICS &amp; ELECTRICAL ENGINEERING • RVCE</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <h1 className="font-display font-extrabold text-7xl sm:text-8xl md:text-9xl tracking-tighter leading-none text-white flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              {["EUREKA", "'26"].map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ y: "120%", opacity: 0, rotate: idx === 1 ? 4 : -2 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.2 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={idx === 1 ? "text-gradient-gold inline-block" : "inline-block"}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-lg sm:text-xl md:text-2xl text-purple-100 font-semibold tracking-tight max-w-xl mb-3 mx-auto lg:mx-0"
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-purple-200/70 font-body max-w-lg mb-6 leading-relaxed mx-auto lg:mx-0"
          >
            India&apos;s leading engineering battleground for hardware builders, clean-tech pioneers, and deep-tech visionaries.{" "}
            <span className="text-amber-300/90 font-semibold">500+ delegates. Real industry jury. ₹1,00,000+ prize pool.</span>
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-2 md:gap-3 mb-8 justify-center lg:justify-start"
          >
            <CountdownUnit label="DAYS" value={timeLeft.days} />
            <CountdownUnit label="HRS" value={timeLeft.hours} />
            <CountdownUnit label="MINS" value={timeLeft.minutes} />
            <CountdownUnit label="SECS" value={timeLeft.seconds} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <MagneticButton
              asLink
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 text-black text-base font-black shadow-[0_0_35px_rgba(255,209,102,0.5)] hover:shadow-[0_0_50px_rgba(255,209,102,0.8)] flex items-center justify-center gap-3 transition-all"
            >
              <Sparkles className="w-5 h-5 text-black" />
              <span>Register on Unstop</span>
              <ExternalLink className="w-4 h-4 text-black" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo("#tracks", { offset: -80 })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#180e38]/80 hover:bg-[#251556] text-white border border-white/15 hover:border-amber-300/40 text-base font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 5 Tracks</span>
              <ArrowDown className="w-4 h-4 text-amber-300" />
            </MagneticButton>
          </motion.div>

          {/* Meta badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-8 text-xs md:text-sm font-mono text-purple-300/70"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>{SITE_CONFIG.date}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40 hidden sm:block" />
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-300" />
              <span>RVCE Campus, Bangalore</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-rose-300" />
              <span>₹1 Lakh+ Cash &amp; Grants</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: 3D Robot Canvas ── */}
        <div className="flex-1 relative w-full h-[50vh] lg:h-screen max-h-screen">
          {/* Glow ring behind robot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[320px] h-[320px] lg:w-[500px] lg:h-[500px] rounded-full bg-amber-400/5 blur-[80px]" />
            <div className="absolute w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-full border border-amber-300/10 animate-spin" style={{ animationDuration: "20s" }} />
          </div>

          {/* Robot label */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-8 right-4 z-20 flex flex-col items-end gap-1 pointer-events-none"
          >
            <div className="text-[10px] font-mono text-amber-300/60 tracking-[0.3em] uppercase">E·U·R·E·K·A</div>
            <div className="text-[10px] font-mono text-purple-300/40 tracking-widest">AI COMPANION</div>
          </motion.div>

          {/* Click hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] font-mono text-purple-300/40 pointer-events-none"
          >
            <ChevronRight className="w-3 h-3" />
            <span>Click robot to interact</span>
          </motion.div>

          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-amber-300/30 border-t-amber-300 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-purple-300/50">Loading 3D companion...</span>
                </div>
              </div>
            }
          >
            <EurekaRobotCanvas
              color="#c8c8c8"
              pantallaColor="#FFD166"
              pantallaBrillo={1.4}
              blinkCycle={3.0}
              metalness={0.1}
              scale={1}
            />
          </Suspense>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-xs font-mono text-purple-400/50 cursor-pointer lg:left-16 lg:translate-x-0"
        onClick={() => scrollTo("#about", { offset: -80 })}
        onMouseEnter={playHoverSound}
        aria-label="Scroll down"
      >
        <span className="tracking-widest">SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-purple-400/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_#FFD166]"
          />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070412] to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
