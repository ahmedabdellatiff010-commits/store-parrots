import ProductCard from "./ProductCard";
import { getAllProducts } from "@/app/lib/products";

export default async function ProductGrid({ products }: { products?: any[] } = {}) {
  const items = products ?? (await getAllProducts());

  return (
    <div className="flex gap-4 overflow-x-auto pb-3 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3 xl:grid-cols-5">
      {items.map((product: any) => (
        <div
          key={product.slug}
          className="w-[82vw] max-w-[270px] shrink-0 snap-start sm:w-[78vw] md:w-auto md:max-w-none md:snap-none"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
