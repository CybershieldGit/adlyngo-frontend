"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/common/Footer";

const SocialIcon = ({ socialLinks }) => {
  if (!socialLinks || socialLinks.length === 0) return null;
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

export default function CaseStudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [study, setStudy] = useState(null);
  const [reels, setReels] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adlyngo-next-seven.vercel.app";

        // 1. Fetch the main study
        const studyResponse = await fetch(`${baseUrl}/api/projects/${params.id}`).catch(() => {
          return fetch(`http://localhost:5005/api/projects/${params.id}`);
        });
        const studyJson = await studyResponse.json();

        if (studyJson.success && studyJson.data.project) {
          const project = studyJson.data.project;
          setStudy(project);

          // 2. Fetch Reels and Gallery filtered by client
          if (project.client?._id) {
            const clientQuery = `client=${project.client._id}&limit=20`;

            const [reelsRes, galleryRes] = await Promise.all([
              fetch(`${baseUrl}/api/reels?${clientQuery}`).catch(() => fetch(`http://localhost:5005/api/reels?${clientQuery}`)),
              fetch(`${baseUrl}/api/gallery?${clientQuery}`).catch(() => fetch(`http://localhost:5005/api/gallery?${clientQuery}`))
            ]);

            const [reelsJson, galleryJson] = await Promise.all([
              reelsRes.json(),
              galleryRes.json()
            ]);

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
              setGalleryItems(filteredItems);
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
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <Loader2 className="text-[#FF4D00] animate-spin" size={48} />
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-white text-3xl font-heading mb-6 uppercase">Project Not Found</h2>
        <Link href="/case-studies" className="text-[#FF4D00] hover:underline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
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
      <main className="bg-[#050505] min-h-screen pt-32 pb-20 flex flex-col">
        <div className="w-full px-4 md:px-8">
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
          <div className="bg-[#0D0D0D] rounded-[30px] md:rounded-[40px] p-6 md:p-12 border border-white/5 overflow-hidden">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {galleryItems.map((item, i) => (
                  <div 
                    key={item._id} 
                    className={cn(
                      "relative overflow-hidden rounded-[20px] md:rounded-[30px] border border-white/5 group",
                      i % 7 === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                    )}
                  >
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <p className="text-white text-center text-xs md:text-sm font-bold uppercase tracking-widest">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
