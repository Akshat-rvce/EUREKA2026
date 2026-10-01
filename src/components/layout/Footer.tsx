"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, Camera, Users, Code2, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTop = () => {
    playClickSound();
    scrollTo(0, { duration: 1.2 });
  };

  return (
    <footer className="relative w-full bg-black text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Ambient Floor Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Affiliation */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[1px]">
                <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center font-display font-black text-amber-400">
                  E
                </div>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                EUREKA <span className="text-amber-400">&apos;26</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 font-normal max-w-sm leading-relaxed">
              The flagship National Project Expo-cum-Hackathon organized by the Department of Electrical &amp; Electronics Engineering, RV College of Engineering (RVCE), Bangalore.
            </p>

            <div className="pt-2 text-xs font-mono text-amber-400">
              DATE: NOVEMBER 28, 2026 • RVCE BENGALURU
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] font-mono text-slate-500 mb-4">
              QUICK ACCESS
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href="#about"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Expo &amp; Story
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-400 transition-colors"
                >
                  5 Frontier Tracks (₹15k Each)
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-400 transition-colors"
                >
                  Schedule &amp; Format
                </a>
              </li>
              <li>
                <a
                  href="#prizes"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-400 transition-colors"
                >
                  Prizes &amp; Grants (₹1L+)
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  onMouseEnter={playHoverSound}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin &amp; Judge Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Venue */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] font-mono text-slate-500 mb-4">
              ORGANIZER CONTACT &amp; VENUE
            </div>
            <div className="space-y-3 text-xs md:text-sm font-mono text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.venue}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{SITE_CONFIG.contactPhone}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-4">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Users className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 EUREKA &apos;26. Dept. of Electrical &amp; Electronics Engineering, RVCE Bangalore. All rights reserved.
          </div>

          <button
            onClick={handleScrollTop}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
