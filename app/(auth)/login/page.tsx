"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/api";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // ログイン成功時、ユーザー情報のキャッシュを無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ id, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            ログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            test/test でログインできます
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                ユーザーID
              </label>
              <input
                id="id"
                name="id"
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="test"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="test"
              />
            </div>
          </div>

          {loginMutation.isError && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center">
              {loginMutation.error instanceof AxiosError
                ? loginMutation.error.response?.data?.error ||
                  "ログインに失敗しました"
                : "エラーが発生しました"}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "ログイン中..." : "ログイン"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
