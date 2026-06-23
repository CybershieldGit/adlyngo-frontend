"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const INTRO_PATHS = ["/home", "/video-gallery"];

const stats = [
  { value: "10,000 +", label: "Qualified Leads Generated" },
  { value: "₹50L+", label: "Ad Spend Managed" },
  { value: "3-5X", label: "Average Client ROI" },
  { value: "50 +", label: "Funnels Built & Optimised" },
];

function StatColumn() {
  return (
    <div className="flex w-full md:w-[268px] flex-col justify-center items-start rounded-[24px] md:rounded-[30px] bg-white/10 p-5 md:p-8">
      <div className="flex w-full flex-col items-start justify-start gap-3 md:gap-[18px]">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex w-full flex-col items-start justify-start gap-1">
            <div className="font-heading text-xl md:text-[34px] font-normal uppercase leading-none text-white">
              {stat.value}
            </div>
            <div className="font-albert text-[9px] md:text-sm font-normal text-white opacity-60">
              {stat.label}
            </div>
            {i < stats.length - 1 && <div className="mt-1.5 md:mt-3 h-px w-full bg-white/10" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IntroModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!INTRO_PATHS.includes(pathname)) {
      setIsOpen(false);
      return;
    }

    const hasSeenIntro = sessionStorage.getItem("adlyngo_intro_seen");
    setIsOpen(!hasSeenIntro);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");

    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("adlyngo_intro_seen", "true");
    window.dispatchEvent(new Event("introClosed"));
  };

  if (!INTRO_PATHS.includes(pathname)) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1100] flex items-start justify-center md:items-end"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl md:backdrop-blur-xl" />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-[14vh] flex max-h-[72vh] w-full max-w-[1250px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-black/20 shadow-[0_-20px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl md:mt-0 md:max-h-none md:rounded-b-none md:rounded-t-[48px]"
            data-lenis-prevent
          >
            <div className="relative z-20 flex w-full items-center justify-between px-6 py-4 md:px-12 md:py-6">
              <div className="flex w-full items-center justify-between gap-4">
                <div className="relative h-[32px] w-[120px] flex-shrink-0 md:h-[54.73px] md:w-[207.67px]">
                  <Image src="/logo.svg" alt="Adlyngo" fill className="object-contain" />
                </div>
                <div className="hidden font-heading text-[34px] font-normal uppercase tracking-tight text-white md:block">
                  The Native Tongue of Ads.
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="group flex flex-shrink-0 items-center justify-center gap-[10px] rounded-lg border border-brand bg-brand px-6 py-2.5 shadow-lg shadow-brand/20 transition-all duration-300 hover:scale-105 hover:bg-transparent md:w-[170px]"
                >
                  <span className="font-albert text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors group-hover:text-brand md:text-[11px]">
                    LET&apos;S START
                  </span>
                </button>
              </div>
            </div>

            <div className="relative z-20 mx-auto h-px w-[calc(100%-24px)] bg-white/10 md:w-[calc(100%-96px)]" />

            <div
              className="custom-scrollbar relative z-20 min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-6 pb-12 touch-pan-y md:p-12 md:pt-6 md:pb-12"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row md:items-center md:gap-16">
                <div className="flex flex-1 flex-col items-start justify-start gap-8 md:gap-10">
                  <div className="flex flex-col items-start justify-start gap-4 md:gap-5">
                    <h1 className="flex flex-col font-heading uppercase">
                      <span className="text-3xl leading-[1.1] text-white md:text-5xl lg:text-[56px]">
                        We Don&apos;t Run Ads.
                      </span>
                      <span className="text-3xl leading-[1.1] text-white md:text-5xl lg:text-[56px]">
                        We Make Them <span className="text-brand">Speak.</span>
                      </span>
                    </h1>
                    <p className="w-full font-albert text-xs font-normal leading-relaxed text-white opacity-80 md:text-sm">
                      We turn ideas into performance-driven campaigns that actually connect with people — not just impressions.
                    </p>
                  </div>

                  <div className="flex w-full flex-col items-start justify-start gap-4 md:gap-5">
                    <h3 className="font-heading text-2xl font-normal uppercase text-white md:text-3xl lg:text-[34px]">
                      WHO WE ARE?
                    </h3>
                    <div className="flex flex-col items-start justify-start gap-3">
                      <p className="w-full font-albert text-xs font-normal leading-relaxed text-white opacity-60 md:text-sm">
                        Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee works harder.
                      </p>
                      <p className="w-full font-albert text-xs font-normal leading-relaxed text-white opacity-60 md:text-sm">
                        We don&apos;t chase generic briefs. We specialise in Real Estate, Interior Design, E-Commerce, and Beauty — niches we&apos;ve mastered across strategy, creative and execution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-start gap-6 md:w-auto lg:flex-row">
                  <StatColumn />
                  <StatColumn />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
