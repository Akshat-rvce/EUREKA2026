"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound } from "@/utils/audio";

export function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("eureka_intro_seen");
    if (hasSeenIntro) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem("eureka_intro_seen", "true");
            onComplete?.();
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 6;
        return Math.min(100, prev + increment);
      });
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const skipIntro = () => {
    playClickSound();
    setIsDone(true);
    sessionStorage.setItem("eureka_intro_seen", "true");
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white select-none px-6"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
            {/* Dept Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-6 font-mono font-medium"
            >
              Dept. of EEE • RVCE Bangalore
            </motion.div>

            {/* Kinetic Title */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl font-black tracking-tight text-white"
              >
                EUREKA <span className="text-amber-400">&apos;26</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-xs sm:text-sm text-slate-400 font-normal mb-10 tracking-wide"
            >
              National Project Expo-cum-Hackathon
            </motion.p>

            {/* Progress Bar & Percentage */}
            <div className="w-full max-w-xs mb-8">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                <span>INITIALIZING HARDWARE SANDBOX</span>
                <span className="text-cyan-400 font-bold">{progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-amber-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={skipIntro}
              className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors py-1.5 px-3.5 rounded-full border border-white/10"
            >
              SKIP [ESC]
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
