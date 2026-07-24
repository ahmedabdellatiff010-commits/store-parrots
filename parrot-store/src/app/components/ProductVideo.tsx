import type { Product } from "@/app/types/product";

type Props = { product: Product & { video?: string } };

export default function ProductVideo({ product }: Props) {
  // If product had `video` property, show it. Otherwise show friendly placeholder.
  // Keeping this server component simple and non-interactive.
  const videoUrl: string | undefined = product.video;

  if (!videoUrl) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-600">
        لا يوجد فيديو لهذا المنتج حالياً
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-black">
      <video src={videoUrl} controls className="w-full max-h-[480px] object-cover" />
    </div>
  );
}
