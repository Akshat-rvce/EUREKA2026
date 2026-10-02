"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, SunMedium, Cpu, Activity, Sparkles, ArrowRight, X, Check, Trophy, ExternalLink, Cpu as ChipIcon, HelpCircle } from "lucide-react";
import { TRACKS, TrackItem, UNSTOP_EVENT_URL } from "@/config/site";
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
    <section id="tracks" className="relative w-full py-24 bg-black border-t border-white/[0.08] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-mono mb-4">
              <span>5 FRONTIER DOMAINS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
              Innovation <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">Tracks</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Select your domain of impact. Each track features a dedicated{" "}
              <span className="text-emerald-400 font-bold">₹15,000 Track Winner Prize</span> + overall championship qualification!
            </p>
          </div>
        </div>

        {/* 5 Track Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACKS.map((track, idx) => {
            const Icon = ICON_MAP[track.iconName] || Sparkles;

            return (
              <div
                key={track.id}
                onMouseEnter={playHoverSound}
                onClick={() => openTrackDetails(track)}
                className={`group relative rounded-3xl p-7 cursor-pointer overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] flex flex-col justify-between shadow-xl min-h-[380px] ${
                  idx === 0 ? "lg:col-span-2" : idx === 1 ? "lg:col-span-1" : ""
                }`}
              >
                {/* Top Row: Track Icon, Number, and Prize Badge */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="p-3 rounded-2xl border bg-white/5 border-white/10"
                      style={{ color: track.accentColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* ₹15K Prize Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>₹15,000 Prize</span>
                    </div>

                    <span className="font-mono text-2xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                      {track.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4 line-clamp-1">
                    {track.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal line-clamp-3 mb-6 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                {/* Bottom Tags and Click Prompt */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                    {track.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 group-hover:text-white transition-colors">
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Track Full Details Interactive Modal */}
      <AnimatePresence>
        {selectedTrack && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
            onClick={closeTrackDetails}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl bg-[#0a0a0f] p-6 sm:p-10 border border-white/15 border-t-[3px] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-8"
              style={{ borderTopColor: selectedTrack.accentColor } as React.CSSProperties}
            >
              {/* Close Button */}
              <button
                onClick={closeTrackDetails}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badge & Track ID */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 font-bold">
                  TRACK {selectedTrack.number}
                </span>
                
                {/* ₹15K Highlight Pill */}
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  {selectedTrack.prizePool}
                </span>
              </div>

              {/* Main Title & Subtitle */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                {selectedTrack.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mb-6">
                {selectedTrack.tagline}
              </p>

              {/* Track Scope */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TRACK DOMAIN &amp; OVERVIEW</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                  {selectedTrack.description}
                </p>
              </div>

              {/* Problem Statements / Challenges */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-3">
                  SAMPLE PROBLEM STATEMENTS &amp; CHALLENGES:
                </h4>
                <div className="space-y-2.5">
                  {selectedTrack.problemStatements.map((statement, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold text-[10px] flex items-center justify-center mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {statement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware & Sensor Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-mono mb-3 flex items-center gap-1.5">
                  <ChipIcon className="w-3.5 h-3.5" />
                  <span>RECOMMENDED HARDWARE &amp; SENSOR STACK:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.hardwareStack.map((hw) => (
                    <span
                      key={hw}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-cyan-400" />
                      <span>{hw}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Evaluation Rubrics */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-3">
                  EVALUATION CRITERIA &amp; WEIGHTAGE:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedTrack.evaluationCriteria.map((crit, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center"
                    >
                      <div className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                        {crit.weight}
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1 font-normal">
                        {crit.criteria}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="text-xs font-mono text-slate-400">
                  Prize: <span className="text-emerald-400 font-bold">₹15,000</span> + Merit Certificate
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={closeTrackDetails}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                  >
                    Close Preview
                  </button>
                  <a
                    href={UNSTOP_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound()}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-display font-bold text-xs shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-1.5"
                  >
                    <span>Register on Unstop</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
