"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
      {Object.entries(socials).map(([platform, url]) => (
        url && icons[platform] && (
          <div key={platform} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60">
            {icons[platform]}
          </div>
        )
      ))}
    </div>
  );
};

export default function CaseStudyDetailPage() {
  const params = useParams();
  const study = caseStudies.find(s => s.id === parseInt(params.id)) || caseStudies[0];

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
            <img src={study.logo} alt="logo" className="h-6 md:h-8 opacity-80" />
            <SocialIcon socials={study.socials} />
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full mb-8 md:mb-12 overflow-hidden rounded-[20px] md:rounded-[30px]">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
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
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Services</p>
              <p className="text-white text-base font-medium">{study.metadata.services}</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Website</p>
              <p className="text-white text-base font-medium">{study.metadata.website}</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Published</p>
              <p className="text-white text-base font-medium">{study.metadata.published}</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">Industry</p>
              <p className="text-white text-base font-medium">{study.metadata.industry}</p>
            </div>
          </div>

          {/* Video Gallery */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-8 md:mb-10 uppercase italic">Video Gallery</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {study.videos.map((vid, i) => (
                <div key={i} className="relative w-[280px] h-[450px] flex-shrink-0 rounded-[30px] overflow-hidden border border-white/5">
                  <Image src={vid} alt="Video thumbnail" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Creatives Gallery */}
          <div className="mb-6 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-8 md:mb-10 uppercase italic">Creatives Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {study.creatives.map((img, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "relative overflow-hidden rounded-[20px] border border-white/5",
                    i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                  )}
                >
                  <Image src={img} alt="Creative" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
  );
}
