import { NextResponse } from "next/server";

// 未使用となった当サイトへの全リクエストを、本番サイトへ恒久リダイレクト(308)する。
// 静的ファイルより先に評価されるため、既存ページも含めて確実にリダイレクトされる。
export function middleware() {
  return NextResponse.redirect("https://mitsukeru-kun.pro/", 308);
}

export const config = {
  matcher: "/:path*",
};
