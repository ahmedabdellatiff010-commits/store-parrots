import Link from "next/link";
import { notFound } from "next/navigation";

import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

import { getProductsByCategory } from "@/app/lib/products";
import ProductGrid from "@/app/components/ProductGrid";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
export const dynamic = "force-dynamic";

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
      className="min-h-screen bg-black text-white"
    >
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="border-b border-white/[0.08] pt-[88px]">
        <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-6 sm:px-10 sm:pb-14 lg:px-14 xl:px-20">
          {/* Breadcrumb */}

          <nav
            aria-label="مسار التنقل"
            className="flex items-center gap-2 text-[11px] text-white/35"
          >
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-white/80"
            >
              الرئيسية
            </Link>

            <span className="text-white/15">
              /
            </span>

            <Link
              href="/categories"
              className="transition-colors duration-300 hover:text-white/80"
            >
              الأقسام
            </Link>

            <span className="text-white/15">
              /
            </span>

            <span className="text-white/65">
              {category.name}
            </span>
          </nav>

          {/* Header Content */}

          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Link
                href="/categories"
                className="group mb-5 inline-flex items-center gap-3 text-[11px] font-medium text-white/40 transition-colors duration-300 hover:text-white"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  →
                </span>

                <span>
                  جميع الأقسام
                </span>
              </Link>

              <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                {category.name}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/45 sm:text-[15px]">
                اكتشف الببغاوات المتاحة حاليًا
                في هذا القسم واختر الطائر
                المناسب لك.
              </p>
            </div>

            {/* Products Count */}

            <div className="flex items-center gap-4 border-t border-white/10 pt-5 md:min-w-[170px] md:border-t-0 md:border-r md:pr-6 md:pt-0">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/30">
                  المنتجات
                </p>

                <p className="mt-1 text-2xl font-medium text-white">
                  {products.length}
                </p>
              </div>

              <span className="text-xs text-white/30">
                منتج
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS SECTION
      ====================================================== */}

      <section className="mx-auto max-w-[1600px] px-6 py-8 sm:px-10 sm:py-12 lg:px-14 xl:px-20">
        {products.length === 0 ? (
          /* =================================================
             EMPTY STATE
          ================================================== */

          <div className="flex min-h-[440px] items-center justify-center border border-white/[0.08] bg-[#0b0b0b] px-6">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-white/10 text-white/35">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                </svg>
              </div>

              <h2 className="mt-7 text-xl font-medium text-white">
                لا توجد منتجات حاليًا
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/40">
                لا توجد ببغاوات متاحة حاليًا
                في قسم {category.name}.
                يمكنك العودة لاحقًا لمشاهدة
                المنتجات الجديدة.
              </p>

              <Link
                href="/categories"
                className="mt-7 inline-flex h-11 items-center justify-center border border-white/20 px-7 text-xs font-medium text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                تصفح جميع الأقسام
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* =================================================
                TOOLBAR
            ================================================== */}

            <div className="mb-8 flex flex-col gap-5 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Product Count */}

              <div>
                <p className="text-sm text-white/70">
                  {products.length} منتج
                </p>

                <p className="mt-1 text-[11px] text-white/30">
                  اختر المنتج المناسب لك
                </p>
              </div>

              {/* Sort */}

              <div className="flex flex-wrap items-center gap-2">
                <span className="ml-2 text-[10px] text-white/30">
                  ترتيب حسب
                </span>

                <Link
                  href={`/categories/${category.slug}`}
                  className={`border px-4 py-2.5 text-[11px] transition-all duration-300 ${
                    !sort ||
                    sort === "newest"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-transparent text-white/45 hover:border-white/30 hover:text-white"
                  }`}
                >
                  الأحدث
                </Link>

                <Link
                  href={`/categories/${category.slug}?sort=price-low`}
                  className={`border px-4 py-2.5 text-[11px] transition-all duration-300 ${
                    sort === "price-low"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-transparent text-white/45 hover:border-white/30 hover:text-white"
                  }`}
                >
                  الأقل سعرًا
                </Link>

                <Link
                  href={`/categories/${category.slug}?sort=price-high`}
                  className={`border px-4 py-2.5 text-[11px] transition-all duration-300 ${
                    sort === "price-high"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-transparent text-white/45 hover:border-white/30 hover:text-white"
                  }`}
                >
                  الأعلى سعرًا
                </Link>
              </div>
            </div>

            {/* =================================================
                PRODUCT GRID
            ================================================== */}

            <ProductGrid
              products={sortedProducts}
            />
          </>
        )}
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </main>
  );
}