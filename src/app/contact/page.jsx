"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/common/Footer";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-16 mb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-20">
          <h1 className="text-6xl md:text-8xl font-black font-heading leading-none">
            <span className="text-white uppercase">LETS GET IN </span>
            <span className="text-[#FF6A00] uppercase">TOUCH</span>
          </h1>
          <p className="max-w-md text-white/40 text-sm md:text-base leading-relaxed text-right md:text-left self-end">
            Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee works harder.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="bg-[#121212] rounded-[40px] p-8 md:p-16 border border-white/5 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left Column: Info & Map */}
            <div className="lg:col-span-5 flex flex-col gap-12">
              <div className="space-y-10">
                <div>
                  <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-3">Have Questions?</p>
                  <p className="text-white text-lg font-bold">hello@adlyngo.com</p>
                </div>
                <div>
                  <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-3">Say Hello!</p>
                  <p className="text-white text-lg font-bold">+91 9595 333 111</p>
                </div>
                <div>
                  <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-3">Located at</p>
                  <p className="text-white text-sm font-medium leading-relaxed max-w-xs">
                    T3, B1603, NXOne, Tech zone 4, Opposite Gaur city mall, Greater Noida, UP, 201306
                  </p>
                </div>
              </div>

              {/* Map Image */}
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/5 grayscale invert opacity-40">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                  alt="Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <form className="space-y-12">
                <div className="space-y-3 border-b border-white/10 pb-4 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">I am</p>
                  <input type="text" placeholder="name" className="w-full bg-transparent text-white text-xl outline-none placeholder:text-white/10" />
                </div>
                <div className="space-y-3 border-b border-white/10 pb-4 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Here is my email</p>
                  <input type="email" placeholder="abc@abc.com" className="w-full bg-transparent text-white text-xl outline-none placeholder:text-white/10" />
                </div>
                <div className="space-y-3 border-b border-white/10 pb-4 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">I need</p>
                  <select className="w-full bg-transparent text-white text-xl outline-none appearance-none cursor-pointer uppercase font-bold text-white/20">
                    <option className="bg-black">Select Service</option>
                    <option className="bg-black">Website Development</option>
                    <option className="bg-black">UGC Ads</option>
                    <option className="bg-black">Social Media Management</option>
                  </select>
                </div>
                <div className="space-y-3 border-b border-white/10 pb-4 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Message</p>
                  <textarea placeholder="Select Service" rows={1} className="w-full bg-transparent text-white text-xl outline-none placeholder:text-white/10 resize-none" />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 pt-4">
                  <button className="px-12 py-5 bg-[#FF6A00] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white hover:text-[#FF6A00] transition-all">
                    Send Message
                  </button>
                  <p className="text-white/20 text-[10px] leading-relaxed max-w-xs italic">
                    We are committed to protecting your privacy. We will never collect information about you without your explicit consent.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="bg-[#121212] rounded-[40px] p-10 md:p-16 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 mb-32">
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl font-bold text-white font-heading uppercase leading-none">Trusted by Brands</h3>
            <div className="flex items-center gap-6">
              <span className="text-7xl font-black text-white">4.89</span>
              <div className="flex gap-1 bg-white/5 p-2 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#FF6A00] text-[#FF6A00]" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl text-white/40 text-sm leading-relaxed text-center lg:text-left">
            Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee works harder.
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5">
                <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop" width={64} height={64} alt="CEO" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">Ravi Verma</p>
                <p className="text-white/40 text-xs uppercase tracking-widest">CEO, Perpilly Inc.</p>
              </div>
            </div>
            {/* Slider Dots */}
            <div className="flex gap-2 mt-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i === 0 ? "bg-[#FF6A00]" : "bg-white/10")} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
