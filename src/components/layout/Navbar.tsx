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
  { label: "Expo",     href: "#expo-intro" },
  { label: "Prizes",   href: "#prizes" },
  { label: "Tracks",   href: "#tracks" },
  { label: "FAQ",      href: "#faq" },
  { label: "Contact",  href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [soundActive, setSoundActive]       = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    setSoundActive(isSoundEnabled());
    const handleScroll = () => {
      // Unobtrusive transition threshold for navbar pill styling
      setIsScrolled(window.scrollY > 25);
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none border-b border-white/[0.09] bg-[#090b0d]/95 backdrop-blur-xl transition-all duration-300">
      {/* Centered navigation bar */}
      <div className="pointer-events-auto flex justify-center px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-7xl transition-all duration-300 ${
            isScrolled
              ? "shadow-[0_8px_35px_rgba(0,0,0,0.24)]"
              : ""
          }`}
        >
          <div className="flex min-h-[58px] items-center justify-between px-1 sm:min-h-[66px] sm:px-2">

            {/* Brand / Mini Logo */}
            <Link
              href="/"
              onClick={() => { playClickSound(); scrollTo(0); }}
              className="flex items-center gap-1.5 shrink-0 group min-h-[40px]"
            >
              <span className="font-display text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-amber-200 sm:text-2xl">
                E
              </span>
              <span
                className="font-display text-xl font-normal tracking-tight sm:text-2xl"
                style={{
                  background: "linear-gradient(135deg, #fff 30%, #fcd34d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                &apos;26
              </span>
              <span className="ml-1.5 hidden self-end font-body text-[9px] tracking-[0.18em] text-slate-500 uppercase sm:mb-0.5 sm:inline-block">
                RVCE EEE
              </span>
            </Link>

            {/* Desktop nav — clean, evenly spaced */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={playHoverSound}
                  className="rounded-lg px-3 py-2 text-[12px] font-medium tracking-wide text-slate-400 transition-all duration-200 hover:bg-white/[0.07] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Sound */}
              <button
                onClick={toggleSound}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
                aria-label="Toggle sound"
              >
                {soundActive
                  ? <Volume2 className="w-3.5 h-3.5 text-amber-400/90" />
                  : <VolumeX  className="w-3.5 h-3.5" />}
              </button>

              {/* Admin portal link */}
              <Link
                href="/admin"
                onClick={() => playClickSound()}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-body text-slate-500 transition-colors hover:text-slate-300"
              >
                <ShieldCheck className="w-3 h-3 text-slate-600" />
                Admin
              </Link>

              {/* Register — champagne amber gradient CTA */}
              <a
                href={UNSTOP_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                onMouseEnter={playHoverSound}
                className="button-primary group flex items-center gap-1.5 rounded-lg px-4 py-2 font-display text-[13px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Register
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile: compact register button + 44px hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={UNSTOP_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary flex items-center gap-1 rounded-lg px-3.5 py-1.5 font-display text-xs font-bold"
              >
                <span>Register</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white active:bg-white/[0.15]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Mobile drawer with comfortable touch targets */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden pointer-events-auto mx-3 mt-2 rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl overflow-hidden"
          >
            <div className="px-3 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center min-h-[44px] px-4 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="px-4 pb-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] text-xs font-mono text-slate-500 flex items-center gap-1.5 hover:text-slate-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
              </Link>
              <button
                onClick={toggleSound}
                className="min-h-[44px] text-xs font-mono text-slate-400 flex items-center gap-1.5 hover:text-white transition-colors px-2"
              >
                {soundActive
                  ? <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  : <VolumeX  className="w-3.5 h-3.5 text-slate-500" />}
                {soundActive ? "Sound ON" : "Muted"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
