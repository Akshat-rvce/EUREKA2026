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
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(100, prev + increment);
      });
    }, 60);

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
            y: -20,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070412] text-white select-none px-6"
        >
          {/* Subtle Background Glow */}
          <div className="absolute w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
            {/* Dept Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.3em] text-amber-300/80 mb-6 font-mono font-medium"
            >
              Dept. of EEE • RVCE Bangalore
            </motion.div>

            {/* Kinetic Title Reveal */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white"
              >
                EUREKA <span className="text-gradient-gold">'26</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base text-purple-200/60 font-body mb-10 tracking-wide"
            >
              National Project Expo-cum-Hackathon
            </motion.p>

            {/* Progress Bar & Percentage */}
            <div className="w-full max-w-xs mb-8">
              <div className="flex justify-between items-center text-xs font-mono text-purple-300/70 mb-2">
                <span>INITIALIZING SYSTEM</span>
                <span className="text-amber-300 font-bold">{progress}%</span>
              </div>
              <div className="h-1 w-full bg-purple-950/60 rounded-full overflow-hidden border border-purple-800/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400"
                  style={{ width: `${progress}%` } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={skipIntro}
              className="text-xs font-mono text-white/40 hover:text-amber-300 transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-amber-300/40"
            >
              SKIP INTRO [ESC]
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
