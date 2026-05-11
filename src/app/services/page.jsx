"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, PenTool, Rocket, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/common/Footer";

const growthWays = [
  {
    id: 1,
    title: "WEBSITE & APP",
    subtitle: "DEVELOPMENT",
    desc: "Your business exists offline. Your competition exists online and that's why they're winning.",
    btnText: "First Video at ₹999",
  },
  {
    id: 2,
    title: "UGC & CREATIVE",
    subtitle: "ADS",
    desc: "Your product is good. Your ads just haven't proved it yet.",
    btnText: "First Video at ₹999",
  },
  {
    id: 3,
    title: "SOCIAL MEDIA",
    subtitle: "MANAGEMENT",
    desc: "Posting consistently but still not growing? The problem isn't your strategy.",
    btnText: "No Results = No Charges",
  },
  {
    id: 4,
    title: "LEAD",
    subtitle: "GENERATION",
    desc: "More enquiries won't grow your business. Better ones will.",
    btnText: "Guaranteed or No Bill",
  },
  {
    id: 5,
    title: "SHOOTS &",
    subtitle: "CINEMATICS",
    desc: "People buy with their eyes first. If your visuals don't slay, you don't get the chance.",
    btnText: "First Shoot at ₹999",
  },
  {
    id: 6,
    title: "BRANDING &",
    subtitle: "GRAPHICS",
    desc: "A business without a brand is just another option; easily ignored and easily replaced.",
    btnText: "Full Branding Kit",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-16 mb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <h1 className="text-6xl md:text-8xl font-black font-heading leading-none">
            <span className="text-white uppercase">OUR </span>
            <span className="text-[#FF6A00] uppercase">SERVICES</span>
          </h1>
          <p className="max-w-xl text-white/60 text-sm md:text-base leading-relaxed">
            Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee work...
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-[30px] overflow-hidden mb-20 border border-white/5">
          <Image
            src="https://images.unsplash.com/photo-1522071823991-b19c06511a47?q=80&w=2070&auto=format&fit=crop"
            alt="Adlyngo Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Specialization Quote */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight font-heading uppercase">
            We don't chase generic briefs. We specialise in <span className="text-white/40 italic">Real Estate, Interior Design</span>
          </h2>
        </div>

        {/* Core Process Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-32 border border-white/10 rounded-2xl overflow-hidden">
          {[
            { icon: Users, label: "Discussion" },
            { icon: Lightbulb, label: "Strategy" },
            { icon: PenTool, label: "Execute" },
            { icon: Rocket, label: "Launch" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-10 md:py-16 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors group">
              <item.icon size={48} className="text-white mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <span className="text-white/60 text-xs uppercase tracking-[0.2em] font-bold">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Six Ways Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white font-heading uppercase leading-none">
            SIX WAYS WE GROW YOUR BUSINESS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {growthWays.map((way) => (
            <motion.div
              key={way.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 bg-[#121212] rounded-[30px] border border-white/5 overflow-hidden group min-h-[380px] flex flex-col"
            >
              {/* Background Number */}
              <div className="absolute top-0 right-0 text-[180px] font-black text-white/[0.03] leading-none select-none pointer-events-none -translate-y-1/4 translate-x-1/4">
                {way.id}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-black font-heading leading-tight mb-1 uppercase">
                  <span className="text-white block">{way.title}</span>
                  <span className="text-[#FF6A00] block">{way.subtitle}</span>
                </h3>
                <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8 mt-6 max-w-[240px]">
                  {way.desc}
                </p>
                <div className="mt-auto pt-6">
                  <button className="px-6 py-2.5 bg-black border border-white/10 rounded-lg text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    {way.btnText}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted By Section */}
        <div className="bg-[#121212] rounded-[30px] p-10 md:p-16 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold text-white font-heading uppercase">Trusted by Brands</h3>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-white">4.89</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#FF6A00] text-[#FF6A00]" />
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-md text-white/40 text-sm leading-relaxed text-center md:text-left">
            Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee work...
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 overflow-hidden border border-white/20">
              <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop" width={64} height={64} alt="Founder" />
            </div>
            <p className="text-white font-bold text-xs">Ravi Verma</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">CEO, Adlyngo</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
