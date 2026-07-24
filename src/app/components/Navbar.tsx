"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WHATSAPP_PHONE_NUMBER } from "@/app/lib/products";

const links = [
  {
    href: "/",
    label: "الرئيسية",
  },
  {
    href: "/types",
    label: "أنواع الببغاوات",
  },
  {
    href: "/categories",
    label: "الأقسام",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <header
        dir="rtl"
        className="absolute inset-x-0 top-0 z-50 w-full text-white"
      >
        <div className="relative mx-auto h-[88px] w-full max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
          {/* LOGO */}

          <Link
            href="/"
            aria-label="العودة إلى الصفحة الرئيسية - نوادر الببغاوات"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-opacity duration-300 hover:opacity-70"
          >
            <span className="text-[15px] font-semibold tracking-[0.42em] sm:text-[17px]">
              نــوادر
            </span>
          </Link>

          {/* MENU BUTTON */}

          <div className="absolute right-6 top-1/2 flex -translate-y-1/2 sm:right-10 lg:right-14 xl:right-20">
            <button
              type="button"
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(true)}
              className="group flex h-11 items-center gap-3 text-white transition-opacity duration-300 hover:opacity-70"
            >
              <span className="relative flex h-10 w-10 items-center justify-center">
                <span className="flex w-[21px] flex-col gap-[6px]">
                  <span className="h-px w-full bg-current" />

                  <span className="h-px w-[65%] bg-current transition-all duration-300 group-hover:w-full" />
                </span>
              </span>

              <span className="hidden text-[10px] font-medium tracking-[0.28em] md:block">
                القائمة
              </span>
            </button>
          </div>

          {/* WHATSAPP */}

          <div className="absolute left-6 top-1/2 -translate-y-1/2 sm:left-10 lg:left-14 xl:left-20">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="التواصل معنا عبر واتساب"
              className="group flex h-11 items-center gap-3 border border-white/35 bg-black/10 px-5 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-zinc-950"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3.5 20l1.2-4.1A8.5 8.5 0 1 1 20.5 11.5Z" />

                <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.7 1.3 1.7 2.3 3 3l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.4.2-1.1-.2-2.4-.9-3.7-2.1-1.2-1.1-2.1-2.4-2.5-3.5-.2-.6-.2-1.2 0-1.7Z" />
              </svg>

              <span className="text-[10px] font-semibold tracking-[0.18em]">
                واتساب
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        aria-hidden={!menuOpen}
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* =====================================================
          DRAWER
      ====================================================== */}

      <aside
        id="main-navigation"
        dir="rtl"
        aria-label="القائمة الرئيسية"
        aria-hidden={!menuOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[520px] flex-col bg-[#111111] text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}

        <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-white/10 px-6 sm:px-8">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-sm font-semibold tracking-[0.38em]"
          >
            نــوادر
          </Link>

          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center text-white/50 transition-colors hover:text-white"
          >
            <span className="relative block h-6 w-6">
              <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />

              <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
          <div className="mb-10">
            <span className="text-[10px] font-medium tracking-[0.3em] text-white/30">
              استكشف نوادر الببغاوات
            </span>

            <p className="mt-3 max-w-sm text-sm leading-7 text-white/40">
              اكتشف مجموعتنا من الببغاوات النادرة واختر الطائر المناسب لك.
            </p>
          </div>

          <div className="flex flex-col">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group relative flex items-center justify-between border-b border-white/10 py-5 transition-colors hover:border-white/25"
              >
                {/* RIGHT CONTENT */}

                <div className="flex min-w-0 items-center gap-5">
                  <span className="w-6 shrink-0 text-[10px] tabular-nums text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <span className="block text-lg font-medium text-white/90 transition-transform duration-300 group-hover:-translate-x-2">
                      {link.label}
                    </span>

                    <span className="mt-1 block truncate text-xs text-white/30 transition-colors duration-300 group-hover:text-white/50">
                      {link.description}
                    </span>
                  </div>
                </div>

                {/* ARROW */}

                <span className="mr-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-white/30 group-hover:text-white">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* FOOTER */}

        <div className="shrink-0 border-t border-white/10 p-6 sm:p-8">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="flex h-13 w-full items-center justify-center bg-white px-6 py-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white/90"
          >
            تواصل معنا عبر واتساب
          </a>

          <p className="mt-4 text-center text-[10px] text-white/30">
            نساعدك في اختيار الببغاء المناسب لك
          </p>
        </div>
      </aside>
    </>
  );
}