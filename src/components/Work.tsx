"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  note: string;
  images: { color: string; label: string }[];
  href: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "LittleList",
    description:
      "Growing the UK's first newborn baby registry through phased UX improvements — from research and strategy to redesigned homepage, onboarding, and dashboard that drove measurable growth.",
    tags: ["Product Design", "UX Research", "UX Audit", "Product Strategy"],
    note: "LittleList UK",
    href: "/work/littlelist",
    images: [
      { color: "#1a2a2a", label: "Homepage" },
      { color: "#1e2a3a", label: "Onboarding" },
      { color: "#2a2640", label: "Dashboard" },
      { color: "#2a2a1a", label: "Checklist" },
      { color: "#1a2e2a", label: "Navigation" },
      { color: "#1a2a2a", label: "Homepage" },
      { color: "#1e2a3a", label: "Onboarding" },
      { color: "#2a2640", label: "Dashboard" },
    ],
  },
  {
    id: 2,
    title: "Design System",
    description:
      "Built a comprehensive design system from scratch — tokens, components, and documentation that unified a fragmented product suite across 4 teams and 3 platforms.",
    tags: ["Design System", "Web", "Component Library", "Figma", "Documentation"],
    note: "SYNDICUT",
    href: "/work/design-system",
    images: [
      { color: "#3a2a1a", label: "Tokens" },
      { color: "#2a2a1e", label: "Buttons" },
      { color: "#1a2a2e", label: "Forms" },
      { color: "#2e1a2a", label: "Cards" },
      { color: "#1a2e2a", label: "Navigation" },
      { color: "#3a2a1a", label: "Tokens" },
      { color: "#2a2a1e", label: "Buttons" },
      { color: "#1a2a2e", label: "Forms" },
    ],
  },
];

function Carousel({ images, reverse }: { images: Project["images"]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const hovering = useRef(false);
  const speed = reverse ? -0.5 : 0.5;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (hovering.current) {
        posRef.current -= speed * 0.5;
      } else {
        posRef.current += speed;
      }

      const totalWidth = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= totalWidth) {
        posRef.current = 0;
      }

      track.style.transform = `translateX(${-posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div ref={trackRef} className="flex gap-2 will-change-transform">
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="shrink-0 w-[clamp(300px,42vw,540px)] h-[360px] rounded-[3px] overflow-hidden"
            style={{ backgroundColor: img.color }}
          >
            <div className="w-full h-full flex items-center justify-center text-white/10 text-[14px] font-medium">
              {img.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-32 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between mb-16">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight">
          Recent work
        </h2>
        <span className="text-[13px] text-neutral-500 mb-2">
          {projects.length} featured
        </span>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-16">
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="bg-[#151615] rounded-2xl overflow-hidden"
          >
            {/* Top: meta + CTA */}
            <div className="p-8 flex flex-col md:flex-row gap-8">
              {/* Left: info */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Number + Title */}
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] text-[#9f9f9f]">
                    ({String(i + 1).padStart(3, "0")})
                  </span>
                  <h3 className="text-[30px] font-normal text-[#f1f1f1] leading-[1.1]">
                    {project.title}
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[13px] text-[#9f9f9f] bg-[#232423] border border-[#232423] rounded-[3px] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[15px] text-[#d6d6d6] leading-[1.4] max-w-lg">
                  {project.description}
                </p>

                {/* Note + underline link */}
                <div className="flex flex-col gap-0.5 mt-auto">
                  <span className="text-[14px] text-[#9f9f9f]">
                    {project.note}
                  </span>
                </div>
              </div>

              {/* Right: CTA button */}
              <div className="flex items-start md:items-end md:justify-end shrink-0">
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 bg-[#f1f1f1] text-[#151615] text-[15px] rounded-[3px] px-3 py-2.5 hover:bg-white transition-colors capitalize"
                >
                  <ArrowIcon />
                  View Case Study
                </Link>
              </div>
            </div>

            {/* Bottom: carousel */}
            <div className="rounded-2xl overflow-hidden">
              <Carousel images={project.images} reverse={i % 2 === 1} />
            </div>
          </article>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-20 flex justify-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[18px] font-medium text-[#a1ff62] hover:text-[#c4ff9e] transition-colors"
        >
          View all case studies
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
