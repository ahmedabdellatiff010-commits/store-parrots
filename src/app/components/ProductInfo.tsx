"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/app/types/product";
import WhatsAppButton from "./WhatsAppButton";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = Math.max(1, product.quantity || 1);

  const totalPrice = useMemo(() => {
    return product.price * quantity;
  }, [product.price, quantity]);

  const changeQty = (delta: number) => {
    setQuantity((current) =>
      Math.min(
        Math.max(1, current + delta),
        maxQuantity
      )
    );
  };

  const infoRows = [
    product.expectedAge
      ? {
          label: "العمر",
          value: product.expectedAge,
        }
      : null,

    product.size
      ? {
          label: "الحجم",
          value: product.size,
        }
      : null,

    product.temperament
      ? {
          label: "الطبع",
          value: product.temperament,
        }
      : null,
  ].filter(Boolean) as {
    label: string;
    value: string;
  }[];

  return (
      <div className="w-full">
      {/* Product Title */}
      <div>
        <p className="text-xs font-medium text-white/60">
          ببغاء مميز
        </p>

        <h1 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
          {product.name}
        </h1>

        <p className="mt-2 text-xs text-white/40">
          رقم المنتج: P-{product.id}
        </p>
      </div>

      {/* Price */}
      <div className="mt-6">
        <p
          dir="ltr"
          className="text-2xl font-medium tracking-[-0.02em] text-white"
        >
          {product.price.toLocaleString("en-EG")} ج.م
        </p>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-6 border-t border-white/20 pt-6">
          <p className="text-sm leading-7 text-white/70">
            {product.description}
          </p>
        </div>
      )}

      {/* Product Details */}
      {infoRows.length > 0 && (
        <div className="mt-6 border-y border-white/20">
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex min-h-[52px] items-center justify-between gap-6 border-b border-white/10 last:border-b-0"
            >
              <span className="text-sm text-white/60">
                {row.label}
              </span>

              <span className="text-sm font-medium text-white">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div className="mt-6">
        <label className="text-sm font-medium text-white">
          الكمية
        </label>

        <div className="mt-3 inline-flex h-11 items-center border border-white/20 rounded-[8px]">
          <button
            type="button"
            aria-label="تقليل الكمية"
            onClick={() => changeQty(-1)}
            disabled={quantity <= 1}
            className="flex h-full w-11 items-center justify-center text-lg text-white/60 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            −
          </button>

          <span className="flex h-full w-12 items-center justify-center border-x border-white/20 text-sm font-medium text-white">
            {quantity}
          </span>

          <button
            type="button"
            aria-label="زيادة الكمية"
            onClick={() => changeQty(1)}
            disabled={quantity >= maxQuantity}
            className="flex h-full w-11 items-center justify-center text-lg text-white/60 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-5">
        <span className="text-sm text-white/60">
          الإجمالي
        </span>

        <span
          dir="ltr"
          className="text-base font-medium text-white"
        >
          {totalPrice.toLocaleString("en-EG")} ج.م
        </span>
      </div>

      {/* WhatsApp CTA */}
      <div className="mt-5">
        <WhatsAppButton
          product={product}
          quantity={quantity}
          label="اطلب الآن عبر واتساب"
          className="h-12 w-full"
        />
      </div>

      {/* Trust Message */}
      <p className="mt-4 text-center text-xs leading-5 text-white/40">
        تواصل معنا عبر واتساب لتأكيد الطلب ومعرفة التفاصيل.
      </p>
    </div>
  );
}