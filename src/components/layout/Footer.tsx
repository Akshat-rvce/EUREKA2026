"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, REGISTRATION_FORM_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTop = () => {
    playClickSound();
    scrollTo(0, { duration: 1.2 });
  };

  return (
    <footer id="contact" className="relative w-full bg-black text-white border-t border-white/10 py-12 sm:py-16 px-6 sm:px-12 md:px-20 lg:px-28">
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
                  href={REGISTRATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="hover:text-white transition-colors"
                >
                  Register Now
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
              <div>{SITE_CONFIG.contactPhone}</div>
            </div>
          </div>
        </div>

        <section aria-labelledby="footer-sponsors-title" className="border-b border-white/10 py-7">
          <h2 id="footer-sponsors-title" className="mb-4 text-[10px] font-mono uppercase tracking-[.2em] text-slate-500">
            Sponsors &amp; community partners
          </h2>
          <div className="mb-3 flex min-h-[4.5rem] w-full max-w-sm items-center gap-4 rounded-lg bg-white px-4 py-2">
            <Image
              src="/images/sponsors/ntpc.png"
              alt="NTPC Limited, Title Sponsor"
              width={1272}
              height={681}
              sizes="150px"
              className="max-h-10 w-32 shrink-0 object-contain"
            />
            <span className="border-l border-[#d4cfc2] pl-4 text-[9px] font-mono uppercase leading-relaxed tracking-[.12em] text-[#665c48]">Title<br />Sponsor</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:max-w-3xl sm:grid-cols-4 sm:gap-3">
            <div className="flex min-h-24 flex-col items-center justify-start gap-2 rounded-lg border border-white/10 bg-white/[.025] p-2 text-center sm:p-3">
              <div className="flex h-14 w-full items-center justify-center rounded bg-white px-2 sm:h-16 sm:px-3">
                <Image src="/images/sponsors/ieee-rvce-student-branch.jpg" alt="IEEE Student Branch, RV College of Engineering" width={1295} height={266} sizes="(max-width: 640px) 40vw, 180px" className="max-h-10 w-full object-contain" />
              </div>
              <span className="text-[9px] font-mono uppercase leading-relaxed tracking-[.1em] text-slate-400">Student Community Partner</span>
            </div>
            <div className="flex min-h-24 flex-col items-center justify-start gap-2 rounded-lg border border-white/10 bg-white/[.025] p-2 text-center sm:p-3">
              <div className="flex h-14 w-full items-center justify-center rounded bg-white px-2 sm:h-16 sm:px-3">
                <Image src="/images/sponsors/ieee.png" alt="IEEE" width={738} height={240} sizes="(max-width: 640px) 40vw, 180px" className="max-h-10 w-full object-contain" />
              </div>
              <span className="text-[9px] font-mono uppercase leading-relaxed tracking-[.1em] text-slate-400">Technology &amp; Innovation Partner</span>
            </div>
            <div className="flex min-h-24 flex-col items-center justify-start gap-2 rounded-lg border border-white/10 bg-white/[.025] p-2 text-center sm:p-3">
              <div className="flex h-14 w-full items-center justify-center rounded bg-white px-2 sm:h-16 sm:px-3">
                <Image src="/images/sponsors/ieee-pes.gif" alt="IEEE Power & Energy Society" width={388} height={263} sizes="(max-width: 640px) 40vw, 180px" unoptimized className="max-h-10 w-full object-contain" />
              </div>
              <span className="text-[9px] font-mono uppercase leading-relaxed tracking-[.1em] text-slate-400">Energy Knowledge Partner</span>
            </div>
            <div className="flex min-h-24 flex-col items-center justify-start gap-2 rounded-lg border border-white/10 bg-white/[.025] p-2 text-center sm:p-3">
              <div className="flex h-14 w-full items-center justify-center rounded bg-white px-2 sm:h-16 sm:px-3">
                <Image src="/images/sponsors/ecokranti.png" alt="Ecokranti" width={738} height={189} sizes="(max-width: 640px) 40vw, 180px" className="max-h-10 w-full object-contain" />
              </div>
              <span className="text-[9px] font-mono uppercase leading-relaxed tracking-[.1em] text-slate-400">Track 02 Sponsor</span>
            </div>
          </div>
        </section>

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
