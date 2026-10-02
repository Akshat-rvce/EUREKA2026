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
    { label: "DAYS", value: isMounted ? String(timeLeft.days).padStart(2, "0") : "--" },
    { label: "HOURS", value: isMounted ? String(timeLeft.hours).padStart(2, "0") : "--" },
    { label: "MINS", value: isMounted ? String(timeLeft.minutes).padStart(2, "0") : "--" },
    { label: "SECS", value: isMounted ? String(timeLeft.seconds).padStart(2, "0") : "--" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3 select-none">
      {timeUnits.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div className="min-w-[54px] sm:min-w-[64px] px-2.5 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white block">
                {unit.value}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-400 mt-1 uppercase font-semibold">
              {unit.label}
            </span>
          </div>
          {idx < timeUnits.length - 1 && (
            <span className="text-amber-400/60 font-mono text-base font-bold pb-4">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
