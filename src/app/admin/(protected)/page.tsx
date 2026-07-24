import Link from "next/link";
import Image from "next/image";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  assertSupabaseConfigured();

  const { data: products, error } =
    await supabaseAdmin!
      .from("products")
      .select(
        "id, name, slug, status, quantity, price, main_image, created_at"
      )
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (products || []) as any[];

  const totalProducts = rows.length;

  const availableProducts = rows.filter(
    (item) => item.status === "available"
  ).length;

  const soldProducts = rows.filter(
    (item) => item.status === "sold"
  ).length;

  const hiddenProducts = rows.filter(
    (item) => item.status === "hidden"
  ).length;

  const recentProducts = rows.slice(0, 5);

  const stats = [
    {
      title: "إجمالي المنتجات",
      value: totalProducts,
      icon: "▣",
      description: "كل المنتجات الموجودة",
    },
    {
      title: "منتجات متاحة",
      value: availableProducts,
      icon: "✓",
      description: "منتجات يمكن للعملاء شراؤها",
    },
    {
      title: "منتجات مباعة",
      value: soldProducts,
      icon: "◉",
      description: "منتجات تم بيعها",
    },
    {
      title: "منتجات مخفية",
      value: hiddenProducts,
      icon: "◌",
      description: "غير ظاهرة في المتجر",
    },
  ];

  return (
    <div
      dir="rtl"
      className="space-y-6 pb-10"
    >
      <section className="overflow-hidden rounded-[28px] bg-zinc-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              لوحة الإدارة تعمل بشكل طبيعي
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              أهلاً بك في لوحة التحكم
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">
              من هنا تقدر تدير منتجات المتجر والتصنيفات
              وتتابع حالة المخزون بسهولة.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admin/products/new"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200"
            >
              + إضافة منتج
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/10"
            >
              مشاهدة المتجر ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-500">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-lg font-bold text-zinc-700">
                {stat.icon}
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-400">
              {stat.description}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-950">
                أحدث المنتجات
              </h2>

              <p className="mt-1 text-xs text-zinc-400">
                آخر المنتجات التي تمت إضافتها
              </p>
            </div>

            <Link
              href="/admin/products"
              className="text-xs font-bold text-zinc-600 hover:text-zinc-950"
            >
              عرض الكل
            </Link>
          </div>

          {recentProducts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
                🦜
              </div>

              <p className="mt-4 font-bold">
                لا توجد منتجات حتى الآن
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                أضف أول منتج للمتجر.
              </p>

              <Link
                href="/admin/products/new"
                className="mt-5 inline-flex rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white"
              >
                إضافة منتج
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-5"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                    {product.main_image ? (
                      <Image
                        src={product.main_image}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xl">
                        🦜
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-zinc-950">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      {Number(product.price || 0).toLocaleString(
                        "ar-EG"
                      )}{" "}
                      جنيه
                    </p>
                  </div>

                  <div className="text-left">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${
                        product.status === "available"
                          ? "bg-emerald-50 text-emerald-700"
                          : product.status === "sold"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {product.status === "available"
                        ? "متاح"
                        : product.status === "sold"
                          ? "مباع"
                          : "مخفي"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">
              إجراءات سريعة
            </h2>

            <p className="mt-1 text-xs text-zinc-400">
              اختصارات لأكثر العمليات استخداماً
            </p>

            <div className="mt-5 space-y-3">
              <Link
                href="/admin/products/new"
                className="flex items-center justify-between rounded-2xl bg-zinc-950 p-4 text-white transition hover:bg-zinc-800"
              >
                <span>
                  <span className="block text-sm font-bold">
                    إضافة منتج جديد
                  </span>

                  <span className="mt-1 block text-xs text-zinc-400">
                    أضف ببغاء جديد للمتجر
                  </span>
                </span>

                <span className="text-xl">
                  +
                </span>
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4 transition hover:bg-zinc-50"
              >
                <span>
                  <span className="block text-sm font-bold">
                    إدارة المنتجات
                  </span>

                  <span className="mt-1 block text-xs text-zinc-400">
                    تعديل أو حذف المنتجات
                  </span>
                </span>

                <span>←</span>
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4 transition hover:bg-zinc-50"
              >
                <span>
                  <span className="block text-sm font-bold">
                    إدارة التصنيفات
                  </span>

                  <span className="mt-1 block text-xs text-zinc-400">
                    تنظيم منتجات المتجر
                  </span>
                </span>

                <span>←</span>
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                ✓
              </div>

              <div>
                <p className="text-sm font-bold">
                  حالة المتجر
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  المتجر متصل وقاعدة البيانات تعمل
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
