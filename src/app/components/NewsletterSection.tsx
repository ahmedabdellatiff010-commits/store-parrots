"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setEmail("");
    setIsLoading(false);

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="newsletter" className="bg-black py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-[40px] border border-white/20 bg-gradient-to-br from-white/5 to-white/0 p-8 sm:p-12 shadow-[0_40px_120px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-white/40 hover:shadow-[0_40px_150px_rgba(255,255,255,0.1)]"
        >
          {/* DECORATIVE ELEMENTS - REMOVED */}
          {/* Removed gradient blur elements for cleaner look */}

          <div className="relative z-10">
            {/* HEADER */}
            <div className="mb-6 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                ابقَ على تواصل
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                اشترك في نشرتنا البريدية
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-300">
                احصل على آخر العروض، نصائح العناية بالببغاوات، وأخبار الإضافات الجديدة مباشرة في بريدك الإلكتروني.
              </p>
            </div>

            {/* FORM */}
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                whileFocus={{ scale: 1.02 }}
                className="flex-1 rounded-full border border-white/20 bg-black px-6 py-3 text-white placeholder:text-zinc-500 transition-all duration-300 focus:border-white/40 focus:outline-none disabled:opacity-50 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              />

              <motion.button
                type="submit"
                disabled={isLoading || isSubmitted}
                whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.95 }}
                className={`relative rounded-full px-8 py-3 font-semibold transition-all duration-300 ${
                  isSubmitted
                    ? "border border-white/30 bg-black text-white"
                    : "border border-white/40 bg-white text-black hover:border-white/60 hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                }`}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                ) : isSubmitted ? (
                  <span>✅ شكراً لك</span>
                ) : (
                  <span>اشترك الآن</span>
                )}
              </motion.button>
            </motion.form>

            {/* TRUST MESSAGE */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-4 text-xs text-zinc-400"
            >
              🔒 نحن لا نشارك بريدك مع أحد. يمكنك إلغاء الاشتراك في أي وقت.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
