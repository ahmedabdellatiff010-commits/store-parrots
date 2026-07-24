"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/birds/macaw.jpg",
    tag: "نوادر الببغاوات",
    title: "امتلك ببغاءك المفضل",
    highlight: "بأفضل صحة وأفضل تدريب",
    description:
      "نوفر لك أجمل أنواع الببغاوات بعناية فائقة وجودة مضمونة لتجد صديقك المثالي.",
  },
  {
    image: "/birds/macaw.jpg",
    tag: "اختيارات مميزة",
    title: "اكتشف عالم الببغاوات",
    highlight: "واختار صديقك المفضل",
    description:
      "أنواع مميزة وصحية تم اختيارها بعناية لتكون جزءًا مميزًا من عائلتك.",
  },
  {
    image: "/birds/macaw.jpg",
    tag: "رعاية وجودة",
    title: "ببغاؤك يستحق الأفضل",
    highlight: "من أول لحظة",
    description:
      "نهتم بكل التفاصيل لنقدم لك تجربة مختلفة في اختيار وامتلاك ببغائك.",
  },
];

const SLIDE_DURATION = 7000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section
      dir="rtl"
      className="relative mx-auto mt-4 w-[calc(100%-24px)] max-w-[1600px] overflow-hidden rounded-[28px] bg-[#f2f2ef] shadow-sm md:w-[calc(100%-40px)]"
    >
<div className="relative h-[calc(90vh-80px)] min-h-[650px] w-full overflow-hidden">        {/* الصورة */}
        <div
          key={`image-${current}`}
          className="absolute inset-0 animate-hero-image"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* التدرج */}
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/85 via-35% to-transparent" />

        {/* طبقة إضافية للموبايل */}
        <div className="absolute inset-0 bg-white/10 md:hidden" />

        {/* المحتوى */}
        <div
          key={`content-${current}`}
          className="relative z-10 flex h-full items-center"
        >
          <div className="w-full px-7 py-12 text-center md:w-[58%] md:px-12 md:text-right lg:w-[55%] lg:px-24">
            {/* Tag */}
            <div className="animate-hero-content mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              {slide.tag}
            </div>

            {/* العنوان */}
            <h1 className="animate-hero-title text-4xl font-black leading-[1.15] tracking-tight text-[#151515] md:text-5xl lg:text-7xl">
              {slide.title}
            </h1>

            {/* العنوان الأخضر */}
            <h2 className="animate-hero-highlight mt-3 text-3xl font-black leading-[1.2] text-[#168238] md:text-4xl lg:text-6xl">
              {slide.highlight}
            </h2>

            {/* الوصف */}
            <p className="animate-hero-description mx-auto mt-6 max-w-xl text-base leading-8 text-[#333] md:mx-0 md:text-lg lg:text-xl">
              {slide.description}
            </p>

            {/* CTA */}
            <div className="animate-hero-button mt-8 flex items-center justify-center gap-3 md:justify-start">
              <Link href="/types" className="group rounded-lg bg-[var(--accent)] px-6 py-3.5 font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)]">
                تصفح الأنواع
              </Link>

              <button className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20">
                اعرف أكثر
              </button>
            </div>
          </div>
        </div>


       

      
      </div>

      <style jsx>{`
        @keyframes heroImage {
          from {
            opacity: 0;
            transform: scale(1.08);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes heroContent {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroTitle {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroHighlight {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroDescription {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroButton {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroProgress {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        .animate-hero-image {
          animation: heroImage 1.2s ease-out both;
        }

        .animate-hero-content {
          animation: heroContent 0.7s 0.15s ease-out both;
        }

        .animate-hero-title {
          animation: heroTitle 0.8s 0.2s ease-out both;
        }

        .animate-hero-highlight {
          animation: heroHighlight 0.8s 0.3s ease-out both;
        }

        .animate-hero-description {
          animation: heroDescription 0.8s 0.4s ease-out both;
        }

        .animate-hero-button {
          animation: heroButton 0.8s 0.5s ease-out both;
        }

        .animate-hero-progress {
          animation: heroProgress ${SLIDE_DURATION}ms linear both;
        }
      `}</style>
    </section>
  );
}