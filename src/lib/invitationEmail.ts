const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]!));

export function invitationEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.APP_BASE_URL);
}

export function passwordSetupContinueUrl() {
  const value = process.env.APP_BASE_URL;
  if (!value) throw new Error("APP_BASE_URL is not configured.");
  const url = new URL("/admin", value);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("APP_BASE_URL must use HTTPS in production.");
  }
  return url.toString();
}

export async function sendPasswordSetupInvitation(email: string, name: string, setupLink: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Invitation email is not configured.");
  const greetingName = escapeHtml(name);
  const safeLink = escapeHtml(setupLink);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Your EUREKA 2026 admin invitation",
      html: `<p>Hello ${greetingName},</p><p>You have been invited to the EUREKA 2026 admin portal. Use the secure Firebase link below to set your password:</p><p><a href="${safeLink}">Set your password</a></p><p>This link expires. If it has expired, contact the EUREKA owner for a new invitation.</p>`,
      text: `Hello ${name},\n\nYou have been invited to the EUREKA 2026 admin portal. Set your password using this secure Firebase link:\n${setupLink}\n\nThis link expires. If it has expired, contact the EUREKA owner for a new invitation.`,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Invitation email delivery failed.");
}
