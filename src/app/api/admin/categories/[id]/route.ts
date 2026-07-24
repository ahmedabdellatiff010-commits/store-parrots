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

export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    assertSupabaseConfigured();

    const { data: category, error: categoryError } =
      await supabaseAdmin!
        .from("categories")
        .select("id")
        .eq("id", id)
        .maybeSingle();

    if (categoryError) {
      return NextResponse.json(
        { error: categoryError.message },
        { status: 500 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "التصنيف غير موجود" },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin!
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
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
            : "حدث خطأ أثناء حذف التصنيف",
      },
      { status: 500 }
    );
  }
}
