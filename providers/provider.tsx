"use client";

import { QueryProvider } from "./query-provider";

type ProviderProps = {
  children: React.ReactNode;
};

export function Provider({ children }: ProviderProps) {
  return (
    <QueryProvider>
      {/* 他のプロバイダーをここに追加 */}
      {children}
    </QueryProvider>
  );
}
