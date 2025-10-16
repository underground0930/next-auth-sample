import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // セッションcookieを削除
    const cookieStore = await cookies();
    cookieStore.delete("auth_session");

    return NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
