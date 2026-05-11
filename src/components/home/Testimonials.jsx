"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Adlyngo didn't just build a campaign; they redefined our brand's voice. The cinematic quality they brought to our product launch was beyond anything we've seen in the industry.",
    author: "Elena Rossi",
    role: "CMO, Lusso Automotive",
  },
  {
    text: "Their ability to blend storytelling with performance metrics is unparalleled. Our engagement rates tripled within the first month of working together.",
    author: "Marcus Thorne",
    role: "Founder, Zenith Tech",
  },
  {
    text: "The creative vision at Adlyngo is second to none. They treat every project like a piece of art, and it shows in the results.",
    author: "Sophia Chen",
    role: "Creative Director, Voda Fashion",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-dark border-t border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-brand uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Feedback</span>
          <h2 className="text-5xl md:text-8xl font-heading text-white">
            CLIENT <span className="italic text-muted/20">VOICES</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-12 border border-white/5 bg-white/[0.01] backdrop-blur-sm relative group"
            >
              <Quote className="text-brand/20 mb-8 group-hover:text-brand transition-colors duration-500" size={40} />
              <p className="text-white/80 text-lg leading-relaxed mb-12 italic">
                "{t.text}"
              </p>
              <div>
                <h4 className="text-white font-heading text-2xl uppercase tracking-tighter">{t.author}</h4>
                <p className="text-brand text-[10px] uppercase tracking-widest font-bold mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
