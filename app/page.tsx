"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, logout } from "@/lib/api";

export default function Home() {
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
    retry: false, // 401エラーの場合はリトライしない
  });

  // ログアウトmutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // ログアウト成功時、ユーザー情報のキャッシュをクリア
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.refresh();
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="font-sans min-h-screen p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col gap-8 items-center w-full max-w-2xl">
        {/* 認証状態表示 */}
        <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {isLoading ? (
            <p className="text-gray-600 dark:text-gray-400">読み込み中...</p>
          ) : user ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                ようこそ、{user.name}さん！
              </h2>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>ID: {user.id}</p>
                <p>メール: {user.email}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {logoutMutation.isPending ? "ログアウト中..." : "ログアウト"}
                </button>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  ダッシュボードへ
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                未ログイン
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                保護された機能にアクセスするにはログインしてください。
              </p>
              <Link
                href="/login"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                ログイン
              </Link>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          <p className="mb-2">
            試しに{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              test/test
            </code>{" "}
            でログインしてみてください
          </p>
          <p>保護されたダッシュボードページを確認できます。</p>
        </div>
      </main>
    </div>
  );
}
