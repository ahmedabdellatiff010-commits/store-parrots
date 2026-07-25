"use client";

import { Star, BadgeCheck } from "lucide-react";

type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
};

const reviews: Review[] = [
  {
    name: "محمد أحمد",
    location: "القاهرة",
    rating: 5,
    text: "التعامل كان ممتاز من أول مكالمة. شرحوا لي كل التفاصيل الخاصة بالببغاء قبل الشراء، ووصلني بحالة ممتازة زي ما اتفقنا بالضبط.",
    date: "منذ أسبوعين",
    verified: true,
  },
  {
    name: "سارة محمود",
    location: "الإسكندرية",
    rating: 5,
    text: "كنت مترددة في الشراء أونلاين، لكن تجربة نوادر كانت مختلفة. التواصل كان سريع والببغاء وصل بشكل آمن وحالته ممتازة.",
    date: "منذ شهر",
    verified: true,
  },
  {
    name: "أحمد خالد",
    location: "الجيزة",
    rating: 4,
    text: "تجربة جيدة جدًا والتعامل محترم. الببغاء كان مطابقًا للوصف والصور، وأكثر شيء عجبني هو المتابعة بعد الاستلام.",
    date: "منذ شهرين",
    verified: true,
  },
];

function RatingStars({
  rating,
  size = "small",
}: {
  rating: number;
  size?: "small" | "large";
}) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;

        return (
          <Star
            key={index}
            className={
              size === "large"
                ? `h-4 w-4 ${
                    filled
                      ? "fill-white text-white"
                      : "text-white/20"
                  }`
                : `h-3.5 w-3.5 ${
                    filled
                      ? "fill-white text-white"
                      : "text-white/20"
                  }`
            }
          />
        );
      })}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section
      dir="rtl"
      className="w-full border-t border-white/[0.08] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[10px] font-medium tracking-[0.25em] text-white/35">
              آراء العملاء
            </span>

            <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              تجارب حقيقية من عملائنا
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-white/45">
              نهتم بأن تكون تجربة شراء الببغاء واضحة ومريحة من أول
              تواصل وحتى استلام الطائر.
            </p>
          </div>

          {/* =================================================
              RATING SUMMARY
          ================================================== */}

          <div className="flex items-center gap-5 lg:pb-1">
            <div>
              <div className="flex items-center gap-1">
                <RatingStars rating={5} size="large" />
              </div>

              <p className="mt-3 text-xs text-white/35">
                بناءً على تجارب عملائنا
              </p>
            </div>

            <div className="h-12 w-px bg-white/10" />

            <div>
              <p className="text-2xl font-medium text-white">
                4.8
              </p>

              <p className="mt-1 text-[10px] text-white/35">
                من 5
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            REVIEWS
        ====================================================== */}

        <div className="mt-14 border-t border-white/[0.08]">
          <div className="grid md:grid-cols-3">
            {reviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className={`relative py-9 md:px-8 lg:py-10 ${
                  index === 0
                    ? "md:pr-0"
                    : ""
                } ${
                  index === reviews.length - 1
                    ? "md:pl-0"
                    : ""
                } ${
                  index !== reviews.length - 1
                    ? "border-b border-white/[0.08] md:border-b-0 md:border-l"
                    : ""
                }`}
              >
                {/* Quote */}

                <div className="text-4xl font-serif leading-none text-white/10">
                  “
                </div>

                {/* Review */}

                <p className="mt-4 text-[15px] leading-8 text-white/65">
                  {review.text}
                </p>

                {/* Rating */}

                <div className="mt-7">
                  <RatingStars rating={review.rating} />
                </div>

                {/* Customer */}

                <div className="mt-7 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-medium text-white">
                      {review.name.charAt(0)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">
                          {review.name}
                        </p>

                        {review.verified && (
                          <BadgeCheck
                            className="h-3.5 w-3.5 text-white/40"
                            aria-label="عميل موثّق"
                          />
                        )}
                      </div>

                      <p className="mt-1 text-[11px] text-white/30">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  {/* Date */}

                  <span className="text-[10px] text-white/25">
                    {review.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =====================================================
            TRUST FOOTER
        ====================================================== */}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            نحرص على تقديم تجربة واضحة وموثوقة لكل عميل.
          </p>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <BadgeCheck className="h-4 w-4 text-white/50" />

            <span>تجارب من عملائنا</span>
          </div>
        </div>
      </div>
    </section>
  );
}