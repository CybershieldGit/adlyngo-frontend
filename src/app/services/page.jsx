"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "strategy",
    title: "Brand Strategy",
    description: "We don't just build brands; we build legacies. Our strategic approach involves deep market analysis and creative positioning to ensure your brand stands out in a crowded digital landscape.",
    deliverables: ["Market Research", "Brand Identity", "Competitor Analysis", "Voice & Tone", "GTM Strategy"],
    process: "Research → Insight → Execution → Optimization",
    results: "Avg. 45% increase in brand recall.",
  },
  {
    id: "production",
    title: "Production",
    description: "Cinematic quality meets high-performance advertising. Our production team creates visuals that aren't just seen—they're felt. From 8K commercials to social-first content.",
    deliverables: ["Commercial Ads", "Product Films", "CGI & 3D", "Sound Design", "Color Grading"],
    process: "Concept → Storyboard → Shoot → Post",
    results: "3x higher engagement on social platforms.",
  },
  {
    id: "motion",
    title: "Motion Graphics",
    description: "Fluid, immersive, and dynamic. Our motion graphics breathe life into static concepts, creating complex visual stories that capture attention in milliseconds.",
    deliverables: ["2D/3D Animation", "Explainer Videos", "Visual Effects", "UI Animation", "Logo Stings"],
    process: "Moodboard → Asset Prep → Animation → Polish",
    results: "10M+ collective views for clients.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 bg-black min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl"
        >
          <span className="text-brand uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block underline underline-offset-8">Our Capabilities</span>
          <h1 className="text-6xl md:text-[14rem] font-heading text-white leading-[0.75] mb-12">
            WHAT WE <span className="italic text-muted/20">SOLVE</span>.
          </h1>
          <p className="text-muted/60 text-lg md:text-2xl max-w-2xl uppercase tracking-[0.2em] leading-relaxed">
            A specialized ecosystem of creative production and digital strategy designed for the modern era.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-40 space-y-8">
            <p className="text-brand text-[10px] uppercase tracking-[0.5em] font-bold border-b border-white/10 pb-4">Services Menu</p>
            <nav className="flex flex-col gap-6">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-white/40 hover:text-brand transition-colors text-xs uppercase tracking-[0.3em] font-bold"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Detailed Service Sections */}
        <div className="lg:col-span-9 space-y-64 pb-32">
          {services.map((service, index) => (
            <motion.section
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-40 border-t border-white/10 pt-20"
            >
              <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                <div className="max-w-xl">
                  <h2 className="text-5xl md:text-8xl font-heading text-white mb-8 flex items-center gap-6">
                    {service.title} <ArrowDownRight className="text-brand" size={48} />
                  </h2>
                  <p className="text-muted/60 text-lg leading-relaxed mb-12">
                    {service.description}
                  </p>
                </div>
                
                <div className="bg-surface p-12 border border-white/5 h-fit min-w-[300px]">
                  <h4 className="text-brand text-[10px] uppercase tracking-widest font-bold mb-8">Results</h4>
                  <p className="text-white text-2xl font-heading uppercase leading-tight italic">
                    "{service.results}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
                <div>
                  <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8 flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-brand" /> Deliverables
                  </h4>
                  <ul className="space-y-4">
                    {service.deliverables.map((item) => (
                      <li key={item} className="text-muted/40 text-xs uppercase tracking-[0.2em] flex items-center gap-3">
                        <CheckCircle2 size={14} className="text-brand" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8 flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-brand" /> The Process
                  </h4>
                  <p className="text-muted/60 text-sm italic uppercase tracking-widest leading-loose">
                    {service.process}
                  </p>
                  <Link href="/contact" className="mt-12 inline-block px-10 py-4 bg-brand text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-brand transition-all">
                    Inquire Now
                  </Link>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* Global Services CTA */}
      <section className="py-40 bg-white text-black text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-7xl md:text-[12rem] font-heading leading-none mb-12">NEED SCALE?</h2>
          <Link href="/contact" className="inline-block px-16 py-6 bg-black text-white text-sm uppercase tracking-[0.4em] font-bold hover:bg-brand transition-all duration-500">
            Let's Collaborate
          </Link>
        </div>
        {/* Cinematic Text Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-heading text-black/[0.02] whitespace-nowrap pointer-events-none select-none">
          PERFORMANCE PERFORMANCE
        </div>
      </section>
    </div>
  );
}
