# EUREKA admin setup

## Sign-in

The portal now uses one owner email and password configured on the server. It does not use Firebase Authentication for the admin login or require email verification. The password and signed-session key must stay in local `.env.local` or the deployment platform's server-only environment settings; never add either to source code, `.env.example`, or a `NEXT_PUBLIC_` variable.

For local development, `.env.local` contains:

- `FIREBASE_OWNER_EMAIL` — the single login email (`eureka26@rvce.edu.in`).
- `EUREKA_ADMIN_PASSWORD` — the shared login password.
- `EUREKA_ADMIN_SESSION_SECRET` — a random server-only signing key. The local value was generated and stored in `.env.local`.

The server compares credentials, limits repeated failed sign-in attempts using a hashed network address in Firestore, then sets an 8-hour HTTP-only, same-site session cookie. All people using this one shared login are indistinguishable to the portal and receive Owner permissions. Individual judge/coordinator accounts, invitations, and per-person attribution are not compatible with the single shared credential mode.

The password has been shared in conversation. Treat it as exposed: change `EUREKA_ADMIN_PASSWORD` to a new unique value before putting this login on a public production site. Production is not configured or deployed by this change.

## Persistent shared Firestore data

Firebase remains the database. The browser no longer initializes the Firebase client SDK or reads Firestore directly; it calls the server API. The server uses Firebase Admin and the service account in `FIREBASE_SERVICE_ACCOUNT_JSON`, so all authorized sessions use the same Firestore project and the existing shared records persist independently of a browser or device.

Required server variables:

- `FIREBASE_PROJECT_ID=eureka-2026-5aa2c`
- `FIREBASE_SERVICE_ACCOUNT_JSON` — the existing service-account JSON as one-line JSON, held only in `.env.local` or server-side deployment settings.

The project ID inside that JSON must match `FIREBASE_PROJECT_ID`. Admin SDK reads and writes bypass Firestore Security Rules, so server routes keep checking the signed session, role, track, permission, record version, and audit behavior. Direct browser Firestore access remains denied by the rules.

## Collections

- `teams/{id}` stores team registration and check-in data.
- `scores/{id}` stores judging evaluations.
- `adminUsers/{uid}` retains existing role and invitation records.
- `adminAudit/{id}` records sign-ins and administrative edits.
- `adminLoginAttempts/{hashed-address}` stores 15-minute throttling counters under a one-way hash; it contains no raw password, email, or network address. Old address records are ignored after their window and overwritten if that address signs in again.

Team and score data is fetched from the server every five seconds and when the dashboard regains focus. A successful write is persisted through a server API to the central Firestore database; another authorized open dashboard will pick it up on the next refresh.

## Local start

After updating `.env.local`, restart the Next.js dev server so it reloads the server-only values, then open `http://localhost:3000/admin`. Do not commit `.env.local` or deploy/push production settings as part of local setup.
