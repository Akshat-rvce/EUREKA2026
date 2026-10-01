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
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
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
      if (window.scrollY > 40) {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#0a0618]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => playClickSound()}
            className="group flex items-center gap-3 relative z-50"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(255,209,102,0.3)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0e0824] rounded-[11px] flex items-center justify-center font-display font-black text-amber-300 text-lg">
                E
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                EUREKA <span className="text-gradient-gold">'26</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-purple-300/70 font-mono -mt-1">
                RVCE • DEPT OF EEE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#140c30]/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={playHoverSound}
                className="px-4 py-2 text-sm font-medium text-purple-200/80 hover:text-amber-300 hover:bg-white/5 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Unstop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-full bg-[#180e38]/70 border border-white/10 hover:border-amber-300/40 text-purple-200 hover:text-amber-300 transition-colors"
              title={soundActive ? "Mute audio micro-interactions" : "Enable audio micro-interactions"}
              aria-label="Toggle sound"
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-purple-300/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              title="Staff & Judge Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Admin</span>
            </Link>

            {/* Unstop Register CTA */}
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="relative group overflow-hidden rounded-full p-[1px] font-display text-sm font-bold shadow-[0_0_20px_rgba(255,209,102,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,209,102,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-rose-500 to-teal-400 transition-all duration-500 group-hover:opacity-90" />
              <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a0618] text-white transition-colors duration-300 group-hover:bg-transparent group-hover:text-black">
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:text-black transition-colors" />
                <span>Register on Unstop</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-[#180e38] border border-white/10 text-amber-300"
              aria-label="Toggle sound"
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2.5 rounded-xl bg-[#1a103c] border border-white/10 text-white hover:text-amber-300 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0618]/98 backdrop-blur-2xl flex flex-col justify-between px-8 pt-28 pb-12 lg:hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-600/20 rounded-full blur-[90px] pointer-events-none" />

            <div className="flex flex-col gap-5">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-300/70 font-mono">
                NAVIGATION
              </span>
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="font-display text-3xl font-extrabold text-white/90 hover:text-amber-300 transition-colors flex items-center justify-between py-2 border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-purple-400">0{idx + 1}</span>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="pt-2"
              >
                <Link
                  href="/admin"
                  onClick={() => {
                    playClickSound();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm font-mono text-teal-300 hover:text-white py-2"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Admin & Judge Portal</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Bottom Action & Registration CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <div className="text-xs text-purple-300/60 font-mono">
                EVENT DATE: {SITE_CONFIG.date} • RVCE BANGALORE
              </div>
              <a
                href={UNSTOP_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-teal-400 text-black font-display font-black text-center text-lg shadow-[0_0_30px_rgba(255,209,102,0.4)] flex items-center justify-center gap-2"
              >
                <span>Register on Unstop</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
