"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Megaphone, TrendingDown, Users, Eye, Wallet,
  Globe, Video, Share2, Target, Camera, Palette,
  Building2, Sofa, ShoppingBag, Sparkles,
  ArrowDown, MessageCircle, ExternalLink, Play, Loader2,
} from "lucide-react";

const REEL_FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop";

async function fetchGalleryReels() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://adlyngo-next-seven.vercel.app";
  const path = "/api/reels?page=1&limit=50";

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
    text: "Your business is 90% referrals — one dry month and you panic",
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
      <p className="p-4 font-albert text-white/70 text-sm leading-relaxed">{pain.text}</p>
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

    const offset = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, [active]);

  return (
    <div>
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1"
      >
        {pains.map((pain) => (
          <div
            key={pain.text}
            className="snap-center shrink-0 w-[85vw] max-w-[320px] sm:w-[300px] md:w-[320px]"
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
      className="group block h-full rounded-xl border border-white/10 bg-[#111111] overflow-hidden hover:border-brand/30 transition-colors"
    >
      <div className={cn("relative aspect-square w-full flex items-center justify-center bg-gradient-to-br", site.accent)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt=""
          className="h-14 w-14 rounded-lg"
        />
        <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-md bg-black/70 border border-white/10">
          <ExternalLink size={12} className="text-white/60 group-hover:text-brand transition-colors" />
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-albert font-semibold text-white text-sm mb-1">{site.name}</h4>
        <p className="font-albert text-white/50 text-xs leading-relaxed line-clamp-2">{site.desc}</p>
        <p className="font-albert text-white/25 text-[10px] mt-2 truncate">{domain}</p>
      </div>
    </a>
  );
}

function WebsiteCarousel({ websites }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % websites.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [websites.length]);

  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[active];
    if (!track || !slide) return;

    const offset = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, [active]);

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 md:justify-center md:overflow-x-visible"
      >
        {websites.map((site) => (
          <div
            key={site.url}
            className="snap-center shrink-0 w-[85vw] max-w-[320px] sm:w-[300px] md:w-[320px]"
          >
            <WebsiteCard site={site} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {websites.map((site, i) => (
          <button
            key={site.url}
            type="button"
            aria-label={`Go to ${site.name}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brand" : "w-1.5 bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ReelCard({ reel, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <Link
      href="/video-gallery"
      className="group block h-full rounded-xl border border-white/10 bg-[#111111] overflow-hidden hover:border-brand/30 transition-colors"
    >
      <div className="relative aspect-[9/16] w-full bg-black">
        {reel.videoUrl ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.thumbnail}
            muted
            loop
            playsInline
            preload="metadata"
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

    const offset = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, [active, reels.length]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <Loader2 className="animate-spin text-brand" size={28} />
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="w-full max-w-sm text-center py-10">
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
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 md:justify-center md:overflow-x-visible"
      >
        {reels.map((reel, i) => (
          <div
            key={reel.id}
            className="snap-center shrink-0 w-[200px] sm:w-[240px]"
          >
            <ReelCard reel={reel} isActive={i === active} />
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
      <p className="text-center mt-4">
        <Link href="/video-gallery" className="text-brand font-albert font-semibold text-xs uppercase tracking-wider hover:underline">
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
        accent: "from-violet-600/20 to-indigo-900/40",
      },
      {
        name: "Phonotel",
        url: "https://www.phonotel.com/",
        desc: "AI-powered cloud telephony & IVR for Indian businesses.",
        accent: "from-cyan-600/20 to-blue-900/40",
      },
      {
        name: "iDigital Studies",
        url: "https://www.idigitalstudies.com/",
        desc: "AI-integrated digital marketing institute in Noida.",
        accent: "from-brand/20 to-orange-900/40",
      },
    ],
  },
  { icon: Video, tab: "UGC Ads", title: "UGC & Creative Ads", desc: "Scroll-stopping creative that proves your product works.", useReels: true },
  { icon: Share2, tab: "Social", title: "Social Media Management", desc: "Consistent content that builds community and drives sales." },
  { icon: Target, tab: "Leads", title: "Lead Generation", desc: "Meta & Google campaigns that fill your pipeline with intent." },
  { icon: Camera, tab: "Shoots", title: "Shoots & Cinematics", desc: "Premium production that makes your brand unforgettable." },
  { icon: Palette, tab: "Branding", title: "Branding & Graphics", desc: "Visual identity that earns trust before the first conversation." },
];

function ServicesIsland() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const Icon = service.icon;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="inline-flex items-center p-1.5 bg-black border border-white/10 rounded-full gap-1 overflow-x-auto no-scrollbar max-w-full shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
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

      {service.websites ? (
        <WebsiteCarousel websites={service.websites} />
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

const industries = [
  { icon: Building2, title: "Real Estate", desc: "Luxury projects, developers & brokers" },
  { icon: Sofa, title: "Interior Design", desc: "Studios, architects & home brands" },
  { icon: ShoppingBag, title: "E-Commerce", desc: "D2C brands scaling with performance creative" },
  { icon: Sparkles, title: "Beauty & Cosmetics", desc: "Skincare, salon & lifestyle brands" },
];

const results = [
  {
    tag: "Real Estate",
    title: "Luxury Villa Project",
    stats: ["3.2× increase in qualified leads", "₹4.1 Cr in sales in 90 days"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Interior Design",
    title: "Premium Interiors",
    stats: ["2.8× increase in enquiries", "70% increase in profile visits"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Beauty",
    title: "Beauty & Skincare",
    stats: ["3.6× ROAS on Meta ads", "₹27 L monthly revenue"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
  },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1558431382-27e303142254?q=80&w=2070&auto=format&fit=crop";
export default function HomePage() {
  return (
    <div className="bg-dark text-muted min-h-screen pt-24">
      {/* Hero */}
      <section className="relative px-6 md:px-16 lg:px-[70px] py-10 md:py-14 overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Adlyngo creative studio"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" />
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, #FF4D00 0%, transparent 50%)" }} />

        <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-brand text-xs md:text-sm font-albert font-bold uppercase tracking-[0.25em] mb-4">Digital Growth Agency</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-4">
              We Don&apos;t Run Ads.<br />
              <span className="text-brand">We Make Them Speak.</span>
            </h1>
            <p className="font-albert text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-6">
              Your business is good. The right people just haven&apos;t seen it yet. We build the digital presence that makes you seen, trusted, and chosen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/creative-gallery" className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-md font-albert font-semibold text-sm hover:opacity-90 transition-opacity">
                See Our Work <ArrowDown size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 bg-black/30 backdrop-blur-sm text-white px-6 py-3 rounded-md font-albert font-semibold text-sm hover:border-brand hover:text-brand transition-colors">
                <MessageCircle size={16} /> Book a Free Call
              </Link>
            </div>
            <p className="mt-6 text-[10px] md:text-xs font-albert uppercase tracking-widest text-white/40">
              Trusted by brands in Real Estate · Interior Design · E-Commerce · Beauty & Lifestyle
            </p>
          </div>
          <div className="hidden lg:block relative h-[340px] rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
              alt="Creative team at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 border border-white/10 rounded-xl bg-black/50 backdrop-blur-md">
              <p className="text-white font-heading text-2xl uppercase">Cinematic ads.<br />Measurable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="px-6 md:px-16 lg:px-[70px] py-10 md:py-12 border-t border-white/5 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white text-center mb-6">Sound familiar?</h2>
          <PainCarousel />
          <p className="text-center mt-6 font-albert text-white/50">
            If you nodded at any of these — <span className="text-brand font-semibold">you&apos;re in the right place.</span>
          </p>
        </div>
      </section>
      {/* Services */}
      <section className="px-6 md:px-16 lg:px-[70px] py-10 md:py-12 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-3">Everything your brand needs to grow.</h2>
          <p className="font-albert text-white/40 mb-6 max-w-2xl">Full-stack digital growth — creative, media, and conversion in one team.</p>
          <ServicesIsland />
          {/* <div className="mt-6 text-center">
            <Link href="/services" className="text-brand font-albert font-semibold text-sm uppercase tracking-wider hover:underline">View all services →</Link>
          </div> */}
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-16 lg:px-[70px] py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8">How we grow your business.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ n, title, desc }) => (
              <div key={n}>
                <span className="text-brand font-heading text-5xl md:text-6xl">{n}</span>
                <h3 className="text-2xl text-white mt-4 mb-3">{title}</h3>
                <p className="font-albert text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 md:px-16 lg:px-[70px] py-10 md:py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8">Industries we specialize in.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-white/10 text-center hover:border-brand/30 transition-colors">
                <Icon className="text-brand mx-auto mb-4" size={28} />
                <h3 className="text-lg text-white mb-2">{title}</h3>
                <p className="font-albert text-xs text-white/40">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 md:px-16 lg:px-[70px] py-10 md:py-12 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-2">Results we&apos;ve delivered.</h2>
          <p className="font-albert text-white/40 mb-8">Numbers over noise.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {results.map(({ tag, title, stats, image }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-dark overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-albert uppercase tracking-widest text-brand">{tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-white mb-4">{title}</h3>
                  <ul className="space-y-2">
                    {stats.map((s) => (
                      <li key={s} className="font-albert text-sm text-white/60 flex items-start gap-2">
                        <span className="text-brand mt-1">•</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>          {/* <div className="mt-10 text-center">
            <Link href="/case-studies" className="text-brand font-albert font-semibold text-sm uppercase tracking-wider hover:underline">View case studies →</Link>
          </div> */}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-16 lg:px-[70px] py-14 md:py-16 text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, #FF4D00 0%, transparent 60%)" }} />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-5">
            Stop running in circles.<br />
            <span className="text-brand">Let&apos;s build what actually works.</span>
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-brand text-white px-10 py-4 rounded-md font-albert font-bold text-base hover:opacity-90 transition-opacity">
            <MessageCircle size={18} /> Let&apos;s Talk
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
