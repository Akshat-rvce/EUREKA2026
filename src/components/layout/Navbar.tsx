"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import { UNSTOP_EVENT_URL } from "@/config/site";
import { isSoundEnabled, setSoundEnabled, playClickSound, playHoverSound } from "@/utils/audio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const NAV_LINKS = [
  { label: "Overview", href: "#hero" },
  { label: "Prizes",   href: "#prizes" },
  { label: "Tracks",   href: "#tracks" },
  { label: "FAQ",      href: "#faq" },
  { label: "Contact",  href: "#contact" },
];

/* ── thin decorative separator ── */
function Dot() {
  return <span className="w-0.5 h-0.5 rounded-full bg-white/20 mx-1" />;
}

export function Navbar() {
  const [isVisible, setIsVisible]         = useState(false);
  const [isScrolled, setIsScrolled]       = useState(false);
  const [soundActive, setSoundActive]     = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    setSoundActive(isSoundEnabled());

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.45;
      setIsVisible(window.scrollY > threshold);
      setIsScrolled(window.scrollY > threshold + 20);
      if (window.scrollY <= threshold) setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      playClickSound();
      scrollTo(href, { offset: -70 });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
      }`}
    >
      {/* Glass bar - appears once scrolled */}
      <div
        className={`pointer-events-auto transition-all duration-500 ${
          isScrolled
            ? "mx-4 sm:mx-8 mt-3 rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between">

          {/* ── Brand ── */}
          <Link
            href="/"
            onClick={() => { playClickSound(); scrollTo(0); }}
            className="font-display font-black text-base tracking-tight text-white hover:text-amber-300 transition-colors"
          >
            E<span className="text-amber-400">&apos;</span>26
          </Link>

          {/* ── Desktop Nav pill ── */}
          <nav className="hidden md:flex items-center">
            {NAV_LINKS.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && <Dot />}
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={playHoverSound}
                  className="px-5 py-1.5 text-xs font-mono tracking-wider text-slate-400 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 text-slate-500 hover:text-white transition-colors"
              aria-label="Toggle sound"
            >
              {soundActive
                ? <Volume2 className="w-3.5 h-3.5 text-amber-400/70" />
                : <VolumeX  className="w-3.5 h-3.5" />}
            </button>

            {/* Admin — very small, subordinate weight */}
            <Link
              href="/admin"
              onClick={() => playClickSound()}
              className="flex items-center gap-1 text-[10px] font-mono text-slate-600 hover:text-slate-400 transition-colors"
            >
              <ShieldCheck className="w-2.5 h-2.5" />
              Admin
            </Link>

            {/* Register — distinctly primary */}
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="group flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-black font-display font-bold text-xs shadow-[0_0_16px_rgba(255,255,255,0.18)] hover:shadow-[0_0_28px_rgba(255,255,255,0.32)] transition-all duration-300"
            >
              Register
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-white text-black font-display font-bold text-xs"
            >
              Register
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/8 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden pointer-events-auto mx-4 mt-2 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/[0.08] px-6 py-6 space-y-3"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-sm font-mono text-slate-300 hover:text-white py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-xs font-mono text-slate-600 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Admin
              </Link>
              <button onClick={toggleSound} className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                {soundActive ? <Volume2 className="w-3.5 h-3.5 text-amber-400/70" /> : <VolumeX className="w-3.5 h-3.5" />}
                {soundActive ? "Sound ON" : "Muted"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
