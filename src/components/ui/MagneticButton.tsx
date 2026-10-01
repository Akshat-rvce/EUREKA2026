"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { playHoverSound, playClickSound } from "@/utils/audio";
import { cn } from "@/utils/cn";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className,
  magneticStrength = 0.35,
  asLink = false,
  href,
  target,
  rel,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (clientX - centerX) * magneticStrength;
    const distanceY = (clientY - centerY) * magneticStrength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={playHoverSound}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      className="inline-block"
    >
      {asLink ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={handleClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          className={cn(
            "relative inline-flex items-center justify-center font-display font-semibold transition-all duration-300",
            className
          )}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={handleClick}
          className={cn(
            "relative inline-flex items-center justify-center font-display font-semibold transition-all duration-300",
            className
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
