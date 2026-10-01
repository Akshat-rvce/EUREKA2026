"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, SunMedium, Cpu, Activity, Sparkles, ArrowRight, X, Check, Layers } from "lucide-react";
import { TRACKS, TrackItem } from "@/config/site";
import { playHoverSound, playClickSound } from "@/utils/audio";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  Zap,
  SunMedium,
  Cpu,
  Activity,
  Sparkles,
};

export function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);

  const openTrackDetails = (track: TrackItem) => {
    playClickSound();
    setSelectedTrack(track);
  };

  const closeTrackDetails = () => {
    playClickSound();
    setSelectedTrack(null);
  };

  return (
    <section id="tracks" className="relative w-full py-24 bg-[#080414] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-300 text-xs font-mono mb-4">
              <span>COMPETITION CATEGORIES</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              5 Frontier <span className="text-gradient-eureka">Innovation Tracks</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-purple-200/70 font-body max-w-md">
            Select your domain of impact. Build physical hardware or simulation models to compete for grand and track-specific prizes.
          </p>
        </div>

        {/* Bento Grid Layout for Desktop / Tablet */}
        <div className="hidden md:grid md:grid-cols-6 gap-6">
          {TRACKS.map((track, idx) => {
            const Icon = ICON_MAP[track.iconName] || Sparkles;
            
            // Asymmetric Bento Sizing: Track 1 (cols 0-3), Track 2 (cols 3-6), Track 3 (cols 0-2), Track 4 (cols 2-4), Track 5 (cols 4-6)
            const spanClass =
              idx === 0
                ? "md:col-span-3"
                : idx === 1
                ? "md:col-span-3"
                : idx === 2
                ? "md:col-span-2"
                : idx === 3
                ? "md:col-span-2"
                : "md:col-span-2";

            return (
              <motion.div
                key={track.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={playHoverSound}
                onClick={() => openTrackDetails(track)}
                className={`relative group rounded-3xl p-8 cursor-pointer overflow-hidden border border-white/10 hover:border-amber-300/40 transition-all duration-500 bg-gradient-to-b ${track.gradient} ${spanClass} min-h-[340px] flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.4)]`}
              >
                {/* Top Corner Number & Icon */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div
                    className="p-3.5 rounded-2xl border backdrop-blur-md"
                    style={{
                      backgroundColor: `${track.accentColor}18`,
                      borderColor: `${track.accentColor}40`,
                      color: track.accentColor,
                    }}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-white/20 group-hover:text-white/40 transition-colors">
                    {track.number}
                  </span>
                </div>

                {/* Card Main Info */}
                <div className="relative z-10 my-auto">
                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-purple-300/80 mb-4">
                    {track.tagline}
                  </p>
                  <p className="text-sm text-purple-200/70 font-body line-clamp-2 mb-6">
                    {track.description}
                  </p>
                </div>

                {/* Bottom Tags & View Trigger */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                    {track.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-purple-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-black flex items-center justify-center text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Subtle Hover Spotlight */}
                <div
                  className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[70px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: track.accentColor }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Horizontal Snap Carousel */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 no-scrollbar">
          {TRACKS.map((track) => {
            const Icon = ICON_MAP[track.iconName] || Sparkles;
            return (
              <div
                key={track.id}
                onClick={() => openTrackDetails(track)}
                className={`snap-center flex-shrink-0 w-[85vw] rounded-3xl p-6 border border-white/10 bg-gradient-to-b ${track.gradient} flex flex-col justify-between min-h-[360px]`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-2xl border"
                    style={{
                      backgroundColor: `${track.accentColor}20`,
                      borderColor: `${track.accentColor}40`,
                      color: track.accentColor,
                    }}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-white/30">
                    {track.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {track.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-300/90 mb-3">
                    {track.tagline}
                  </p>
                  <p className="text-sm text-purple-200/80 font-body mb-4">
                    {track.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-teal-300">Tap for details</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track Detail Modal */}
      <AnimatePresence>
        {selectedTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={closeTrackDetails}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl glass-panel p-8 md:p-10 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ borderTop: `3px solid ${selectedTrack.accentColor}` } as React.CSSProperties}
            >
              <button
                onClick={closeTrackDetails}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  TRACK {selectedTrack.number}
                </span>
                <span className="text-xs font-mono text-purple-300/70">
                  EUREKA '26 EXPEDITION
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2">
                {selectedTrack.title}
              </h3>
              <p className="text-sm font-mono text-amber-300 mb-6">
                {selectedTrack.tagline}
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-purple-300/70 font-mono mb-2">
                    SCOPE & OVERVIEW
                  </h4>
                  <p className="text-sm text-purple-100 font-body leading-relaxed">
                    {selectedTrack.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-purple-300/70 font-mono mb-2">
                    SUGGESTED FOCUS SUBDOMAINS & TECH STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-900/40 border border-purple-400/20 text-purple-200 flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-teal-300" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20">
                  <div className="text-xs font-mono text-amber-300 font-semibold mb-1">
                    JUDGING CRITERIA EMPHASIS
                  </div>
                  <p className="text-xs text-purple-200/80">
                    Prototypes in this track are judged heavily on hardware feasibility, circuit schematic elegance, component selection, real-time telemetry, and commercialization potential.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeTrackDetails}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-display font-semibold transition-colors"
                >
                  Close Track Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
