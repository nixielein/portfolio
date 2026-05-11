import Link from "next/link";

export default function DesignSystemPage() {
  return (
    <main className="pt-28 pb-32 px-6 max-w-6xl mx-auto">
      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-[14px] text-[#9f9f9f] hover:text-[#f1f1f1] transition-colors mb-12"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to all work
      </Link>

      {/* Header */}
      <div className="mb-16">
        <span className="text-[13px] text-[#9f9f9f] block mb-2">(002)</span>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] text-[#f1f1f1] mb-6">
          Design System
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {["Design System", "Web", "Component Library", "Figma", "Documentation"].map((tag) => (
            <span
              key={tag}
              className="text-[13px] text-[#9f9f9f] bg-[#232423] border border-[#232423] rounded-[3px] px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[15px] mb-12">
          <div>
            <span className="text-[13px] text-[#9f9f9f] block mb-1">Client</span>
            <span className="text-[#f1f1f1]">SYNDICUT</span>
          </div>
          <div>
            <span className="text-[13px] text-[#9f9f9f] block mb-1">Year</span>
            <span className="text-[#f1f1f1]">2025</span>
          </div>
          <div>
            <span className="text-[13px] text-[#9f9f9f] block mb-1">Role</span>
            <span className="text-[#f1f1f1]">Design System Lead</span>
          </div>
        </div>
      </div>

      {/* Hero image placeholder */}
      <div className="w-full h-[400px] md:h-[560px] bg-[#3a2a1a] rounded-2xl mb-20 flex items-center justify-center text-white/10 text-[18px]">
        Hero image
      </div>

      {/* Overview */}
      <section className="mb-20 max-w-3xl">
        <h2 className="text-[24px] font-medium text-[#f1f1f1] mb-6">Overview</h2>
        <p className="text-[16px] text-[#d6d6d6] leading-[1.6] mb-4">
          Built a comprehensive design system from scratch — tokens, components, and documentation that unified a fragmented product suite across 4 teams and 3 platforms.
        </p>
        <p className="text-[16px] text-[#d6d6d6] leading-[1.6]">
          Placeholder — expand on the scope, the state of things before the system, and the vision for what it needed to become.
        </p>
      </section>

      {/* Process images placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
        {["Audit", "Tokens", "Components", "Documentation"].map((label) => (
          <div
            key={label}
            className="h-[300px] bg-[#2a2a1e] rounded-xl flex items-center justify-center text-white/10 text-[14px]"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Challenge */}
      <section className="mb-20 max-w-3xl">
        <h2 className="text-[24px] font-medium text-[#f1f1f1] mb-6">The Challenge</h2>
        <p className="text-[16px] text-[#d6d6d6] leading-[1.6]">
          Placeholder — describe the fragmentation, the pain points for designers and developers, the inconsistencies across products, and why previous attempts hadn't worked.
        </p>
      </section>

      {/* Solution */}
      <section className="mb-20 max-w-3xl">
        <h2 className="text-[24px] font-medium text-[#f1f1f1] mb-6">The Solution</h2>
        <p className="text-[16px] text-[#d6d6d6] leading-[1.6]">
          Placeholder — describe the token architecture, component taxonomy, contribution model, documentation approach, and adoption strategy.
        </p>
      </section>

      {/* Results */}
      <section className="mb-20">
        <h2 className="text-[24px] font-medium text-[#f1f1f1] mb-8">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { metric: "120+", label: "Components shipped" },
            { metric: "4 teams", label: "Adopted the system" },
            { metric: "-60%", label: "Design-to-dev handoff time" },
          ].map(({ metric, label }) => (
            <div key={label} className="bg-[#151615] rounded-xl p-8">
              <span className="text-[36px] font-medium text-[#a1ff62] block mb-2">{metric}</span>
              <span className="text-[15px] text-[#9f9f9f]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final images */}
      <div className="w-full h-[400px] md:h-[560px] bg-[#3a2a1a] rounded-2xl mb-20 flex items-center justify-center text-white/10 text-[18px]">
        Final showcase image
      </div>

      {/* Next project */}
      <div className="border-t border-neutral-800 pt-12 flex items-center justify-between">
        <span className="text-[14px] text-[#9f9f9f]">Next project</span>
        <Link
          href="/work/banking-app"
          className="inline-flex items-center gap-2 text-[18px] font-medium text-[#f1f1f1] hover:text-[#a1ff62] transition-colors"
        >
          Banking App
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </main>
  );
}
