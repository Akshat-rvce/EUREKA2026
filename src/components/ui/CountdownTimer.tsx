"use client";

import React, { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/config/site";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

const EVENT_TIMESTAMP = new Date(SITE_CONFIG.eventDateISO).getTime();

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const update = () => {
      const difference = Math.max(0, EVENT_TIMESTAMP - Date.now());
      setTimeLeft({
        days: Math.floor(difference / 86_400_000),
        hours: Math.floor((difference / 3_600_000) % 24),
        minutes: Math.floor((difference / 60_000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", short: "DAYS", value: timeLeft.days },
    { label: "Hours", short: "HRS", value: timeLeft.hours },
    { label: "Minutes", short: "MIN", value: timeLeft.minutes },
    { label: "Seconds", short: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-clock" role="timer" aria-label="Countdown to EUREKA ’26 on November 28, 2026">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="countdown-unit" aria-label={`${unit.label}: ${isMounted ? unit.value : 0}`}>
            <span className="countdown-value">{isMounted ? String(unit.value).padStart(2, "0") : "00"}</span>
            <span className="countdown-label">{unit.short}</span>
          </div>
          {index < units.length - 1 && <span className="countdown-separator" aria-hidden="true">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
