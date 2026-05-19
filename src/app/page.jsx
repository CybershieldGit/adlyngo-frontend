"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, ArrowLeft, ArrowRight, X, Loader2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("adlyngo_intro_seen");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }

    const fetchReels = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adlyngo-next-seven.vercel.app";
        const path = "/api/reels?page=1&limit=50";

        let response = await fetch(`${baseUrl}${path}`).catch(() => null);

        if (!response || !response.ok) {
          const fallbackPorts = ["3000", "3001", "5005"];
          for (const port of fallbackPorts) {
            const res = await fetch(`http://localhost:${port}${path}`).catch(() => null);
            if (res && res.ok) {
              response = res;
              break;
            }
          }
        }

        if (!response || !response.ok) {
          throw new Error("Failed to fetch reels from both remote and local API");
        }

        const json = await response.json();

        if (json.success && json.data.reels) {
          const grouped = json.data.reels.reduce((acc, reel) => {
            const categoryName = reel.category?.name || "OTHER";
            if (!acc[categoryName]) {
              acc[categoryName] = [];
            }
            acc[categoryName].push({
              id: reel._id,
              title: reel.title,
              category: categoryName,
              thumbnail: reel.thumbnail?.url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
              videoUrl: reel.reelUrl,
              duration: "0:30",
            });
            return acc;
          }, {});

          const formattedCategories = Object.keys(grouped).map((name, index) => {
            const words = name.trim().split(/\s+/);

            let first = "";
            let second = "";

            if (words.length >= 2) {
              // If 2 or more words, first word is white, others are orange
              first = words[0];
              second = words.slice(1).join(" ");
            } else {
              // If only 1 word, keep it whole in white
              first = words[0];
              second = "";
            }

            return {
              id: index,
              title: {
                first: first + (second ? " " : ""),
                second: second
              },
              videos: grouped[name],
              layout: (name.toLowerCase().includes("commercial") || name.toLowerCase().includes("ads") || name.toLowerCase().includes("landscape")) ? "landscape" : "portrait"
            };
          });

          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch reels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const handleCloseIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("adlyngo_intro_seen", "true");
    window.dispatchEvent(new Event("introClosed"));
  };

  const currentCategory = categories[activeCategoryIndex] || categories[0];

  const handleWheel = (e) => {
    if (selectedVideoIndex !== null || categories.length === 0 || showIntro) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if (isLocked) return;

      // Lowered threshold from 50 to 20 for better responsiveness
      if (e.deltaY > 20 && activeCategoryIndex < categories.length - 1) {
        setActiveCategoryIndex(prev => Math.min(prev + 1, categories.length - 1));
        lockScrolling();
      } else if (e.deltaY < -20 && activeCategoryIndex > 0) {
        setActiveCategoryIndex(prev => Math.max(prev - 1, 0));
        lockScrolling();
      }
    }
  };

  const lockScrolling = () => {
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 800);
  };

  const handleVideoClick = (idx) => {
    setSelectedVideoIndex(idx);
  };

  const closeVideoModal = () => {
    setSelectedVideoIndex(null);
  };

  const navigateVideo = (direction) => {
    if (selectedVideoIndex === null || !currentCategory) return;
    const totalVideos = currentCategory.videos.length;
    if (direction === "next") {
      setSelectedVideoIndex((prev) => (prev + 1) % totalVideos);
    } else {
      setSelectedVideoIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
    }
  };

  const scrollSlider = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0A0A0A] h-screen w-full flex items-center justify-center">
        <Loader2 className="text-[#FF6A00] animate-spin" size={48} />
      </div>
    );
  }

  return (
    <motion.main
      onWheel={handleWheel}
      onPanEnd={(e, info) => {
        if (showIntro || selectedVideoIndex !== null || isLocked) return;
        const threshold = 30;
        if (info.offset.y < -threshold && activeCategoryIndex < categories.length - 1) {
          setActiveCategoryIndex(prev => Math.min(prev + 1, categories.length - 1));
          lockScrolling();
        } else if (info.offset.y > threshold && activeCategoryIndex > 0) {
          setActiveCategoryIndex(prev => Math.max(prev - 1, 0));
          lockScrolling();
        }
      }}
      className={`bg-[#0A0A0A] fixed inset-0 flex flex-col pt-[150px] md:pt-[80px] overflow-hidden touch-auto ${selectedVideoIndex !== null ? "z-[2000] md:z-auto" : ""}`}
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-start md:items-end justify-center"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl md:backdrop-blur-xl" />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[1250px] max-h-[72vh] md:max-h-none mt-[14vh] md:mt-0 bg-black/20 backdrop-blur-xl border border-white/10 rounded-[32px] md:rounded-t-[48px] md:rounded-b-none overflow-hidden shadow-[0_-20px_100px_rgba(0,0,0,0.8)] flex flex-col"
            >
              {/* Header inside modal - EXACT Figma Implementation */}
              <div className="w-full px-6 py-4 md:px-12 md:py-6 flex justify-between items-center relative z-20">
                <div className="flex items-center justify-between w-full gap-4">
                  {/* Logo Area */}
                  <div className="w-[120px] h-[32px] md:w-[207.67px] md:h-[54.73px] relative flex-shrink-0">
                    <Image
                      src="/logo.svg"
                      alt="Adlyngo"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Tagline */}
                  <div className="hidden md:block text-white text-[34px] font-normal uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    The Native Tongue of Ads.
                  </div>

                  <button
                    onClick={handleCloseIntro}
                    className="px-6 py-2.5 md:w-[170px] bg-[#FF6A00] border border-[#FF6A00] rounded-lg flex items-center justify-center gap-[10px] hover:bg-transparent hover:scale-105 transition-all duration-300 flex-shrink-0 group shadow-lg shadow-[#FF6A00]/20"
                  >
                    <span className="text-white group-hover:text-[#FF6A00] text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase transition-colors" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                      LET'S START
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-[calc(100%-24px)] md:w-[calc(100%-96px)] mx-auto h-[1px] bg-white/10 relative z-20" />

              <div className="flex-1 min-h-0 p-6 md:p-12 md:pt-6 pb-12 md:pb-12 relative z-20 overflow-y-auto overflow-x-hidden touch-pan-y custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-16">
                  {/* Left Column: Branding & Who We Are */}
                  <div className="flex flex-col justify-start items-start gap-8 md:gap-10 flex-1">
                    <div className="flex flex-col justify-start items-start gap-4 md:gap-5">
                      {/* Main Heading */}
                      <h1 className="flex flex-col" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        <span className="text-white text-3xl md:text-5xl lg:text-[56px] leading-[1.1] uppercase">We Don’t Run Ads.</span>
                        <span className="text-white text-3xl md:text-5xl lg:text-[56px] leading-[1.1] uppercase">
                          We Make Them <span className="text-[#FF6A00]">Speak.</span>
                        </span>
                      </h1>

                      {/* Sub-heading */}
                      <p className="w-full text-white text-xs md:text-sm font-normal leading-relaxed opacity-80" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                        We turn ideas into performance-driven campaigns that actually connect with people not just impressions.
                      </p>
                    </div>

                    {/* Who We Are Section */}
                    <div className="flex flex-col justify-start items-start gap-4 md:gap-5 w-full">
                      <h3 className="text-white text-2xl md:text-3xl lg:text-[34px] font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        WHO WE ARE?
                      </h3>
                      <div className="flex flex-col justify-start items-start gap-3">
                        <p className="w-full text-white text-xs md:text-sm font-normal leading-relaxed opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                          Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee works harder.
                        </p>
                        <p className="w-full text-white text-xs md:text-sm font-normal leading-relaxed opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                          We don't chase generic briefs. We specialise in Real Estate, Interior Design, E-Commerce, and Beauty — niches we've mastered across strategy, creative and execution.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Statistics Grid */}
                  <div className="flex flex-col lg:flex-row justify-start items-stretch gap-6 w-full md:w-auto flex-shrink-0">
                    {/* Stat Column 1 */}
                    <div className="w-full md:w-[268px] bg-white/10 rounded-[24px] md:rounded-[30px] p-5 md:p-8 flex flex-col justify-center items-start">
                      <div className="flex flex-col justify-start items-start gap-3 md:gap-[18px] w-full">
                        {[
                          { value: "10,000 +", label: "Qualified Leads Generated" },
                          { value: "₹50L+", label: "Ad Spend Managed" },
                          { value: "3-5X", label: "Average Client ROI" },
                          { value: "50 +", label: "Funnels Built & Optimised" }
                        ].map((stat, i) => (
                          <div key={i} className="flex flex-col justify-start items-start gap-1 w-full">
                            <div className="text-white text-xl md:text-[34px] font-normal uppercase leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                              {stat.value}
                            </div>
                            <div className="text-white text-[9px] md:text-sm font-normal opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                              {stat.label}
                            </div>
                            {i < 3 && <div className="w-full h-[1px] bg-white/10 mt-1.5 md:mt-3" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stat Column 2 */}
                    <div className="flex w-full md:w-[268px] bg-white/10 rounded-[24px] md:rounded-[30px] p-5 md:p-8 flex flex-col justify-center items-start">
                      <div className="flex flex-col justify-start items-start gap-3 md:gap-[18px] w-full">
                        {[
                          { value: "10,000 +", label: "Qualified Leads Generated" },
                          { value: "₹50L+", label: "Ad Spend Managed" },
                          { value: "3-5X", label: "Average Client ROI" },
                          { value: "50 +", label: "Funnels Built & Optimised" }
                        ].map((stat, i) => (
                          <div key={i} className="flex flex-col justify-start items-start gap-1 w-full">
                            <div className="text-white text-xl md:text-[34px] font-normal uppercase leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                              {stat.value}
                            </div>
                            <div className="text-white text-[9px] md:text-sm font-normal opacity-60" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                              {stat.label}
                            </div>
                            {i < 3 && <div className="w-full h-[1px] bg-white/10 mt-1.5 md:mt-3" />}
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

      <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-20">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentCategory?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.04, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[25vw] font-black font-heading leading-none text-white whitespace-nowrap uppercase text-center tracking-widest"
          >
            {currentCategory?.title?.first}{currentCategory?.title?.second}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="w-full mx-auto flex-1 flex flex-col px-6 md:px-16 md:pt-2 pb-[4vh] md:pb-6 overflow-hidden relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center md:items-center flex-shrink-0 gap-4">
          <div className="w-full md:w-auto h-[50px] md:h-[80px] overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeCategoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-[34px] md:text-5xl lg:text-[72px] font-bold font-heading leading-none md:leading-[0.8] tracking-wide text-center md:text-left"
              >
                <span className="text-white">{currentCategory?.title?.first}</span>
                <span className="text-[#FF6A00]">{currentCategory?.title?.second}</span>
              </motion.h1>
            </AnimatePresence>
          </div>
          {/* <button className="hidden md:flex items-center gap-2.5 px-6 py-2.5 bg-[#181818]/40 border border-white rounded-lg text-white text-sm font-medium font-albert leading-none hover:bg-white hover:text-black transition-all">
            View All
          </button> */}
        </header>

        <div className="flex-1 flex items-center min-h-0 relative py-2 pb-12 md:pb-16">
          <div className="absolute -left-5 md:-left-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
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

          <div className="w-full h-full relative group/slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                ref={scrollRef}
                className={`flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden no-scrollbar w-full snap-x snap-mandatory scroll-smooth h-full items-center touch-pan-x
                  ${currentCategory?.layout === "landscape"
                    ? "pl-[2.5vw] pr-[12.5vw] md:pl-[2.5vw] md:pr-[20vw] lg:pl-[0vw] lg:pr-[25vw]"
                    : "pl-[2.5vw] pr-[23vw] md:pl-[2.5vw] md:pr-[30vw] lg:pl-[0vw] lg:pr-[35vw]"
                  }
                `}
              >
                {currentCategory?.videos?.map((video, idx) => (
                  <motion.div
                    key={`${activeCategoryIndex}-${video?.id}`}
                    onClick={() => handleVideoClick(idx)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group relative flex-shrink-0 cursor-pointer rounded-[24px] md:rounded-[24px] border border-white/10 md:border-white/20 overflow-hidden snap-center bg-black transition-all duration-500
                      ${currentCategory?.layout === "landscape"
                        ? "w-[75vw] md:w-[60vw] lg:w-[50vw] max-w-[950px] aspect-[16/9] h-auto max-h-[38vh] md:max-h-[42vh]"
                        : "h-[45vh] md:h-[60vh] aspect-[9/16] w-auto"}
                    `}
                  >
                    {video.videoUrl ? (
                      <video
                        src={video.videoUrl}
                        poster={video.thumbnail}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <Image
                        src={video?.thumbnail}
                        alt={video?.title}
                        fill
                        sizes={currentCategory?.layout === "landscape" ? "700px" : "260px"}
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                        <Play className="text-white fill-white ml-1" size={24} />
                      </div>
                    </div>

                    {/* Top Right Arrow on Hover */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                      <ArrowUpRight size={24} />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[#FF6A00] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{video?.category}</p>
                      <h3 className="text-base md:text-lg font-bold text-white font-heading uppercase tracking-tight leading-none">{video?.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="flex flex-row items-center justify-between gap-4 md:gap-10 mt-auto flex-shrink-0 overflow-hidden">
          <div className="flex items-center gap-4 md:gap-10 flex-shrink-0">
            <h3 className="text-[25px] md:text-[34px] font-bold font-heading whitespace-nowrap">
              <span className="text-white uppercase">BRANDS </span>
              <span className="text-[#FF6A00] uppercase">WE SERVE</span>
            </h3>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

            <motion.div
              className="flex items-center gap-12 whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                  {["airbnb", "Expedia", "Skyscanner", "Booking", "Marriott", "Netflix"].map((brand, idx) => (
                    <span key={idx} className="text-[25px] font-heading text-white uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default">
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows - Desktop/Tablet Only */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0 ml-4">
            <button
              onClick={() => scrollSlider("left")}
              className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all duration-300"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scrollSlider("right")}
              className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] transition-all duration-300"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {selectedVideoIndex !== null && currentCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPanEnd={(e, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold) {
                navigateVideo("next");
              } else if (info.offset.x > threshold) {
                navigateVideo("prev");
              }
            }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10 md:pt-32"
          >
            <button onClick={closeVideoModal} className="absolute top-4 left-4 md:left-auto md:top-32 md:right-12 z-[2100] w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl border border-white/10 backdrop-blur-md">
              <X size={28} />
            </button>
            <button onClick={() => navigateVideo("prev")} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hidden md:flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"><ArrowLeft size={32} /></button>
            <button onClick={() => navigateVideo("next")} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hidden md:flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"><ArrowRight size={32} /></button>

            {/* Invisible tap navigation zones for mobile */}
            <div 
              onClick={(e) => { e.stopPropagation(); navigateVideo("prev"); }} 
              className="absolute left-0 top-0 bottom-0 w-[20vw] z-40 md:hidden cursor-pointer"
            />
            <div 
              onClick={(e) => { e.stopPropagation(); navigateVideo("next"); }} 
              className="absolute right-0 top-0 bottom-0 w-[20vw] z-40 md:hidden cursor-pointer"
            />

            <div className="relative w-full max-w-[1400px] h-[70vh] flex items-center justify-center gap-10">
              <motion.div key={`prev-${selectedVideoIndex}`} className="hidden xl:block w-[300px] h-[500px] rounded-[32px] overflow-hidden grayscale opacity-30">
                <video src={currentCategory.videos[(selectedVideoIndex - 1 + currentCategory.videos.length) % currentCategory.videos.length].videoUrl} muted className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                key={`main-${selectedVideoIndex}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, info) => {
                  const threshold = 80;
                  if (info.offset.x < -threshold) {
                    navigateVideo("next");
                  } else if (info.offset.x > threshold) {
                    navigateVideo("prev");
                  }
                }}
                className={`relative rounded-[24px] overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(255,106,0,0.2)] cursor-grab active:cursor-grabbing
                    ${currentCategory?.layout === "landscape"
                    ? "w-[90vw] max-w-[1200px] aspect-video max-h-[68vh] md:max-h-[80vh]"
                    : "h-[68vh] md:h-[80vh] max-h-[800px] aspect-[9/16] w-auto"
                  }
                  `}
              >
                <video
                  src={currentCategory.videos[selectedVideoIndex].videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              </motion.div>
              <motion.div key={`next-${selectedVideoIndex}`} className="hidden xl:block w-[300px] h-[500px] rounded-[32px] overflow-hidden grayscale opacity-30">
                <video src={currentCategory.videos[(selectedVideoIndex + 1) % currentCategory.videos.length].videoUrl} muted className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
