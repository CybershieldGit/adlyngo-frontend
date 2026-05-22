"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Lightbulb, PenTool, Rocket, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer";

const growthWays = [
  {
    id: 1,
    title: "WEBSITE & APP",
    subtitle: "DEVELOPMENT",
    quote: "Your business exists offline. Your competition exists online and that's why they're winning.",
    desc: "High converting, mobile first websites built to turn visitors into buyers.",
    btnText: "First Video at ₹999",
  },
  {
    id: 2,
    title: "UGC & CREATIVE",
    subtitle: "ADS",
    quote: "Your product is good. Your ads just haven't proved it yet.",
    desc: "Scroll-stopping UGC and creative ads that generate massive revenue. Real people, real results.",
    btnText: "First Video at ₹999",
  },
  {
    id: 3,
    title: "SOCIAL MEDIA",
    subtitle: "MANAGEMENT",
    quote: "Posting consistently but still not growing? The problem isn't your strategy.",
    desc: "We manage your social presence to build community and drive consistent sales through organic growth.",
    btnText: "No Results = No Charges",
  },
  {
    id: 4,
    title: "LEAD",
    subtitle: "GENERATION",
    quote: "More enquiries won't grow your business. Better ones will.",
    desc: "High-intent lead generation campaigns that fill your pipeline with ready-to-buy customers.",
    btnText: "Guaranteed or No Bill",
  },
  {
    id: 5,
    title: "SHOOTS &",
    subtitle: "CINEMATICS",
    quote: "People buy with their eyes first. If your visuals don't stop them nothing else gets the chance.",
    desc: "Premium production quality that positions your brand as a market leader through cinematic excellence.",
    btnText: "First Shoot at ₹999",
  },
  {
    id: 6,
    title: "BRANDING &",
    subtitle: "GRAPHICS",
    quote: "A business without a brand is just another option; easily ignored and easily replaced.",
    desc: "Complete brand identity systems that make you unforgettable in a crowded marketplace.",
    btnText: "Full Branding Kit",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Ravi Verma",
    role: "CEO, Perpilly Inc.",
    quote: "Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative so every rupee work...",
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

export default function ServicesPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 overflow-x-hidden relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px] z-0" />

      {/* Top Page Watermark */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-40">
        <h2 className="text-[25vw] font-black font-heading leading-none text-white opacity-[0.04] whitespace-nowrap uppercase text-center">
          SERVICES
        </h2>
      </div>

      {/* Bottom Page Watermark - Lifted above footer */}
      <div className="absolute bottom-0 left-0 w-full h-screen flex items-end justify-center pointer-events-none select-none z-0 overflow-hidden pb-[450px]">
        <h2 className="text-[25vw] font-black font-heading leading-none text-white opacity-[0.04] whitespace-nowrap uppercase text-center tracking-tighter">
          WEBSITE
        </h2>
      </div>

      <div className="w-full mx-auto px-6 md:px-16 lg:px-[70px] relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12 relative z-10">
          <h1 className="text-6xl md:text-8xl font-black font-heading leading-none">
            <span className="text-white uppercase">OUR </span>
            <span className="text-[#FF6A00] uppercase">SERVICES</span>
          </h1>
          <p className="max-w-xl text-white/60 text-sm md:text-base leading-relaxed">
            Adlyngo is a creative growth agency helping modern brands scale through strategy, content, and performance marketing. We combine creative storytelling with data-driven execution to turn attention into real business growth
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-[30px] overflow-hidden mb-20 border border-white/5 z-10">
          <img
            src="https://media.istockphoto.com/id/810529310/photo/presenting-some-of-her-top-ideas-to-the-team.jpg?s=1024x1024&w=is&k=20&c=MHAx18YkmJdxlLCv_koz8zECp6Xxbaj0LvJbhkw9tJU="
            alt="Adlyngo Team"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Value Proposition Section */}
        <div className="text-center mb-24 relative z-10 max-w-5xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-white text-3xl md:text-[48px] font-normal font-albert normal-case leading-[1.1] tracking-tight" style={{ textTransform: "none" }}>
              Creative. Strategy. Execution.
            </h2>
            <h2 className="text-[#FF6A00] text-3xl md:text-[48px] font-normal font-albert normal-case leading-[1.1] tracking-tight" style={{ textTransform: "none", marginTop: "12px" }}>
              Built To Deliver Results.
            </h2>
          </div>
          <p className="text-white text-sm md:text-[16px] md:leading-[24px] font-normal font-albert max-w-3xl mx-auto opacity-80">
            Adlyngo helps modern brands grow through a structured creative process focused on strategy, execution, and measurable results. From understanding your business goals to launching high-performing campaigns, every step is built to create impactful digital experiences that drive real growth.
          </p>
        </div>

        {/* Core Process Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-32 border border-white/10 rounded-2xl overflow-hidden relative z-10">
          {[
            { icon: Users, label: "Discussion" },
            { icon: Lightbulb, label: "Strategy" },
            { icon: PenTool, label: "Execute" },
            { icon: Rocket, label: "Launch" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-10 md:py-16 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors group">
              <item.icon size={32} className="md:size-[48px] text-white mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Six Ways Section */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-white text-4xl md:text-[72px] font-normal break-words font-heading leading-none">
            SIX WAYS WE GROW YOUR BUSINESS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 relative z-10">
          {growthWays.map((way) => (
            <motion.div
              key={way.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-10 bg-[#2A2A2A] rounded-[40px] border border-white/10 overflow-hidden group min-h-[550px] flex flex-col"
            >
              <div className="absolute top-0 right-4 text-[220px] font-black text-white/[0.04] leading-[0.8] select-none pointer-events-none font-heading translate-y-[-10%]">
                {way.id}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mt-4 mb-6">
                  <h3 className="text-[42px] md:text-[52px] font-normal font-heading leading-[0.85] uppercase tracking-tight">
                    <span className="text-white block">{way.title}</span>
                    <span className="text-[#FF6A00] block mt-1">{way.subtitle}</span>
                  </h3>
                </div>

                <div className="mb-6 p-6 bg-[#3D342F]/80 border border-white/10 rounded-[20px] backdrop-blur-sm shadow-xl">
                  <p className="text-white text-base md:text-lg font-normal leading-relaxed text-center italic">
                    "{way.quote}"
                  </p>
                </div>

                <p className="text-white/70 text-[15px] font-normal leading-relaxed mb-8 font-albert md:max-w-[280px]">
                  {way.desc}
                </p>

                <div className="mt-auto">
                  <button className="px-6 py-3 bg-[#121212] border border-white/10 rounded-[10px] text-white text-sm font-medium tracking-tight hover:bg-white hover:text-black transition-all uppercase">
                    {way.btnText}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted By Section with Glassmorphism */}
        <div className="relative mb-32 z-10">
          <div className="relative z-10 bg-white/[0.03] backdrop-blur-2xl rounded-[40px] p-10 md:p-16 border border-white/10 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-12 shadow-2xl">
            <div className="flex flex-col justify-between gap-6">
              <h3 className="text-4xl md:text-5xl font-normal text-white font-heading uppercase leading-none">Trusted by <br /> Brands</h3>
              <div className="flex items-center gap-4">
                <span className="text-7xl font-black text-white font-heading">4.89</span>
                <div className="flex items-center bg-white p-2 px-4 rounded-full gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#FF6A00] text-[#FF6A00]" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-xl flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 flex flex-col justify-between gap-8"
                >
                  <p className="text-white/60 text-lg leading-relaxed mb-0 font-albert -mt-1.5">
                    {testimonials[currentTestimonial].quote}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 bg-white/5">
                      <img src={testimonials[currentTestimonial].image} className="w-full h-full object-cover" alt={testimonials[currentTestimonial].name} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-none mb-1">{testimonials[currentTestimonial].name}</p>
                      <p className="text-white/40 text-xs uppercase tracking-widest font-medium">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots Indicator */}
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? "bg-[#FF6A00] w-4" : "bg-white/20"}`}
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
