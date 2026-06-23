"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LeadConsultationContent from "@/components/common/LeadConsultationContent";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("adlyngo_lead_submitted");
    const hasClosed = sessionStorage.getItem("adlyngo_lead_closed");

    if (hasSubmitted || hasClosed) {
      return;
    }

    const openModal = () => {
      const checkSubmitted = localStorage.getItem("adlyngo_lead_submitted");
      const checkClosed = sessionStorage.getItem("adlyngo_lead_closed");
      if (!checkSubmitted && !checkClosed) {
        setIsOpen(true);
      }
    };

    const hasSeenIntro = sessionStorage.getItem("adlyngo_intro_seen");
    const isHomepage = window.location.pathname === "/home";

    if (isHomepage && !hasSeenIntro) {
      const handleIntroClosed = () => {
        timerRef.current = setTimeout(() => {
          openModal();
        }, 7000);
      };
      window.addEventListener("introClosed", handleIntroClosed);
      
      return () => {
        window.removeEventListener("introClosed", handleIntroClosed);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

      timerRef.current = setTimeout(() => {
        openModal();
      }, 7000);

    let hasBlurred = false;

    const handleBlur = () => {
      hasBlurred = true;
    };

    const handleFocus = () => {
      if (hasBlurred) {
        openModal();
      }
    };

    const handleMouseLeave = (e) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start lg:items-center justify-center p-0 lg:p-10"
        >
          <div onClick={handleClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-[1160px] max-h-[72vh] lg:max-h-none mt-[14vh] lg:mt-0 bg-[#0D0D0D] border border-white/10 rounded-[32px] overflow-y-auto lg:overflow-visible shadow-[0_25px_70px_-15px_rgba(255,106,0,0.15)] z-10 no-scrollbar flex flex-col"
            data-lenis-prevent
          >
            <button
              onClick={handleClose}
              className="fixed top-4 right-4 lg:absolute lg:top-6 lg:right-6 text-white/40 hover:text-white hover:bg-white/10 bg-white/5 rounded-full p-2 transition-all z-[60] hover:scale-105"
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            <div className="p-4 sm:p-8 lg:p-10">
              <LeadConsultationContent onDone={handleClose} doneLabel="Done" />
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
