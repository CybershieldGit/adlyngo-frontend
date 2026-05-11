"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Video Gallery", href: "/video-gallery" },
  { name: "Creative Gallery", href: "/creative-gallery" },
  { name: "Case Studies", href: "/work" },
  { name: "Testimonials", href: "/testimonials" },
];

const SocialIcon = ({ children, href = "#" }) => (
  <a 
    href={href} 
    className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
  >
    {children}
  </a>
);

// Custom SVG Icons to match the image exactly and avoid dependency issues
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-[#0A0A0A]"
      )}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />

      <nav className="max-w-[1800px] mx-auto flex items-center justify-between px-6 py-4 md:px-12 relative">
        {/* Left: Logo Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo.svg" 
              alt="Adlyngo" 
              width={140} 
              height={40} 
              className="object-contain"
            />
          </Link>
          
          {/* Vertical Separator */}
          <div className="hidden lg:block w-[1px] h-10 bg-white/10 mx-2" />

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative py-2">
                <Link
                  href={link.href}
                  className={cn(
                    "font-albert transition-all duration-300 whitespace-nowrap",
                    ((pathname === link.href) || (pathname === "/" && link.name === "Video Gallery"))
                      ? "text-[16px] font-medium text-white" 
                      : "text-[14px] font-normal text-white/50 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
                {/* Active Indicator Triangle */}
                {((pathname === link.href) || (pathname === "/" && link.name === "Video Gallery")) && (
                  <motion.div 
                    layoutId="nav-triangle"
                    className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-[#FF4D00] z-20" 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <SocialIcon><FacebookIcon /></SocialIcon>
            <SocialIcon><InstagramIcon /></SocialIcon>
            <SocialIcon><TwitterIcon /></SocialIcon>
          </div>

          {/* Let's Connect Button */}
          <Link 
            href="/contact"
            className="hidden md:block px-8 py-2 bg-[#1A120B] border border-white/20 rounded-md text-white text-[14px] font-medium font-albert leading-[24px] tracking-[0.21px] break-words hover:bg-[#2A1D12] transition-all duration-300"
          >
            Let's Connect
          </Link>

          {/* Hamburger Menu */}
          <button
            className="w-[34px] h-[34px] flex flex-col gap-1.5 items-end justify-center group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-[2px] bg-white transition-all group-hover:w-8" />
            <div className="w-8 h-[2px] bg-white transition-all group-hover:w-6" />
            <div className="w-5 h-[2px] bg-white transition-all group-hover:w-8" />
          </button>
        </div>
      </nav>

      {/* Bottom Orange Border */}
      <div className="w-full h-[1.5px] bg-[#FF4D00]" />

      {/* Right Side Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] !bg-black border-l border-white/10 z-[120] flex flex-col p-10 md:p-16"
              style={{ backgroundColor: "#000000", opacity: 1 }}
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="self-end text-white/60 hover:text-white transition-colors mb-20"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-bold text-white hover:text-[#FF4D00] transition-colors uppercase tracking-widest font-heading"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-10">
                <div className="h-[1px] w-full bg-white/10" />
                <div className="flex gap-6">
                  <SocialIcon><FacebookIcon /></SocialIcon>
                  <SocialIcon><InstagramIcon /></SocialIcon>
                  <SocialIcon><TwitterIcon /></SocialIcon>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Get in touch</p>
                  <p className="text-white text-sm font-albert">hello@adlyngo.com</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
