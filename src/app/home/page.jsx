"use client";

import Link from "next/link";
import Image from "next/image";
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
      {/* Hero + brand marquee */}
      <section className="mt-[var(--site-header-height)] overflow-hidden bg-surface">
        <div className="site-container pt-5 md:pt-6 lg:pt-7 pb-5 md:pb-6">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-5">
            <div className="flex flex-col gap-6 lg:gap-7">
              <h1 className="text-[clamp(2.25rem,5.5vw,4.5rem)] text-white leading-[0.9]">
                We Don&apos;t Bring You<br />
                More Leads. We<br />
                Bring You The<br />
                <span className="text-brand">Right Ones.</span>
              </h1>

              <p className="max-w-xl font-albert text-sm leading-relaxed text-white/50 md:text-base">
                We help businesses generate qualified leads, build authority, and grow through high-converting ads, websites, branding, and content systems.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 font-albert text-sm font-semibold text-white transition-opacity hover:opacity-90 md:px-6 md:py-3"
                >
                  Book Free Growth Audit
                </Link>
                <Link
                  href="/testimonials"
                  className="inline-flex items-center justify-center rounded-lg border border-white px-5 py-2.5 font-albert text-sm font-semibold text-white transition-colors hover:bg-white/5 md:px-6 md:py-3"
                >
                  View Success Stories
                </Link>
              </div>
            </div>

            <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-white/10 sm:h-[380px] lg:h-[480px]">
              <Image
                src="/images/Futuristic.png"
                alt="Futuristic growth marketing visual"
                fill
                priority
                className="object-cover object-[25%_25%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <BrandMarqueeStrip className="mt-6 border-t border-white/[0.06] md:mt-8" />
        </div>
      </section>

      {/* Growth stats */}
      <section className="bg-black py-10 md:py-12 lg:py-6">
        <div className="site-container w-full">
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
              <div className="relative w-full max-w-[530px] aspect-[530/317] overflow-hidden rounded-[18px] border border-white/10 lg:h-[317px] lg:w-[530px] lg:aspect-auto shrink-0">
                <Image
                  src="/images/Businesses.png"
                  alt="Businesses growing with Adlyngo"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 530px"
                />
              </div>
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
