"use client";

import Image from "next/image";
import { useState } from "react";
import FavoriteButton from "./FavoriteButton";

type Props = {
  images: string[];
};

export default function ProductGallery({ images }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="relative aspect-[4/3] w-full">
          <Image src={images[index]} alt={`صورة المنتج ${index + 1}`} fill className="object-cover transition-opacity duration-300" />
        </div>

        <div className="absolute top-3 left-3">
          <FavoriteButton />
        </div>
      </div>

      <div className="mt-3 -mx-2 overflow-x-auto px-2">
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`عرض الصورة ${i + 1}`}
              className={`relative shrink-0 overflow-hidden rounded-md border ${index === i ? "border-zinc-900" : "border-zinc-200"} focus:outline-none`}
              style={{ width: 92, height: 64 }}
            >
              <Image src={src} alt={`thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
