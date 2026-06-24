"use client";

import NextLink from "next/link";
import Image from "next/image";
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
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293l13.314 17.411z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-black pt-16 pb-8">
      <div className="site-container w-full">
        {/* Top Row: Logo & Socials */}
        <div className="flex flex-row justify-between items-center mb-8">
          <img src="/logo.svg" alt="Adlyngo" className="h-8 md:h-10 w-auto" />
          <div className="flex gap-4">
            {[
              { Icon: FacebookIcon, href: "https://www.facebook.com/people/Adlyngo/61563700187972/" },
              { Icon: InstagramIcon, href: "https://www.instagram.com/adlyngo" },
              { Icon: TwitterIcon, href: "#" }
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-10" />

        {/* Middle Row: Content & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-4xl md:text-5xl font-normal text-white font-heading leading-[1.1] uppercase max-w-2xl">
              Let&apos;s make something great work together.
            </h3>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="space-y-1.5">
                <p className="text-white/40 text-[12px] uppercase tracking-widest ">Send message</p>
                <p className="text-white text-lg font-bold">hello@adlyngo.com</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/40 text-[12px] uppercase tracking-widest ">Say Hello!!</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-white text-lg font-bold font-albert">
                    +91 9891 656 535
                  </span>
                  <a
                    href="https://wa.me/919891656535"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white hover:bg-[#FF6A00] hover:border-[#FF6A00] hover:scale-105 transition-all shadow-md w-fit"
                    title="Chat with us on WhatsApp"
                  >
                    <Image
                      src="/images/whatsapp.png"
                      alt="WhatsApp Logo"
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 object-contain"
                    />
                    <span className="text-[11px] font-bold uppercase tracking-wider font-albert">Chat With Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-16">
            <div className="space-y-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Company</p>
              <ul className="space-y-3 text-white/40 text-[13px] font-normal">
                <li><NextLink href="/home" className="hover:text-white transition-colors">Home</NextLink></li>
                <li><NextLink href="/creative-gallery" className="hover:text-white transition-colors">Portfolio</NextLink></li>
                <li><NextLink href="/services" className="hover:text-white transition-colors">Services</NextLink></li>
                <li><NextLink href="/contact" className="hover:text-white transition-colors">Contact</NextLink></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Quicklinks</p>
              <ul className="space-y-3 text-white/40 text-[13px] font-normal">
                <li><NextLink href="/video-gallery" className="hover:text-white transition-colors">Video Gallery</NextLink></li>
                <li><NextLink href="/creative-gallery" className="hover:text-white transition-colors">Creative Gallery</NextLink></li>
                <li><NextLink href="/case-studies" className="hover:text-white transition-colors">Case Studies</NextLink></li>
                <li><NextLink href="/testimonials" className="hover:text-white transition-colors">Testimonials</NextLink></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8" />

        {/* Newsletter Row */}
        {/* <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <p className="text-white text-xl font-normal whitespace-nowrap uppercase tracking-tight">Sign up for the newsletter</p>
          <div className="flex flex-row items-center gap-4 w-full lg:flex-1 lg:max-w-lg">
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="email"
                className="w-full bg-transparent border-b border-white/20 py-1.5 text-white text-xl outline-none focus:border-white transition-colors placeholder:text-white/20 font-albert"
              />
            </div>
            <button className="px-6 md:px-8 py-3 bg-[#1A1A1A] text-white rounded-xl text-sm md:text-base font-normal hover:bg-white hover:text-black transition-all uppercase tracking-widest font-bold whitespace-nowrap">
              Submit
            </button>
          </div>
        </div> */}

        {/* Bottom Row: Exact Image Match */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-white/40 text-[10px] md:text-[12px] font-normal text-center md:text-left">
              © 2026 All rights reserved to Adlyngo. <br className="md:hidden" /> A unit of Cybershield Tecnologies Private Limited.
            </p>

            <div className="flex items-center gap-6">
              <NextLink href="/privacy-policy" className="text-white/40 text-[10px] md:text-[12px] hover:text-white transition-colors">Privacy Policy</NextLink>
              <div className="w-[1px] h-3 bg-white/10" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/20 text-[10px] uppercase tracking-widest font-bold">Powered by</span>
            <img src="/cybershield.svg" alt="Cybershield" className="h-4 md:h-5 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
}
