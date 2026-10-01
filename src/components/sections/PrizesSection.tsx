"use client";

import React from "react";
import { Trophy, Award, Sparkles, Rocket, Gift, CheckCircle, Flame, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playHoverSound } from "@/utils/audio";

const MAIN_PRIZES = [
  {
    rank: "2nd",
    title: "1st Runner Up",
    amount: "₹25,000",
    badge: "Silver Honors",
    trophyColor: "text-slate-300",
    borderColor: "border-white/20",
    glowColor: "rgba(148, 163, 184, 0.2)",
    perks: [
      "₹25,000 Direct Cash Prize",
      "Silver Trophy & Laurels",
      "All-India Merit Certificate",
      "Fast-track Incubator Connect",
    ],
    orderClass: "order-2 lg:order-1",
  },
  {
    rank: "1st",
    title: "Grand Champion",
    amount: "₹40,000",
    badge: "National Victor",
    trophyColor: "text-amber-400",
    borderColor: "border-amber-400/50",
    glowColor: "rgba(251, 191, 36, 0.3)",
    perks: [
      "₹40,000 Grand Cash Grant",
      "EUREKA '26 Rolling Championship Trophy",
      "RVCE Innovation Incubation Fast-Track",
      "Industry Mentorship & Fellowship Offers",
      "VC & Seed Stage Investor Pitch Opportunity",
    ],
    orderClass: "order-1 lg:order-2 lg:-translate-y-4",
    highlight: true,
  },
  {
    rank: "3rd",
    title: "2nd Runner Up",
    amount: "₹15,000",
    badge: "Bronze Honors",
    trophyColor: "text-amber-600",
    borderColor: "border-amber-700/30",
    glowColor: "rgba(217, 119, 6, 0.2)",
    perks: [
      "₹15,000 Direct Cash Prize",
      "Bronze Trophy & Merit Certificates",
      "Hardware Component Sandbox Credits",
      "Networking with R&D Leaders",
    ],
    orderClass: "order-3 lg:order-3",
  },
];

const TRACK_PRIZES = [
  { name: "Smart Mobility & EVs", prize: "₹15,000", icon: "⚡" },
  { name: "Clean Energy & Smart Grid", prize: "₹15,000", icon: "🌱" },
  { name: "AIoT & Edge Intelligence", prize: "₹15,000", icon: "🤖" },
  { name: "Biomedical & Assistive Tech", prize: "₹15,000", icon: "🏥" },
  { name: "Open Hardware & DeepTech", prize: "₹15,000", icon: "🚀" },
];

const SPECIAL_AWARDS = [
  {
    title: "Best All-Women Team",
    amount: "₹5,000",
    desc: "Empowering female hardware engineers and deep-tech inventors.",
  },
  {
    title: "Best Freshman Prototype",
    amount: "₹5,000",
    desc: "Honoring 1st & 2nd year engineering innovators exhibiting hardware excellence.",
  },
  {
    title: "Best Hardware Craftsmanship",
    amount: "₹5,000",
    desc: "Awarded for exceptional PCB design, thermal layout & industrial housing.",
  },
];

export function PrizesSection() {
  const triggerConfetti = () => {
    playClickSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD166", "#00F0FF", "#10B981", "#FFFFFF"],
    });
  };

  return (
    <section id="prizes" className="relative w-full py-24 bg-[#050508] border-t border-white/[0.08] overflow-hidden text-white">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            onClick={triggerConfetti}
            onMouseEnter={playHoverSound}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>₹1,00,000+ TOTAL PRIZE POOL (CLICK FOR CONFETTI)</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl mb-4">
            Substantial Grants.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              National Recognition.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
            Direct cash prizes awarded to the top overall champions, individual track victors (₹15,000 per track), and special category innovators.
          </p>
        </div>

        {/* Podium Grid (1st, 2nd, 3rd) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {MAIN_PRIZES.map((card) => (
            <div
              key={card.rank}
              onMouseEnter={playHoverSound}
              className={`relative rounded-3xl p-8 sm:p-10 border ${card.borderColor} bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between shadow-2xl transition-all duration-300 hover:translate-y-[-4px] ${card.orderClass} ${
                card.highlight ? "bg-amber-500/[0.04] ring-1 ring-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.15)]" : ""
              }`}
            >
              {card.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[11px] font-mono font-black uppercase tracking-wider shadow-md">
                  GRAND CHAMPION
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    {card.badge}
                  </span>
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${card.trophyColor}`}>
                    <Trophy className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  {card.title}
                </h3>

                <div className="font-display text-4xl sm:text-5xl font-black text-amber-300 font-mono tracking-tight mb-6">
                  {card.amount}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                  {card.perks.map((perk) => (
                    <div key={perk} className="flex items-start gap-2.5 text-xs sm:text-sm font-normal text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-center font-mono text-xs text-slate-300 font-semibold">
                RANK {card.rank} ALL-INDIA
              </div>
            </div>
          ))}
        </div>

        {/* 5 Track Winners Prize Showcase (₹15,000 Each) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 mb-12 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>5 × TRACK WINNER AWARDS</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                ₹15,000 Winner Prize For Each of the 5 Tracks
              </h3>
            </div>
            <div className="font-mono text-sm text-slate-400">
              ₹75,000 Total Track Pool
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TRACK_PRIZES.map((tp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl mb-2 block">{tp.icon}</span>
                  <div className="font-display font-bold text-sm text-white mb-1">
                    {tp.name}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Track 0{idx + 1}</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">{tp.prize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Category Awards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SPECIAL_AWARDS.map((award, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">SPECIAL RECOGNITION</span>
                  <Star className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="font-display font-bold text-lg text-white mb-1">{award.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{award.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-base font-bold text-amber-300">
                {award.amount} Cash Award
              </div>
            </div>
          ))}
        </div>

        {/* All Participants Swag & Certificate Callout */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 hidden sm:block">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">
                For All 500+ Qualified Participants
              </div>
              <div className="text-xs text-slate-400">
                Official RVCE EEE Delegate Kits • Printed Certificates • High-Tea &amp; Networking Lunch • ₹50k+ Cloud Sandbox Credits
              </div>
            </div>
          </div>
          <button
            onClick={triggerConfetti}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
          >
            Celebrate 🎉
          </button>
        </div>

      </div>
    </section>
  );
}
