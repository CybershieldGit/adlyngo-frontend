"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, ArrowLeft, ArrowRight, X } from "lucide-react";

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

export default function Home() {
  const scrollRef = useRef(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  useEffect(() => {
    // Show intro only if it hasn't been seen in this session
    const hasSeenIntro = sessionStorage.getItem("adlyngo_intro_seen");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleCloseIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("adlyngo_intro_seen", "true");
  };

  const currentCategory = categories[activeCategoryIndex] || categories[0];

  const handleWheel = (e) => {
    // Disable category switching when modal is open
    if (selectedVideoIndex !== null) return;

    // Only handle vertical wheel for category switching if we're not horizontally scrolling
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if (isLocked) return;

      if (e.deltaY > 50 && activeCategoryIndex < categories.length - 1) {
        setActiveCategoryIndex(prev => Math.min(prev + 1, categories.length - 1));
        lockScrolling();
      } else if (e.deltaY < -50 && activeCategoryIndex > 0) {
        setActiveCategoryIndex(prev => Math.max(prev - 1, 0));
        lockScrolling();
      }
    }
  };

  const lockScrolling = () => {
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 800); // Slightly shorter lock
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = currentCategory.layout === "landscape" ? 500 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleVideoClick = (idx) => {
    setSelectedVideoIndex(idx);
  };

  const closeVideoModal = () => {
    setSelectedVideoIndex(null);
  };

  const navigateVideo = (direction) => {
    if (selectedVideoIndex === null) return;
    const totalVideos = currentCategory.videos.length;
    if (direction === "next") {
      setSelectedVideoIndex((prev) => (prev + 1) % totalVideos);
    } else {
      setSelectedVideoIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
    }
  };

  return (
    <main 
      onWheel={handleWheel}
      className="bg-[#0A0A0A] h-screen w-full flex flex-col pt-[80px] overflow-hidden fixed inset-0"
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-6 md:p-10 pt-[260px]"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-1xl" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-[1250px] bg-black/20 backdrop-blur-xl border border-white/10 rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col mt-[80px]"
            >
              {/* Header inside modal - EXACT Figma Implementation */}
              <div className="w-full px-12 py-6 flex justify-between items-center relative z-20">
                <div className="flex items-center justify-between w-full">
                  {/* Logo Area */}
                  <div className="w-[207.67px] h-[54.73px] relative">
                    <Image 
                      src="/logo.svg" 
                      alt="Adlyngo" 
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Tagline */}
                  <div className="text-white text-[34px] font-normal uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    The Native Tongue of Ads.
                  </div>

                  {/* Button */}
                  <button 
                    onClick={handleCloseIntro}
                    className="w-[170px] h-[48px] bg-[#FF6A00] rounded-lg outline outline-[1.5px] outline-white -outline-offset-[1.5px] flex items-center justify-center gap-[10px] hover:scale-105 transition-transform"
                  >
                    <span className="text-white text-base font-medium tracking-[0.24px] uppercase" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                      LET'S START
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-[calc(100%-96px)] mx-auto h-[1px] bg-white/10 relative z-20" />

              <div className="flex-1 p-12 pt-6 relative z-20 overflow-hidden">
                <div className="w-full flex justify-between items-center h-full">
                  {/* Left Column: Branding & Who We Are */}
                  <div className="flex flex-col justify-start items-start gap-10 max-w-[500px]">
                    <div className="flex flex-col justify-start items-start gap-5">
                      {/* Main Heading */}
                      <h1 className="flex flex-col" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        <span className="text-white text-[56px] leading-[1.1] uppercase">We Don’t Run Ads.</span>
                        <span className="text-white text-[56px] leading-[1.1] uppercase">
                          We Make Them <span className="text-[#FF6A00]">Speak.</span>
                        </span>
                      </h1>
                      
                      {/* Sub-heading */}
                      <p className="w-[478px] text-white text-sm font-normal leading-relaxed opacity-80" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                        We turn ideas into performance-driven campaigns that actually connect with people not just impressions.
                      </p>
                    </div>

                    {/* Who We Are Section */}
                    <div className="flex flex-col justify-start items-start gap-5 w-full">
                      <h3 className="text-white text-[34px] font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        WHO WE ARE?
                      </h3>
                      <div className="flex flex-col justify-start items-start gap-3">
                        <p className="w-[484px] text-white text-sm font-normal leading-relaxed opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                          Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee works harder.
                        </p>
                        <p className="w-[484px] text-white text-sm font-normal leading-relaxed opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                          We don't chase generic briefs. We specialise in Real Estate, Interior Design, E-Commerce, and Beauty — niches we've mastered across strategy, creative and execution.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Statistics Grid */}
                  <div className="flex justify-start items-center gap-[30px]">
                    {/* Stat Column 1 */}
                    <div className="w-[268px] bg-white/10 rounded-[30px] p-8 py-8 flex flex-col justify-center items-start">
                      <div className="flex flex-col justify-start items-start gap-[18px] w-full">
                        {[
                          { value: "10,000 +", label: "Qualified Leads Generated" },
                          { value: "₹50L+", label: "Ad Spend Managed" },
                          { value: "3-5X", label: "Average Client ROI" },
                          { value: "50 +", label: "Funnels Built & Optimised" }
                        ].map((stat, i) => (
                          <div key={i} className="flex flex-col justify-start items-start gap-2 w-full">
                            <div className="text-white text-[34px] font-normal uppercase leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                              {stat.value}
                            </div>
                            <div className="text-white text-sm font-normal opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                              {stat.label}
                            </div>
                            {i < 3 && <div className="w-full h-[1px] bg-white/10 mt-3" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stat Column 2 */}
                    <div className="w-[268px] bg-white/10 rounded-[30px] p-8 py-8 flex flex-col justify-center items-start">
                      <div className="flex flex-col justify-start items-start gap-[18px] w-full">
                        {[
                          { value: "10,000 +", label: "Qualified Leads Generated" },
                          { value: "₹50L+", label: "Ad Spend Managed" },
                          { value: "3-5X", label: "Average Client ROI" },
                          { value: "50 +", label: "Funnels Built & Optimised" }
                        ].map((stat, i) => (
                          <div key={i} className="flex flex-col justify-start items-start gap-2 w-full">
                            <div className="text-white text-[34px] font-normal uppercase leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                              {stat.value}
                            </div>
                            <div className="text-white text-sm font-normal opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                              {stat.label}
                            </div>
                            {i < 3 && <div className="w-full h-[1px] bg-white/10 mt-3" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Massive Background Text (Watermark) - Precisely aligned with Figma */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-20">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentCategory?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.04, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[25vw] font-black font-heading leading-none text-white whitespace-nowrap uppercase text-center"
          >
            {currentCategory?.title?.first}{currentCategory?.title?.second}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col px-6 md:px-16 pt-2 pb-6 overflow-hidden relative z-10">
        <header className="flex justify-between items-end flex-shrink-0">
          <div className="h-[72px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={activeCategoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-[72px] font-bold font-heading leading-[0.8]"
              >
                <span className="text-white">{currentCategory?.title?.first}</span>
                <span className="text-[#FF6A00]">{currentCategory?.title?.second}</span>
              </motion.h1>
            </AnimatePresence>
          </div>
          <button className="hidden md:flex items-center gap-2.5 px-6 py-2.5 bg-[#181818]/40 border border-white rounded-lg text-white text-sm font-medium font-albert leading-none hover:bg-white hover:text-black transition-all">
            View All
          </button>
        </header>

        <div className="flex-1 flex items-center min-h-0 relative py-2">
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

          <div className="w-full h-full relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategoryIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                ref={scrollRef} 
                className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar w-full snap-x scroll-smooth pl-10 h-full items-center"
              >
                {currentCategory?.videos?.map((video, idx) => (
                  <motion.div
                    key={`${activeCategoryIndex}-${video?.id}`}
                    onClick={() => handleVideoClick(idx)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group relative flex-shrink-0 cursor-pointer rounded-[40px] border border-white/20 overflow-hidden snap-center
                      ${currentCategory?.layout === "landscape" ? "w-[450px] md:w-[700px] h-[320px] md:h-[380px]" : "w-[260px] h-[430px]"}
                    `}
                  >
                    <Image
                      src={video?.thumbnail}
                      alt={video?.title}
                      fill
                      sizes={currentCategory?.layout === "landscape" ? "700px" : "260px"}
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                        <Play className="text-white fill-white ml-1" size={24} />
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[#FF6A00] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{video?.category}</p>
                      <h3 className="text-base md:text-lg font-bold text-white font-heading uppercase tracking-tight leading-none">{video?.title}</h3>
                    </div>

                    <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded text-[10px] text-white font-bold tracking-widest">
                      {video?.duration}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0">
          <div className="flex items-center gap-10">
            <h3 className="text-2xl md:text-[34px] font-bold font-heading whitespace-nowrap">
              <span className="text-white uppercase">BRANDS </span>
              <span className="text-[#FF6A00] uppercase">WE SERVE</span>
            </h3>
            <div className="hidden lg:flex items-center gap-10 opacity-60">
              <span className="text-2xl font-heading text-white uppercase tracking-tighter">airbnb</span>
              <span className="text-2xl font-heading text-white uppercase tracking-tighter">Expedia</span>
              <span className="text-2xl font-heading text-white uppercase tracking-tighter">Skyscanner</span>
              <span className="text-2xl font-heading text-white uppercase tracking-tighter">Expedia</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-full border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-full bg-[#130800]/50 border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </footer>
      </div>

      {/* Video Modal - Cinematic Player */}
      <AnimatePresence>
        {selectedVideoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
          >
            {/* Close Button */}
            <button 
              onClick={closeVideoModal}
              className="absolute top-24 right-8 md:top-19md:right-12 z-[2100] w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl border border-white/10 backdrop-blur-md"
            >
              <X size={28} />
            </button>

            {/* Navigation Arrows */}
            <button 
              onClick={() => navigateVideo("prev")}
              className="absolute left-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"
            >
              <ArrowLeft size={32} />
            </button>
            <button 
              onClick={() => navigateVideo("next")}
              className="absolute right-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"
            >
              <ArrowRight size={32} />
            </button>

            {/* Theatre Mode Container */}
            <div className="relative w-full max-w-[1400px] h-[70vh] flex items-center justify-center gap-10">
              {/* Left Video (Previous) */}
              <motion.div
                key={`prev-${selectedVideoIndex}`}
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: 0.3, x: 0, scale: 0.8 }}
                className="hidden xl:block w-[300px] h-[500px] rounded-[32px] overflow-hidden grayscale pointer-events-none"
              >
                <Image 
                  src={currentCategory.videos[(selectedVideoIndex - 1 + currentCategory.videos.length) % currentCategory.videos.length].thumbnail}
                  alt="Previous"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Main Video (Current) */}
              <motion.div
                key={`main-${selectedVideoIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex-1 max-w-[900px] h-full rounded-[48px] overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(255,106,0,0.2)] group"
              >
                <Image 
                  src={currentCategory.videos[selectedVideoIndex].thumbnail}
                  alt="Main Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                   <div className="w-24 h-24 rounded-full bg-[#FF6A00] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                      <Play className="text-white fill-white ml-1" size={36} />
                   </div>
                </div>

                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#FF6A00] text-sm uppercase tracking-[0.3em] font-bold mb-3"
                  >
                    {currentCategory.videos[selectedVideoIndex].category}
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white font-heading uppercase leading-none"
                  >
                    {currentCategory.videos[selectedVideoIndex].title}
                  </motion.h2>
                </div>
              </motion.div>

              {/* Right Video (Next) */}
              <motion.div
                key={`next-${selectedVideoIndex}`}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 0.3, x: 0, scale: 0.8 }}
                className="hidden xl:block w-[300px] h-[500px] rounded-[32px] overflow-hidden grayscale pointer-events-none"
              >
                <Image 
                  src={currentCategory.videos[(selectedVideoIndex + 1) % currentCategory.videos.length].thumbnail}
                  alt="Next"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
