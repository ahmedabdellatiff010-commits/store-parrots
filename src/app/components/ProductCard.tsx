"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  type Variants,
} from "framer-motion";

import type { Product } from "@/app/types/product";

type ProductCardProps = {
  product: Product;
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const primaryImage =
    product.images?.[0];

  const secondaryImage =
    product.images?.[1];

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="group w-full"
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={`عرض ${product.name}`}
        className="
          relative
          block
          aspect-[4/4.8]
          overflow-hidden
          bg-zinc-100
        "
      >
        {primaryImage ? (
          <>
            <motion.div
              className="absolute inset-0"
              initial={{
                scale: 1,
              }}
              whileHover={{
                scale: secondaryImage
                  ? 1.025
                  : 1.045,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
            >
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 1024px) 33vw,
                  25vw
                "
                className={`
                  object-cover
                  transition-opacity
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${
                    secondaryImage
                      ? "group-hover:opacity-0"
                      : ""
                  }
                `}
              />
            </motion.div>

            {secondaryImage && (
              <motion.div
                className="absolute inset-0"
                initial={{
                  opacity: 0,
                  scale: 1.03,
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  opacity: {
                    duration: 0.65,
                    ease: "easeOut",
                  },
                  scale: {
                    duration: 0.9,
                    ease: "easeOut",
                  },
                }}
              >
                <Image
                  src={secondaryImage}
                  alt={`${product.name} - صورة إضافية`}
                  fill
                  sizes="
                    (max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                    25vw
                  "
                  className="object-cover"
                />
              </motion.div>
            )}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-black
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-[0.04]
              "
            />

            <div
              className="
                absolute
                inset-x-4
                bottom-4
                translate-y-3
                opacity-0
                transition-all
                duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  bg-white
                  text-[11px]
                  font-semibold
                  text-zinc-950
                  shadow-lg
                  transition-colors
                  hover:bg-zinc-950
                  hover:text-white
                "
              >
                عرض التفاصيل
              </div>
            </div>
          </>
        ) : (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-zinc-100
            "
          >
            <span className="text-xs text-zinc-400">
              لا توجد صورة
            </span>
          </div>
        )}
      </Link>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${product.slug}`}
              className="block"
            >
              <h3
                className="
                  truncate
                  text-[13px]
                  font-medium
                  leading-5
                  text-zinc-100
                "
              >
                {product.name}
              </h3>
            </Link>

            {product.temperament && (
              <p
                className="
                  mt-1
                  truncate
                  text-[10px]
                  leading-4
                  text-zinc-500
                "
              >
                {product.temperament}
              </p>
            )}
          </div>

          <span
            dir="ltr"
            className="
              shrink-0
              whitespace-nowrap
              text-[12px]
              font-semibold
              text-white
            "
          >
            {product.price.toLocaleString(
              "en-EG"
            )}{" "}
            ج
          </span>
        </div>

        {(product.expectedAge ||
          product.size) && (
          <div
            className="
              mt-3
              flex
              items-center
              gap-3
              text-[9px]
              text-zinc-400
            "
          >
            {product.expectedAge && (
              <span>
                العمر{" "}
                {product.expectedAge}
              </span>
            )}

            {product.expectedAge &&
              product.size && (
                <span className="h-2.5 w-px bg-zinc-200" />
              )}

            {product.size && (
              <span>
                الحجم {product.size}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}