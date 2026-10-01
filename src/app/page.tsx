"use client";

import React, { useState } from "react";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutNarrativeSection } from "@/components/sections/AboutNarrativeSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { PrizesSection } from "@/components/sections/PrizesSection";
import { RegisterSection } from "@/components/sections/RegisterSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-hidden">
      {/* Cinematic Intro Loader */}
      <IntroLoader onComplete={() => setIntroFinished(true)} />

      {/* Main Experience */}
      <Navbar />
      <HeroSection />
      <AboutNarrativeSection />
      <TracksSection />
      <TimelineSection />
      <PrizesSection />
      <RegisterSection />
      <SponsorsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
