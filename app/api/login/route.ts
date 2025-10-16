import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const VALID_ID = "test";
const VALID_PASSWORD = "test";
const SESSION_TOKEN = "fixed-session-token-12345";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password } = body;

    // 入力チェック
    if (!id || !password) {
      return NextResponse.json(
        { error: "ID and password are required" },
        { status: 400 }
      );
    }

    // 認証チェック（擬似的な固定値チェック）
    if (id === VALID_ID && password === VALID_PASSWORD) {
      // セッションcookieをセット
      const cookieStore = await cookies();
      cookieStore.set("auth_session", SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7日間
        path: "/",
      });

      return NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );
    }

    // 認証失敗
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
