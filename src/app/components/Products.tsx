"use client";

import Image from "next/image";

const products = [
  {
    id: 1,
    name: "African Grey",
    price: "15,000 جنيه",
    image: "/birds/african-grey.jpg",
  },
  {
    id: 2,
    name: "Blue Macaw",
    price: "25,000 جنيه",
    image: "/birds/macaw.jpg",
  },
  {
    id: 3,
    name: "Cockatoo",
    price: "20,000 جنيه",
    image: "/birds/cockatoo.jpg",
  },
  {
    id: 4,
    name: "Cockatooo",
    price: "21,000 جنيه",
    image: "/birds/cockatoo.jpg",
  },
];

const WHATSAPP_NUMBER = "201063735899";

export default function Products() {
  const handleWhatsApp = (product: (typeof products)[number]) => {
    const message = `مرحبًا، أريد الاستفسار عن الببغاء:

النوع: ${product.name}
السعر: ${product.price}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <section dir="rtl" className="bg-[#fafafa] px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-bold text-[#168238]">
              اختياراتنا
            </p>

            <h2 className="text-3xl font-black text-[#171717] md:text-4xl">
              الببغاوات المتاحة
            </h2>
          </div>

          <button className="hidden text-sm font-bold text-[#168238] transition hover:text-[#116b2e] md:block">
            عرض الكل ←
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ee]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-black text-[#171717]">
                  {product.name}
                </h3>

                <p className="mt-2 text-base font-bold text-[#168238]">
                  {product.price}
                </p>

                <button
                  onClick={() => handleWhatsApp(product)}
                  className="mt-5 w-full rounded-xl bg-[#168238] py-3.5 font-bold text-white transition-colors duration-300 hover:bg-[#116b2e]"
                >
                  اطلب عبر واتساب
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}