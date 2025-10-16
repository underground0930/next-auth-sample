import { getUser } from "@/lib/auth";
import { HomeClient } from "./home-client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const user = await getUser();

  const queryClient = new QueryClient();

  // サーバー側でユーザー情報をprefetch
  queryClient.setQueryData(["user"], user);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
