"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "كيف أختار الببغاء المناسب لي؟",
    answer:
      "نحن نساعدك في اختيار الببغاء المناسب بناءً على نمط حياتك والوقت المتاح لديك. تواصل معنا عبر واتساب وسنقدم لك استشارة مجانية من خبرائنا.",
  },
  {
    id: "2",
    question: "هل توفرون ضمان على الببغاوات؟",
    answer:
      "نعم، جميع الببغاوات مضمونة صحياً لمدة 30 يوماً من استلامها. يمكنك التواصل معنا فوراً إذا لاحظت أي مشكلة صحية.",
  },
  {
    id: "3",
    question: "كم تستغرق عملية التوصيل؟",
    answer:
      "عملية التوصيل تتم بسرعة وآمان حسب منطقتك الجغرافية. عادة ما تستغرق من 2 إلى 5 أيام عمل. سنخبرك بالموعد الدقيق قبل الطلب.",
  },
  {
    id: "4",
    question: "هل هناك متطلبات خاصة قبل استقبال الببغاء؟",
    answer:
      "نعم، تحتاج إلى قفص مناسب وملحقات آمنة وطعام صحي. فريقنا سيرسل لك قائمة كاملة بكل ما تحتاجه قبل الاستقبال.",
  },
  {
    id: "5",
    question: "هل تقدمون نصائح للعناية بالببغاء؟",
    answer:
      "بالتأكيد! نقدم دعماً مستمراً عبر واتساب ولدينا موارد شاملة عن التغذية والصحة والتدريب والسلوك.",
  },
  {
    id: "6",
    question: "ما طرق الدفع المتاحة؟",
    answer:
      "نقبل التحويل البنكي والدفع عند التسليم والمحافظ الإلكترونية. تواصل معنا لمعرفة الخيارات المتاحة في منطقتك.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="bg-black py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            أسئلة متكررة
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            الأسئلة التي نسمعها كثيراً
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            إذا لم تجد إجابتك، تواصل معنا عبر واتساب 💬
          </p>
        </motion.div>

        {/* FAQ ITEMS */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="overflow-hidden rounded-[16px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300"
            >
              {/* BUTTON */}
              <motion.button
                onClick={() =>
                  setOpenId(openId === item.id ? null : item.id)
                }
                className="relative w-full px-6 py-4 text-left transition-all duration-300 hover:bg-white/10"
              >
                {/* CONTENT */}
                <div className="flex items-center justify-between gap-4">
                  <span className="flex-1 font-semibold text-white">
                    {item.question}
                  </span>

                  {/* ICON */}
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{
                      rotate: openId === item.id ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="flex-shrink-0 text-zinc-400"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </div>

                {/* BOTTOM BORDER ANIMATION */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: openId === item.id ? "100%" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* ANSWER */}
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.3,
                    ease: "easeOut",
                    }}
                    className="border-t border-white/10 px-6 py-4"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="leading-7 text-zinc-300"
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-12 rounded-[24px] border border-white/10 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-6 text-center backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm text-zinc-400">
            هل لديك سؤال آخر؟
          </p>
          <p className="mt-2 text-xl font-semibold text-white">
            تواصل معنا عبر{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              واتساب
            </a>{" "}
            أو البريد الإلكتروني
          </p>
        </motion.div>
      </div>
    </section>
  );
}
