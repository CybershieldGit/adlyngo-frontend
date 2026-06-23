"use client";

const logos = [
  "/logo/1.png",
  "/logo/2.png",
  "/logo/3.png",
  "/logo/4.png",
  "/logo/5.png",
  "/logo/6.png",
  "/logo/7.png",
  "/logo/8.png",
  "/logo/9.png",
  "/logo/10.png",
  "/logo/11.png",
  "/logo/12.png",
  "/logo/13.png",
  "/logo/14.png",
  "/logo/15.png",
  "/logo/16.png",
  "/logo/17.png",
  "/logo/18.png",
  "/logo/19.png",
];

function LogoBox({ logo, alt }) {
  return (
    <div className="brand-logo-box group flex h-12 w-[100px] shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white px-3 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] md:h-[54px] md:w-[120px] md:px-3.5 md:py-2.5">
      <img
        src={logo}
        alt={alt}
        width={92}
        height={34}
        loading="eager"
        decoding="async"
        className="h-full w-full object-contain opacity-85 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </div>
  );
}

export default function BrandMarqueeStrip({ className = "" }) {
  return (
    <div className={className}>
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[120px] lg:w-[220px]"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[120px] lg:w-[220px]"
          style={{
            background:
              "linear-gradient(to left, #000000 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden
        />

        <div className="marquee-track flex w-max items-center gap-[18px] py-4 md:gap-7 md:py-5">
          {logos.map((logo, i) => (
            <LogoBox key={i} logo={logo} alt={`brand-${i + 1}`} />
          ))}
          {logos.map((logo, i) => (
            <LogoBox key={`dup-${i}`} logo={logo} alt={`brand-${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
