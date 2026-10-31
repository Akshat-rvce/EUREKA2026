"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const values = new FormData(event.currentTarget);
    const password = String(values.get("password") || "");
    if (password !== String(values.get("confirm") || "")) { setBusy(false); setError("The passwords do not match."); return; }
    try {
      const response = await fetch("/api/admin/password", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The password could not be changed.");
      router.replace("/admin/dashboard");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The password could not be changed."); setBusy(false); }
  }
  return <main className="grid min-h-screen place-items-center bg-[#11120f] px-4 text-[#f2eee4]"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.04] p-7"><p className="text-[10px] uppercase tracking-[.25em] text-[#b9a778]">EUREKA ’26 · account security</p><h1 className="mt-3 text-3xl font-light">Set your password</h1><p className="mt-3 text-sm leading-6 text-white/55">Choose a private password to continue to the committee workspace. Use at least 12 characters.</p>{error&&<p role="alert" className="mt-4 rounded-lg bg-rose-300/10 p-3 text-sm text-rose-200">{error}</p>}<label className="mt-5 block text-xs text-white/60">NEW PASSWORD<input name="password" type="password" required minLength={12} maxLength={128} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm"/></label><label className="mt-4 block text-xs text-white/60">CONFIRM PASSWORD<input name="confirm" type="password" required minLength={12} maxLength={128} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm"/></label><button disabled={busy} className="mt-5 min-h-12 w-full rounded-xl bg-[#e9ddbd] px-4 text-sm font-semibold text-[#191814]">{busy?"Saving…":"Save password"}</button></form></main>;
}
