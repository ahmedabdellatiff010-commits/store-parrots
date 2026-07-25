import { unstable_noStore } from "next/cache";
import type { Product } from "@/app/types/product";
import { supabaseAdmin } from "@/lib/supabase/admin";

type SupabaseProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  expected_age: string | null;
  size: string | null;
  temperament: string | null;
  price: number | string;
  quantity: number;
  main_image: string | null;
  video: string | null;
  status: "available" | "sold" | "hidden";
  category?: string | null;
  created_at?: string;
  product_images?: {
    id: string;
    image_url: string;
    sort_order: number;
  }[];
};

function mapProduct(product: SupabaseProduct): Product {
  const galleryImages = (product.product_images || [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => image.image_url);

  const images =
    galleryImages.length > 0
      ? galleryImages
      : product.main_image
        ? [product.main_image]
        : [];

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    expectedAge: product.expected_age || "",
    size: product.size || "",
    temperament: product.temperament || "",
    price: Number(product.price) || 0,
    quantity: Number(product.quantity) || 0,
    images,
    video: product.video || undefined,
    status: product.status,
  };
}

/**
 * Get all available products.
 *
 * noStore مهم جدًا هنا:
 * يمنع Next.js من الاحتفاظ بنتيجة المنتجات القديمة
 * ويجبر الصفحة على قراءة آخر بيانات من Supabase.
 */
export async function getAllProducts(): Promise<Product[]> {
  unstable_noStore();

  if (!supabaseAdmin) {
    console.error("Supabase admin client is not configured.");
    return [];
  }

  const { data, error } = await supabaseAdmin
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
      product_images (
        id,
        image_url,
        sort_order
      )
    `)
    .eq("status", "available")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Failed to fetch products:",
      error
    );

    return [];
  }

  return (data || []).map((product) =>
    mapProduct(product as SupabaseProduct)
  );
}

/**
 * Get one product by slug.
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  unstable_noStore();

  if (!supabaseAdmin) {
    console.error("Supabase admin client is not configured.");
    return undefined;
  }

  const cleanSlug = decodeURIComponent(slug).trim();

  const { data, error } = await supabaseAdmin
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
      product_images (
        id,
        image_url,
        sort_order
      )
    `)
    .eq("slug", cleanSlug)
    .eq("status", "available")
    .maybeSingle();

  if (error) {
    console.error(
      "Failed to fetch product:",
      error
    );

    return undefined;
  }

  if (!data) {
    return undefined;
  }

  return mapProduct(
    data as SupabaseProduct
  );
}

/**
 * Get products by category.
 */
export async function getProductsByCategory(
  slug: string,
  limit = 100
): Promise<Product[]> {
  unstable_noStore();

  if (!supabaseAdmin) {
    console.error("Supabase admin client is not configured.");
    return [];
  }

  const cleanSlug = decodeURIComponent(slug).trim();

  const { data, error } = await supabaseAdmin
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
      category,
      created_at,
      product_images (
        id,
        image_url,
        sort_order
      )
    `)
    .eq("status", "available")
    .eq("category", cleanSlug)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "Failed to fetch products by category:",
      error
    );

    return [];
  }

  return (data || []).map((product) =>
    mapProduct(product as SupabaseProduct)
  );
}