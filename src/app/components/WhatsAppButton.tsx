"use client";

import type { Product } from "@/app/types/product";
import { createWhatsAppOrderUrl } from "@/app/lib/whatsapp";

type WhatsAppButtonProps = {
  product: Product;
  label?: string;
  className?: string;
  quantity?: number;
  disabled?: boolean;
};

export default function WhatsAppButton({
  product,
  label = "اطلب عبر واتساب",
  className = "",
  quantity = 1,
  disabled = false,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    if (disabled) return;

    const url = createWhatsAppOrderUrl({
      product,
      quantity,
    });

    // أكثر موثوقية على الموبايل
    window.location.href = url;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`relative z-10 inline-flex min-h-12 touch-manipulation items-center justify-center gap-3 rounded-lg border border-white/20 bg-gradient-to-br from-white/5 to-white/0 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-200 hover:border-white/40 hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trim()}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M20.5 3.5c-1.1-1-2.8-1-4 0L7.8 11.2c-.8.7-1 1.9-.5 2.8l1.6 2.9c.5.9 1.6 1.4 2.6 1.1l3.6-1c.6-.2 1.3 0 1.7.5l1.9 2.5c.6.8 1.8.9 2.5.2.4-.3.6-.8.6-1.3V7.5c0-.9-.4-1.8-1.1-2.3z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <span>{label}</span>
    </button>
  );
}