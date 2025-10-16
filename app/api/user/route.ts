import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_TOKEN = "fixed-session-token-12345";

// 擬似的なユーザー情報
const USER_DATA = {
  id: "test",
  name: "Test User",
  email: "test@example.com",
};

export async function GET() {
  try {
    // セッションcookieを取得
    const cookieStore = await cookies();
    const authSession = cookieStore.get("auth_session");

    // セッション検証
    if (!authSession || authSession.value !== SESSION_TOKEN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ユーザー情報を返す
    return NextResponse.json(
      { user: USER_DATA },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
