import { NextResponse } from "next/server";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    assertSupabaseConfigured();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "لم يتم اختيار صورة" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "الملف يجب أن يكون صورة" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "صيغة الصورة غير مدعومة" },
        { status: 400 }
      );
    }

    const extensionMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };

    const extension = extensionMap[file.type];

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const filePath = `products/${fileName}`;

    const buffer = await file.arrayBuffer();

    const { error: uploadError } =
      await supabaseAdmin!
        .storage
        .from("product-images")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

    if (uploadError) {
      return NextResponse.json(
        {
          error: uploadError.message,
        },
        { status: 400 }
      );
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin!
      .storage
      .from("product-images")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "فشل رفع الصورة",
      },
      { status: 500 }
    );
  }
}
