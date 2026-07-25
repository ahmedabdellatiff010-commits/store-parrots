"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

interface CategoryCardProps {
  category: Category;
  index: number;
  className: string;
  large?: boolean;
}

export default function AnimatedCategoryCard({
  category,
  index,
  className,
  large = false,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link
        href={`/categories/${encodeURIComponent(category.slug)}`}
        className={`group relative block overflow-hidden rounded-[32px] bg-slate-950 shadow-[0_28px_80px_rgba(15,23,42,0.45)] transition-all duration-500 hover:shadow-[0_40px_120px_rgba(15,23,42,0.65)] ${className}`}
      >
        {/* IMAGE */}

        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority={index < 2}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
            <span className="text-[9px] tracking-[0.2em] text-zinc-400">
              NO IMAGE
            </span>
          </div>
        )}

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* NUMBER */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05 + 0.2,
          }}
          viewport={{ once: true }}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-white/30 bg-black/10 backdrop-blur-md transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/20"
        >
          <span className="text-[9px] text-white">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        {/* ARROW */}

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05 + 0.2,
          }}
          viewport={{ once: true }}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white/50 group-hover:bg-white group-hover:text-zinc-950"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </motion.div>

        {/* TEXT */}

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7">
          <p className="mb-2 text-[8px] font-medium tracking-[0.25em] text-white/60 transition-colors duration-300 group-hover:text-white/80">
            COLLECTION
          </p>

          <h3
            className={
              large
                ? "text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl transition-colors duration-300 group-hover:text-white"
                : "text-lg font-semibold leading-tight tracking-[-0.025em] text-white sm:text-xl lg:text-2xl transition-colors duration-300 group-hover:text-white"
            }
          >
            {category.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
