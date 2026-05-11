"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

const sidebarTags = [
  "Baby Registry",
  "Onboarding Flow",
  "Acquisition Funnel",
  "Product Strategy",
  "User Research",
  "UX Audit",
  "UX/UI Design",
  "Design System",
  "Conversion Optimisation",
  "User Dashboard",
];

const sections = [
  { id: "about", label: "Intro" },
  { id: "challenges", label: "Challenges" },
  { id: "research", label: "Research & Discovery" },
  { id: "phases", label: "Project Phases & Solutions" },
  { id: "homepage", label: "Outcome" },
  { id: "takeaways", label: "Next Steps For LittleList" },
];


function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useSectionScroll(activeSection: string) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const activeEl = container.querySelector(`[data-section="${activeSection}"]`) as HTMLElement | null;
    if (!activeEl) return;

    // Find the previous sibling chip to keep it visible
    const activeIdx = sections.findIndex((s) => s.id === activeSection);
    const prevEl = activeIdx > 0
      ? (container.querySelector(`[data-section="${sections[activeIdx - 1].id}"]`) as HTMLElement | null)
      : null;

    // First section: stay at scroll 0 so pill aligns with 16px container edge
    if (activeIdx === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const targetEl = prevEl || activeEl;
    const scrollLeft = targetEl.offsetLeft - 4;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeSection]);

  return scrollRef;
}

const carouselImages = [
  { src: "https://images.squarespace-cdn.com/content/v1/6453c9d6de856d555a322492/8a42fd95-5730-4897-ae36-26ca64c6c841/Screenshot+2026-02-06+at+14.27.47.png", alt: "Discovery 1", aspect: "w-[267px]" },
  { src: "https://images.squarespace-cdn.com/content/v1/6453c9d6de856d555a322492/a08208c8-14ae-4a3b-8c55-a50e009d4951/Screenshot+2026-02-06+at+14.31.07.png", alt: "Discovery 2", aspect: "w-[600px]" },
  { src: "https://images.squarespace-cdn.com/content/v1/6453c9d6de856d555a322492/2b3401a0-6fd7-4939-a3ed-49e537ed2f94/mom.png", alt: "Discovery 3", aspect: "w-[267px]" },
  { src: "https://images.squarespace-cdn.com/content/v1/6453c9d6de856d555a322492/e7270d3d-8f9a-4b94-b361-9bc31f59efcf/Screenshot+2026-02-06+at+14.51.45.png", alt: "Discovery 4", aspect: "w-[496px]" },
  { src: "https://images.squarespace-cdn.com/content/v1/6453c9d6de856d555a322492/75162e84-38e2-470b-acf7-1cfb73f21037/Screenshot+2026-02-08+at+16.54.49.png", alt: "Discovery 5", aspect: "w-[600px]" },
  { src: "https://images.squarespace-cdn.com/content/v1/6453c9d6de856d555a322492/415ddb87-7fdd-412c-a901-25b86a883100/Screenshot+2026-02-08+at+16.45.12.png", alt: "Discovery 6", aspect: "w-[600px]" },
];

function VisualExamplesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  // Drag-to-scroll state
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, hasMoved: false });

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateButtons);
  }, [updateButtons]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { isDragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, hasMoved: false };
    el.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDragging) return;
    e.preventDefault();
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 5) dragState.current.hasMoved = true;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };
  const onMouseUp = () => {
    const el = trackRef.current;
    if (el) el.style.cursor = "grab";
    dragState.current.isDragging = false;
  };

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightbox(null); setZoomed(false); }
      if (e.key === "ArrowRight") { setLightbox((i) => i !== null ? (i + 1) % carouselImages.length : 0); setZoomed(false); }
      if (e.key === "ArrowLeft") { setLightbox((i) => i !== null ? (i - 1 + carouselImages.length) % carouselImages.length : 0); setZoomed(false); }
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <div className="flex flex-col gap-4 pl-6">
        <div className="flex items-center justify-between pr-6">
          <span className="text-[20px] font-medium leading-[21px] text-[#0f172b]">Visual Examples</span>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canPrev}
              className="w-9 h-9 rounded-full border border-[#14151d]/20 flex items-center justify-center transition-opacity disabled:opacity-30"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 12L6 8l4-4" stroke="#14151d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canNext}
              className="w-9 h-9 rounded-full border border-[#14151d]/20 flex items-center justify-center transition-opacity disabled:opacity-30"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="#14151d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          className="overflow-x-auto scrollbar-hide select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="flex gap-4 h-[400px]">
            {carouselImages.map((img, i) => (
              <div
                key={img.alt}
                className={`h-full ${img.aspect} shrink-0 rounded-[10px] bg-[#f0f0f0] overflow-hidden relative cursor-pointer`}
                onClick={() => { if (!dragState.current.hasMoved) setLightbox(i); }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => { setLightbox(null); setZoomed(false); }}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => { setLightbox(null); setZoomed(false); }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + carouselImages.length) % carouselImages.length); setZoomed(false); }}
            aria-label="Previous image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Image */}
          <div
            className={`relative transition-transform duration-300 ${zoomed ? "scale-150" : "scale-100"}`}
            style={{ maxWidth: "85vw", maxHeight: "85vh" }}
            onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
          >
            <Image
              src={carouselImages[lightbox].src}
              alt={carouselImages[lightbox].alt}
              width={1200}
              height={800}
              className={`object-contain max-h-[85vh] w-auto rounded-lg ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              unoptimized
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % carouselImages.length); setZoomed(false); }}
            aria-label="Next image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Counter */}
          <span className="absolute bottom-6 text-white/60 text-[14px]">
            {lightbox + 1} / {carouselImages.length}
          </span>
        </div>
      )}
    </>
  );
}

export default function LittleListPage() {
  const activeSection = useActiveSection();
  const scrollRef = useSectionScroll(activeSection);

  return (
    <main className="pt-28 pb-32 bg-[#EFEAE6]">
      <div className="w-[90%] max-w-[1400px] mx-auto">
      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-[14px] text-[#7a7a7a] hover:text-[#232423] transition-colors mb-12"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to all work
      </Link>

      {/* Title — full width above columns */}
      <h1
        className="text-[#232423] mb-12"
      >
        Turning overwhelm into clarity for both LittleList and expectant parents
      </h1>

      {/* Role + Year + Tools row — white pill cards */}
      <div className="flex flex-wrap gap-2 items-center mb-12">
        <div className="bg-white rounded-2xl px-3 py-2 shrink-0">
          <span className="text-[14px] font-normal leading-[21px] text-[#14151d]">Solo Product Designer (Growth Focus)</span>
        </div>
        <div className="bg-white rounded-2xl px-3 py-2 shrink-0">
          <span className="text-[14px] font-normal leading-[21px] text-[#14151d]">2024-2025</span>
        </div>
        <div className="bg-white rounded-2xl px-3 py-2 shrink-0">
          <div className="flex items-center gap-6">
            <Image src="https://res.cloudinary.com/dndgsrgbl/image/upload/v1774027774/Figma_pl9vyn.png" alt="Figma" width={18} height={27} unoptimized />
            <Image src="https://res.cloudinary.com/dndgsrgbl/image/upload/v1774027775/ga_nydu4k.png" alt="Google Analytics" width={67} height={23} unoptimized />
            <Image src="https://res.cloudinary.com/dndgsrgbl/image/upload/v1774027775/hotjar_skuhdb.png" alt="Hotjar" width={65} height={27} unoptimized />
            <Image src="https://res.cloudinary.com/dndgsrgbl/image/upload/v1774030524/adobe2_egp24r.png" alt="Adobe" width={63} height={17} unoptimized />
          </div>
        </div>
      </div>

      {/* Hero strip image */}
      <div className="w-full h-[500px] rounded-2xl overflow-hidden mb-24 relative">
        <Image
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80"
          alt="Hero strip"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-24">
        {/* Left column — scrolling content */}
        <div className="flex-1 min-w-0">
          {/* Intro card */}
          <div className="bg-white/30 rounded-2xl p-6 flex flex-col gap-9 max-w-[982px]">
            {/* Green pill label */}
            <div className="flex">
              <span className="inline-flex items-center gap-1.5 bg-[#a1ff62] text-[#14151d] text-[14px] leading-[20px] rounded-full px-3 py-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="3" fill="#14151d"/></svg>
                Oh hello! What&apos;s going on here?
              </span>
            </div>

            {/* Paragraph text */}
            <div className="text-[16px] font-normal leading-[28px] text-[#14151d]">
              <p>When I joined LittleList in late 2023, the idea was already strong. Expecting parents (the main audience) were landing on the site, but not sticking around or using it properly.</p>
              <br />
              <p>LittleList is meant to help parents get ready for a baby: understand what they actually need, keep track of it, share lists with family and friends for gifting (the core business model), or shop it themselves — and get support if they&apos;re unsure. Preparing for a baby, especially the first one, is overwhelming. The idea clearly resonated, but something was off — people were arriving and leaving.</p>
              <br />
              <p>The product already had most of the right features — checklists, expert advice, flexible gift lists. But it was built on top of a wedding registry model, so it felt more like a shopping tool than something that helps you think and plan. The messaging didn&apos;t match what parents were going through, and the experience didn&apos;t work well on mobile, which is where most people were.</p>
            </div>

            {/* Bold closing paragraph */}
            <p className="text-[20px] font-medium leading-[32px] text-[#14151d]">
              My job was to figure out what wasn&apos;t clicking, simplify the experience, and make the value obvious from the first touch. I focused on reshaping entry points, clarifying core features, and turning it into something that feels supportive, not transactional — so parents could actually use it, not just sign up and drop off.
            </p>
          </div>

          {/* Discovery card */}
          <div className="bg-white/30 rounded-2xl py-4 flex flex-col gap-9 max-w-[982px] mt-9">
            {/* Header */}
            <div className="px-6 flex flex-col gap-4">
              <div className="flex">
                <span className="inline-flex items-center gap-1.5 bg-[#a1ff62] text-[#14151d] text-[14px] leading-[20px] rounded-full px-3 py-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="3" fill="#14151d"/></svg>
                  Discovery
                </span>
              </div>
              <h2 className="text-[40px] font-medium leading-[84px] text-[#232423]">Turning overwhelm into clarity</h2>
            </div>

            {/* Description */}
            <p className="px-6 text-[20px] font-normal leading-[36px] text-[#14151d]">
              My job was to figure out what wasn&apos;t clicking, simplify the experience, and make the value obvious from the first touch. I focused on reshaping entry points, clarifying core features, and turning it into something that feels supportive, not transactional — so parents could actually use it, not just sign up and drop off.
            </p>

            {/* Validation badge */}
            <div className="px-6">
              <span className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-2 text-[14px] leading-[21px] text-[#14151d]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 14l4-6 4 3 6-8" stroke="#14151d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Validated with 98% confidence across all key metrics
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 px-6">
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-[#0f172b]">87%</span>
                <span className="text-[14px] text-[#62748e]">Success Rate</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-[#0f172b]">2.4x</span>
                <span className="text-[14px] text-[#62748e]">Growth Factor</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-[#0f172b]">156</span>
                <span className="text-[14px] text-[#62748e]">Key Insights</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-[#0f172b]">43K</span>
                <span className="text-[14px] text-[#62748e]">Data Points</span>
              </div>
            </div>

            {/* Feature cards — 2x2 grid */}
            <div className="px-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-[#efeae6] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="#14151d" strokeWidth="1.5"/><circle cx="12" cy="12" r="7" stroke="#14151d" strokeWidth="1.5"/><circle cx="12" cy="12" r="10" stroke="#14151d" strokeWidth="1.5"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-[#14151d]">Market Opportunity</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#14151d]">Identified untapped market segments with high growth potential and minimal competition.</span>
                </div>
                <div className="bg-white rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-[#efeae6] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#14151d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-[#14151d]">User Behavior</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#14151d]">Uncovered critical user patterns that drive engagement and increase retention rates.</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-[#efeae6] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#14151d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-[#14151d]">Performance Gains</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#14151d]">Discovered optimization opportunities that significantly improve system efficiency.</span>
                </div>
                <div className="bg-white rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-[#efeae6] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#14151d" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="#14151d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-[#14151d]">Innovation Paths</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#14151d]">Revealed novel approaches to solving persistent challenges in the domain.</span>
                </div>
              </div>
            </div>

            {/* Visual Examples — carousel */}
            <VisualExamplesCarousel />
          </div>

          {/* Outcome card — inverted (dark) */}
          <div className="bg-[#14151d] rounded-2xl py-4 flex flex-col gap-9 max-w-[982px] mt-9">
            {/* Header */}
            <div className="px-6 flex flex-col gap-4">
              <div className="flex">
                <span className="inline-flex items-center gap-1.5 bg-[#a1ff62] text-[#14151d] text-[14px] leading-[20px] rounded-full px-3 py-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="3" fill="#14151d"/></svg>
                  Outcome
                </span>
              </div>
              <h2 className="text-[40px] font-medium leading-[84px] text-white">What changed after all this</h2>
            </div>

            {/* Description */}
            <p className="px-6 text-[20px] font-normal leading-[36px] text-[#efeae6]">
              Over 14 months of phased improvements, LittleList went from a wedding registry clone to a focused baby planning platform. Every release was measured, tested, and iterated on — resulting in compound growth across all key metrics.
            </p>

            {/* Validation badge — inverted */}
            <div className="px-6">
              <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-2 text-[14px] leading-[21px] text-[#efeae6]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 14l4-6 4 3 6-8" stroke="#efeae6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All metrics measured over a 14-month period
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 px-6">
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-white">+374%</span>
                <span className="text-[14px] text-[#62748e]">Revenue (Pledges)</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-white">+101%</span>
                <span className="text-[14px] text-[#62748e]">Page Views</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-white">~6X</span>
                <span className="text-[14px] text-[#62748e]">Onboarding Conversion</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-[48px] font-normal leading-[48px] text-white">+128%</span>
                <span className="text-[14px] text-[#62748e]">Published Lists</span>
              </div>
            </div>

            {/* Feature cards — inverted 2x2 */}
            <div className="px-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-white/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#efeae6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-white">Acquisition Funnel</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#efeae6]">Rebuilt entry points, messaging, and registration flow to convert organic traffic into active users.</span>
                </div>
                <div className="bg-white/10 rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-white/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#efeae6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-white">Engagement & Retention</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#efeae6]">Dashboard, checklist, and personalised recommendations gave users reasons to return.</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-white/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#efeae6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-white">Onboarding Overhaul</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#efeae6]">Replaced the generic form with a 5-step quiz that delivered immediate personalised value.</span>
                </div>
                <div className="bg-white/10 rounded-[14px] p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-white/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#efeae6" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="#efeae6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-[17px] font-medium leading-[28px] text-white">Cross-team Impact</span>
                  <span className="text-[14px] font-normal leading-[23px] text-[#efeae6]">Collaborated across Product, Marketing, Support, and Purchasing to amplify UX improvements.</span>
                </div>
              </div>
            </div>

            {/* Full-width image — 5:4 ratio */}
            <div className="px-6">
              <div className="w-full aspect-[5/4] rounded-lg bg-[#2a2b2a] overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80"
                  alt="Outcome overview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right column — sticky sidebar */}
        <aside className="lg:w-[320px] xl:w-[360px] shrink-0">
          <div className="lg:sticky lg:top-28">
            {/* White top section */}
            <div className="bg-white rounded-t-2xl pt-3 pb-6 flex flex-col gap-6">
              <div className="px-4 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-semibold uppercase text-[#14151d] leading-[27.6px]">
                    Project
                  </span>
                  <Image
                    src="https://res.cloudinary.com/dndgsrgbl/image/upload/v1774202946/ll_logo_bw_sbg1x5.svg"
                    alt="LittleList"
                    width={128}
                    height={27}
                    unoptimized
                  />
                  <p className="text-[14px] font-normal leading-[21px] text-[#232423]">
                    Baby registry &amp; baby shopping platform.<br />
                    Turning overwhelm into clarity for both LittleList and expectant parents.
                  </p>
                </div>
                <a
                  href="https://www.littlelist.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#a1ff62] text-[#14151d] text-[14px] font-medium leading-[21px] rounded-sm px-4 py-2 w-fit"
                >
                  Visit Website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Tags */}
              <div className="px-4 flex flex-wrap gap-1.5">
                {sidebarTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f9f5f2] text-[14px] text-[#232423] rounded-lg px-2 py-1 leading-[21px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Dark bottom section — scroll nav */}
            <div className="bg-[#14151d] rounded-b-2xl pt-2 pb-4 flex flex-col overflow-hidden">
              <div className="px-4">
                <span className="text-[10px] font-semibold uppercase text-[#efeae6] leading-[27.6px]">
                  Going through sections
                </span>
              </div>
              <div
                ref={scrollRef}
                className="overflow-x-auto pl-4 pr-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <nav className="flex items-center gap-0 whitespace-nowrap h-9">
                  {sections.map(({ id, label }, i) => (
                    <span key={id} className="contents">
                      <a
                        href={`#${id}`}
                        data-section={id}
                        className={`text-[16px] shrink-0 transition-all duration-300 ${
                          activeSection === id
                            ? "bg-white text-[#14151d] font-medium px-3 py-1 rounded-full"
                            : "text-[#efeae6] font-normal"
                        }`}
                      >
                        {label}
                      </a>
                      {i < sections.length - 1 && (
                        <span className="text-[13px] text-[#efeae6] mx-1 shrink-0">→</span>
                      )}
                    </span>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </aside>
      </div>
      </div>
    </main>
  );
}
