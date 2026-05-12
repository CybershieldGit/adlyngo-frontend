"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Footer from "@/components/common/Footer";

const categories = [
  {
    id: "brand-creatives-1",
    title: "BRAND",
    subtitle: "CREATIVES",
    items: [
      { id: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 3, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000", size: "col-span-2 row-span-2" },
      { id: 4, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 5, image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 6, image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-2" },
      { id: 7, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 8, image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 9, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000", size: "col-span-2 row-span-2" },
      { id: 10, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 11, image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 12, image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 13, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 23, image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 24, image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 25, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000", size: "col-span-2 row-span-1" },
      { id: 26, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 27, image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
    ]
  },
  {
    id: "brand-creatives-2",
    title: "BRAND",
    subtitle: "CREATIVES",
    items: [
      { id: 14, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000", size: "col-span-2 row-span-2" },
      { id: 15, image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 16, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 17, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-2" },
      { id: 18, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 19, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 20, image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1000", size: "col-span-2 row-span-2" },
      { id: 21, image: "https://images.unsplash.com/photo-1515377666659-7178f4860d5b?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 22, image: "https://images.unsplash.com/photo-1512203558265-fd550388b266?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 28, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 29, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 30, image: "https://images.unsplash.com/photo-1593079831268-3381b0ad4a7d?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 31, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 32, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
      { id: 33, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000", size: "col-span-1 row-span-1" },
    ]
  }
];

export default function CreativeGallery() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 overflow-x-hidden relative">
      {/* Background Watermark - Fixed and Cinematic */}
      <div className="fixed inset-0 flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-40 opacity-[0.04]">
        <h2 className="text-[25vw] font-black font-heading leading-none text-white whitespace-nowrap uppercase text-center tracking-tighter">
          CREATIVES
        </h2>
      </div>

      {/* Grid Pattern Background Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px] z-0" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-16 mb-20 relative z-10">
        {categories.map((category, idx) => (
          <section key={category.id} className={cn("mb-32", idx !== 0 && "pt-20 border-t border-white/5")}>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tight font-heading">
                {category.title} <span className="text-[#FF6A00]">{category.subtitle}</span>
              </h2>
              <button className="px-8 py-3 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[150px] md:auto-rows-[180px]">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "relative rounded-xl overflow-hidden group border border-white/5 bg-[#121212]",
                    item.size
                  )}
                >
                  <img 
                    src={item.image} 
                    alt="Creative" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </main>
  );
}
