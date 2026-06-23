import LeadConsultationContent from "@/components/common/LeadConsultationContent";

export default function HomeContactSection() {
  return (
    <section
      className="relative px-6 md:px-16 lg:px-[70px] py-14 md:py-16 lg:py-20 bg-black border-t border-white/5 overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(180deg, rgba(255, 106, 0, 0.02) -75.43%, rgba(20, 20, 20, 0.1) 93.29%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 h-[min(720px,80%)] w-[min(1100px,95%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(100,100,100,0.12)] blur-[120px]" />
        <div className="absolute -bottom-24 right-[-10%] h-[420px] w-[520px] rounded-full bg-[rgba(100,100,100,0.1)] blur-[100px]" />
        <div className="absolute -bottom-10 left-[-5%] h-[320px] w-[420px] rounded-full bg-[rgba(100,100,100,0.08)] blur-[90px]" />
      </div>

      <div className="relative z-10 w-full">
        <LeadConsultationContent variant="inline" formOrder="content-first" doneLabel="Submit Another" />
      </div>
    </section>
  );
}
