"use client";

import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { useState } from "react";

// Custom Brand Icons for consistency
const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

export default function ContactPage() {
  const [focused, setFocused] = useState("");

  return (
    <div className="pt-32 bg-black min-h-screen">
      <div className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Contact Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-brand uppercase tracking-[0.4em] text-[10px] font-bold mb-8 block underline underline-offset-8">Inquiries</span>
              <h1 className="text-6xl md:text-[9rem] font-heading text-white leading-[0.8] mb-12">
                LET'S <br /> <span className="italic text-muted/20">TALK</span>.
              </h1>
              
              <p className="text-muted/40 text-lg uppercase tracking-widest leading-loose max-w-sm mb-20">
                Whether you have a fully formed vision or just the seed of an idea, we're ready to help you speak.
              </p>

              <div className="space-y-12">
                <div>
                  <h4 className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-4 opacity-40">Direct Contact</h4>
                  <a href="mailto:hello@adlyngo.com" className="text-2xl md:text-4xl font-heading text-white hover:text-brand transition-colors">HELLO@ADLYNGO.COM</a>
                </div>
                <div>
                  <h4 className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-4 opacity-40">Studio Location</h4>
                  <p className="text-2xl md:text-4xl font-heading text-white uppercase">123 Creative Blvd <br /> Manhattan, NY 10013</p>
                </div>
                <div className="pt-12 border-t border-white/5 flex gap-8">
                  <a href="#" className="text-muted hover:text-brand transition-colors"><InstagramIcon /></a>
                  <a href="#" className="text-muted hover:text-brand transition-colors"><LinkedinIcon /></a>
                  <a href="#" className="text-muted hover:text-brand transition-colors"><TwitterIcon /></a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-surface/50 backdrop-blur-xl p-8 md:p-16 border border-white/5 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full" />

              <form className="space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <label className={cn(
                      "absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] text-[10px] font-bold",
                      focused === "name" ? "-top-6 text-brand" : "top-4 text-muted/40"
                    )}>Your Name</label>
                    <input
                      type="text"
                      onFocus={() => setFocused("name")}
                      onBlur={(e) => !e.target.value && setFocused("")}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand transition-all outline-none text-xl"
                    />
                  </div>
                  <div className="relative group">
                    <label className={cn(
                      "absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] text-[10px] font-bold",
                      focused === "email" ? "-top-6 text-brand" : "top-4 text-muted/40"
                    )}>Email Address</label>
                    <input
                      type="email"
                      onFocus={() => setFocused("email")}
                      onBlur={(e) => !e.target.value && setFocused("")}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand transition-all outline-none text-xl"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block uppercase tracking-[0.2em] text-[10px] font-bold text-muted/40 mb-4">What service do you need?</label>
                  <select className="w-full bg-black/40 border border-white/10 p-5 text-white focus:border-brand transition-all outline-none appearance-none cursor-pointer uppercase tracking-widest text-xs">
                    <option className="bg-dark">Brand Strategy & Identity</option>
                    <option className="bg-dark">High-End Production</option>
                    <option className="bg-dark">Motion Graphics & VFX</option>
                    <option className="bg-dark">Social Media Retainers</option>
                  </select>
                </div>

                <div className="relative group">
                  <label className={cn(
                    "absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] text-[10px] font-bold",
                    focused === "message" ? "-top-6 text-brand" : "top-4 text-muted/40"
                  )}>Tell us about your goals</label>
                  <textarea
                    rows={4}
                    onFocus={() => setFocused("message")}
                    onBlur={(e) => !e.target.value && setFocused("")}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand transition-all outline-none text-xl resize-none"
                  ></textarea>
                </div>
                
                <button className="group relative w-full py-8 bg-brand text-white font-bold uppercase tracking-[0.5em] text-xs flex items-center justify-center gap-6 overflow-hidden transition-all hover:tracking-[0.7em]">
                  <span className="relative z-10 flex items-center gap-4">
                    Send Inquiry <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
                </button>
              </form>
            </motion.div>

            {/* Calendly Mini-Section */}
            <div className="mt-12 p-8 border border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                 <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-2">Prefer a direct call?</h4>
                 <p className="text-muted/40 text-xs uppercase tracking-widest">Schedule a 15-minute discovery session with our lead strategist.</p>
               </div>
               <button className="flex items-center gap-2 text-brand font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                 Book Session <ArrowRight size={14} />
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
