"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Footer from "@/components/common/Footer";

const categories = [
  {
    id: "brand-creatives-1",
    title: "BRAND",
    subtitle: "CREATIVES",
    items: [
      { id: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", size: "col-span-1 row-span-1" },
      { id: 2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", size: "col-span-1 row-span-1" },
      { id: 3, image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06", size: "col-span-2 row-span-2" },
      { id: 4, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5", size: "col-span-1 row-span-1" },
      { id: 5, image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8", size: "col-span-1 row-span-1" },
      { id: 6, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796", size: "col-span-1 row-span-2" },
      { id: 7, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d", size: "col-span-1 row-span-1" },
      { id: 8, image: "https://images.unsplash.com/photo-1515377666659-7178f4860d5b", size: "col-span-1 row-span-1" },
      { id: 9, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03", size: "col-span-2 row-span-2" },
      { id: 10, image: "https://images.unsplash.com/photo-1512203558265-fd550388b266", size: "col-span-1 row-span-1" },
      { id: 11, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f", size: "col-span-1 row-span-1" },
      { id: 12, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a", size: "col-span-1 row-span-1" },
      { id: 13, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796", size: "col-span-1 row-span-1" },
    ]
  },
  {
    id: "brand-creatives-2",
    title: "BRAND",
    subtitle: "CREATIVES",
    items: [
      { id: 14, image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e", size: "col-span-2 row-span-2" },
      { id: 15, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9", size: "col-span-1 row-span-1" },
      { id: 16, image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8", size: "col-span-1 row-span-1" },
      { id: 17, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571", size: "col-span-1 row-span-2" },
      { id: 18, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19", size: "col-span-1 row-span-1" },
      { id: 19, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", size: "col-span-1 row-span-1" },
      { id: 20, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", size: "col-span-2 row-span-2" },
      { id: 21, image: "https://images.unsplash.com/photo-1515377666659-7178f4860d5b", size: "col-span-1 row-span-1" },
      { id: 22, image: "https://images.unsplash.com/photo-1512203558265-fd550388b266", size: "col-span-1 row-span-1" },
    ]
  }
];

export default function CreativeGallery() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-16 mb-20">
        {categories.map((category, idx) => (
          <section key={category.id} className={cn("mb-32", idx !== 0 && "pt-20 border-t border-white/5")}>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight font-heading">
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
                    "relative rounded-xl overflow-hidden group border border-white/5",
                    item.size
                  )}
                >
                  <Image 
                    src={item.image} 
                    alt="Creative" 
                    fill 
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
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
