import Link from "next/link";
import Image from "next/image";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  assertSupabaseConfigured();

  const { data: categories, error } =
    await supabaseAdmin!
      .from("categories")
      .select("id, name, slug, image, created_at")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);

    return (
      <div
        dir="rtl"
        className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"
      >
        حدث خطأ أثناء تحميل التصنيفات.
      </div>
    );
  }

  const items = categories || [];

  return (
    <div dir="rtl" className="space-y-8 pb-10">
      {/* Header */}
      <section className="flex flex-col gap-5 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-xl text-white shadow-sm">
            ◈
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              التصنيفات
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              تنظيم منتجات المتجر وإدارة التصنيفات.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600">
            {items.length} تصنيف
          </div>

          <Link
            href="/admin/categories/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800"
          >
            <span className="text-lg leading-none">+</span>
            إضافة تصنيف
          </Link>
        </div>
      </section>

      {/* Empty State */}
      {items.length === 0 ? (
        <section className="rounded-[28px] border border-zinc-200 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
            ◈
          </div>

          <h2 className="mt-5 text-lg font-bold text-zinc-950">
            لا توجد تصنيفات
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            ابدأ بإضافة أول تصنيف للمتجر.
          </p>

          <Link
            href="/admin/categories/new"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 text-sm font-bold text-white"
          >
            <span className="text-lg">+</span>
            إضافة أول تصنيف
          </Link>
        </section>
      ) : (
        /* Categories */
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((category: any) => (
            <div
              key={category.id}
              className="group overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">
                    🦜
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-bold text-zinc-950">
                      {category.name}
                    </h2>

                    <p className="mt-2 truncate text-xs text-zinc-400">
                      /{category.slug}
                    </p>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-xs text-zinc-500">
                    ◈
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
