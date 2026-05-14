"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2, X, ZoomIn } from "lucide-react";
import Image from "next/image";

export default function CreativeGallery() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("https://adlyngo-next-seven.vercel.app/api/gallery?page=1&limit=100");
        const json = await response.json();

        if (json.success && json.data.items) {
          // Group items by category
          const grouped = json.data.items.reduce((acc, item) => {
            const categoryName = item.category?.name || "OTHER";
            if (!acc[categoryName]) {
              acc[categoryName] = [];
            }
            acc[categoryName].push({
              id: item._id,
              title: item.title,
              image: item.imageUrl,
            });
            return acc;
          }, {});

          // Grid size pattern to repeat
          const sizePattern = [
            "col-span-1 row-span-1",
            "col-span-1 row-span-1",
            "col-span-2 row-span-2",
            "col-span-1 row-span-1",
            "col-span-1 row-span-1",
            "col-span-1 row-span-2",
            "col-span-1 row-span-1",
            "col-span-1 row-span-1",
            "col-span-2 row-span-1",
            "col-span-1 row-span-1",
            "col-span-1 row-span-1",
          ];

          // Convert grouped object to categories array
          const formattedCategories = Object.keys(grouped).map((name, index) => {
            const words = name.trim().split(/\s+/);
            let first = "";
            let second = "";

            if (words.length >= 2) {
              first = words[0];
              second = words.slice(1).join(" ");
            } else {
              first = words[0];
              second = "";
            }

            return {
              id: `cat-${index}`,
              title: first + (second ? " " : ""),
              subtitle: second,
              items: grouped[name].map((item, i) => ({
                ...item,
                size: sizePattern[i % sizePattern.length]
              }))
            };
          });

          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0A0A0A] h-screen w-full flex items-center justify-center">
        <Loader2 className="text-[#FF6A00] animate-spin" size={48} />
      </div>
    );
  }

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 pb-20 px-6 md:px-16 lg:px-[70px]">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-40 opacity-[0.04]">
        <h2 className="text-[25vw] font-black font-heading leading-none text-white whitespace-nowrap uppercase text-center tracking-normal">
          CREATIVES
        </h2>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px] z-0" />

      <div className="w-full mx-auto relative z-10">
        {categories.map((category, idx) => (
          <section key={category.id} className={cn("mb-32", idx !== 0 && "pt-20 border-t border-white/5")}>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tight font-heading">
                {category.title} <span className="text-[#FF6A00]">{category.subtitle}</span>
              </h2>
              {/* <button className="px-8 py-3 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View All
              </button> */}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[150px] md:auto-rows-[180px]">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedImage(item.image)}
                  className={cn(
                    "relative rounded-xl overflow-hidden group border border-white/5 bg-[#121212] cursor-pointer",
                    item.size
                  )}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 text-white hover:text-[#FF6A00] transition-colors">
              <X size={48} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full aspect-auto rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
