import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";
import { validateRedirect } from "@/lib/auth/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "البريد الإلكتروني وكلمة المرور مطلوبان",
        },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          error: "إعدادات Supabase غير مكتملة",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const {
      data: authData,
      error: authError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (
      authError ||
      !authData.user ||
      !authData.session
    ) {
      console.error("Login error:", authError);

      return NextResponse.json(
        {
          error:
            "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        },
        { status: 401 }
      );
    }

    // التأكد أن المستخدم Admin
    assertSupabaseConfigured();

    const {
      data: admin,
      error: adminError,
    } = await supabaseAdmin!
      .from("admins")
      .select("user_id")
      .eq("user_id", authData.user.id)
      .maybeSingle();

    if (adminError) {
      console.error(
        "Admin lookup error:",
        adminError
      );

      return NextResponse.json(
        {
          error:
            "تعذر التحقق من صلاحيات الإدارة",
        },
        { status: 500 }
      );
    }

    if (!admin) {
      return NextResponse.json(
        {
          error:
            "هذا الحساب ليس لديه صلاحية الدخول للوحة التحكم",
        },
        { status: 403 }
      );
    }

    const next = validateRedirect(
      String(body.next || "/admin")
    );

    const response = NextResponse.json({
      success: true,
      next,
    });

    response.cookies.set({
      name: "admin_access_token",
      value: authData.session.access_token,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "حدث خطأ أثناء تسجيل الدخول",
      },
      { status: 500 }
    );
  }
}