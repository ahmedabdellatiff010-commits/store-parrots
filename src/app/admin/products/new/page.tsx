import ProductForm from "../../components/ProductForm";

export default function NewProductPage() {
  return (
    <div dir="rtl">
      <h1 className="text-2xl font-bold text-zinc-900">
        إضافة منتج جديد
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        أضف بيانات المنتج التي ستظهر في صفحة المنتج.
      </p>

      <ProductForm />
    </div>
  );
}
