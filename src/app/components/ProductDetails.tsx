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
    <main dir="rtl" className="w-full bg-black">
      {/* Product */}
      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Media */}
          <div className="min-w-0">
            <ProductGallery images={product.images} />

            <div className="mt-8">
              <ProductVideo product={product} />
            </div>
          </div>

          {/* Product Information */}
          <div className="min-w-0">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-white/20">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
          <ReviewsSection />
        </div>
      </section>
    </main>
  );
}