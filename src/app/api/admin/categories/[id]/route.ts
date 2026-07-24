import { NextResponse } from "next/server";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    assertSupabaseConfigured();

    const { id } = await context.params;

    const formData = await request.formData();
    const method = String(formData.get("_method") || "");

    if (method !== "DELETE") {
      return NextResponse.json(
        {
          error: "طريقة الطلب غير صحيحة",
        },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin!
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete category error:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/categories", request.url)
    );
  } catch (error) {
    console.error("Category DELETE error:", error);

    return NextResponse.json(
      {
        error: "حدث خطأ أثناء حذف التصنيف",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    assertSupabaseConfigured();

    const { id } = await context.params;

    const { data: category, error: fetchError } =
      await supabaseAdmin!
        .from("categories")
        .select("id, slug, image")
        .eq("id", id)
        .maybeSingle();

    if (fetchError || !category) {
      return NextResponse.json(
        { error: "التصنيف غير موجود" },
        { status: 404 }
      );
    }

    // Check if any products use this category (by slug)
    const { data: productsUsingCategory, error: productsError } =
      await supabaseAdmin!
        .from("products")
        .select("id")
        .eq("category", category.slug)
        .limit(1);

    if (productsError) {
      return NextResponse.json(
        { error: productsError.message || "فشل التحقق من استخدام التصنيف" },
        { status: 400 }
      );
    }

    if ((productsUsingCategory || []).length > 0) {
      return NextResponse.json(
        {
          error: "لا يمكن حذف التصنيف لأن هناك منتجات مرتبطة به حاليًا",
        },
        { status: 409 }
      );
    }

    const { error } = await supabaseAdmin!
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message || "فشل حذف التصنيف" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Category DELETE error:", error);

    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف التصنيف" },
      { status: 500 }
    );
  }
}