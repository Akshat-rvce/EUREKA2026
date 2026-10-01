"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Globe, Layers, Award, CheckCircle2 } from "lucide-react";
import { STATS } from "@/config/site";

const BEATS = [
  {
    step: "01",
    tag: "THE GENESIS",
    title: "Engineering Without Boundaries",
    description:
      "EUREKA '26 is the premier National Project Expo-cum-Hackathon hosted by the Department of Electronics & Electrical Engineering at RV College of Engineering (RVCE), Bangalore. Designed to bridge academic research with industrial breakthrough.",
    icon: Zap,
    accent: "from-amber-400 to-amber-600",
    color: "#FFD166",
    points: ["Premier RVCE EEE Flagship", "Hardware & Software Integration", "Direct Industry Evaluation"],
  },
  {
    step: "02",
    tag: "PAN-INDIA CONVERGENCE",
    title: "India's Sharpest Innovators Under One Roof",
    description:
      "Open to university and engineering colleges across all 28 states. From autonomous electric vehicles and microgrid architectures to edge neural accelerators and bio-telemetry wearables, compete with the top student hardware builders.",
    icon: Globe,
    accent: "from-teal-400 to-emerald-500",
    color: "#4DDBC5",
    points: ["500+ Top Selected Delegates", "Inter-College & Multi-Disciplinary", "Bangalore Innovation Hub"],
  },
  {
    step: "03",
    tag: "THE DUAL MATRIX FORMAT",
    title: "Expo Screening to High-Stakes Finales",
    description:
      "A dual-phase battle format engineered for rigor: Round 1 features a massive project expo with continuous peer and academic jury screening. Only the Top 24 qualify to take the main stage for Round 2 pitch-offs.",
    icon: Layers,
    accent: "from-rose-400 to-pink-600",
    color: "#FF6B6B",
    points: ["Round 1: 100+ Live Prototype Stalls", "Cut-throat Top 24 Shortlist", "Round 2: Main Stage Pitch Defense"],
  },
  {
    step: "04",
    tag: "THE PRIZE & GLORY",
    title: "Real Recognition. Real Grants. Real Impact.",
    description:
      "Beyond the ₹1,00,000+ cash prize pool, finalists receive direct venture mentorship, incubation fast-tracks through the RVCE Innovation Ecosystem, and special track distinction awards recognized by industry partners.",
    icon: Award,
    accent: "from-purple-400 to-indigo-500",
    color: "#C084FC",
    points: ["₹1,00,000+ Direct Cash Grants", "RVCE Incubation Fast-Track", "Internship & Fellowship Offers"],
  },
];

export function AboutNarrativeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.innerWidth >= 1024;
    const pinContainer = pinContainerRef.current;
    const section = sectionRef.current;

    if (!pinContainer || !section) return;

    if (isDesktop) {
      const beats = gsap.utils.toArray<HTMLElement>(".narrative-beat");

      // ScrollTrigger Pinning for Desktop Storytelling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=2400",
          scrub: 0.8,
          onUpdate: (self) => {
            const index = Math.min(
              BEATS.length - 1,
              Math.floor(self.progress * BEATS.length)
            );
            setActiveBeat(index);
          },
        },
      });

      // Animate transitions between beats
      beats.forEach((beat, i) => {
        if (i !== 0) {
          tl.fromTo(
            beat,
            { opacity: 0, scale: 0.9, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        }
      });
    }

    // Stats counter trigger
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => setHasAnimatedStats(true),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section || st.vars.trigger === statsRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 bg-[#0a0618] border-t border-white/5 overflow-hidden"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-4">
            <span>ABOUT THE EXPO & HACKATHON</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl">
            Where Pioneering Minds Shape the <span className="text-gradient-eureka">Future of Tech</span>
          </h2>
        </div>

        {/* Desktop Pinned Narrative / Mobile Interactive Stack */}
        <div
          ref={pinContainerRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]"
        >
          {/* Left Column: Interactive Progress & Navigation (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-purple-300/70 mb-2">
              THE EUREKA JOURNEY
            </div>
            {BEATS.map((beat, index) => {
              const Icon = beat.icon;
              const isActive = activeBeat === index;
              return (
                <div
                  key={beat.step}
                  className={`p-6 rounded-2xl transition-all duration-500 border ${
                    isActive
                      ? "bg-purple-900/40 border-amber-300/40 shadow-[0_10px_30px_rgba(0,0,0,0.4)] scale-[1.02]"
                      : "bg-[#140c30]/40 border-white/5 opacity-50 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
                      style={{
                        backgroundColor: isActive ? `${beat.color}20` : "rgba(255,255,255,0.05)",
                        color: isActive ? beat.color : "#9ca3af",
                        border: `1px solid ${isActive ? beat.color : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      {beat.step}
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-purple-300/70">
                        {beat.tag}
                      </div>
                      <div className="font-display font-bold text-lg text-white">
                        {beat.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Card */}
          <div className="lg:col-span-7 relative">
            {BEATS.map((beat, index) => {
              const Icon = beat.icon;
              const isActive = activeBeat === index;

              return (
                <div
                  key={beat.step}
                  className={`narrative-beat p-8 md:p-12 rounded-3xl glass-panel relative overflow-hidden transition-all duration-700 ${
                    index === 0
                      ? "block"
                      : "lg:absolute lg:inset-0 " + (isActive ? "opacity-100 scale-100 z-20 pointer-events-auto" : "lg:opacity-0 lg:scale-95 lg:pointer-events-none")
                  } mb-8 lg:mb-0`}
                  style={{
                    borderTop: `2px solid ${beat.color}`,
                  }}
                >
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[80px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: beat.color }}
                  />

                  {/* Top Tag & Number */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-2xl"
                        style={{ backgroundColor: `${beat.color}15`, color: beat.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-purple-300/80">
                          {beat.tag}
                        </span>
                        <div className="font-mono text-xs text-white/40">PHASE {beat.step} OF 04</div>
                      </div>
                    </div>
                    <span className="font-display text-4xl md:text-5xl font-extrabold text-white/10">
                      {beat.step}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                    {beat.title}
                  </h3>

                  <p className="font-body text-base md:text-lg text-purple-200/80 leading-relaxed mb-8">
                    {beat.description}
                  </p>

                  {/* Highlights Bullet Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    {beat.points.map((point) => (
                      <div key={point} className="flex items-center gap-2.5 text-sm font-body text-purple-100">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: beat.color }} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Count-Up Stats Strip */}
        <div
          ref={statsRef}
          className="mt-24 p-8 md:p-12 rounded-3xl glass-panel-gold grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10"
        >
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${idx > 1 ? "pt-6 md:pt-0" : ""} ${idx % 2 !== 0 && idx <= 1 ? "pl-4 md:pl-0" : ""}`}
            >
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-300 mb-2 flex items-center font-mono">
                {stat.prefix && <span>{stat.prefix}</span>}
                <span>{hasAnimatedStats ? stat.value : 0}</span>
                {stat.suffix && <span className="text-amber-400 text-3xl sm:text-4xl">{stat.suffix}</span>}
              </div>
              <div className="font-display font-bold text-sm sm:text-base text-white">
                {stat.label}
              </div>
              <div className="text-xs text-purple-300/60 font-mono mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
