import { cookies } from "next/headers";
import { User } from "./api";

const SESSION_TOKEN = "fixed-session-token-12345";

// サーバー側でユーザー情報を取得
export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const authSession = cookieStore.get("auth_session");

  // セッション検証
  if (!authSession || authSession.value !== SESSION_TOKEN) {
    return null;
  }

  // 擬似的なユーザー情報を返す
  return {
    id: "test",
    name: "Test User",
    email: "test@example.com",
  };
}
