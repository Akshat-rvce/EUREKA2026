"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Sparkles, Rocket, Gift, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { playHoverSound } from "@/utils/audio";

const PRIZE_CARDS = [
  {
    rank: "2nd",
    title: "1st Runner Up",
    amount: "₹25,000",
    badge: "Silver Honors",
    trophyColor: "text-slate-300",
    borderColor: "border-slate-400/30",
    bgGradient: "from-slate-500/15 via-purple-950/40 to-slate-950/80",
    glowColor: "#94a3b8",
    perks: ["₹25,000 Direct Cash Prize", "Silver Laurels Trophy", "Merit Certificates", "Direct Tech Network Access"],
    orderClass: "order-2 lg:order-1",
  },
  {
    rank: "1st",
    title: "Grand Champion",
    amount: "₹40,000",
    badge: "National Victor",
    trophyColor: "text-amber-300",
    borderColor: "border-amber-300/50",
    bgGradient: "from-amber-500/20 via-purple-900/40 to-slate-950/90",
    glowColor: "#FFD166",
    perks: [
      "₹40,000 Grand Cash Grant",
      "EUREKA '26 Rolling Trophy",
      "RVCE Innovation Incubation Fast-Track",
      "National Media Feature & VC Connect",
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
    bgGradient: "from-amber-800/15 via-purple-950/40 to-slate-950/80",
    glowColor: "#d97706",
    perks: ["₹15,000 Direct Cash Prize", "Bronze Trophy", "Merit Certificates", "Hardware Sandbox Credits"],
    orderClass: "order-3 lg:order-3",
  },
];

const ADDITIONAL_PERKS = [
  {
    icon: Rocket,
    title: "RVCE Incubation Fellowship",
    desc: "Top hardware teams receive pre-incubation mentorship & lab access at RVCE.",
  },
  {
    icon: Sparkles,
    title: "₹20,000 in Track Awards",
    desc: "4 × ₹5,000 specialized honors for Best Female Founder, Best Green Tech, Best Hardware.",
  },
  {
    icon: Gift,
    title: "Delegate Kits & Swag",
    desc: "Premium EUREKA '26 tech merchandise, printed certificates & meal coupons.",
  },
];

export function PrizesSection() {
  return (
    <section id="prizes" className="relative w-full py-24 bg-[#080414] border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>REWARDS & RECOGNITION</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl mb-4">
            ₹1,00,000+ in <span className="text-gradient-gold">Cash & Grants</span>
          </h2>
          <p className="text-sm md:text-base text-purple-200/70 font-body max-w-xl">
            Celebrating breakthrough hardware prototypes and visionary engineering talent with substantial cash rewards and venture pathways.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {PRIZE_CARDS.map((card) => (
            <motion.div
              key={card.rank}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={playHoverSound}
              className={`relative rounded-3xl p-8 md:p-10 border ${card.borderColor} bg-gradient-to-b ${card.bgGradient} backdrop-blur-xl flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${card.orderClass} ${
                card.highlight ? "ring-2 ring-amber-300/50 shadow-[0_0_40px_rgba(255,209,102,0.25)]" : ""
              }`}
            >
              {card.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black text-[11px] font-mono font-black uppercase tracking-wider shadow-[0_0_15px_#FFD166]">
                  GRAND WINNER
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-purple-300/80">
                    {card.badge}
                  </span>
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${card.trophyColor}`}>
                    <Trophy className="w-7 h-7" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {card.title}
                </h3>

                <div className="font-display text-5xl md:text-6xl font-black text-amber-300 font-mono tracking-tight mb-8">
                  {card.amount}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                  {card.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2.5 text-sm font-body text-purple-100">
                      <CheckCircle className="w-4 h-4 text-teal-300 flex-shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-center font-mono text-xs text-purple-200">
                RANK {card.rank} ALL-INDIA
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Distinction Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ADDITIONAL_PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="p-6 rounded-2xl glass-panel border border-white/10 flex items-start gap-4 hover:border-amber-300/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-purple-900/40 text-amber-300 border border-purple-400/20 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base mb-1">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-purple-200/70 font-body leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
