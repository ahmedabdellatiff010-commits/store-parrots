import CategoriesSection from "@/app/components/CategoriesSection";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import ProductGrid from "@/app/components/ProductGrid";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { getAllProducts } from "@/app/lib/products";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-[#fcfcfa] text-zinc-900">
      <Navbar />
      <Hero />

      <CategoriesSection />

      <section id="featured" className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Featured parrots
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-950 md:text-4xl">
              تشكيلة مختارة من الببغاوات المميزة
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-zinc-600">
            كل ببغاء في المتجر تم اختياره بعناية لتقديم شخصية قوية، صحة ممتازة، وتجربة شراء مريحة.
          </p>
        </div>

        <ProductGrid />
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:px-10">
        <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-8 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Direct ordering
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            هل تريد ببغاءً يناسب عائلتك؟
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">
            ارسل لنا تفاصيل الطلب مباشرة عبر واتساب وسنساعدك في اختيار الطائر الأنسب لك بسرعة ووضوح.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton product={products[0]} label="اطلب عبر واتساب" />
            <a
              href="#featured"
              className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
            >
              استعرض المنتجات
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}