import LeadConsultationContent from "@/components/common/LeadConsultationContent";

export default function HomeContactSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#2a2a2a] py-14 md:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 h-[min(720px,80%)] w-[min(1100px,95%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1f1f1f] blur-[120px]" />
        <div className="absolute -bottom-24 right-[-10%] h-[420px] w-[520px] rounded-full bg-[#242424] blur-[100px]" />
        <div className="absolute -bottom-10 left-[-5%] h-[320px] w-[420px] rounded-full bg-[#1c1c1c] blur-[90px]" />
      </div>

      <div className="relative z-10 site-container w-full">
        <LeadConsultationContent variant="inline" formOrder="content-first" doneLabel="Submit Another" />
      </div>
    </section>
  );
}
