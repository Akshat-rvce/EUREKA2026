"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, CheckCircle2, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { TIMELINE } from "@/config/site";

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.innerWidth >= 1024;
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    if (isDesktop) {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth + 600}`,
          invalidateOnRefresh: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full py-24 bg-[#0a0618] border-t border-white/5 overflow-hidden"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20 text-rose-300 text-xs font-mono mb-4">
              <span>EVENT SCHEDULE • 28 NOV 2026</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              The 24-Hour <span className="text-gradient-eureka">Battle Format</span>
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-purple-300/60">
            <span>DRAG / SCROLL HORIZONTALLY</span>
            <ChevronRight className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Scroll Track */}
      <div ref={containerRef} className="hidden lg:block w-full overflow-hidden">
        <div
          ref={trackRef}
          className="horizontal-scroll-container flex items-stretch gap-8 px-12 py-6"
        >
          {TIMELINE.map((item, idx) => (
            <div
              key={item.round}
              className="w-[440px] flex-shrink-0 rounded-3xl glass-panel p-8 flex flex-col justify-between border-t-2 border-amber-300/40 hover:border-amber-300 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Top Badge & Time */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-purple-900/50 text-amber-300 border border-purple-400/20 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </span>
                  <span className="font-mono text-sm font-bold text-white/30">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                {/* Round Category */}
                <div className="inline-block text-xs font-mono uppercase tracking-widest text-teal-300 mb-2">
                  {item.round} • {item.badge}
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-4 leading-tight">
                  {item.title}
                </h3>

                <p className="font-body text-sm text-purple-200/70 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2 text-xs font-body text-purple-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Stepped Timeline */}
      <div className="block lg:hidden px-6 max-w-xl mx-auto space-y-8 relative">
        <div className="absolute top-4 bottom-4 left-9 w-0.5 bg-gradient-to-b from-amber-400 via-rose-500 to-teal-400 opacity-30" />

        {TIMELINE.map((item, idx) => (
          <div key={item.round} className="relative flex items-start gap-4">
            {/* Glowing Step Node */}
            <div className="relative z-10 w-7 h-7 rounded-full bg-purple-900 border-2 border-amber-300 flex items-center justify-center font-mono text-xs text-amber-300 shadow-[0_0_10px_#FFD166] flex-shrink-0 mt-1">
              {idx + 1}
            </div>

            {/* Content Card */}
            <div className="flex-1 rounded-2xl glass-panel p-6 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
                <span>{item.time}</span>
                <span className="text-purple-300/60">{item.round}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-purple-200/70 font-body mb-4">
                {item.description}
              </p>
              <div className="space-y-1.5 pt-3 border-t border-white/10">
                {item.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-1.5 text-xs text-purple-100">
                    <CheckCircle2 className="w-3 h-3 text-amber-300" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
