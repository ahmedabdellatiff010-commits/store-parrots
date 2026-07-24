import { NextResponse } from "next/server";
import { assertSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/server";

type ProductPayload = {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
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

export async function GET() {
  try {
    assertSupabaseConfigured();

    const { data, error } = await supabaseAdmin!
      .from("products")
      .select(`
        id,
        slug,
        name,
        description,
        expected_age,
        size,
        temperament,
        price,
        quantity,
        main_image,
        video,
        status,
        created_at,
        updated_at,
        product_images (
          id,
          image_url,
          sort_order
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: data || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    assertSupabaseConfigured();

    const body = (await req.json()) as ProductPayload;

    const {
      id,
      slug,
      name,
      description,
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

    if (!id || !slug || !name) {
      return NextResponse.json(
        {
          error: "id, slug and name are required",
        },
        { status: 400 }
      );
    }

    const { data: product, error: productError } =
      await supabaseAdmin!
        .from("products")
        .insert({
          id,
          slug,
          name,
          description: description || "",
          expected_age: expected_age || "",
          size: size || "",
          temperament: temperament || "",
          price: Number(price) || 0,
          quantity: Math.max(0, Number(quantity) || 0),
          main_image:
            main_image ||
            (Array.isArray(images) ? images[0] : null) ||
            null,
          video: video || null,
          status: status || "available",
        })
        .select()
        .single();

    if (productError) {
      return NextResponse.json(
        { error: productError.message },
        { status: 400 }
      );
    }

    if (Array.isArray(images) && images.length > 0) {
      const imageRows = images.map(
        (image_url: string, index: number) => ({
          product_id: product.id,
          image_url,
          sort_order: index,
        })
      );

      const { error: imagesError } =
        await supabaseAdmin!
          .from("product_images")
          .insert(imageRows);

      if (imagesError) {
        await supabaseAdmin!
          .from("products")
          .delete()
          .eq("id", product.id);

        return NextResponse.json(
          { error: imagesError.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create product",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    assertSupabaseConfigured();

    const body = (await req.json()) as ProductPayload;

    const {
      id,
      slug,
      name,
      description,
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

    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400 }
      );
    }

    const { data: existingProduct, error: existingError } =
      await supabaseAdmin!
        .from("products")
        .select("id")
        .eq("id", id)
        .single();

    if (existingError || !existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const updateData = {
      ...(slug !== undefined && { slug }),
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(expected_age !== undefined && {
        expected_age,
      }),
      ...(size !== undefined && { size }),
      ...(temperament !== undefined && {
        temperament,
      }),
      ...(price !== undefined && {
        price: Number(price) || 0,
      }),
      ...(quantity !== undefined && {
        quantity: Math.max(0, Number(quantity) || 0),
      }),
      ...(main_image !== undefined && {
        main_image,
      }),
      ...(video !== undefined && {
        video: video || null,
      }),
      ...(status !== undefined && { status }),
      updated_at: new Date().toISOString(),
    };

    const { data: product, error: productError } =
      await supabaseAdmin!
        .from("products")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (productError) {
      return NextResponse.json(
        { error: productError.message },
        { status: 400 }
      );
    }

    if (Array.isArray(images)) {
      const { error: deleteImagesError } =
        await supabaseAdmin!
          .from("product_images")
          .delete()
          .eq("product_id", id);

      if (deleteImagesError) {
        return NextResponse.json(
          { error: deleteImagesError.message },
          { status: 400 }
        );
      }

      if (images.length > 0) {
        const imageRows = images.map(
          (image_url: string, index: number) => ({
            product_id: id,
            image_url,
            sort_order: index,
          })
        );

        const { error: insertImagesError } =
          await supabaseAdmin!
            .from("product_images")
            .insert(imageRows);

        if (insertImagesError) {
          return NextResponse.json(
            { error: insertImagesError.message },
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400 }
      );
    }

    assertSupabaseConfigured();

    const { error } = await supabaseAdmin!
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
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
