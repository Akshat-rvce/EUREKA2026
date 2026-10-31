export type AdminRole = "master" | "member" | "judge";
export interface AdminProfile {
  uid: string;
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  mustChangePassword: boolean;
  departmentId: string | null;
  departmentIds?: string[];
  trackIds: string[];
}
export const OWNER_PERMISSIONS = {} as const;
export type Permission = string;
export type PermissionSet = Record<string, boolean>;
export function hasPermission(profile: AdminProfile, permission: string) {
  return profile.role === "master" || (profile.role === "judge" && permission === "judgingWrite");
}

export const SECTION_DEPARTMENTS: Record<string, string[]> = {
  finance: ["finance"],
  teams: ["registration"],
  judges: ["scoring"],
  scoring: ["scoring"],
  tasks: ["operations", "logistics", "promotion", "finance", "registration", "scoring"],
  schedule: ["operations", "logistics"],
  volunteers: ["operations", "logistics"],
  logistics: ["logistics"],
  promotion: ["promotion"],
};
export const PORTAL_SECTIONS = Object.keys(SECTION_DEPARTMENTS);
export function canManageSection(user: { role: string; departmentId?: string | null; departmentIds?: string[] }, section: string) {
  if (user.role === "master") return true;
  if (user.role === "judge") return section === "scoring";
  const departments = SECTION_DEPARTMENTS[section] || [];
  const assigned = user.departmentIds?.length ? user.departmentIds : user.departmentId ? [user.departmentId] : [];
  return assigned.some(departmentId => departments.includes(departmentId));
}
