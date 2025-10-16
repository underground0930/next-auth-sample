import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardClient initialUser={user} />;
}
