"use client";

import Link from "next/link";
import Footer from "@/components/common/Footer";
import BrandMarqueeStrip from "@/components/home/BrandMarqueeStrip";
import FunnelIndustriesSections from "@/components/home/FunnelIndustriesSections";
import HomeLegacySections from "@/components/home/HomeLegacySections";
import HomeContactSection from "@/components/home/HomeContactSection";
import CountUpValue from "@/components/home/CountUpValue";

const growthStats = [
  { value: "$42M+", label: "Revenue Managed" },
  { value: "250K+", label: "Leads Generated" },
  { value: "8X", label: "Avg. Client ROAS" },
  { value: "48HR", label: "System Setup" },
];

export default function HomePage() {
  return (
    <div className="bg-dark text-muted min-h-screen">
      {/* Hero */}
      <section className="mt-[var(--site-header-height)] px-6 md:px-16 lg:px-[70px] pt-5 md:pt-6 lg:pt-7 pb-10 md:pb-5 lg:pb-7 bg-surface">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-5 items-stretch">
          <div className="flex flex-col gap-6 lg:gap-7">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] w-fit">
              <span className="w-2 h-2 rounded-full bg-brand shrink-0" aria-hidden />
              <span className="text-brand text-[10px] md:text-xs font-albert font-bold uppercase tracking-[0.2em]">
                Performance Marketing Elite
              </span>
            </div>

            <h1 className="text-[clamp(2.25rem,5.5vw,4.5rem)] text-white leading-[0.9]">
              We Don&apos;t Bring You<br />
              More Leads. We<br />
              Bring You The<br />
              <span className="text-brand">Right Ones.</span>
            </h1>

            <p className="font-albert text-white/50 text-sm md:text-base leading-relaxed max-w-xl">
              We help businesses generate qualified leads, build authority, and grow through high-converting ads, websites, branding, and content systems.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-brand text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-albert font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Book Free Growth Audit
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center border border-white text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-albert font-semibold text-sm hover:bg-white/5 transition-colors"
              >
                View Success Stories
              </Link>
            </div>
          </div>

          <div
            className="rounded-2xl bg-[#c8c8c8] min-h-[220px] lg:min-h-0 lg:h-full"
            aria-label="Hero visual placeholder"
          />
        </div>
      </section>

      {/* Growth stats */}
      <section className="px-6 md:px-16 lg:px-[70px] py-10 md:py-12 lg:py-2 bg-black">
        <div className="w-full">
          <BrandMarqueeStrip className="-mx-6 md:-mx-16 lg:-mx-[70px] mb-8 lg:mb-10" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8 lg:mb-10">
            <div className="flex flex-col gap-4 lg:gap-5">
              <h2 className="text-[72px] text-white leading-[0.95] text-white leading-[0.95]">
                Built For Businesses That Want <span className="text-brand">Growth</span>, Not Guesswork
              </h2>
              <p className="font-albert text-white/50 text-sm md:text-base leading-relaxed max-w-xl">
                At Adlyngo, we operate as your tactical growth partner. We don&apos;t just run ads — we engineer ecosystems that reliably convert strangers into loyal customers. Our methodology is rooted in data-driven precision and high-impact visual storytelling.
              </p>
            </div>

            <div className="flex lg:justify-end w-full">
              <div
                className="w-full max-w-[530px] aspect-[530/317] rounded-[18px] border border-white/10 bg-[#c8c8c8] lg:w-[530px] lg:h-[317px] lg:aspect-auto shrink-0"
                aria-label="Growth section visual placeholder"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {growthStats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-[18px] border border-[#2a2a2a] bg-[#111111] px-5 py-6 md:px-6 md:py-8 shadow-[0_0_24px_rgba(100,100,100,0.1)]"
              >
                <p className="text-brand text-3xl md:text-4xl lg:text-[2.75rem] font-heading leading-none mb-2 md:mb-3">
                  <CountUpValue value={value} />
                </p>
                <p className="text-[10px] md:text-xs font-albert font-semibold uppercase tracking-[0.15em] text-white/70">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FunnelIndustriesSections />

      <HomeLegacySections />

      <HomeContactSection />

      <Footer />
    </div>
  );
}
