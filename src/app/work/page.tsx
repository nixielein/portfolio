import Link from "next/link";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  tags: string[];
  year: string;
  color: string;
  href: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "LittleList",
    description:
      "Growing the UK's first newborn baby registry through phased UX improvements — research, strategy, and redesigned experiences that drove measurable growth across acquisition and engagement.",
    tags: ["Product Design", "UX Research", "UX Audit", "Product Strategy"],
    year: "2024",
    color: "#1a2a2a",
    href: "/work/littlelist",
  },
  {
    id: 2,
    title: "Design System",
    description:
      "Built a comprehensive design system from scratch — tokens, components, and documentation that unified a fragmented product suite across 4 teams.",
    tags: ["Design System", "Web", "Component Library", "Figma"],
    year: "2025",
    color: "#3a2a1a",
    href: "/work/design-system",
  },
  {
    id: 3,
    title: "Dashboard",
    description:
      "Data visualisation platform for enterprise analytics. Designed complex information architecture and interactive charts that made data accessible to non-technical stakeholders.",
    tags: ["Web", "Data Visualisation", "Product Design", "Charts"],
    year: "2024",
    color: "#1a2a2a",
    href: "/work/dashboard",
  },
  {
    id: 4,
    title: "Brand Identity",
    description:
      "Complete brand overhaul for a fintech startup — from strategy and naming through to visual identity, guidelines, and launch collateral across digital and print.",
    tags: ["Branding", "Visual Identity", "Strategy", "Guidelines"],
    year: "2024",
    color: "#2a2a1a",
    href: "/work/brand-identity",
  },
];

export default function WorkPage() {
  return (
    <main className="pt-28 pb-32">
      {/* Header */}
      <div className="px-6 max-w-6xl mx-auto mb-20">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] text-[#f1f1f1] mb-4">
          Case Studies
        </h1>
        <p className="text-[18px] text-[#9f9f9f] leading-relaxed max-w-xl">
          Selected work from product design, design systems, branding, and more.
        </p>
      </div>

      {/* Case study list */}
      <div className="px-6 max-w-6xl mx-auto flex flex-col gap-10">
        {caseStudies.map((study, i) => (
          <Link
            key={study.id}
            href={study.href}
            className="group bg-[#151615] rounded-2xl overflow-hidden flex flex-col md:flex-row hover:bg-[#1a1b1a] transition-colors"
          >
            {/* Thumbnail */}
            <div
              className="w-full md:w-[360px] h-[240px] md:h-auto shrink-0"
              style={{ backgroundColor: study.color }}
            >
              <div className="w-full h-full flex items-center justify-center text-white/10 text-[14px] font-medium min-h-[240px]">
                {study.title}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[13px] text-[#9f9f9f]">
                    ({String(i + 1).padStart(3, "0")})
                  </span>
                  <h2 className="text-[28px] font-normal text-[#f1f1f1] leading-[1.1]">
                    {study.title}
                  </h2>
                  <span className="text-[13px] text-[#9f9f9f] ml-auto">{study.year}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[13px] text-[#9f9f9f] bg-[#232423] border border-[#232423] rounded-[3px] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[15px] text-[#d6d6d6] leading-[1.5]">
                  {study.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[15px] text-[#f1f1f1] group-hover:text-[#a1ff62] transition-colors">
                View Case Study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
