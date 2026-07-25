"use client";

import { useState } from "react";
import ProductForm from "./ProductForm";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  expected_age: string;
  size: string;
  temperament: string;
  price: number;
  quantity: number;
  main_image: string | null;
  video: string | null;
  status: "available" | "sold" | "hidden";
  additional_images: string[];
};

type Props = {
  onCreated?: (product: Product) => void;
};

export default function AddProductModal({
  onCreated,
}: Props) {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const handleSuccess = (product?: Product) => {
    if (product && onCreated) {
      onCreated(product);
    }

    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
      >
        <span className="text-lg leading-none">
          +
        </span>

        إضافة منتج
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              close();
            }
          }}
        >
          <div
            dir="rtl"
            className="flex h-[95vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-2xl"
          >
            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-start justify-between border-b border-zinc-200 bg-white p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-950">
                  إضافة منتج جديد
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  أضف بيانات المنتج والصور والتفاصيل الخاصة به.
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                ×
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-[1500px] px-3 py-4 sm:px-5 sm:py-6 lg:px-7">
                <ProductForm
                  showHeader={false}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}