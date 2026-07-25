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
  const [isScrolled, setIsScrolled] = useState(false);

  /* =====================================================
     SCROLL EFFECT
  ====================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     LOCK BODY SCROLL WHEN MENU IS OPEN
  ====================================================== */

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  /* =====================================================
     ESCAPE TO CLOSE MENU
  ====================================================== */

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
        className={`fixed inset-x-0 top-0 z-50 w-full text-white transition-all duration-500 ${
          isScrolled
            ? "border-b border-white/[0.08] bg-black/45 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[92px] w-full max-w-[1700px] items-center px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="relative flex h-full w-full items-center justify-between">
            {/* =================================================
                MENU BUTTON
            ================================================== */}

            <button
              type="button"
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(true)}
              className={`group flex h-12 items-center gap-3 rounded-full border px-4 backdrop-blur-md transition-all duration-300 ${
                isScrolled
                  ? "border-white/15 bg-white/[0.04] hover:border-white/35 hover:bg-white hover:text-black"
                  : "border-white/20 bg-black/10 hover:border-white/40 hover:bg-white hover:text-black"
              }`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="absolute top-[6px] h-px w-[18px] bg-current transition-transform duration-300 group-hover:translate-y-[3px]" />

                <span className="absolute top-[12px] h-px w-[12px] self-start bg-current transition-all duration-300 group-hover:w-[18px]" />
              </span>

              <span className="hidden text-[10px] font-medium tracking-[0.25em] sm:block">
                القائمة
              </span>
            </button>

            {/* =================================================
                LOGO
            ================================================== */}

            <Link
              href="/"
              aria-label="العودة إلى الصفحة الرئيسية - نوادر الببغاوات"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="block text-[16px] font-semibold tracking-[0.4em] transition-opacity duration-300 hover:opacity-60 sm:text-[18px]">
                نــوادر
              </span>
            </Link>

            {/* =================================================
                WHATSAPP
            ================================================== */}

            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="التواصل معنا عبر واتساب"
              className={`group flex h-12 items-center gap-2.5 rounded-full border px-4 backdrop-blur-md transition-all duration-300 sm:px-5 ${
                isScrolled
                  ? "border-white/15 bg-white/[0.04] hover:border-white hover:bg-white hover:text-black"
                  : "border-white/20 bg-black/10 hover:border-white hover:bg-white hover:text-black"
              }`}
            >
              <svg
                width="16"
                height="16"
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

              <span className="hidden text-[10px] font-semibold tracking-[0.18em] sm:block">
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
        className={`fixed inset-0 z-[60] bg-black/90 backdrop-blur-[8px] transition-all duration-500 ${
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
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-[#0d0d0d] text-white shadow-[-20px_0_80px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* =================================================
            DRAWER HEADER
        ================================================== */}

        <div className="relative flex h-[92px] shrink-0 items-center justify-between border-b border-white/[0.08] px-6 sm:px-8">
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="text-[15px] font-semibold tracking-[0.4em] transition-opacity hover:opacity-50"
          >
            نــوادر
          </Link>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={closeMenu}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-white/30 hover:bg-white hover:text-black"
          >
            <span className="relative block h-5 w-5">
              <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current transition-transform duration-300 group-hover:rotate-0" />

              <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current transition-transform duration-300 group-hover:rotate-0" />
            </span>
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}

        <nav className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
          {/* LABEL */}

          <div className="mb-8">
            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/30">
              استكشف
            </span>
          </div>

          {/* LINKS */}

          <div className="border-t border-white/[0.08]">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group relative flex min-h-[82px] items-center justify-between border-b border-white/[0.08] transition-colors duration-300 hover:bg-white/[0.035]"
              >
                {/* LINK CONTENT */}

                <div className="flex items-center gap-5">
                  {/* NUMBER */}

                  <span className="text-[10px] font-medium tabular-nums text-white/20 transition-colors duration-300 group-hover:text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* TITLE */}

                  <span className="text-[19px] font-medium text-white/85 transition-transform duration-300 group-hover:-translate-x-2 group-hover:text-white">
                    {link.label}
                  </span>
                </div>

                {/* ARROW */}

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
                  <svg
                    width="14"
                    height="14"
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

        {/* =================================================
            DRAWER FOOTER
        ================================================== */}

        <div className="shrink-0 border-t border-white/[0.08] p-6 sm:p-8">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="group flex h-14 w-full items-center justify-center gap-3 bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90"
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
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3.5 20l1.2-4.1A8.5 8.5 0 1 1 20.5 11.5Z" />

              <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.7 1.3 1.7 2.3 3 3l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.4.2-1.1-.2-2.4-.9-3.7-2.1-1.2-1.1-2.1-2.4-2.5-3.5-.2-.6-.2-1.2 0-1.7Z" />
            </svg>

            <span>تواصل معنا عبر واتساب</span>
          </a>
        </div>
      </aside>
    </>
  );
}