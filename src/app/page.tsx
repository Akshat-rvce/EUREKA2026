"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MainExperience } from "@/components/sections/MainExperience";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      {/* Sticky/Fixed Minimalist Navigation */}
      <Navbar />

      {/* Main Experience: Hero alongside 3D Robot, Live Timer, Prizes, Tracks, Register */}
      <MainExperience />

      {/* Secondary Clean Sections: FAQ & Footer */}
      <FaqSection />
      <Footer />
    </main>
  );
}
