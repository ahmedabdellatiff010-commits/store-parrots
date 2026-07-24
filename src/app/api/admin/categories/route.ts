import { NextResponse } from "next/server";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/server";

const BUCKET_NAME = "product-images";

export async function GET() {
  try {
    assertSupabaseConfigured();

    const { data, error } = await supabaseAdmin!
      .from("categories")
.select("id, name, slug, image, created_at")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      categories: data || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "فشل تحميل التصنيفات",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    assertSupabaseConfigured();

    const formData = await request.formData();

    const name = String(
      formData.get("name") || ""
    ).trim();

    let slug = String(
      formData.get("slug") || ""
    )
      .trim()
      .toLowerCase();

    // basic slug sanitization: replace spaces with hyphens, remove invalid chars
    slug = slug
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const imageFile = formData.get("image");

    if (!name || !slug) {
      return NextResponse.json(
        {
          error:
            "اسم التصنيف والـ slug مطلوبان",
        },
        { status: 400 }
      );
    }

    if (
      !imageFile ||
      !(imageFile instanceof File) ||
      imageFile.size === 0
    ) {
      return NextResponse.json(
        {
          error:
            "صورة التصنيف مطلوبة",
        },
        { status: 400 }
      );
    }

    // التأكد أن الـ slug غير مستخدم
    const { data: existingCategory } =
      await supabaseAdmin!
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

    if (existingCategory) {
      return NextResponse.json(
        {
          error:
            "هذا الـ slug مستخدم بالفعل. اختر slug مختلف.",
        },
        { status: 409 }
      );
    }

    // تجهيز اسم الصورة
    const extension =
      imageFile.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg";

    const fileName = `categories/${crypto.randomUUID()}.${extension}`;

    // تحويل الصورة
    const arrayBuffer =
      await imageFile.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    // رفع الصورة إلى Supabase Storage
    const { error: uploadError } =
      await supabaseAdmin!.storage
        .from(BUCKET_NAME)
        .upload(fileName, buffer, {
          contentType:
            imageFile.type ||
            "image/jpeg",
          upsert: false,
        });

    if (uploadError) {
      console.error(
        "Category upload error:",
        uploadError
      );

      return NextResponse.json(
        {
          error:
            uploadError.message ||
            "فشل رفع صورة التصنيف",
        },
        { status: 500 }
      );
    }

    // الحصول على رابط الصورة
    const {
      data: publicUrlData,
    } =
      supabaseAdmin!.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

    const imageUrl =
      publicUrlData.publicUrl;

    // إنشاء التصنيف
    const { data, error } =
      await supabaseAdmin!
        .from("categories")
        .insert({
          name,
          slug,
          image: imageUrl,
        })
        .select()
        .single();

    // لو حصل خطأ نحذف الصورة التي تم رفعها
    if (error) {
      await supabaseAdmin!.storage
        .from(BUCKET_NAME)
        .remove([fileName]);

      console.error(
        "Create category error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        category: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Category POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "حدث خطأ أثناء إضافة التصنيف",
      },
      { status: 500 }
    );
  }
}