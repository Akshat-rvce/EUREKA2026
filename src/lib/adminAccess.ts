export type AdminRole = "owner" | "administrator" | "organizer" | "judge" | "checkin" | "viewer" | "custom";

export interface PermissionSet {
  dashboard: boolean;
  registrationsRead: boolean;
  registrationsWrite: boolean;
  checkinRead: boolean;
  checkinWrite: boolean;
  judgingRead: boolean;
  judgingWrite: boolean;
  leaderboardRead: boolean;
  accountsManage: boolean;
  settingsManage: boolean;
}
export type Permission = keyof PermissionSet;

export const OWNER_PERMISSIONS: PermissionSet = {
  dashboard: true,
  registrationsRead: true,
  registrationsWrite: true,
  checkinRead: true,
  checkinWrite: true,
  judgingRead: true,
  judgingWrite: true,
  leaderboardRead: true,
  accountsManage: true,
  settingsManage: true,
};

export const ROLE_DEFAULTS: Record<Exclude<AdminRole, "owner" | "custom">, PermissionSet> = {
  administrator: { ...OWNER_PERMISSIONS, accountsManage: false, settingsManage: false },
  organizer: { ...OWNER_PERMISSIONS, accountsManage: false, settingsManage: false },
  judge: {
    dashboard: true,
    registrationsRead: false,
    registrationsWrite: false,
    checkinRead: false,
    checkinWrite: false,
    judgingRead: true,
    judgingWrite: true,
    leaderboardRead: false,
    accountsManage: false,
    settingsManage: false,
  },
  checkin: {
    dashboard: true,
    registrationsRead: false,
    registrationsWrite: false,
    checkinRead: true,
    checkinWrite: true,
    judgingRead: false,
    judgingWrite: false,
    leaderboardRead: false,
    accountsManage: false,
    settingsManage: false,
  },
  viewer: {
    dashboard: true,
    registrationsRead: true,
    registrationsWrite: false,
    checkinRead: true,
    checkinWrite: false,
    judgingRead: true,
    judgingWrite: false,
    leaderboardRead: true,
    accountsManage: false,
    settingsManage: false,
  },
};

export interface AdminProfile {
  uid: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  mustChangePassword: boolean;
  assignedTrack: string;
  trackIds: string[];
  permissions: PermissionSet;
  createdAt?: string;
  lastSignInAt?: string;
}

export function hasPermission(profile: AdminProfile, permission: keyof PermissionSet): boolean {
  return profile.role === "owner" || profile.permissions[permission] === true;
}
