"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const team = [
  { name: "Julian Vane", role: "Executive Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
  { name: "Sarah K.", role: "Head of Creative", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
  { name: "Marcus Thorne", role: "Chief Strategist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
  { name: "Elena Rossi", role: "Production Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1974&auto=format&fit=crop" },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="bg-dark min-h-screen" ref={containerRef}>
      {/* Cinematic Hero */}
      <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <motion.div 
             style={{ y: y1 }}
             className="absolute top-0 right-0 w-1/2 h-full bg-surface/20 blur-[100px] rounded-full"
          />
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-brand uppercase tracking-[0.6em] text-[10px] font-bold mb-8 block">EST. 2024</span>
            <h1 className="text-[10vw] font-heading text-white leading-none uppercase">
              WE ARE <br /> <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">ADLYNGO</span>.
            </h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "100px" }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-brand"
        />
      </section>

      {/* Narrative Section */}
      <section className="py-64 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-7xl font-heading text-white mb-12 uppercase leading-tight"
            >
              CHALLENGING THE <span className="text-brand">STATUS QUO</span> OF CONTENT.
            </motion.h2>
            <div className="space-y-8 text-muted/60 text-lg md:text-xl uppercase tracking-widest leading-relaxed">
              <p>Adlyngo is a collective of directors, strategists, and creative engineers obsessed with visual impact.</p>
              <p>We believe advertising should be as compelling as cinema. If it doesn't move you, it's not working.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div style={{ y: y1 }} className="aspect-[3/4] bg-surface relative overflow-hidden group">
               <Image 
                 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 50vw"
                 alt="Culture" 
                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
               />
            </motion.div>
            <motion.div style={{ y: y2 }} className="aspect-[3/4] bg-surface relative overflow-hidden group translate-y-12">
               <Image 
                 src="https://images.unsplash.com/photo-1522071823916-291771192934?q=80&w=2070&auto=format&fit=crop" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 50vw"
                 alt="Studio" 
                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy */}
      <section className="py-40 bg-surface border-y border-white/5 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <span className="text-brand text-4xl font-heading mb-6 block">01 / VISION</span>
              <p className="text-muted/60 text-sm uppercase tracking-[0.2em] leading-relaxed">To transform digital channels into cinematic experiences that command absolute attention.</p>
            </div>
            <div>
              <span className="text-brand text-4xl font-heading mb-6 block">02 / MISSION</span>
              <p className="text-muted/60 text-sm uppercase tracking-[0.2em] leading-relaxed">Blending elite-level production with ruthless performance strategy to drive unprecedented growth.</p>
            </div>
            <div>
              <span className="text-brand text-4xl font-heading mb-6 block">03 / CULTURE</span>
              <p className="text-muted/60 text-sm uppercase tracking-[0.2em] leading-relaxed">A relentless pursuit of creative excellence. We don't compromise on quality, ever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-64 px-6 bg-black">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-6xl md:text-9xl font-heading text-white">THE <span className="italic text-muted/20">MINDS</span>.</h2>
            <p className="text-muted/40 text-xs uppercase tracking-[0.4em] max-w-sm mb-4">Elite talent gathered from global agencies to build something better.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-none"
              >
                <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 mb-6">
                  <Image 
                    src={member.image} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    alt={member.name} 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h4 className="text-2xl font-heading text-white uppercase">{member.name}</h4>
                <p className="text-brand text-[10px] uppercase tracking-widest font-bold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final About CTA */}
      <section className="py-40 bg-brand text-center">
        <h2 className="text-6xl md:text-[10rem] font-heading text-white leading-none mb-12">WORK WITH <span className="italic">US.</span></h2>
        <Link href="/contact" className="inline-block px-16 py-6 bg-white text-brand font-bold uppercase tracking-[0.4em] text-sm hover:bg-black hover:text-white transition-all duration-500">
          Join the Movement
        </Link>
      </section>
    </div>
  );
}
