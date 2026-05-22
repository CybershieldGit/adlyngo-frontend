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
    <>
      <main className="bg-[#0A0A0A] min-h-screen pt-[160px] md:pt-32 overflow-x-hidden relative flex flex-col">
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

        <div className="w-full mx-auto px-6 md:px-16 relative z-10 flex-grow">
          {/* Header Section - Ultra Compact */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-8 relative z-10">
            <h1 className="text-6xl md:text-8xl font-black font-heading leading-[0.9] text-center md:text-left">
              <span className="text-white uppercase">LETS GET IN </span>
              <span className="text-[#FF6A00] uppercase">TOUCH</span>
            </h1>
            <p className="max-w-md text-white/40 text-[9px] md:text-[16px] leading-relaxed text-center md:text-left  font-bold font-albert">
              Adlyngo is a full-service digital growth agency built for businesses serious about scaling. We combine data-driven performance marketing with premium creative.
            </p>
          </div>

          {/* Main Contact Card - Extreme Height Optimization */}
          <div className="bg-[#121212] rounded-[40px] p-6 md:p-10 border border-white/5 mb-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Info & Map */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex flex-col items-start gap-[20px] font-albert">
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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="text-white text-base font-bold font-albert">
                        +91 9891 656 535
                      </span>
                      <a
                        href="https://wa.me/919891656535"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] hover:scale-105 transition-all shadow-md"
                        title="Chat with us on WhatsApp"
                      >
                        <svg
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45h.007c5.456 0 9.897-4.437 9.902-9.899.002-2.646-1.02-5.133-2.877-6.99C16.549 1.85 14.07 .827 11.995.827 6.539.827 2.1 5.26 2.095 10.722c0 1.625.441 3.212 1.278 4.62l-.993 3.626 3.714-.974zm13.155-7.447c-.266-.134-1.58-.78-1.823-.867-.243-.088-.419-.133-.596.134-.176.265-.685.867-.838 1.042-.154.177-.308.2-.574.067-.266-.134-1.127-.415-2.148-1.327-.79-.705-1.326-1.579-1.482-1.846-.155-.266-.016-.41.118-.543.12-.12.266-.31.4-.464.133-.155.177-.265.266-.442.088-.176.044-.33-.021-.463-.067-.134-.596-1.439-.818-1.97-.216-.52-.45-.45-.618-.458-.16-.008-.344-.01-.528-.01-.184 0-.485.07-.74.354-.254.283-.972.951-.972 2.32 0 1.369.995 2.693 1.137 2.883.141.19 1.958 2.99 4.743 4.195.662.287 1.179.458 1.583.587.665.21 1.27.18 1.748.11.533-.08 1.58-.646 1.802-1.238.22-.593.22-1.102.155-1.209-.066-.107-.243-.176-.51-.31z" />
                        </svg>
                        <span className="text-[11px] font-bold uppercase tracking-wider font-albert">Chat With Us</span>
                      </a>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full max-w-[280px] h-[0px] border-t border-[#888888] opacity-20"></div>

                  {/* Located at */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[#8C8C8C] text-[13px] font-normal">Located at</div>
                    <div className="text-white text-[15px] font-bold max-w-sm leading-tight">
                      T3, B-1603, NX-One, Tech, Amrapali Dream Valley, Zone IV, Amrapali Dream Valley, Greater Noida, Uttar Pradesh 201318
                    </div>
                  </div>
                </div>

                {/* Real Google Map Embed - Default Style */}
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/5 opacity-80 hover:opacity-100 transition-opacity duration-500">
                  <iframe
                    src="https://maps.google.com/maps?q=NX-One,%20Tech,%20Amrapali%20Dream%20Valley,%20B-109,%20Greater%20Noida,%20Uttar%20Pradesh%20201318&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
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
                    <p className="text-white/40 text-[12px] uppercase tracking-widest font-bold">My mobile number</p>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full bg-transparent text-white text-base outline-none placeholder:text-white/10 font-albert" />
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
                    <button className="px-11 py-3.5 bg-[#FF6A00] text-white font-bold uppercase tracking-widest text-[12px] rounded-lg hover:bg-white hover:text-[#FF6A00] transition-all">
                      Send Message
                    </button>
                    <p className="text-white/20 text-[16px] leading-relaxed italic whitespace-nowrap">
                      We are committed to protecting your privacy.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Trusted By Section - Ultra Compact */}
          <div className="relative mb-12 z-10">
            <div className="relative z-10 bg-white/[0.03] backdrop-blur-2xl rounded-[30px] p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 shadow-2xl">
              <div className="flex flex-col justify-between gap-3">
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

              <div className="flex-1 max-w-xl flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col justify-between gap-4"
                  >
                    <p className="text-white/60 text-sm leading-relaxed mb-0 font-albert italic -mt-1">
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
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
      </main>
      <Footer />
    </>
  );
}
