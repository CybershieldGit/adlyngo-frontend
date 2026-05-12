"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Ravi Verma",
    role: "CEO, Perpilly Inc.",
    quote: "Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee works harder.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Marketing Director, LuxeStay",
    quote: "The quality of UGC ads produced by Adlyngo is unmatched. Our conversion rates jumped by 40% within the first month of launching the campaign.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Founder, Urban Edge",
    quote: "Their team doesn't just deliver creative; they deliver results. The strategic approach to our social media growth has been a game-changer for our brand.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
];

export default function ContactPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 pb-8 overflow-x-hidden relative flex flex-col justify-center">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px] z-0" />

      {/* Top Page Watermark */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-40">
        <h2 className="text-[25vw] font-black font-heading leading-none text-white opacity-[0.04] whitespace-nowrap uppercase text-center">
          CONTACT
        </h2>
      </div>

      {/* Bottom Page Watermark - Lifted above footer */}
      <div className="absolute bottom-0 left-0 w-full h-screen flex items-end justify-center pointer-events-none select-none z-0 overflow-hidden pb-[400px]">
        <h2 className="text-[25vw] font-black font-heading leading-none text-white opacity-[0.04] whitespace-nowrap uppercase text-center tracking-tighter">
          WEBSITE
        </h2>
      </div>

      <div className="max-w-[1800px] mx-auto px-[70px] relative z-10 w-full">
        {/* Header Section - Ultra Compact */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black font-heading leading-[0.9]">
            <span className="text-white uppercase">LETS GET IN </span>
            <span className="text-[#FF6A00] uppercase">TOUCH</span>
          </h1>
          <p className="max-w-md text-white/40 text-[9px] md:text-[10px] leading-relaxed text-right md:text-left uppercase tracking-widest font-bold">
            Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative.
          </p>
        </div>

        {/* Main Contact Card - Extreme Height Optimization */}
        <div className="bg-[#121212] rounded-[40px] p-6 md:p-10 border border-white/5 mb-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Info & Map */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col gap-[20px] font-albert">
                {/* Have Questions? */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#8C8C8C] text-[13px] font-normal">Have Questions?</div>
                  <div className="text-white text-base font-bold">hello@adlyngo.com</div>
                </div>
                
                {/* Divider */}
                <div className="w-full max-w-[280px] h-[0px] border-t border-[#888888] opacity-20"></div>

                {/* Say Hello!! */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#8C8C8C] text-[13px] font-normal">Say Hello!!</div>
                  <div className="text-white text-base font-bold">+91 9595 333 111</div>
                </div>

                {/* Divider */}
                <div className="w-full max-w-[280px] h-[0px] border-t border-[#888888] opacity-20"></div>

                {/* Located at */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#8C8C8C] text-[13px] font-normal">Located at</div>
                  <div className="text-white text-[15px] font-bold max-w-sm leading-tight">
                    T3, B1603, NXOne, Tech zone 4, Opposite Gaur city mall, UP, 201306
                  </div>
                </div>
              </div>

              {/* Map Image - Even Smaller */}
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/5 grayscale invert opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                  alt="Map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Form - Minimized Spacing */}
            <div className="lg:col-span-7">
              <form className="space-y-6">
                <div className="space-y-1.5 border-b border-white/10 pb-2.5 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[12px] uppercase tracking-widest font-bold">I am</p>
                  <input type="text" placeholder="name" className="w-full bg-transparent text-white text-base outline-none placeholder:text-white/10 font-albert" />
                </div>
                <div className="space-y-1.5 border-b border-white/10 pb-2.5 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[12px] uppercase tracking-widest font-bold">Here is my email</p>
                  <input type="email" placeholder="abc@abc.com" className="w-full bg-transparent text-white text-base outline-none placeholder:text-white/10 font-albert" />
                </div>
                <div className="space-y-1.5 border-b border-white/10 pb-2.5 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[12px] uppercase tracking-widest font-bold">I need</p>
                  <select className="w-full bg-transparent text-white text-base outline-none appearance-none cursor-pointer uppercase font-bold text-white/20 font-albert">
                    <option className="bg-black">Select Service</option>
                    <option className="bg-black">Website Development</option>
                    <option className="bg-black">UGC Ads</option>
                    <option className="bg-black">Social Media Management</option>
                  </select>
                </div>
                <div className="space-y-1.5 border-b border-white/10 pb-2.5 group focus-within:border-[#FF6A00] transition-colors">
                  <p className="text-white/40 text-[12px] uppercase tracking-widest font-bold">Message</p>
                  <textarea placeholder="Write your message..." rows={1} className="w-full bg-transparent text-white text-base outline-none placeholder:text-white/10 resize-none font-albert" />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 pt-2">
                  <button className="px-8 py-3.5 bg-[#FF6A00] text-white font-bold uppercase tracking-widest text-[9px] rounded-lg hover:bg-white hover:text-[#FF6A00] transition-all">
                    Send Message
                  </button>
                  <p className="text-white/20 text-[8px] leading-relaxed max-w-[180px] italic">
                    We are committed to protecting your privacy.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Trusted By Section - Ultra Compact */}
        <div className="relative mb-12 z-10">
          <div className="relative z-10 bg-white/[0.03] backdrop-blur-2xl rounded-[30px] p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl md:text-3xl font-normal text-white font-heading uppercase leading-none">Trusted by <br /> Brands</h3>
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black text-white font-heading">4.89</span>
                <div className="flex items-center bg-white p-1 px-2.5 rounded-full gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#FF6A00] text-[#FF6A00]" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 max-w-xl min-h-[140px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-white/60 text-sm leading-relaxed mb-4 font-albert italic">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 bg-white/5">
                      <img src={testimonials[currentTestimonial].image} className="w-full h-full object-cover" alt={testimonials[currentTestimonial].name} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-none mb-0.5">{testimonials[currentTestimonial].name}</p>
                      <p className="text-white/40 text-[8px] uppercase tracking-widest font-medium">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots Indicator */}
              <div className="flex gap-1.5 mt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${i === currentTestimonial ? "bg-[#FF6A00] w-3" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
