import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <Link href="/" className="text-4xl font-heading text-white tracking-tighter mb-6 block">
              ADLYN<span className="text-brand">GO</span>
            </Link>
            <p className="text-muted/60 max-w-sm text-sm leading-relaxed">
              We are a creative production agency that specializes in cinematic advertising and high-performance digital experiences. We don't run ads. We make them speak.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-heading text-xl mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted/60 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-brand transition-colors">Home</Link></li>
              <li><Link href="/work" className="hover:text-brand transition-colors">Work</Link></li>
              <li><Link href="/services" className="hover:text-brand transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-brand transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading text-xl mb-6">Social</h4>
            <ul className="space-y-4 text-sm text-muted/60 uppercase tracking-widest">
              <li><a href="#" className="hover:text-brand transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Vimeo</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-[10px] uppercase tracking-[0.2em] text-muted/40">
          <p>© 2026 ADLYNGO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
