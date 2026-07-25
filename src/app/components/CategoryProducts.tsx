"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import ProductGrid from "@/app/components/ProductGrid";
import type { Product } from "@/app/types/product";

type SortOption =
  | "newest"
  | "price-low"
  | "price-high";

type Props = {
  products: Product[];
  categoryName: string;
};

export default function CategoryProducts({
  products,
  categoryName,
}: Props) {
  const [sort, setSort] =
    useState<SortOption>("newest");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [products, sort]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0a0a0a] text-white"
    >
      {/* =====================================================
          NAVBAR SPACE
          Navbar is absolute/fixed, so reserve its height.
      ====================================================== */}

      <div className="h-[88px] w-full" />

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}

      <div className="mx-auto w-full max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-12 xl:px-16">
        {/* ===================================================
            PAGE HEADER
        ==================================================== */}

        <header className="pt-8 sm:pt-12 lg:pt-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* TITLE */}

            <div>
              <p className="mb-3 text-[10px] font-medium tracking-[0.25em] text-white/30">
                تصفح المجموعة
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {categoryName}
              </h1>

              <p className="mt-3 max-w-md text-sm leading-7 text-white/40">
                اكتشف الببغاوات المتاحة في هذه المجموعة
                واختر الطائر المناسب لك.
              </p>
            </div>

            {/* PRODUCT COUNT */}

            <div className="flex items-center gap-3 text-sm text-white/40">
              <span className="h-px w-8 bg-white/20" />

              <span>
                {products.length} منتج
              </span>
            </div>
          </div>
        </header>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="mt-10 sm:mt-14">
          {products.length === 0 ? (
            /* ===============================================
               EMPTY STATE
            ================================================ */

            <section className="flex min-h-[420px] items-center justify-center border-y border-white/10">
              <div className="max-w-md px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl">
                  🦜
                </div>

                <h2 className="mt-6 text-lg font-medium text-white">
                  لا توجد منتجات في هذا القسم
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  لا توجد ببغاوات متاحة حاليًا في قسم{" "}
                  <span className="text-white/65">
                    {categoryName}
                  </span>
                  .
                </p>

                <Link
                  href="/categories"
                  className="mt-7 inline-flex h-11 items-center justify-center border border-white/15 bg-white px-6 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  تصفح جميع الأقسام
                </Link>
              </div>
            </section>
          ) : (
            <>
              {/* ===========================================
                  TOOLBAR
              ============================================ */}

              <div className="mb-8 flex items-center justify-between border-y border-white/10 py-4">
                {/* LEFT */}

                <div className="text-xs text-white/35">
                  عرض{" "}
                  <span className="text-white/65">
                    {sortedProducts.length}
                  </span>{" "}
                  منتج
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort"
                    className="hidden text-xs text-white/30 sm:block"
                  >
                    ترتيب
                  </label>

                  <div className="relative">
                    <select
                      id="sort"
                      value={sort}
                      onChange={(event) =>
                        setSort(
                          event.target.value as SortOption
                        )
                      }
                      className="h-9 min-w-[165px] appearance-none border border-white/10 bg-transparent px-3 pl-8 text-xs text-white/70 outline-none transition-colors hover:border-white/25 focus:border-white/30"
                    >
                      <option
                        value="newest"
                        className="bg-[#111111]"
                      >
                        الأحدث
                      </option>

                      <option
                        value="price-low"
                        className="bg-[#111111]"
                      >
                        السعر: الأقل أولًا
                      </option>

                      <option
                        value="price-high"
                        className="bg-[#111111]"
                      >
                        السعر: الأعلى أولًا
                      </option>
                    </select>

                    <svg
                      className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white/30"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ===========================================
                  PRODUCTS
              ============================================ */}

              <ProductGrid
                products={sortedProducts}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}