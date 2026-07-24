"use client";

import { useEffect, useRef, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  created_at: string;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      setError(null);

      const response = await fetch("/api/admin/categories", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل تحميل التصنيفات");
      }

      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "فشل تحميل التصنيفات"
      );
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setSlug("");
    setImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImage(null);
      setImagePreview(null);
      return;
    }

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!name.trim()) {
        throw new Error("اسم التصنيف مطلوب");
      }

      if (!slug.trim()) {
        throw new Error("الـ slug مطلوب");
      }

      if (!image) {
        throw new Error("اختر صورة للتصنيف");
      }

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("slug", slug.trim().toLowerCase());
      formData.append("image", image);

      const response = await fetch("/api/admin/categories", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "فشل إضافة التصنيف"
        );
      }

      resetForm();

      setSuccess("تم إضافة التصنيف بنجاح");

      await loadCategories();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "حدث خطأ غير متوقع"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-full bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-zinc-400">
              المتجر
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
              التصنيفات
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              أنشئ ونظّم تصنيفات المنتجات التي تظهر في متجرك.
            </p>
          </div>

          {/* Count */}
          <div className="flex items-center gap-3">
            <div className="border border-zinc-200 bg-white px-4 py-3">
              <p className="text-[11px] text-zinc-400">
                إجمالي التصنيفات
              </p>

              <p className="mt-1 text-lg font-semibold text-zinc-950">
                {categories.length}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            ALERTS
        ====================================================== */}

        {error && (
          <div className="mt-6 flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="font-semibold">خطأ</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-6 flex items-start gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span className="font-semibold">تم</span>
            <span>{success}</span>
          </div>
        )}

        {/* =====================================================
            CREATE CATEGORY
        ====================================================== */}

        <section className="mt-6 border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 px-5 py-5 sm:px-6">
            <h2 className="text-base font-semibold text-zinc-950">
              إضافة تصنيف جديد
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              أضف اسم التصنيف والرابط والصورة الخاصة به.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              {/* Form Fields */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-900">
                    اسم التصنيف
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="مثال: الببغاوات الكبيرة"
                    required
                    className="h-12 w-full border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
                  />

                  <p className="mt-2 text-xs text-zinc-400">
                    الاسم الذي سيظهر للعملاء في المتجر.
                  </p>
                </div>

                {/* Slug */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-900">
                    Slug
                  </label>

                  <div className="flex h-12 border border-zinc-300 bg-white focus-within:border-zinc-900">
                    <span
                      dir="ltr"
                      className="flex items-center border-l border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-400"
                    >
                      /categories/
                    </span>

                    <input
                      type="text"
                      value={slug}
                      onChange={(event) =>
                        setSlug(
                          event.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                        )
                      }
                      placeholder="large-parrots"
                      required
                      dir="ltr"
                      className="min-w-0 flex-1 bg-transparent px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                    />
                  </div>

                  <p className="mt-2 text-xs text-zinc-400">
                    يُستخدم في رابط صفحة التصنيف.
                  </p>
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-3 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="h-11 px-5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 disabled:opacity-50"
                  >
                    مسح الحقول
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 bg-zinc-950 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "جاري الإضافة..."
                      : "إضافة التصنيف"}
                  </button>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-900">
                  صورة التصنيف
                </label>

                <label
                  htmlFor="category-image"
                  className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden border border-dashed border-zinc-300 bg-zinc-50 transition-colors hover:border-zinc-500"
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="معاينة صورة التصنيف"
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        <span className="translate-y-2 bg-white px-4 py-2 text-xs font-medium text-zinc-900 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          تغيير الصورة
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="px-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center border border-zinc-200 bg-white text-zinc-500">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                          />
                          <circle
                            cx="8.5"
                            cy="8.5"
                            r="1.5"
                          />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>

                      <p className="mt-4 text-sm font-medium text-zinc-700">
                        اختر صورة
                      </p>

                      <p className="mt-1 text-xs leading-5 text-zinc-400">
                        PNG, JPG, WEBP أو GIF
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    id="category-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    required={!imagePreview}
                    className="sr-only"
                  />
                </label>

                {image && (
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="min-w-0 truncate text-xs text-zinc-500">
                      {image.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="shrink-0 text-xs font-medium text-red-500 hover:text-red-700"
                    >
                      إزالة
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>

        {/* =====================================================
            CATEGORIES LIST
        ====================================================== */}

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-950">
                جميع التصنيفات
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                التصنيفات الموجودة حاليًا في المتجر.
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-zinc-200 bg-white">
            {loadingCategories ? (
              <div className="p-12 text-center">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />

                <p className="mt-4 text-sm text-zinc-500">
                  جاري تحميل التصنيفات...
                </p>
              </div>
            ) : categories.length > 0 ? (
              <>
                {/* Desktop Header */}
                <div className="hidden grid-cols-[80px_1fr_1fr_160px] items-center gap-5 border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-xs font-medium text-zinc-500 md:grid">
                  <span>الصورة</span>
                  <span>اسم التصنيف</span>
                  <span>الرابط</span>
                  <span>الإجراء</span>
                </div>

                <div className="divide-y divide-zinc-100">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="grid gap-4 px-5 py-4 transition-colors hover:bg-zinc-50 md:grid-cols-[80px_1fr_1fr_160px] md:items-center md:gap-5"
                    >
                      {/* Image */}
                      {category.image ? (
                        <div className="h-16 w-16 overflow-hidden bg-zinc-100">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center bg-zinc-100 text-[10px] text-zinc-400">
                          بدون صورة
                        </div>
                      )}

                      {/* Name */}
                      <div>
                        <p className="text-sm font-medium text-zinc-950">
                          {category.name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-400 md:hidden">
                          /categories/{category.slug}
                        </p>
                      </div>

                      {/* Slug */}
                      <p
                        dir="ltr"
                        className="hidden text-sm text-zinc-500 md:block"
                      >
                        /categories/{category.slug}
                      </p>

                      {/* Action */}
                      <div>
                        <button
                          type="button"
                          className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-950"
                        >
                          تعديل التصنيف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-zinc-200 bg-zinc-50 text-zinc-400">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                    />
                    <path d="M8 12h8" />
                  </svg>
                </div>

                <h3 className="mt-4 text-sm font-medium text-zinc-900">
                  لا توجد تصنيفات
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  ابدأ بإضافة أول تصنيف لمتجرك.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}