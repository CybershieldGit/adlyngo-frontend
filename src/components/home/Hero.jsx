"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Qualified Leads Generated", value: "10,000 +" },
  { label: "Ad Spend Managed", value: "₹50L+" },
  { label: "Average Client ROI", value: "3-5X" },
  { label: "Funnels Built & Optimised", value: "50 +" },
];

const categories = [
  {
    id: "reels",
    title: "REELS &",
    subtitle: "UCG",
    bgText: "REELS",
    items: [
      { id: 1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop", size: "aspect-[9/16]" },
      { id: 2, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop", size: "aspect-[9/16]", active: true },
      { id: 3, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop", size: "aspect-[9/16]" },
      { id: 4, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop", size: "aspect-[9/16]" },
      { id: 5, image: "https://images.unsplash.com/photo-1593079831268-3381b0ad4a7d?q=80&w=2070&auto=format&fit=crop", size: "aspect-[9/16]" },
    ],
    gridClass: "grid-cols-2 md:grid-cols-5",
  },
  {
    id: "product",
    title: "PRODUCT",
    subtitle: "FOCUSED",
    bgText: "PRODUCT",
    items: [
      { id: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", size: "aspect-[4/5]" },
      { id: 2, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1970&auto=format&fit=crop", size: "aspect-[4/5]" },
      { id: 3, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop", size: "aspect-[16/10] md:col-span-2", active: true },
      { id: 4, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop", size: "aspect-[4/5]" },
    ],
    gridClass: "grid-cols-2 md:grid-cols-5",
  },
  {
    id: "commercials",
    title: "COMMERCIALS",
    subtitle: "ADS",
    bgText: "ADS",
    items: [
      { id: 1, image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop", size: "aspect-[16/10] md:col-span-2" },
      { id: 2, image: "https://images.unsplash.com/photo-1522071823916-291771192934?q=80&w=2070&auto=format&fit=crop", size: "aspect-[16/10] md:col-span-2" },
      { id: 3, image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop", size: "aspect-[4/5]" },
    ],
    gridClass: "grid-cols-2 md:grid-cols-5",
  },
];

const brands = ["airbnb", "Expedia", "Skyscanner", "Expedia"];

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpen]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % categories.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + categories.length) % categories.length);

  const current = categories[activeSlide];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans">

      {/* BASE HERO SECTION (CAROUSEL) */}
      <motion.section
        animate={{ filter: isPopupOpen ? "blur(30px)" : "blur(0px)", scale: isPopupOpen ? 1.02 : 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen flex flex-col px-6 md:px-16 pt-32 pb-12"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            {/* Top Header Row */}
            <div className="flex justify-between items-end mb-12 relative z-10">
              <h2 className="text-5xl md:text-[80px] font-bold text-white uppercase tracking-tight font-heading leading-none">
                {current.title} <span className="text-[#FF6A00]">{current.subtitle}</span>
              </h2>
              {/* <button className="px-8 py-3 bg-white/5 border border-white rounded-lg text-white text-sm font-medium font-albert uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View All
              </button> */}
            </div>

            {/* Content Grid (Horizontal List) */}
            <div className="flex gap-4 md:gap-8 relative z-10 mb-16 overflow-x-auto no-scrollbar pb-4">
              {current.items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative flex-shrink-0 w-[260px] h-[462px] overflow-hidden rounded-[20px] border border-[#FEFEFE] group transition-all duration-500",
                    item.active && "ring-2 ring-[#FF6A00] shadow-[0_0_30px_rgba(255,106,0,0.3)]"
                  )}
                >
                  <Image
                    src={item.image}
                    alt="Work"
                    fill
                    sizes="260px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Row: Brands & Navigation */}
        <div className="mt-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 border-t border-white/5 pt-12">
          <div className="flex items-center gap-12 overflow-hidden max-w-full">
            <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight font-heading whitespace-nowrap">
              BRANDS <span className="text-[#FF6A00]">WE SERVE</span>
            </h3>
            <div className="hidden md:flex items-center gap-12 opacity-40 grayscale brightness-200">
              {brands.map((brand, i) => (
                <span key={i} className="text-2xl font-heading uppercase tracking-tighter whitespace-nowrap">{brand}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all active:scale-90">
              <ArrowLeft size={24} />
            </button>
            <button onClick={nextSlide} className="w-14 h-14 rounded-full bg-[#FF6A00]/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all active:scale-90">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Left Dot Navigation */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="relative flex items-center justify-center w-8 h-8 group"
            >
              {i === activeSlide ? (
                <motion.div
                  layoutId="hero-dot-ring"
                  className="absolute inset-0 border border-white/40 rounded-full flex items-center justify-center"
                >
                  <div className="w-2.5 h-2.5 bg-[#FF6A00] rounded-full shadow-[0_0_15px_rgba(255,106,0,0.8)]" />
                </motion.div>
              ) : (
                <div className="w-2 h-2 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors" />
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* POPUP OVERLAY */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[200] flex items-start md:items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[1400px] max-h-[72vh] md:max-h-[85vh] mt-[24vh] md:mt-0 bg-[#1A1A1A]/80 backdrop-blur-[60px] border border-white/10 rounded-3xl md:rounded-[50px] overflow-hidden shadow-[0_40px_150px_rgba(0,0,0,0.6)] flex flex-col"
            >
              <div className="flex-shrink-0 flex flex-col lg:flex-row items-center justify-between px-6 py-6 md:px-14 md:py-8 border-b border-white/5 relative z-20 bg-black/20">
                <div className="flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="Adlyngo"
                    width={140}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div className="text-white font-medium text-xs md:text-lg tracking-[0.2em] md:tracking-[0.4em] opacity-90 uppercase mt-4 lg:mt-0 text-center">
                  THE NATIVE TONGUE OF ADS.
                </div>

                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="mt-6 lg:mt-0 px-8 py-3 md:px-10 md:py-4 bg-[#FF4D00] text-white font-bold rounded-xl uppercase tracking-widest text-[10px] md:text-sm hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(255,77,0,0.4)]"
                >
                  LET'S START
                </button>
              </div>

              <div
                className="px-6 py-10 md:px-20 md:py-16 overflow-y-auto relative z-10 custom-scrollbar flex-1 scroll-smooth"
                data-lenis-prevent
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  <div className="lg:col-span-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8 uppercase tracking-tight">
                      WE DON'T RUN ADS. <br />
                      WE MAKE THEM <span className="text-[#FF4D00]">SPEAK.</span>
                    </h1>
                    <p className="text-white/60 text-base md:text-xl leading-relaxed mb-12 max-w-xl">
                      We turn ideas into performance-driven campaigns that actually connect with people not just impressions.
                    </p>
                    <div className="space-y-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">WHO WE ARE?</h3>
                      <div className="space-y-6 text-white/40 text-sm md:text-base leading-relaxed max-w-2xl">
                        <p>Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative.</p>
                        <p>We specialise in Real Estate, Interior Design, E-Commerce, and Beauty — niches we've mastered across strategy and execution.</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex flex-col md:flex-row gap-6">
                    {[1, 2].map((col) => (
                      <div key={col} className="flex-1 bg-white/[0.03] border border-white/5 rounded-3xl md:rounded-[40px] p-8 md:p-10 flex flex-col gap-8 md:gap-10">
                        {stats.map((stat, i) => (
                          <div key={i} className={cn("flex flex-col gap-1 md:gap-2", i !== stats.length - 1 && "pb-6 md:pb-8 border-b border-white/5")}>
                            <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</h4>
                            <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.15em] font-semibold">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/10 hover:text-white transition-colors z-30"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 77, 0, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
