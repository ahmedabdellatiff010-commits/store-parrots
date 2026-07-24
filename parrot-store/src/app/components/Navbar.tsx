"use client";

import Link from "next/link";
import { useState } from "react";
import { WHATSAPP_PHONE_NUMBER } from "@/app/lib/products";

const links = [
  { href: "#featured", label: "المميزة" },
  { href: "/types", label: "الأنواع" },
  { href: "#categories", label: "الفئات" },
  { href: "#cta", label: "تواصل" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header dir="rtl" className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="نوادر الببغاوات">
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold text-zinc-900">
                نوادر
              </span>
              <span className="text-[15px] font-semibold  text-zinc-900">
                الببغاوات
              </span>
            </div>
            <span className="text-3xl">🦜</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors md:inline-flex"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              واتساب
            </a>

            <button
              type="button"
              aria-label="فتح القائمة"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && <div className="fixed inset-0 z-[60] bg-black/35 md:hidden" onClick={() => setMenuOpen(false)} />}

      <aside dir="rtl" className={`fixed right-0 top-0 z-[70] h-full w-[82%] max-w-sm bg-white shadow-2xl transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-5">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="text-base font-semibold text-zinc-900">نوادر</span>
              <span className="text-base font-semibold text-zinc-900">الببغاوات</span>
            </div>
            <span className="text-3xl">🦜</span>
          </Link>

          <button type="button" aria-label="إغلاق القائمة" onClick={() => setMenuOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-zinc-100 px-6 py-5 text-base font-medium text-zinc-800 transition-colors hover:text-zinc-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 right-0 flex w-full justify-center px-6">
          <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`} target="_blank" rel="noreferrer" className="w-full rounded-full bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white">
            التواصل عبر واتساب
          </a>
        </div>
      </aside>
    </>
  );
}