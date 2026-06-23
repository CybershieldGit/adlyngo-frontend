"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, CheckCircle2 } from "lucide-react";

const FEATURE_ITEMS = [
  {
    title: "Custom Strategy",
    desc: "Tailored roadmap for your business goals.",
    iconPath: "/images/custom-strategy.svg",
  },
  {
    title: "Growth Focused",
    desc: "Performance-driven marketing that delivers results.",
    iconPath: "/images/growth-focused.svg",
  },
  {
    title: "Quick Response",
    desc: "We get back to you within 24 hours, always.",
    iconPath: "/images/quick-response.svg",
  },
  {
    title: "Trusted Partner",
    desc: "Helping startups & businesses scale with confidence.",
    iconPath: "/images/trusted-partner.svg",
  },
];

const CLIENT_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
];

const INITIAL_FORM_DATA = {
  fullName: "",
  businessName: "",
  mobileNumber: "",
  workEmail: "",
  service: "",
  budget: "",
  goals: "",
};

function FormIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
      <path d="M11.7534 32.3057C12.3783 32.9312 11.9353 34 11.0511 34H0.992701C0.444447 34 0 33.5556 0 33.0073V22.9399C0 22.0553 1.06973 21.6124 1.69496 22.2382L11.7534 32.3057Z" fill="white" />
      <path d="M0 0.992697V10.118C0 10.8329 0.732913 11.3134 1.38854 11.0283L22.3754 1.90306C23.3627 1.47376 23.0562 0 21.9795 0H0.992701C0.444447 0 0 0.444446 0 0.992697Z" fill="white" />
      <path d="M7.81857 18.0232L16.0907 26.3027C16.5818 26.7942 17.4128 26.6422 17.6981 26.0088L24.4755 10.9629C24.8507 10.1299 23.9965 9.27519 23.1633 9.64981L8.11376 16.4162C7.4802 16.701 7.3276 17.5318 7.81857 18.0232Z" fill="white" />
      <path d="M24.0437 33.9996H33.0073C33.5556 33.9996 34 33.5552 34 33.0069V12.425C34 11.3487 32.5269 11.0419 32.0972 12.0287L23.1335 32.6106C22.848 33.2663 23.3285 33.9996 24.0437 33.9996Z" fill="white" />
      <path d="M26.1399 1.69464L32.3054 7.86007C32.9307 8.48543 34 8.04253 34 7.15813V0.992697C34 0.444446 33.5556 0 33.0073 0H26.8418C25.9574 0 25.5145 1.06928 26.1399 1.69464Z" fill="url(#paint0_linear_lead_form)" />
      <defs>
        <linearGradient id="paint0_linear_lead_form" x1="29.2226" y1="5.41669" x2="35.6023" y2="2.17189" gradientUnits="userSpaceOnUse">
          <stop offset="0.132381" stopColor="#FF6A00" />
          <stop offset="0.634466" stopColor="#FF8C2B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SuccessState({ onDone, doneLabel = "Done" }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 min-h-[450px]">
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
      {onDone && (
        <button
          type="button"
          onClick={onDone}
          className="px-8 py-3 bg-[#FF6A00] hover:bg-[#ff7b1a] text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#FF6A00]/20"
        >
          {doneLabel}
        </button>
      )}
    </div>
  );
}

export default function LeadConsultationContent({
  onSuccess,
  onDone,
  doneLabel,
  formOrder = "form-first-mobile",
  variant = "modal",
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
    if (!formData.goals.trim()) newErrors.goals = "Please tell us about your goals";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      localStorage.setItem("adlyngo_lead_submitted", "true");
      onSuccess?.();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    if (onDone) {
      onDone();
      return;
    }
    setIsSubmitted(false);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  if (isSubmitted) {
    return <SuccessState onDone={handleDone} doneLabel={doneLabel} />;
  }

  const leftOrder = formOrder === "form-first-mobile" ? "order-2 lg:order-1" : "order-1";
  const rightOrder = formOrder === "form-first-mobile" ? "order-1 lg:order-2" : "order-2";
  const isInline = variant === "inline";

  return (
    <div
      className={
        isInline
          ? "grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,620px)] gap-8 lg:gap-10 xl:gap-14 items-start"
          : "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
      }
    >
      <div
        className={`${isInline ? "" : "lg:col-span-6"} ${leftOrder} flex flex-col ${
          isInline ? "justify-start gap-6 lg:gap-8 w-full" : "justify-between gap-6 lg:gap-8 pt-2 lg:pt-4"
        }`}
      >
        <div className="flex flex-col gap-6 w-full items-start text-left">
          <span className="text-[#FF6A00] text-xs font-bold uppercase tracking-[0.2em] font-albert">
            Your Growth Partner
          </span>

          <h2 className="text-[72px] font-heading leading-[0.95] text-white uppercase tracking-tight">
            Let&apos;s build what&apos;s next for <br />
            <span className="text-[#FF6A00]">your business</span>
          </h2>

          <p className="text-white/60 font-albert text-sm leading-relaxed max-w-lg">
            Share your goals and our experts will design a data-driven strategy to accelerate your growth.
          </p>


        </div>

        <div className={`flex flex-col gap-4 ${isInline ? "mt-0 items-start text-left" : "mt-2"}`}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {CLIENT_AVATARS.map((src, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/90 leading-tight font-albert">
              60+ <span className="text-white/50">Businesses trust</span>{" "}
              <span className="text-[#FF6A00]">Adlyngo</span> to grow their brand online
            </div>
          </div>
        </div>
      </div>

      <div className={`${isInline ? "min-w-0" : "lg:col-span-6"} ${rightOrder}`}>
        <div
          className={`relative rounded-2xl md:rounded-[24px] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 overflow-hidden h-full justify-between ${
            isInline
              ? "border border-white/[0.06] bg-[#1f1f1f] shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              : "border border-white/5 bg-[#131313]"
          }`}
        >
          <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none">
            <div className="bg-[#FF6A00] text-white text-[10px] font-bold text-center py-1.5 w-[140px] absolute top-4 -right-8 rotate-45 uppercase tracking-widest shadow-md">
              Free
            </div>
          </div>

          <div className="flex items-center gap-3 pr-8">
            <div className="flex flex-col">
              <h3 className="text-[24px] font-heading text-white uppercase tracking-wide leading-none">
                Get Your Free Growth Consultation
              </h3>
              <p className="mt-1 font-albert text-[14px] leading-snug text-white/50">
                Fill in the details and we&apos;ll schedule a call with our growth expert.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                {errors.fullName && <span className="text-red-500 text-[10px] mt-1 font-albert">{errors.fullName}</span>}
              </div>

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
                {errors.mobileNumber && <span className="text-red-500 text-[10px] mt-1 font-albert">{errors.mobileNumber}</span>}
              </div>

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
                {errors.workEmail && <span className="text-red-500 text-[10px] mt-1 font-albert">{errors.workEmail}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                {errors.service && <span className="text-red-500 text-[10px] mt-1 font-albert">{errors.service}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                  Monthly Marketing Budget <span className="text-white/30 font-normal lowercase">(Optional)</span>
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

            <div className="flex flex-col">
              <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1 block">
                Tell us about your goals / project<span className="text-[#FF6A00] ml-0.5">*</span>
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
              {errors.goals && <span className="text-red-500 text-[10px] mt-1 font-albert">{errors.goals}</span>}
            </div>

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

            <p className="text-[9px] text-white/30 text-center font-albert mt-1">
              No spam. Your information is 100% secure and never shared.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
