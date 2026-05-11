"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const creatives = [
  {
    id: "entertainment",
    title: "BRAND",
    subtitle: "CREATIVES",
    items: [
      { id: 1, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-2 md:row-span-2" },
      { id: 2, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 3, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-1 md:row-span-2" },
      { id: 4, image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 5, image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 6, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 7, image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-1 md:row-span-2" },
      { id: 8, image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop", size: "md:col-span-2 md:row-span-2" },
      { id: 9, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    id: "skincare",
    title: "BRAND",
    subtitle: "CREATIVES",
    items: [
      { id: 1, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1974&auto=format&fit=crop", size: "md:col-span-2 md:row-span-2" },
      { id: 2, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 3, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-1 md:row-span-2" },
      { id: 4, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1970&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 5, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 6, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop", size: "md:col-span-1 md:row-span-1" },
      { id: 7, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1972&auto=format&fit=crop", size: "md:col-span-1 md:row-span-2" },
      { id: 8, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop", size: "md:col-span-2 md:row-span-2" },
    ]
  }
];

export default function CreativeGallery() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-[1800px] mx-auto">
        {creatives.map((category, idx) => (
          <section key={category.id} className={cn("mb-32", idx !== 0 && "pt-20 border-t border-white/5")}>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
                {category.title} <span className="text-brand">{category.subtitle}</span>
              </h2>
              <button className="px-8 py-3 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View All
              </button>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "relative rounded-2xl overflow-hidden group bg-surface border border-white/5",
                    item.size
                  )}
                >
                  <Image 
                    src={item.image} 
                    alt="Creative" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Info */}
                  <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">Creative Directon</p>
                    <p className="text-brand text-xs uppercase tracking-widest font-bold mt-1">Campaign Reveal</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
