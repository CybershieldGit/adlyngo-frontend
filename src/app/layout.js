import { Bebas_Neue, Albert_Sans } from "next/font/google";
import "./globals.css";
import MaintenanceGate from "@/components/common/MaintenanceGate";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata = {
  title: "ADLYNGO | We Don't Run Ads. We Make Them Speak.",
  description: "A premium creative agency specializing in cinematic storytelling and high-performance advertising.",
  icons: {
    icon: "/favicon.svg", 
  },
};

export default function RootLayout({ children }) { 
  return (
    <html lang="en" className={`${bebasNeue.variable} ${albertSans.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-brand selection:text-white">
        <MaintenanceGate>{children}</MaintenanceGate>
      </body>
    </html>
  );
}
