"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Loader2 } from "lucide-react";
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
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all cursor-pointer relative z-20"
            >
              {icons[platform]}
            </a>
          )
        );
      })}
    </div>
  );
};

const CaseStudyCard = ({ study }) => {
  const router = useRouter();

  const formattedDate = study.createdAt 
    ? new Date(study.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onClick={() => {
        const slug = study.slug || (study.title ? study.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : (study.id || study._id));
        router.push(`/case-studies/${slug}`);
      }}
      className="w-full bg-[#121212] rounded-[24px] md:rounded-[40px] p-8 md:p-16 mb-8 md:mb-12 border border-white/5 overflow-hidden group cursor-pointer relative shadow-2xl"
    >
      <div className="flex justify-between items-center mb-6 md:mb-8 relative z-10">
        {study.client?.logo?.url ? (
          <img src={study.client.logo.url} alt={study.client?.name} className="h-5 md:h-8 opacity-80" />
        ) : (
          <div className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
            {study.client?.name || "ADLYNGO"}
          </div>
        )}
        <SocialIcon socialLinks={study.socialLinks} />
      </div>

      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full mb-8 md:mb-10 overflow-hidden rounded-[32px] md:rounded-[48px]">
        <Image
          src={study.coverImage?.url || study.image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop"}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-12">
        <div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-albert font-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
            {study.title}
          </h3>
        </div>
        <div>
          <p className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed font-albert">
            {study.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Services</p>
          <p className="text-white text-sm md:text-lg font-bold font-albert tracking-tight">{study.metadata?.services || study.category?.name || "Creative Services"}</p>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Website</p>
          <p className="text-white text-sm md:text-lg font-bold font-albert tracking-tight">
            {study.liveUrl ? study.liveUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] : (study.metadata?.website || "Internal Project")}
          </p>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Published</p>
          <p className="text-white text-sm md:text-lg font-bold font-albert tracking-tight">{formattedDate}</p>
        </div>
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Industry</p>
          <p className="text-white text-sm md:text-lg font-bold font-albert tracking-tight">{study.metadata?.industry || "Marketing"}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function CaseStudiesPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adlyngo-next-seven.vercel.app";
        const url = `${baseUrl}/api/projects?page=1&limit=50`;
        
        const response = await fetch(url).catch(() => {
          return fetch("http://localhost:5005/api/projects?page=1&limit=50");
        });

        const json = await response.json();

        if (json.success && json.data.projects) {
          setProjects(json.data.projects);
          console.log("PROJECT DATA SAMPLE:", json.data.projects[0]);
          
          const uniqueCategories = ["ALL", ...new Set(json.data.projects
            .map(p => p.category?.name)
            .filter(name => name)
          )];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredStudies = activeCategory === "ALL"
    ? projects
    : projects.filter(p => p.category?.name === activeCategory);

  if (loading) {
    return (
      <div className="bg-[#050505] h-screen w-full flex items-center justify-center">
        <Loader2 className="text-[#FF4D00] animate-spin" size={48} />
      </div>
    );
  }

  return (
    <>
      <main className="bg-[#212121] min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Section 1: Top Header Section */}
        <section className="bg-[#171717] relative pt-44 md:pt-64 pb-28 md:pb-40 px-4 md:px-8 z-20">
          {/* Diagonal Line Watermark Pattern (from creative-gallery) - Contained in its own clipped div */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-8xl lg:text-[100px] font-black font-heading text-white leading-[0.9] uppercase text-center md:text-left"
              >
                OUR <span className="bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] bg-clip-text text-transparent">CASE STUDIES.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white/60 text-sm md:text-base lg:text-lg max-w-lg font-albert leading-relaxed lg:text-right ml-auto"
              >
                Every project at Adlyngo is built with one goal: turning creative thinking into measurable business growth through strategy, execution, and performance-focused design.
              </motion.p>
            </div>
          </div>

          {/* Island Navbar (Filters) - Centered on the boundary */}
          <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-30 px-4 flex justify-center">
            <div className="inline-flex items-center p-1.5 bg-black border border-white/10 rounded-full gap-1 md:gap-2 overflow-x-auto no-scrollbar max-w-[92vw] md:max-w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "relative px-5 md:px-8 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.2em] transition-all duration-500 uppercase whitespace-nowrap",
                    activeCategory === cat
                      ? "text-white"
                      : "text-white/40 border border-white/0 hover:border-white/20 hover:text-white"
                  )}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#FF4D00] rounded-full z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Case Studies Content Section - Overlaps Nav */}
        <section className="bg-[#212121] pt-24 md:pt-32 px-4 md:px-8 relative z-10">
          {/* Diagonal Line Watermark Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />

          <div className="max-w-[1400px] mx-auto relative z-10">
            {/* Case Study Cards */}
            <div className="space-y-12 md:space-y-20">
              {filteredStudies.map((study) => (
                <CaseStudyCard key={study._id || study.id} study={study} />
              ))}
            </div>

            {/* Testimonial Section with Background Text */}
            <div className="relative mt-20 md:mt-40 pb-20">
              {/* Large background text behind everything */}
              <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 text-[25vw] font-black text-white/[0.04] uppercase pointer-events-none select-none tracking-widest leading-none whitespace-nowrap z-0">
                WEBSITE
              </div>

              {/* Metadata section above the card */}
              <div className="relative z-10 border-t border-white/10 pt-12 pb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Services</p>
                    <p className="text-white text-sm md:text-xl font-bold font-albert">Branding, Product</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Website</p>
                    <p className="text-white text-sm md:text-xl font-bold font-albert">www.adlyngo.com</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Published</p>
                    <p className="text-white text-sm md:text-xl font-bold font-albert">20 January 2023</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold font-albert">Industry</p>
                    <p className="text-white text-sm md:text-xl font-bold font-albert">Lifestyle, Music</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#121212] rounded-[30px] md:rounded-[40px] p-8 md:p-20 border border-white/5 relative overflow-hidden z-10 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                  <div className="flex flex-col justify-between">
                    <h2 className="text-4xl md:text-6xl font-albert text-white mb-12 leading-tight normal-case tracking-tight">
                      <span className="font-medium">Trusted by</span> <br /> <span className="font-black">Brands</span>
                    </h2>
                    
                    <div className="flex items-center gap-6 mt-auto">
                      <span className="text-7xl md:text-9xl font-albert font-bold text-white tracking-tighter">4.89</span>
                      <div className="bg-white rounded-full px-4 py-2.5 flex gap-1 items-center h-fit">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={16} fill="#FF4D00" color="#FF4D00" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed font-albert mb-12 lg:pr-10">
                      Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data driven performance marketing with premium creative so every rupee work...
                    </p>

                    <div className="flex items-center gap-5 mt-auto">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 p-0.5">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                          alt="Ravi Verma"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white text-xl font-bold font-albert normal-case tracking-tight">Ravi Verma</h4>
                        <p className="text-white/40 text-sm font-albert">CEO, People Inc.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination dots at bottom center */}
                <div className="flex justify-center gap-2 mt-12 md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-colors", i === 1 ? "bg-[#FF4D00]" : "bg-white/20")} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
