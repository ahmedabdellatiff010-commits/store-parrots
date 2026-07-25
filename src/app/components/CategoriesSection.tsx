import AnimatedCategoryCard from "@/app/components/AnimatedCategoryCard";
import {
  supabaseAdmin,
  assertSupabaseConfigured,
} from "@/lib/supabase/admin";

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
      className="w-full bg-[#050712] py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-7 bg-white/40" />

              <span className="text-[9px] font-semibold tracking-[0.28em] text-white/60">
                EXPLORE COLLECTIONS
              </span>
            </div>

            <h2 className="text-3xl font-semibold leading-[1.15] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              اكتشف عالم
              <br />
              <span className="text-zinc-400">الببغاوات</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
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
                <AnimatedCategoryCard
                  category={items[0]}
                  index={0}
                  className="col-span-2 h-[380px]"
                  large
                />
              )}

              {/* SECOND + THIRD */}

              {items.slice(1, 3).map((category, index) => (
                <AnimatedCategoryCard
                  key={category.id}
                  category={category}
                  index={index + 1}
                  className="h-[220px]"
                />
              ))}

              {/* FOURTH LARGE */}

              {items[3] && (
                <AnimatedCategoryCard
                  category={items[3]}
                  index={3}
                  className="col-span-2 h-[300px]"
                  large
                />
              )}

              {/* 5 + 6 */}

              {items.slice(4, 6).map((category, index) => (
                <AnimatedCategoryCard
                  key={category.id}
                  category={category}
                  index={index + 4}
                  className="h-[220px]"
                />
              ))}

              {/* باقي الأقسام */}

              {items.slice(6).map((category, index) => (
                <AnimatedCategoryCard
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
                <AnimatedCategoryCard
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

