"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, ShieldCheck } from "lucide-react";
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
    <footer id="contact" className="relative w-full border-t border-white/10 bg-[#101516] px-5 py-7 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="footer-mainline">
          <div className="footer-brand">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">EUREKA <span className="text-[#e3bd78]">&apos;26</span></h2>
            <p>National Project Expo · RVCE, Bengaluru</p>
          </div>
          <div className="footer-event-meta"><span>28 November 2026</span><span>{SITE_CONFIG.venue}</span></div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#expo-intro">Overview</a><a href="#prizes">Prizes</a><a href="#tracks">Tracks</a><a href="#faq">FAQ</a>
            <a href={UNSTOP_EVENT_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">Register <ArrowUpRight size={12} /></a>
            <Link href="/admin" className="inline-flex items-center gap-1"><ShieldCheck size={13} /> Admin</Link>
          </nav>
          <div className="footer-socials">
            <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noreferrer" aria-label="EUREKA on Instagram"><span className="text-[11px] font-semibold">IG</span></a>
            <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noreferrer" aria-label="EUREKA on LinkedIn"><span className="text-[11px] font-semibold">in</span></a>
            <a href={`mailto:${SITE_CONFIG.contactEmail}`} aria-label={`Email ${SITE_CONFIG.contactEmail}`}><span className="text-[11px] font-semibold">MAIL</span></a>
          </div>
        </div>
        <div className="footer-bottomline">
          <span>© 2026 EUREKA &apos;26 · Department of EEE, RVCE</span>
          <a href={`tel:${SITE_CONFIG.contactPhone.split(" /")[0]}`}>{SITE_CONFIG.contactPhone}</a>
          <button onClick={handleScrollTop} onMouseEnter={playHoverSound} className="inline-flex items-center gap-1.5 text-[#ded6c4] transition-colors hover:text-white"><span>Back to top</span><ArrowUp className="h-3.5 w-3.5" /></button>
        </div>
      </div>
    </footer>
  );
}
