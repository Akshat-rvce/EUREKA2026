"use client";

import React, { useState } from "react";
import { Zap, Globe, Layers, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { STATS } from "@/config/site";
import { playClickSound, playHoverSound } from "@/utils/audio";

const PHASES = [
  {
    step: "01",
    tag: "THE GENESIS",
    title: "Engineering Without Boundaries",
    subtitle: "Premier National Hardware & Software Expo by RVCE EEE",
    description:
      "EUREKA '26 is the premier National Project Expo-cum-Hackathon hosted by the Department of Electrical & Electronics Engineering at RV College of Engineering (RVCE), Bangalore. Designed to bridge groundbreaking academic research with industrial deployment.",
    icon: Zap,
    accent: "text-amber-400",
    bgAccent: "bg-amber-400/10 border-amber-400/30",
    points: [
      "Department of EEE flagship national event",
      "Comprehensive hardware & embedded software integration",
      "Live scrutiny by veteran industry engineers & researchers",
      "Dedicated test bench power & lab testing instrumentation",
    ],
  },
  {
    step: "02",
    tag: "PAN-INDIA CONVERGENCE",
    title: "India's Sharpest Innovators Under One Roof",
    subtitle: "500+ top engineering minds from 28 states",
    description:
      "Bringing together visionary student innovators from leading IITs, NITs, BITS, and premier tech colleges across India. Compete alongside top hardware builders in electric mobility, green grids, edge intelligence, and deep tech.",
    icon: Globe,
    accent: "text-cyan-400",
    bgAccent: "bg-cyan-400/10 border-cyan-400/30",
    points: [
      "Open to university & college delegates pan-India",
      "Inter-college and multi-disciplinary teams permitted",
      "Located at Bangalore's premier technological epicenter (RVCE)",
      "Direct networking with hardware founders & faculty chairs",
    ],
  },
  {
    step: "03",
    tag: "DUAL-STAGE MATRIX",
    title: "Expo Screening to Grand Finale Defense",
    subtitle: "Rigorous 2-round battle format for prototype excellence",
    description:
      "Engineered for true technical rigor: Round 1 features a massive, live project exhibition where 100+ prototype stalls undergo continuous jury scoring. The Top 24 teams advance to the Main Stage Pitch Defense in Round 2.",
    icon: Layers,
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-400/10 border-emerald-400/30",
    points: [
      "Round 1: 100+ Live Working Prototype Stalls",
      "Continuous peer and academic jury benchmarking",
      "Top 24 Teams qualify for the Grand Pitch Defense",
      "Live technical defense + market scalability Q&A",
    ],
  },
  {
    step: "04",
    tag: "PRIZES & ACCELERATION",
    title: "Real Recognition. Real Grants. Real Impact.",
    subtitle: "₹1,00,000+ Cash Pool + RVCE Incubation Fast-Track",
    description:
      "Beyond direct cash rewards, top teams receive fast-tracked incubation pathways through the RVCE Innovation Ecosystem, seed venture guidance, patent filing mentorship, and direct recruitment/internship interviews.",
    icon: Award,
    accent: "text-purple-400",
    bgAccent: "bg-purple-400/10 border-purple-400/30",
    points: [
      "₹1,00,000+ in Total Cash Grants & Track Awards",
      "Fast-track incubation through RVCE Entrepreneurship Cell",
      "Industry fellowship, internship & recruitment opps",
      "Official Merit Certificates recognized across academia & industry",
    ],
  },
];

export function AboutNarrativeSection() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      id="about"
      className="relative w-full py-24 bg-[#050508] border-t border-white/[0.08] overflow-hidden text-white"
    >
      {/* Background Subtle Cyber Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono mb-4">
            <span>ABOUT EUREKA &apos;26</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
            Where Pioneering Minds Build the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Future of Hardware
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-4 font-normal leading-relaxed">
            Organized by the Department of Electrical &amp; Electronics Engineering at RVCE Bangalore, EUREKA &apos;26 offers a world-class stage for hardware engineers, researchers, and tech visionaries.
          </p>
        </div>

        {/* Interactive 4-Phase Grid Showcase (Zero overlapping bugs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Phase Selector Tabs (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-slate-400 mb-1">
              EXPLORE THE EXPEDITION
            </span>
            {PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isSelected = activePhase === idx;
              return (
                <button
                  key={phase.step}
                  onClick={() => {
                    playClickSound();
                    setActivePhase(idx);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? "bg-white/[0.08] border-white/25 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs border ${
                        isSelected ? phase.bgAccent : "bg-white/5 border-white/10 text-slate-400"
                      }`}
                    >
                      {phase.step}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-wider uppercase text-slate-400">
                        {phase.tag}
                      </div>
                      <div className="font-display font-bold text-sm sm:text-base text-white">
                        {phase.title}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-white translate-x-1" : "text-white/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Detail Card (Right) */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Header with Phase Badge */}
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${PHASES[activePhase].bgAccent}`}>
                    {React.createElement(PHASES[activePhase].icon, {
                      className: `w-5 h-5 ${PHASES[activePhase].accent}`,
                    })}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                      PHASE {PHASES[activePhase].step} OF 04
                    </span>
                    <div className="font-display font-semibold text-sm text-white">
                      {PHASES[activePhase].tag}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-3xl font-black text-white/10">
                  {PHASES[activePhase].step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                {PHASES[activePhase].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cyan-400 mb-4">
                {PHASES[activePhase].subtitle}
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
                {PHASES[activePhase].description}
              </p>
            </div>

            {/* Key Bullets */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-3">
                KEY HIGHLIGHTS &amp; EXPECTATIONS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {PHASES[activePhase].points.map((pt) => (
                  <div key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${PHASES[activePhase].accent}`} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Live Event Stats Counter Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-2xl">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${idx > 1 ? "pt-6 md:pt-0" : ""} ${
                idx % 2 !== 0 && idx <= 1 ? "pl-4 md:pl-0" : ""
              }`}
            >
              <div className="font-display text-4xl sm:text-5xl font-black text-white mb-1.5 font-mono">
                {stat.prefix && <span className="text-amber-400">{stat.prefix}</span>}
                <span>{stat.value}</span>
                {stat.suffix && <span className="text-cyan-400">{stat.suffix}</span>}
              </div>
              <div className="font-display font-semibold text-sm sm:text-base text-slate-200">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
