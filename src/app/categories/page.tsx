import Link from "next/link";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

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

            <span className="font-medium text-white">
              الأقسام
            </span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="border-b border-white/20 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl">
              🦜
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              تصفح الأقسام
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              اكتشف مجموعتنا المختارة من الببغاوات
              وتصفح الأقسام المختلفة للعثور على
              الببغاء المناسب لك.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-3">
            <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5">
              <span className="text-sm font-bold text-white">
                {categoryList.length}
              </span>

              <span className="mr-1 text-xs text-white/60">
                قسم متاح
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {categoryList.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/5 px-6 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl">
              🦜
            </div>

            <h2 className="mt-6 text-xl font-bold text-white">
              لا توجد أقسام حاليًا
            </h2>

            <p className="mt-3 text-sm text-white/70">
              لم تتم إضافة أي أقسام للمتجر حتى الآن.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/30"
            >
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-white/10">
                  {category.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-4xl shadow-sm">
                        🦜
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  {/* Arrow */}
                  <div className="absolute bottom-4 left-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    ←
                  </div>
                </div>

                {/* Content */}
                <div className="flex items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-white">
                      {category.name}
                    </h2>

                    <p className="mt-1 text-xs text-white/60">
                      اكتشف المنتجات
                    </p>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/60 transition group-hover:bg-white/30 group-hover:text-white">
                    ←
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}