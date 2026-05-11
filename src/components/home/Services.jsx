"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Video, 
  Layers, 
  Smartphone, 
  Target, 
  Sparkles 
} from "lucide-react";

const services = [
  {
    title: "Brand Strategy",
    desc: "Defining the core identity and positioning for global dominance.",
    icon: Target,
    size: "md:col-span-2",
  },
  {
    title: "Product Ads",
    desc: "High-conversion product showcases with cinematic quality.",
    icon: Video,
    size: "md:col-span-1",
  },
  {
    title: "Motion Graphics",
    desc: "Next-level visual storytelling that captivates audiences.",
    icon: Sparkles,
    size: "md:col-span-1",
  },
  {
    title: "Social Creatives",
    desc: "Thumb-stopping content designed for modern digital consumption.",
    icon: Smartphone,
    size: "md:col-span-2",
  },
];

export default function Services() {
  return (
    <section className="py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Our Expertise</span>
            <h2 className="text-5xl md:text-7xl font-heading text-white">
              BEYOND THE <span className="text-muted/20 italic">TRADITIONAL</span> ADVERTISING.
            </h2>
          </div>
          <p className="text-muted/40 text-sm max-w-sm uppercase tracking-widest leading-loose">
            We blend cinematic production with data-driven strategy to deliver results that can't be ignored.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group p-10 border border-white/5 bg-surface relative overflow-hidden flex flex-col justify-between min-h-[300px]",
                service.size
              )}
            >
              <div className="relative z-10">
                <service.icon className="text-brand mb-8 group-hover:scale-110 transition-transform duration-500" size={32} />
                <h3 className="text-3xl font-heading text-white mb-4">{service.title}</h3>
                <p className="text-muted/60 text-sm leading-relaxed max-w-xs">{service.desc}</p>
              </div>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 group-hover:text-brand transition-colors">
                Learn More <div className="w-8 h-[1px] bg-white/10 group-hover:bg-brand transition-all duration-500" />
              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand/5 rounded-full blur-[80px] group-hover:bg-brand/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper to handle tailwind classes in bento
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
