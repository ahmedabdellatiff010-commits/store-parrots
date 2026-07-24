import type { Product } from "@/app/types/product";
import { supabaseAdmin } from "@/lib/supabase/server";

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

export async function getAllProducts(): Promise<Product[]> {
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
      product_images (
        id,
        image_url,
        sort_order
      )
    `)
    .eq("status", "available")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }

  return (data || []).map((product) =>
    mapProduct(product as SupabaseProduct)
  );
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
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
      product_images (
        id,
        image_url,
        sort_order
      )
    `)
    .eq("slug", slug)
    .eq("status", "available")
    .maybeSingle();

  if (error || !data) {
    return undefined;
  }

  return mapProduct(data as SupabaseProduct);
}

export async function getProductsByCategory(
  slug: string,
  limit = 100
): Promise<Product[]> {
  const cleanSlug = decodeURIComponent(slug).trim();

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
      category,
      product_images (
        id,
        image_url,
        sort_order
      )
    `)
    .eq("status", "available")
    .eq("category", cleanSlug)
    .order("created_at", { ascending: false })
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

export const WHATSAPP_PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
