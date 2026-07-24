"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

const navigation = [
  {
    label: "الرئيسية",
    href: "/admin",
    icon: "⌂",
  },
  {
    label: "المنتجات",
    href: "/admin/products",
    icon: "▣",
  },
  {
    label: "التصنيفات",
    href: "/admin/categories",
    icon: "◈",
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f7f7f8] text-zinc-950"
    >
      {mobileOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[280px] flex-col border-l border-zinc-200 bg-white transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-zinc-100 px-6">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-xl text-white">
              🦜
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-950">
                نوادر الببغاوات
              </p>

              <p className="mt-0.5 text-xs text-zinc-400">
                لوحة التحكم
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-zinc-500 hover:bg-zinc-100 lg:hidden"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-4 px-3 text-[11px] font-bold tracking-wider text-zinc-400">
            الإدارة
          </p>

          <div className="space-y-2">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition ${
                    active
                      ? "bg-zinc-950 text-white shadow-sm"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                      active
                        ? "bg-white/10"
                        : "bg-zinc-100"
                    }`}
                  >
                    {item.icon}
                  </span>

                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="my-6 h-px bg-zinc-100" />

          <p className="mb-4 px-3 text-[11px] font-bold tracking-wider text-zinc-400">
            إجراءات سريعة
          </p>

          <div className="space-y-2">
            <Link
              href="/admin/products/new"
              onClick={() => setMobileOpen(false)}
              className="flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-white">
                +
              </span>

              إضافة منتج
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100">
                ↗
              </span>

              زيارة المتجر
            </Link>
          </div>
        </nav>

        <div className="border-t border-zinc-100 p-4">
          <form
            action="/api/admin/logout"
            method="POST"
          >
            <LogoutButton />
          </form>
        </div>
      </aside>

      <div className="min-h-screen lg:mr-[280px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-lg shadow-sm lg:hidden"
            >
              ☰
            </button>

            <div>
              <p className="text-sm font-bold text-zinc-950">
                لوحة التحكم
              </p>

              <p className="hidden text-xs text-zinc-400 sm:block">
                إدارة متجر نوادر الببغاوات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden h-10 items-center rounded-xl border border-zinc-200 px-4 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 sm:flex"
            >
              مشاهدة المتجر ↗
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
              A
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1500px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
