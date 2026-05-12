"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, ArrowLeft, ArrowRight, X, Loader2 } from "lucide-react";

export default function Home() {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show intro only if it hasn't been seen in this session
    const hasSeenIntro = sessionStorage.getItem("adlyngo_intro_seen");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }

    // Fetch dynamic data from API
    const fetchReels = async () => {
      try {
        const response = await fetch("https://adlyngo-next-seven.vercel.app/api/reels?page=1&limit=50");
        const json = await response.json();
        
        if (json.success && json.data.reels) {
          // Group reels by category
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
              duration: "0:30", // Fallback duration
            });
            return acc;
          }, {});

          // Convert grouped object to categories array
          const formattedCategories = Object.keys(grouped).map((name, index) => {
            const words = name.split(" ");
            let first = words[0];
            let second = words.slice(1).join(" ");
            
            // If only one word, split it artificially for design or just keep it
            if (!second && name.length > 5) {
              const mid = Math.ceil(name.length / 2);
              first = name.substring(0, mid);
              second = name.substring(mid);
            }

            return {
              id: index,
              title: { first: first + " ", second: second || "" },
              videos: grouped[name],
              layout: index === 2 ? "landscape" : "portrait" 
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
  };

  const currentCategory = categories[activeCategoryIndex] || categories[0];

  const handleWheel = (e) => {
    if (selectedVideoIndex !== null || categories.length === 0) return;

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
    setTimeout(() => setIsLocked(false), 800);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = currentCategory?.layout === "landscape" ? 500 : 300;
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
    if (selectedVideoIndex === null || !currentCategory) return;
    const totalVideos = currentCategory.videos.length;
    if (direction === "next") {
      setSelectedVideoIndex((prev) => (prev + 1) % totalVideos);
    } else {
      setSelectedVideoIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
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
              <div className="w-full px-12 py-6 flex justify-between items-center relative z-20">
                <div className="flex items-center justify-between w-full">
                  <div className="w-[207.67px] h-[54.73px] relative">
                    <Image src="/logo.svg" alt="Adlyngo" fill className="object-contain" />
                  </div>
                  <div className="text-white text-[34px] font-normal uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    The Native Tongue of Ads.
                  </div>
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
                  <div className="flex flex-col justify-start items-start gap-10 max-w-[500px]">
                    <div className="flex flex-col justify-start items-start gap-5">
                      <h1 className="flex flex-col" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        <span className="text-white text-[56px] leading-[1.1] uppercase">We Don’t Run Ads.</span>
                        <span className="text-white text-[56px] leading-[1.1] uppercase">
                          We Make Them <span className="text-[#FF6A00]">Speak.</span>
                        </span>
                      </h1>
                      <p className="w-[478px] text-white text-sm font-normal leading-relaxed opacity-80" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                        We turn ideas into performance-driven campaigns that actually connect with people not just impressions.
                      </p>
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
                    className={`group relative flex-shrink-0 cursor-pointer rounded-[40px] border border-white/20 overflow-hidden snap-center bg-black
                      ${currentCategory?.layout === "landscape" ? "w-[450px] md:w-[700px] h-[320px] md:h-[380px]" : "w-[260px] h-[430px]"}
                    `}
                  >
                    {/* Background Video for Homepage Card */}
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

        <footer className="flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0">
          <div className="flex items-center gap-10">
            <h3 className="text-2xl md:text-[34px] font-bold font-heading whitespace-nowrap">
              <span className="text-white uppercase">BRANDS </span>
              <span className="text-[#FF6A00] uppercase">WE SERVE</span>
            </h3>
            <div className="hidden lg:flex items-center gap-10 opacity-60">
              {["airbnb", "Expedia", "Skyscanner", "Expedia"].map((brand, i) => (
                <span key={i} className="text-2xl font-heading text-white uppercase tracking-tighter">{brand}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => scroll("left")} className="w-14 h-14 rounded-full border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"><ArrowLeft size={24} /></button>
            <button onClick={() => scroll("right")} className="w-14 h-14 rounded-full bg-[#130800]/50 border border-white flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"><ArrowRight size={24} /></button>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {selectedVideoIndex !== null && currentCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
          >
            <button onClick={closeVideoModal} className="absolute top-24 right-8 md:top-32 md:right-12 z-[2100] w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl border border-white/10 backdrop-blur-md">
              <X size={28} />
            </button>
            <button onClick={() => navigateVideo("prev")} className="absolute left-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"><ArrowLeft size={32} /></button>
            <button onClick={() => navigateVideo("next")} className="absolute right-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6A00] transition-all"><ArrowRight size={32} /></button>

            <div className="relative w-full max-w-[1400px] h-[70vh] flex items-center justify-center gap-10">
              <motion.div key={`prev-${selectedVideoIndex}`} className="hidden xl:block w-[300px] h-[500px] rounded-[32px] overflow-hidden grayscale opacity-30">
                <video src={currentCategory.videos[(selectedVideoIndex - 1 + currentCategory.videos.length) % currentCategory.videos.length].videoUrl} muted className="w-full h-full object-cover" />
              </motion.div>
              <motion.div key={`main-${selectedVideoIndex}`} className="relative flex-1 max-w-[900px] h-full rounded-[48px] overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(255,106,0,0.2)]">
                <video 
                  src={currentCategory.videos[selectedVideoIndex].videoUrl} 
                  className="w-full h-full object-cover" 
                  controls 
                  autoPlay 
                />
                <div className="absolute bottom-12 left-12 right-12 z-20 pointer-events-none">
                  <p className="text-[#FF6A00] text-sm uppercase tracking-[0.3em] font-bold mb-3">{currentCategory.videos[selectedVideoIndex].category}</p>
                  <h2 className="text-4xl md:text-6xl font-bold text-white font-heading uppercase leading-none">{currentCategory.videos[selectedVideoIndex].title}</h2>
                </div>
              </motion.div>
              <motion.div key={`next-${selectedVideoIndex}`} className="hidden xl:block w-[300px] h-[500px] rounded-[32px] overflow-hidden grayscale opacity-30">
                <video src={currentCategory.videos[(selectedVideoIndex + 1) % currentCategory.videos.length].videoUrl} muted className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
