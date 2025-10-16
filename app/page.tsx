"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="font-sans min-h-screen p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col gap-8 items-center w-full max-w-2xl">
        {/* 認証状態表示 */}
        <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {loading ? (
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
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  ログアウト
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
