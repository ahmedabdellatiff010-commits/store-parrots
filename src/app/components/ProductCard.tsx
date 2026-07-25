"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/app/types/product";

type ProductCardProps = {
  product: Product;
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1];

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
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <Link
        href={`/products/${product.slug}`}
        aria-label={`عرض ${product.name}`}
        className="relative block aspect-[4/4.8] overflow-hidden bg-zinc-100"
      >
        {primaryImage ? (
          <>
            {/* =================================================
                PRIMARY IMAGE
            ================================================== */}

            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              whileHover={{ scale: secondaryImage ? 1.025 : 1.045 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
            >
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  secondaryImage
                    ? "group-hover:opacity-0"
                    : "group-hover:opacity-100"
                }`}
              />
            </motion.div>

            {/* =================================================
                SECONDARY IMAGE
            ================================================== */}

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
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* =================================================
                SUBTLE IMAGE OVERLAY
            ================================================== */}

            <motion.div
              className="pointer-events-none absolute inset-0 bg-black"
              initial={{
                opacity: 0,
              }}
              whileHover={{
                opacity: 0.06,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />

            {/* =================================================
                VIEW DETAILS BUTTON
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileHover={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className="absolute inset-x-4 bottom-4"
            >
              <div className="flex h-11 w-full items-center justify-center bg-white text-[10px] font-semibold text-zinc-950 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-zinc-950 hover:text-white">
                <span>عرض التفاصيل</span>

                <motion.svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    x: 0,
                    opacity: 0.6,
                  }}
                  whileHover={{
                    x: -4,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mr-2"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </motion.svg>
              </div>
            </motion.div>
          </>
        ) : (
          /* =================================================
              EMPTY IMAGE
          ================================================== */

          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-zinc-100"
            whileHover={{
              backgroundColor: "#f4f4f5",
            }}
          >
            <span className="text-[10px] text-zinc-400">
              لا توجد صورة
            </span>
          </motion.div>
        )}
      </Link>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <motion.div
        className="pt-4"
        initial={{
          opacity: 0.85,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: 0.35,
        }}
      >
        {/* =================================================
            NAME + PRICE
        ================================================== */}

        <div className="flex items-start justify-between gap-4">
          {/* NAME */}

          <div className="min-w-0">
            <Link
              href={`/products/${product.slug}`}
              className="block max-w-full"
            >
              <motion.h3
                className="truncate text-[13px] font-medium leading-5 text-zinc-100"
                whileHover={{
                  x: -2,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {product.name}
              </motion.h3>
            </Link>

            {/* TEMPERAMENT */}

            {product.temperament && (
              <p className="mt-1 truncate text-[10px] leading-4 text-zinc-500">
                {product.temperament}
              </p>
            )}
          </div>

          {/* PRICE */}

          <motion.span
            dir="ltr"
            className="shrink-0 whitespace-nowrap text-[12px] font-semibold tracking-tight text-zinc-900"
            whileHover={{
              x: -2,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {product.price.toLocaleString("en-EG")} ج
          </motion.span>
        </div>

        {/* =================================================
            META
        ================================================== */}

        {(product.expectedAge || product.size) && (
          <motion.div
            className="mt-3 flex items-center gap-3 text-[9px] text-zinc-400"
            initial={{
              opacity: 0.7,
            }}
            whileHover={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {product.expectedAge && (
              <span className="whitespace-nowrap">
                العمر {product.expectedAge}
              </span>
            )}

            {product.expectedAge && product.size && (
              <span className="h-2.5 w-px bg-zinc-200" />
            )}

            {product.size && (
              <span className="whitespace-nowrap">
                الحجم {product.size}
              </span>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
}