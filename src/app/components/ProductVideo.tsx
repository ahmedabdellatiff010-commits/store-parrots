import type { Product } from "@/app/types/product";

type Props = { product: Product & { video?: string } };

export default function ProductVideo({ product }: Props) {
  // If product had `video` property, show it. Otherwise show friendly placeholder.
  // Keeping this server component simple and non-interactive.
  const videoUrl: string | undefined = product.video;

  if (!videoUrl) {
    return (
      <div className="rounded-[16px] border border-white/20 bg-white/5 p-6 text-center text-sm text-white/60\">
        لا يوجد فيديو لهذا المنتج حالياً
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-white/20 bg-black\">
      <video src={videoUrl} controls className="w-full max-h-[480px] object-cover" />
    </div>
  );
}
