# EUREKA ’26 Committee Portal

This is the EUREKA ’26 public website and committee operations portal, built with **Next.js 16 App Router**. The public landing page remains separate from the protected `/admin` portal.

## Local setup

1. Install Node.js 20 or later.
2. Copy `.env.example` to `.env` (or `.env.local` for Next.js local development).
3. Create a Turso database and token:

```sh
npm install
npm install -g @tursodatabase/cli
turso auth login
turso db create eureka-26
```

Then copy the values from:

```sh
turso db show eureka-26 --url
turso db tokens create eureka-26
```

Set these server-only variables in `.env` / `.env.local`:

```dotenv
TURSO_DATABASE_URL=libsql://your-database-name-your-org.turso.io
TURSO_AUTH_TOKEN=your-generated-token
MASTER_EMAIL=master@example.com
MASTER_PASSWORD=use-a-long-unique-password
SESSION_SECRET=generate-at-least-32-random-characters
```

Never commit `.env` or `.env.local`. They are ignored by Git. Do not use a `NEXT_PUBLIC_` prefix for any of these values.

4. Install dependencies and create the database schema plus first Master account:

```sh
npm install
npm run seed
```

The seed script is idempotent. It will not duplicate the Master if the email already exists.

5. Start the app:

```sh
npm run dev
```

Open `http://localhost:3000`. Sign in at `/admin` with the seeded Master account. The Master creates personal accounts for committee members; public registration is disabled.

## Deploy

1. Push the project to its connected Git repository and import/deploy it on the hosting platform.
2. In the hosting project’s Environment Variables settings, add `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `MASTER_EMAIL`, `MASTER_PASSWORD`, and `SESSION_SECRET` as server-side secrets for the required environments.
3. Redeploy so the environment variables are loaded.
4. Run `npm run seed` once against the production Turso database, using the same database variables. Keep the seed credentials private; do not add them to the repository.
5. Verify `/admin` login and the public `/live` screen.

## Portal behavior

Members create department-scoped submissions that remain pending until a Master reviews them. Only approved submissions appear in shared views. Members may revise their pending or rejected entries; Masters can manage users, review entries, and inspect the audit log. The public `/live` scoreboard exposes only approved score summaries and returns no scores while hidden.

The portal uses libSQL tables in Turso. Finance receipts are stored as BLOB attachments and delivered only through an authenticated endpoint. Date/time displays use `Asia/Kolkata`.

## Data migration

Existing Firestore data has not been copied. This portal does not connect to Firebase. If records from the previous system are needed, export them before decommissioning that project and import them through an authorized migration process.