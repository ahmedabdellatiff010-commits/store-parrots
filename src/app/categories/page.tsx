import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";
export const dynamic = "force-dynamic";

type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
};

export const metadata = {
  title: "أقسام الببغاوات | نوادر الببغاوات",
  description:
    "تصفح جميع أقسام الببغاوات المتاحة في متجر نوادر الببغاوات واكتشف مجموعتنا المختارة.",
};

export default async function CategoriesPage() {
  assertSupabaseConfigured();

  const { data: categories, error } =
    await supabaseAdmin!
      .from("categories")
      .select("id, name, slug, image")
      .order("name", {
        ascending: true,
      });

  if (error) {
    console.error(
      "Failed to fetch categories:",
      error
    );
  }

  const categoryList =
    (categories || []) as Category[];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0b0b0b] text-white"
    >
      <Navbar />

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1600px] px-6 pb-12 pt-32 sm:px-10 sm:pb-14 sm:pt-36 lg:px-14 lg:pb-16 lg:pt-40 xl:px-20">
          {/* Breadcrumb */}

          <nav
            aria-label="مسار التنقل"
            className="flex items-center gap-3 text-[11px] text-white/35"
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

            <span className="text-white/70">
              الأقسام
            </span>
          </nav>

          {/* Header Content */}

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-[10px] font-medium tracking-[0.3em] text-white/30">
                استكشف مجموعتنا
              </span>

              <h1 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                أقسام الببغاوات
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-[15px]">
                تصفح مجموعتنا من الببغاوات واكتشف
                الأقسام المختلفة للعثور على الطائر
                المناسب لك.
              </p>
            </div>

            {/* Category Count */}

            <div className="flex items-center gap-3 text-xs text-white/35">
              <span className="h-px w-8 bg-white/20" />

              <span>
                {categoryList.length} قسم متاح
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section>
        <div className="mx-auto max-w-[1600px] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 xl:px-20">
          {categoryList.length === 0 ? (
            /* =================================================
               EMPTY STATE
            ================================================== */

            <div className="flex min-h-[420px] items-center justify-center border-y border-white/[0.08]">
              <div className="max-w-md px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl">
                  🦜
                </div>

                <h2 className="mt-6 text-lg font-medium text-white">
                  لا توجد أقسام حاليًا
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  لم تتم إضافة أي أقسام للمتجر
                  حتى الآن.
                </p>

                <Link
                  href="/"
                  className="mt-7 inline-flex h-11 items-center justify-center border border-white/15 bg-white px-6 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Section Header */}

              <div className="mb-8 flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-xs text-white/35">
                    تصفح حسب القسم
                  </p>

                  <h2 className="mt-2 text-lg font-medium text-white">
                    جميع الأقسام
                  </h2>
                </div>

                <span className="text-[10px] tracking-[0.2em] text-white/25">
                  COLLECTIONS
                </span>
              </div>

              {/* Categories Grid */}

              <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
                {categoryList.map(
                  (category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="group relative bg-[#0b0b0b] transition-colors duration-500 hover:bg-[#111111]"
                    >
                      {/* Image */}

                      <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                        {category.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover opacity-90 transition duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#111111]">
                            <span className="text-4xl opacity-30">
                              🦜
                            </span>
                          </div>
                        )}

                        {/* Subtle Overlay */}

                        <div className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

                        {/* Number */}

                        <span className="absolute left-5 top-5 text-[10px] tabular-nums tracking-wider text-white/50">
                          {String(
                            categoryList.indexOf(
                              category
                            ) + 1
                          ).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content */}

                      <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6 sm:py-6">
                        <div className="min-w-0">
                          <h2 className="truncate text-base font-medium text-white transition-transform duration-300 group-hover:-translate-x-1">
                            {category.name}
                          </h2>

                          <p className="mt-2 text-[11px] text-white/30">
                            اكتشف المجموعة
                          </p>
                        </div>

                        {/* Arrow */}

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-sm text-white/35 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-white/30 group-hover:text-white">
                          ←
                        </span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}