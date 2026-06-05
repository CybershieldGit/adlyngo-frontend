"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2, X, ZoomIn } from "lucide-react";
import Image from "next/image";

// Simplified SmartImage component without massive zooms
function SmartImage({ src, alt, className }) {
  const [isHovered, setIsHovered] = useState(false);
  const finalSrc = src ? (src.includes("?") ? `${src}&origin=true` : `${src}?origin=true`) : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // style={{ transform: `scale(${isHovered ? 1.18 : 1.12})` }}
      className={cn(
        "transition-transform duration-1000 ease-out origin-center block",
        className ? className : "w-full h-full object-cover"
      )}
      loading="lazy"
    />
  );
}

// Pre-processes gallery items to detect natural aspect ratios and solid margins.
// Overrides the aspect ratio to portrait (vertical 9:16) for pillarbox images
// so they are mapped to vertical Bento slots where they fit natively.
const processGalleryItems = async (items) => {
  const promises = items.map((item) => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve({ ...item, aspect: 1.0 });
        return;
      }
      const img = new window.Image();
      const finalSrc = item.imageUrl ? (item.imageUrl.includes("?") ? `${item.imageUrl}&origin=true` : `${item.imageUrl}?origin=true`) : item.imageUrl;

      img.src = finalSrc;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        let aspect = img.naturalWidth / img.naturalHeight;

        // Detect solid background padding using pixel analysis
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 50;
          canvas.height = 50;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 50, 50);
          const imgData = ctx.getImageData(0, 0, 50, 50).data;

          const analyzeEdge = (pixels) => {
            const n = pixels.length;
            let sumR = 0, sumG = 0, sumB = 0;
            for (const p of pixels) {
              sumR += p.r;
              sumG += p.g;
              sumB += p.b;
            }
            const avgR = sumR / n;
            const avgG = sumG / n;
            const avgB = sumB / n;

            let solid = true;
            const maxDiff = 15;
            for (const p of pixels) {
              if (
                Math.abs(p.r - avgR) > maxDiff ||
                Math.abs(p.g - avgG) > maxDiff ||
                Math.abs(p.b - avgB) > maxDiff
              ) {
                solid = false;
                break;
              }
            }

            return {
              solid,
              avg: { r: avgR, g: avgG, b: avgB },
              brightness: (avgR + avgG + avgB) / 3
            };
          };

          const leftPixels = [];
          const rightPixels = [];
          for (let y = 0; y < 50; y++) {
            const leftIdx = y * 50 * 4;
            leftPixels.push({ r: imgData[leftIdx], g: imgData[leftIdx + 1], b: imgData[leftIdx + 2] });
            const rightIdx = (y * 50 + 49) * 4;
            rightPixels.push({ r: imgData[rightIdx], g: imgData[rightIdx + 1], b: imgData[rightIdx + 2] });
          }

          const topPixels = [];
          const bottomPixels = [];
          for (let x = 0; x < 50; x++) {
            const topIdx = x * 4;
            topPixels.push({ r: imgData[topIdx], g: imgData[topIdx + 1], b: imgData[topIdx + 2] });
            const bottomIdx = (49 * 50 + x) * 4;
            bottomPixels.push({ r: imgData[bottomIdx], g: imgData[bottomIdx + 1], b: imgData[bottomIdx + 2] });
          }

          const left = analyzeEdge(leftPixels);
          const right = analyzeEdge(rightPixels);
          const top = analyzeEdge(topPixels);
          const bottom = analyzeEdge(bottomPixels);

          const colorDiffMax = 15;
          const isPillarBox =
            left.solid && right.solid && left.brightness > 130 && right.brightness > 130 &&
            Math.abs(left.avg.r - right.avg.r) < colorDiffMax &&
            Math.abs(left.avg.g - right.avg.g) < colorDiffMax &&
            Math.abs(left.avg.b - right.avg.b) < colorDiffMax;

          const isLetterBox =
            top.solid && bottom.solid && top.brightness > 130 && bottom.brightness > 130 &&
            Math.abs(top.avg.r - bottom.avg.r) < colorDiffMax &&
            Math.abs(top.avg.g - bottom.avg.g) < colorDiffMax &&
            Math.abs(top.avg.b - bottom.avg.b) < colorDiffMax;

          if (isPillarBox) {
            aspect = 0.5625; // Treat as a vertical 9:16 content inside
          } else if (isLetterBox) {
            aspect = 1.777; // Treat as a landscape 16:9 content inside
          }
        } catch (err) {
          // CORS fallback
          const lowerTitle = (item.title || "").toLowerCase();
          if (
            lowerTitle.includes("trend") || lowerTitle.includes("yoyo") ||
            lowerTitle.includes("acadour") || lowerTitle.includes("bella") ||
            lowerTitle.includes("cinnamon") || lowerTitle.includes("almond") ||
            lowerTitle.includes("castor") || lowerTitle.includes("coconut") ||
            lowerTitle.includes("oil")
          ) {
            aspect = 0.5625;
          }
        }

        resolve({ ...item, aspect });
      };

      img.onerror = () => {
        // Fallback for CORS block or other loading issues
        const lowerTitle = (item.title || "").toLowerCase();
        let aspect = 1.0;
        if (
          lowerTitle.includes("trend") || lowerTitle.includes("yoyo") ||
          lowerTitle.includes("acadour") || lowerTitle.includes("bella") ||
          lowerTitle.includes("cinnamon") || lowerTitle.includes("almond") ||
          lowerTitle.includes("castor") || lowerTitle.includes("coconut") ||
          lowerTitle.includes("oil")
        ) {
          aspect = 0.5625;
        }
        resolve({ ...item, aspect });
      };
    });
  });

  return Promise.all(promises);
};

export default function CreativeGallery() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCols(2);
      } else if (width < 768) {
        setCols(3);
      } else {
        setCols(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adlyngo-next-seven.vercel.app";
        const path = "/api/gallery?page=1&limit=100";

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
          throw new Error("Failed to fetch gallery items from both remote and local API");
        }

        const json = await response.json();

        if (json.success && json.data.items) {
          const processedItems = await processGalleryItems(json.data.items);

          // Group items by category
          const grouped = processedItems.reduce((acc, item) => {
            const categoryName = item.category?.name || "OTHER";
            if (!acc[categoryName]) {
              acc[categoryName] = [];
            }
            acc[categoryName].push(item);
            return acc;
          }, {});

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
              items: grouped[name].map((item, i) => {
                let size = "col-span-1 row-span-1";
                if (item.aspect > 1.25) {
                  size = "col-span-2 row-span-1"; // horizontal
                } else if (item.aspect < 0.8) {
                  size = "col-span-1 row-span-2"; // vertical
                } else {
                  // square: organically make every 5th item a large square
                  if (i % 5 === 0) {
                    size = "col-span-2 row-span-2";
                  }
                }
                return {
                  id: item._id,
                  title: item.title,
                  image: item.imageUrl,
                  aspect: item.aspect,
                  size
                };
              })
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
            <div className="flex justify-between items-end mb-2 mt-2">
              <h2 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tight font-heading">
                {category.title} <span className="text-[#FF6A00]">{category.subtitle}</span>
              </h2>
              {/* <button className="px-8 py-3 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View All
              </button> */}
            </div>

            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
              {category.items.map((item, i) => {
                let cardAspectClass = "w-full h-auto";
                let isCropped = false;

                if (item.aspect === 0.5625) {
                  // Crop white side padding for pillarboxed products so they are vertical cards
                  cardAspectClass = "w-full aspect-[3/4]";
                  isCropped = true;
                } else if (item.aspect === 1.777) {
                  // Crop top and bottom padding for letterbox banners so they are landscape cards
                  cardAspectClass = "w-full aspect-[16/9]";
                  isCropped = true;
                }

                const totalItems = category.items.length;
                const itemsPerCol = Math.ceil(totalItems / cols);
                const rowIndex = i % itemsPerCol;
                const colIndex = Math.floor(i / itemsPerCol);
                const delay = rowIndex * 0.12 + colIndex * 0.02;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay }}
                    onClick={() => setSelectedImage({ url: item.image, aspect: item.aspect })}
                    className={cn(
                      "break-inside-avoid mb-4 relative rounded-xl overflow-hidden group border border-white/5 bg-[#121212] cursor-pointer",
                      cardAspectClass
                    )}
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      className={isCropped ? "w-full h-full object-cover" : "w-full h-auto"}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                    </div>
                  </motion.div>
                );
              })}
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
              className={cn(
                "relative rounded-2xl overflow-hidden shadow-2xl bg-[#121212]",
                selectedImage.aspect === 0.5625
                  ? "w-full max-w-[450px] aspect-[3/4]"
                  : (selectedImage.aspect === 1.777
                    ? "w-full max-w-[800px] aspect-[16/9]"
                    : "max-w-full max-h-full aspect-auto")
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={selectedImage.url}
                alt="Selected"
                className={
                  selectedImage.aspect === 0.5625 || selectedImage.aspect === 1.777
                    ? "w-full h-full object-cover"
                    : "max-w-full max-h-[90vh] object-contain rounded-2xl"
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
