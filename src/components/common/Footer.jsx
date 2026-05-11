"use client";

import NextLink from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

// Custom SVG Icons to avoid Lucide version issues
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t border-white/5 bg-[#0A0A0A] px-6 md:px-16">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          <div className="max-w-sm space-y-8">
            <Image src="/logo.svg" alt="Adlyngo" width={150} height={40} className="mb-8" />
            <h3 className="text-3xl font-bold text-white font-heading leading-tight uppercase">
              Let's make something great work together.
            </h3>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Send message</p>
                <p className="text-white text-sm">hello@adlyngo.com</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Say Hello!</p>
                <p className="text-white text-sm">+91 9595 333 111</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
            <div className="space-y-6">
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Company</p>
              <ul className="space-y-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                <li><NextLink href="/work" className="hover:text-white transition-colors">Portfolio</NextLink></li>
                <li><NextLink href="/services" className="hover:text-white transition-colors">Services</NextLink></li>
                <li><NextLink href="/careers" className="hover:text-white transition-colors">Career</NextLink></li>
                <li><NextLink href="/contact" className="hover:text-white transition-colors">Contact</NextLink></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Quicklinks</p>
              <ul className="space-y-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                <li><NextLink href="/video-gallery" className="hover:text-white transition-colors">Video Gallery</NextLink></li>
                <li><NextLink href="/creative-gallery" className="hover:text-white transition-colors">Creative Gallery</NextLink></li>
                <li><NextLink href="/case-studies" className="hover:text-white transition-colors">Case Studies</NextLink></li>
                <li><NextLink href="/testimonials" className="hover:text-white transition-colors">Testimonials</NextLink></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end gap-10">
            <div className="flex gap-4">
              {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer">
                  <Icon />
                </div>
              ))}
            </div>
            <div className="w-full max-w-sm">
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-4">Sign up for the newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#FF6A00] transition-colors" />
                <button className="px-6 py-3 bg-[#1A120B] border border-white/20 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            © 2026 All rights reserved to Adlyngo. A unit of Cybershield Technologies Private Limited.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
              <p className="text-white/20 text-[10px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Privacy Policy</p>
              <div className="w-[1px] h-3 bg-white/10" />
              <p className="text-white/20 text-[10px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Terms & Conditions</p>
              <div className="w-[1px] h-3 bg-white/10" />
            </div>
            
            <div className="flex items-center gap-2 grayscale opacity-30 brightness-200">
              <div className="w-4 h-4 bg-white rounded-sm" /> 
              <span className="text-white text-[10px] font-bold tracking-tighter uppercase">Cybershield</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
