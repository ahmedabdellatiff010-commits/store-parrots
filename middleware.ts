import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login page is public.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect everything under /admin.
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_access_token")?.value;

    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
