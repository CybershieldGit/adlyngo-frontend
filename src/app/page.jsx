"use client";

import React, { useRef, useState, useEffect, useCallback, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, ArrowLeft, ArrowRight, X, Loader2, ArrowUpRight, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

// Memoized Video Card Component with Intersection Observer
const VideoCard = React.memo(({ video, category, isActive, onClick, index, onVisible }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  const cardClasses = useMemo(() => {
    if (category.layout === "landscape") {
      return "w-[75vw] md:w-[60vw] lg:w-[50vw] max-w-[950px] aspect-[16/9] h-auto max-h-[38vh] md:max-h-[38vh]";
    }
    return "h-[45vh] md:h-[54vh] aspect-[9/16] w-auto";
  }, [category.layout]);

  // Setup Intersection Observer to detect when video is visible
  useEffect(() => {
    if (!isActive || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isNowVisible = entry.isIntersecting;
          setIsVisible(isNowVisible);

          if (onVisible) {
            onVisible(index, isNowVisible);
          }

          // Play/pause based on visibility
          if (isNowVisible && videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => { });
          } else if (!isNowVisible && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.3 } // Video is considered visible when 30% is in view
    );

    observer.observe(videoRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isActive, index, onVisible]);

  // Handle auto-play when becoming active category
  useEffect(() => {
    if (isActive && isVisible && videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
    } else if (!isActive && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isActive, isVisible]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Play on hover if visible but paused
    if (isVisible && video.videoUrl && videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Don't pause on leave, let visibility control playback
  };

  return (
    <div
      onClick={() => isActive && onClick(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`video-card group relative flex-shrink-0 cursor-pointer rounded-[24px] md:rounded-[24px] border border-white/10 md:border-white/20 overflow-hidden snap-center bg-black transition-all duration-500 hover:scale-[1.02] ${cardClasses}`}
    >
      {video.videoUrl ? (
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnail}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      ) : (
        <Image
          src={video?.thumbnail}
          alt={video?.title}
          fill
          sizes={category.layout === "landscape" ? "700px" : "260px"}
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center transition-all duration-500 shadow-2xl ${isHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <Play className="text-white fill-white ml-1" size={24} />
        </div>
      </div>
      <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <ArrowUpRight size={24} />
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-[#FF6A00] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{video?.category}</p>
        <h3 className="text-base md:text-lg font-bold text-white font-heading uppercase tracking-tight leading-none line-clamp-2">{video?.title}</h3>
      </div>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

export default function Home() {
  const scrollLockRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRefs = useRef({});
  const scrollPositions = useRef({});
  const [sortOrder, setSortOrder] = useState({});
  const [, startTransition] = useTransition();
  const scrollLeftRef = useRef(0);
  const [visibleVideos, setVisibleVideos] = useState(new Set());
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down
  const touchStartY = useRef(null);
  const touchStartX = useRef(null);

  const saveScrollPosition = useCallback((categoryId, scrollLeft) => {
    if (typeof window !== 'undefined') {
      const key = `scroll_position_${categoryId}`;
      sessionStorage.setItem(key, scrollLeft.toString());
      scrollPositions.current[categoryId] = scrollLeft;
    }
  }, []);

  const restoreScrollPosition = useCallback((categoryId) => {
    if (typeof window !== 'undefined') {
      const key = `scroll_position_${categoryId}`;
      const savedPosition = sessionStorage.getItem(key);
      if (savedPosition !== null) {
        return parseInt(savedPosition, 10);
      }
    }
    return 0;
  }, []);

  const sortVideosByPriority = useCallback((videos, order = 'asc') => {
    return [...videos].sort((a, b) => {
      const priorityA = a.order ?? 0;
      const priorityB = b.order ?? 0;
      if (priorityA !== priorityB) {
        return order === 'asc' ? priorityA - priorityB : priorityB - priorityA;
      }
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  }, []);

  const toggleSortOrder = useCallback((categoryIndex) => {
    startTransition(() => {
      setSortOrder(prev => {
        const currentOrder = prev[categoryIndex] || 'asc';
        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

        setCategories(prevCategories => {
          const updatedCategories = [...prevCategories];
          const category = updatedCategories[categoryIndex];

          if (category && category.videos) {
            const sortedVideos = sortVideosByPriority(category.videos, newOrder);
            updatedCategories[categoryIndex] = {
              ...category,
              videos: sortedVideos
            };
          }
          return updatedCategories;
        });

        return {
          ...prev,
          [categoryIndex]: newOrder
        };
      });
    });

    setTimeout(() => {
      const container = containerRefs.current[categoryIndex];
      if (container) {
        container.scrollLeft = 0;
        saveScrollPosition(categoryIndex, 0);
      }
    }, 100);
  }, [sortVideosByPriority, saveScrollPosition]);

  // Handle video visibility
  const handleVideoVisible = useCallback((videoIndex, isVisible) => {
    setVisibleVideos(prev => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(videoIndex);
      } else {
        newSet.delete(videoIndex);
      }
      return newSet;
    });
  }, []);

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
          const fallbackPorts = ["3000", "3001", "3002", "3003", "3004", "3005", "5005"];
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
              order: reel.order ?? 0,
              createdAt: reel?.createdAt || new Date().toISOString()
            });
            return acc;
          }, {});

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

            const sortedVideos = sortVideosByPriority(grouped[name], 'asc');

            return {
              id: index,
              title: {
                first: first + (second ? " " : ""),
                second: second
              },
              videos: sortedVideos,
              layout: (name.toLowerCase().includes("commercial") || name.toLowerCase().includes("ads") || name.toLowerCase().includes("landscape")) ? "landscape" : "portrait"
            };
          });

          const initialSortOrder = {};
          formattedCategories.forEach((_, idx) => {
            initialSortOrder[idx] = 'asc';
          });

          startTransition(() => {
            setCategories(formattedCategories);
            setSortOrder(initialSortOrder);
            setLoading(false);
          });
        } else {
          startTransition(() => {
            setLoading(false);
          });
        }
      } catch (error) {
        console.error("Failed to fetch reels:", error);
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    fetchReels();

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [sortVideosByPriority]);

  const handleCloseIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem("adlyngo_intro_seen", "true");
    window.dispatchEvent(new Event("introClosed"));
  };

  const currentCategory = categories[activeCategoryIndex] || categories[0];

  const handleWheel = (e) => {
    if (selectedVideoIndex !== null || categories.length === 0 || showIntro) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        scrollLockRef.current = false;
      }, 200);

      if (scrollLockRef.current) return;

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 30 && activeCategoryIndex < categories.length - 1) {
          scrollLockRef.current = true;
          setDirection(1); // Moving down
          const currentContainer = containerRefs.current[activeCategoryIndex];
          if (currentContainer) {
            saveScrollPosition(activeCategoryIndex, currentContainer.scrollLeft);
          }
          setTimeout(() => {
            setActiveCategoryIndex(prev => Math.min(prev + 1, categories.length - 1));
            // Clear visible videos when switching categories
            setVisibleVideos(new Set());
          }, 200);
        } else if (e.deltaY < -30 && activeCategoryIndex > 0) {
          scrollLockRef.current = true;
          setDirection(-1); // Moving up
          const currentContainer = containerRefs.current[activeCategoryIndex];
          if (currentContainer) {
            saveScrollPosition(activeCategoryIndex, currentContainer.scrollLeft);
          }
          setTimeout(() => {
            setActiveCategoryIndex(prev => Math.max(prev - 1, 0));
            setVisibleVideos(new Set());
          }, 200);
        }
      }
    }
  };

  const handleTouchStart = (e) => {
    if (selectedVideoIndex !== null || categories.length === 0 || showIntro) return;
    const touch = e.touches[0];
    touchStartY.current = touch.clientY;
    touchStartX.current = touch.clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    if (selectedVideoIndex !== null || categories.length === 0 || showIntro) return;

    const touch = e.touches[0];
    const diffY = touchStartY.current - touch.clientY;
    const diffX = touchStartX.current - touch.clientX;

    // Only handle vertical swipe if Y-axis movement is dominant
    if (Math.abs(diffY) > Math.abs(diffX)) {
      // Swipe threshold to trigger category transition (e.g. 50px)
      if (Math.abs(diffY) > 50) {
        if (diffY > 0 && activeCategoryIndex < categories.length - 1) {
          // Swipe up -> go down (next category)
          setDirection(1);
          const currentContainer = containerRefs.current[activeCategoryIndex];
          if (currentContainer) {
            saveScrollPosition(activeCategoryIndex, currentContainer.scrollLeft);
          }
          setActiveCategoryIndex(prev => Math.min(prev + 1, categories.length - 1));
          setVisibleVideos(new Set());
        } else if (diffY < 0 && activeCategoryIndex > 0) {
          // Swipe down -> go up (previous category)
          setDirection(-1);
          const currentContainer = containerRefs.current[activeCategoryIndex];
          if (currentContainer) {
            saveScrollPosition(activeCategoryIndex, currentContainer.scrollLeft);
          }
          setActiveCategoryIndex(prev => Math.max(prev - 1, 0));
          setVisibleVideos(new Set());
        }
        // Reset so we only trigger once per swipe
        touchStartY.current = null;
        touchStartX.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
    touchStartX.current = null;
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
    const container = containerRefs.current[activeCategoryIndex];
    if (container) {
      const scrollAmount = 400;
      const newScrollLeft = direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  // Direct DOM manipulation for scroll buttons - no state updates during scroll
  const updateScrollButtonsDOM = useCallback(() => {
    const container = containerRefs.current[activeCategoryIndex];
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const newCanScrollLeft = scrollLeft > 5;
      const newCanScrollRight = scrollLeft + clientWidth < scrollWidth - 5;

      const leftBtn = document.querySelector('.scroll-left-btn');
      const rightBtn = document.querySelector('.scroll-right-btn');

      if (leftBtn) {
        if (newCanScrollLeft) {
          leftBtn.classList.remove('pointer-events-none', 'opacity-0');
          leftBtn.classList.add('pointer-events-auto', 'opacity-100');
        } else {
          leftBtn.classList.remove('pointer-events-auto', 'opacity-100');
          leftBtn.classList.add('pointer-events-none', 'opacity-0');
        }
      }

      if (rightBtn) {
        if (newCanScrollRight) {
          rightBtn.classList.remove('pointer-events-none', 'opacity-0');
          rightBtn.classList.add('pointer-events-auto', 'opacity-100');
        } else {
          rightBtn.classList.remove('pointer-events-auto', 'opacity-100');
          rightBtn.classList.add('pointer-events-none', 'opacity-0');
        }
      }
    }
  }, [activeCategoryIndex]);

  const handleScroll = useCallback((e) => {
    const container = e.target;
    if (!container) return;

    scrollLeftRef.current = container.scrollLeft;
    updateScrollButtonsDOM();
    saveScrollPosition(activeCategoryIndex, container.scrollLeft);
  }, [activeCategoryIndex, updateScrollButtonsDOM, saveScrollPosition]);

  // Setup scroll listener
  useEffect(() => {
    const container = containerRefs.current[activeCategoryIndex];
    if (!container || !currentCategory) return;

    container.addEventListener('scroll', handleScroll, { passive: true });

    const savedPosition = restoreScrollPosition(activeCategoryIndex);
    if (savedPosition > 0) {
      container.scrollLeft = savedPosition;
    }

    updateScrollButtonsDOM();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeCategoryIndex, currentCategory, handleScroll, updateScrollButtonsDOM, restoreScrollPosition]);

  // Handle resize
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateScrollButtonsDOM();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [updateScrollButtonsDOM]);

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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`bg-[#0A0A0A] fixed inset-0 flex flex-col pt-[150px] md:pt-[80px] overflow-hidden touch-auto ${selectedVideoIndex !== null ? "z-[2000] md:z-auto" : ""}`}
    >
      {/* Intro Modal */}
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
              <div className="w-full px-6 py-4 md:px-12 md:py-6 flex justify-between items-center relative z-20">
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="w-[120px] h-[32px] md:w-[207.67px] md:h-[54.73px] relative flex-shrink-0">
                    <Image src="/logo.svg" alt="Adlyngo" fill className="object-contain" />
                  </div>
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
                  <div className="flex flex-col justify-start items-start gap-8 md:gap-10 flex-1">
                    <div className="flex flex-col justify-start items-start gap-4 md:gap-5">
                      <h1 className="flex flex-col" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        <span className="text-white text-3xl md:text-5xl lg:text-[56px] leading-[1.1] uppercase">We Don’t Run Ads.</span>
                        <span className="text-white text-3xl md:text-5xl lg:text-[56px] leading-[1.1] uppercase">
                          We Make Them <span className="text-[#FF6A00]">Speak.</span>
                        </span>
                      </h1>
                      <p className="w-full text-white text-xs md:text-sm font-normal leading-relaxed opacity-80" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                        We turn ideas into performance-driven campaigns that actually connect with people not just impressions.
                      </p>
                    </div>
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
                  <div className="flex flex-col lg:flex-row justify-start items-stretch gap-6 w-full md:w-auto flex-shrink-0">
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

      {/* Background watermark with fade animation */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-20">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentCategory?.id}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: direction === 1 ? 50 : direction === -1 ? -50 : 0
            }}
            animate={{
              opacity: 0.04,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: direction === 1 ? -50 : direction === -1 ? 50 : 0
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-[25vw] font-black font-heading leading-none text-white whitespace-nowrap uppercase text-center tracking-widest"
          >
            {currentCategory?.title?.first}{currentCategory?.title?.second}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto flex-1 flex flex-col px-6 md:px-16 md:pt-2 pb-[4vh] md:pb-6 overflow-hidden relative z-10">
        <header className="flex flex-row md:flex-row justify-between items-center md:items-center flex-shrink-0 gap-4">
          <div className="w-full md:w-auto flex items-center gap-4 md:gap-6">
            <div className="h-[50px] md:h-[80px] overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeCategoryIndex}
                  initial={{
                    opacity: 0,
                    y: direction === 1 ? 30 : direction === -1 ? -30 : 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: direction === 1 ? -30 : direction === -1 ? 30 : -20
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-4xl md:text-6xl font-bold font-heading leading-none md:leading-[0.8] tracking-wide text-center md:text-left"
                >
                  <span className="text-white">{currentCategory?.title?.first}</span>
                  <span className="text-[#FF6A00]">{currentCategory?.title?.second}</span>
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>

          {currentCategory && currentCategory.videos?.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => toggleSortOrder(activeCategoryIndex)}
              className="group relative flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:bg-[#FF6A00]/20 hover:border-[#FF6A00] transition-all duration-500"
            >
              <ArrowUpDown size={18} className="text-white group-hover:text-[#FF6A00] transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6A00]/0 via-[#FF6A00]/5 to-[#FF6A00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          )}
        </header>

        {/* Video Slider with fade animation */}
        <div className="flex-1 flex items-center min-h-0 relative py-2 pb-12 md:pb-8">
          <div className="w-full h-full relative group/slider">
            <button
              onClick={() => scrollSlider("left")}
              className="scroll-left-btn hidden md:flex absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/20 items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg backdrop-blur-md pointer-events-none opacity-0"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => scrollSlider("right")}
              className="scroll-right-btn hidden md:flex absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/20 items-center justify-center text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg backdrop-blur-md pointer-events-none opacity-0"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>

            {/* Category Navigation Dots */}
            <div className="absolute -left-3 md:-left-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    const currentContainer = containerRefs.current[activeCategoryIndex];
                    if (currentContainer) {
                      saveScrollPosition(activeCategoryIndex, currentContainer.scrollLeft);
                    }
                    setDirection(idx > activeCategoryIndex ? 1 : -1);
                    setActiveCategoryIndex(idx);
                    setVisibleVideos(new Set());
                  }}
                  className="group relative flex items-center justify-center w-6 transition-all duration-300"
                >
                  <motion.div
                    animate={{
                      scale: activeCategoryIndex === idx ? 1 : 0.7,
                      opacity: activeCategoryIndex === idx ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeCategoryIndex === idx ? (
                      <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                      </div>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors" />
                    )}
                  </motion.div>
                </button>
              ))}
            </div>

            {/* Video Grid - Only one category rendered at a time with fade animation */}
            <AnimatePresence mode="wait">
              {categories.map((cat, catIdx) => {
                const isActive = catIdx === activeCategoryIndex;
                if (!isActive) return null;

                return (
                  <motion.div
                    key={cat.id}
                    initial={{
                      opacity: 0,
                      x: 0,
                      y: direction === 1 ? 50 : direction === -1 ? -50 : 0
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      x: 0,
                      y: direction === 1 ? -50 : direction === -1 ? 50 : 0
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="absolute inset-0"
                  >
                    <div
                      ref={(el) => {
                        containerRefs.current[catIdx] = el;
                      }}
                      className={`flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden no-scrollbar w-full snap-x snap-mandatory scroll-smooth h-full items-center touch-pan-x
                        ${cat.layout === "landscape"
                          ? "pl-[5.5vw] pr-[12.5vw] md:pl-[2.5vw] md:pr-[20vw] lg:pl-[0vw] lg:pr-[25vw]"
                          : "pl-[5.5vw] pr-[23vw] md:pl-[2.5vw] md:pr-[30vw] lg:pl-[0vw] lg:pr-[35vw]"
                        }
                      `}
                    >
                      {cat.videos?.map((video, idx) => (
                        <VideoCard
                          key={`${catIdx}-${video?.id}`}
                          video={video}
                          category={cat}
                          isActive={isActive}
                          onClick={handleVideoClick}
                          index={idx}
                          onVisible={handleVideoVisible}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
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
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
        </footer>
      </div>

      {/* Video Modal */}
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
            <div onClick={(e) => { e.stopPropagation(); navigateVideo("prev"); }} className="absolute left-0 top-0 bottom-0 w-[20vw] z-40 md:hidden cursor-pointer" />
            <div onClick={(e) => { e.stopPropagation(); navigateVideo("next"); }} className="absolute right-0 top-0 bottom-0 w-[20vw] z-40 md:hidden cursor-pointer" />
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