"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { User } from "@/lib/api";

type AuthGuardProps = {
  children: React.ReactNode;
  initialUser?: User | null;
};

export function AuthGuard({ children, initialUser }: AuthGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth({ initialUser });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
