import Image from "next/image";

export const metadata = {
  title: "Under Maintenance | ADLYNGO",
  description: "We are currently performing scheduled maintenance. Please check back soon.",
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 30%, #FF4D00 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <Image
          src="/favicon.svg"
          alt="Adlyngo"
          width={64}
          height={64}
          className="mx-auto mb-8 opacity-90"
        />

        <p className="text-brand text-sm md:text-base font-albert font-bold uppercase tracking-[0.3em] mb-4">
          We&apos;ll be right back
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6">
          Website Under Maintenance
        </h1>

        <p className="text-muted/80 font-albert text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
          We&apos;re making some improvements behind the scenes. The site will be
          back online shortly. Thank you for your patience.
        </p>

        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
          </span>
          <span className="font-albert text-sm text-muted/70 uppercase tracking-wider">
            Maintenance in progress
          </span>
        </div>
      </div>
    </div>
  );
}
