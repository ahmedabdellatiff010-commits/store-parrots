const categories = [
  {
    title: "ببغاوات ذكية",
    description: "أقوى الخيارات للمتعة والتعامل اليومي",
  },
  {
    title: "ببغاوات كبيرة",
    description: "مظهر فاخر وشخصية مميزة",
  },
  {
    title: "ببغاوات هادئة",
    description: "مثالية للبيت والراحة والاستقرار",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-4 md:px-8 lg:px-10">
      <div className="rounded-[32px] border border-zinc-200 bg-white p-8 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Categories
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-950">
              تصنيفات بسيطة تناسب كل ذوق
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-600">
            اختر الفئة التي تناسب طبيعة منزلك أو تفضيلاتك، وسنساعدك في العثور على الطائر المناسب.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <div key={category.title} className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="text-xl font-semibold text-zinc-900">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
