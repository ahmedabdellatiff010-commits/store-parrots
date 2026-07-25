"use client";

import { motion } from "framer-motion";

interface Stat {
  icon: string;
  label: string;
  value: string;
}

const stats: Stat[] = [
  {
    icon: "🐦",
    label: "ببغاء سعيد",
    value: "2,500+",
  },
  {
    icon: "👥",
    label: "عميل راضي",
    value: "1,800+",
  },
  {
    icon: "⭐",
    label: "تقييم 5 نجوم",
    value: "98%",
  },
  {
    icon: "📦",
    label: "عملية توصيل ناجحة",
    value: "3,200+",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function StatsSection() {
  return (
    <section id="stats" className="bg-black py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-[20px] border border-white/20 bg-gradient-to-br from-white/5 to-white/0 p-6 text-center backdrop-blur-xl shadow-[0_16px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-white/40 hover:shadow-[0_20px_100px_rgba(255,255,255,0.1)]"
            >
              {/* ICON */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.2,
                }}
                viewport={{ once: true }}
                className="mb-3 text-4xl group-hover:scale-110 transition-transform duration-300"
              >
                {stat.icon}
              </motion.div>

              {/* VALUE */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.1,
                }}
                viewport={{ once: true }}
                className="mb-2 text-3xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300"
              >
                {stat.value}
              </motion.div>

              {/* LABEL */}
              <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>

              {/* DECORATIVE GLOW */}
              <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
