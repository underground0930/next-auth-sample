import { getUser } from "@/lib/auth";
import { HomeClient } from "./home-client";

export default async function Home() {
  const user = await getUser();

  return <HomeClient initialUser={user} />;
}
