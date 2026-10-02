import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Trophy,
  Cpu,
  Layers,
  Award,
  Sparkles,
  Zap,
  SunMedium,
  Activity,
  CheckCircle2,
  ChevronRight,
  Compass,
} from "lucide-react";
import { TRACKS, SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";

interface TrackPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TRACKS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { id } = await params;
  const track = TRACKS.find((t) => t.id === id);
  if (!track) return { title: "Track Not Found | EUREKA '26" };

  return {
    title: `${track.title} — EUREKA '26 RVCE`,
    description: track.tagline,
    openGraph: {
      title: `${track.title} — EUREKA '26 RVCE`,
      description: track.tagline,
    },
  };
}

// Map track icon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  Cpu,
  SunMedium,
  Zap,
  Activity,
  Sparkles,
};

export default async function TrackDetailPage({ params }: TrackPageProps) {
  const { id } = await params;
  const track = TRACKS.find((t) => t.id === id);

  if (!track) {
    notFound();
  }

  const IconComponent = ICON_MAP[track.iconName] || Sparkles;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black py-12 sm:py-16 px-4 sm:px-8 lg:px-12 flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none cyber-grid opacity-20" />
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-20"
        style={{ background: track.accentColor }}
      />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Top Navigation Bar */}
        <div className="w-full flex items-center justify-between pb-6 mb-10 border-b border-white/10">
          <Link
            href="/#tracks"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL TRACKS</span>
          </Link>

          {/* Quick Track Switcher Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {TRACKS.map((t) => {
              const isActive = t.id === track.id;
              return (
                <Link
                  key={t.id}
                  href={`/tracks/${t.id}`}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isActive
                      ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      : "bg-white/5 text-slate-400 hover:bg-white/15 hover:text-white border border-white/10"
                  }`}
                  title={t.title}
                >
                  {t.number}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            CENTERED HERO SECTION
        ============================================================ */}
        <div className="text-center flex flex-col items-center mb-12 w-full">
          {/* Eyebrow / Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: track.accentColor }}
              />
              TRACK {track.number} OF 05
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>₹15,000 Track Winner Prize</span>
            </span>
          </div>

          {/* Track Icon Circle */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border shadow-2xl backdrop-blur-sm"
            style={{
              borderColor: `${track.accentColor}40`,
              backgroundColor: `${track.accentColor}10`,
              color: track.accentColor,
              boxShadow: `0 0 35px ${track.accentColor}25`,
            }}
          >
            <IconComponent className="w-8 h-8" />
          </div>

          {/* Main Title — Big, Centered */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 max-w-3xl leading-[1.08]">
            {track.title}
          </h1>

          {/* Subtitle / Domain Strip */}
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed mb-6">
            {track.tagline}
          </p>

          {/* Centered Key Domain Keywords Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
            {track.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300 hover:border-white/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ============================================================
            TRACK DOMAIN & SCOPE (Centered Card)
        ============================================================ */}
        <div className="w-full mb-10 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-10 relative overflow-hidden text-center flex flex-col items-center">
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${track.accentColor}, transparent)`,
            }}
          />

          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
            <Compass className="w-4 h-4" style={{ color: track.accentColor }} />
            <span>Track Domain &amp; Scope</span>
          </div>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
            {track.description}
          </p>

          {/* Open Challenge Note */}
          <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Open problem scope — define your challenge</span>
            </div>
            <span className="hidden sm:inline text-slate-600">·</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Working hardware prototype required</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            RECOMMENDED HARDWARE & SENSOR STACK (Centered)
        ============================================================ */}
        <div className="w-full mb-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
            <Cpu className="w-4 h-4" />
            <span>Recommended Hardware &amp; Sensor Stack</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl">
            {track.hardwareStack.map((hw) => (
              <span
                key={hw}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 shadow-sm"
              >
                {hw}
              </span>
            ))}
          </div>
        </div>

        {/* ============================================================
            EVALUATION WEIGHTAGE (Centered Grid)
        ============================================================ */}
        <div className="w-full mb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Evaluation Weightage</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            {track.evaluationCriteria.map((c, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all text-center flex flex-col items-center justify-center"
              >
                <div className="font-mono font-black text-2xl sm:text-3xl text-emerald-400 mb-1">
                  {c.weight}
                </div>
                <div className="text-xs text-slate-300 font-normal leading-snug">
                  {c.criteria}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            ACTION ROW / REGISTER CTA (Centered)
        ============================================================ */}
        <div className="w-full p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/15 text-center flex flex-col items-center justify-center mb-12 shadow-2xl">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
            Ready to exhibit your prototype?
          </h3>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mb-6">
            Team Size: 2–4 Members · Registration Fee: {SITE_CONFIG.registration.fee} · Event Date: 28 Nov 2026
          </p>

          <a
            href={UNSTOP_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full font-display font-bold text-base flex items-center gap-2.5 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #f97316 100%)",
              color: "#000",
              boxShadow: "0 0 35px rgba(245,158,11,0.45), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <span>Register on Unstop</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* ============================================================
            EXPLORE OTHER TRACKS
        ============================================================ */}
        <div className="w-full mb-10">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 text-center mb-4">
            Explore Other Tracks
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TRACKS.filter((t) => t.id !== track.id).map((otherTrack) => (
              <Link
                key={otherTrack.id}
                href={`/tracks/${otherTrack.id}`}
                className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-amber-400 transition-colors">
                    {otherTrack.number}
                  </span>
                  <span className="font-display font-medium text-sm text-slate-300 group-hover:text-white transition-colors">
                    {otherTrack.title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="max-w-4xl mx-auto w-full pt-8 border-t border-white/10 text-center text-xs font-mono text-slate-600">
        EUREKA &apos;26 • Dept. of Electrical &amp; Electronics Engineering, RVCE Bangalore
      </footer>
    </main>
  );
}
