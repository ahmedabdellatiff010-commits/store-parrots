import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase text-zinc-500">
              {product.expectedAge ? `العمر: ${product.expectedAge}` : "العمر غير محدد"}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-900">{product.name}</h3>
            <p className="mt-2 text-sm text-zinc-500">
              {product.size ? `الحجم: ${product.size}` : "الحجم غير محدد"}
            </p>
          </div>

          {product.temperament ? (
            <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600">
              {product.temperament}
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-sm leading-7 text-zinc-600">{product.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase  text-zinc-500">
              السعر
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900">
              {product.price.toLocaleString("en-EG")} جنيه
            </p>
          </div>

         
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-flex items-center justify-center gap-3 rounded-md border border-zinc-300 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-hover)]"
        >
          <span>عرض التفاصيل</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
