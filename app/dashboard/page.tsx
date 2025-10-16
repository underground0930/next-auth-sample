import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { DashboardClient } from "./dashboard-client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  // サーバー側でユーザー情報をprefetch
  queryClient.setQueryData(["user"], user);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
