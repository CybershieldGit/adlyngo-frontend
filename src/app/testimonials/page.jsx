"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "CEO, TechFlow",
    content: "Adlyngo didn't just run ads for us; they reinvented our entire visual identity. Our conversion rates tripled within the first three months.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Marketing Director, Luxe Beauty",
    content: "The level of cinematic quality they bring to social media content is unparalleled. They understand the nuances of brand storytelling like no other agency.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder, Urban Living",
    content: "Working with them was seamless. They took our complex real estate projects and turned them into immersive visual experiences that captivated our audience.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Emma Watson",
    role: "Brand Manager, Pure Aura",
    content: "They have a ruthless focus on performance. Every creative piece was optimized for results, and the data speaks for itself. Highly recommended.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1974&auto=format&fit=crop"
  }
];

export default function TestimonialsPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-32 pb-20 px-6 md:px-16 lg:px-[70px]">
      <div className="w-full mx-auto">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand uppercase tracking-[0.6em] text-[10px] font-bold mb-4 block">Voices of Impact</span>
            <h1 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-8">
              WHAT THEY <span className="text-brand">SAY.</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-albert">
              Don't just take our word for it. Hear from the visionaries and brands we've helped scale through cinematic storytelling.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-surface/30 border border-white/5 p-8 md:p-10 lg:p-14 rounded-[40px] relative overflow-hidden group"
            >
              <Quote className="absolute top-10 right-10 text-white/[0.03] group-hover:text-brand/10 transition-colors duration-700" size={120} />
              
              <div className="relative z-10">
                <p className="text-white/80 text-xl md:text-2xl leading-relaxed italic mb-12 font-albert">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-wider">{t.name}</h4>
                    <p className="text-brand text-xs uppercase tracking-widest font-medium mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
