"use client";

import Link from "next/link";
import { User } from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";

type Props = {
  initialUser: User;
};

export function DashboardClient({ initialUser }: Props) {
  const { user, logout, isLoggingOut } = useAuth({ initialUser });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ダッシュボード
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.name}
              </span>
              <button
                onClick={logout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
              >
                {isLoggingOut ? "ログアウト中..." : "ログアウト"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ダッシュボードへようこそ
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              このページは保護されています。ログインしているユーザーのみ表示できます。
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                ユーザー情報
              </h3>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li>ID: {user.id}</li>
                <li>名前: {user.name}</li>
                <li>メール: {user.email}</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                カード 1
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                保護されたコンテンツです。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                カード 2
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                保護されたコンテンツです。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                カード 3
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                保護されたコンテンツです。
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
