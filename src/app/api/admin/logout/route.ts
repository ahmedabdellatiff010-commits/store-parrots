import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();

    await supabase.auth.signOut();

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set({
      name: "admin_access_token",
      value: "",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Admin logout error:", error);

    return NextResponse.json(
      {
        error: "فشل تسجيل الخروج",
      },
      {
        status: 500,
      }
    );
  }
}
