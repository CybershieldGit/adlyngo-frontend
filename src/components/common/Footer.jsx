"use client";

import NextLink from "next/link";
import { Star } from "lucide-react";

// Custom SVG Icons to avoid Lucide version issues
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 bg-black px-6 md:px-16 lg:px-[70px] relative z-10 overflow-hidden">
      <div className="w-full mx-auto">
        {/* Top Row: Logo & Socials */}
        <div className="flex flex-row justify-between items-center mb-8">
          <img src="/logo.svg" alt="Adlyngo" className="h-8 md:h-10 w-auto" />
          <div className="flex gap-4">
            {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
              <div key={i} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer">
                <Icon />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-10" />

        {/* Middle Row: Content & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-4xl md:text-5xl font-normal text-white font-heading leading-[1.1] uppercase max-w-2xl">
              Let's make something great work together.
            </h3>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="space-y-1.5">
                <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Send message</p>
                <p className="text-white text-lg font-bold">hello@adlyngo.com</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Say Hello!!</p>
                <p className="text-white text-lg font-bold">+91 9595 333 111</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-16">
            <div className="space-y-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Company</p>
              <ul className="space-y-3 text-white/40 text-[13px] font-normal">
                <li><NextLink href="/work" className="hover:text-white transition-colors">Portfolio</NextLink></li>
                <li><NextLink href="/services" className="hover:text-white transition-colors">Services</NextLink></li>
                <li><NextLink href="/careers" className="hover:text-white transition-colors">Career</NextLink></li>
                <li><NextLink href="/contact" className="hover:text-white transition-colors">Contact</NextLink></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Quicklinks</p>
              <ul className="space-y-3 text-white/40 text-[13px] font-normal">
                <li><NextLink href="/" className="hover:text-white transition-colors">Video Gallery</NextLink></li>
                <li><NextLink href="/creative-gallery" className="hover:text-white transition-colors">Creative Gallery</NextLink></li>
                <li><NextLink href="/work" className="hover:text-white transition-colors">Case Studies</NextLink></li>
                <li><NextLink href="/testimonials" className="hover:text-white transition-colors">Testimonials</NextLink></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8" />

        {/* Newsletter Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <p className="text-white text-xl font-normal whitespace-nowrap uppercase tracking-tight">Sign up for the newsletter</p>
          <div className="flex-1 max-w-lg relative">
            <input 
              type="email" 
              placeholder="email" 
              className="w-full bg-transparent border-b border-white/20 py-1.5 text-white text-xl outline-none focus:border-white transition-colors placeholder:text-white/20 font-albert" 
            />
          </div>
          <button className="px-8 py-3 bg-[#1A1A1A] text-white rounded-xl text-base font-normal hover:bg-white hover:text-black transition-all uppercase tracking-widest font-bold">
            Submit
          </button>
        </div>

        {/* Bottom Row: Exact Image Match */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 pt-8 border-t border-white/5">
          <p className="text-white/40 text-[12px] font-normal">
            © 2026 All rights reserved to Adlyngo. A unit of Cybershield Tecnologies Private Limited.
          </p>
          
          <div className="hidden md:block text-white/20 opacity-30">|</div>
          
          <NextLink href="#" className="text-white/40 text-[12px] hover:text-white transition-colors">Privacy Policy</NextLink>
          
          <div className="hidden md:block text-white/20 opacity-30">|</div>
          
          <NextLink href="#" className="text-white/40 text-[12px] hover:text-white transition-colors">Terms & Conditions</NextLink>
          
          <div className="hidden md:block text-white/20 opacity-30">|</div>

          <div className="flex items-center ml-auto">
             <img src="/cybershield.svg" alt="Cybershield" className="h-5 w-auto [filter:brightness(0)_invert(1)]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
