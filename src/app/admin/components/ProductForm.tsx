"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProductStatus = "available" | "sold" | "hidden";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ProductFormData = {
  id?: string;
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
  status: ProductStatus;
  additional_images: string[];
};

type Props = {
  initial?: Partial<ProductFormData>;
};

export default function ProductForm({ initial }: Props) {
  const router = useRouter();

  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [description, setDescription] = useState(
    initial?.description || ""
  );

  const [category, setCategory] = useState(
    initial?.category || ""
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [expectedAge, setExpectedAge] = useState(
    initial?.expected_age || ""
  );

  const [size, setSize] = useState(
    initial?.size || ""
  );

  const [temperament, setTemperament] = useState(
    initial?.temperament || ""
  );

  const [price, setPrice] = useState(
    String(initial?.price ?? "")
  );

  const [quantity, setQuantity] = useState(
    String(initial?.quantity ?? 1)
  );

  const [video, setVideo] = useState(
    initial?.video || ""
  );

  const [status, setStatus] = useState<ProductStatus>(
    initial?.status || "available"
  );

  const [mainImage, setMainImage] = useState<File | null>(null);

  const [additionalImages, setAdditionalImages] = useState<File[]>(
    []
  );

  const [existingMainImage, setExistingMainImage] = useState(
    initial?.main_image || ""
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  /*
   * تحميل التصنيفات من قاعدة البيانات
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);

        const response = await fetch(
          "/api/admin/categories",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "فشل تحميل التصنيفات"
          );
        }

        setCategories(data.categories || []);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "فشل تحميل التصنيفات"
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleMainImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    setMainImage(file);
  };

  const handleAdditionalImages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    setAdditionalImages(files);
  };

  const generateSlug = () => {
    const generated = name
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

    return generated || `product-${Date.now()}`;
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "/api/admin/products/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    let data: {
      url?: string;
      error?: string;
    } = {};

    try {
      data = await response.json();
    } catch {
      throw new Error(
        `فشل رفع الصورة. كود الخطأ: ${response.status}`
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error || "فشل رفع الصورة"
      );
    }

    if (!data.url) {
      throw new Error(
        "تم رفع الصورة ولكن لم يتم إرجاع رابط الصورة"
      );
    }

    return data.url;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (!name.trim()) {
        throw new Error("اسم المنتج مطلوب");
      }

      if (!description.trim()) {
        throw new Error("وصف المنتج مطلوب");
      }

      if (!category.trim()) {
        throw new Error("التصنيف مطلوب");
      }

      if (!expectedAge.trim()) {
        throw new Error("العمر المتوقع مطلوب");
      }

      if (!size.trim()) {
        throw new Error("الحجم مطلوب");
      }

      if (!temperament.trim()) {
        throw new Error("الطبع مطلوب");
      }

      const numericPrice = Number(price);
      const numericQuantity = Number(quantity);

      if (
        !Number.isFinite(numericPrice) ||
        numericPrice < 0
      ) {
        throw new Error("السعر غير صحيح");
      }

      if (
        !Number.isFinite(numericQuantity) ||
        numericQuantity < 0
      ) {
        throw new Error("الكمية غير صحيحة");
      }

      /*
       * في حالة التعديل:
       * لو لم يتم اختيار صورة جديدة نحتفظ بالصورة الحالية.
       */
      let mainImageUrl =
        existingMainImage || null;

      /*
       * رفع الصورة الرئيسية الجديدة.
       */
      if (mainImage) {
        mainImageUrl = await uploadImage(mainImage);
      }

      /*
       * رفع الصور الإضافية.
       */
      const additionalImageUrls: string[] = [];

      for (const image of additionalImages) {
        const url = await uploadImage(image);

        additionalImageUrls.push(url);
      }

      /*
       * ترتيب الصور:
       * الصورة الرئيسية أولاً
       * ثم الصور الإضافية
       */
      const images = [
        ...(mainImageUrl ? [mainImageUrl] : []),
        ...additionalImageUrls,
      ];

      /*
       * عند الإضافة ننشئ ID جديد.
       * عند التعديل نستخدم ID المنتج الموجود.
       */
      const productId =
        initial?.id || crypto.randomUUID();

      const productSlug =
        slug.trim() || generateSlug();

      const body = {
        id: productId,
        name: name.trim(),
        slug: productSlug,
        description: description.trim(),

        /*
         * نخزن slug التصنيف في products.category
         */
        category: category.trim(),

        expected_age: expectedAge.trim(),
        size: size.trim(),
        temperament: temperament.trim(),
        price: numericPrice,
        quantity: numericQuantity,
        main_image: mainImageUrl,
        video: video.trim() || null,
        status,
        images,
      };

      const url = initial?.id
        ? `/api/admin/products/${encodeURIComponent(
            initial.id
          )}`
        : "/api/admin/products";

      const method = initial?.id
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      let data: {
        success?: boolean;
        product?: unknown;
        error?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        throw new Error(
          `الخادم لم يرجع استجابة صحيحة. كود الخطأ: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `حدث خطأ أثناء حفظ المنتج. كود الخطأ: ${response.status}`
        );
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(
        "Product form error:",
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
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      className="mt-8 max-w-4xl space-y-6"
    >
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          معلومات المنتج
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              اسم المنتج
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="مثال: Blue Macaw"
              required
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              الرابط المختصر
              <span className="mr-2 text-xs text-zinc-400">
                اختياري
              </span>
            </label>

            <input
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
              placeholder="blue-macaw"
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />

            <p className="mt-1 text-xs text-zinc-400">
              إذا تركته فارغًا سيتم إنشاؤه تلقائيًا من اسم المنتج.
            </p>
          </div>

          {/* التصنيف من قاعدة البيانات */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              التصنيف
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              required
              disabled={categoriesLoading}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-zinc-50"
            >
              <option value="">
                {categoriesLoading
                  ? "جاري تحميل التصنيفات..."
                  : "اختر التصنيف"}
              </option>

              {categories.map((item) => (
                <option
                  key={item.id}
                  value={item.slug}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {!categoriesLoading &&
              categories.length === 0 && (
                <p className="mt-2 text-xs text-amber-600">
                  لا توجد تصنيفات. أضف تصنيفًا من لوحة التحكم أولًا.
                </p>
              )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              وصف المنتج
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={5}
              required
              className="w-full rounded-lg border border-zinc-200 p-4 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              العمر المتوقع
            </label>

            <input
              value={expectedAge}
              onChange={(e) =>
                setExpectedAge(e.target.value)
              }
              placeholder="مثال: 50-70 سنة"
              required
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              الحجم
            </label>

            <input
              value={size}
              onChange={(e) =>
                setSize(e.target.value)
              }
              placeholder="مثال: كبير"
              required
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              الطبع
            </label>

            <input
              value={temperament}
              onChange={(e) =>
                setTemperament(e.target.value)
              }
              placeholder="مثال: ودود ومميز"
              required
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              السعر بالجنيه
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              required
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              الكمية
            </label>

            <input
              type="number"
              min="0"
              step="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              required
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              حالة المنتج
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as ProductStatus
                )
              }
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="available">
                متاح
              </option>

              <option value="sold">
                مباع
              </option>

              <option value="hidden">
                مخفي
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              الفيديو
              <span className="mr-2 text-xs text-zinc-400">
                اختياري
              </span>
            </label>

            <input
              value={video}
              onChange={(e) =>
                setVideo(e.target.value)
              }
              placeholder="رابط الفيديو"
              className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          صور المنتج
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              الصورة الرئيسية
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleMainImage}
              className="block w-full text-sm"
              required={!existingMainImage}
            />

            {existingMainImage && (
              <div className="mt-3">
                <p className="text-xs text-zinc-500">
                  توجد صورة رئيسية حالية. يمكنك رفع صورة جديدة لاستبدالها.
                </p>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={existingMainImage}
                  alt="الصورة الرئيسية الحالية"
                  className="mt-3 h-32 w-32 rounded-lg object-cover"
                />
              </div>
            )}

            {mainImage && (
              <p className="mt-2 text-xs text-emerald-600">
                الصورة الجديدة: {mainImage.name}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              صور إضافية
              <span className="mr-2 text-xs text-zinc-400">
                اختياري
              </span>
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={handleAdditionalImages}
              className="block w-full text-sm"
            />

            {additionalImages.length > 0 && (
              <p className="mt-2 text-xs text-zinc-500">
                تم اختيار {additionalImages.length} صورة
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || categoriesLoading}
          className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "جاري الحفظ..."
            : initial?.id
              ? "حفظ التعديلات"
              : "إضافة المنتج"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/products")
          }
          disabled={loading}
          className="rounded-lg border border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-700"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}