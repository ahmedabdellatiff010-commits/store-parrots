import Link from "next/link";
import Image from "next/image";
import DeleteProductButton from "@/app/admin/components/DeleteProductButton";
import {
  assertSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  assertSupabaseConfigured();

  const { data: products, error } =
    await supabaseAdmin!
      .from("products")
      .select(
        "id, name, slug, price, main_image, status, quantity, created_at"
      )
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (products || []) as any[];

  return (
    <div
      dir="rtl"
      className="space-y-6 pb-10"
    >
      <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-xl text-white">
              ▣
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                المنتجات
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                إدارة منتجات المتجر ومتابعة المخزون.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-zinc-950 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800"
        >
          + إضافة منتج
        </Link>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <p className="text-xs font-semibold text-zinc-400">
            إجمالي المنتجات
          </p>

          <p className="mt-2 text-2xl font-bold">
            {rows.length}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <p className="text-xs font-semibold text-zinc-400">
            المتاحة
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {
              rows.filter(
                (item) =>
                  item.status === "available"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <p className="text-xs font-semibold text-zinc-400">
            المباعة
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {
              rows.filter(
                (item) =>
                  item.status === "sold"
              ).length
            }
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">
        {rows.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
              🦜
            </div>

            <h2 className="mt-5 font-bold">
              لا توجد منتجات
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              ابدأ بإضافة أول منتج للمتجر.
            </p>

            <Link
              href="/admin/products/new"
              className="mt-5 inline-flex rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white"
            >
              إضافة منتج
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-right">
                <thead className="border-b border-zinc-100 bg-zinc-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500">
                      المنتج
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-zinc-500">
                      السعر
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-zinc-500">
                      المخزون
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-zinc-500">
                      الحالة
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-zinc-500">
                      الإجراءات
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100">
                  {rows.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-zinc-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-zinc-100">
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

                          <div>
                            <p className="font-bold text-zinc-950">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-zinc-400">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold">
                        {Number(
                          product.price || 0
                        ).toLocaleString(
                          "ar-EG"
                        )}{" "}
                        جنيه
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {product.quantity ?? 0}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            product.status ===
                            "available"
                              ? "bg-emerald-50 text-emerald-700"
                              : product.status ===
                                  "sold"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {product.status ===
                          "available"
                            ? "متاح"
                            : product.status ===
                                "sold"
                              ? "مباع"
                              : "مخفي"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-bold transition hover:bg-zinc-50"
                          >
                            تعديل
                          </Link>

                          <DeleteProductButton
                            productId={
                              product.id
                            }
                            productName={
                              product.name
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-zinc-100 md:hidden">
              {rows.map((product) => (
                <div
                  key={product.id}
                  className="p-5"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                      {product.main_image ? (
                        <Image
                          src={product.main_image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-2xl">
                          🦜
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-bold">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-sm font-semibold">
                        {Number(
                          product.price || 0
                        ).toLocaleString(
                          "ar-EG"
                        )}{" "}
                        جنيه
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-zinc-400">
                          المخزون:
                        </span>

                        <span className="text-xs font-bold">
                          {product.quantity ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.status ===
                        "available"
                          ? "bg-emerald-50 text-emerald-700"
                          : product.status ===
                              "sold"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {product.status ===
                      "available"
                        ? "متاح"
                        : product.status ===
                            "sold"
                          ? "مباع"
                          : "مخفي"}
                    </span>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-bold"
                      >
                        تعديل
                      </Link>

                      <DeleteProductButton
                        productId={
                          product.id
                        }
                        productName={
                          product.name
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
