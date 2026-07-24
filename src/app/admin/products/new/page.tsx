import ProductForm from "@/app/admin/components/ProductForm";

export default function NewProductPage() {
  return (
    <div dir="rtl" className="min-h-full">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
            <span>لوحة التحكم</span>
            <span>/</span>
            <span>المنتجات</span>
            <span>/</span>
            <span className="text-zinc-600">إضافة منتج</span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
                إضافة منتج جديد
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                أضف منتجًا جديدًا إلى المتجر وأدخل جميع المعلومات الأساسية
                والصور والتفاصيل الخاصة به.
              </p>
            </div>
          </div>
        </div>

        {/* Product Form */}
        <div className="rounded-[28px] border border-zinc-200 bg-zinc-50/50 p-3 sm:p-5 lg:p-6">
          <ProductForm />
        </div>
      </div>
    </div>
  );
}