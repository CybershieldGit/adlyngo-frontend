"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NEON VELOCITY",
    category: "Commercial Ads",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    title: "SILENT LUXURY",
    category: "Brand Creative",
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    title: "URBAN RHYTHM",
    category: "Motion Graphics",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    title: "FUTURE ARCHIVE",
    category: "Product Creative",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-1 md:row-span-2",
  },
  {
    title: "VIRTUAL HORIZON",
    category: "Social Content",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-2 md:row-span-1",
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-32 bg-dark px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-brand uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Selected Projects</span>
            <h2 className="text-5xl md:text-7xl font-heading text-white">
              CRAFTING <span className="text-muted/20 italic">ICONS</span>.
            </h2>
          </div>
          <button className="text-white border-b border-brand pb-2 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-brand transition-colors">
            View All Work
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden bg-surface",
                project.size
              )}
            >
              <div className="relative w-full h-full min-h-[400px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                  <div>
                    <span className="text-brand text-[10px] uppercase tracking-widest font-bold mb-2 block">{project.category}</span>
                    <h3 className="text-3xl md:text-4xl font-heading text-white">{project.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
