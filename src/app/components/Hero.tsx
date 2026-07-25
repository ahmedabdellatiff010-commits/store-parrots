"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative isolate h-[100vh] min-h-[100vh] w-full overflow-hidden bg-black"
    >
      {/* =====================================================
          BACKGROUND VIDEO
      ====================================================== */}

      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* =====================================================
          VIDEO OVERLAY
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/45" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/10 to-black/75" />

      {/* Decorative elements removed for cleaner aesthetic */}

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative z-20 flex h-full w-full items-center justify-center px-5 sm:px-8">
        <div className="flex w-full max-w-4xl flex-col items-center text-center text-white">
          {/* =================================================
              SMALL LABEL
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="mb-6 flex items-center gap-3 sm:mb-8"
          >
            <span className="h-px w-7 bg-white/50 sm:w-10" />

            <span className="text-[10px] font-medium tracking-[0.3em] text-white/75 sm:text-xs">
              نوادر الببغاوات
            </span>

            <span className="h-px w-7 bg-white/50 sm:w-10" />
          </motion.div>

          {/* =================================================
              MAIN TITLE
          ================================================== */}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: "easeOut",
            }}
            className="text-4xl font-semibold leading-[1.2] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            امتلك ببغاءك
            <br />
            <span className="text-white/75">المفضل</span>
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: "easeOut",
            }}
            className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:mt-7 sm:text-base sm:leading-8"
          >
            اكتشف مجموعة مميزة من الببغاوات المختارة بعناية،
            <br className="hidden sm:block" />
            واختر صديقك الجديد ليكون جزءًا من حياتك.
          </motion.p>

          {/* =================================================
              BUTTONS
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.85,
              ease: "easeOut",
            }}
            className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row"
          >
            {/* PRIMARY BUTTON */}

            <Link
              href="/types"
              className="group relative flex h-14 min-w-[190px] items-center justify-center overflow-hidden bg-white px-8 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-500 ease-out group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center transition-colors duration-500 group-hover:text-white">
                <span>تسوق الآن</span>

                <svg
                  className="mr-3 transition-transform duration-300 group-hover:-translate-x-1"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </Link>

            {/* SECONDARY BUTTON */}

            <Link
              href="/types"
              className="flex h-14 min-w-[160px] items-center justify-center border border-white/30 bg-black/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 active:scale-95"
            >
              اكتشف الأنواع
            </Link>
          </motion.div>

        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.4,
        }}
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[8px] font-medium tracking-[0.3em] text-white/50">
            SCROLL
          </span>

          <div className="relative h-8 w-px overflow-hidden bg-white/25">
            <motion.div
              animate={{
                y: ["-100%", "300%"],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 top-0 h-1/2 w-full bg-white"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}