"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSlug = (value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (
    value: string
  ) => {
    setName(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (!name.trim()) {
        throw new Error("اسم التصنيف مطلوب");
      }

      if (!slug.trim()) {
        throw new Error("الـ slug مطلوب");
      }

      if (!image) {
        throw new Error("صورة التصنيف مطلوبة");
      }

      const formData = new FormData();

      formData.append(
        "name",
        name.trim()
      );

      formData.append(
        "slug",
        slug.trim()
      );

      formData.append(
        "image",
        image
      );

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
          data?.error ||
            "حدث خطأ أثناء إضافة التصنيف"
        );
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error(
        "Create category error:",
        error
      );

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
      className="mx-auto w-full max-w-4xl space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            <Link
              href="/admin/categories"
              className="transition hover:text-zinc-900"
            >
              التصنيفات
            </Link>

            <span>/</span>

            <span className="text-zinc-600">
              إضافة تصنيف
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            إضافة تصنيف جديد
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            أضف تصنيفًا جديدًا لتنظيم منتجات المتجر.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Basic Information */}
        <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-zinc-950">
              معلومات التصنيف
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              البيانات الأساسية التي سيظهر بها التصنيف.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                اسم التصنيف
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  handleNameChange(
                    event.target.value
                  )
                }
                placeholder="مثال: الببغاوات النادرة"
                disabled={loading}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100 disabled:bg-zinc-50"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                Slug
              </label>

              <input
                type="text"
                dir="ltr"
                value={slug}
                onChange={(event) =>
                  setSlug(
                    generateSlug(
                      event.target.value
                    )
                  )
                }
                placeholder="rare-parrots"
                disabled={loading}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-left text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100 disabled:bg-zinc-50"
              />

              <p className="mt-2 text-xs text-zinc-400">
                يستخدم في رابط صفحة التصنيف.
              </p>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-zinc-950">
              صورة التصنيف
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              اختر صورة واضحة تمثل هذا التصنيف.
            </p>
          </div>

          <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-6 text-center transition hover:border-zinc-400 hover:bg-zinc-100">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) =>
                setImage(
                  event.target.files?.[0] ||
                    null
                )
              }
              disabled={loading}
              className="hidden"
            />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              🖼️
            </div>

            <p className="mt-4 text-sm font-bold text-zinc-800">
              {image
                ? image.name
                : "اضغط لاختيار صورة"}
            </p>

            <p className="mt-2 text-xs text-zinc-400">
              PNG, JPG, WEBP أو GIF
            </p>
          </label>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/categories"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50"
          >
            إلغاء
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-zinc-950 px-7 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "جاري إضافة التصنيف..."
              : "إضافة التصنيف"}
          </button>
        </div>
      </form>
    </div>
  );
}
