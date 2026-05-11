"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Commercials", "Brand Creative", "Motion", "Product"];

const projects = [
  {
    id: 1,
    title: "NEON VELOCITY",
    category: "Commercials",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "SILENT LUXURY",
    category: "Brand Creative",
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "URBAN RHYTHM",
    category: "Motion",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "FUTURE ARCHIVE",
    category: "Product",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-1 md:row-span-2",
  },
  {
    id: 5,
    title: "VIRTUAL HORIZON",
    category: "Commercials",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    title: "CHROME DREAMS",
    category: "Motion",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2070&auto=format&fit=crop",
    size: "md:col-span-1 md:row-span-1",
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 bg-dark min-h-screen">
      <div className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-brand uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block underline underline-offset-8">Selected Case Studies</span>
          <h1 className="text-6xl md:text-[12rem] font-heading text-white leading-[0.8] mb-12">
            OUR <span className="italic text-muted/20">IMPACT</span>.
          </h1>
          <p className="text-muted/60 text-lg md:text-xl max-w-xl uppercase tracking-widest leading-relaxed">
            We don't just create visuals. We create emotional connections that drive high-performance results.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap gap-6 mt-20 border-b border-white/5 pb-8">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveCategory(filter)}
              className={cn(
                "px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative overflow-hidden",
                activeCategory === filter 
                  ? "text-white bg-brand" 
                  : "text-muted/40 hover:text-white border border-white/10"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <section className="px-6 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "group relative overflow-hidden bg-surface aspect-[4/5] md:aspect-auto",
                    project.size
                  )}
                >
                  <div className="relative w-full h-full min-h-[500px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[100%] group-hover:grayscale-0"
                    />
                    
                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="flex justify-between items-end"
                      >
                        <div>
                          <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block bg-black/50 backdrop-blur-md px-3 py-1 w-fit rounded-full">
                            {project.category}
                          </span>
                          <h3 className="text-4xl md:text-6xl font-heading text-white">{project.title}</h3>
                        </div>
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 backdrop-blur-md group-hover:bg-brand group-hover:border-brand transition-all duration-500">
                          <ArrowUpRight size={24} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer for Work */}
      <section className="py-32 bg-white text-black text-center">
        <h2 className="text-6xl md:text-[10rem] font-heading leading-none mb-12">HAVE A PROJECT?</h2>
        <Link href="/contact" className="inline-block px-16 py-6 border-2 border-black text-sm uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all duration-500">
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
