import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Cpu,
  Layers3,
  Sparkles,
  SunMedium,
  Trophy,
  Zap,
  Activity,
} from "lucide-react";
import { TRACKS, SITE_CONFIG, UNSTOP_EVENT_URL } from "@/config/site";

interface TrackPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TRACKS.map((track) => ({ id: track.id }));
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { id } = await params;
  const track = TRACKS.find((item) => item.id === id);
  if (!track) return { title: "Track Not Found | EUREKA ’26 National Project Expo" };

  const title = `${track.title} | EUREKA ’26 National Project Expo · RVCE`;
  const description = `${track.title} is one of five project domains at EUREKA ’26, the National Project Expo at RV College of Engineering, Bengaluru. ${track.tagline}`;
  return { title, description, openGraph: { title, description } };
}

const ICON_MAP = { Cpu, SunMedium, Zap, Activity, Sparkles };

export default async function TrackDetailPage({ params }: TrackPageProps) {
  const { id } = await params;
  const track = TRACKS.find((item) => item.id === id);
  if (!track) notFound();

  const Icon = ICON_MAP[track.iconName as keyof typeof ICON_MAP] ?? Layers3;
  const otherTracks = TRACKS.filter((item) => item.id !== track.id);

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <section className="relative isolate overflow-hidden bg-[#0d1112] text-[#f3efe6]">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-10 -z-10 h-[32rem] w-[32rem] rounded-full opacity-20 blur-[120px]"
          style={{ background: track.accentColor }}
        />
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-8 sm:pb-20 lg:px-12">
          <nav aria-label="Track navigation" className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <Link href="/#tracks" className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[.13em] text-white/65 transition hover:text-white">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <span>All expo tracks</span>
            </Link>
            <ol className="flex items-center gap-1.5" aria-label="Choose a track">
              {TRACKS.map((item) => {
                const isActive = item.id === track.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/tracks/${item.id}`}
                      aria-label={`Track ${item.number}: ${item.title}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex h-9 min-w-9 items-center justify-center border px-2 text-xs font-semibold tabular-nums transition ${isActive ? "border-[#d8bd87] bg-[#d8bd87] text-[#171b1c]" : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"}`}
                    >
                      {item.number}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="grid items-center gap-10 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:pt-20">
            <div className="max-w-4xl">
              <p className="section-kicker mb-6" style={{ color: "#e9c98e" }}>EUREKA ’26 · National Project Expo</p>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="border border-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-white/75">Track {track.number} of 05</span>
                <span className="inline-flex items-center gap-2 border border-[#c9a66c]/35 bg-[#c9a66c]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.13em] text-[#e8d4ac]">
                  <Trophy aria-hidden="true" className="h-3.5 w-3.5" />
                  ₹15,000 total event prize pool
                </span>
              </div>
              <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-[-.045em] text-[#f4f0e7] sm:text-6xl lg:text-7xl">
                {track.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">{track.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {track.tags.map((tag) => (
                  <span key={tag} className="border border-white/15 bg-white/[.035] px-3 py-1.5 text-xs text-white/75">{tag}</span>
                ))}
              </div>
              <a href="#track-overview" className="mt-9 inline-flex min-h-11 items-center gap-2 border-b border-[#c9a66c]/60 pb-1 text-sm font-semibold text-[#e8d4ac] transition hover:border-[#e8d4ac]">
                Explore this track <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <div className="hidden justify-self-end lg:block" aria-hidden="true">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#c9a66c]/25">
                <div className="absolute inset-4 rounded-full border border-white/10" />
                <div className="absolute inset-10 rounded-full border border-white/[.07]" />
                <Icon className="h-16 w-16 text-[#e8d4ac]" strokeWidth={1} />
                <span className="absolute -bottom-3 bg-[#0d1112] px-4 font-display text-5xl text-white/20">{track.number}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="track-overview" className="paper-section scroll-mt-8 border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="section-kicker mb-5">Track {track.number} · Overview</p>
              <h2 className="editorial-heading max-w-md">A field of questions worth solving.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#5d625d]">
                Bring a project that makes a clear connection between an engineering idea and a real need. The scope is open within this domain; the examples below are starting points, not a prescribed brief.
              </p>
            </div>
            <div className="border-l-2 border-[#c9a66c] pl-6 sm:pl-9">
              <p className="font-display text-xl leading-relaxed text-[#303633] sm:text-2xl">{track.description}</p>
              <div className="mt-8 flex items-start gap-3 border-t border-[var(--line)] pt-5 text-sm leading-relaxed text-[#555b56]">
                <Sparkles aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#a77d3d]" />
                <p>Use your own problem statement and approach. The technologies listed below are examples to help you explore the domain.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[var(--line)] pt-7">
            <p className="fact-label mb-4">Areas connected to this track</p>
            <div className="flex flex-wrap gap-2">
              {track.tags.map((tag, index) => (
                <span key={tag} className={`border px-3 py-2 text-sm ${index === 0 ? "border-[#c9a66c]/60 bg-white/65 text-[#302d26]" : "border-[var(--line)] text-[#505650]"}`}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e5db]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="section-kicker mb-5">Reference points</p>
              <h2 className="font-display text-3xl font-medium tracking-[-.035em] text-[#1b2020] sm:text-4xl">Tools and technologies</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5d625d]">
                These are examples associated with this field, not required equipment. Choose the tools that fit your project and explain why they are right for it.
              </p>
              <div className="mt-7 grid gap-2 sm:grid-cols-2">
                {track.hardwareStack.map((item, index) => (
                  <div key={item} className="flex min-h-14 items-center gap-3 border border-[#d5d1c6] bg-white/50 px-4 py-3 text-sm text-[#343a36]">
                    <span className="font-display text-sm text-[#a77d3d]">{String(index + 1).padStart(2, "0")}</span>{item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="section-kicker mb-5">Evaluation framework</p>
              <h2 className="font-display text-3xl font-medium tracking-[-.035em] text-[#1b2020] sm:text-4xl">What a strong project can show</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5d625d]">
                The track information highlights these dimensions. Use them to explain your design decisions, demonstrate what works, and describe the impact.
              </p>
              <div className="mt-7 divide-y divide-[#d5d1c6] border-y border-[#d5d1c6]">
                {track.evaluationCriteria.map((criterion) => (
                  <div key={criterion.criteria} className="flex items-center justify-between gap-5 py-4">
                    <span className="text-sm leading-snug text-[#343a36]">{criterion.criteria}</span>
                    <span className="shrink-0 font-display text-2xl text-[#a77d3d]">{criterion.weight}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#73766e]">
                <Award aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#a77d3d]" />
                <p>These weights are shown in the track guide. Check the event’s registration page for the latest participation details.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#171c1d] text-[#f3efe6]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker mb-4" style={{ color: "#e5c58d" }}>Take the next step</p>
              <h2 className="font-display text-3xl font-medium tracking-[-.035em] sm:text-4xl">Bring your project to EUREKA.</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{SITE_CONFIG.registration.teamSize} · {SITE_CONFIG.registration.fee} · {SITE_CONFIG.date} · RVCE, Bengaluru</p>
              <p className="mt-2 text-xs text-white/45">The ₹15,000 prize pool is for the event as a whole.</p>
            </div>
            <a href={UNSTOP_EVENT_URL} target="_blank" rel="noopener noreferrer" className="button-primary w-fit">
              Register on Unstop <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker mb-3">Continue exploring</p>
              <h2 className="font-display text-2xl font-medium text-[#1b2020] sm:text-3xl">More expo tracks</h2>
            </div>
            <Link href="/#tracks" className="hidden items-center gap-2 text-sm font-semibold text-[#76603d] hover:text-[#1b2020] sm:inline-flex">
              All tracks <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherTracks.map((item) => (
              <Link key={item.id} href={`/tracks/${item.id}`} className="group flex min-h-36 flex-col justify-between border border-[var(--line)] bg-white/45 p-5 transition hover:-translate-y-0.5 hover:border-[#b7ad99] hover:bg-white/75">
                <span className="font-display text-xl text-[#a77d3d]">{item.number}</span>
                <span className="mt-4 flex items-end justify-between gap-3 text-sm font-semibold leading-snug text-[#343a36] group-hover:text-[#111514]">
                  {item.title}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#a77d3d] transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-[var(--paper)] px-5 py-6 text-center text-xs text-[#73766e] sm:px-8">
        EUREKA ’26 · Dept. of Electrical &amp; Electronics Engineering · RV College of Engineering
      </footer>
    </main>
  );
}
