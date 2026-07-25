import Link from "next/link";
import { notFound } from "next/navigation";

import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

import { getProductsByCategory } from "@/app/lib/products";
import ProductGrid from "@/app/components/ProductGrid";

type Params = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

async function getCategory(
  slug: string
): Promise<Category | null> {
  assertSupabaseConfigured();

  const decodedSlug = decodeURIComponent(slug);

  const candidates = [
    slug,
    decodedSlug,
    slug.replace(/-/g, " "),
    decodedSlug.replace(/-/g, " "),
  ];

  for (const candidate of candidates) {
    const { data, error } = await supabaseAdmin!
      .from("categories")
      .select("id, name, slug")
      .eq("slug", candidate)
      .maybeSingle();

    if (error) {
      console.error(
        "Failed to fetch category:",
        error
      );
    }

    if (data) {
      return data as Category;
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: Params) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "القسم غير موجود | نوادر الببغاوات",
      description:
        "القسم المطلوب غير موجود في متجر نوادر الببغاوات.",
    };
  }

  return {
    title: `${category.name} | نوادر الببغاوات`,
    description: `اكتشف أفضل وأجمل الببغاوات المتاحة في قسم ${category.name} لدى نوادر الببغاوات.`,
    openGraph: {
      title: `${category.name} | نوادر الببغاوات`,
      description: `اكتشف الببغاوات المتاحة في قسم ${category.name}.`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: Params) {
  const { slug } = await params;
  const { sort } = await searchParams;

  if (!slug?.trim()) {
    notFound();
  }

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(
    category.slug,
    100
  );

  const sortedProducts = [...products];

  if (sort === "price-low") {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-high") {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-black"
    >
      {/* Breadcrumb */}
      <div className="border-b border-white/20 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-white/60 transition hover:text-white"
            >
              الرئيسية
            </Link>

            <span className="text-white/30">
              /
            </span>

            <Link
              href="/categories"
              className="text-white/60 transition hover:text-white"
            >
              الأقسام
            </Link>

            <span className="text-white/30">
              /
            </span>

            <span className="font-medium text-white">
              {category.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <section className="border-b border-white/20 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link
                href="/categories"
                className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
              >
                <span>←</span>
                جميع الأقسام
              </Link>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {category.name}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                اكتشف مجموعتنا المختارة من الببغاوات
                المتاحة في قسم {category.name}.
              </p>
            </div>

            <div className="flex h-14 w-fit items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg">
                🦜
              </div>

              <div>
                <p className="text-xs font-medium text-white/60">
                  المنتجات المتاحة
                </p>

                <p className="mt-0.5 text-lg font-bold text-white">
                  {products.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {products.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/5 px-6 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl">
              🦜
            </div>

            <h2 className="mt-6 text-xl font-bold text-white">
              لا توجد منتجات في هذا القسم
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
              لا توجد ببغاوات متاحة حاليًا في قسم{" "}
              {category.name}. يمكنك العودة لاحقًا
              لمشاهدة المنتجات الجديدة.
            </p>

            <Link
              href="/categories"
              className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/30 active:scale-[0.98]"
            >
              تصفح جميع الأقسام
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/5 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-white">
                  {products.length} منتج
                </p>

                <p className="mt-1 text-xs text-white/60">
                  اختر المنتج المناسب لك
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="ml-2 text-xs font-medium text-white/60">
                  ترتيب حسب:
                </span>

                <Link
                  href={`/categories/${category.slug}`}
                  className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                    !sort ||
                    sort === "newest"
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  الأحدث
                </Link>

                <Link
                  href={`/categories/${category.slug}?sort=price-low`}
                  className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                    sort === "price-low"
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  الأقل سعرًا
                </Link>

                <Link
                  href={`/categories/${category.slug}?sort=price-high`}
                  className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                    sort === "price-high"
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  الأعلى سعرًا
                </Link>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={sortedProducts}
            />
          </>
        )}
      </section>
    </main>
  );
}