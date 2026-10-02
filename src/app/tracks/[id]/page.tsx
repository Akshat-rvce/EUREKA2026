import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Trophy, Cpu, HelpCircle } from "lucide-react";
import { TRACKS, UNSTOP_EVENT_URL } from "@/config/site";

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

export default async function TrackDetailPage({ params }: TrackPageProps) {
  const { id } = await params;
  const track = TRACKS.find((t) => t.id === id);

  if (!track) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black py-16 px-6 sm:px-12 flex flex-col justify-between">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none cyber-grid opacity-15" />
      <div className="fixed top-1/4 right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-white/10">
          <Link
            href="/#tracks"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO TRACKS</span>
          </Link>

          <span className="font-mono text-xs text-slate-500">
            TRACK {track.number} OF 05
          </span>
        </div>

        {/* Track Title & Tagline */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-mono mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>{track.prizePool}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
            {track.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl">
            {track.tagline}
          </p>
        </div>

        {/* Scope Overview */}
        <div className="mb-12 p-8 rounded-3xl bg-white/[0.02] border border-white/10">
          <h2 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>TRACK DOMAIN &amp; OVERVIEW</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            {track.description}
          </p>
        </div>

        {/* Problem Statements */}
        <div className="mb-12">
          <h2 className="text-xs uppercase font-mono tracking-widest text-amber-300 mb-4">
            CHALLENGE STATEMENTS
          </h2>
          <div className="space-y-3">
            {track.problemStatements.map((statement, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4"
              >
                <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-amber-400/10 text-amber-400">
                  0{idx + 1}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Stack */}
        <div className="mb-12">
          <h2 className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>RECOMMENDED HARDWARE &amp; SENSOR STACK</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {track.hardwareStack.map((hw) => (
              <span
                key={hw}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
              >
                {hw}
              </span>
            ))}
          </div>
        </div>

        {/* Evaluation Rubrics */}
        <div className="mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-4">
            EVALUATION WEIGHTAGE
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {track.evaluationCriteria.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center"
              >
                <div className="font-mono font-bold text-xl text-emerald-400">
                  {c.weight}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {c.criteria}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="font-display font-bold text-lg text-white">
              Ready to submit your prototype?
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Team size 2–4 members · Registration on Unstop
            </div>
          </div>

          <a
            href={UNSTOP_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-200 text-black font-display font-bold text-sm shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>Register on Unstop</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="max-w-4xl mx-auto w-full pt-8 border-t border-white/10 text-center text-xs font-mono text-slate-600">
        EUREKA &apos;26 • Dept. of EEE, RVCE Bangalore
      </footer>
    </main>
  );
}
