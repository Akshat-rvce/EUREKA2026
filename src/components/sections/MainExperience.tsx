"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Cpu, Lightbulb, MapPin, SunMedium, Zap, Award, Users, Trophy } from "lucide-react";
import { EurekaLogo } from "@/components/ui/EurekaLogo";
import { HeroWorkshopArt } from "@/components/sections/HeroWorkshopArt";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { TRACKS, SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { playClickSound, playHoverSound } from "@/utils/audio";

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

const trackAccents = ["#a47d45", "#a47d45", "#a47d45", "#a47d45", "#a47d45"];
const trackIcons = [Cpu, SunMedium, Zap, Activity, Lightbulb];

export function MainExperience() {
  const { scrollTo } = useSmoothScroll();

  return (
    <div className="eureka-site overflow-hidden">
      <section id="hero" className="hero-stage relative isolate flex min-h-[min(940px,100svh)] flex-col items-center overflow-hidden px-5 pb-64 pt-24 text-center text-white sm:px-8 sm:pb-72 sm:pt-28 lg:min-h-[900px] lg:pb-72 lg:pt-28">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
        <div className="hero-orbit absolute left-1/2 top-[5.5rem] -z-10 h-[23rem] w-[23rem] -translate-x-1/2 rounded-full sm:top-24 sm:h-[34rem] sm:w-[34rem] lg:h-[39rem] lg:w-[39rem]" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .08, ease: [.16, 1, .3, 1] }} className="w-full max-w-[min(61vw,34svh,330px)] sm:max-w-[min(40vw,410px)]">
            <div className="logo-plinth relative aspect-square overflow-hidden">
              <EurekaLogo className="eureka-logo-art" />
            </div>
          </motion.div>
          <motion.p initial="hidden" animate="visible" variants={reveal} className="section-kicker mt-1 justify-center text-[#e9c98e]">
            RV College of Engineering · Department of EEE
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.08 }} className="mt-3 max-w-[12ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#f7f3ea]">
            National Project Expo
          </motion.h1>
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.16 }} className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#c8c3b7]">
            <span className="inline-flex items-center gap-2 font-medium text-[#edcf98]"><span className="hero-meta-icon">28</span>28 November 2026</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#9a835d] sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" /> RVCE, Bengaluru</span>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.24 }} className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a href={UNSTOP_EVENT_URL} target="_blank" rel="noopener noreferrer" onClick={playClickSound} onMouseEnter={playHoverSound} className="button-primary min-h-12 justify-center">
                Register on Unstop <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <button onClick={() => { playClickSound(); scrollTo("#expo-intro", { offset: -70 }); }} className="button-outline min-h-12 justify-center">
                Discover the expo <ArrowDownRight size={16} aria-hidden="true" />
              </button>
          </motion.div>
        </div>
        <div className="hero-art-wrap pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[250px] sm:h-[315px] lg:h-[365px]"><HeroWorkshopArt /></div>
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
        <div className="prize-medallion pointer-events-none absolute bottom-[-8rem] right-[4%] -z-10 h-[27rem] w-[27rem] rounded-full" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={reveal}>
            <p className="section-kicker text-[#e5c58d]">02 / Incentives</p>
            <h2 className="editorial-heading mt-4 max-w-[11ch] text-[#f5f0e4]">Good work deserves a stage.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#c6c5c0] sm:text-base">Mentorship, industry connect, certificates and goodies accompany the event prize pool.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={reveal} transition={{ delay: 0.1 }} className="prize-showcase">
            <div className="prize-cup" aria-hidden="true"><Trophy size={74} strokeWidth={1.1} /></div>
            <div className="prize-amount-wrap">
              <span className="prize-amount">₹15,000</span>
              <span className="prize-total-label">Total prize pool</span>
            </div>
          </motion.div>
          <div className="prize-benefits lg:col-span-2">
            <span><Trophy size={21} aria-hidden="true" /><b>Cash prizes</b><small>For shortlisted projects</small></span>
            <span><Award size={21} aria-hidden="true" /><b>Certificates &amp; goodies</b><small>For every participant</small></span>
            <span><Users size={21} aria-hidden="true" /><b>Industry interaction</b><small>Mentorship opportunities</small></span>
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
                <Link href={`/tracks/${track.id}`} onClick={playClickSound} onMouseEnter={playHoverSound} className="track-panel group flex h-full min-h-[194px] flex-col" style={{ "--track-accent": trackAccents[index] } as CSSProperties}>
                  <div className="track-card-top"><span className="track-number">{track.number}</span><span className="track-icon-frame">{(() => { const TrackIcon = trackIcons[index]; return <TrackIcon className="track-icon" size={25} strokeWidth={1.45} aria-hidden="true" />; })()}</span><span className="track-arrow"><ArrowUpRight size={16} aria-hidden="true" /></span></div>
                  <h3 className="mt-4 max-w-[23ch] text-lg font-semibold leading-snug tracking-[-0.025em] text-[#202522] sm:text-xl">{track.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#686b65]">{track.description}</p>
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
