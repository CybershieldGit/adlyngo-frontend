"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import LottieAnimation from "@/components/common/LottieAnimation";

const funnelServices = [
  {
    id: "leads",
    label: "Lead Generation",
    title: "More Enquiries Won't Grow Your Business. Better Ones Will.",
    description:
      "We create performance ad campaigns that attract people actually interested in buying your service or product.",
    includes: ["Meta Ads", "Google Ads", "Landing Pages", "CRM Setup", "Lead Qualification", "Retargeting Funnels"],
    lottie: "/funel/Leads%20qualification.json",
  },
  {
    id: "websites",
    label: "Websites & Apps",
    title: "Your Business Exists Offline. Your Competition Exists Online — And That's Why They're Winning.",
    description: "We build modern websites focused on trust, conversions, and enquiries.",
    includes: [
      "Business Websites",
      "Landing Pages",
      "Booking Systems",
      "CRM Integrations",
      "Speed Optimization",
      "Mobile Responsive Design",
    ],
    lottie: "/funel/website.json",
  },
  {
    id: "ugc",
    label: "UGC & Creative Ads",
    title: "Your Product Is Good. Your Ads Just Haven't Proved It Yet.",
    description: "We create ad creatives designed to stop scrolling and increase conversions.",
    includes: ["UGC Videos", "Reels", "Scriptwriting", "Product Showcases", "Hook-Based Ads", "Voiceover Ads"],
    lottie: "/funel/Create%20ADS.json",
  },
  {
    id: "social",
    label: "Social Media Management",
    title: "Posting Consistently But Still Not Growing? The Problem Isn't Your Effort — It's The Strategy.",
    description: "We turn your social media into a trust-building and lead-generating machine.",
    includes: [
      "Content Strategy",
      "Reels & Carousels",
      "Growth Planning",
      "Brand Positioning",
      "Engagement Management",
      "Monthly Analytics",
    ],
    lottie: "/funel/Social%20Media%20Marketing.json",
  },
  {
    id: "shoots",
    label: "Shoots & Cinematics",
    title: "People Buy With Their Eyes First.",
    description: "We create premium visuals that make your brand look worth paying for.",
    includes: [
      "Product Shoots",
      "Interior Shoots",
      "Real Estate Shoots",
      "Cinematic Videos",
      "Drone Shots",
      "Editing & Color Grading",
    ],
    lottie: "/funel/Movie%20scene.json",
  },
  {
    id: "branding",
    label: "Branding & Graphics",
    title: "A Business Without A Brand Is Just Another Option.",
    description: "We create visual identities that make businesses look trustworthy and memorable.",
    includes: ["Logos", "Brochures", "Catalogues", "Brand Identity", "Social Media Creatives", "Ad Graphics"],
    lottie: "/funel/Brand%20Animation.json",
  },
];

const industryItems = [
  {
    id: "real-estate",
    label: "Real Estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "interior",
    label: "Interior Designers",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "beauty",
    label: "Beauty & Cosmetics",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ecommerce",
    label: "E-Commerce Brands",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "local",
    label: "Local Businesses",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "personal",
    label: "Personal Brands",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
];

function ServiceArrow() {
  return (
    <svg width="12" height="14" viewBox="0 0 10 12" fill="none" aria-hidden className="shrink-0">
      <path d="M0 0L10 6L0 12V0Z" fill="currentColor" />
    </svg>
  );
}

const funnelCardTransition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.9,
};

const funnelCardVariants = {
  enter: (direction) => ({
    y: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    y: 0,
  },
  exit: (direction) => ({
    y: direction > 0 ? "-100%" : "100%",
  }),
};

function FunnelServicePanel({ service }) {
  return (
    <>
      <h3 className="font-heading font-normal text-[clamp(1.375rem,5.5vw,36px)] leading-[110%] md:leading-[100%] tracking-[0] text-white mb-3 md:mb-4 max-w-full md:max-w-[507px]">
        {service.title}
      </h3>
      <p className="mb-4 max-w-full font-albert text-[18px] font-normal leading-[140%] tracking-[0] text-white/50 md:mb-5 md:max-w-[507px] md:leading-[100%]">
        {service.description}
      </p>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center md:gap-7">
        <div className="min-w-0 flex-1">
          <p className="font-heading font-normal text-[#FF6A00] text-[clamp(1.25rem,4vw,36px)] leading-[100%] tracking-[0] uppercase mb-2 md:mb-3 align-middle">
            Includes:
          </p>
          <ul className="space-y-1 md:space-y-1.5">
            {service.includes.map((item) => (
              <li
                key={item}
                className="font-albert font-normal text-white/45 text-[clamp(1rem,3vw,24px)] leading-[130%] md:leading-[100%] tracking-[0] align-middle"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[170px] w-full shrink-0 overflow-hidden sm:h-[215px] sm:w-[42%] lg:h-[275px] lg:w-[280px]">
          <LottieAnimation
            src={service.lottie}
            className="object-contain object-right-bottom"
            ariaLabel={service.label}
            blendWith="#1a1a1a"
          />
        </div>
      </div>
    </>
  );
}

function FunnelSection() {
  const [active, setActive] = useState(funnelServices[0].id);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prevIndexRef = useRef(0);
  const service = funnelServices.find((item) => item.id === active) ?? funnelServices[0];

  const handleSelect = (id) => {
    const nextIndex = funnelServices.findIndex((item) => item.id === id);
    if (nextIndex === -1 || nextIndex === prevIndexRef.current) return;
    setDirection(nextIndex > prevIndexRef.current ? 1 : -1);
    prevIndexRef.current = nextIndex;
    setActive(id);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((currentId) => {
        const currentIndex = funnelServices.findIndex((item) => item.id === currentId);
        const nextIndex = (currentIndex + 1) % funnelServices.length;
        setDirection(1);
        prevIndexRef.current = nextIndex;
        return funnelServices[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="pt-12 md:pt-14 pb-12 md:pb-16 bg-black">
      <div className="site-container w-full">
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] text-white leading-[0.92] mb-4">
          Mastering the Full Funnel
        </h2>
        <p className="font-albert text-white/45 text-sm md:text-[15px] leading-relaxed max-w-[620px] mb-12 md:mb-14">
          We deploy bespoke growth vectors across the digital landscape to ensure your brand dominates every touchpoint.
        </p>

        <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-[auto_750px] lg:gap-[10px] lg:items-start">
          <nav className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 lg:mx-0 lg:px-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:pt-2 lg:shrink-0">
            {funnelServices.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    "group flex shrink-0 items-center gap-[10px] px-[10px] py-2 text-left font-heading font-normal text-[1.35rem] sm:text-[1.6rem] md:text-[36px] lg:text-[52px] leading-[100%] tracking-[0] uppercase whitespace-nowrap transition-colors",
                    isActive ? "text-[#FF6A00]" : "text-white/20 hover:text-white/35"
                  )}
                >
                  <span className="leading-[100%]">{item.label}</span>
                  {isActive && (
                    <span className="text-[#FF6A00] shrink-0">
                      <ServiceArrow />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div
            className="relative w-full lg:w-[750px] rounded-[18px] border border-[#2a2a2a] bg-[#1a1a1a] shadow-[0_0_24px_rgba(100,100,100,0.1)] overflow-hidden min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={funnelCardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={funnelCardTransition}
                className="relative flex flex-col px-5 py-6 sm:px-7 sm:py-7 md:px-10 md:py-9 bg-[#1a1a1a] will-change-transform"
              >
                <FunnelServicePanel service={service} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const industryStackTransition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 0.85,
};

function IndustryImageStack({ activeId }) {
  const activeIndex = industryItems.findIndex((item) => item.id === activeId);

  return (
    <div className="relative w-full max-w-[530px] mx-auto lg:mx-0 lg:w-[530px] h-[320px] sm:h-[400px] md:h-[500px] lg:h-[560px] mb-8 lg:mb-0">
      {industryItems.map((item, index) => {
        const isActive = index === activeIndex;
        const isInStack = index > activeIndex;
        const stackDepth = index - activeIndex;
        const stackCount = industryItems.length - activeIndex - 1;
        const stackFromBack = stackCount - stackDepth;
        const stackScale = Math.max(0.62, 0.78 - stackFromBack * 0.03);

        let zIndex;
        let motionProps;

        if (isActive) {
          zIndex = 20;
          motionProps = { scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 };
        } else if (isInStack) {
          zIndex = Math.max(1, 12 - stackDepth);
          motionProps = {
            scale: stackScale,
            x: 22 + stackFromBack * 12,
            y: 18 + stackFromBack * 12,
            rotate: 14 + stackFromBack * 3.5,
            opacity: 1,
          };
        } else {
          zIndex = 0;
          motionProps = { scale: 0.96, x: 0, y: 0, rotate: 0, opacity: 0 };
        }

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={motionProps}
            transition={industryStackTransition}
            className={cn(
              "absolute inset-0 overflow-hidden rounded-[18px] will-change-transform",
              isActive
                ? "shadow-[0_0_24px_rgba(100,100,100,0.1)]"
                : isInStack
                  ? "border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                  : "pointer-events-none"
            )}
            style={{
              zIndex,
              transformOrigin: "100% 100%",
            }}
          >
            <Image
              src={item.image}
              alt={isActive ? item.label : ""}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 530px"
              priority={index === 0}
            />
            <motion.div
              className="absolute inset-0 bg-black pointer-events-none"
              initial={false}
              animate={{ opacity: isInStack ? 0.55 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-hidden
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function IndustriesSection() {
  const [active, setActive] = useState(industryItems[0].id);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((currentId) => {
        const currentIndex = industryItems.findIndex((item) => item.id === currentId);
        const nextIndex = (currentIndex + 1) % industryItems.length;
        return industryItems[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-black overflow-hidden">
      <div className="site-container w-full grid grid-cols-1 lg:grid-cols-[530px_1fr] lg:gap-16 xl:gap-24 items-center">
        <IndustryImageStack activeId={active} />

        <div className="flex flex-col items-start lg:items-end w-full min-w-0">
          <h2 className="font-heading font-normal text-[clamp(2rem,8vw,3.75rem)] text-white leading-[100%] tracking-[0] uppercase text-left lg:text-right mb-6 md:mb-8 lg:mb-12">
            Industries We Work With
          </h2>

          <nav className="flex flex-col gap-1 items-start lg:items-end w-full overflow-x-auto no-scrollbar lg:overflow-visible">
            {industryItems.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "group flex w-auto shrink-0 items-center justify-start lg:justify-end gap-[10px] px-[10px] py-2 text-left lg:text-right font-heading font-normal text-[1.35rem] sm:text-[1.6rem] md:text-[36px] lg:text-[52px] leading-[100%] tracking-[0] uppercase whitespace-nowrap transition-colors",
                    isActive ? "text-[#FF6A00]" : "text-[#555555] hover:text-white/40 transition-colors duration-300"
                  )}
                >
                  {isActive && (
                    <span className="rotate-180 text-[#FF6A00] shrink-0">
                      <ServiceArrow />
                    </span>
                  )}
                  <span className="leading-[100%]">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}

export default function FunnelIndustriesSections() {
  return (
    <>
      <FunnelSection />
      <IndustriesSection />
    </>
  );
}
