# Turso setup and security

The committee portal uses Turso/libSQL with `@libsql/client`; there is no Firebase dependency or public sign-up. The server reads `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` only.

## Create a database

```sh
npm install -g @tursodatabase/cli
turso auth login
turso db create eureka-26
turso db show eureka-26 --url
turso db tokens create eureka-26
```

Copy the URL and token into the local `.env.local` file as `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`. Configure the same names as server-only deployment variables. Do not expose or commit the token.

## Seed the Master

Set `MASTER_EMAIL`, `MASTER_PASSWORD`, and `SESSION_SECRET`. Run `npm run seed` once for each database. The script creates the schema and first Master only if that email does not exist. It never creates public accounts. Create all other users from the Master-only Users screen.

## Sessions

Passwords are bcrypt-hashed. Random session tokens are stored only as keyed hashes in the `sessions` table; the raw token exists only in the HTTP-only cookie. Cookies are `Secure` in production, `SameSite=Lax`, and expire after seven days. Sign-in attempts are rate-limited. Users can be disabled server-side and their sessions are revoked.

## Approvals and audit

A member can view all approved shared entries plus their own pending or rejected submissions. Members cannot read another user’s unapproved entries, approve entries, or edit/delete approved submissions. Master-entered records are approved immediately. Review, edit, delete, sign-in, account, and approval actions are written to the audit log.

## Existing records

Previous Firestore data remains in the old Firebase project and has not been migrated or deleted. Do not remove it until you have exported anything you still need and confirmed it in Turso.