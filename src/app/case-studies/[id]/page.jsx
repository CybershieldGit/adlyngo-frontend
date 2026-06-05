"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/common/Footer";

// Dummy data for case studies (would typically come from an API or shared data file)
const caseStudies = [
  {
    id: 1,
    logo: "/logo.svg",
    title: "The project description",
    description: "Lorem Ipsum is simply dummy text the printing and typesetting industry been the industry's standard dummy text ever since the when unknown printer.Lorem Ipsum is simply dummy text the printing and typesetting industry been the industry's standard dummy text ever since the when unknown printer.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2070&auto=format&fit=crop",
    category: "COMMERCIALS",
    metadata: {
      services: "Branding, Product",
      website: "www.adlyngo.com",
      published: "20 January 2023",
      industry: "Lifestyle, Music",
    },
    socials: {
      facebook: "https://facebook.com/adlyngo",
      instagram: "https://instagram.com/adlyngo",
      twitter: "https://twitter.com/adlyngo",
    },
    videos: [
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2070&auto=format&fit=crop",
    ],
    creatives: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
    ]
  },
  {
    id: 2,
    logo: "/logo.svg",
    title: "The project description",
    description: "Lorem Ipsum is simply dummy text the printing and typesetting industry been the industry's standard dummy text ever since the when unknown printer.Lorem Ipsum is simply dummy text the printing and typesetting industry been the industry's standard dummy text ever since the when unknown printer.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070&auto=format&fit=crop",
    category: "BRAND CREATIVE",
    metadata: {
      services: "Branding, Product",
      website: "www.adlyngo.com",
      published: "20 January 2023",
      industry: "Lifestyle, Music",
    },
    socials: {
      linkedin: "https://linkedin.com/company/adlyngo",
      instagram: "https://instagram.com/adlyngo",
    },
    videos: [
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2070&auto=format&fit=crop",
    ],
    creatives: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
    ]
  },
];

const SocialIcon = ({ socials }) => {
  if (!socials) return null;
  const icons = {
    facebook: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
    instagram: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
    twitter: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293l13.314 17.411z" /></svg>,
    linkedin: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
  };
  return (
    <div className="flex gap-3">
      {socialLinks.map((link) => {
        const platform = link.platform.toLowerCase();
        return (
          link.url && icons[platform] && (
            <div key={link._id} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60">
              {icons[platform]}
            </div>
          )
        );
      })}
    </div>
  );
};

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
      style={{ transform: `scale(${isHovered ? 1.18 : 1.12})` }}
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

export default function CaseStudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [study, setStudy] = useState(null);
  const [reels, setReels] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const videoScrollRef = useRef(null);
  const creativeScrollRef = useRef(null);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleHorizontalWheel = (e, ref) => {
    if (ref.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      ref.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const fetchWithFallback = async (path) => {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adlyngo-next-seven.vercel.app";
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
          return response;
        };

        // 1. Fetch the main study
        let studyResponse = await fetchWithFallback(`/api/projects/${params.id}`);

        if (!studyResponse || !studyResponse.ok) {
          setError("Project not found");
          setLoading(false);
          return;
        }

        const studyJson = await studyResponse.json();

        if (studyJson.success && studyJson.data.project) {
          const project = studyJson.data.project;
          setStudy(project);

          // 2. Fetch Reels and Gallery filtered by client
          if (project.client?._id) {
            const clientQuery = `client=${project.client._id}&limit=20`;

            let reelsRes = await fetchWithFallback(`/api/reels?${clientQuery}`);
            let galleryRes = await fetchWithFallback(`/api/gallery?${clientQuery}`);

            const reelsJson = reelsRes ? await reelsRes.json() : { success: false };
            const galleryJson = galleryRes ? await galleryRes.json() : { success: false };

            if (reelsJson.success) {
              const allReels = reelsJson.data.reels || [];
              // Client-side filter fallback in case backend filter is not yet live
              const filteredReels = allReels.filter(r => {
                const clientId = r.client?._id || r.client?.id || r.client;
                return clientId === project.client?._id || clientId === project.client?.id;
              });
              setReels(filteredReels);
            }
            if (galleryJson.success) {
              const allItems = galleryJson.data.items || [];
              // Client-side filter fallback
              const filteredItems = allItems.filter(item => {
                const clientId = item.client?._id || item.client?.id || item.client;
                return clientId === project.client?._id || clientId === project.client?.id;
              });
              
              // Process aspects in parallel
              const processedItems = await processGalleryItems(filteredItems);
              
              // Format with sizes based on computed aspect ratios
              const formattedItems = processedItems.map((item, i) => {
                let size = "col-span-1 row-span-1 aspect-square";
                if (item.aspect > 1.25) {
                  size = "col-span-2 row-span-1 aspect-[16/9]"; // horizontal
                } else if (item.aspect < 0.8) {
                  size = "col-span-1 row-span-2 aspect-[3/4]"; // vertical
                } else {
                  // square: make every 5th item a large square
                  if (i % 5 === 0) {
                    size = "col-span-2 row-span-2 aspect-square";
                  }
                }
                return {
                  ...item,
                  size
                };
              });
              
              setGalleryItems(formattedItems);
            }
          }
        } else {
          setError(studyJson.message || "Project not found");
        }
      } catch (err) {
        console.error("Failed to fetch study data:", err);
        setError("Failed to load project data");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchStudyData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-[#212121] min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
        <Loader2 className="text-[#FF4D00] animate-spin relative z-10" size={48} />
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="bg-[#212121] min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
        <h2 className="text-white text-3xl font-heading mb-6 uppercase relative z-10">Project Not Found</h2>
        <Link href="/case-studies" className="text-[#FF4D00] hover:underline font-bold uppercase tracking-widest text-sm flex items-center gap-2 relative z-10">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(study.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <main className="bg-[#212121] min-h-screen flex flex-col relative overflow-x-hidden">
        
        {/* Top Header Section */}
        <section className="bg-[#171717] relative pt-32 pb-20 px-4 md:px-8 z-20">
          {/* Diagonal Line Watermark Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
          
          <div className="w-full relative z-10">
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <Link href="/case-studies" className="flex items-center gap-2 text-white/60 hover:text-white transition-all group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:text-white transition-all">
                  <ArrowLeft size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Back to Case Studies</span>
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="bg-[#121212] rounded-[30px] md:rounded-[40px] p-6 md:p-12 border border-white/5 overflow-hidden shadow-2xl">
              {/* Top Bar */}
              <div className="flex justify-between items-center mb-10">
                {study.client?.logo?.url ? (
                  <img src={study.client.logo.url} alt={study.client.name} className="h-6 md:h-8 opacity-80" />
                ) : (
                  <div className="text-white/40 font-bold uppercase tracking-widest text-sm">{study.client?.name || "ADLYNGO"}</div>
                )}
                <SocialIcon socialLinks={study.socialLinks} />
              </div>

              {/* Hero Image */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full mb-8 md:mb-12 overflow-hidden rounded-[20px] md:rounded-[30px]">
                <Image
                  src={study.coverImage?.url || "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2070&auto=format&fit=crop"}
                  alt={study.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
                <h1 className="text-3xl md:text-5xl font-heading text-white uppercase leading-tight">
                  {study.title}
                </h1>
                <p className="text-white/60 text-lg leading-relaxed font-albert">
                  {study.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 pt-10 border-t border-white/10">
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Category</p>
                  <p className="text-white text-base font-medium">{study.category?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Website</p>
                  {study.liveUrl ? (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-base font-medium hover:text-[#FF4D00] transition-colors"
                    >
                      {study.liveUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                    </a>
                  ) : (
                    <p className="text-white text-base font-medium">Internal Project</p>
                  )}
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Published</p>
                  <p className="text-white text-base font-medium">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Client</p>
                  <p className="text-white text-base font-medium">{study.client?.name || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section (Galleries) */}
        <section className="bg-[#212121] pt-16 pb-20 px-4 md:px-8 relative z-10">
          {/* Diagonal Line Watermark Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
          
          <div className="w-full relative z-10">
            {/* Video Gallery Section */}
            {reels.length > 0 && (
              <div className="mb-16 md:mb-24">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-5xl font-heading text-white uppercase tracking-tight">Video Gallery</h2>
                  <div className="hidden md:flex gap-3">
                    <button 
                      onClick={() => scrollContainer(videoScrollRef, "left")}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => scrollContainer(videoScrollRef, "right")}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
                <div 
                  ref={videoScrollRef}
                  onWheel={(e) => handleHorizontalWheel(e, videoScrollRef)}
                  className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory"
                >
                  {reels.map((reel) => (
                    <div key={reel._id} className="relative w-[240px] md:w-[320px] aspect-[9/16] flex-shrink-0 rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/5 group snap-center">
                      {reel.reelUrl ? (
                        <video 
                          src={reel.reelUrl} 
                          poster={reel.thumbnail?.url}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                          onMouseOver={(e) => e.target.play()}
                          onMouseOut={(e) => e.target.pause()}
                        />
                      ) : (
                        <Image 
                          src={reel.thumbnail?.url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop"} 
                          alt={reel.title} 
                          fill 
                          className="object-cover" 
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-white font-heading text-sm md:text-lg uppercase leading-tight">{reel.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Creatives Gallery Section */}
            {galleryItems.length > 0 && (
              <div className="mb-6 md:mb-10">
                <h2 className="text-3xl md:text-5xl font-heading text-white mb-8 md:mb-12 uppercase tracking-tight">Creatives Gallery</h2>
                <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
                  {galleryItems.map((item, i) => {
                    let cardAspectClass = "w-full h-auto";
                    let isCropped = false;

                    if (item.aspect === 0.5625) {
                      cardAspectClass = "w-full aspect-[3/4]";
                      isCropped = true;
                    } else if (item.aspect === 1.777) {
                      cardAspectClass = "w-full aspect-[16/9]";
                      isCropped = true;
                    }

                    return (
                      <div 
                        key={item._id} 
                        onClick={() => setSelectedImage({ url: item.imageUrl, aspect: item.aspect })}
                        className={cn(
                          "break-inside-avoid mb-4 relative overflow-hidden rounded-[20px] md:rounded-[30px] border border-white/5 group bg-[#121212] cursor-pointer",
                          cardAspectClass
                        )}
                      >
                        <SmartImage 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className={isCropped ? "w-full h-full object-cover" : "w-full h-auto"}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                          <p className="text-white text-center text-xs md:text-sm font-bold uppercase tracking-widest">{item.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 text-white hover:text-[#FF4D00] transition-colors">
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
    </>
  );
}
