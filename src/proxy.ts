import { NextResponse, type NextRequest } from "next/server";
import { getUserFromToken } from "@/lib/auth/admin";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request,
  });

  const adminToken = request.cookies.get(
    "admin_access_token"
  )?.value;

  const { pathname } = request.nextUrl;

  // صفحة تسجيل الدخول متاحة للجميع
  if (pathname === "/admin/login") {
    return response;
  }

  // حماية كل صفحات لوحة التحكم
  if (pathname.startsWith("/admin")) {
    const user = adminToken
      ? await getUserFromToken(adminToken)
      : null;

    if (!user) {
      const loginUrl = request.nextUrl.clone();

      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";

      loginUrl.searchParams.set(
        "next",
        pathname + request.nextUrl.search
      );

      return NextResponse.redirect(
        loginUrl
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
