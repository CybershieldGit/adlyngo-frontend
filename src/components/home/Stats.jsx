"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Campaign Reach", value: "500M+", suffix: "Views" },
  { label: "Revenue Generated", value: "$120M+", suffix: "USD" },
  { label: "Ads Managed", value: "2.5K+", suffix: "Creatives" },
  { label: "Client Satisfaction", value: "99%", suffix: "Retention" },
];

export default function Stats() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand group-hover:h-full transition-all duration-500" />
              <h3 className="text-4xl md:text-5xl font-heading text-white mb-2">{stat.value}</h3>
              <p className="text-[10px] uppercase tracking-widest text-muted/40 font-bold mb-4">{stat.label}</p>
              <span className="text-[10px] text-brand/60 uppercase tracking-[0.2em]">{stat.suffix}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
