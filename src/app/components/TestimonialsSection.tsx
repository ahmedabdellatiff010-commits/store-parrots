"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "أحمد محمود",
    role: "القاهرة",
    content:
      "تجربة ممتازة من البداية للنهاية. التواصل كان واضح وسريع، والببغاء وصل بحالة ممتازة زي ما اتفقنا.",
    avatar: "أ",
    rating: 5,
  },
  {
    name: "فاطمة علي",
    role: "الإسكندرية",
    content:
      "أكثر شيء عجبني هو سرعة الرد على واتساب والاهتمام بالتفاصيل. تجربة مريحة وأنصح بالتعامل معهم.",
    avatar: "ف",
    rating: 5,
  },
  {
    name: "محمد سعيد",
    role: "الجيزة",
    content:
      "الببغاء كان مطابقًا للوصف والصور، والتعامل كان محترم جدًا. بالتأكيد هتعامل معاهم مرة تانية.",
    avatar: "م",
    rating: 5,
  },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      dir="rtl"
      className="border-t border-white/[0.08] bg-black py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="flex flex-col gap-7 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium tracking-[0.25em] text-white/35">
              آراء العملاء
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              تجارب عملائنا
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-white/45">
              نحرص على أن تكون تجربة شراء الببغاء واضحة ومريحة،
              من أول تواصل وحتى استلام الطائر.
            </p>
          </div>

          {/* Rating */}

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className="text-sm text-white"
                >
                  ★
                </span>
              ))}
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <p className="text-sm font-medium text-white">
                4.8 من 5
              </p>

              <p className="mt-1 text-[10px] text-white/30">
                تقييم العملاء
              </p>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            TESTIMONIALS
        ====================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="grid md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              variants={itemVariants}
              className={`
                py-9
                md:px-8
                lg:py-10
                ${
                  index === 0
                    ? "md:pr-0"
                    : ""
                }
                ${
                  index === testimonials.length - 1
                    ? "md:pl-0"
                    : ""
                }
                ${
                  index !== testimonials.length - 1
                    ? "border-b border-white/[0.08] md:border-b-0 md:border-l"
                    : ""
                }
              `}
            >
              {/* Rating */}

              <div className="flex items-center gap-1">
                {Array.from({
                  length: testimonial.rating,
                }).map((_, starIndex) => (
                  <span
                    key={starIndex}
                    className="text-xs text-white"
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}

              <div className="mt-6">
                <span className="text-3xl font-serif leading-none text-white/15">
                  “
                </span>

                <p className="mt-2 max-w-md text-sm leading-8 text-white/60">
                  {testimonial.content}
                </p>
              </div>

              {/* Customer */}

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-medium text-white">
                  {testimonial.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">
                      {testimonial.name}
                    </p>

                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black"
                      title="عميل موثّق"
                    >
                      <Check
                        size={10}
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-white/30">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}

        <div className="mt-4 border-t border-white/[0.08] pt-7">
          <p className="text-[11px] text-white/25">
            تجارب عملائنا تساعدنا دائمًا على تقديم تجربة أفضل.
          </p>
        </div>
      </div>
    </section>
  );
}