"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Cpu, MapPin, MoveUpRight, SunMedium, Workflow } from "lucide-react";
import { EurekaLogo } from "@/components/ui/EurekaLogo";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { TRACKS, SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

const trackAccents = ["#a47d45", "#a47d45", "#a47d45", "#a47d45", "#a47d45"];
const trackIcons = [Cpu, Workflow, SunMedium, Activity, Cpu];

export function MainExperience() {
  const { scrollTo } = useSmoothScroll();

  return (
    <div className="eureka-site overflow-hidden">
      <section id="hero" className="hero-stage relative isolate flex min-h-[min(900px,100svh)] items-center px-5 pb-12 pt-24 text-white sm:px-8 sm:pt-28 lg:min-h-[min(880px,100svh)] lg:px-12">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 xl:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <motion.p initial="hidden" animate="visible" variants={reveal} className="section-kicker mb-4 justify-center text-[#e9c98e] lg:justify-start">
              RV College of Engineering · Department of EEE
            </motion.p>
            <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="mx-auto max-w-[12ch] font-display text-[clamp(2.5rem,7vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#f7f3ea] lg:mx-0">
              National<br className="hidden sm:block" /> Project Expo
            </motion.h1>
            <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.16 }} className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#c8c3b7] lg:justify-start">
              <span className="font-medium text-[#edcf98]">28 November 2026</span>
              <span className="hidden h-1 w-1 rounded-full bg-[#9a835d] sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" /> RVCE, Bengaluru</span>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }} className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href={UNSTOP_EVENT_URL} target="_blank" rel="noopener noreferrer" onClick={playClickSound} onMouseEnter={playHoverSound} className="button-primary min-h-12 justify-center">
                Register on Unstop <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <button onClick={() => { playClickSound(); scrollTo("#expo-intro", { offset: -70 }); }} className="button-outline min-h-12 justify-center">
                Discover the expo <ArrowDownRight size={16} aria-hidden="true" />
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="order-1 mx-auto w-full max-w-[min(76vw,38svh,390px)] lg:order-2 lg:max-w-[min(42vw,510px)]">
            <div className="logo-plinth relative aspect-square overflow-hidden">
              <EurekaLogo className="eureka-logo-art" />
            </div>
          </motion.div>
        </div>
        <button onClick={() => { playClickSound(); scrollTo("#expo-intro", { offset: -70 }); }} className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45 transition-colors hover:text-white sm:flex" aria-label="Scroll to event information">
          Scroll to explore <span className="h-px w-8 bg-[#b9955c]" />
        </button>
      </section>

      <section id="expo-intro" className="overview-section paper-section relative isolate px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="overview-motif pointer-events-none absolute right-[-12rem] top-[-10rem] hidden h-[34rem] w-[34rem] lg:block" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={reveal}>
            <p className="section-kicker">01 / The gathering</p>
            <h2 className="editorial-heading mt-4 max-w-[14ch]">A national exhibition of student projects.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5f625e] sm:text-lg sm:leading-8">
              EUREKA ’26 brings student engineering projects together for a national exhibition at RV College of Engineering, Bengaluru.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="fact-chip"><span className="fact-label">DATE</span><span>28 Nov 2026</span></div>
              <div className="fact-chip"><span className="fact-label">VENUE</span><span>RVCE Campus, Bengaluru</span></div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={reveal} transition={{ delay: 0.1 }} className="countdown-panel">
            <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4">
              <div><p className="section-kicker text-[#e5c58d]">The date is set</p><h3 className="mt-1 text-xl font-medium text-[#f4f0e7] sm:text-2xl">Until doors open</h3></div>
              <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#d3b982]/45 text-[#e8c987] sm:flex"><ArrowDownRight size={17} /></span>
            </div>
            <div className="pt-5"><CountdownTimer /></div>
          </motion.div>
        </div>
      </section>

      <section id="prizes" className="prize-section relative isolate overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="prize-geometry absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={reveal}>
            <p className="section-kicker text-[#e5c58d]">02 / Incentives</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#c6c5c0] sm:text-base">Mentorship, industry connect, certificates and goodies accompany the event prize pool.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={reveal} transition={{ delay: 0.1 }} className="prize-amount-wrap">
            <span className="prize-amount">₹15,000</span>
            <span className="prize-total-label">Total prize pool</span>
          </motion.div>
          <div className="lg:col-span-2 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-sm text-[#dedbd2] sm:gap-x-10">
            <span>Mentorship</span><span className="text-[#b9955c]">/</span><span>Industry connect</span><span className="text-[#b9955c]">/</span><span>Certificates &amp; goodies</span>
            <Link href="#tracks" onClick={() => playClickSound()} className="ml-auto inline-flex items-center gap-2 font-medium text-[#f0d49f] hover:text-white">Meet the tracks <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section id="tracks" className="track-section paper-section relative isolate px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
            <div><p className="section-kicker">03 / Expo tracks</p><h2 className="editorial-heading mt-3">Explore the five tracks.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-[#666963]">Explore the disciplines represented at EUREKA ’26. Every track has its own set of engineering questions.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {TRACKS.map((track, index) => (
              <motion.div key={track.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <Link href={`/tracks/${track.id}`} onClick={playClickSound} onMouseEnter={playHoverSound} className="track-panel group flex h-full min-h-[250px] flex-col" style={{ "--track-accent": trackAccents[index] } as CSSProperties}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="track-number">{track.number}</span>
                    {(() => { const TrackIcon = trackIcons[index]; return <span className="track-icon-frame"><TrackIcon className="track-icon" size={18} strokeWidth={1.6} aria-hidden="true" /></span>; })()}
                  </div>
                  <h3 className="mt-7 max-w-[20ch] text-xl font-semibold leading-snug tracking-[-0.025em] text-[#202522] sm:text-[1.35rem]">{track.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#686b65]">{track.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#484b46] transition-colors group-hover:text-[var(--track-accent)]">Explore track <MoveUpRight size={14} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="register-section px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[1.75rem] bg-[#e8e3d7] p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:gap-12 lg:p-12">
          <div><p className="section-kicker">04 / Join the exhibition</p><h2 className="editorial-heading mt-3 max-w-[13ch]">Bring your project to EUREKA.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#60635e]">{SITE_CONFIG.registration.eligibility}.</p></div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch">
            <div className="registration-facts"><span><small>TEAM</small>2–4 members</span><span><small>FEE</small>{SITE_CONFIG.registration.fee}</span><span><small>DEADLINE</small>{SITE_CONFIG.registration.deadline}</span></div>
            <a href={UNSTOP_EVENT_URL} target="_blank" rel="noopener noreferrer" onClick={playClickSound} onMouseEnter={playHoverSound} className="button-primary min-h-12 justify-center">Register on Unstop <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
