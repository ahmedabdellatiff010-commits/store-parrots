import type { Product } from "@/app/types/product";
import { WHATSAPP_PHONE_NUMBER } from "@/app/lib/products";

export type WhatsAppOrderOptions = {
  product: Product;
  quantity: number;
};

export function createWhatsAppOrderUrl({ product, quantity }: WhatsAppOrderOptions) {
  const total = product.price * quantity;
  const message = [
    "مرحبًا، أنا مهتم بشراء هذا المنتج:",
    "",
    `المنتج: ${product.name}`,
    `الرمز: ${product.id}`,
    `السعر: ${product.price.toLocaleString("en-EG")} ج.م`,
    `الكمية: ${quantity}`,
    `الإجمالي: ${total.toLocaleString("en-EG")} ج.م`,
    "",
    "هل ما زال متاحًا؟",
    "",
    `رابط المنتج: ${process.env.NEXT_PUBLIC_SITE_URL || "https://parrots-nwader.vercel.app"}/products/${product.slug}`,
  ].join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
}
