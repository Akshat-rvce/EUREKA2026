"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  QrCode,
  Award,
  Trophy,
  UserPlus,
  LogOut,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  Upload,
  Sparkles,
  Sliders,
  Tv,
  Camera,
  Trash2,
  RefreshCw,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { AdminDataService, Team, JudgeScore, JudgeAccount } from "@/services/adminData";
import { TRACKS } from "@/config/site";
import { playClickSound, playSuccessChime, playHoverSound } from "@/utils/audio";

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"teams" | "checkin" | "judging" | "leaderboard" | "judges">("teams");

  // State Stores
  const [teams, setTeams] = useState<Team[]>([]);
  const [scores, setScores] = useState<JudgeScore[]>([]);
  const [judges, setJudges] = useState<JudgeAccount[]>([]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [leaderboardRound, setLeaderboardRound] = useState<"round1" | "round2">("round1");
  const [isProjectorMode, setIsProjectorMode] = useState(false);

  // Check-in Scanner State
  const [scanInput, setScanInput] = useState("");
  const [lastScannedTeam, setLastScannedTeam] = useState<Team | null>(null);

  // Judging Form State
  const [selectedTeamForJudging, setSelectedTeamForJudging] = useState<string>("");
  const [judgingRound, setJudgingRound] = useState<"round1" | "round2">("round1");
  const [criteria, setCriteria] = useState({
    innovation: 8,
    technicalDepth: 8,
    hardwareExecution: 8,
    marketViability: 8,
    presentation: 8,
    comments: "",
  });
  const [judgingSuccess, setJudgingSuccess] = useState(false);

  // New Judge Form State
  const [newJudgeName, setNewJudgeName] = useState("");
  const [newJudgeEmail, setNewJudgeEmail] = useState("");
  const [newJudgeTrack, setNewJudgeTrack] = useState("all");

  useEffect(() => {
    // 1. Session verification
    const sessionStr = localStorage.getItem("eureka_auth_session");
    if (!sessionStr) {
      router.push("/admin");
      return;
    }
    try {
      const parsed = JSON.parse(sessionStr);
      setCurrentUser(parsed.user);
      if (parsed.user.role === "judge") {
        setActiveTab("judging");
      }
    } catch {
      router.push("/admin");
      return;
    }

    // 2. Load data
    refreshData();
  }, [router]);

  const refreshData = () => {
    setTeams(AdminDataService.getTeams());
    setScores(AdminDataService.getScores());
    setJudges(AdminDataService.getJudges());
  };

  const handleLogout = () => {
    playClickSound();
    localStorage.removeItem("eureka_auth_session");
    document.cookie = "eureka_auth_token=; path=/; max-age=0";
    router.push("/admin");
  };

  // --- Check-in Logic ---
  const handleScanSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!scanInput.trim()) return;

    const query = scanInput.trim();
    const found = teams.find(
      (t) =>
        t.teamCode.toLowerCase() === query.toLowerCase() ||
        t.id.toLowerCase() === query.toLowerCase() ||
        t.teamName.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      const updated = AdminDataService.toggleCheckIn(found.id);
      setTeams(updated);
      const freshlyUpdated = updated.find((t) => t.id === found.id) || null;
      setLastScannedTeam(freshlyUpdated);
      playSuccessChime();
      setScanInput("");
    } else {
      playClickSound();
      alert(`No team matching "${query}" was found.`);
    }
  };

  // --- Judging Submission ---
  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamForJudging) {
      alert("Please select a team to score.");
      return;
    }

    const total =
      criteria.innovation +
      criteria.technicalDepth +
      criteria.hardwareExecution +
      criteria.marketViability +
      criteria.presentation;

    const newScore: JudgeScore = {
      teamId: selectedTeamForJudging,
      judgeId: currentUser?.id || "judge-default",
      judgeName: currentUser?.name || "Evaluating Judge",
      round: judgingRound,
      innovation: criteria.innovation,
      technicalDepth: criteria.technicalDepth,
      hardwareExecution: criteria.hardwareExecution,
      marketViability: criteria.marketViability,
      presentation: criteria.presentation,
      totalScore: total,
      comments: criteria.comments,
      timestamp: new Date().toISOString(),
    };

    const updatedScores = AdminDataService.submitScore(newScore);
    setScores(updatedScores);
    playSuccessChime();
    setJudgingSuccess(true);
    setTimeout(() => setJudgingSuccess(false), 3000);
  };

  // --- CSV Export & Import ---
  const handleExportCSV = () => {
    playClickSound();
    const headers = "Team ID,Team Code,Team Name,Project Title,Track,College,Checked In,Round 1 Qualified,Round 2 Finalist\n";
    const rows = teams
      .map(
        (t) =>
          `"${t.id}","${t.teamCode}","${t.teamName}","${t.projectTitle}","${t.trackName}","${t.college}","${t.checkedIn}","${t.round1Qualified}","${t.round2Finalist}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `EUREKA26_Teams_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Add Judge ---
  const handleAddJudge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJudgeName || !newJudgeEmail) return;

    const newJudge: JudgeAccount = {
      id: "judge-" + Date.now(),
      name: newJudgeName,
      email: newJudgeEmail,
      role: "judge",
      assignedTrack: newJudgeTrack,
    };

    const updated = AdminDataService.addJudge(newJudge);
    setJudges(updated);
    setNewJudgeName("");
    setNewJudgeEmail("");
    playSuccessChime();
  };

  // Calculate Leaderboard rankings
  const rankedTeams = teams
    .map((team) => {
      const teamScores = scores.filter((s) => s.teamId === team.id && s.round === leaderboardRound);
      const avgScore =
        teamScores.length > 0
          ? teamScores.reduce((acc, s) => acc + s.totalScore, 0) / teamScores.length
          : 0;
      return {
        ...team,
        avgScore: Number(avgScore.toFixed(1)),
        scoreCount: teamScores.length,
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teamCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.college.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrack = selectedTrack === "all" || t.trackId === selectedTrack;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className={`min-h-screen bg-[#070412] text-white ${isProjectorMode ? "p-8" : "p-6 md:p-10"} font-body select-none`}>
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 p-[1px] flex-shrink-0">
            <div className="w-full h-full bg-[#0e0824] rounded-[11px] flex items-center justify-center font-display font-black text-amber-300">
              E
            </div>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl text-white">
                EUREKA '26 Operations
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-mono border border-amber-400/20">
                {currentUser?.role === "core_team" ? "CORE ADMIN" : "JUDGE PORTAL"}
              </span>
            </div>
            <p className="text-xs font-mono text-purple-300/60 mt-0.5">
              Logged in as <span className="text-purple-100">{currentUser?.name}</span> ({currentUser?.email})
            </p>
          </div>
        </div>

        {/* Action Tabs & Logout */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {currentUser?.role === "core_team" && (
            <>
              <button
                onClick={() => { playClickSound(); setActiveTab("teams"); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  activeTab === "teams" ? "bg-purple-800/80 text-amber-300 border border-amber-300/30" : "bg-white/5 text-purple-200 hover:bg-white/10"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Teams ({teams.length})</span>
              </button>

              <button
                onClick={() => { playClickSound(); setActiveTab("checkin"); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  activeTab === "checkin" ? "bg-purple-800/80 text-amber-300 border border-amber-300/30" : "bg-white/5 text-purple-200 hover:bg-white/10"
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Check-in Desk</span>
              </button>
            </>
          )}

          <button
            onClick={() => { playClickSound(); setActiveTab("judging"); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === "judging" ? "bg-purple-800/80 text-amber-300 border border-amber-300/30" : "bg-white/5 text-purple-200 hover:bg-white/10"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Scorecard</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveTab("leaderboard"); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === "leaderboard" ? "bg-purple-800/80 text-amber-300 border border-amber-300/30" : "bg-white/5 text-purple-200 hover:bg-white/10"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Leaderboard</span>
          </button>

          {currentUser?.role === "core_team" && (
            <button
              onClick={() => { playClickSound(); setActiveTab("judges"); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === "judges" ? "bg-purple-800/80 text-amber-300 border border-amber-300/30" : "bg-white/5 text-purple-200 hover:bg-white/10"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Judges</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors ml-auto md:ml-2"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ========================================================================= */}
        {/* TAB 1: TEAMS DIRECTORY & CSV EXPORT */}
        {/* ========================================================================= */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search by team, code or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-purple-950/40 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-purple-400/40 focus:outline-none focus:border-amber-300/60"
                  />
                </div>

                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="px-3 py-2 bg-purple-950/40 border border-white/10 rounded-xl text-xs font-mono text-purple-200 focus:outline-none focus:border-amber-300/60"
                >
                  <option value="all">All 5 Tracks</option>
                  {TRACKS.map((t) => (
                    <option key={t.id} value={t.id}>
                      Track {t.number}: {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-amber-300 flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Teams Table */}
            <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-purple-950/60 text-purple-300/80 border-b border-white/10 uppercase tracking-wider">
                      <th className="py-4 px-6">Code & Team</th>
                      <th className="py-4 px-6">Project Title & Track</th>
                      <th className="py-4 px-6">College / Inst.</th>
                      <th className="py-4 px-6 text-center">Booth</th>
                      <th className="py-4 px-6 text-center">Check-in</th>
                      <th className="py-4 px-6 text-center">Round 1</th>
                      <th className="py-4 px-6 text-center">Round 2</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-purple-100">
                    {filteredTeams.map((team) => (
                      <tr key={team.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-amber-300">{team.teamCode}</div>
                          <div className="font-display font-semibold text-white text-sm">{team.teamName}</div>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <div className="text-white line-clamp-1">{team.projectTitle}</div>
                          <div className="text-teal-300 text-[11px] mt-0.5">{team.trackName}</div>
                        </td>
                        <td className="py-4 px-6 text-purple-200/80 max-w-xs truncate">
                          {team.college}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="px-2 py-1 rounded bg-purple-900/40 text-amber-300 border border-purple-400/20">
                            {team.boothNumber}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => {
                              playClickSound();
                              const updated = AdminDataService.toggleCheckIn(team.id);
                              setTeams(updated);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                              team.checkedIn
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-white/5 text-white/40 border border-white/10 hover:border-white/30"
                            }`}
                          >
                            {team.checkedIn ? `✓ In (${team.checkInTime})` : "Pending"}
                          </button>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => {
                              playClickSound();
                              const updated = AdminDataService.toggleRoundStatus(team.id, "round1");
                              setTeams(updated);
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${
                              team.round1Qualified ? "bg-teal-500/20 text-teal-300" : "bg-white/5 text-white/30"
                            }`}
                            title="Toggle Round 1 Qualification"
                          >
                            {team.round1Qualified ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          </button>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => {
                              playClickSound();
                              const updated = AdminDataService.toggleRoundStatus(team.id, "round2");
                              setTeams(updated);
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${
                              team.round2Finalist ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-white/30"
                            }`}
                            title="Toggle Top 24 Finalist Status"
                          >
                            {team.round2Finalist ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LIVE CHECK-IN DESK & QR SCANNER */}
        {/* ========================================================================= */}
        {activeTab === "checkin" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl glass-panel p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">
                      Wristband & Badge Scanner
                    </h2>
                    <p className="text-xs font-mono text-purple-300/60">
                      Scan team badge QR or type Team Code (e.g. EUR-01, EUR-02)
                    </p>
                  </div>
                </div>

                <form onSubmit={handleScanSubmit} className="space-y-4">
                  <div className="relative">
                    <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-300 animate-pulse" />
                    <input
                      type="text"
                      autoFocus
                      placeholder="Scan or enter code (e.g. EUR-01)..."
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-purple-950/50 border-2 border-amber-300/40 rounded-2xl text-base font-mono text-white placeholder-purple-400/40 focus:outline-none focus:border-amber-300 shadow-[0_0_25px_rgba(255,209,102,0.2)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 text-black font-display font-bold text-sm shadow-[0_0_20px_rgba(255,209,102,0.4)]"
                  >
                    Confirm Check-In
                  </button>
                </form>
              </div>

              {/* Quick Simulator Buttons */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10">
                <div className="text-xs font-mono text-purple-300/70 uppercase mb-3">
                  QUICK SIMULATOR (TAP TO SCAN DELEGATE)
                </div>
                <div className="flex flex-wrap gap-2">
                  {teams.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setScanInput(t.teamCode);
                        const updated = AdminDataService.toggleCheckIn(t.id);
                        setTeams(updated);
                        const freshlyUpdated = updated.find((item) => item.id === t.id) || null;
                        setLastScannedTeam(freshlyUpdated);
                        playSuccessChime();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        t.checkedIn
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-white/5 text-purple-200 border-white/10 hover:border-amber-300/40"
                      }`}
                    >
                      {t.teamCode}: {t.teamName} {t.checkedIn ? "✓" : ""}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Last Scanned Confirmation Card */}
            <div className="lg:col-span-6">
              {lastScannedTeam ? (
                <div className="rounded-3xl glass-panel-gold p-8 border-2 border-amber-300/50 shadow-[0_0_40px_rgba(255,209,102,0.2)]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
                      {lastScannedTeam.checkedIn ? "VERIFIED & CHECKED IN" : "CHECK-IN CANCELLED"}
                    </span>
                    <span className="font-mono text-xs text-purple-300/70">
                      TIME: {lastScannedTeam.checkInTime || "N/A"}
                    </span>
                  </div>

                  <div className="font-mono text-sm text-amber-300 font-bold mb-1">
                    {lastScannedTeam.teamCode} • BOOTH {lastScannedTeam.boothNumber}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {lastScannedTeam.teamName}
                  </h3>
                  <p className="text-xs font-mono text-teal-300 mb-4">
                    {lastScannedTeam.trackName}
                  </p>
                  <p className="text-sm text-purple-100 font-body mb-6">
                    {lastScannedTeam.projectTitle}
                  </p>

                  <div className="p-4 rounded-xl bg-purple-950/60 border border-white/10 space-y-2 mb-6">
                    <div className="text-xs font-mono text-purple-300/80 uppercase">
                      REGISTERED MEMBERS
                    </div>
                    {lastScannedTeam.members.map((m) => (
                      <div key={m.email} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-medium">{m.name}</span>
                        <span className="text-purple-300/60">{m.college}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-purple-300/60 text-center">
                    Kit allocated • Wristbands distributed
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl glass-panel p-12 border border-white/10 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <QrCode className="w-12 h-12 text-purple-400/40 mb-4 animate-bounce" />
                  <div className="font-display text-lg text-white font-semibold">
                    Awaiting Scan
                  </div>
                  <p className="text-xs font-mono text-purple-300/50 mt-1 max-w-xs">
                    Scan delegate QR code to verify team and allot booth stall.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: JUDGING SCORECARD */}
        {/* ========================================================================= */}
        {activeTab === "judging" && (
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl glass-panel p-8 md:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Judge Evaluation Matrix
                  </h2>
                  <p className="text-xs font-mono text-purple-300/60 mt-0.5">
                    Calibrated evaluation rubrics (1-10 Scale each)
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setJudgingRound("round1")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      judgingRound === "round1" ? "bg-amber-400 text-black font-bold" : "text-purple-300"
                    }`}
                  >
                    Round 1 (Expo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJudgingRound("round2")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      judgingRound === "round2" ? "bg-amber-400 text-black font-bold" : "text-purple-300"
                    }`}
                  >
                    Round 2 (Finals)
                  </button>
                </div>
              </div>

              {judgingSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Score submitted successfully to live database!</span>
                </div>
              )}

              <form onSubmit={handleScoreSubmit} className="space-y-6">
                {/* Team Selection */}
                <div>
                  <label className="block text-xs font-mono text-purple-300/80 uppercase mb-2">
                    SELECT PROJECT TO EVALUATE
                  </label>
                  <select
                    required
                    value={selectedTeamForJudging}
                    onChange={(e) => setSelectedTeamForJudging(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-950/60 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-300/60"
                  >
                    <option value="">-- Choose Team / Booth --</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.teamCode}: {t.teamName} — {t.projectTitle} (Booth {t.boothNumber})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rubrics Sliders */}
                <div className="space-y-5 pt-4 border-t border-white/10">
                  {[
                    { key: "innovation", label: "1. Innovation & Novelty (25%)", desc: "Uniqueness of solution, patentability, creative approach" },
                    { key: "technicalDepth", label: "2. Technical Depth & Complexity (25%)", desc: "Hardware-software integration, algorithm rigour, circuit design" },
                    { key: "hardwareExecution", label: "3. Hardware Execution & Stability (20%)", desc: "Live physical prototype demo, robustness, component selection" },
                    { key: "marketViability", label: "4. Practical Viability & Scalability (15%)", desc: "Cost-effectiveness, industrial adoption potential, environmental impact" },
                    { key: "presentation", label: "5. Presentation & Technical Defense (15%)", desc: "Clarity of pitch, handling of questions, team coordination" },
                  ].map((rubric) => (
                    <div key={rubric.key} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-bold">{rubric.label}</span>
                        <span className="text-amber-300 font-bold text-sm">
                          {(criteria as any)[rubric.key]} / 10
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-300/60">{rubric.desc}</p>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={(criteria as any)[rubric.key]}
                        onChange={(e) =>
                          setCriteria({ ...criteria, [rubric.key]: Number(e.target.value) })
                        }
                        className="w-full accent-[#FFD166] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Qualitative Feedback */}
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-xs font-mono text-purple-300/80 uppercase mb-2">
                    JUDGE'S QUALITATIVE REMARKS & STRENGTHS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter confidential feedback on hardware execution, suggestions for patenting or incubation..."
                    value={criteria.comments}
                    onChange={(e) => setCriteria({ ...criteria, comments: e.target.value })}
                    className="w-full p-4 bg-purple-950/40 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-purple-400/40 focus:outline-none focus:border-amber-300/60"
                  />
                </div>

                {/* Total Score & Submit */}
                <div className="p-4 rounded-2xl bg-purple-900/30 border border-amber-300/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-purple-300/70">AGGREGATE SCORE</div>
                    <div className="font-display text-3xl font-black text-amber-300 font-mono">
                      {criteria.innovation +
                        criteria.technicalDepth +
                        criteria.hardwareExecution +
                        criteria.marketViability +
                        criteria.presentation}{" "}
                      <span className="text-xs text-purple-300/60 font-normal">/ 50</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-black font-display font-bold text-sm shadow-[0_0_20px_rgba(255,209,102,0.4)] hover:shadow-[0_0_30px_rgba(255,209,102,0.6)] transition-all"
                  >
                    Submit Score
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LIVE LEADERBOARD & VENUE PROJECTOR MODE */}
        {/* ========================================================================= */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => { playClickSound(); setLeaderboardRound("round1"); }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      leaderboardRound === "round1" ? "bg-amber-400 text-black font-bold" : "text-purple-300"
                    }`}
                  >
                    Round 1 (Expo Top 24)
                  </button>
                  <button
                    onClick={() => { playClickSound(); setLeaderboardRound("round2"); }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      leaderboardRound === "round2" ? "bg-amber-400 text-black font-bold" : "text-purple-300"
                    }`}
                  >
                    Round 2 (Grand Finalists)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playSuccessChime();
                    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-mono flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Confetti Burst</span>
                </button>

                <button
                  onClick={() => setIsProjectorMode(!isProjectorMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all ${
                    isProjectorMode ? "bg-teal-500 text-black font-bold border-teal-400" : "bg-white/5 text-purple-200 border-white/10"
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>{isProjectorMode ? "Exit Projector Mode" : "Projector Mode"}</span>
                </button>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-purple-950/80 text-purple-300 border-b border-white/10 uppercase tracking-wider">
                      <th className="py-4 px-6 text-center">Rank</th>
                      <th className="py-4 px-6">Team & Code</th>
                      <th className="py-4 px-6">Project Title & Track</th>
                      <th className="py-4 px-6">Institution</th>
                      <th className="py-4 px-6 text-center">Evaluations</th>
                      <th className="py-4 px-6 text-right">Avg Score (/50)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {rankedTeams.map((team, idx) => (
                      <tr
                        key={team.id}
                        className={`transition-colors ${
                          idx === 0
                            ? "bg-amber-500/10 hover:bg-amber-500/15"
                            : idx === 1
                            ? "bg-slate-400/10 hover:bg-slate-400/15"
                            : idx === 2
                            ? "bg-amber-800/10 hover:bg-amber-800/15"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <td className="py-4 px-6 text-center">
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm bg-white/5 border border-white/10">
                            {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-amber-300">{team.teamCode}</div>
                          <div className="font-display font-semibold text-white text-base">{team.teamName}</div>
                        </td>
                        <td className="py-4 px-6 max-w-sm">
                          <div className="text-white line-clamp-1">{team.projectTitle}</div>
                          <div className="text-teal-300 text-[11px] mt-0.5">{team.trackName}</div>
                        </td>
                        <td className="py-4 px-6 text-purple-200/80">{team.college}</td>
                        <td className="py-4 px-6 text-center text-purple-300">
                          {team.scoreCount} panels
                        </td>
                        <td className="py-4 px-6 text-right font-display text-2xl font-bold text-amber-300 font-mono">
                          {team.avgScore > 0 ? team.avgScore : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: JUDGES ROSTER MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "judges" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="rounded-3xl glass-panel p-8 border border-white/10">
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Add New Judge Profile
                </h3>
                <p className="text-xs font-mono text-purple-300/60 mb-6">
                  Create pre-authorized panel login for track evaluations
                </p>

                <form onSubmit={handleAddJudge} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-purple-300/80 mb-1">
                      JUDGE NAME & TITLE
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Kumar (IISc)"
                      value={newJudgeName}
                      onChange={(e) => setNewJudgeName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-purple-950/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-300/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-purple-300/80 mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@institution.edu.in"
                      value={newJudgeEmail}
                      onChange={(e) => setNewJudgeEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-purple-950/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-300/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-purple-300/80 mb-1">
                      ASSIGNED TRACK
                    </label>
                    <select
                      value={newJudgeTrack}
                      onChange={(e) => setNewJudgeTrack(e.target.value)}
                      className="w-full px-4 py-2.5 bg-purple-950/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-300/60"
                    >
                      <option value="all">All Tracks Panel</option>
                      {TRACKS.map((t) => (
                        <option key={t.id} value={t.id}>
                          Track {t.number}: {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-400 text-black font-display font-bold text-xs shadow-[0_0_20px_rgba(255,209,102,0.3)]"
                  >
                    Add Judge Login
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl glass-panel p-8 border border-white/10 space-y-4">
                <h3 className="font-display text-xl font-bold text-white mb-4">
                  Active Judge Accounts ({judges.length})
                </h3>

                <div className="space-y-3">
                  {judges.map((j) => (
                    <div
                      key={j.id}
                      className="p-4 rounded-2xl bg-purple-950/40 border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-display font-bold text-white text-sm">{j.name}</div>
                        <div className="text-xs font-mono text-purple-300/60">{j.email}</div>
                        <div className="text-[11px] font-mono text-teal-300 mt-1">
                          Role: {j.role} • Track: {j.assignedTrack}
                        </div>
                      </div>

                      {j.id !== "core-01" && (
                        <button
                          onClick={() => {
                            playClickSound();
                            const updated = AdminDataService.removeJudge(j.id);
                            setJudges(updated);
                          }}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors"
                          title="Remove Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
