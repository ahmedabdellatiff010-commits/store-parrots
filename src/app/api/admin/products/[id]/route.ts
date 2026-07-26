import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";
import { getUserFromToken } from "@/lib/auth/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type ProductPayload = {
  slug?: string;
  name?: string;
  description?: string;
  category?: string;
  expected_age?: string;
  size?: string;
  temperament?: string;
  price?: number | string;
  quantity?: number | string;
  main_image?: string | null;
  video?: string | null;
  status?: "available" | "sold" | "hidden";
  images?: string[];
};

export async function PUT(
  req: Request,
  context: RouteContext
) {
  try {
    assertSupabaseConfigured();

    const { id } = await context.params;

    const body =
      (await req.json()) as ProductPayload;

    const {
      slug,
      name,
      description,
      category,
      expected_age,
      size,
      temperament,
      price,
      quantity,
      main_image,
      video,
      status,
      images,
    } = body;

    if (!name?.trim() || !slug?.trim()) {
      return NextResponse.json(
        {
          error: "اسم المنتج والرابط مطلوبان",
        },
        { status: 400 }
      );
    }

    /*
     * التأكد أن المنتج موجود
     */
    const {
      data: existingProduct,
      error: existingProductError,
    } = await supabaseAdmin!
      .from("products")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (
      existingProductError ||
      !existingProduct
    ) {
      return NextResponse.json(
        {
          error: "المنتج غير موجود",
        },
        { status: 404 }
      );
    }

    /*
     * تحديث بيانات المنتج
     */
    const updateData = {
      slug: slug.trim(),
      name: name.trim(),
      description: description?.trim() || "",
      category: category?.trim() || "",
      expected_age:
        expected_age?.trim() || "",
      size: size?.trim() || "",
      temperament:
        temperament?.trim() || "",
      price: Math.max(
        0,
        Number(price) || 0
      ),
      quantity: Math.max(
        0,
        Number(quantity) || 0
      ),
      main_image:
        main_image ||
        (Array.isArray(images) &&
        images.length > 0
          ? images[0]
          : null),
      video: video?.trim() || null,
      status: status || "available",
      updated_at:
        new Date().toISOString(),
    };

    const {
      data: product,
      error: productError,
    } = await supabaseAdmin!
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (productError) {
      return NextResponse.json(
        {
          error: productError.message,
        },
        { status: 400 }
      );
    }

    /*
     * إذا تم إرسال images
     * نحذف الصور القديمة ونضيف الجديدة
     */
    if (Array.isArray(images)) {
      const {
        error: deleteImagesError,
      } = await supabaseAdmin!
        .from("product_images")
        .delete()
        .eq("product_id", id);

      if (deleteImagesError) {
        return NextResponse.json(
          {
            error:
              deleteImagesError.message,
          },
          { status: 400 }
        );
      }

      if (images.length > 0) {
        const imageRows =
          images.map(
            (
              image_url: string,
              index: number
            ) => ({
              product_id: id,
              image_url,
              sort_order: index,
            })
          );

        const {
          error: insertImagesError,
        } = await supabaseAdmin!
          .from("product_images")
          .insert(imageRows);

        if (insertImagesError) {
          return NextResponse.json(
            {
              error:
                insertImagesError.message,
            },
            { status: 400 }
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update product",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: RouteContext
) {
  try {
    assertSupabaseConfigured();

    const { id } = await context.params;

    const {
      data: existingProduct,
      error: existingError,
    } = await supabaseAdmin!
      .from("products")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (
      existingError ||
      !existingProduct
    ) {
      return NextResponse.json(
        {
          error: "المنتج غير موجود",
        },
        { status: 404 }
      );
    }

    /*
     * حذف المنتج.
     *
     * product_images مرتبط بـ products
     * بـ ON DELETE CASCADE
     * لذلك الصور من قاعدة البيانات
     * ستتحذف تلقائيًا.
     */
    const { error } =
      await supabaseAdmin!
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
