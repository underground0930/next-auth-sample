"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/lib/api";
import { Loading } from "@/components/loading";

type AuthGuardProps = {
  children: React.ReactNode;
  initialUser?: User | null;
};

export function AuthGuard({ children, initialUser }: AuthGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth({ initialUser });

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
