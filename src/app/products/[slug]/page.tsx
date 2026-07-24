import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ProductDetails from "@/app/components/ProductDetails";
import { getProductBySlug } from "@/app/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fcfcfa] text-zinc-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 lg:px-10 lg:py-16">
        <Link href="/" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-950">
          ← العودة إلى الصفحة الرئيسية
        </Link>

        <div className="mt-8">
          <ProductDetails product={product} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
