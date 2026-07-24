export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white/95 px-6 py-10 text-zinc-700 md:px-8 lg:px-12">
      <div className="mx-auto container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-zinc-900">نوادر الببغاوات</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-zinc-600">
            متجر متخصص في تقديم ببغاوات متميزة بعناية واهتمام. تواصل معنا مباشرة عبر واتساب للطلب.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 text-sm md:items-end">
          <a href={`https://wa.me/201063735899`} className="font-semibold text-zinc-900 transition-colors hover:text-zinc-700">
            تواصل عبر واتساب
          </a>
          <div className="flex gap-4">
            <a href="#featured" className="text-zinc-600 transition-colors hover:text-zinc-900">المنتجات</a>
            <a href="#categories" className="text-zinc-600 transition-colors hover:text-zinc-900">التصنيفات</a>
            <a href="#cta" className="text-zinc-600 transition-colors hover:text-zinc-900">تواصل</a>
          </div>
          <p className="mt-3 text-xs text-zinc-500">© {new Date().getFullYear()} نوادر الببغاوات. كل الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
