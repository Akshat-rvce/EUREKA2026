import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) throw new Error("Firebase server credentials are not configured.");
  const serviceAccount = JSON.parse(serviceAccountJson);
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId || serviceAccount.project_id !== projectId) {
    throw new Error("Firebase Admin credentials must match FIREBASE_PROJECT_ID.");
  }
  const existingApp = getApps()[0];
  if (existingApp) {
    if (existingApp.options.projectId !== projectId) {
      throw new Error("The initialized Firebase Admin app does not match FIREBASE_PROJECT_ID.");
    }
    return existingApp;
  }
  return initializeApp({
    credential: cert(serviceAccount),
    projectId,
  });
}

// Load Firebase Auth only on routes that actually use Firebase user management.
// The shared owner-session flow needs Firestore but does not need Firebase Auth.
// Keeping this import lazy also avoids loading jwks-rsa/jose on every API route.
export async function adminAuth() {
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(getAdminApp());
}
export function adminDb() { return getFirestore(getAdminApp()); }
