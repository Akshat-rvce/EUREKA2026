import { createClient, type Client, type Transaction } from "@libsql/client/web";

type Executor = Client | Transaction;
type SqlValue = string | number | bigint | boolean | null | Uint8Array;

type DbGlobal = typeof globalThis & { eurekaTursoClient?: Client; eurekaTursoSchema?: Promise<void> };
const root = globalThis as DbGlobal;

export function db() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) throw new Error("Turso database is not configured.");
  if (!root.eurekaTursoClient) root.eurekaTursoClient = createClient({ url, authToken });
  return root.eurekaTursoClient;
}

export async function ensureSchema() {
  if (!root.eurekaTursoSchema) {
    root.eurekaTursoSchema = (async () => {
      const client = db();
      const statements = [
        `CREATE TABLE IF NOT EXISTS departments (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE)`,
        `CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ('master','member','judge')), department_id TEXT, track_ids TEXT NOT NULL DEFAULT '[]', is_active INTEGER NOT NULL DEFAULT 1, must_change_password INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, last_sign_in_at TEXT)`,
        `CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash TEXT NOT NULL UNIQUE, expires_at TEXT NOT NULL, created_at TEXT NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS login_attempts (attempt_key TEXT PRIMARY KEY, window_started_at INTEGER NOT NULL, attempts INTEGER NOT NULL, blocked_until INTEGER NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY, section TEXT NOT NULL, data_json TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('pending','approved','rejected')), created_by TEXT NOT NULL REFERENCES users(id), created_at TEXT NOT NULL, updated_at TEXT NOT NULL, reviewed_by TEXT REFERENCES users(id), reviewed_at TEXT, reject_reason TEXT, version INTEGER NOT NULL DEFAULT 1)`,
        `CREATE TABLE IF NOT EXISTS attachments (id TEXT PRIMARY KEY, filename TEXT NOT NULL, mime_type TEXT NOT NULL, data BLOB NOT NULL, uploaded_by TEXT NOT NULL REFERENCES users(id), created_at TEXT NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS announcements (id TEXT PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL, created_by TEXT NOT NULL REFERENCES users(id), created_at TEXT NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value_json TEXT NOT NULL, updated_by TEXT REFERENCES users(id), updated_at TEXT NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS audit_log (id TEXT PRIMARY KEY, user_id TEXT REFERENCES users(id), action TEXT NOT NULL, entity TEXT NOT NULL, entity_id TEXT, old_json TEXT, new_json TEXT, created_at TEXT NOT NULL)`,
        `CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id)`,
        `CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions(expires_at)`,
        `CREATE INDEX IF NOT EXISTS login_attempts_block_idx ON login_attempts(blocked_until)`,
        `CREATE INDEX IF NOT EXISTS records_section_status_idx ON records(section,status)`,
        `CREATE INDEX IF NOT EXISTS records_creator_idx ON records(created_by)`,
        `CREATE INDEX IF NOT EXISTS records_date_idx ON records(section,status,created_at)`,
        `CREATE UNIQUE INDEX IF NOT EXISTS teams_code_unique ON records(json_extract(data_json,'$.team_code')) WHERE section='teams' AND json_extract(data_json,'$.team_code') IS NOT NULL AND json_extract(data_json,'$.team_code')<>''`,
        `CREATE UNIQUE INDEX IF NOT EXISTS score_judge_team_unique ON records(json_extract(data_json,'$.team_id'),json_extract(data_json,'$.judge_id')) WHERE section='scoring' AND json_extract(data_json,'$.team_id') IS NOT NULL AND json_extract(data_json,'$.judge_id') IS NOT NULL`,
        `CREATE INDEX IF NOT EXISTS audit_created_idx ON audit_log(created_at)`,
        `CREATE INDEX IF NOT EXISTS attachments_uploader_idx ON attachments(uploaded_by)`,
      ];
      for (const sql of statements) await client.execute(sql);
      const userColumns = await client.execute("PRAGMA table_info(users)");
      if (!userColumns.rows.some(row => String((row as Record<string, unknown>).name) === "department_ids")) {
        await client.execute("ALTER TABLE users ADD COLUMN department_ids TEXT NOT NULL DEFAULT '[]'");
      }
      await client.execute("UPDATE users SET department_ids=json_array(department_id) WHERE department_id IS NOT NULL AND department_ids='[]'");
      const departments = ["Finance", "Registration", "Scoring", "Logistics", "Promotion", "Operations"];
      for (const name of departments) await client.execute({ sql: "INSERT OR IGNORE INTO departments(id,name) VALUES(?,?)", args: [name.toLowerCase(), name] });
      const defaults: Record<string, unknown> = {
        budget: { totalPaisa: 2500000, prizePaisa: 1500000, registrationFeePaisa: 50000, targetTeams: 60 },
        scoring_criteria: [
          { key: "innovation", label: "Innovation", weight: 20 },
          { key: "technical_depth", label: "Technical depth", weight: 20 },
          { key: "working_prototype", label: "Working prototype", weight: 20 },
          { key: "real_world_impact", label: "Real-world impact", weight: 20 },
          { key: "presentation", label: "Presentation", weight: 20 },
        ],
        live_control: { showScores: false, revealWinners: false, lockedTracks: [] },
      };
      for (const [key, value] of Object.entries(defaults)) await client.execute({ sql: "INSERT OR IGNORE INTO settings(key,value_json,updated_at) VALUES(?,?,?)", args: [key, JSON.stringify(value), new Date().toISOString()] });
    })().catch(error => { root.eurekaTursoSchema = undefined; throw error; });
  }
  await root.eurekaTursoSchema;
}

export async function execute(sql: string, args: SqlValue[] = []) {
  await ensureSchema();
  return db().execute({ sql, args });
}

export async function transaction<T>(work: (tx: Transaction) => Promise<T>) {
  await ensureSchema();
  const tx = await db().transaction("write");
  try {
    const result = await work(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  }
}

export function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

export function sqlBool(value: unknown) { return Number(value) === 1; }
export type { Executor, SqlValue };
