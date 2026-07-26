import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";
import { getUserFromToken } from "@/lib/auth/admin";

const BUCKET_NAME = "product-images";

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_access_token")?.value;

  if (!adminToken) {
    return null;
  }

  return getUserFromToken(adminToken);
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    assertSupabaseConfigured();

    const { data, error } = await supabaseAdmin!
      .from("categories")
      .select("id, name, slug, image, created_at")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Failed to load categories:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        categories: data || [],
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Categories GET error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "فشل تحميل التصنيفات",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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
        {
          status: 400,
        }
      );
    }

    if (
      !imageFile ||
      !(imageFile instanceof File) ||
      imageFile.size === 0
    ) {
      return NextResponse.json(
        {
          error: "صورة التصنيف مطلوبة",
        },
        {
          status: 400,
        }
      );
    }

    const { data: existingCategory, error: existingError } =
      await supabaseAdmin!
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        {
          error: existingError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (existingCategory) {
      return NextResponse.json(
        {
          error:
            "هذا الـ slug مستخدم بالفعل. اختر slug مختلف.",
        },
        {
          status: 409,
        }
      );
    }

    const extension =
      imageFile.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg";

    const fileName = `categories/${crypto.randomUUID()}.${extension}`;

    const arrayBuffer =
      await imageFile.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } =
      await supabaseAdmin!.storage
        .from(BUCKET_NAME)
        .upload(fileName, buffer, {
          contentType:
            imageFile.type || "image/jpeg",
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
        {
          status: 500,
        }
      );
    }

    const {
      data: publicUrlData,
    } = supabaseAdmin!.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    const imageUrl =
      publicUrlData.publicUrl;

    const {
      data,
      error,
    } = await supabaseAdmin!
      .from("categories")
      .insert({
        name,
        slug,
        image: imageUrl,
      })
      .select()
      .single();

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
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        category: data,
      },
      {
        status: 201,
      }
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
      {
        status: 500,
      }
    );
  }
}
