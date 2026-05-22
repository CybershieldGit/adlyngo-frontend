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
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239H4.293l13.314 17.411z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 bg-black px-6 md:px-10 lg:px-12 relative z-10 overflow-hidden">
      <div className="w-full mx-auto">
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
                <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Send message</p>
                <p className="text-white text-lg font-bold">hello@adlyngo.com</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Say Hello!!</p>
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
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-16">
            <div className="space-y-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Company</p>
              <ul className="space-y-3 text-white/40 text-[13px] font-normal">
                <li><NextLink href="/" className="hover:text-white transition-colors">Portfolio</NextLink></li>
                <li><NextLink href="/services" className="hover:text-white transition-colors">Services</NextLink></li>
                <li><NextLink href="/contact" className="hover:text-white transition-colors">Contact</NextLink></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Quicklinks</p>
              <ul className="space-y-3 text-white/40 text-[13px] font-normal">
                <li><NextLink href="/" className="hover:text-white transition-colors">Video Gallery</NextLink></li>
                <li><NextLink href="/creative-gallery" className="hover:text-white transition-colors">Creative Gallery</NextLink></li>
                <li><NextLink href="/case-studies" className="hover:text-white transition-colors">Case Studies</NextLink></li>
                <li><NextLink href="/testimonials" className="hover:text-white transition-colors">Testimonials</NextLink></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8" />

        {/* Newsletter Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
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
        </div>

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
            <img src="/cybershield.svg" alt="Cybershield" className="h-4 md:h-5 w-auto [filter:brightness(0)_invert(1)] opacity-40 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
}
