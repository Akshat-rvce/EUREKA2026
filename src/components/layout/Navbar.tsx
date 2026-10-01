"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { UNSTOP_EVENT_URL, SITE_CONFIG } from "@/config/site";
import { isSoundEnabled, setSoundEnabled, playClickSound, playHoverSound } from "@/utils/audio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "5 Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes (₹1L+)", href: "#prizes" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    setSoundActive(isSoundEnabled());

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setSoundEnabled(nextState);
    if (nextState) playClickSound();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      playClickSound();
      scrollTo(href, { offset: -80 });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => playClickSound()}
            className="group flex items-center gap-3 relative z-50"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[1px] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center font-display font-black text-amber-400 text-base">
                E
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                EUREKA <span className="text-amber-400">&apos;26</span>
              </span>
              <span className="text-[9px] tracking-wider uppercase text-slate-400 font-mono -mt-1">
                RVCE • DEPT OF EEE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={playHoverSound}
                className="px-4 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions & Unstop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-colors"
              title={soundActive ? "Mute audio" : "Enable audio"}
              aria-label="Toggle sound"
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Admin Link */}
            <Link
              href="/admin"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all"
              title="Staff & Judge Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </Link>

            {/* Unstop Register CTA */}
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-display font-bold text-xs shadow-md transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Register on Unstop</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400"
              aria-label="Toggle sound"
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between px-8 pt-28 pb-10 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-mono">
                NAVIGATION
              </span>
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-2xl font-bold text-white hover:text-amber-400 transition-colors flex items-center justify-between py-2 border-b border-white/10"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                </a>
              ))}

              <Link
                href="/admin"
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-mono text-cyan-400 py-3"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin &amp; Judge Portal</span>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-xs text-slate-400 font-mono">
                DATE: {SITE_CONFIG.date} • RVCE BANGALORE
              </div>
              <a
                href={UNSTOP_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-display font-bold text-center text-base flex items-center justify-center gap-2"
              >
                <span>Register on Unstop</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
