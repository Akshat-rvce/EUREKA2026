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
    <div className="flex flex-col items-center select-none w-full max-w-xl mx-auto">
      {/* High-tech status indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400/90 font-semibold">
          SYSTEM T-MINUS TO EXPO LAUNCH
        </span>
      </div>

      {/* Cyber HUD Terminal Box */}
      <div className="relative p-4 sm:p-6 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,209,102,0.03)] w-full">
        {/* Corner HUD crosshair brackets */}
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-amber-400/80 rounded-tl-[4px]" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-amber-400/80 rounded-tr-[4px]" />
        <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-amber-400/80 rounded-bl-[4px]" />
        <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-amber-400/80 rounded-br-[4px]" />

        {/* Digits Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 items-center justify-center">
          {timeUnits.map((unit, idx) => (
            <div key={unit.label} className="relative flex flex-col items-center">
              <div className="font-mono text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200">
                  {unit.value}
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.25em] text-slate-400 mt-1 uppercase font-semibold">
                {unit.label}
              </span>
              {/* Divider for intermediate columns */}
              {idx < timeUnits.length - 1 && (
                <div className="hidden sm:block absolute -right-2 sm:-right-2.5 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-xl font-light">
                  :
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
