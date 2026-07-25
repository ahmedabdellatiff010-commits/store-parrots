import CategoriesSection from "@/app/components/CategoriesSection";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import ProductGrid from "@/app/components/ProductGrid";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import FadeInSection from "@/app/components/FadeInSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import StatsSection from "@/app/components/StatsSection";
import NewsletterSection from "@/app/components/NewsletterSection";
import FAQSection from "@/app/components/FAQSection";
import { getAllProducts } from "@/app/lib/products";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-black text-zinc-900">
      <Navbar />
      <Hero />

      <section id="hero-features" className="bg-[#050712] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
          <FadeInSection delay={0.1}>
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">
                لماذا تختارنا
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                تجربة شراء راقية للببغاء الجديد
              </h2>
            </div>
          </FadeInSection>

          <div className="grid gap-4 sm:grid-cols-3">
            <FadeInSection delay={0.2}>
              <div className="group rounded-[28px] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_28px_100px_rgba(255,255,255,0.1)]">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/50">
                  جودة مضمونة
                </p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  فراخ مختارة بعناية
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70 group-hover:text-white/80 transition-colors duration-300">
                  كل ببغاء يمر بفحص صحي شامل قبل أن يصل إليك.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="group rounded-[28px] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_28px_100px_rgba(255,255,255,0.1)]">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/50">
                  تجربة فريدة
                </p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  دعم واتساب مباشر
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70 group-hover:text-white/80 transition-colors duration-300">
                  فريقنا يساعدك في اختيار الببغاء المناسب ويجيب على جميع الاستفسارات.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="group rounded-[28px] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_28px_100px_rgba(255,255,255,0.1)]">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/50">
                  أسرع تسليم
                </p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  وصول سريع وآمن
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70 group-hover:text-white/80 transition-colors duration-300">
                  ننسق لك عملية التسليم بأسرع وقت وبأفضل شروط ممكنة.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <CategoriesSection />

      <section id="featured" className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:px-10">
        <FadeInSection delay={0.1}>
          <div className="mb-10 overflow-hidden rounded-[40px] border border-white/10 bg-slate-950/20 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.35)] md:p-10 transition-all duration-500 hover:border-white/20 hover:bg-slate-950/30 hover:shadow-[0_50px_150px_rgba(15,23,42,0.45)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">
                  Featured parrots
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  تشكيلة مختارة من الببغاوات المميزة
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-zinc-400">
                كل ببغاء في المتجر تم اختياره بعناية لتقديم شخصية قوية، صحة ممتازة، وتجربة شراء مريحة.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[#08111d]/80 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-6 transition-all duration-500 hover:border-white/20 hover:bg-[#08111d] hover:shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
            <ProductGrid />
          </div>
        </FadeInSection>
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:px-10">
        <FadeInSection delay={0.1}>
          <div className="group overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#071118] via-[#020409] to-[#03111b] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:p-12 transition-all duration-500 hover:border-white/20 hover:shadow-[0_50px_140px_rgba(0,0,0,0.55)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white/60 transition-colors duration-300">
              Direct ordering
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              هل تريد ببغاءً يناسب عائلتك؟
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300 group-hover:text-zinc-200 transition-colors duration-300">
              ارسل لنا تفاصيل الطلب مباشرة عبر واتساب وسنساعدك في اختيار الطائر الأنسب لك بسرعة ووضوح.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppButton product={products[0]} label="اطلب عبر واتساب" />
              <a
                href="#featured"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/15 active:scale-95"
              >
                استعرض المنتجات
              </a>
            </div>
          </div>
        </FadeInSection>
      </section>

      <StatsSection />

      <TestimonialsSection />

      <NewsletterSection />

      <FAQSection />

      <Footer />
    </main>
  );
}