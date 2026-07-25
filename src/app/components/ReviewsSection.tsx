export default function ReviewsSection() {
  const reviews = [
    {
      name: "محمد",
      location: "الجيزة",
      rating: 5,
      text: "أنصح الجميع بالتعامل معهم، احترافية عالية وتعامل محترم جدًا من أول التواصل لحد استلام الببغاء.",
    },
    {
      name: "سارة",
      location: "الإسكندرية",
      rating: 5,
      text: "الببغاء جميل جدًا والتوصيل كان سريع وآمن. تجربة ممتازة وهتعامل معاهم مرة تانية.",
    },
    {
      name: "أحمد",
      location: "القاهرة",
      rating: 5,
      text: "تجربة رائعة ومصداقية في البيع. الببغاء وصل بحالة ممتازة وكل التفاصيل كانت واضحة.",
    },
  ];

  return (
    <section dir="rtl" className="w-full">
      {/* Section Header */}
      <div className="flex flex-col gap-6 border-b border-white/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-white/60">
            آراء العملاء
          </p>

          <h3 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-white sm:text-3xl">
            تجارب عملائنا
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
            رضا عملائنا هو أهم جزء في تجربتنا. تعرف على تجارب بعض العملاء
            الذين اختاروا ببغاواتهم من نوادر الببغاوات.
          </p>
        </div>

        {/* Overall Rating */}
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="text-sm text-white"
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </div>

          <div className="h-8 w-px bg-white/20" />

          <div>
            <p className="text-sm font-medium text-white">
              5.0 من 5
            </p>

            <p className="mt-0.5 text-xs text-white/60">
              تقييم العملاء
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid gap-0 md:grid-cols-3">
        {reviews.map((review, index) => (
          <article
            key={`${review.name}-${index}`}
            className={`py-8 md:px-7 ${
              index !== reviews.length - 1
                ? "border-b border-white/20 md:border-b-0 md:border-l"
                : ""
            } ${
              index === 0
                ? "md:pr-0"
                : ""
            } ${
              index === reviews.length - 1
                ? "md:pl-0"
                : ""
            }`}
          >
            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: review.rating }).map((_, starIndex) => (
                <span
                  key={starIndex}
                  className="text-xs text-white"
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>

            {/* Review */}
            <p className="mt-5 text-sm leading-7 text-white/70">
              “{review.text}”
            </p>

            {/* Customer */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white">
                {review.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  {review.name}
                </p>

                <p className="mt-0.5 text-xs text-white/60">
                  {review.location}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}