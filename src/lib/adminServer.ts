import { cookies } from "next/headers";
import { execute, sqlBool } from "@/lib/database";
import { SESSION_COOKIE, sessionTokenHash } from "@/lib/adminSession";

export type PortalRole = "master" | "member" | "judge";
export interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: PortalRole;
  departmentId: string | null;
  trackIds: string[];
  active: boolean;
  mustChangePassword: boolean;
}

type UserRow = Record<string, unknown>;

export async function currentUser(options: { allowPasswordChange?: boolean } = {}): Promise<PortalUser | null> {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const result = await execute(`SELECT u.id,u.name,u.email,u.role,u.department_id,u.track_ids,u.is_active,u.must_change_password
      FROM sessions s JOIN users u ON u.id=s.user_id
      WHERE s.token_hash=? AND s.expires_at>? AND u.is_active=1 LIMIT 1`, [sessionTokenHash(token), new Date().toISOString()]);
    const row = result.rows[0] as UserRow | undefined;
    if (!row) return null;
    const mustChangePassword = sqlBool(row.must_change_password);
    if (mustChangePassword && !options.allowPasswordChange) return null;
    let trackIds: string[] = [];
    try { trackIds = JSON.parse(String(row.track_ids || "[]")); } catch { trackIds = []; }
    return { id: String(row.id), name: String(row.name), email: String(row.email), role: row.role as PortalRole, departmentId: row.department_id ? String(row.department_id) : null, trackIds, active: sqlBool(row.is_active), mustChangePassword };
  } catch {
    return null;
  }
}

export async function requireUser() { return currentUser(); }
export async function requireMaster() { const user = await currentUser(); return user?.role === "master" ? user : null; }
export const currentAdmin = currentUser;
export const requireAdmin = requireUser;
