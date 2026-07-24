import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  // مهم: لازم نطلب المستخدم الحالي من Supabase
  // عشان الـ session تتحدث تلقائيًا لو محتاجة refresh.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // صفحة تسجيل الدخول متاحة للجميع
  if (pathname === "/admin/login") {
    return response;
  }

  // حماية كل صفحات لوحة التحكم
  if (pathname.startsWith("/admin")) {
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
