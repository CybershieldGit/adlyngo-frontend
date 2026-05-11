"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/common/Footer";

const categories = ["All", "Commercials", "Brand Creative", "Motion", "Product"];

const projects = [
  {
    id: 1,
    title: "NEON VELOCITY",
    category: "Commercials",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
    size: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "SILENT LUXURY",
    category: "Brand Creative",
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop",
    size: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "URBAN RHYTHM",
    category: "Motion",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    size: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "FUTURE ARCHIVE",
    category: "Product",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
    size: "col-span-1 row-span-2",
  },
  {
    id: 5,
    title: "VIRTUAL HORIZON",
    category: "Commercials",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    size: "col-span-2 row-span-1",
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-16 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20"
        >
          <h1 className="text-6xl md:text-[10rem] font-black font-heading text-white leading-[0.8] mb-12 uppercase">
            OUR <span className="text-[#FF6A00]">IMPACT.</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-xl uppercase tracking-widest leading-relaxed">
            We don't just create visuals. We create emotional connections that drive high-performance results.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap gap-4 mb-16 border-b border-white/5 pb-8">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveCategory(filter)}
              className={cn(
                "px-8 py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold transition-all rounded-full border",
                activeCategory === filter 
                  ? "text-white bg-[#FF6A00] border-[#FF6A00]" 
                  : "text-white/40 border-white/10 hover:text-white"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "group relative overflow-hidden rounded-[30px] border border-white/5",
                  project.size
                )}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[#FF6A00] text-[10px] uppercase tracking-widest font-bold mb-2">{project.category}</p>
                      <h3 className="text-3xl md:text-5xl font-black font-heading text-white uppercase">{project.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#FF6A00] flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
}
