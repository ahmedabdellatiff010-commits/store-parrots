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
    highlight: "واختر صديقك المفضل",
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
  const [isPaused, setIsPaused] = useState(false);

  const slide = slides[current];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================== */}
      <div className="absolute inset-0">
        <Image
          key={`hero-image-${current}`}
          src={slide.image}
          alt={slide.title}
          fill
          priority={current === 0}
          sizes="100vw"
          className="hero-background object-cover"
        />

        {/* Black Transparent Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Subtle Side Gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/20" />
      </div>

      {/* =========================
          DESKTOP HERO
      ========================== */}
      <div className="relative hidden min-h-[calc(100vh-72px)] lg:flex">
        <div className="mx-auto flex w-full max-w-[1440px] items-center px-10 xl:px-16 2xl:px-20">
          <div
            key={`desktop-content-${current}`}
            className="hero-content max-w-[570px] text-right text-white"
          >
            {/* Tag */}
            <div className="hero-tag mb-5 flex items-center gap-2.5 text-sm font-medium text-white/70">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />

              <span>{slide.tag}</span>
            </div>

            {/* Title */}
            <h1 className="hero-title text-4xl font-bold leading-[1.25] tracking-[-0.035em] text-white xl:text-5xl 2xl:text-6xl">
              {slide.title}
            </h1>

            {/* Highlight */}
            <h2 className="hero-highlight mt-3 text-2xl font-bold leading-[1.35] tracking-[-0.025em] text-white/80 xl:text-3xl">
              {slide.highlight}
            </h2>

            {/* Description */}
            <p className="hero-description mt-5 max-w-[500px] text-sm leading-7 text-white/65 xl:text-base xl:leading-8">
              {slide.description}
            </p>

            {/* Actions */}
            <div className="hero-actions mt-7 flex items-center gap-3">
              <Link
                href="/types"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-bold text-zinc-950 transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
              >
                تصفح الأنواع
              </Link>

              <Link
                href="#featured"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
              >
                اكتشف المزيد
              </Link>
            </div>
          </div>
        </div>

        {/* =========================
            DESKTOP CONTROLS
        ========================== */}
        <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between xl:left-16 xl:right-16 2xl:left-20 2xl:right-20">
          {/* Slide Progress */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                aria-current={current === index}
                onClick={() => goToSlide(index)}
                className={`relative h-1 overflow-hidden rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-12 bg-white/30"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              >
                {current === index && !isPaused && (
                  <span className="hero-progress absolute inset-0 origin-right bg-white" />
                )}
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={nextSlide}
              aria-label="الشريحة التالية"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={previousSlide}
              aria-label="الشريحة السابقة"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE / TABLET
      ========================== */}
      <div className="relative flex min-h-[calc(100svh-72px)] items-end lg:hidden">
        <div
          key={`mobile-content-${current}`}
          className="hero-mobile-content w-full px-5 pb-8 pt-32 sm:px-8 sm:pb-10"
        >
          {/* Tag */}
          <div className="hero-tag mb-4 flex items-center gap-2 text-xs font-medium text-white/70">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />

            <span>{slide.tag}</span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-3xl font-bold leading-[1.25] tracking-[-0.035em] text-white sm:text-4xl">
            {slide.title}
          </h1>

          {/* Highlight */}
          <h2 className="hero-highlight mt-2 text-xl font-bold leading-[1.35] text-white/80 sm:text-2xl">
            {slide.highlight}
          </h2>

          {/* Description */}
          <p className="hero-description mt-4 max-w-xl text-sm leading-7 text-white/65">
            {slide.description}
          </p>

          {/* Actions */}
          <div className="hero-actions mt-6 grid grid-cols-2 gap-2.5">
            <Link
              href="/types"
              className="flex h-11 items-center justify-center rounded-lg bg-white px-4 text-xs font-bold text-zinc-950 transition-all duration-200 active:scale-[0.98]"
            >
              تصفح الأنواع
            </Link>

            <Link
              href="#featured"
              className="flex h-11 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-4 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
            >
              اكتشف المزيد
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="mt-7 flex items-center justify-between">
            {/* Progress */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                  aria-current={current === index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-1 overflow-hidden rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-10 bg-white/30"
                      : "w-2 bg-white/30"
                  }`}
                >
                  {current === index && !isPaused && (
                    <span className="hero-progress absolute inset-0 origin-right bg-white" />
                  )}
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={nextSlide}
                aria-label="الشريحة التالية"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white backdrop-blur-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={previousSlide}
                aria-label="الشريحة السابقة"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white backdrop-blur-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          ANIMATIONS
      ========================== */}
      <style jsx>{`
        @keyframes heroBackground {
          from {
            opacity: 0;
            transform: scale(1.06);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes contentFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes tagReveal {
          from {
            opacity: 0;
            transform: translateX(35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateX(45px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes highlightReveal {
          from {
            opacity: 0;
            transform: translateX(35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes descriptionReveal {
          from {
            opacity: 0;
            transform: translateX(25px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes buttonsReveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        .hero-background {
          animation: heroBackground 1.2s ease-out both;
        }

        .hero-content {
          animation: contentFromRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-tag {
          animation: tagReveal 0.65s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-title {
          animation: titleReveal 0.7s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-highlight {
          animation: highlightReveal 0.7s 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-description {
          animation: descriptionReveal 0.7s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-actions {
          animation: buttonsReveal 0.7s 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-progress {
          animation: progress ${SLIDE_DURATION}ms linear both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-background,
          .hero-content,
          .hero-tag,
          .hero-title,
          .hero-highlight,
          .hero-description,
          .hero-actions,
          .hero-progress {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}