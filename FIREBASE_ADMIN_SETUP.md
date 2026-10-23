# EUREKA admin setup

The admin portal fails closed until Firebase Auth, Firestore, and the server credential are configured.

## Configure the existing `eureka-2026` project

1. In Firebase Console, enable **Authentication → Email/Password** and create the owner Auth user `akshatraj.ee24@rvce.edu.in`. Verify the email address before the first sign-in. The first verified sign-in for this exact address creates the owner profile; no other account can claim owner status through this flow.
2. Create a Firestore database in the project and deploy this repository's rules with `firebase deploy --only firestore:rules` from an authenticated Firebase CLI, or paste `firestore.rules` into the Firestore Rules editor and publish it.
3. Create a Firebase service account with access to Firebase Authentication user management and Cloud Firestore. Store its JSON privately in Vercel as `FIREBASE_SERVICE_ACCOUNT_JSON`. Do not commit it or add it to a `NEXT_PUBLIC_` variable.
4. Copy the Firebase web app values from Project settings into the matching `NEXT_PUBLIC_FIREBASE_*` variables in Vercel. Set `FIREBASE_OWNER_EMAIL` to the owner email shown above. Add these values to local `.env.local` only for local work.
5. Redeploy after adding Vercel environment variables. Sign in as the verified owner and create separate accounts for staff. Use unique temporary passwords of at least 12 characters and share them privately. User passwords are handled by Firebase Authentication, not written to Firestore.

## Shared data model

- `teams/{id}` contains registration and check-in records.
- `scores/{id}` contains judging evaluations.
- `adminUsers/{uid}` contains role, active status, assigned tracks, and explicit permission flags.
- `adminAudit/{id}` records privileged account changes and administrative data edits.

No sample teams, judges, passwords, or scores are created. Real-time listeners read shared records; writes go through authenticated server routes that check the current account's permission and track assignment. Firestore client writes are denied by the included rules.
