"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Video Gallery", href: "/" },
  { name: "Creative Gallery", href: "/creative-gallery" },
  { name: "Case Studies", href: "/case-studies" },
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isOpen, lenis]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[999] transition-all duration-500",
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-[#0A0A0A]"
      )}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />

      <nav className="w-full mx-auto flex items-center justify-between px-6 md:px-16 lg:px-[70px] py-4 relative">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.svg" 
              alt="Adlyngo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>
          
          <div className="hidden lg:block w-[1px] h-10 bg-white/10 mx-2" />

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

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex items-center gap-4">
            <SocialIcon><FacebookIcon /></SocialIcon>
            <SocialIcon><InstagramIcon /></SocialIcon>
            <SocialIcon><TwitterIcon /></SocialIcon>
          </div>

          <Link 
            href="/contact"
            className="hidden md:block px-8 py-2 bg-[#1A120B] border border-white/20 rounded-md text-white text-[14px] font-medium font-albert leading-[24px] tracking-[0.21px] hover:bg-[#2A1D12] transition-all duration-300"
          >
            Let's Connect
          </Link>

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

      <div className="w-full h-[1.5px] bg-[#FF4D00]" />

    </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#0A0A0A] z-[1000] flex flex-col p-6 md:p-10 lg:px-20 lg:pt-20 lg:pb-12 overflow-y-auto"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform z-[210]"
            >
              <X size={20} />
            </button>

            <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-20 w-full mx-auto">
              <div className="flex-1">
                  <motion.h2 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-[8vw] font-black font-heading leading-[0.9] text-white uppercase"
                >
                  We don't run <br /> ads. We make <br /> them <span className="text-[#FF6A00]">Speak.</span>
                </motion.h2>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-full max-w-md bg-[#1A1A1A] rounded-[40px] p-8 md:p-12 border border-white/5 relative"
              >
                <div className="absolute inset-0 rounded-[40px] shadow-[0_0_50px_rgba(255,255,255,0.02)] pointer-events-none" />
                
                <nav className="flex flex-col gap-4 md:gap-6 relative z-10">
                    {[
                      { 
                        name: "Portfolio", 
                        href: "/", 
                        isActive: ["/case-studies", "/", "/creative-gallery", "/testimonials"].includes(pathname),
                        subLinks: [
                          { name: "Creative Gallery", href: "/creative-gallery" },
                          { name: "Case Studies", href: "/case-studies" },
                          { name: "Testimonials", href: "/testimonials" },
                        ]
                      },
                      { name: "About", href: "/about", isActive: pathname === "/about" },
                      { name: "Services", href: "/services", isActive: pathname === "/services" },
                      { name: "Contact", href: "/contact", isActive: pathname === "/contact" },
                    ].map((link, i) => (
                      <div key={link.name} className="flex flex-col">
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group flex items-center w-full text-3xl md:text-4xl font-bold font-heading uppercase tracking-tight transition-all duration-500 ease-expo",
                            link.isActive ? "text-[#FF6A00]" : "text-white hover:text-[#FF6A00]"
                          )}
                        >
                          <div className={cn(
                            "transition-all duration-500 ease-expo", 
                            link.isActive ? "flex-1" : "w-0 group-hover:flex-1"
                          )} />
                          <span className="relative">
                            {link.name}
                          </span>
                        </Link>
                        
                        {/* Mobile Only Sub-links for Portfolio */}
                        {link.name === "Portfolio" && link.subLinks && (
                          <div className="flex flex-col gap-3 mt-4 ml-4 md:hidden">
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "text-lg font-heading uppercase tracking-widest transition-colors",
                                  pathname === sub.href ? "text-[#FF6A00]" : "text-white/50 hover:text-white"
                                )}
                              >
                                — {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                        
                        {i < 3 && <div className="h-[1px] w-full bg-white/5 mt-4" />}
                      </div>
                    ))}
                </nav>
              </motion.div>
            </div>

            {/* Anchored Bottom Footer */}
            <div className="mt-auto w-full mx-auto pt-12">
              <div className="h-[1px] w-full bg-white/10 mb-8" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <img src="/logo.svg" alt="Adlyngo" className="h-8 w-auto object-contain" />
                
                <div className="flex flex-col md:flex-row items-center gap-4 text-white/60 text-sm font-medium tracking-wide">
                  <span>Let's Build something great together</span>
                  <div className="hidden md:block w-[1px] h-4 bg-white/20" />
                  <a href="mailto:hello@adlyngo.com" className="text-white underline underline-offset-4 hover:text-[#FF6A00] transition-colors">
                    hello@adlyngo.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
