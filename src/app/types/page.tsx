import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductGrid from "@/app/components/ProductGrid";

export default async function TypesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0b0b0b] text-white"
    >
      <Navbar />

      {/* Page Header */}
      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1600px] px-6 pb-12 pt-32 sm:px-10 sm:pt-36 lg:px-14 lg:pb-16 lg:pt-40 xl:px-20">
          {/* Breadcrumb */}
          <nav
            aria-label="مسار التنقل"
            className="flex items-center gap-3 text-[11px] text-white/35"
          >
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-white/80"
            >
              الرئيسية
            </Link>

            <span className="text-white/15">/</span>

            <span className="text-white/70">
              الأنواع
            </span>
          </nav>

          {/* Heading */}
          <div className="mt-10 max-w-2xl">
            <span className="text-[10px] font-medium tracking-[0.3em] text-white/30">
              اكتشف مجموعتنا
            </span>

            <h1 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              أنواع الببغاوات
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-[15px]">
              تصفح جميع الببغاوات المتاحة لدينا واختر الطائر
              المناسب لك.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section>
        <div className="mx-auto max-w-[1600px] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 xl:px-20">
          {/* Section Top */}
          <div className="mb-8 flex items-center justify-between border-b border-white/[0.08] pb-5">
            <div>
              <p className="text-xs text-white/35">
                مجموعة الببغاوات
              </p>

              <h2 className="mt-2 text-lg font-medium text-white">
                جميع الأنواع
              </h2>
            </div>

            <span className="text-[10px] tracking-[0.2em] text-white/25">
              PARROTS
            </span>
          </div>

          <ProductGrid />
        </div>
      </section>

      <Footer />
    </main>
  );
}