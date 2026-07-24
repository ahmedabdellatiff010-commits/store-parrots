import type { Product } from "@/app/types/product";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductVideo from "./ProductVideo";
import ReviewsSection from "./ReviewsSection";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  return (
    <div dir="rtl" className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <ProductGallery images={product.images} />

          <div className="mt-6">
            <ProductVideo product={product} />
          </div>
        </div>

        <div className="relative z-10">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mt-12">
        <ReviewsSection />
      </div>
    </div>
  );
}