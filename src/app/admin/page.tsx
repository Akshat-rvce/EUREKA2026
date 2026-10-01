"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, Sparkles, UserCheck } from "lucide-react";
import { playClickSound, playSuccessChime } from "@/utils/audio";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    playClickSound();

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPass = password.trim();

      if (
        (trimmedEmail === "core.eee@rvce.edu.in" && trimmedPass === "eureka2026admin") ||
        (trimmedEmail === "admin" && trimmedPass === "eureka2026admin")
      ) {
        const session = {
          user: {
            id: "core-01",
            name: "EEE Core Operations Lead",
            email: "core.eee@rvce.edu.in",
            role: "core_team",
          },
          token: "auth_token_core_" + Date.now(),
        };
        localStorage.setItem("eureka_auth_session", JSON.stringify(session));
        document.cookie = `eureka_auth_token=${session.token}; path=/; max-age=86400; SameSite=Lax`;
        playSuccessChime();
        router.push("/admin/dashboard");
      } else if (
        (trimmedEmail === "srinivas@iisc.ac.in" && trimmedPass === "judge2026eureka") ||
        (trimmedEmail === "judge" && trimmedPass === "judge2026eureka")
      ) {
        const session = {
          user: {
            id: "judge-01",
            name: "Dr. K. Srinivas (IISc)",
            email: "srinivas@iisc.ac.in",
            role: "judge",
            assignedTrack: "track-4",
          },
          token: "auth_token_judge_" + Date.now(),
        };
        localStorage.setItem("eureka_auth_session", JSON.stringify(session));
        document.cookie = `eureka_auth_token=${session.token}; path=/; max-age=86400; SameSite=Lax`;
        playSuccessChime();
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Access restricted to authorized personnel.");
        setIsLoading(false);
      }
    }, 500);
  };

  const fillDemoAccount = (role: "core" | "judge") => {
    playClickSound();
    if (role === "core") {
      setEmail("core.eee@rvce.edu.in");
      setPassword("eureka2026admin");
    } else {
      setEmail("srinivas@iisc.ac.in");
      setPassword("judge2026eureka");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden select-none">
      {/* Background Radiance & Grid */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between relative z-10">
        <Link
          href="/"
          onClick={() => playClickSound()}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MAIN SITE</span>
        </Link>
        <div className="text-xs font-mono text-amber-400">
          EUREKA &apos;26 • SECURE GATEWAY
        </div>
      </div>

      {/* Main Login Card (Properly Centered) */}
      <div className="max-w-md w-full mx-auto my-auto relative z-10 py-8">
        <div className="rounded-3xl bg-[#0a0a0f] p-8 sm:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto mb-4 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Operations &amp; Judging
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              DEPT. OF EEE, RVCE BANGALORE
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                ORGANIZER / JUDGE ID OR EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="name@rvce.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                AUTHENTICATION KEY / PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-display font-bold text-sm shadow-[0_0_25px_rgba(251,191,36,0.3)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating Session..." : "Enter Secure Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">
              PRE-CONFIGURED DEMO PROFILES
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount("core")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-amber-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Core Team</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount("judge")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Judge Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs font-mono text-slate-500 relative z-10">
        RVCE EEE Innovation Portal • Authorized Event Coordinators &amp; Jury Only
      </div>
    </div>
  );
}
