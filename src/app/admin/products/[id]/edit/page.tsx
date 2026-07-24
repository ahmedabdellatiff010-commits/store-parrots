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
      <h1 className="text-2xl font-bold text-zinc-900">
        تعديل المنتج
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        تعديل بيانات المنتج.
      </p>

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
  );
}
