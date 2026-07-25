import type { Product } from "@/app/types/product";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/app/lib/products";

type ProductGridProps = {
  products?: Product[];
};

export default async function ProductGrid({
  products,
}: ProductGridProps = {}) {
  const items =
    products ?? (await getAllProducts());

  if (items.length === 0) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[300px] items-center justify-center"
      >
        <div className="text-center">
          <p className="text-sm text-zinc-500">
            لا توجد منتجات متاحة حاليًا
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-x-3
        gap-y-10
        sm:grid-cols-2
        sm:gap-x-5
        sm:gap-y-12
        md:grid-cols-3
        md:gap-x-6
        md:gap-y-14
        lg:grid-cols-4
        lg:gap-x-7
        lg:gap-y-16
        xl:grid-cols-5
      "
    >
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}