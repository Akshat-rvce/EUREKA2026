"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Zap, AlertTriangle } from "lucide-react";
import { playClickSound, playHoverSound } from "@/utils/audio";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#070412] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-center select-none">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono mb-8">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>ERROR 404 • CIRCUIT BREAK DETECTED</span>
        </div>

        <h1 className="font-display text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-500 to-purple-500 tracking-tighter leading-none mb-4">
          404
        </h1>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          Signal Lost in Transit
        </h2>

        <p className="font-body text-sm text-purple-200/70 max-w-md mb-8 leading-relaxed">
          The requested coordinate does not exist within the EUREKA '26 framework. Return to the main circuit to continue exploring the National Expo.
        </p>

        <Link
          href="/"
          onClick={() => playClickSound()}
          onMouseEnter={playHoverSound}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 text-black font-display font-bold text-sm shadow-[0_0_25px_rgba(255,209,102,0.4)] hover:shadow-[0_0_35px_rgba(255,209,102,0.6)] flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>

      <div className="absolute bottom-8 text-xs font-mono text-purple-300/40">
        EUREKA '26 • Dept. of Electronics & Electrical Engineering, RVCE Bangalore
      </div>
    </div>
  );
}
