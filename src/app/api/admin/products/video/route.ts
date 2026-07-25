import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { assertSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    assertSupabaseConfigured();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "لم يتم اختيار فيديو" }, { status: 400 });
    }

    if (!ALLOWED_CONTENT_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "صيغة الفيديو غير مدعومة" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "حجم الفيديو كبير جدًا. الحد الأقصى 100MB" }, { status: 400 });
    }

    const extension = file.type === "video/mp4" ? "mp4" : file.type === "video/webm" ? "webm" : "mov";
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `products/videos/${fileName}`;
    const buffer = await file.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin!.storage.from("product-videos").upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    const { data: { publicUrl } } = supabaseAdmin!.storage.from("product-videos").getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "فشل رفع الفيديو" }, { status: 500 });
  }
}
