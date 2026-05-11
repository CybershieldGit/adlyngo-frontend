"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Cinematic Brand Reveal",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    duration: "0:45"
  },
  {
    id: 2,
    title: "Urban Motion Showcase",
    category: "Lifestyle",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
    duration: "1:20"
  },
  {
    id: 3,
    title: "Product Visualizer",
    category: "CGI / 3D",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    duration: "0:30"
  },
  {
    id: 4,
    title: "Fashion Editorial",
    category: "Campaign",
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076&auto=format&fit=crop",
    duration: "2:15"
  },
  {
    id: 5,
    title: "Corporate Identity",
    category: "Business",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    duration: "1:05"
  },
  {
    id: 6,
    title: "Music Video Production",
    category: "Creative",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    duration: "3:40"
  }
];

export default function VideoGallery() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6">
            VIDEO <span className="text-brand">GALLERY</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-lg md:text-xl">
            A curated selection of our finest motion work, ranging from commercial spots to experimental visual arts.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] text-white font-bold tracking-widest">
                  {video.duration}
                </div>
              </div>

              <div>
                <p className="text-brand text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{video.category}</p>
                <h3 className="text-xl font-bold text-white group-hover:text-brand transition-colors">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
