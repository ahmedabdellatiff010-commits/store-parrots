"use client";

import { useState } from "react";

export default function FavoriteButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      aria-pressed={liked}
      onClick={() => setLiked((s) => !s)}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
      title={liked ? "أُضيف للمفضلة" : "أضف للمفضلة"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 21s-7.5-4.35-10-7.1C-1 10.6 3.5 5 8.5 7.5 10 8.4 12 10 12 10s2-1.6 3.5-2.5C20.5 5 25 10.6 22 13.9 19.5 16.65 12 21 12 21z" fill={liked ? "#059669" : "#e5e7eb"} />
      </svg>
    </button>
  );
}
