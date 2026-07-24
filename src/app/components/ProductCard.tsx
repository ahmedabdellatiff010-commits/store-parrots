import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="group w-full">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/4.6] overflow-hidden bg-zinc-100"
        aria-label={`عرض ${product.name}`}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
            <span className="text-[10px] text-zinc-400">
              لا توجد صورة
            </span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="pt-3">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/products/${product.slug}`}>
              <h3 className="truncate text-[13px] font-medium leading-5 text-zinc-900 transition-colors group-hover:text-zinc-500">
                {product.name}
              </h3>
            </Link>

            {product.temperament && (
              <p className="mt-0.5 truncate text-[10px] text-zinc-500">
                {product.temperament}
              </p>
            )}
          </div>

          <span
            dir="ltr"
            className="shrink-0 text-[12px] font-medium text-zinc-900"
          >
            {product.price.toLocaleString("en-EG")} ج
          </span>
        </div>

        {/* Small Meta */}
        {(product.expectedAge || product.size) && (
          <div className="mt-2 flex items-center gap-3 text-[9px] text-zinc-400">
            {product.expectedAge && (
              <span>العمر {product.expectedAge}</span>
            )}

            {product.size && (
              <span>الحجم {product.size}</span>
            )}
          </div>
        )}

        {/* Details */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 flex h-9 w-full items-center justify-center border border-zinc-200 text-[10px] font-medium text-zinc-800 transition-all duration-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        >
          عرض التفاصيل
        </Link>
      </div>
    </article>
  );
}