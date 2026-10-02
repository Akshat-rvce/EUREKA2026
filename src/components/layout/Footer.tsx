"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTop = () => {
    playClickSound();
    scrollTo(0, { duration: 1.2 });
  };

  return (
    <footer id="contact" className="relative w-full bg-black text-white border-t border-white/10 py-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="font-display font-black text-3xl tracking-tight text-white">
              EUREKA <span className="text-amber-400">&apos;26</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              National Project Expo · Dept. of Electrical &amp; Electronics Engineering, RV College of Engineering.
            </p>
            <div className="text-xs font-mono text-slate-500 pt-2">
              28 NOVEMBER 2026 • RVCE BENGALURU
            </div>
          </div>

          {/* Quick Access */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a
                  href="#hero"
                  onMouseEnter={playHoverSound}
                  className="hover:text-white transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#prizes"
                  onMouseEnter={playHoverSound}
                  className="hover:text-white transition-colors"
                >
                  Prizes &amp; Rewards
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  onMouseEnter={playHoverSound}
                  className="hover:text-white transition-colors"
                >
                  Tracks
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onMouseEnter={playHoverSound}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href={UNSTOP_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="hover:text-white transition-colors"
                >
                  Register on Unstop
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  onMouseEnter={playHoverSound}
                  className="hover:text-white text-slate-600 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3">
              VENUE &amp; CONTACT
            </div>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div>{SITE_CONFIG.venue}</div>
              <div>
                <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>
              <div>{SITE_CONFIG.contactPhone}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div>
            © 2026 EUREKA &apos;26. Dept. of EEE, RVCE. All rights reserved.
          </div>

          <button
            onClick={handleScrollTop}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
