"use client";

import { AuthGuard } from "@/components/auth-guard";
import { DashboardClient } from "./dashboard-client";

export function DashboardPageChild() {
  return (
    <AuthGuard>
      <DashboardClient />
    </AuthGuard>
  );
}
