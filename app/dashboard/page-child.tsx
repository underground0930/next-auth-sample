"use client";

import { User } from "@/lib/api";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardClient } from "./dashboard-client";

type Props = {
  initialUser: User | null;
};

export function DashboardPageChild({ initialUser }: Props) {
  return (
    <AuthGuard initialUser={initialUser}>
      <DashboardClient />
    </AuthGuard>
  );
}
