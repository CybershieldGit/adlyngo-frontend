"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";

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
    <main className="bg-[#0A0A0A] h-screen w-full flex flex-col pt-[80px] overflow-hidden fixed inset-0">
      <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col px-6 md:px-16 py-4 md:py-6 overflow-hidden">
        <header className="flex justify-between items-center mb-6 flex-shrink-0">
          <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
            <span className="text-white">REELS & </span>
            <span className="text-[#FF6A00]">UCG</span>
          </h1>
          <button className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-[#181818]/40 border border-white rounded-lg text-white text-sm font-medium font-albert leading-none hover:bg-white hover:text-black transition-all">
            View All
          </button>
        </header>

        <div className="flex-1 flex items-center min-h-0 overflow-hidden">
          <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar w-full py-4 snap-x">
            {videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex-shrink-0 w-[260px] h-[clamp(300px,50vh,400px)] cursor-pointer rounded-[20px] border border-[#FEFEFE] overflow-hidden snap-center"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>

                {/* Video Info (Category & Title) */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#FF6A00] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{video.category}</p>
                  <h3 className="text-base md:text-lg font-bold text-white font-heading uppercase tracking-tight leading-none">{video.title}</h3>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-bold tracking-widest">
                  {video.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <footer className="mt-4 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-6 flex-shrink-0">
          <div className="flex items-center gap-10">
            <h3 className="text-2xl md:text-3xl font-bold font-heading">
              <span className="text-white">BRANDS </span>
              <span className="text-[#FF6A00]">WE SERVE</span>
            </h3>
            <div className="hidden lg:flex items-center gap-10 opacity-40 grayscale brightness-200">
              <span className="text-xl font-heading text-white uppercase tracking-tighter">airbnb</span>
              <span className="text-xl font-heading text-white uppercase tracking-tighter">Expedia</span>
              <span className="text-xl font-heading text-white uppercase tracking-tighter">Skyscanner</span>
              <span className="text-xl font-heading text-white uppercase tracking-tighter">Expedia</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all">
              <ArrowLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#130800]/50 border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
