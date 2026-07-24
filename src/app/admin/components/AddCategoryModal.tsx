"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  onCreated: (category: Category) => void;
};

export default function AddCategoryModal({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setSlug("");
    setImage(null);
    setError("");
    setLoading(false);
  };

  const close = () => {
    if (loading) return;

    setOpen(false);
    reset();
  };

  const generateSlug = () => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const finalSlug = slug.trim() || generateSlug();

    if (!name.trim()) {
      setError("اسم التصنيف مطلوب");
      return;
    }

    if (!finalSlug) {
      setError("أدخل اسم التصنيف بالإنجليزية أو أضف Slug صالح");
      return;
    }

    if (!image) {
      setError("صورة التصنيف مطلوبة");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("slug", finalSlug);
      formData.append("image", image);

      const response = await fetch(
        "/api/admin/categories",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "فشل إضافة التصنيف"
        );
      }

      if (!data.category) {
        throw new Error(
          "تم إنشاء التصنيف ولكن لم يتم إرجاع البيانات"
        );
      }

      onCreated(data.category);

      setOpen(false);
      reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء إضافة التصنيف"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
      >
        <span className="text-lg leading-none">+</span>
        إضافة تصنيف
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
        >
          <div
            dir="rtl"
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-zinc-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-950">
                  إضافة تصنيف جديد
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  أضف تصنيفًا جديدًا لاستخدامه مع المنتجات.
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                disabled={loading}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-800">
                  اسم التصنيف
                </label>

                <input
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="مثال: الببغاوات الكبيرة"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-800">
                  الرابط المختصر
                  <span className="mr-2 font-normal text-zinc-400">
                    اختياري
                  </span>
                </label>

                <input
                  value={slug}
                  onChange={(event) =>
                    setSlug(event.target.value)
                  }
                  placeholder="large-parrots"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100"
                />

                <p className="mt-2 text-xs text-zinc-400">
                  إذا تركته فارغًا سيتم إنشاؤه تلقائيًا.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-800">
                  صورة التصنيف
                </label>

                <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 px-5 py-6 text-center transition hover:border-zinc-400 hover:bg-zinc-100">
                  <span className="text-2xl">🖼️</span>

                  <span className="mt-2 text-sm font-semibold text-zinc-700">
                    {image
                      ? image.name
                      : "اضغط لاختيار صورة"}
                  </span>

                  <span className="mt-1 text-xs text-zinc-400">
                    JPG, PNG, WEBP
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(event) =>
                      setImage(
                        event.target.files?.[0] || null
                      )
                    }
                  />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "جاري الإضافة..."
                    : "إضافة التصنيف"}
                </button>

                <button
                  type="button"
                  onClick={close}
                  disabled={loading}
                  className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
