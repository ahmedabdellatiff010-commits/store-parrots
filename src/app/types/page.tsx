import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductGrid from "@/app/components/ProductGrid";

export default async function TypesPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfa] text-zinc-900" dir="rtl">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 lg:px-10 lg:py-16">
        <nav className="text-sm text-zinc-600">
          <Link href="/" className="hover:text-zinc-900">
            الرئيسية
          </Link>
          <span className="mx-2">›</span>
          <span className="font-semibold text-zinc-900">الأنواع</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-semibold text-zinc-950">الأنواع</h1>
          <p className="mt-2 text-sm text-zinc-600">كل المنتجات المتاحة في المتجر</p>
        </header>

        <div className="mt-8">
          <ProductGrid />
        </div>
      </section>

      <Footer />
    </main>
  );
}
