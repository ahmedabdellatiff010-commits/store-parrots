import Link from "next/link";

const WHATSAPP_NUMBER = "201063735899";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl">
                🦜
              </span>

              <span className="flex flex-col">
                <span className="text-base font-bold leading-5">
                  نوادر
                </span>

                <span className="text-xs leading-5 text-white/60">
                  الببغاوات
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
              نوفر لك مجموعة مميزة من الببغاوات المختارة بعناية،
              مع الاهتمام بصحة الطائر وجودته لتجد صديقك المناسب.
            </p>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex h-11 items-center gap-2.5 rounded-lg bg-white px-5 text-sm font-semibold text-black transition-all duration-200 hover:bg-gray-200 active:scale-[0.98]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.49 0 .16 5.33.16 11.88c0 2.09.55 4.13 1.59 5.92L.08 24l6.35-1.66a11.87 11.87 0 0 0 5.6 1.42h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.4-8.4ZM12.04 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.82 9.82 0 0 1-1.51-5.18C2.16 6.46 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.89 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" />
              </svg>

              تواصل معنا عبر واتساب
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              استكشف
            </h3>

            <nav className="mt-5 flex flex-col gap-4">
              <Link
                href="/"
                className="w-fit text-sm text-white/60 transition-colors hover:text-white"
              >
                الرئيسية
              </Link>

              <Link
                href="#featured"
                className="w-fit text-sm text-white/60 transition-colors hover:text-white"
              >
                الببغاوات المميزة
              </Link>

              <Link
                href="/types"
                className="w-fit text-sm text-white/60 transition-colors hover:text-white"
              >
                أنواع الببغاوات
              </Link>

              <Link
                href="#categories"
                className="w-fit text-sm text-white/60 transition-colors hover:text-white"
              >
                التصنيفات
              </Link>
            </nav>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              المساعدة
            </h3>

            <nav className="mt-5 flex flex-col gap-4">
              <Link
                href="#cta"
                className="w-fit text-sm text-white/60 transition-colors hover:text-white"
              >
                تواصل معنا
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-sm text-white/60 transition-colors hover:text-white"
              >
                الطلب عبر واتساب
              </a>

              <Link
                href="/"
                className="w-fit text-sm text-white/60 transition-colors hover:text-white"
              >
                كيفية الطلب
              </Link>
            </nav>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              هل تبحث عن ببغاء معين؟
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/70">
              تواصل معنا وسنساعدك في العثور على الببغاء
              المناسب لك.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex h-11 w-full items-center justify-center rounded-lg border border-white/20 text-sm font-medium text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10"
            >
              تحدث معنا
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-5 text-xs text-white/60 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>
            © {new Date().getFullYear()} نوادر الببغاوات. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-5">
            <span>صنع بحب في مصر</span>

            <span className="h-1 w-1 rounded-full bg-white/20" />

            <span>متجر الببغاوات المميز</span>
          </div>
        </div>
      </div>
    </footer>
  );
}