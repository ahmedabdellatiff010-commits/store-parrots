"use client";

import Image from "next/image";
import { useState } from "react";
import FavoriteButton from "./FavoriteButton";

type Props = {
  images: string[];
};

export default function ProductGallery({ images }: Props) {
  const [index, setIndex] = useState(0);

  const validImages = images?.filter(Boolean) ?? [];

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center bg-white/5 rounded-[20px] border border-white/20">
        <span className="text-sm text-white/60">
          لا توجد صورة للمنتج
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-white/5 rounded-[20px] border border-white/20 sm:aspect-[4/3]">
        <Image
          key={validImages[index]}
          src={validImages[index]}
          alt={`صورة ${index + 1} من ${validImages.length} لـ ${"المنتج"}`}
          fill
          priority={index === 0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-opacity duration-300"
        />

        {/* Favorite */}
        <div className="absolute right-4 top-4 z-10">
          <FavoriteButton />
        </div>
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="mt-3 overflow-x-auto">
          <div className="flex gap-2">
            {validImages.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`عرض الصورة ${i + 1}`}
                aria-current={index === i}
                className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden border rounded-[12px] transition-colors duration-200 ${
                  index === i
                    ? "border-white/60"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}