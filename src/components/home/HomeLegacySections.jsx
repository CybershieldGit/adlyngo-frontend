"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Megaphone, TrendingDown, Users, Eye, Wallet,
  Globe, Video, Camera,
  ExternalLink, Play, Loader2,
} from "lucide-react";

const REEL_FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop";

const CREATIVE_FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop";

async function fetchFromApi(path) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adlyngo-next-seven.vercel.app";

  let response = await fetch(`${baseUrl}${path}`).catch(() => null);

  if (!response?.ok) {
    const fallbackPorts = ["3000", "3001", "3002", "3003", "3004", "3005", "5005"];
    for (const port of fallbackPorts) {
      const res = await fetch(`http://localhost:${port}${path}`).catch(() => null);
      if (res?.ok) {
        response = res;
        break;
      }
    }
  }

  return response;
}

async function fetchGalleryCreatives(offset = 0, limit = 10) {
  const response = await fetchFromApi(`/api/gallery?page=1&limit=100`);

  if (!response?.ok) return [];

  const json = await response.json();
  if (!json.success || !json.data?.items) return [];

  return json.data.items
    .map((item) => ({
      id: item._id,
      title: item.title || "Creative",
      image: item.imageUrl || item.image?.url || CREATIVE_FALLBACK_THUMB,
      order: item.order ?? 0,
      createdAt: item.createdAt || new Date().toISOString(),
    }))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    .slice(offset, offset + limit);
}

async function fetchGalleryReels() {
  const path = "/api/reels?page=1&limit=50";
  const response = await fetchFromApi(path);

  if (!response?.ok) return [];

  const json = await response.json();
  if (!json.success || !json.data?.reels) return [];

  return json.data.reels
    .map((reel) => ({
      id: reel._id,
      title: reel.title,
      category: reel.category?.name || "UGC",
      thumbnail: reel.thumbnail?.url || REEL_FALLBACK_THUMB,
      videoUrl: reel.reelUrl,
      order: reel.order ?? 0,
      createdAt: reel.createdAt || new Date().toISOString(),
    }))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
}

const pains = [
  {
    icon: Megaphone,
    text: "You're running ads but getting junk leads",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: TrendingDown,
    text: "You're posting on Instagram but no engagement",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Users,
    text: "Your business is 90% referrals one dry month and you panic",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Eye,
    text: "Your work is great but your online presence doesn't show it",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Wallet,
    text: "You paid an agency before and got zero results",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
  },
];

function PainCard({ pain, className = "" }) {
  const Icon = pain.icon;
  return (
    <div className={`h-full rounded-xl border border-white/10 bg-[#111111] overflow-hidden hover:border-brand/30 transition-colors ${className}`}>
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={pain.image}
          alt=""
          fill
          className="object-cover"
          sizes="320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-md bg-black/70 border border-brand/40">
          <Icon className="text-brand" size={16} />
        </div>
      </div>
      <p className="p-4 font-albert text-[24px] leading-relaxed text-white/70">{pain.text}</p>
    </div>
  );
}

function PainCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % pains.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[active];
    if (!track || !slide) return;

    const offset = Math.max(0, slide.offsetLeft - 4);
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, [active]);

  return (
    <div>
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2"
      >
        {pains.map((pain) => (
          <div
            key={pain.text}
            className="snap-start shrink-0 w-[85vw] max-w-[320px] sm:w-[300px] md:w-[320px]"
          >
            <PainCard pain={pain} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {pains.map((pain, i) => (
          <button
            key={pain.text}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brand" : "w-1.5 bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}

function WebsiteCard({ site }) {
  const domain = site.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full overflow-hidden rounded-xl border border-white/10 bg-[#111111] transition-colors hover:border-brand/30"
    >
      <div className="relative h-[260px] overflow-hidden bg-white sm:h-[300px] md:h-[340px]">
        <div className="w-full transition-transform duration-[6000ms] ease-in-out will-change-transform group-hover:-translate-y-[78%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.image}
            alt={site.name}
            className="block w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 right-3 z-[1] flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-black/70">
          <ExternalLink size={12} className="text-white/60 transition-colors group-hover:text-brand" />
        </div>
      </div>

      <div className="p-4">
        <h4 className="mb-1 font-heading text-sm uppercase tracking-wide text-white">{site.name}</h4>
        <p className="line-clamp-2 font-albert text-xs leading-relaxed text-white/50">{site.desc}</p>
        <p className="mt-2 truncate font-albert text-[10px] text-white/25">{domain}</p>
      </div>
    </a>
  );
}

function WebsiteShowcase({ websites }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {websites.map((site) => (
        <WebsiteCard key={site.url} site={site} />
      ))}
    </div>
  );
}

function ReelCard({ reel, isActive, scrollRootRef }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        root: scrollRootRef?.current ?? null,
        threshold: 0.4,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRootRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, isVisible]);

  const shouldLoadVideo = isVisible && reel.videoUrl;

  return (
    <div ref={cardRef} className="h-full">
      <Link
        href="/video-gallery"
        className="group block h-full rounded-xl border border-white/10 bg-[#111111] overflow-hidden hover:border-brand/30 transition-colors"
      >
        <div className="relative aspect-[9/16] w-full bg-black">
          {shouldLoadVideo ? (
            <video
              ref={videoRef}
              src={reel.videoUrl}
              poster={reel.thumbnail}
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image src={reel.thumbnail} alt={reel.title} fill className="object-cover" sizes="240px" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-12 h-12 rounded-full bg-brand/90 flex items-center justify-center transition-all duration-300 ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100"}`}>
              <Play className="text-white fill-white ml-0.5" size={20} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-brand text-[10px] font-albert font-bold uppercase tracking-widest mb-1">{reel.category}</p>
            <h4 className="font-heading text-white text-sm uppercase leading-tight line-clamp-2">{reel.title}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ReelCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchGalleryReels().then((data) => {
      if (!cancelled) {
        setReels(data.slice(0, 12));
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (reels.length === 0) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reels.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [reels.length]);

  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[active];
    if (!track || !slide) return;

    const offset = Math.max(0, slide.offsetLeft - 4);
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, [active, reels.length]);

  if (loading) {
    return (
      <div className="w-full flex justify-start py-16">
        <Loader2 className="animate-spin text-brand" size={28} />
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="w-full py-10 text-left">
        <p className="font-albert text-white/50 text-sm mb-4">No videos yet.</p>
        <Link href="/video-gallery" className="text-brand font-albert font-semibold text-sm uppercase tracking-wider hover:underline">
          View video gallery →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2 justify-start"
      >
        {reels.map((reel, i) => (
          <div
            key={reel.id}
            className="snap-start shrink-0 w-[200px] sm:w-[240px]"
          >
            <ReelCard reel={reel} isActive={i === active} scrollRootRef={trackRef} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {reels.map((reel, i) => (
          <button
            key={reel.id}
            type="button"
            aria-label={`Go to ${reel.title}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brand" : "w-1.5 bg-white/25"}`}
          />
        ))}
      </div>
      <p className="text-left mt-4">
        <Link href="/video-gallery" className="text-brand font-albert font-semibold text-xs uppercase tracking-wider hover:underline">
          View full gallery →
        </Link>
      </p>
    </div>
  );
}

function CreativeCard({ item }) {
  return (
    <Link
      href="/creative-gallery"
      className="group block h-full overflow-hidden rounded-xl border border-white/10 bg-[#111111] transition-colors hover:border-brand/30"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-heading text-[10px] uppercase tracking-wide text-white line-clamp-2">{item.title}</p>
        </div>
      </div>
    </Link>
  );
}

function CreativeShowcase() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchGalleryCreatives(10, 10).then((data) => {
      if (!cancelled) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-start py-16">
        <Loader2 className="animate-spin text-brand" size={28} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full py-10 text-left">
        <p className="font-albert text-white/50 text-sm mb-4">No creatives yet.</p>
        <Link href="/creative-gallery" className="text-brand font-albert font-semibold text-sm uppercase tracking-wider hover:underline">
          View creative gallery →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2">
        {items.map((item) => (
          <div key={item.id} className="snap-start shrink-0 w-[160px] sm:w-[200px]">
            <CreativeCard item={item} />
          </div>
        ))}
      </div>
      <p className="text-left mt-4">
        <Link href="/creative-gallery" className="text-brand font-albert font-semibold text-xs uppercase tracking-wider hover:underline">
          View full gallery →
        </Link>
      </p>
    </div>
  );
}

const services = [
  {
    icon: Globe,
    tab: "Websites",
    title: "Websites & Apps",
    desc: "High-converting, mobile-first sites that turn visitors into buyers.",
    websites: [
      {
        name: "Converro",
        url: "https://www.converro.io/",
        desc: "Engage prospects at scale with intelligent outreach.",
        image: "/images/Converro.png",
      },
      {
        name: "Phonotel",
        url: "https://www.phonotel.com/",
        desc: "AI-powered cloud telephony & IVR for Indian businesses.",
        image: "/images/phonotel.png",
      },
      {
        name: "iDigital Studies",
        url: "https://www.idigitalstudies.com/",
        desc: "AI-integrated digital marketing institute in Noida.",
        image: "/images/idigitalstudies.png",
      },
      {
        name: "Rakaar Rituals",
        url: "https://rakaarituals.com/",
        desc: "Premium wellness & bath rituals rooted in stillness.",
        image: "/images/rakaarituals.png",
      },
    ],
  },
  { icon: Video, tab: "UGC Ads", title: "UGC & Creative Ads", desc: "Scroll-stopping creative that proves your product works.", useReels: true },
  // { icon: Share2, tab: "Social", title: "Social Media Management", desc: "Consistent content that builds community and drives sales." },
  // { icon: Target, tab: "Leads", title: "Lead Generation", desc: "Meta & Google campaigns that fill your pipeline with intent." },
  { icon: Camera, tab: "Creative", title: "Creative & Cinematics", desc: "Premium production that makes your brand unforgettable.", useCreatives: true },
  // { icon: Palette, tab: "Branding", title: "Branding & Graphics", desc: "Visual identity that earns trust before the first conversation." },
];

function ServicesIsland() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const Icon = service.icon;

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <div className="flex w-full justify-center overflow-x-auto no-scrollbar">
        <div className="inline-flex items-center p-1.5 bg-black border border-white/10 rounded-full gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {services.map((item, i) => {
          const TabIcon = item.icon;
          const isActive = i === active;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(i)}
              aria-selected={isActive}
              className={cn(
                "relative flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] font-albert font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-300",
                isActive ? "text-white" : "text-white/40 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="service-tab-pill"
                  className="absolute inset-0 bg-brand rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <TabIcon size={16} className="relative z-10 shrink-0" />
              <span className="relative z-10 hidden sm:inline">{item.tab}</span>
            </button>
          );
        })}
        </div>
      </div>

      {service.websites ? (
        <WebsiteShowcase websites={service.websites} />
      ) : service.useCreatives ? (
        <CreativeShowcase />
      ) : service.useReels ? (
        <ReelCarousel />
      ) : (
        <div className="w-full max-w-sm sm:max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="aspect-square w-full rounded-2xl border border-white/10 bg-dark p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group"
            >
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-brand/10 rounded-full blur-[80px] group-hover:bg-brand/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 mb-6">
                  <Icon className="text-brand" size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl text-white mb-4">{service.title}</h3>
                <p className="font-albert text-sm sm:text-base text-white/50 leading-relaxed">{service.desc}</p>
              </div>
              <Link
                href="/services"
                className="relative z-10 inline-flex items-center gap-2 text-[10px] font-albert font-bold uppercase tracking-widest text-white/40 hover:text-brand transition-colors"
              >
                Learn more <span className="text-brand">→</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

const steps = [
  { n: "01", title: "Build Authority", desc: "We create a content system that positions you as the expert in your space." },
  { n: "02", title: "Generate Qualified Demand", desc: "Targeted Meta & Google campaigns that bring people ready to buy." },
  { n: "03", title: "Convert with Trust", desc: "We turn leads into sales through trust-building, not pressure." },
];

export default function HomeLegacySections() {
  return (
    <>
      {/* Pain points */}
      <section className="py-10 md:py-12 lg:py-20 border-t border-white/5 bg-black overflow-hidden">
        <div className="site-container w-full">
          <h2 className="font-heading text-[clamp(2rem,5vw,3.25rem)] md:text-5xl text-white text-left mb-4 uppercase">
            Sound familiar?
          </h2>
          <p className="text-left mb-12 font-albert text-white/50">
            If you noted at any of these — <span className="text-brand font-semibold">you&apos;re in the right place.</span>
          </p>
          <PainCarousel />
        </div>
      </section>

      {/* Services */}
      <section className="py-10 md:py-12 lg:py-20 bg-black border-t border-white/5">
        <div className="site-container w-full">
          <h2 className="font-heading text-[clamp(2rem,5vw,3.25rem)] md:text-5xl text-white mb-3 uppercase">
            Everything your brand needs to grow.
          </h2>
          <p className="font-albert text-white/40 mb-14 max-w-2xl">
            Full-stack digital growth — creative, media, and conversion in one team.
          </p>
          <ServicesIsland />
        </div>
      </section>

      {/* Process */}
      <section className="py-10 md:py-12 lg:py-20 bg-black border-t border-white/5">
        <div className="site-container w-full">
          <h2 className="font-heading text-[clamp(2rem,5vw,3.25rem)] md:text-5xl text-white mb-8 uppercase">
            How we grow your business.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n}>
                <span className="text-brand font-heading text-5xl md:text-6xl">{n}</span>
                <h3 className="font-heading text-xl md:text-2xl text-white mt-4 mb-3 uppercase">{title}</h3>
                <p className="font-albert text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
