import { notFound } from "next/navigation";
import ProductForm from "../../../components/ProductForm";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const { id } = await params;

  assertSupabaseConfigured();

  const { data: product, error } = await supabaseAdmin!
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      category,
      expected_age,
      size,
      temperament,
      price,
      quantity,
      main_image,
      video,
      status
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load product:", error);
    throw new Error(error.message);
  }

  if (!product) {
    notFound();
  }

  const { data: images, error: imagesError } =
    await supabaseAdmin!
      .from("product_images")
      .select("image_url")
      .eq("product_id", id)
      .order("sort_order", {
        ascending: true,
      });

  if (imagesError) {
    console.error(
      "Failed to load product images:",
      imagesError
    );
  }

  return (
    <div>
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
            <span>لوحة التحكم</span>
            <span>/</span>
            <span>المنتجات</span>
            <span>/</span>
            <span className="text-zinc-600">تعديل المنتج</span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
                تعديل المنتج
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                عدّل بيانات المنتج والعرض والمرئيات من نفس الصفحة.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-zinc-200 bg-zinc-50/50 p-3 sm:p-5 lg:p-6">
          <ProductForm
            initial={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              description: product.description || "",
              category: product.category || "",
              expected_age: product.expected_age || "",
              size: product.size || "",
              temperament: product.temperament || "",
              price: Number(product.price) || 0,
              quantity: Number(product.quantity) || 0,
              main_image: product.main_image || null,
              video: product.video || null,
              status: product.status,
              additional_images:
                images?.map(
                  (image) => image.image_url
                ) || [],
            }}
          />
        </div>
      </div>
    </div>
  );
}
