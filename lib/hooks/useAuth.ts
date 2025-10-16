"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, logout, User } from "@/lib/api";

type UseAuthOptions = {
  initialUser?: User | null;
};

export function useAuth(options?: UseAuthOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // ユーザー情報を取得
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    initialData: options?.initialUser,
  });

  // ログアウトmutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
      router.refresh();
    },
  });

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user,
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
}
