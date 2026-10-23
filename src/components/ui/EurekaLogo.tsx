"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface EurekaLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
}

// Letter definitions for E-U-R-E-K-A based on exact normalized percentages in eureka-logo.png
const EUREKA_LETTERS = [
  { id: "E1", clip: "polygon(10.5% 41.5%, 23.4% 41.5%, 23.4% 56.5%, 10.5% 56.5%)", delay: 0.65 },
  // U includes the integrated vertical ground pin down to 61%
  { id: "U_GROUND", clip: "polygon(22.8% 41.5%, 35.5% 41.5%, 35.5% 61.0%, 22.8% 61.0%)", delay: 0.72 },
  { id: "R", clip: "polygon(34.8% 41.5%, 47.0% 41.5%, 47.0% 56.5%, 34.8% 56.5%)", delay: 0.79 },
  { id: "E2", clip: "polygon(46.5% 41.5%, 57.2% 41.5%, 57.2% 56.5%, 46.5% 56.5%)", delay: 0.86 },
  { id: "K", clip: "polygon(56.8% 41.5%, 68.8% 41.5%, 68.8% 56.5%, 56.8% 56.5%)", delay: 0.93 },
  { id: "A", clip: "polygon(68.5% 41.5%, 83.5% 41.5%, 83.5% 56.5%, 68.5% 56.5%)", delay: 1.00 },
];

export function EurekaLogo({ className = "", onAnimationComplete }: EurekaLogoProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setIsComplete(true);
      onAnimationComplete?.();
      return;
    }

    // The final PNG settles just after the last masked detail has appeared.
    const timer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete?.();
    }, 1680);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  // Circumference for outer circle (radius = 454px on a 1024x1024 canvas)
  const circleRadius = 454;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div
      className={`relative aspect-square w-full select-none ${className}`}
      role="img"
      aria-label="EUREKA '26 RVCE official logo"
    >
      {/* 
        STAGE G / FALLBACK: The complete, pristine, sharp original logo image.
        If reduced motion is active or once animation completes, it is fully visible.
        During animation, it gracefully crossfades in at the end.
      */}
      <motion.img
        src="/images/eureka-logo.png"
        alt="EUREKA '26 Logo"
        width={1024}
        height={1024}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: isComplete || reducedMotion ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* 
        ANIMATED STAGES (Active only when !isComplete and !reducedMotion)
        All animated elements use the EXACT original PNG clipped/masked to avoid redraw artifacts.
      */}
      {!isComplete && !reducedMotion && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* 
            STAGE B: Outer circular border drawing itself (0.1s - 0.68s)
            Masks the original image with an expanding circular stroke.
            Preserves the original champagne-gold shading and the natural horizontal gaps.
          */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1024 1024"
            aria-hidden="true"
          >
            <defs>
              <mask id="eureka-circle-reveal-mask">
                <rect width="1024" height="1024" fill="black" />
                <motion.circle
                  cx="512"
                  cy="512"
                  r={circleRadius}
                  fill="none"
                  stroke="white"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 0.58,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </mask>
              {/* Subtle radial glow filter for the traveling highlight dot */}
              <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* The circular border revealed via mask */}
            <image
              href="/images/eureka-logo.png"
              width="1024"
              height="1024"
              mask="url(#eureka-circle-reveal-mask)"
            />

            {/* Restrained traveling highlight dot along the circle border */}
            <motion.circle
              cx="512"
              cy="58"
              r="5"
              fill="#FFF6D6"
              filter="url(#gold-glow)"
              style={{ transformOrigin: "512px 512px" } as React.CSSProperties}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{
                rotate: 360,
                opacity: [0, 0.9, 0.8, 0],
              }}
              transition={{
                duration: 0.58,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </svg>

          {/* 
            STAGE C: RVCE and top horizontal lines appear (0.38s - 0.78s)
            Clipped from the exact original artwork. Glides upward 4px while fading in.
          */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              clipPath: "polygon(28% 14.5%, 72% 14.5%, 72% 21.0%, 28% 21.0%)",
            } as React.CSSProperties}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.42,
              delay: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src="/images/eureka-logo.png"
              alt=""
              className="w-full h-full object-contain pointer-events-none"
            />
          </motion.div>

          {/* 
            STAGE D: Custom EUREKA wordmark letters reveal from left to right (0.65s - 1.25s)
            Each letter is clipped from the original image and revealed with crisp 70ms stagger.
          */}
          {EUREKA_LETTERS.map((letter) => (
            <motion.div
              key={letter.id}
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: letter.clip } as React.CSSProperties}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.28,
                delay: letter.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="/images/eureka-logo.png"
                alt=""
                className="w-full h-full object-contain pointer-events-none"
              />
            </motion.div>
          ))}

          {/* Wordmark subtle light shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "polygon(10.5% 41.5%, 83.5% 41.5%, 83.5% 61.0%, 10.5% 61.0%)",
            } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeInOut" }}
          >
            <motion.div
              className="w-24 h-full bg-gradient-to-r from-transparent via-amber-200/30 to-transparent skew-x-[-25deg]"
              initial={{ x: "0%" }}
              animate={{ x: "600%" }}
              transition={{ duration: 0.65, delay: 0.72, ease: "easeInOut" }}
            />
          </motion.div>

          {/* 
            STAGE E: Orbital trail sweeps across lettering toward star (1.05s - 1.55s)
            Reveals the orbit path using an SVG mask following the bezier arc.
          */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1024 1024"
            aria-hidden="true"
          >
            <defs>
              <mask id="eureka-orbit-mask">
                <rect width="1024" height="1024" fill="black" />
                {/* Lower and upper orbit swoops */}
                <motion.path
                  d="M 230 635 C 370 665, 670 515, 801 289"
                  fill="none"
                  stroke="white"
                  strokeWidth="56"
                  strokeLinecap="round"
                  strokeDasharray="950"
                  initial={{ strokeDashoffset: 950 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 0.52,
                    delay: 1.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* Back arc of ellipse */}
                <motion.path
                  d="M 801 289 C 680 230, 360 250, 230 635"
                  fill="none"
                  stroke="white"
                  strokeWidth="48"
                  strokeLinecap="round"
                  strokeDasharray="950"
                  initial={{ strokeDashoffset: 950 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 0.48,
                    delay: 1.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </mask>
            </defs>

            <image
              href="/images/eureka-logo.png"
              width="1024"
              height="1024"
              mask="url(#eureka-orbit-mask)"
            />

            {/* Traveling champagne highlight along the main orbit arc */}
            <motion.circle
              r="4.5"
              fill="#FFFBE8"
              filter="url(#gold-glow)"
              initial={{ cx: 230, cy: 635, opacity: 0 }}
              animate={{
                cx: [230, 380, 580, 801],
                cy: [635, 655, 520, 289],
                opacity: [0, 0.9, 0.85, 0],
              }}
              transition={{
                duration: 0.52,
                delay: 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </svg>

          {/* 
            STAGE F — Star sparkle at (801, 289) [78.2%, 28.2%] (1.30s - 1.65s)
          */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              clipPath: "polygon(73.0% 24.0%, 83.5% 24.0%, 83.5% 33.5%, 73.0% 33.5%)",
            } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: [0.7, 1.15, 1] }}
            transition={{
              duration: 0.36,
              delay: 1.30,
              ease: "easeOut",
            }}
          >
            <img
              src="/images/eureka-logo.png"
              alt=""
              className="w-full h-full object-contain pointer-events-none"
            />
          </motion.div>

          {/* Subtle star gleam flare */}
          <motion.div
            className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              left: "78.2%",
              top: "28.2%",
              background: "radial-gradient(circle, rgba(255,250,225,0.95) 0%, rgba(255,215,100,0.4) 45%, transparent 75%)",
            } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 1.5, 0.8],
            }}
            transition={{
              duration: 0.38,
              delay: 1.34,
              ease: "easeOut",
            }}
          />

          {/* 
            STAGE F — Year '2026' lettering (1.35s - 1.68s)
            Clipped precisely from the lower right of the artwork
          */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              clipPath: "polygon(67.5% 53.5%, 91.5% 53.5%, 91.5% 62.5%, 67.5% 62.5%)",
            } as React.CSSProperties}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 1.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src="/images/eureka-logo.png"
              alt=""
              className="w-full h-full object-contain pointer-events-none"
            />
          </motion.div>

          {/* 
            STAGE F — Lower grounding symbol & fine horizontal lines (1.40s - 1.72s)
          */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              clipPath: "polygon(32.5% 68.5%, 69.5% 68.5%, 69.5% 75.5%, 32.5% 75.5%)",
            } as React.CSSProperties}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 1.40,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src="/images/eureka-logo.png"
              alt=""
              className="w-full h-full object-contain pointer-events-none"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
