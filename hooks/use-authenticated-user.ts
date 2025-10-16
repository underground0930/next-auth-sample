"use client";

import { useAuth } from "@/hooks/use-auth";
import { User } from "@/lib/api";

/**
 * AuthGuard内で使用する、認証済みユーザーを返すフック
 * このフックはAuthGuardの子コンポーネント内でのみ使用してください
 * ユーザーが必ず存在することを型レベルで保証します
 */
export function useAuthenticatedUser() {
  const { user, ...rest } = useAuth();

  // AuthGuard内でのみ使用されるため、userは必ず存在する
  if (!user) {
    throw new Error(
      "useAuthenticatedUser must be used within AuthGuard component"
    );
  }

  return {
    user: user as User,
    ...rest,
  };
}
