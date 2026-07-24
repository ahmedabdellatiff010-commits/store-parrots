import DeleteProductButton from "../components/DeleteProductButton";
import Link from "next/link";
import { assertSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/server";

type ProductStatus = "available" | "sold" | "hidden";

type ProductRow = {
  id: string;
  name: string;
  price: number;
  main_image: string | null;
  status: ProductStatus;
  quantity: number;
};

const STATUS_LABELS: Record<ProductStatus, string> = {
  available: "متاح",
  sold: "مباع",
  hidden: "مخفي",
};

const STATUS_CLASSES: Record<ProductStatus, string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  sold: "bg-red-50 text-red-700 ring-red-600/10",
  hidden: "bg-zinc-100 text-zinc-600 ring-zinc-500/10",
};

export default async function AdminProductsPage() {
  assertSupabaseConfigured();

  const { data: products, error } = await supabaseAdmin!
    .from("products")
    .select(
      "id, name, price, main_image, status, quantity"
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const productRows = (products || []) as ProductRow[];

  return (
    <div dir="rtl" className="bg-zinc-50">
      <main className="container space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-xl shadow-sm">
                🦜
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                  المنتجات
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                  إدارة منتجات المتجر ومتابعة المخزون
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.98]"
          >
            <span className="ml-2 text-lg leading-none">+</span>
            إضافة منتج
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">
              إجمالي المنتجات
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">
              {productRows.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">
              المنتجات المتاحة
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-emerald-600">
              {
                productRows.filter(
                  (product) => product.status === "available"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">
              المنتجات المباعة
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-red-600">
              {
                productRows.filter(
                  (product) => product.status === "sold"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">
              إجمالي المخزون
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">
              {productRows.reduce(
                (total, product) =>
                  total + Number(product.quantity || 0),
                0
              )}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-3 border-b border-zinc-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-zinc-950">
                قائمة المنتجات
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                {productRows.length} منتج في المتجر
              </p>
            </div>
          </div>

          {productRows.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-3xl">
                🦜
              </div>

              <p className="mt-5 font-bold text-zinc-950">
                لا توجد منتجات حتى الآن
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                ابدأ بإضافة أول منتج إلى المتجر.
              </p>

              <Link
                href="/admin/products/new"
                className="mt-6 inline-flex h-11 items-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                إضافة أول منتج
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {productRows.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col gap-5 p-5 transition hover:bg-zinc-50/70 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Product Info */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm">
                      {product.main_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.main_image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-2xl">
                          🦜
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate font-bold text-zinc-950">
                        {product.name}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-zinc-900">
                          {Number(product.price).toLocaleString(
                            "en-EG"
                          )}{" "}
                          ج.م
                        </span>

                        <span className="text-zinc-300">
                          •
                        </span>

                        <span className="text-xs text-zinc-500">
                          المخزون: {product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${STATUS_CLASSES[product.status]}`}
                    >
                      {STATUS_LABELS[product.status]}
                    </span>

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      تعديل
                    </Link>

                    <DeleteProductButton
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}