"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";

const categories = [
  {
    id: 0,
    title: { first: "REELS & ", second: "UCG" },
    videos: [
      { id: 1, title: "Cinematic Brand Reveal", category: "Commercial", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop", duration: "0:45" },
      { id: 2, title: "Urban Motion Showcase", category: "Lifestyle", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop", duration: "1:20" },
      { id: 3, title: "Product Visualizer", category: "CGI / 3D", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", duration: "0:30" },
      { id: 4, title: "Fashion Editorial", category: "Campaign", thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop", duration: "2:15" },
      { id: 12, title: "Street Style Reel", category: "Social", thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop", duration: "0:15" },
      { id: 13, title: "Travel Story", category: "Vlog", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop", duration: "1:50" },
    ]
  },
  {
    id: 1,
    title: { first: "PRODUCT ", second: "FOCUSED" },
    videos: [
      { id: 5, title: "Premium Watch Edit", category: "Luxury", thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop", duration: "1:05" },
      { id: 6, title: "Sneaker Motion", category: "Sport", thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", duration: "0:50" },
      { id: 7, title: "Tech Gadget Showcase", category: "Electronics", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", duration: "1:15" },
      { id: 8, title: "Cosmetic Elegance", category: "Beauty", thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop", duration: "0:40" },
      { id: 14, title: "Coffee Brewing Art", category: "Food", thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop", duration: "1:10" },
      { id: 15, title: "Smart Home Tech", category: "Tech", thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop", duration: "0:55" },
    ]
  },
  {
    id: 2,
    title: { first: "COMMERCIALS ", second: "ADS" },
    layout: "landscape",
    videos: [
      { id: 9, title: "Global Brand Campaign", category: "Ad", thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2026&auto=format&fit=crop", duration: "1:30" },
      { id: 10, title: "Tech Innovation Ad", category: "Ad", thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", duration: "2:00" },
      { id: 11, title: "Automotive Reveal", category: "Ad", thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop", duration: "1:45" },
      { id: 16, title: "Skyline Drone View", category: "Ad", thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop", duration: "2:10" },
      { id: 17, title: "Future of Living", category: "Ad", thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", duration: "1:25" },
    ]
  }
];

export default function VideoGallery() {
  const scrollRef = useRef(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const currentCategory = categories[activeCategoryIndex];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = currentCategory.layout === "landscape" ? 500 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="bg-[#0A0A0A] h-screen w-full flex flex-col pt-[80px] overflow-hidden fixed inset-0">
      {/* Massive Background Text (Watermark) - Precisely aligned with Figma */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-20">
        <motion.h2
          key={currentCategory.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[25vw] font-black font-heading leading-none text-white whitespace-nowrap uppercase text-center"
        >
          {currentCategory.title.first}{currentCategory.title.second}
        </motion.h2>
      </div>

      <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col px-6 md:px-16 py-4 md:py-6 overflow-hidden relative z-10">
        <header className="flex justify-between items-center mb-6 flex-shrink-0">
          <motion.h1 
            key={currentCategory.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading leading-tight"
          >
            <span className="text-white">{currentCategory.title.first}</span>
            <span className="text-[#FF6A00]">{currentCategory.title.second}</span>
          </motion.h1>
          <button className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-[#181818]/40 border border-white rounded-lg text-white text-sm font-medium font-albert leading-none hover:bg-white hover:text-black transition-all">
            View All
          </button>
        </header>

        <div className="flex-1 flex items-center min-h-0 overflow-hidden relative">
          {/* Vertical Category Navigation Dots */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryIndex(idx)}
                className="group relative flex items-center justify-center w-6"
              >
                {activeCategoryIndex === idx ? (
                  <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                  </div>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors" />
                )}
              </button>
            ))}
          </div>

          <motion.div 
            key={currentCategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={scrollRef} 
            className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar w-full py-4 snap-x scroll-smooth pl-10"
          >
            {currentCategory.videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative flex-shrink-0 cursor-pointer rounded-[20px] border border-[#FEFEFE] overflow-hidden snap-center
                  ${currentCategory.layout === "landscape" ? "w-[450px] md:w-[600px] h-[350px] md:h-[400px]" : "w-[260px] h-[clamp(300px,50vh,400px)]"}
                `}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes={currentCategory.layout === "landscape" ? "600px" : "260px"}
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#FF6A00] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{video.category}</p>
                  <h3 className="text-base md:text-lg font-bold text-white font-heading uppercase tracking-tight leading-none">{video.title}</h3>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-bold tracking-widest">
                  {video.duration}
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-[#130800]/50 border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
