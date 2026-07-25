"use client";

import { motion } from "framer-motion";

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
    role: "مالك ببغاء أفريقي",
    content: "تجربة رائعة مع المتجر! الببغاء وصل بصحة ممتازة والفريق ساعدني بشكل احترافي.",
    avatar: "👨‍💼",
    rating: 5,
  },
  {
    name: "فاطمة علي",
    role: "هاوية طيور",
    content: "أفضل خدمة عملاء تعاملت معها. واتساب الفريق سريع جداً والإجابات مفيدة.",
    avatar: "👩‍💼",
    rating: 5,
  },
  {
    name: "محمد سعيد",
    role: "جامع الببغاوات النادرة",
    content: "جودة الببغاوات عالية جداً وآمنة. أصبحت زبون دائم لديهم.",
    avatar: "🧔",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
    <section id="testimonials" className="bg-gradient-to-b from-black via-[#050712] to-black py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            آراء العملاء
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
            تجارب حقيقية من عملائنا السعداء
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-zinc-400">
            اكتشف ما يقوله عملاؤنا عن تجربتهم مع متجرنا وخدمة فريقنا الاحترافي
          </p>
        </motion.div>

        {/* TESTIMONIALS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
            >
              {/* RATING */}
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05 + i * 0.05,
                    }}
                    viewport={{ once: true }}
                    className="text-lg"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* CONTENT */}
              <p className="mb-6 leading-7 text-white/80 group-hover:text-white/90 transition-colors duration-300">
                "{testimonial.content}"
              </p>

              {/* AUTHOR */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* DECORATIVE QUOTE */}
              <div className="absolute top-4 right-4 opacity-5 text-4xl group-hover:opacity-10 transition-opacity duration-300">
                "
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
