"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We dive deep into your brand DNA and market landscape to find the unique angle that resonates.",
  },
  {
    num: "02",
    title: "Creative Production",
    desc: "Our team of directors, designers, and editors bring the vision to life with cinematic precision.",
  },
  {
    num: "03",
    title: "Deployment & Optimization",
    desc: "We launch the campaign across high-impact channels and optimize in real-time for maximum reach.",
  },
];

export default function Process() {
  return (
    <section className="py-32 bg-black px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <span className="text-brand uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">The Blueprint</span>
          <h2 className="text-5xl md:text-8xl font-heading text-white">
            HOW WE <span className="italic text-muted/20">MOVE</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="text-[10rem] font-heading text-white/[0.03] absolute -top-24 -left-4 pointer-events-none">
                {step.num}
              </div>
              <div className="relative z-10 pt-12 border-t border-white/10">
                <h3 className="text-3xl font-heading text-white mb-6 uppercase">{step.title}</h3>
                <p className="text-muted/60 text-sm leading-relaxed max-w-sm">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
