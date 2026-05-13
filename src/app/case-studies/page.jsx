"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/common/Footer";

const categories = ["ALL", "COMMERCIALS", "BRAND CREATIVE", "MOTION", "PRODUCT"];

const caseStudies = [
  {
    id: 1,
    logo: "/logo.svg",
    title: "The project description",
    description: "Lorem Ipsum is simply dummy text the printing and typesetting industry been the industry's standard dummy text ever since the when unknown printer.Lorem Ipsum is simply dummy text the printing and typesetting industry been the industry's standard dummy text ever since the when unknown printer.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop",
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
    }
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
    }
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
      {Object.entries(socials).map(([platform, url]) => (
        url && icons[platform] && (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all cursor-pointer relative z-20"
          >
            {icons[platform]}
          </a>
        )
      ))}
    </div>
  );
};

const CaseStudyCard = ({ study }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onClick={() => router.push(`/case-studies/${study.id}`)}
      className="w-full bg-[#0D0D0D] rounded-[24px] md:rounded-[40px] p-6 md:p-12 mb-8 md:mb-12 border border-white/5 overflow-hidden group cursor-pointer relative"
    >
      <div className="flex justify-between items-center mb-6 md:mb-8 relative z-10">
        <img src={study.logo} alt="logo" className="h-5 md:h-8 opacity-80" />
        <SocialIcon socials={study.socials} />
      </div>

      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full mb-8 md:mb-10 overflow-hidden rounded-[20px] md:rounded-[30px]">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-2xl md:text-5xl font-heading text-white mb-4 md:mb-6 uppercase tracking-tight">
            {study.title}
          </h3>
        </div>
        <div>
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-albert">
            {study.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Services</p>
          <p className="text-white text-sm md:text-base font-medium">{study.metadata.services}</p>
        </div>
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Website</p>
          <p className="text-white text-sm md:text-base font-medium">{study.metadata.website}</p>
        </div>
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Published</p>
          <p className="text-white text-sm md:text-base font-medium">{study.metadata.published}</p>
        </div>
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Industry</p>
          <p className="text-white text-sm md:text-base font-medium">{study.metadata.industry}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredStudies = activeCategory === "ALL"
    ? caseStudies
    : caseStudies.filter(s => s.category === activeCategory);

  return (
    <>
      <main className="bg-[#050505] min-h-screen pt-[160px] md:pt-32 px-4 md:px-8 flex flex-col">
      {/* Header Section */}
      <div className="w-full mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-8xl lg:text-[100px] font-black font-heading text-white leading-[0.9] uppercase text-center md:text-left"
          >
            OUR <span className="text-[#FF4D00]">CASE STUDIES.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/60 text-sm md:text-base max-w-md font-albert leading-relaxed"
          >
            Every project at Adlyngo is built with one goal: turning creative thinking into measurable business growth through strategy, execution, and performance-focused design.
          </motion.p>
        </div>

        {/* Island Navbar (Filters) */}
        <div className="flex justify-center mb-12 md:mb-24 px-4">
          <div className="inline-flex items-center p-1.5 bg-black border border-white/10 rounded-full gap-1 md:gap-2 overflow-x-auto no-scrollbar max-w-full">
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
                <span className="relative z-10 whitespace-nowrap">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-12">
          {filteredStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 bg-[#0D0D0D] rounded-[30px] md:rounded-[50px] p-8 md:p-20 border border-white/5 relative overflow-hidden"
        >
          {/* Large background text */}
          <div className="absolute -bottom-10 -right-10 text-[15vw] font-black text-white/[0.02] uppercase pointer-events-none select-none">
            WEBSITE
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl md:text-7xl font-heading text-white mb-6 md:mb-8 leading-tight">
                Trusted by <br /> Brands
              </h2>
              <div className="flex items-center gap-6">
                <span className="text-6xl md:text-8xl font-heading text-white">4.89</span>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={20} fill="#FF4D00" color="#FF4D00" />
                    ))}
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i === 1 ? "bg-[#FF4D00]" : "bg-white/20")} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-albert mb-12">
                Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data driven performance marketing with premium creative so every rupee work...
              </p>

              <div className="flex items-center gap-5 mt-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF4D00]/30">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                    alt="Ravi Verma"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white text-xl font-bold font-albert">Ravi Verma</h4>
                  <p className="text-white/40 text-sm">CEO, People Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </main>
      <Footer />
    </>
  );
}
