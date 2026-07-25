import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function PUT(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "معرف القسم غير موجود",
        },
        {
          status: 400,
        }
      );
    }

    const user = await verifyAdmin();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
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

    const imageFile = formData.get("image");

    if (!name) {
      return NextResponse.json(
        {
          error: "اسم القسم مطلوب",
        },
        {
          status: 400,
        }
      );
    }

    if (!slug) {
      return NextResponse.json(
        {
          error: "Slug القسم مطلوب",
        },
        {
          status: 400,
        }
      );
    }

    slug = slug
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u0600-\u06ff-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!slug) {
      return NextResponse.json(
        {
          error: "Slug غير صالح",
        },
        {
          status: 400,
        }
      );
    }

    // التأكد أن القسم موجود
    const {
      data: currentCategory,
      error: currentCategoryError,
    } = await supabaseAdmin!
      .from("categories")
      .select(
        "id, name, slug, image, created_at"
      )
      .eq("id", id)
      .maybeSingle();

    if (currentCategoryError) {
      console.error(
        "Load category for update error:",
        currentCategoryError
      );

      return NextResponse.json(
        {
          error:
            currentCategoryError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!currentCategory) {
      return NextResponse.json(
        {
          error: "القسم غير موجود",
        },
        {
          status: 404,
        }
      );
    }

    // التأكد أن الـ slug الجديد غير مستخدم
    // في قسم آخر
    const {
      data: duplicateCategory,
      error: duplicateError,
    } = await supabaseAdmin!
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .maybeSingle();

    if (duplicateError) {
      console.error(
        "Check duplicate slug error:",
        duplicateError
      );

      return NextResponse.json(
        {
          error:
            duplicateError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (duplicateCategory) {
      return NextResponse.json(
        {
          error:
            "هذا الـ Slug مستخدم بالفعل في قسم آخر",
        },
        {
          status: 409,
        }
      );
    }

    let imageUrl =
      currentCategory.image;

    // لو المستخدم رفع صورة جديدة
    if (
      imageFile &&
      imageFile instanceof File &&
      imageFile.size > 0
    ) {
      const bucketName =
        "product-images";

      const extension =
        imageFile.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const fileName =
        `categories/${crypto.randomUUID()}.${extension}`;

      const arrayBuffer =
        await imageFile.arrayBuffer();

      const buffer =
        Buffer.from(arrayBuffer);

      const {
        error: uploadError,
      } = await supabaseAdmin!.storage
        .from(bucketName)
        .upload(
          fileName,
          buffer,
          {
            contentType:
              imageFile.type ||
              "image/jpeg",
            upsert: false,
          }
        );

      if (uploadError) {
        console.error(
          "Category image upload error:",
          uploadError
        );

        return NextResponse.json(
          {
            error:
              uploadError.message ||
              "فشل رفع صورة القسم الجديدة",
          },
          {
            status: 500,
          }
        );
      }

      const {
        data: publicUrlData,
      } =
        supabaseAdmin!.storage
          .from(bucketName)
          .getPublicUrl(
            fileName
          );

      imageUrl =
        publicUrlData.publicUrl;
    }

    // تحديث القسم
    const {
      data: updatedCategory,
      error: updateError,
    } =
      await supabaseAdmin!
        .from("categories")
        .update({
          name,
          slug,
          image: imageUrl,
        })
        .eq("id", id)
        .select(
          "id, name, slug, image, created_at"
        )
        .single();

    if (updateError) {
      console.error(
        "Update category error:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            updateError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        category: updatedCategory,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Category PUT error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "حدث خطأ أثناء تعديل القسم",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "معرف القسم غير موجود",
        },
        {
          status: 400,
        }
      );
    }

    const user = await verifyAdmin();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    assertSupabaseConfigured();

    const {
      data: category,
      error: categoryError,
    } =
      await supabaseAdmin!
        .from("categories")
        .select(
          "id, image"
        )
        .eq("id", id)
        .maybeSingle();

    if (categoryError) {
      return NextResponse.json(
        {
          error:
            categoryError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!category) {
      return NextResponse.json(
        {
          error:
            "القسم غير موجود",
        },
        {
          status: 404,
        }
      );
    }

    const {
      error: deleteError,
    } = await supabaseAdmin!
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        {
          error:
            deleteError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Delete category error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "حدث خطأ أثناء حذف القسم",
      },
      {
        status: 500,
      }
    );
  }
}