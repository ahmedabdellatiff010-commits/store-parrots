import ProductCard from "./ProductCard";
import { getAllProducts } from "@/app/lib/products";

export default async function ProductGrid() {
  const products = await getAllProducts();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
