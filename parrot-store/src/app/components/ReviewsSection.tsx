export default function ReviewsSection() {
  const reviews = [
    { name: "محمد", location: "الجيزة", text: "أنصح الجميع بالتعامل معهم، احترافية عالية." },
    { name: "سارة", location: "الإسكندرية", text: "الببغاء جميل جداً والتوصيل سريع وآمن." },
    { name: "أحمد", location: "القاهرة", text: "تجربة رائعة ومصداقية في البيع، الببغاء سليم ويتكلم بالفعل." },
  ];

  return (
    <section dir="rtl" className="space-y-6">
      <h3 className="text-xl font-semibold text-zinc-900">آراء عملائنا</h3>

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-lg border border-zinc-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-100" />
              <div>
                <div className="text-sm font-semibold text-zinc-900">{r.name}</div>
                <div className="text-xs text-zinc-500">{r.location}</div>
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-700">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
