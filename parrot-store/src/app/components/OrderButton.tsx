"use client";

import { createWhatsAppOrderUrl } from "@/app/lib/whatsapp";
import type { Product } from "@/app/types/product";

type OrderButtonProps = {
  productName: string;
  description?: string;
  price?: string;
};

export default function OrderButton({
  productName,
  description = "طلب مباشر عبر واتساب",
  price = "غير محدد",
}: OrderButtonProps) {
  const handleOrder = () => {
    const product: Product = {
      id: productName,
      slug: productName.toLowerCase().replace(/\s+/g, "-"),
      name: productName,
      description,
      expectedAge: "",
      size: "",
      temperament: "",
      price: Number.parseInt(price.replace(/[^\d]/g, ""), 10) || 0,
      quantity: 1,
      images: [],
      status: "available",
    };

    window.open(
      createWhatsAppOrderUrl({
        product,
        quantity: 1,
      }),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      onClick={handleOrder}
      className="rounded-full bg-zinc-950 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-800 active:scale-95"
    >
      اطلب الآن
    </button>
  );
}
