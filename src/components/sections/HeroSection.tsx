"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, MapPin, Trophy, ArrowDown, ExternalLink, ShieldCheck, Zap, ArrowUpRight, Gift, Briefcase, Award } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playHoverSound, playClickSound } from "@/utils/audio";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl min-w-[68px]">
      <span className="font-display text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
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
      className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden pt-24 pb-8 select-none"
    >
      {/* Background Spotlight Tracking Glow */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={400} />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />

      {/* Main Hero Wrapper */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10 my-auto">
        
        {/* LEFT: Text & Registration Callouts */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl py-6">
          
          {/* Institution Header Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
            <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
              RVCE PRESENTS • DEPT. OF EEE
            </span>
          </div>

          {/* Big Kinetic Title */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-4 text-white">
            EUREKA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              &apos;26
            </span>
          </h1>

          {/* Tagline / Subtitle */}
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-slate-400 uppercase mb-3 font-semibold">
            NATIONAL PROJECT EXPO-CUM-HACKATHON • 28 NOV 2026
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
            India&apos;s leading engineering battleground for hardware innovators, clean-tech pioneers, and deep-tech visionaries at RVCE Bangalore.
          </p>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-8">
            <CountdownBox label="Days" value={timeLeft.days} />
            <CountdownBox label="Hours" value={timeLeft.hours} />
            <CountdownBox label="Mins" value={timeLeft.minutes} />
            <CountdownBox label="Secs" value={timeLeft.seconds} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-200 text-black font-display font-bold text-base shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Register on Unstop</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </a>

            <button
              onClick={() => {
                playClickSound();
                scrollTo("#first-scroll", { offset: -80 });
              }}
              onMouseEnter={playHoverSound}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/15 hover:border-white/30 font-display font-semibold text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Expo Details</span>
              <ArrowDown className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Quick Meta Strip */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400 border-t border-white/10 pt-5 w-full">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-white" />
              <span>{SITE_CONFIG.date}</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-white" />
              <span>RVCE Campus, Bangalore</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-white" />
              <span>₹1,00,000+ Prize Pool</span>
            </div>
          </div>

        </div>

        {/* RIGHT: 3D Spline Interactive Robot Scene */}
        <div className="flex-1 relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

      </div>

      {/* ── 1st Scroll Highlights Strip (User Requested Details) ── */}
      <div id="first-scroll" className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 pb-4 relative z-10 border-t border-white/10 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">PRIZE POOL</div>
              <div className="font-display font-bold text-sm text-white">₹15,000 / Track</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 text-white">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">CAREER IMPACT</div>
              <div className="font-display font-bold text-sm text-white">Internships &amp; Connect</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 text-white">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">INCUBATION</div>
              <div className="font-display font-bold text-sm text-white">RVCE Seed Mentorship</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 text-white">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">PERKS &amp; SWAG</div>
              <div className="font-display font-bold text-sm text-white">Kits + ₹50k Credits</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
