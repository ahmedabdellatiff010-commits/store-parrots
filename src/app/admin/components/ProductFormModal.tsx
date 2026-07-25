"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm, { type ProductFormData } from "./ProductForm";

type Props = {
  trigger?: React.ReactNode;
  initial?: Partial<ProductFormData>;
  title?: string;
  description?: string;
};

export default function ProductFormModal({
  trigger,
  initial,
  title,
  description,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-12 items-center justify-center rounded-2xl bg-zinc-950 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800"
      >
        {trigger ?? "+ إضافة منتج"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            dir="rtl"
            className="w-full max-w-[1200px] overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-zinc-100 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-950">
                  {title || (initial?.id ? "تعديل المنتج" : "إضافة منتج جديد")}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {description ||
                    (initial?.id
                      ? "عدّل المنتج والوسائط من نفس النافذة."
                      : "أضف المنتج مع الصور والفيديو من نفس النافذة.")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                ×
              </button>
            </div>

            <div className="max-h-[85vh] overflow-y-auto p-3 sm:p-6">
              <ProductForm
                initial={initial}
                showHeader={false}
                onCancel={() => setOpen(false)}
                onSuccess={() => {
                  setOpen(false);
                  router.push("/admin/products");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
