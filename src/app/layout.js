import { Bebas_Neue, Inter, Albert_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import Navbar from "@/components/common/Navbar";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "ADLYNGO | We Don't Run Ads. We Make Them Speak.",
  description: "A premium creative agency specializing in cinematic storytelling and high-performance advertising.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${albertSans.variable}`}>
      <body className="antialiased selection:bg-brand selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
