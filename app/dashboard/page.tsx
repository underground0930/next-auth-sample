import { getUser } from "@/lib/auth";
import { DashboardPageChild } from "./page-child";

export default async function DashboardPage() {
  const user = await getUser();

  return <DashboardPageChild initialUser={user} />;
}
