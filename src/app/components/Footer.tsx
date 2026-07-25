import Link from "next/link";

const WHATSAPP_NUMBER = "01111074774";

const exploreLinks = [
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

const helpLinks = [
  {
    href: "/categories",
    label: "تصفح الأقسام",
  },
  {
    href: "/types",
    label: "تصفح الأنواع",
  },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="border-t border-white/[0.08] bg-[#050505] text-white"
    >
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.7fr_1fr_1fr] lg:gap-20">
          {/* =================================================
              BRAND
          ================================================== */}

          <div className="max-w-xl">
            <Link
              href="/"
              aria-label="العودة إلى الصفحة الرئيسية"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-lg text-black transition-transform duration-300 group-hover:scale-105">
                🦜
              </span>

              <span>
                <span className="block text-[15px] font-semibold tracking-[0.12em]">
                  ملك
                </span>

                <span className="mt-0.5 block text-[11px] text-white/40">
                  الغابه
                </span>
              </span>
            </Link>

            <p className="mt-7 max-w-md text-sm leading-8 text-white/45">
              مجموعة مختارة من الببغاوات المميزة، نهتم بالجودة
              والصحة لنساعدك في العثور على صديقك المناسب.
            </p>

            {/* WhatsApp */}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex h-11 items-center gap-3 border border-white/15 bg-white px-5 text-xs font-semibold text-black transition-all duration-300 hover:bg-white/90"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.49 0 .16 5.33.16 11.88c0 2.09.55 4.13 1.59 5.92L.08 24l6.35-1.66a11.87 11.87 0 0 0 5.6 1.42h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.4-8.4ZM12.04 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.82 9.82 0 0 1-1.51-5.18C2.16 6.46 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.89 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" />
              </svg>

              <span>تواصل معنا عبر واتساب</span>

              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
            </a>
          </div>

          {/* =================================================
              EXPLORE
          ================================================== */}

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/35">
              استكشف
            </h3>

            <nav className="mt-6 flex flex-col gap-4">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  <span>{link.label}</span>

                  <span className="translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-60">
                    ←
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* =================================================
              HELP
          ================================================== */}

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/35">
              المساعدة
            </h3>

            <nav className="mt-6 flex flex-col gap-4">
              {helpLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  <span>{link.label}</span>

                  <span className="translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-60">
                    ←
                  </span>
                </Link>
              ))}

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white"
              >
                <span>الطلب عبر واتساب</span>

                <span className="translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-60">
                  ↗
                </span>
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} ملك الغابه . جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-white/25">
            <span>Created By Ahmed Abdellatiff</span>

            <span className="h-1 w-1 rounded-full bg-white/20" />

            <span>متجر  ملك الغابه</span>
          </div>
        </div>
      </div>
    </footer>
  );
}