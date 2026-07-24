import Image from "next/image";
import Link from "next/link";
import {
  supabaseAdmin,
  assertSupabaseConfigured,
} from "@/lib/supabase/server";

type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
};

export default async function CategoriesSection() {
  assertSupabaseConfigured();

  const { data, error } = await supabaseAdmin!
    .from("categories")
    .select("id, name, slug, image")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Categories error:", error);
  }

  const items: Category[] = data ?? [];

  return (
    <section
      id="categories"
      dir="rtl"
      className="w-full bg-white py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-7 bg-zinc-950" />

              <span className="text-[9px] font-semibold tracking-[0.28em] text-zinc-500">
                EXPLORE COLLECTIONS
              </span>
            </div>

            <h2 className="text-3xl font-semibold leading-[1.15] tracking-[-0.04em] text-zinc-950 sm:text-4xl lg:text-5xl">
              اكتشف عالم
              <br />
              <span className="text-zinc-400">الببغاوات</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-zinc-500 sm:text-base">
            اختر الفئة التي تناسبك واكتشف مجموعة مختارة من الببغاوات بعناية
            لتجد صديقك المثالي.
          </p>
        </div>

        {/* =========================
            CATEGORIES
        ========================== */}

        {items.length === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center border border-zinc-200 bg-zinc-50">
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-900">
                لا توجد فئات متاحة حاليًا
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                سيتم إضافة الفئات قريبًا.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* =========================
                MOBILE
            ========================== */}

            <div className="grid grid-cols-2 gap-3 sm:hidden">
              {/* FIRST LARGE */}

              {items[0] && (
                <CategoryCard
                  category={items[0]}
                  index={0}
                  className="col-span-2 h-[380px]"
                  large
                />
              )}

              {/* SECOND + THIRD */}

              {items.slice(1, 3).map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index + 1}
                  className="h-[220px]"
                />
              ))}

              {/* FOURTH LARGE */}

              {items[3] && (
                <CategoryCard
                  category={items[3]}
                  index={3}
                  className="col-span-2 h-[300px]"
                  large
                />
              )}

              {/* 5 + 6 */}

              {items.slice(4, 6).map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index + 4}
                  className="h-[220px]"
                />
              ))}

              {/* باقي الأقسام */}

              {items.slice(6).map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index + 6}
                  className="h-[220px]"
                />
              ))}
            </div>

            {/* =========================
                DESKTOP
            ========================== */}

            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {items.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  large={index === 0}
                  className={
                    index === 0
                      ? "sm:col-span-2 sm:h-[550px] lg:col-span-2 lg:row-span-2 lg:h-[700px]"
                      : "h-[260px] lg:h-[340px]"
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* =====================================================
   CATEGORY CARD
===================================================== */

function CategoryCard({
  category,
  index,
  className,
  large = false,
}: {
  category: Category;
  index: number;
  className: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/categories/${encodeURIComponent(category.slug)}`}
      className={`group relative block overflow-hidden bg-zinc-100 ${className}`}
    >
      {/* IMAGE */}

      {category.image ? (
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority={index < 2}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
          <span className="text-[9px] tracking-[0.2em] text-zinc-400">
            NO IMAGE
          </span>
        </div>
      )}

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* NUMBER */}

      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-white/30 bg-black/10 backdrop-blur-md">
        <span className="text-[9px] text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ARROW */}

      <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-zinc-950">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </div>

      {/* TEXT */}

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7">
        <p className="mb-2 text-[8px] font-medium tracking-[0.25em] text-white/60">
          COLLECTION
        </p>

        <h3
          className={
            large
              ? "text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl"
              : "text-lg font-semibold leading-tight tracking-[-0.025em] text-white sm:text-xl lg:text-2xl"
          }
        >
          {category.name}
        </h3>
      </div>
    </Link>
  );
}