import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認証が必要なパス
const protectedPaths = ["/dashboard"];

// 認証済みユーザーがアクセスできないパス
const authPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authSession = request.cookies.get("auth_session");

  // 保護されたパスへのアクセス
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // セッションがない場合はログインページへリダイレクト
    if (!authSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ログインページへのアクセス（既にログイン済みの場合）
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (authSession) {
      // 既にログイン済みの場合はホームページへリダイレクト
      const redirect = request.nextUrl.searchParams.get("redirect");
      const redirectUrl = new URL(redirect || "/", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)",
  ],
};
