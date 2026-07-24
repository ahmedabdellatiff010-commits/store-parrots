"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/app/types/product";
import WhatsAppButton from "./WhatsAppButton";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(
    () => product.price * quantity,
    [product.price, quantity]
  );

  const changeQty = (delta: number) => {
  setQuantity((current) =>
    Math.min(
      Math.max(1, current + delta),
      Math.max(1, product.quantity)
    )
  );
};

  const infoRows = [
    product.expectedAge
      ? { label: "العمر المتوقع", value: product.expectedAge }
      : null,
    product.size
      ? { label: "الحجم", value: product.size }
      : null,
    product.temperament
      ? { label: "الطبع", value: product.temperament }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-900">
        {product.name}
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        #{`P-${product.id}`}
      </p>

      <p className="mt-4 text-base leading-7 text-zinc-600">
        {product.description}
      </p>

      {infoRows.length > 0 && (
        <div className="mt-6 divide-y divide-zinc-100 rounded-md border border-zinc-100">
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="text-sm text-zinc-600">
                {row.label}
              </div>

              <div className="text-sm font-semibold text-zinc-900">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-zinc-100 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-500">
              السعر
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-600">
              {product.price.toLocaleString("en-EG")} ج.م
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">
              الكمية
            </p>

         <div className="mt-2 flex items-center gap-2">
  <button
    type="button"
    aria-label="تقليل الكمية"
    onClick={() => changeQty(-1)}
    className="relative z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-zinc-200 bg-white text-lg font-semibold text-zinc-700 transition hover:bg-zinc-50 active:scale-95"
  >
    −
  </button>

  <div className="flex h-10 min-w-[40px] items-center justify-center text-center font-semibold text-zinc-900">
    {quantity}
  </div>

  <button
    type="button"
    aria-label="زيادة الكمية"
    onClick={() => changeQty(1)}
    className="relative z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-zinc-200 bg-white text-lg font-semibold text-zinc-700 transition hover:bg-zinc-50 active:scale-95"
  >
    +
  </button>
</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-sm text-zinc-600">
            الإجمالي:
            <span className="font-semibold text-zinc-900">
              {" "}
              {totalPrice.toLocaleString("en-EG")} ج.م
            </span>
          </div>

          <WhatsAppButton
            product={product}
            quantity={quantity}
            label="اطلب الآن عبر واتساب"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
