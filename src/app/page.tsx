"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MainExperience } from "@/components/sections/MainExperience";
import { TeamSection } from "@/components/sections/TeamSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      {/* Sticky/Fixed Minimalist Navigation */}
      <Navbar />

      {/* 5-Slide Experience with Single Persistent Sticky Robot */}
      <MainExperience />

      {/* Secondary Clean Sections (Strict 1 Headline + 1 Supporting Line Rule) */}
      <TeamSection />
      <SponsorsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
