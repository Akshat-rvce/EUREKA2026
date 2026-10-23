"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowLeft, ArrowUpRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { auth, isFirebaseConfigured } from "@/config/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent) {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      if (!isFirebaseConfigured || !auth) throw new Error("Admin sign-in is not configured yet. Firebase environment settings are required.");
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await result.user.getIdToken(true);
      const response = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Access denied.");
      router.push("/admin/dashboard");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign-in failed.");
      setLoading(false);
    }
  }

  return <main className="min-h-screen bg-[#11120f] text-[#f2eee4] px-5 py-8 sm:px-10 flex flex-col">
    <header className="mx-auto w-full max-w-6xl flex justify-between items-center"><Link href="/" className="text-sm text-white/60 hover:text-white flex items-center gap-2"><ArrowLeft size={16}/> Back to EUREKA</Link><span className="text-[11px] tracking-[.28em] uppercase text-[#c7ad7b]">Operations · 2026</span></header>
    <section className="w-full max-w-md mx-auto my-auto py-16">
      <div className="text-[11px] uppercase tracking-[.3em] text-[#b9a778] mb-5">EUREKA / RVCE</div>
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight">Admin portal<span className="text-[#b9a778]">.</span></h1>
      <p className="mt-4 text-sm text-white/55 leading-6">Sign in with an account provisioned by the event owner. Access is recorded and scoped to your assigned role.</p>
      {error && <p role="alert" className="mt-6 rounded-xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
      <form onSubmit={login} className="mt-8 space-y-4">
        <label className="block text-xs text-white/55">EMAIL ADDRESS<span className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4"><Mail size={16} className="text-[#b9a778]"/><input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-transparent py-4 text-sm outline-none" placeholder="you@example.com"/></span></label>
        <label className="block text-xs text-white/55">PASSWORD<span className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4"><LockKeyhole size={16} className="text-[#b9a778]"/><input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-transparent py-4 text-sm outline-none" placeholder="Your password"/></span></label>
        <button disabled={loading} className="w-full rounded-xl bg-[#e9ddbd] px-5 py-4 text-sm font-semibold text-[#191814] disabled:opacity-50 flex justify-between items-center">{loading ? "Verifying…" : "Continue securely"}<ArrowUpRight size={17}/></button>
      </form>
      <p className="mt-7 flex items-center gap-2 text-xs text-white/40"><ShieldCheck size={15} className="text-[#b9a778]"/> Protected by verified Firebase sessions and role permissions.</p>
    </section>
    <footer className="mx-auto w-full max-w-6xl border-t border-white/10 pt-5 text-xs text-white/35">RV College of Engineering · EEE</footer>
  </main>;
}
