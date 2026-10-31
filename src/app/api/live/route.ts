import { NextRequest, NextResponse } from "next/server";
import { execute, parseJson } from "@/lib/database";

export async function GET(request: NextRequest) {
  const setting = await execute("SELECT value_json FROM settings WHERE key='live_control'").catch(() => ({ rows: [] }));
  const controlRow = setting.rows[0] as Record<string, unknown> | undefined;
  const controls = parseJson<{ showScores?: boolean; revealWinners?: boolean }>(controlRow?.value_json, { showScores: false, revealWinners: false });
  if (!controls.showScores) return NextResponse.json({ visible: false, leaderboard: [], updatedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
  const teams = await execute("SELECT id,data_json FROM records WHERE section='teams' AND status='approved'");
  const scores = await execute("SELECT data_json FROM records WHERE section='scoring' AND status='approved'");
  const teamRows: Record<string, unknown>[] = teams.rows.map(row => ({ ...parseJson<Record<string, unknown>>((row as Record<string, unknown>).data_json, {}), id: String((row as Record<string, unknown>).id) }));
  const scoreRows = scores.rows.map(row => parseJson<Record<string, unknown>>((row as Record<string, unknown>).data_json, {}));
  const leaderboard = teamRows.map(team => {
    const teamScores = scoreRows.filter(score => score.team_id === team.id);
    const total = teamScores.reduce((sum, score) => sum + Number(score.total || 0), 0);
    return { teamName: String(team.team_name || "Team"), college: String(team.college || ""), track: String(team.track || ""), score: teamScores.length ? Math.round(total / teamScores.length * 100) / 100 : 0, judgesCounted: teamScores.length };
  }).filter(team => team.judgesCounted > 0).sort((a,b) => b.score-a.score);
  return NextResponse.json({ visible: true, revealWinners: controls.revealWinners === true, leaderboard, updatedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}
