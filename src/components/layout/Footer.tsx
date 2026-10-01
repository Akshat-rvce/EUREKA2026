"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, Camera, Users, Code2, ShieldCheck, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTop = () => {
    playClickSound();
    scrollTo(0, { duration: 1.5 });
  };

  return (
    <footer className="relative w-full bg-[#06030e] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Ambient Floor Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Affiliation */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#0e0824] rounded-[11px] flex items-center justify-center font-display font-black text-amber-300">
                  E
                </div>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                EUREKA <span className="text-gradient-gold">'26</span>
              </span>
            </div>

            <p className="text-sm text-purple-200/70 font-body max-w-sm leading-relaxed">
              The flagship National Project Expo-cum-Hackathon organized by the Department of Electronics & Electrical Engineering, RV College of Engineering (RVCE), Bangalore.
            </p>

            <div className="pt-2 text-xs font-mono text-amber-300/80">
              DATE: NOVEMBER 28, 2026 • RVCE BENGALURU
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] font-mono text-purple-300/60 mb-4">
              QUICK ACCESS
            </div>
            <ul className="space-y-2 text-sm font-body text-purple-200/80">
              <li>
                <a
                  href="#about"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-300 transition-colors"
                >
                  About Expo & Story
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-300 transition-colors"
                >
                  5 Frontier Tracks
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-300 transition-colors"
                >
                  Schedule & Format
                </a>
              </li>
              <li>
                <a
                  href="#prizes"
                  onMouseEnter={playHoverSound}
                  className="hover:text-amber-300 transition-colors"
                >
                  Prizes & Incubation
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  onMouseEnter={playHoverSound}
                  className="hover:text-teal-300 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Admin & Judge Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Venue Coordinates */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] font-mono text-purple-300/60 mb-4">
              ORGANIZER CONTACT & VENUE
            </div>
            <div className="space-y-3 text-xs md:text-sm font-mono text-purple-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.venue}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-300 flex-shrink-0" />
                <span>{SITE_CONFIG.contactPhone}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 hover:text-amber-300 transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 hover:text-amber-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Users className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 hover:text-amber-300 transition-colors"
                aria-label="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-300/50">
          <div>
            © 2026 EUREKA '26. Dept. of Electronics & Electrical Engineering, RVCE Bangalore. All rights reserved.
          </div>

          <button
            onClick={handleScrollTop}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-purple-200 hover:text-amber-300 border border-white/10 transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
