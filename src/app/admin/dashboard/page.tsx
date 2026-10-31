import { redirect } from "next/navigation";
import { currentUser } from "@/lib/adminServer";
import PortalDashboard from "./PortalDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await currentUser({ allowPasswordChange: true });
  if (!user) redirect("/admin");
  if (user.mustChangePassword) redirect("/admin/change-password");
  return <PortalDashboard initialUser={user} />;
}
