"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type ProductStatus =
  | "available"
  | "sold"
  | "hidden";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export type ProductFormData = {
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
  showHeader?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
};

export default function ProductForm({
  initial,
  showHeader = true,
  onCancel,
  onSuccess,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(
    initial?.name || ""
  );

  const [slug, setSlug] = useState(
    initial?.slug || ""
  );

  const [description, setDescription] =
    useState(initial?.description || "");

  const [category, setCategory] =
    useState(initial?.category || "");

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [expectedAge, setExpectedAge] =
    useState(initial?.expected_age || "");

  const [size, setSize] = useState(
    initial?.size || ""
  );

  const [temperament, setTemperament] =
    useState(initial?.temperament || "");

  const [price, setPrice] = useState(
    String(initial?.price ?? "")
  );

  const [quantity, setQuantity] = useState(
    String(initial?.quantity ?? 1)
  );

  const [video, setVideo] = useState(
    initial?.video || ""
  );

  const [videoMode, setVideoMode] =
    useState<"upload" | "url">("url");

  const [videoFile, setVideoFile] =
    useState<File | null>(null);

  const [videoPreviewUrl, setVideoPreviewUrl] =
    useState<string | null>(null);

  const [videoUploadLoading, setVideoUploadLoading] =
    useState(false);

  const [videoUploadError, setVideoUploadError] =
    useState<string | null>(null);

  const [status, setStatus] =
    useState<ProductStatus>(
      initial?.status || "available"
    );

  const [mainImage, setMainImage] =
    useState<File | null>(null);

  const [additionalImages, setAdditionalImages] =
    useState<File[]>([]);

  const [existingMainImage] =
    useState(initial?.main_image || "");

  const [mainImagePreview, setMainImagePreview] =
    useState(initial?.main_image || "");

  const [additionalImagePreviews, setAdditionalImagePreviews] =
    useState<string[]>([]);

  const [existingAdditionalImages] =
    useState<string[]>(
      initial?.additional_images || []
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * تحميل التصنيفات
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
            credentials: "include",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "فشل تحميل التصنيفات"
          );
        }

        setCategories(
          data.categories || []
        );
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

  /*
   * تنظيف روابط Preview
   */
  useEffect(() => {
    return () => {
      if (
        mainImagePreview &&
        mainImagePreview.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          mainImagePreview
        );
      }

      if (
        videoPreviewUrl &&
        videoPreviewUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(videoPreviewUrl);
      }

      additionalImagePreviews.forEach(
        (preview) => {
          if (
            preview.startsWith("blob:")
          ) {
            URL.revokeObjectURL(preview);
          }
        }
      );
    };
  }, [
    mainImagePreview,
    videoPreviewUrl,
    additionalImagePreviews,
  ]);

  /*
   * الصورة الرئيسية
   */
  const handleMainImage = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] ||
      null;

    if (!file) {
      return;
    }

    if (
      mainImagePreview &&
      mainImagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        mainImagePreview
      );
    }

    setMainImage(file);

    setMainImagePreview(
      URL.createObjectURL(file)
    );
  };

  /*
   * الصور الإضافية
   */
  const handleAdditionalImages = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) {
      return;
    }

    additionalImagePreviews.forEach(
      (preview) => {
        if (
          preview.startsWith("blob:")
        ) {
          URL.revokeObjectURL(preview);
        }
      }
    );

    setAdditionalImages(files);

    setAdditionalImagePreviews(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

  /*
   * إنشاء Slug تلقائي
   */
  const generateSlug = () => {
    const generated = name
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

    return (
      generated ||
      `product-${Date.now()}`
    );
  };

  /*
   * رفع صورة
   */
  const uploadImage = async (
    file: File
  ) => {
    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response = await fetch(
      "/api/admin/products/upload",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    let data: {
      url?: string;
      error?: string;
    } = {};

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        `فشل رفع الصورة. كود الخطأ: ${response.status}`
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error ||
          "فشل رفع الصورة"
      );
    }

    if (!data.url) {
      throw new Error(
        "تم رفع الصورة ولكن لم يتم إرجاع رابط الصورة"
      );
    }

    return data.url;
  };

  const uploadVideo = async (
    file: File
  ) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "/api/admin/products/video",
      {
        method: "POST",
        body: formData,
        credentials: "include",
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
        `فشل رفع الفيديو. كود الخطأ: ${response.status}`
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error || "فشل رفع الفيديو"
      );
    }

    if (!data.url) {
      throw new Error(
        "تم رفع الفيديو ولكن لم يتم إرجاع رابط الفيديو"
      );
    }

    return data.url;
  };

  const handleVideoFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (
      videoPreviewUrl &&
      videoPreviewUrl.startsWith("blob:")
    ) {
      URL.revokeObjectURL(videoPreviewUrl);
    }

    setVideoFile(file);
    setVideoUploadError(null);
    setVideoMode("upload");
    setVideoPreviewUrl(
      URL.createObjectURL(file)
    );
  };

  const handleVideoRemove = () => {
    if (
      videoPreviewUrl &&
      videoPreviewUrl.startsWith("blob:")
    ) {
      URL.revokeObjectURL(videoPreviewUrl);
    }

    setVideoFile(null);
    setVideoPreviewUrl(null);
    setVideoUploadError(null);
    setVideo("");
    setVideoMode("url");
  };

  /*
   * حفظ المنتج
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (!name.trim()) {
        throw new Error(
          "اسم المنتج مطلوب"
        );
      }

      if (!description.trim()) {
        throw new Error(
          "وصف المنتج مطلوب"
        );
      }

      if (!category.trim()) {
        throw new Error(
          "التصنيف مطلوب"
        );
      }

      if (!expectedAge.trim()) {
        throw new Error(
          "العمر المتوقع مطلوب"
        );
      }

      if (!size.trim()) {
        throw new Error(
          "الحجم مطلوب"
        );
      }

      if (!temperament.trim()) {
        throw new Error(
          "الطبع مطلوب"
        );
      }

      const numericPrice =
        Number(price);

      const numericQuantity =
        Number(quantity);

      if (
        !Number.isFinite(
          numericPrice
        ) ||
        numericPrice < 0
      ) {
        throw new Error(
          "السعر غير صحيح"
        );
      }

      if (
        !Number.isFinite(
          numericQuantity
        ) ||
        numericQuantity < 0
      ) {
        throw new Error(
          "الكمية غير صحيحة"
        );
      }

      /*
       * الصورة الحالية في حالة التعديل
       */
      let mainImageUrl =
        existingMainImage ||
        null;

      /*
       * رفع صورة رئيسية جديدة
       */
      if (mainImage) {
        mainImageUrl =
          await uploadImage(
            mainImage
          );
      }

      /*
       * رفع الصور الإضافية
       */
      const additionalImageUrls: string[] = [
        ...existingAdditionalImages,
      ];

      for (const image of additionalImages) {
        const url = await uploadImage(image);
        additionalImageUrls.push(url);
      }

      /*
       * ترتيب الصور
       */
      const images = [
        ...(mainImageUrl
          ? [mainImageUrl]
          : []),
        ...additionalImageUrls.filter(
          (imageUrl) =>
            imageUrl &&
            imageUrl !== mainImageUrl
        ),
      ];

      /*
       * ID المنتج
       */
      const productId =
        initial?.id ||
        crypto.randomUUID();

      /*
       * Slug
       */
      const productSlug =
        slug.trim() ||
        generateSlug();

      let finalVideo =
        video.trim() || null;

      if (videoFile) {
        setVideoUploadLoading(true);
        finalVideo = await uploadVideo(videoFile);
      }

      const body = {
        id: productId,
        name: name.trim(),
        slug: productSlug,
        description:
          description.trim(),
        category: category.trim(),
        expected_age:
          expectedAge.trim(),
        size: size.trim(),
        temperament:
          temperament.trim(),
        price: numericPrice,
        quantity:
          numericQuantity,
        main_image:
          mainImageUrl,
        video: finalVideo,
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

      const response =
        await fetch(url, {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials:
            "include",
          body:
            JSON.stringify(body),
        });

      let data: {
        success?: boolean;
        product?: unknown;
        error?: string;
      } = {};

      try {
        data =
          await response.json();
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

      onSuccess?.();
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
      setVideoUploadLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      className="mt-8 pb-16"
    >
      {showHeader && (
        <div className="mb-8 flex flex-col gap-5 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onCancel?.();
                  if (!onCancel) {
                    router.push("/admin/products");
                  }
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-950"
              >
                ←
              </button>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                  {initial?.id
                    ? "تعديل المنتج"
                    : "إضافة منتج جديد"}
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                  {initial?.id
                    ? "عدّل بيانات المنتج والمعلومات الخاصة به."
                    : "أضف منتجًا جديدًا إلى متجر نوادر الببغاوات."}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              categoriesLoading
            }
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-zinc-950 px-7 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "جاري الحفظ..."
              : initial?.id
                ? "حفظ التعديلات"
                : "حفظ المنتج"}
          </button>
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
        >
          <span className="text-lg">
            !
          </span>

          <div>
            <p className="font-bold">
              حدث خطأ
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* MAIN GRID */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* MAIN COLUMN */}

        <div className="space-y-6">
          {/* BASIC INFO */}

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-lg font-bold text-zinc-950">
                معلومات المنتج
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                المعلومات الأساسية التي ستظهر للعملاء.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  اسم المنتج
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="مثال: Blue Macaw"
                  required
                  className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  الرابط المختصر
                  <span className="mr-2 text-xs font-normal text-zinc-400">
                    اختياري
                  </span>
                </label>

                <input
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value
                    )
                  }
                  placeholder="blue-macaw"
                  className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                />

                <p className="mt-2 text-xs text-zinc-400">
                  سيتم إنشاؤه تلقائيًا إذا تركته فارغًا.
                </p>
              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  وصف المنتج
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={6}
                  required
                  placeholder="اكتب وصفًا واضحًا ومميزًا للببغاء..."
                  className="w-full resize-none rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                />

                <p className="mt-2 text-xs text-zinc-400">
                  اكتب وصفًا يساعد العميل على معرفة تفاصيل المنتج.
                </p>
              </div>
            </div>
          </section>

          {/* PARROT DETAILS */}

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-lg font-bold text-zinc-950">
                تفاصيل الببغاء
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                معلومات إضافية عن الببغاء لمساعدة العميل على اتخاذ القرار.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* AGE */}

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  العمر المتوقع
                </label>

                <input
                  value={expectedAge}
                  onChange={(e) =>
                    setExpectedAge(
                      e.target.value
                    )
                  }
                  placeholder="مثال: 50 - 70 سنة"
                  required
                  className="h-12 w-full rounded-2xl border border-zinc-200 px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                />
              </div>

              {/* SIZE */}

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  الحجم
                </label>

                <input
                  value={size}
                  onChange={(e) =>
                    setSize(
                      e.target.value
                    )
                  }
                  placeholder="مثال: كبير"
                  required
                  className="h-12 w-full rounded-2xl border border-zinc-200 px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                />
              </div>

              {/* TEMPERAMENT */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  الطبع والشخصية
                </label>

                <input
                  value={temperament}
                  onChange={(e) =>
                    setTemperament(
                      e.target.value
                    )
                  }
                  placeholder="مثال: ودود، ذكي، اجتماعي"
                  required
                  className="h-12 w-full rounded-2xl border border-zinc-200 px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                />
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}

        <aside className="space-y-6">
          {/* MAIN IMAGE */}

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-bold text-zinc-950">
                الصورة الرئيسية
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                الصورة الأساسية التي ستظهر للمنتج.
              </p>
            </div>

            <label className="group relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 transition hover:border-zinc-400 hover:bg-zinc-100">
              {mainImagePreview ? (
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mainImagePreview}
                    alt="معاينة المنتج"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <span className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-950">
                      تغيير الصورة
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    🦜
                  </div>

                  <p className="text-sm font-bold text-zinc-800">
                    اختر الصورة الرئيسية
                  </p>

                  <p className="mt-2 text-xs text-zinc-400">
                    JPG, PNG, WEBP
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={
                  handleMainImage
                }
                required={
                  !existingMainImage
                }
                className="hidden"
              />
            </label>

            {mainImage && (
              <p className="mt-3 truncate text-xs text-emerald-600">
                تم اختيار:{" "}
                {mainImage.name}
              </p>
            )}
          </section>

          {/* CATEGORY */}

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-bold text-zinc-900">
              التصنيف
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              required
              disabled={
                categoriesLoading
              }
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-50"
            >
              <option value="">
                {categoriesLoading
                  ? "جاري تحميل التصنيفات..."
                  : "اختر التصنيف"}
              </option>

              {categories.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>

            {!categoriesLoading &&
              categories.length ===
                0 && (
                <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-700">
                  لا توجد تصنيفات. أضف تصنيفًا من لوحة التحكم أولًا.
                </p>
              )}
          </section>

          {/* PRICE + QUANTITY */}

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-zinc-950">
              السعر والمخزون
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  السعر
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        e.target.value
                      )
                    }
                    required
                    className="h-12 w-full rounded-2xl border border-zinc-200 px-4 pl-14 text-sm outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                  />

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                    EGP
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  الكمية
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      e.target.value
                    )
                  }
                  required
                  className="h-12 w-full rounded-2xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-900">
                  حالة المنتج
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as ProductStatus
                    )
                  }
                  className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
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
            </div>
          </section>
        </aside>
      </div>

      {/* ADDITIONAL IMAGES */}

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-zinc-950">
            صور إضافية
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            يمكنك إضافة صور أخرى لعرض المنتج من زوايا مختلفة.
          </p>
        </div>

        <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-6 text-center transition hover:border-zinc-400 hover:bg-zinc-100">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
            +
          </div>

          <p className="text-sm font-bold text-zinc-800">
            إضافة صور
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            يمكنك اختيار أكثر من صورة
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={
              handleAdditionalImages
            }
            className="hidden"
          />
        </label>

        {additionalImages.length >
          0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {additionalImagePreviews.map(
              (preview, index) => (
                <div
                  key={preview}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={`صورة إضافية ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* VIDEO */}

      <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-zinc-950">
            فيديو المنتج
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            أضف فيديوًا مباشرًا أو رابطًا من YouTube أو Vimeo.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setVideoMode("upload")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                videoMode === "upload"
                  ? "bg-zinc-950 text-white"
                  : "bg-zinc-100 text-zinc-700"
              }`}
            >
              رفع فيديو
            </button>

            <button
              type="button"
              onClick={() => setVideoMode("url")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                videoMode === "url"
                  ? "bg-zinc-950 text-white"
                  : "bg-zinc-100 text-zinc-700"
              }`}
            >
              إضافة رابط
            </button>
          </div>

          {videoMode === "upload" ? (
            <div className="space-y-4">
              <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-6 text-center transition hover:border-zinc-400">
                <span className="text-2xl">🎬</span>
                <span className="mt-2 text-sm font-semibold text-zinc-800">
                  {videoFile
                    ? videoFile.name
                    : "اختر فيديو من الجهاز"}
                </span>
                <span className="mt-1 text-xs text-zinc-500">
                  MP4, WebM, MOV • حتى 100MB
                </span>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={handleVideoFileChange}
                />
              </label>

              {videoPreviewUrl && (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
                  <video
                    src={videoPreviewUrl}
                    controls
                    className="w-full max-h-[320px] object-contain"
                  />
                </div>
              )}

              {(videoFile || video || videoPreviewUrl) && (
                <div className="flex flex-wrap gap-3">
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700">
                    تغيير الفيديو
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      className="hidden"
                      onChange={handleVideoFileChange}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleVideoRemove}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                  >
                    حذف الفيديو
                  </button>
                </div>
              )}

              {videoUploadLoading && (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
                  جاري رفع الفيديو...
                </div>
              )}

              {videoUploadError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {videoUploadError}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <input
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="h-12 w-full rounded-2xl border border-zinc-200 px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100"
              />

              <p className="text-xs text-zinc-500">
                يدعم YouTube, Vimeo, وروابط فيديو مباشرة.
              </p>

              {video && (
                <button
                  type="button"
                  onClick={handleVideoRemove}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                >
                  إزالة الرابط
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM ACTIONS */}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => {
            onCancel?.();
            if (!onCancel) {
              router.push("/admin/products");
            }
          }}
          disabled={loading}
          className="h-12 rounded-2xl border border-zinc-200 bg-white px-7 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50"
        >
          إلغاء
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            categoriesLoading
          }
          className="h-12 rounded-2xl bg-zinc-950 px-8 text-sm font-bold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "جاري الحفظ..."
            : initial?.id
              ? "حفظ التعديلات"
              : "إضافة المنتج"}
        </button>
      </div>
    </form>
  );
}