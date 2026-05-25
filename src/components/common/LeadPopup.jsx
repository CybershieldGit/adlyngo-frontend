"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    mobileNumber: "",
    workEmail: "",
    service: "",
    budget: "",
    goals: "",
  });
  const [errors, setErrors] = useState({});
  const timerRef = useRef(null);

  // Trigger Logic
  useEffect(() => {
    // Check if user has already submitted or closed the form
    const hasSubmitted = localStorage.getItem("adlyngo_lead_submitted");
    const hasClosed = sessionStorage.getItem("adlyngo_lead_closed");

    if (hasSubmitted || hasClosed) {
      return;
    }

    const openModal = () => {
      // Re-verify flags before opening
      const checkSubmitted = localStorage.getItem("adlyngo_lead_submitted");
      const checkClosed = sessionStorage.getItem("adlyngo_lead_closed");
      if (!checkSubmitted && !checkClosed) {
        setIsOpen(true);
      }
    };

    // 1. 7-Second Timer trigger
    const hasSeenIntro = sessionStorage.getItem("adlyngo_intro_seen");
    const isHomepage = window.location.pathname === "/";

    if (isHomepage && !hasSeenIntro) {
      // If intro screen is showing, wait for it to close first
      const handleIntroClosed = () => {
        timerRef.current = setTimeout(() => {
          openModal();
        }, 7000);
      };
      window.addEventListener("introClosed", handleIntroClosed);
      
      // Cleanup intro listener
      return () => {
        window.removeEventListener("introClosed", handleIntroClosed);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else {
      // Welcome screen is already dismissed or we are on another page: start timer immediately
      timerRef.current = setTimeout(() => {
        openModal();
      }, 7000);
    }

    // 2. Window Focus/Blur trigger & Mouse Leave (Exit intent / Hop-in)
    let hasBlurred = false;

    const handleBlur = () => {
      hasBlurred = true;
    };

    const handleFocus = () => {
      if (hasBlurred) {
        // User left tab and came back (hop-in / refocus)
        openModal();
      }
    };

    const handleMouseLeave = (e) => {
      // User mouse moves out of window top (exit-intent)
      if (e.clientY < 20) {
        openModal();
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Lock scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("lenis-stopped");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("adlyngo_lead_closed", "true");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid phone number";
    }
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = "Enter a valid email address";
    }
    if (!formData.service) newErrors.service = "Please select a service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Mock API submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      localStorage.setItem("adlyngo_lead_submitted", "true");
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start lg:items-center justify-center p-0 lg:p-10"
        >
          {/* Backdrop Overlay */}
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-[1160px] max-h-[72vh] lg:max-h-none mt-[14vh] lg:mt-0 bg-[#0D0D0D] border border-white/10 rounded-[32px] overflow-y-auto lg:overflow-visible shadow-[0_25px_70px_-15px_rgba(255,106,0,0.15)] z-10 no-scrollbar flex flex-col"
            data-lenis-prevent
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="fixed top-4 right-4 lg:absolute lg:top-6 lg:right-6 text-white/40 hover:text-white hover:bg-white/10 bg-white/5 rounded-full p-2 transition-all z-[60] hover:scale-105"
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            {isSubmitted ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-8 md:p-16 min-h-[450px]"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-[#FF6A00]/20 blur-xl scale-125 animate-pulse" />
                  <CheckCircle2 size={72} className="text-[#FF6A00] relative z-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-heading text-white mb-4 uppercase tracking-wide">
                  Strategy Call Booked!
                </h2>
                <p className="max-w-md text-white/60 font-albert text-sm md:text-base leading-relaxed mb-8">
                  Thank you for reaching out! A growth expert from <span className="text-[#FF6A00] font-semibold">Adlyngo</span> will contact you within 24 hours to schedule your free consultation session.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#FF6A00] hover:bg-[#ff7b1a] text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#FF6A00]/20"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              /* Split Layout Column Grid */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch p-4 sm:p-8 lg:p-10">
                
                {/* Left Column: Branding, Social proof, Benefit Cards */}
                <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-between gap-6 lg:gap-8 pt-2 lg:pt-4">
                  <div className="flex flex-col gap-6">
                    {/* Growth Partner Label */}
                    <div>
                      <span className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] font-albert">
                        Your Growth Partner
                      </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-heading leading-[0.95] text-white uppercase tracking-tight">
                      Let's build what's next for <br />
                      <span className="text-[#FF6A00]">your business</span>
                    </h2>

                    {/* Description */}
                    <p className="text-white/60 font-albert text-sm leading-relaxed max-w-lg">
                      Share your goals and our experts will design a data-driven strategy to accelerate your growth.
                    </p>

                    {/* Features Grid - Flex row / horizontal scroll on mobile, Grid on desktop */}
                    <div className="flex overflow-x-auto gap-3 mt-2 no-scrollbar pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-x-visible sm:pb-0">
                      {[
                        {
                          title: "Custom Strategy",
                          desc: "Tailored roadmap for your business goals.",
                        },
                        {
                          title: "Growth Focused",
                          desc: "Performance-driven marketing that delivers results.",
                        },
                        {
                          title: "Quick Response",
                          desc: "We get back to you within 24 hours, always.",
                        },
                        {
                          title: "Trusted Partner",
                          desc: "Helping startups & businesses scale with confidence.",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-1 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-300 flex-shrink-0 w-[240px] sm:w-auto snap-center"
                        >
                          <span className="text-white font-bold font-albert text-[10px] sm:text-[11px] tracking-wider uppercase">
                            {item.title}
                          </span>
                          <span className="text-white/50 font-albert text-xs leading-normal">
                            {item.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust Badge & Social Proof */}
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center gap-3">
                      {/* Avatars */}
                      <div className="flex -space-x-3">
                        {[
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
                          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
                          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
                        ].map((src, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-[#0D0D0D] overflow-hidden"
                          >
                            <img
                              src={src}
                              alt="Client Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Trust Text */}
                      <div className="text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/90 leading-tight font-albert">
                        60+ <span className="text-white/50">Businesses trust</span>{" "}
                        <span className="text-[#FF6A00]">Adlyngo</span> to grow their brand online
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-white/10" />

                    {/* Contact Elements */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-16">
                      {/* Phone Contact */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FF6A00]">
                          <Phone size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white/40 text-[9px] uppercase tracking-wider font-semibold font-albert">
                            Prefer to talk?
                          </span>
                          <span className="text-white text-xs font-bold font-albert">
                            +91 9891 656 535
                          </span>
                        </div>
                      </div>

                      {/* Email Contact */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FF6A00]">
                          <Mail size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white/40 text-[9px] uppercase tracking-wider font-semibold font-albert">
                            Email us
                          </span>
                          <span className="text-white text-xs font-bold font-albert uppercase">
                            HELLO@ADLYNGO.COM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Form Container */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <div className="relative bg-[#131313] border border-white/5 rounded-2xl md:rounded-[24px] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 overflow-hidden h-full justify-between">
                    
                    {/* Ribbon Diagonal Banner */}
                    <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none">
                      <div className="bg-[#FF6A00] text-white text-[10px] font-bold text-center py-1.5 w-[140px] absolute top-4 -right-8 rotate-45 uppercase tracking-widest shadow-md">
                        Free
                      </div>
                    </div>

                    {/* Form Title Block */}
                    <div className="flex items-center gap-3 pr-8">
                      <div className="w-10 h-10 flex-shrink-0">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
                          <path d="M11.7534 32.3057C12.3783 32.9312 11.9353 34 11.0511 34H0.992701C0.444447 34 0 33.5556 0 33.0073V22.9399C0 22.0553 1.06973 21.6124 1.69496 22.2382L11.7534 32.3057Z" fill="white"/>
                          <path d="M0 0.992697V10.118C0 10.8329 0.732913 11.3134 1.38854 11.0283L22.3754 1.90306C23.3627 1.47376 23.0562 0 21.9795 0H0.992701C0.444447 0 0 0.444446 0 0.992697Z" fill="white"/>
                          <path d="M7.81857 18.0232L16.0907 26.3027C16.5818 26.7942 17.4128 26.6422 17.6981 26.0088L24.4755 10.9629C24.8507 10.1299 23.9965 9.27519 23.1633 9.64981L8.11376 16.4162C7.4802 16.701 7.3276 17.5318 7.81857 18.0232Z" fill="white"/>
                          <path d="M24.0437 33.9996H33.0073C33.5556 33.9996 34 33.5552 34 33.0069V12.425C34 11.3487 32.5269 11.0419 32.0972 12.0287L23.1335 32.6106C22.848 33.2663 23.3285 33.9996 24.0437 33.9996Z" fill="white"/>
                          <path d="M26.1399 1.69464L32.3054 7.86007C32.9307 8.48543 34 8.04253 34 7.15813V0.992697C34 0.444446 33.5556 0 33.0073 0H26.8418C25.9574 0 25.5145 1.06928 26.1399 1.69464Z" fill="url(#paint0_linear_137_1857_popup)"/>
                          <defs>
                            <linearGradient id="paint0_linear_137_1857_popup" x1="29.2226" y1="5.41669" x2="35.6023" y2="2.17189" gradientUnits="userSpaceOnUse">
                              <stop offset="0.132381" stopColor="#FF6A00"/>
                              <stop offset="0.634466" stopColor="#FF8C2B"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-base sm:text-lg md:text-xl font-heading text-white uppercase tracking-wide leading-none">
                          Get Your Free Growth Consultation
                        </h3>
                        <p className="text-white/50 text-[10px] sm:text-[11px] font-albert mt-1 leading-tight">
                          Fill in the details and we&apos;ll schedule a call with our growth expert.
                        </p>
                      </div>
                    </div>

                    {/* Form Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col">
                          <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                            Full Name<span className="text-[#FF6A00] ml-0.5">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className={`w-full bg-white/[0.02] border rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-white text-xs sm:text-sm outline-none placeholder:text-white/20 focus:bg-white/[0.04] transition-all font-albert ${
                              errors.fullName ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-[#FF6A00]/50"
                            }`}
                          />
                          {errors.fullName && (
                            <span className="text-red-500 text-[10px] mt-1 font-albert">
                              {errors.fullName}
                            </span>
                          )}
                        </div>

                        {/* Business Name Input */}
                        <div className="flex flex-col">
                          <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                            Business Name <span className="text-white/30 font-normal lowercase">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            placeholder="Enter your business name"
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-white text-xs sm:text-sm outline-none placeholder:text-white/20 focus:border-[#FF6A00]/50 focus:bg-white/[0.04] transition-all font-albert"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Mobile number */}
                        <div className="flex flex-col">
                          <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                            Mobile Number<span className="text-[#FF6A00] ml-0.5">*</span>
                          </label>
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="+91 0000 000 000"
                            className={`w-full bg-white/[0.02] border rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-white text-xs sm:text-sm outline-none placeholder:text-white/20 focus:bg-white/[0.04] transition-all font-albert ${
                              errors.mobileNumber ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-[#FF6A00]/50"
                            }`}
                          />
                          {errors.mobileNumber && (
                            <span className="text-red-500 text-[10px] mt-1 font-albert">
                              {errors.mobileNumber}
                            </span>
                          )}
                        </div>

                        {/* Work Email */}
                        <div className="flex flex-col">
                          <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                            Work Email<span className="text-[#FF6A00] ml-0.5">*</span>
                          </label>
                          <input
                            type="email"
                            name="workEmail"
                            value={formData.workEmail}
                            onChange={handleInputChange}
                            placeholder="you@company.com"
                            className={`w-full bg-white/[0.02] border rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-white text-xs sm:text-sm outline-none placeholder:text-white/20 focus:bg-white/[0.04] transition-all font-albert ${
                              errors.workEmail ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-[#FF6A00]/50"
                            }`}
                          />
                          {errors.workEmail && (
                            <span className="text-red-500 text-[10px] mt-1 font-albert">
                              {errors.workEmail}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Service select */}
                        <div className="flex flex-col">
                          <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                            Select Service You Need<span className="text-[#FF6A00] ml-0.5">*</span>
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className={`w-full bg-white/[0.02] border rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-white text-xs sm:text-sm outline-none focus:bg-[#161616] transition-all font-albert cursor-pointer appearance-none ${
                              errors.service ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-[#FF6A00]/50"
                            }`}
                          >
                            <option value="" className="bg-[#111] text-white/40">Select service...</option>
                            <option value="Website Development" className="bg-[#111]">Website Development</option>
                            <option value="UGC Ads" className="bg-[#111]">UGC Ads</option>
                            <option value="Performance Marketing" className="bg-[#111]">Performance Marketing</option>
                            <option value="Social Media Management" className="bg-[#111]">Social Media Management</option>
                            <option value="Video Production" className="bg-[#111]">Video Production</option>
                            <option value="Brand Strategy" className="bg-[#111]">Brand Strategy</option>
                          </select>
                          {errors.service && (
                            <span className="text-red-500 text-[10px] mt-1 font-albert">
                              {errors.service}
                            </span>
                          )}
                        </div>

                        {/* Budget Select */}
                        <div className="flex flex-col">
                          <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                            Monthly Budget <span className="text-white/30 font-normal lowercase">(Optional)</span>
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-white text-xs sm:text-sm outline-none focus:border-[#FF6A00]/50 focus:bg-[#161616] transition-all font-albert cursor-pointer appearance-none"
                          >
                            <option value="" className="bg-[#111] text-white/40">Select budget range...</option>
                            <option value="Under ₹1L" className="bg-[#111]">Under ₹1L</option>
                            <option value="₹1L - ₹3L" className="bg-[#111]">₹1L - ₹3L</option>
                            <option value="₹3L - ₹5L" className="bg-[#111]">₹3L - ₹5L</option>
                            <option value="₹5L+" className="bg-[#111]">₹5L+</option>
                            <option value="Not decided" className="bg-[#111]">Not decided</option>
                          </select>
                        </div>
                      </div>

                      {/* Goals Textarea */}
                      <div className="flex flex-col">
                        <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                          Tell us about your goals / project <span className="text-white/30 font-normal lowercase">(Optional)</span>
                        </label>
                        <textarea
                          name="goals"
                          value={formData.goals}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Write a few lines about your business goals or challenges..."
                          className={`w-full bg-white/[0.02] border rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-white text-xs sm:text-sm outline-none placeholder:text-white/20 focus:bg-white/[0.04] transition-all font-albert resize-none ${
                            errors.goals ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-[#FF6A00]/50"
                          }`}
                        />
                        {errors.goals && (
                          <span className="text-red-500 text-[10px] mt-1 font-albert">
                            {errors.goals}
                          </span>
                        )}
                      </div>

                      {/* Submit CTA Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 sm:py-3.5 bg-[#FF6A00] hover:bg-[#ff7b1a] active:scale-[0.98] disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-600 text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 mt-2 shadow-lg shadow-[#FF6A00]/20"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            <span>Booking Call...</span>
                          </>
                        ) : (
                          <span>Get My Free Strategy Call</span>
                        )}
                      </button>

                      {/* Footer Spam Info */}
                      <p className="text-[9px] text-white/30 text-center font-albert mt-1">
                        No spam. Your information is 100% secure and never shared.
                      </p>
                    </form>
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
