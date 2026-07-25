import { NextResponse } from "next/server";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

const VIDEO_BUCKET_NAME = "product-videos";

export async function POST(req: Request) {
  try {
    assertSupabaseConfigured();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "لم يتم اختيار فيديو" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "الملف يجب أن يكون فيديو" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-matroska",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "صيغة الفيديو غير مدعومة. استخدم MP4 أو WebM أو MOV أو MKV",
        },
        { status: 400 }
      );
    }

    const maxSize = 100 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error:
            "حجم الفيديو كبير جدًا. الحد الأقصى 100MB",
        },
        { status: 400 }
      );
    }

    const extensionMap: Record<string, string> = {
      "video/mp4": "mp4",
      "video/webm": "webm",
      "video/quicktime": "mov",
      "video/x-matroska": "mkv",
    };

    const extension =
      extensionMap[file.type] || "mp4";

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const filePath = `products/videos/${fileName}`;

    const buffer = await file.arrayBuffer();

    const { error: uploadError } =
      await supabaseAdmin!
        .storage
        .from(VIDEO_BUCKET_NAME)
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
    } =
      supabaseAdmin!
        .storage
        .from(VIDEO_BUCKET_NAME)
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
            : "فشل رفع الفيديو",
      },
      { status: 500 }
    );
  }
}
