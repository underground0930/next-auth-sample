"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export function HomeClient() {
  const { user, logout, isLoggingOut } = useAuth();

  return (
    <div className="font-sans min-h-screen p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col gap-8 items-center w-full max-w-2xl">
        {user ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ようこそ、{user.name}さん！
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">ID: {user.id}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              メール: {user.email}
            </p>
            <button
              onClick={logout}
              disabled={isLoggingOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? "ログアウト中..." : "ログアウト"}
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ダッシュボードへ
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}

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
