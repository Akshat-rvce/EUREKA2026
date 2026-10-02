"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EVENT_TIMESTAMP = new Date("2026-11-28T09:00:00+05:30").getTime();

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = Math.max(0, EVENT_TIMESTAMP - now);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "DAYS", value: isMounted ? String(timeLeft.days).padStart(2, "0") : "00" },
    { label: "HOURS", value: isMounted ? String(timeLeft.hours).padStart(2, "0") : "00" },
    { label: "MINUTES", value: isMounted ? String(timeLeft.minutes).padStart(2, "0") : "00" },
    { label: "SECONDS", value: isMounted ? String(timeLeft.seconds).padStart(2, "0") : "00" },
  ];

  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto">
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400/90 font-semibold ml-1">
          SYSTEM T-MINUS TO EXPO LAUNCH
        </span>
      </div>

      {/* Cyber HUD box */}
      <div
        className="relative w-full rounded-2xl backdrop-blur-xl"
        style={{
          background: "rgba(0,0,0,0.65)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,209,102,0.03)",
          padding: "1.5rem 2rem",
        }}
      >
        {/* Corner brackets */}
        <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-amber-400/80 rounded-tl-[4px]" />
        <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-amber-400/80 rounded-tr-[4px]" />
        <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-amber-400/80 rounded-bl-[4px]" />
        <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-amber-400/80 rounded-br-[4px]" />

        {/* Single flex row: digit block · colon · digit block · colon … */}
        <div className="flex items-center justify-center gap-0">
          {timeUnits.map((unit, idx) => (
            <React.Fragment key={unit.label}>
              {/* Digit block */}
              <div className="flex flex-col items-center min-w-[4rem] sm:min-w-[5.5rem]">
                <span
                  className="font-mono font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
                >
                  {unit.value}
                </span>
                <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.25em] text-slate-400 mt-1.5 uppercase font-semibold">
                  {unit.label}
                </span>
              </div>

              {/* Colon separator — only between blocks, not after the last */}
              {idx < timeUnits.length - 1 && (
                <span
                  className="font-mono font-light text-slate-500 self-start pt-1"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1 }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
