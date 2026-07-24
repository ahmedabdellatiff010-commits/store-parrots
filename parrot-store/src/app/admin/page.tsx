import { assertSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/server";

type ProductStatus = "available" | "sold" | "hidden";

type Product = {
  status: ProductStatus;
  quantity: number;
};

export default async function AdminDashboardPage() {
  assertSupabaseConfigured();

  const { data: products, error } = await supabaseAdmin!
    .from("products")
    .select("status, quantity");

  if (error) {
    throw new Error(error.message);
  }

  const productRows = (products || []) as Product[];

  const totalProducts = productRows.length;

  const availableProducts = productRows.filter(
    (product) => product.status === "available"
  ).length;

  const soldProducts = productRows.filter(
    (product) => product.status === "sold"
  ).length;

  const hiddenProducts = productRows.filter(
    (product) => product.status === "hidden"
  ).length;

  const totalStock = productRows.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  const stats = [
    {
      title: "إجمالي المنتجات",
      value: totalProducts,
      description: "جميع المنتجات المسجلة",
      icon: "◈",
    },
    {
      title: "المنتجات المتاحة",
      value: availableProducts,
      description: "منتجات متاحة للبيع",
      icon: "✓",
    },
    {
      title: "المنتجات المباعة",
      value: soldProducts,
      description: "منتجات تم بيعها",
      icon: "↗",
    },
    {
      title: "المخزون",
      value: totalStock,
      description: "إجمالي الكمية الحالية",
      icon: "▦",
    },
  ];

  return (
    <div dir="rtl" className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
          الرئيسية
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          نظرة سريعة على حالة المتجر والمنتجات.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  {stat.title}
                </p>

                <p className="mt-4 text-3xl font-bold tracking-tight text-zinc-950">
                  {stat.value.toLocaleString("en-EG")}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-lg font-bold text-zinc-700">
                {stat.icon}
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-zinc-950">
                حالة المنتجات
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                توزيع المنتجات حسب الحالة الحالية
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-700">
                  متاح
                </span>

                <span className="font-semibold text-zinc-950">
                  {availableProducts}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${
                      totalProducts > 0
                        ? (availableProducts / totalProducts) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-700">
                  مباع
                </span>

                <span className="font-semibold text-zinc-950">
                  {soldProducts}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{
                    width: `${
                      totalProducts > 0
                        ? (soldProducts / totalProducts) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-700">
                  مخفي
                </span>

                <span className="font-semibold text-zinc-950">
                  {hiddenProducts}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-zinc-400"
                  style={{
                    width: `${
                      totalProducts > 0
                        ? (hiddenProducts / totalProducts) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-6 text-white shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
            🦜
          </div>

          <h2 className="mt-6 text-xl font-bold">
            ملخص المتجر
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            لديك حاليًا{" "}
            <span className="font-semibold text-white">
              {totalProducts}
            </span>{" "}
            منتج مسجل في لوحة التحكم.
          </p>

          <div className="mt-8 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                إجمالي المخزون
              </span>

              <span className="text-lg font-bold">
                {totalStock.toLocaleString("en-EG")}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                المتاح للبيع
              </span>

              <span className="text-lg font-bold text-emerald-400">
                {availableProducts}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}