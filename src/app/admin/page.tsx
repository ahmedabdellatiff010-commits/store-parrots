import { assertSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/server";
import Link from "next/link";

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
    (total, product) => total + Number(product.quantity || 0),
    0
  );

  const stats = [
    {
      title: "إجمالي المنتجات",
      value: totalProducts,
      description: "المنتجات الموجودة في المتجر",
      icon: "◈",
      color: "bg-sky-100 text-sky-700",
    },
    {
      title: "المنتجات المتاحة",
      value: availableProducts,
      description: "جاهزة للعرض والبيع",
      icon: "✓",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "المنتجات المباعة",
      value: soldProducts,
      description: "منتجات تم تسليمها للعملاء",
      icon: "↗",
      color: "bg-rose-100 text-rose-700",
    },
    {
      title: "إجمالي المخزون",
      value: totalStock,
      description: "الكمية المتاحة حاليًا",
      icon: "▦",
      color: "bg-zinc-100 text-zinc-700",
    },
  ];

  return (
    <div dir="rtl" className="space-y-8 pb-8">
      <section className="rounded-[2rem] bg-gradient-to-r from-slate-950 via-zinc-950 to-zinc-950 px-6 py-8 text-white shadow-2xl shadow-zinc-950/10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-300">
              لوحة التحكم
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              مرحبًا بك في لوحة التحكم
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
              تابع أداء المتجر، راجع إحصائيات المنتجات، وانتقل بسرعة إلى الصفحات المهمة.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-center lg:gap-4">
            <Link
              href="/admin/products"
              className="inline-flex items-center justify-center rounded-3xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20"
            >
              إدارة المنتجات
            </Link>
            <Link
              href="/admin/categories"
              className="inline-flex items-center justify-center rounded-3xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20"
            >
              إدارة التصنيفات
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-zinc-500">{stat.title}</p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-zinc-950">
                  {stat.value.toLocaleString("en-EG")}
                </p>
              </div>

              <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${stat.color}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>

            <p className="mt-5 text-xs text-zinc-400">{stat.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">مؤشرات الحالة</h2>
              <p className="mt-1 text-sm text-zinc-500">
                نظرة عامة على توزيع حالة المنتجات داخل المتجر.
              </p>
            </div>
            <div className="rounded-3xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700">
              تحديث تلقائي
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {[
              { label: "متاح", value: availableProducts, color: "bg-emerald-500" },
              { label: "مباع", value: soldProducts, color: "bg-rose-500" },
              { label: "مخفي", value: hiddenProducts, color: "bg-zinc-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-zinc-600">
                  <span>{item.label}</span>
                  <span className="font-semibold text-zinc-950">{item.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{
                      width: `${totalProducts > 0 ? (item.value / totalProducts) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-zinc-950 text-2xl text-white">
              🪄
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-400">
                روابط سريعة
              </p>
              <h3 className="mt-2 text-xl font-bold text-zinc-950">انتقل بسرعة</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <Link
              href="/admin/products"
              className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              تصفح المنتجات
            </Link>
            <Link
              href="/admin/categories"
              className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              إدارة التصنيفات
            </Link>
            <Link
              href="/"
              target="_blank"
              className="rounded-3xl border border-zinc-200 bg-white px-4 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              عرض المتجر
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
