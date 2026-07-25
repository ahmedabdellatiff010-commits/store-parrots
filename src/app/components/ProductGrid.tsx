import ProductCard from "./ProductCard";
import { getAllProducts } from "@/app/lib/products";

export default async function ProductGrid({ products }: { products?: any[] } = {}) {
  const items = products ?? (await getAllProducts());

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
      {items.map((product: any) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
