"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  created_at?: string;
};

type CategoryFormData = {
  name: string;
  slug: string;
  image: File | null;
};

const generateSlug = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06ff-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [form, setForm] =
    useState<CategoryFormData>({
      name: "",
      slug: "",
      image: null,
    });

  const [loadingAction, setLoadingAction] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadCategories() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/categories",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "فشل تحميل التصنيفات"
        );
      }

      setCategories(data.categories || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحميل التصنيفات"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openAddModal() {
    setEditingCategory(null);

    setForm({
      name: "",
      slug: "",
      image: null,
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function openEditModal(category: Category) {
    setEditingCategory(category);

    setForm({
      name: category.name,
      slug: category.slug,
      image: null,
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function closeModal() {
    if (loadingAction) return;

    setModalOpen(false);
    setEditingCategory(null);

    setForm({
      name: "",
      slug: "",
      image: null,
    });

    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const finalSlug =
      form.slug.trim() ||
      generateSlug(form.name);

    if (!form.name.trim()) {
      setError("اسم القسم مطلوب");
      return;
    }

    if (!finalSlug) {
      setError(
        "أدخل اسم القسم بالإنجليزية أو أضف Slug صالح"
      );
      return;
    }

    if (
      !editingCategory &&
      !form.image
    ) {
      setError("صورة القسم مطلوبة");
      return;
    }

    setLoadingAction(true);

    try {
      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "slug",
        finalSlug
      );

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories";

      const response = await fetch(url, {
        method: editingCategory
          ? "PUT"
          : "POST",
        body: formData,
      });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "حدث خطأ أثناء حفظ القسم"
        );
      }

      if (editingCategory) {
        setCategories((current) =>
          current.map((category) =>
            category.id ===
            editingCategory.id
              ? data.category
              : category
          )
        );

        setSuccess(
          "تم تعديل القسم بنجاح"
        );
      } else {
        setCategories((current) => [
          data.category,
          ...current,
        ]);

        setSuccess(
          "تم إضافة القسم بنجاح"
        );
      }

      setTimeout(() => {
        closeModal();
      }, 700);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء حفظ القسم"
      );
    } finally {
      setLoadingAction(false);
    }
  }

  async function handleDelete(
    category: Category
  ) {
    const confirmed =
      window.confirm(
        `هل أنت متأكد من حذف قسم "${category.name}"؟\n\nسيتم حذف القسم نهائيًا.`
      );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(category.id);

    try {
      const response = await fetch(
        `/api/admin/categories/${category.id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "فشل حذف القسم"
        );
      }

      setCategories((current) =>
        current.filter(
          (item) =>
            item.id !== category.id
        )
      );

      setSuccess(
        "تم حذف القسم بنجاح"
      );

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء حذف القسم"
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div
      dir="rtl"
      className="space-y-8 pb-10"
    >
      {/* Header */}
      <section className="flex flex-col gap-5 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-xl text-white">
            ◈
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              الأقسام
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              أضف ونظّم وأدِر أقسام الببغاوات في المتجر.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600">
            {categories.length} قسم
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
          >
            <span className="text-lg">
              +
            </span>

            إضافة قسم
          </button>
        </div>
      </section>

      {/* Alerts */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
          {success}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[26px] border border-zinc-200 bg-white"
            >
              <div className="aspect-[4/3] animate-pulse bg-zinc-100" />

              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-100" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </section>
      ) : categories.length === 0 ? (
        /* Empty */
        <section className="rounded-[28px] border border-zinc-200 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
            ◈
          </div>

          <h2 className="mt-5 text-lg font-bold text-zinc-950">
            لا توجد أقسام
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            ابدأ بإضافة أول قسم للمتجر.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 text-sm font-bold text-white"
          >
            <span className="text-lg">
              +
            </span>

            إضافة أول قسم
          </button>
        </section>
      ) : (
        /* Categories */
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map(
            (category) => (
              <article
                key={category.id}
                className="group overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  {category.image ? (
                    <Image
                      src={
                        category.image
                      }
                      alt={
                        category.name
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">
                      🦜
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate font-bold text-zinc-950">
                        {
                          category.name
                        }
                      </h2>

                      <p
                        dir="ltr"
                        className="mt-2 truncate text-left text-xs text-zinc-400"
                      >
                        /
                        {
                          category.slug
                        }
                      </p>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-xs text-zinc-500">
                      ◈
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(
                          category
                        )
                      }
                      className="h-10 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      تعديل
                    </button>

                    <button
                      type="button"
                      disabled={
                        deletingId ===
                        category.id
                      }
                      onClick={() =>
                        handleDelete(
                          category
                        )
                      }
                      className="h-10 rounded-xl border border-red-100 bg-red-50 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId ===
                      category.id
                        ? "جاري الحذف..."
                        : "حذف"}
                    </button>
                  </div>
                </div>
              </article>
            )
          )}
        </section>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] border border-zinc-200 bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-950">
                  {editingCategory
                    ? "تعديل القسم"
                    : "إضافة قسم جديد"}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {editingCategory
                    ? "عدّل بيانات القسم أو غيّر صورته."
                    : "أضف قسمًا جديدًا إلى المتجر."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={
                  loadingAction
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                ×
              </button>
            </div>

            {/* Form */}
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
                  اسم القسم
                </label>

                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm(
                      (current) => ({
                        ...current,
                        name: event
                          .target
                          .value,
                      })
                    )
                  }
                  placeholder="مثال: الببغاوات الكبيرة"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-800">
                  الرابط المختصر
                </label>

                <input
                  value={form.slug}
                  onChange={(event) =>
                    setForm(
                      (current) => ({
                        ...current,
                        slug: event
                          .target
                          .value,
                      })
                    )
                  }
                  placeholder="large-parrots"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100"
                />

                <p className="mt-2 text-xs text-zinc-400">
                  اتركه فارغًا لإنشائه تلقائيًا من الاسم.
                </p>
              </div>

              {/* Current Image */}
              {editingCategory &&
                editingCategory.image && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-800">
                      الصورة الحالية
                    </label>

                    <div className="relative aspect-[4/2] overflow-hidden rounded-2xl bg-zinc-100">
                      <Image
                        src={
                          editingCategory.image
                        }
                        alt={
                          editingCategory.name
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

              {/* New Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-800">
                  صورة القسم
                  {editingCategory && (
                    <span className="mr-2 font-normal text-zinc-400">
                      اختياري — ارفع صورة جديدة للاستبدال
                    </span>
                  )}
                </label>

                <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 px-5 py-6 text-center transition hover:border-zinc-400 hover:bg-zinc-100">
                  <span className="text-2xl">
                    🖼️
                  </span>

                  <span className="mt-2 text-sm font-semibold text-zinc-700">
                    {form.image
                      ? form.image.name
                      : "اضغط لاختيار صورة"}
                  </span>

                  <span className="mt-1 text-xs text-zinc-400">
                    JPG, PNG, WEBP
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(
                      event
                    ) =>
                      setForm(
                        (current) => ({
                          ...current,
                          image:
                            event
                              .target
                              .files?.[0] ||
                            null,
                        })
                      )
                    }
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={
                    loadingAction
                  }
                  className="flex-1 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingAction
                    ? "جاري الحفظ..."
                    : editingCategory
                    ? "حفظ التعديلات"
                    : "إضافة القسم"}
                </button>

                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    loadingAction
                  }
                  className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}