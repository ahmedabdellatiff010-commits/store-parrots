"use client";

import { useMemo, useState } from "react";

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

  if (products.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white px-6 text-center shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-4xl">
          🦜
        </div>

        <h2 className="mt-6 text-xl font-bold text-zinc-950">
          لا توجد منتجات في هذا القسم
        </h2>

        <p className="mt-3 max-w-md text-sm leading-7 text-zinc-500">
          لا توجد ببغاوات متاحة حاليًا في قسم{" "}
          {categoryName}. يمكنك العودة لاحقًا
          لمشاهدة المنتجات الجديدة.
        </p>

        <a
          href="/categories"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-6 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
        >
          تصفح جميع الأقسام
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-zinc-950">
            {products.length} منتج
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            اختر المنتج المناسب لك
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-xs font-medium text-zinc-500"
          >
            ترتيب حسب
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value as SortOption
              )
            }
            className="h-10 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-zinc-950"
          >
            <option value="newest">
              الأحدث
            </option>

            <option value="price-low">
              السعر: من الأقل للأعلى
            </option>

            <option value="price-high">
              السعر: من الأعلى للأقل
            </option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={sortedProducts}
      />
    </div>
  );
}