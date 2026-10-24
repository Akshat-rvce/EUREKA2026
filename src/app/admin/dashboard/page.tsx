"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, ArrowDownToLine, ArrowLeft, Check, CircleAlert, LogOut, Plus, Radio, Search, Shield, Users, X } from "lucide-react";
import { TRACKS } from "@/config/site";
import type { AdminProfile, PermissionSet } from "@/lib/adminAccess";

type RecordRow = Record<string, any> & { id: string };
type AccountRow = AdminProfile & { uid: string; invitationStatus?: string; updatedAt?: string | null };
const fieldClass = "w-full rounded-lg border border-[#ded8c9] bg-white px-3 py-2.5 text-sm text-[#24231f] outline-none focus:border-[#8c7649]";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AccountRow | null>(null);
  const [teams, setTeams] = useState<RecordRow[]>([]);
  const [scores, setScores] = useState<RecordRow[]>([]);
  const [auditEvents, setAuditEvents] = useState<RecordRow[]>([]);
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [teamForm, setTeamForm] = useState<RecordRow | "new" | null>(null);
  const [editingScore, setEditingScore] = useState<RecordRow | null>(null);

  useEffect(() => {
    fetch("/api/admin/me").then(async r => { if (!r.ok) throw new Error(); const d = await r.json(); setUser(d.user); }).catch(() => router.replace("/admin"));
  }, [router]);

  useEffect(() => {
    if (!user) return;
    let active = true;
    const refreshSharedData = async () => {
      try {
        const [teamsResponse, scoresResponse] = await Promise.all([
          fetch("/api/admin/data?collection=teams", { cache: "no-store" }),
          fetch("/api/admin/data?collection=scores", { cache: "no-store" }),
        ]);
        if (!teamsResponse.ok || !scoresResponse.ok) throw new Error("Shared data could not be loaded. Check the server Firestore configuration.");
        const [teamsData, scoresData] = await Promise.all([teamsResponse.json(), scoresResponse.json()]);
        if (!active) return;
        setTeams(teamsData.rows || []);
        setScores(scoresData.rows || []);
        setLoading(false);
      } catch (error) {
        if (!active) return;
        setLoading(false);
        setNotice(error instanceof Error ? error.message : "Shared data could not be loaded.");
      }
    };
    void refreshSharedData();
    const interval = window.setInterval(refreshSharedData, 5000);
    const onFocus = () => void refreshSharedData();
    window.addEventListener("focus", onFocus);
    return () => { active = false; window.clearInterval(interval); window.removeEventListener("focus", onFocus); };
  }, [user]);

  useEffect(() => {
    if (tab === "activity" && user?.role === "owner") fetch("/api/admin/audit").then(r=>r.json()).then(d=>setAuditEvents(d.events || [])).catch(()=>setNotice("Audit history could not be loaded."));
  }, [tab, user]);

  async function mutate(collectionName: string, data: Record<string, unknown>, id?: string, expectedVersion?: number) {
    const response = await fetch("/api/admin/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collection: collectionName, data: { ...data, ...(id ? { id } : {}), ...(expectedVersion !== undefined ? { expectedVersion } : {}) } }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not save.");
    return result;
  }

  async function logout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.replace("/admin");
  }

  const visibleTeams = useMemo(() => teams.filter(team => (selectedTrack === "all" || team.trackId === selectedTrack) && `${team.teamName || ""} ${team.projectTitle || ""} ${team.teamCode || ""}`.toLowerCase().includes(query.toLowerCase())), [teams, selectedTrack, query]);
  const can = (permission: keyof PermissionSet) => user?.role === "owner" || user?.permissions?.[permission] === true;
  const navItems = ["overview", ...(can("registrationsRead") || can("checkinRead") ? ["teams"] : []), ...(can("checkinRead") ? ["check-in"] : []), ...(can("judgingRead") || can("judgingWrite") ? ["judging"] : []), ...(can("leaderboardRead") ? ["leaderboard"] : []), ...(user?.role === "owner" ? ["activity"] : [])];
  const trackName = (id: string) => TRACKS.find(t=>t.id===id)?.title || "Unassigned";
  return <main className="min-h-screen bg-[#f5f2ea] text-[#24231f]">
    <header className="sticky top-0 z-20 border-b border-[#ded8c9] bg-[#f5f2ea]/95 backdrop-blur"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8"><div className="flex items-center gap-4"><div className="grid h-10 w-10 place-items-center rounded-full border border-[#b49b68] text-[#826b3d]"><Activity size={18}/></div><div><p className="text-[10px] uppercase tracking-[.28em] text-[#8a7448]">EUREKA ’26 · RVCE</p><p className="text-sm font-medium">Operations workspace</p></div></div><div className="flex items-center gap-4"><span className="hidden text-right sm:block"><b className="block text-xs">{user?.name || "Loading account…"}</b><small className="text-[#807b6e]">{user?.role || ""}</small></span><button onClick={logout} className="flex items-center gap-2 rounded-full border border-[#d5cdbb] px-3 py-2 text-xs hover:bg-white"><LogOut size={14}/> Sign out</button></div></div></header>
    <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[220px_1fr]">
      <aside><p className="mb-3 text-[10px] uppercase tracking-[.22em] text-[#8b8577]">Workspace</p><nav className="flex gap-2 overflow-x-auto lg:flex-col">{navItems.map(item=><button key={item} onClick={()=>setTab(item)} className={`whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm capitalize ${tab===item?"bg-[#24231f] text-[#f6f0df]":"text-[#676359] hover:bg-white"}`}>{item}</button>)}</nav><div className="mt-8 hidden rounded-2xl border border-[#ded8c9] bg-white/60 p-4 lg:block"><Radio size={16} className="text-emerald-700"/><p className="mt-3 text-sm font-medium">Live workspace</p><p className="mt-1 text-xs leading-5 text-[#777165]">Changes sync with the shared Firestore database.</p></div></aside>
      <section className="min-w-0">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.24em] text-[#8a7448]">EUREKA / {tab}</p><h1 className="mt-2 text-3xl font-light capitalize sm:text-4xl">{tab === "overview" ? "Event control" : tab}</h1></div><span className="flex items-center gap-2 text-xs text-[#7a756a]"><span className="h-2 w-2 rounded-full bg-emerald-600"/> Shared data sync</span></div>
        {notice && <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"><CircleAlert size={17}/>{notice}<button className="ml-auto" onClick={()=>setNotice("")}><X size={15}/></button></div>}
        {tab === "overview" && <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Registered teams", teams.length, "Current shared records"],["Checked in", teams.filter(t=>t.checkedIn).length, "Event arrivals"],["Scores submitted", scores.length, "Across all rounds"],["Tracks", TRACKS.length, "Competition streams"]].map(([label,value,sub])=><article key={String(label)} className="rounded-2xl border border-[#ded8c9] bg-white p-5"><p className="text-xs text-[#777165]">{label}</p><p className="mt-5 text-4xl font-light">{loading?"—":value}</p><p className="mt-2 text-xs text-[#9a9487]">{sub}</p></article>)}</div><div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]"><article className="rounded-2xl border border-[#ded8c9] bg-white p-5"><h2 className="font-medium">Track activity</h2><div className="mt-4 divide-y divide-[#eeeae1]">{TRACKS.map(track=><div key={track.id} className="flex justify-between gap-4 py-3 text-sm"><span>{track.number} · {track.title}</span><span className="tabular-nums text-[#8a7448]">{teams.filter(t=>t.trackId===track.id).length}</span></div>)}</div></article><article className="rounded-2xl bg-[#24231f] p-6 text-[#f5f2ea]"><Shield size={18} className="text-[#d9c89f]"/><h2 className="mt-5 text-xl font-light">Access at a glance</h2><p className="mt-2 text-sm leading-6 text-white/60">You are signed in as <b className="text-white">{user?.role}</b>. Available tools and records follow your owner-assigned permissions and track access.</p><p className="mt-6 text-xs uppercase tracking-[.18em] text-[#d9c89f]">{user?.trackIds?.length ? user.trackIds.map(trackName).join(" · ") : user?.role === "owner" ? "All tracks" : "No tracks assigned"}</p></article></div></>}
        {tab === "teams" && <div className="rounded-2xl border border-[#ded8c9] bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eeeae1] p-4"><div className="flex flex-wrap gap-2"><label className="flex items-center gap-2 rounded-lg border border-[#ded8c9] px-3"><Search size={15} className="text-[#8b8577]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search teams" className="w-44 py-2 text-sm outline-none"/></label><select value={selectedTrack} onChange={e=>setSelectedTrack(e.target.value)} className="rounded-lg border border-[#ded8c9] px-3 text-sm"><option value="all">All tracks</option>{TRACKS.map(t=><option key={t.id} value={t.id}>{t.number} · {t.title}</option>)}</select></div><div className="flex gap-2">{can("registrationsWrite")&&<button onClick={()=>setTeamForm("new")} className="flex items-center gap-2 rounded-lg bg-[#24231f] px-4 py-2.5 text-xs text-white"><Plus size={15}/> Add team</button>}<button onClick={()=>{const blob=new Blob([JSON.stringify(visibleTeams,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="eureka-teams.json";a.click();URL.revokeObjectURL(a.href)}} className="flex items-center gap-2 rounded-lg border border-[#ded8c9] px-3 py-2 text-xs"><ArrowDownToLine size={14}/> Export</button></div></div>
          {teamForm&&<TeamForm initial={teamForm === "new" ? undefined : teamForm} onClose={()=>setTeamForm(null)} onSave={async (data,id,version)=>{await mutate("teams",data,id,version);setTeamForm(null);setNotice(id?"Team updated and synced to the shared database.":"Team added to the shared database.")}}/>}
          {visibleTeams.length===0?<div className="px-6 py-20 text-center"><Users size={25} className="mx-auto text-[#aa9a78]"/><h3 className="mt-4 font-medium">No team records yet</h3><p className="mt-2 text-sm text-[#827c70]">Imported registrations or teams added by an authorized organizer will appear here.</p></div>:<div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-[#f8f6f0] text-[10px] uppercase tracking-[.16em] text-[#858072]"><tr><th className="px-5 py-3">Team</th><th className="px-5 py-3">Project</th><th className="px-5 py-3">Track</th><th className="px-5 py-3">Check-in</th><th className="px-5 py-3">Code</th><th className="px-5 py-3">Edit</th></tr></thead><tbody className="divide-y divide-[#eeeae1]">{visibleTeams.map(team=><tr key={team.id}><td className="px-5 py-4 font-medium">{team.teamName}</td><td className="px-5 py-4 text-[#716c61]">{team.projectTitle || "—"}</td><td className="px-5 py-4 text-xs">{trackName(team.trackId)}</td><td className="px-5 py-4">{team.checkedIn?<span className="text-emerald-700">Checked in</span>:<span className="text-[#827c70]">Waiting</span>}</td><td className="px-5 py-4 font-mono text-xs">{team.teamCode||"—"}</td><td className="px-5 py-4">{can("registrationsWrite")&&<button onClick={()=>setTeamForm(team)} className="rounded-lg border border-[#ded8c9] px-3 py-2 text-xs">Edit</button>}</td></tr>)}</tbody></table></div>}</div>}
        {tab === "check-in" && <div className="rounded-2xl border border-[#ded8c9] bg-white p-5"><h2 className="text-lg">Arrival desk</h2><p className="mt-1 text-sm text-[#777165]">Search a registered team and record arrival. Shared dashboards refresh within a few seconds.</p><div className="mt-5 space-y-3">{visibleTeams.map(team=><div key={team.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#eeeae1] p-4"><div><p className="font-medium">{team.teamName}</p><p className="mt-1 text-xs text-[#777165]">{team.teamCode} · {trackName(team.trackId)}</p></div>{can("checkinWrite")&&<button onClick={async()=>{try{await mutate("teams",{checkedIn:!team.checkedIn},team.id,team.version||0)}catch(e){setNotice(String(e))}}} className={`rounded-lg px-4 py-2 text-xs ${team.checkedIn?"border border-[#ded8c9]":"bg-[#24231f] text-white"}`}>{team.checkedIn?"Undo check-in":"Check in"}</button>}</div>)}</div></div>}
        {tab === "judging" && <div className="grid gap-5 xl:grid-cols-[.75fr_1.25fr]"><ScoreForm key={editingScore?.id || "new-score"} teams={visibleTeams} canWrite={can("judgingWrite")} initial={editingScore || undefined} onCancel={()=>setEditingScore(null)} onSave={async data=>{const id = typeof data.id === "string" ? data.id : undefined; const version = typeof data.expectedVersion === "number" ? data.expectedVersion : undefined; await mutate("scores",data,id,version);setEditingScore(null);setNotice(id?"Score updated and synced.":"Score saved and synced.")}}/><div className="rounded-2xl border border-[#ded8c9] bg-white p-5"><h2 className="font-medium">Submitted scores</h2>{scores.length===0?<p className="py-14 text-center text-sm text-[#827c70]">No judging records yet.</p>:<div className="mt-4 space-y-2">{scores.map(s=><div key={s.id} className="flex justify-between gap-3 rounded-xl border border-[#eeeae1] p-4"><div><p className="font-medium">{teams.find(t=>t.id===s.teamId)?.teamName || s.teamName || "Team"}</p><p className="mt-1 text-xs text-[#777165]">{s.judgeName || user?.name} · {s.round || "Round 1"}</p></div><div className="flex items-center gap-3"><strong className="text-xl font-light">{s.totalScore ?? "—"}</strong>{can("judgingWrite")&&(user?.role==="owner"||s.judgeUid===user?.uid)&&<button onClick={()=>setEditingScore(s)} className="rounded-lg border border-[#ded8c9] px-3 py-2 text-xs">Edit</button>}</div></div>)}</div>}</div></div>}
        {tab === "leaderboard" && <div className="rounded-2xl border border-[#ded8c9] bg-white p-5"><h2 className="font-medium">Live leaderboard</h2><p className="mt-1 text-sm text-[#777165]">Ranked by average submitted score.</p><div className="mt-5 space-y-2">{teams.map(team=>({team,points:scores.filter(s=>s.teamId===team.id).reduce((n,s)=>n+Number(s.totalScore||0),0),count:scores.filter(s=>s.teamId===team.id).length})).filter(x=>x.count).sort((a,b)=>b.points/b.count-a.points/a.count).map((x,i)=><div key={x.team.id} className="grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-xl border border-[#eeeae1] p-4"><span className="text-xs text-[#8b8577]">{String(i+1).padStart(2,"0")}</span><div><b className="text-sm">{x.team.teamName}</b><p className="mt-1 text-xs text-[#777165]">{trackName(x.team.trackId)} · {x.count} score(s)</p></div><b className="text-xl font-light">{(x.points/x.count).toFixed(1)}</b></div>)}</div></div>}
        {tab === "activity" && <div className="rounded-2xl border border-[#ded8c9] bg-white"><div className="border-b border-[#eeeae1] p-5"><h2 className="font-medium">Security &amp; activity log</h2><p className="mt-1 text-xs text-[#777165]">Latest 100 sign-ins and privileged changes.</p></div>{auditEvents.length===0?<p className="p-10 text-center text-sm text-[#827c70]">No events recorded yet.</p>:<div className="divide-y divide-[#eeeae1]">{auditEvents.map(event=><div key={event.id} className="flex flex-wrap justify-between gap-2 px-5 py-4"><div><p className="text-sm font-medium">{String(event.action||"Event").replaceAll("-"," ")}</p><p className="mt-1 text-xs text-[#777165]">{event.actorEmail||event.actorUid||"System"}{event.email?` · ${event.email}`:""}{event.collection?` · ${event.collection}/${event.recordId||""}`:""}</p></div><time className="text-xs text-[#8a8478]">{event.at?new Date(event.at).toLocaleString():"—"}</time></div>)}</div>}</div>}
      </section>
    </div>
  </main>;
}

function TeamForm({initial,onClose,onSave}:{initial?:RecordRow;onClose:()=>void;onSave:(d:Record<string,unknown>,id?:string,version?:number)=>Promise<void>}) {
 const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 return <form className="grid gap-3 border-b border-[#eeeae1] bg-[#faf9f5] p-4 sm:grid-cols-2" onSubmit={async event=>{event.preventDefault();const form=event.currentTarget;const values=new FormData(form);setBusy(true);setError("");try{await onSave({teamName:String(values.get("teamName")||"").trim(),teamCode:String(values.get("teamCode")||"").trim(),projectTitle:String(values.get("projectTitle")||"").trim(),trackId:String(values.get("trackId")||""),college:String(values.get("college")||"").trim()},initial?.id,initial?.version||0)}catch(cause){setError(cause instanceof Error?cause.message:"Could not save team.")}finally{setBusy(false)}}}>
  <input name="teamName" required maxLength={120} defaultValue={initial?.teamName||""} className={fieldClass} placeholder="Team name"/><input name="teamCode" maxLength={40} defaultValue={initial?.teamCode||""} className={fieldClass} placeholder="Registration code"/><input name="projectTitle" maxLength={200} defaultValue={initial?.projectTitle||""} className={fieldClass} placeholder="Project title"/><select name="trackId" required defaultValue={initial?.trackId||""} className={fieldClass}><option value="">Choose track</option>{TRACKS.map(track=><option key={track.id} value={track.id}>{track.number} · {track.title}</option>)}</select><input name="college" maxLength={160} defaultValue={initial?.college||""} className={fieldClass} placeholder="College"/>{error&&<p role="alert" className="text-sm text-rose-700">{error}</p>}<div className="flex gap-2"><button disabled={busy} className="rounded-lg bg-[#24231f] px-4 py-2 text-xs text-white">{busy?"Saving…":initial?"Save team":"Add team"}</button><button type="button" onClick={onClose} className="rounded-lg border px-4 py-2 text-xs">Cancel</button></div>
 </form>;
}

function ScoreForm({teams,canWrite,initial,onCancel,onSave}:{teams:RecordRow[];canWrite:boolean;initial?:RecordRow;onCancel:()=>void;onSave:(d:Record<string,unknown>)=>Promise<void>}) {
 const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 if(!canWrite)return <div className="rounded-2xl border border-[#ded8c9] bg-white p-5 text-sm text-[#777165]">Your role can view scores but cannot submit them.</div>;
 return <form className="rounded-2xl border border-[#ded8c9] bg-white p-5" onSubmit={async event=>{event.preventDefault();const form=event.currentTarget;const values=new FormData(form);const teamId=String(values.get("teamId"));const team=teams.find(item=>item.id===teamId);const keys=["innovation","technicalDepth","hardwareExecution","marketViability","presentation"];const scores=keys.map(key=>Number(values.get(key)));setBusy(true);setError("");try{await onSave({...(initial?{id:initial.id,expectedVersion:initial.version||0}:{}),teamId,round:String(values.get("round")),...Object.fromEntries(keys.map((key,index)=>[key,scores[index]])),comments:String(values.get("comments")||"")})}catch(cause){setError(cause instanceof Error?cause.message:"Could not save score.")}finally{setBusy(false)}}}>
  <h2 className="font-medium">{initial?"Edit evaluation":"Submit evaluation"}</h2><p className="mt-1 text-xs text-[#777165]">Score each criterion from 1 to 10. Submissions are shared live and audited.</p><div className="mt-4 space-y-3"><select name="teamId" required disabled={Boolean(initial)} defaultValue={initial?.teamId||""} className={fieldClass}><option value="">Select a team</option>{teams.map(team=><option key={team.id} value={team.id}>{team.teamCode} · {team.teamName}</option>)}</select><select name="round" disabled={Boolean(initial)} defaultValue={initial?.round||"round1"} className={fieldClass}><option value="round1">Round 1</option><option value="round2">Final round</option></select>{[["innovation","Innovation"],["technicalDepth","Technical depth"],["hardwareExecution","Execution"],["marketViability","Impact & viability"],["presentation","Presentation"]].map(([key,label])=><label key={key} className="flex items-center justify-between text-xs text-[#716c61]">{label}<select name={key} defaultValue={initial?.[key]||1} className="rounded-lg border border-[#ded8c9] bg-white px-3 py-2 text-sm">{Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select></label>)}<textarea name="comments" rows={3} maxLength={4000} defaultValue={initial?.comments||""} className={fieldClass} placeholder="Feedback notes"/>{error&&<p role="alert" className="text-sm text-rose-700">{error}</p>}<div className="flex gap-2"><button disabled={busy} className="flex-1 rounded-lg bg-[#24231f] px-4 py-3 text-sm text-white">{busy?"Saving…":initial?"Save changes":"Save evaluation"}</button>{initial&&<button type="button" onClick={onCancel} className="rounded-lg border px-4 py-3 text-sm">Cancel</button>}</div></div>
 </form>;
}
