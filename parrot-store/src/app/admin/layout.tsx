import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f7f7f8] text-zinc-950"
    >
      {/* Sidebar */}
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 border-l border-zinc-200 bg-white lg:flex lg:flex-col">
        {/* Brand */}
        <div className="border-b border-zinc-100 px-6 py-6">
          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-xl">
              🦜
            </div>

            <div>
              <h1 className="font-bold tracking-tight">
                نوادر الببغاوات
              </h1>

              <p className="mt-0.5 text-xs text-zinc-500">
                لوحة التحكم
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            الإدارة
          </p>

          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100">
              ⌂
            </span>

            الرئيسية
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-xl bg-zinc-950 px-3 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              ◈
            </span>

            المنتجات
          </Link>
        </nav>

        {/* Bottom */}
        <div className="space-y-2 border-t border-zinc-100 p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center rounded-xl border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            مشاهدة الموقع
          </Link>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-lg">
              🦜
            </div>

            <div>
              <p className="text-sm font-bold">
                نوادر الببغاوات
              </p>

              <p className="text-[10px] text-zinc-500">
                لوحة التحكم
              </p>
            </div>
          </Link>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              خروج
            </button>
          </form>
        </div>

        <div className="flex gap-2 border-t border-zinc-100 px-4 py-2">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100"
          >
            الرئيسية
          </Link>

          <Link
            href="/admin/products"
            className="rounded-lg bg-zinc-950 px-3 py-2 text-xs font-semibold text-white"
          >
            المنتجات
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="lg:mr-64">
        <header className="hidden h-20 items-center justify-between border-b border-zinc-200 bg-white px-8 lg:flex">
          <div>
            <p className="text-sm font-medium text-zinc-400">
              لوحة التحكم
            </p>

            <p className="mt-1 text-sm font-semibold text-zinc-900">
              مرحبًا بك 👋
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            مشاهدة الموقع
          </Link>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}