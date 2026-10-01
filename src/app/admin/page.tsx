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
      // Valid pre-created accounts verification
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPass = password.trim();

      if (
        (trimmedEmail === "core.eee@rvce.edu.in" && trimmedPass === "eureka2026admin") ||
        (trimmedEmail === "admin" && trimmedPass === "eureka2026admin")
      ) {
        // Authenticate Core Team
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
        // Authenticate Judge
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
    }, 600);
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
    <div className="min-h-screen w-full bg-[#070412] text-white flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background Radiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <Link
          href="/"
          onClick={() => playClickSound()}
          className="flex items-center gap-2 text-xs font-mono text-purple-300/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MAIN SITE</span>
        </Link>
        <div className="text-xs font-mono text-amber-300/80">
          EUREKA '26 • SECURE GATEWAY
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto relative z-10 py-12">
        <div className="rounded-3xl glass-panel p-8 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 p-[1px] mx-auto mb-4 shadow-[0_0_25px_rgba(255,209,102,0.3)]">
              <div className="w-full h-full bg-[#0e0824] rounded-[15px] flex items-center justify-center text-amber-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">
              Operations & Judging
            </h1>
            <p className="text-xs font-mono text-purple-300/60 mt-1">
              DEPT. OF EEE, RVCE BANGALORE
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-purple-200/80 mb-1.5">
                ORGANIZER / JUDGE ID OR EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                <input
                  type="text"
                  required
                  placeholder="name@rvce.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-purple-950/40 border border-white/10 rounded-xl text-sm font-mono text-white placeholder-purple-400/40 focus:outline-none focus:border-amber-300/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-purple-200/80 mb-1.5">
                AUTHENTICATION KEY / PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-purple-950/40 border border-white/10 rounded-xl text-sm font-mono text-white placeholder-purple-400/40 focus:outline-none focus:border-amber-300/60 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 text-black font-display font-bold text-sm shadow-[0_0_25px_rgba(255,209,102,0.4)] hover:shadow-[0_0_35px_rgba(255,209,102,0.6)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating Session..." : "Enter Secure Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <div className="text-[11px] font-mono text-purple-300/60 uppercase tracking-wider mb-3">
              PRE-CONFIGURED DEMO PROFILES
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount("core")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-amber-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Core Team</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount("judge")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-teal-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Judge Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs font-mono text-purple-300/40 relative z-10">
        RVCE EEE Innovation Portal • Strictly for Authorized Event Coordinators & Panelists
      </div>
    </div>
  );
}
