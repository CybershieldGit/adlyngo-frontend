"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/common/SmoothScroll";
import Navbar from "@/components/common/Navbar";
import IntroModal from "@/components/common/IntroModal";
import LeadPopup from "@/components/common/LeadPopup";

export default function MaintenanceGate({ children }) {
  if (usePathname() === "/maintenance") return children;

  return (
    <SmoothScroll>
      <Navbar />
      <main>{children}</main>
      <IntroModal />
      <LeadPopup />
    </SmoothScroll>
  );
}
