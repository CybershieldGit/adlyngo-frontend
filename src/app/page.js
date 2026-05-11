import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import FeaturedWork from "@/components/home/FeaturedWork";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedWork />
      <Process />
      <Testimonials />
      
      {/* Contact CTA Section */}
      <section className="py-32 bg-brand px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-[8rem] leading-none font-heading text-white mb-12">
            READY TO <span className="italic">SPEAK?</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-xl mx-auto uppercase tracking-widest font-light">
            Stop running ads. Start making statements. Let's build something iconic together.
          </p>
          <a
            href="/contact"
            className="inline-block px-16 py-6 bg-white text-brand font-bold uppercase tracking-[0.3em] text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Start a Project
          </a>
        </div>
      </section>
    </>
  );
}
