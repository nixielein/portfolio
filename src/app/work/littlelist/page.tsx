"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const CREAM = "#EEEDE3";
const ORANGE = "#FD7B03";
const GREEN = "#a1ff62";
const INK = "#000000";

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
  { id: "intro", label: "Intro" },
  { id: "phases", label: "Project Phases" },
  { id: "research", label: "Research" },
  { id: "homepage", label: "Homepage" },
  { id: "onboarding", label: "Onboarding" },
  { id: "blog", label: "Blog" },
  { id: "dashboard", label: "Dashboard & Checklist" },
  { id: "outcome", label: "Outcome" },
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

    const activeEl = container.querySelector(
      `[data-section="${activeSection}"]`
    ) as HTMLElement | null;
    if (!activeEl) return;

    const activeIdx = sections.findIndex((s) => s.id === activeSection);
    const prevEl =
      activeIdx > 0
        ? (container.querySelector(
            `[data-section="${sections[activeIdx - 1].id}"]`
          ) as HTMLElement | null)
        : null;

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] rounded-full px-3 py-1.5"
      style={{
        background: GREEN,
        color: INK,
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: INK }} />
      {children}
    </span>
  );
}

function MediaPlaceholder({
  aspectRatio = "16/10",
  label = "Image Placeholder",
}: {
  aspectRatio?: string;
  label?: string;
}) {
  return (
    <div
      className="bg-neutral-100 rounded-[4px] flex items-center justify-center"
      style={{ aspectRatio }}
    >
      <span className="text-neutral-400 text-[10px] tracking-[0.22em] uppercase font-semibold">
        {label}
      </span>
    </div>
  );
}

function StatBlock({
  value,
  label,
  inverted = false,
}: {
  value: string;
  label: string;
  inverted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-semibold"
        style={{
          fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
          fontSize: "clamp(1.75rem, 2.4vw, 2.5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: inverted ? "#fff" : INK,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-instrument-serif), serif",
          fontSize: "clamp(0.875rem, 1vw, 1.0625rem)",
          lineHeight: 1.3,
          color: inverted ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-instrument-serif), serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "clamp(1.875rem, 3.2vw, 2.625rem)",
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
  fontSize: "17px",
  lineHeight: 1.65,
};

const calloutStyle: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif), serif",
  fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
  lineHeight: 1.45,
  letterSpacing: "-0.005em",
};

export default function LittleListPage() {
  const activeSection = useActiveSection();
  const scrollRef = useSectionScroll(activeSection);

  return (
    <main className="pt-28 pb-32" style={{ background: CREAM, color: INK }}>
      <div className="w-[92%] max-w-[1400px] mx-auto">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[14px] hover:opacity-70 transition-opacity mb-10"
          style={{ color: INK }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M13 8H3M7 4l-4 4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to all work
        </Link>

        {/* Title */}
        <h1
          className="mb-10 max-w-[1100px]"
          style={{
            fontFamily: "var(--font-instrument-serif), serif",
            fontWeight: 400,
            fontSize: "clamp(2.25rem, 5.6vw, 72px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        >
          LittleList:{" "}
          <span style={{ color: ORANGE }}>fixing acquisition and engagement</span>
        </h1>

        {/* Meta pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="bg-white rounded-full px-4 py-2 text-[13px] tracking-[0.16em] uppercase font-semibold" style={{ fontFamily: "var(--font-inter-tight)" }}>
            Lead Product Designer · Growth
          </span>
          <span className="bg-white rounded-full px-4 py-2 text-[13px] tracking-[0.16em] uppercase font-semibold" style={{ fontFamily: "var(--font-inter-tight)" }}>
            2024–2025
          </span>
          <span className="bg-white rounded-full px-4 py-2 text-[13px] tracking-[0.16em] uppercase font-semibold" style={{ fontFamily: "var(--font-inter-tight)" }}>
            Figma · GA4 · Hotjar · Adobe
          </span>
        </div>

        {/* Hero media */}
        <div className="mb-16">
          <MediaPlaceholder aspectRatio="16/8" label="Hero Image / Video" />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left column — content */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            {/* Intro */}
            <section
              id="intro"
              className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
            >
              <SectionLabel>Intro</SectionLabel>
              <SectionHeading>Oh hello! What&rsquo;s going on here?</SectionHeading>
              <div style={bodyStyle} className="flex flex-col gap-4">
                <p>
                  I joined LittleList at an interesting stage for the business — the startup was already fully launched and functional, and the concept seemed to be getting a good response from users. With decent marketing support, people were coming to the LittleList website, but leaving almost immediately. My task was to identify the acquisition blockers and get the cogs moving.
                </p>
                <p>
                  LittleList is part of Cambium Group, which also runs three wedding gift list services. The platform was built on the same tech stack and user flows as its sister brands — an approach that got the MVP live quickly, but wasn&rsquo;t tailored to the very different needs of first-time parents navigating an overwhelming life stage.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6 pt-6 border-t border-black/10">
                <StatBlock value="+374%" label="pledges" />
                <StatBlock value="+101%" label="page views" />
                <StatBlock value="+128%" label="published lists" />
                <StatBlock value="~6×" label="conversion rate" />
              </div>
            </section>

            {/* Phases */}
            <section
              id="phases"
              className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
            >
              <SectionLabel>Project Phases</SectionLabel>
              <SectionHeading>14 months, six phases</SectionHeading>
              <p style={calloutStyle} className="text-black/80">
                A phased plan, executed alongside Product, Marketing, Support, and Purchasing — each release measured, then iterated on before the next.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {[
                  { phase: "Phase 1", when: "Nov–Dec 2023", title: "UX Audit & Research" },
                  { phase: "Phase 2", when: "Jan–Mar 2024", title: "Strategy & Roadmap" },
                  { phase: "Phase 3", when: "April 2024", title: "Homepage Redesign", results: "ATL value +75% · Engagement time +54% · Bounce rate −14%" },
                  { phase: "Phase 4", when: "August 2024", title: "Onboarding & Personalised Recommendations", results: "Completion 35% → 80% · TYFR add-to-list 13% → 38% · Returning users +24%" },
                  { phase: "Phase 5", when: "Nov 2024–Jan 2025", title: "Dashboard, Checklist & Add More Products" },
                  { phase: "Phase 6", when: "Dec 2024–Jan 2025", title: "Navigation & Category Improvements" },
                  { phase: "Throughout", when: "2024–Q1 2025", title: "Continuous Improvements", results: "Baby Brains queries +37% YoY" },
                ].map(({ phase, when, title, results }) => (
                  <div
                    key={phase + when}
                    className="border border-black/10 rounded-[4px] p-4 flex flex-col gap-1"
                  >
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <span
                        className="text-[11px] uppercase tracking-[0.22em] font-semibold"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                      >
                        {phase} · {when}
                      </span>
                    </div>
                    <span
                      className="text-[17px] font-medium"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {title}
                    </span>
                    {results && (
                      <span
                        style={{
                          fontFamily: "var(--font-instrument-serif), serif",
                          fontSize: "15px",
                          lineHeight: 1.45,
                          color: "rgba(0,0,0,0.7)",
                        }}
                      >
                        {results}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Research */}
            <section
              id="research"
              className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
            >
              <SectionLabel>Research & Discovery</SectionLabel>
              <SectionHeading>UX audit & user interviews</SectionHeading>
              <div style={bodyStyle} className="flex flex-col gap-4">
                <p>
                  I started by going through the website flows myself, then dug into the data — GA4 for traffic patterns, Hotjar for heatmaps and session recordings. The main entry points were the homepage (ads and socials), blog posts (organic), and product categories (organic + ads). The number of users who clicked &ldquo;Sign up&rdquo; was very low, and of those who started, only about 35% finished registration.
                </p>
                <p>
                  We ran multiple interviews and collected feedback in one structured working file — sorted by Good / Neutral / Bad and Product / Logistics, then pulled out the key insights that shaped the order of changes we made.
                </p>
              </div>

              <div
                className="rounded-[4px] p-5 my-2"
                style={{ background: GREEN }}
              >
                <p style={calloutStyle}>
                  <strong>We needed to unblock the acquisition funnel first;</strong> otherwise, there was no way to fix the rest.
                </p>
              </div>

              <h3
                className="text-[18px] font-semibold mt-2"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Strategic findings
              </h3>
              <ul className="flex flex-col gap-3" style={bodyStyle}>
                {[
                  <><strong>Homepage</strong> needs a clear value prop, trust signals, and better visibility for products and recommendations.</>,
                  <><strong>Onboarding</strong> needs to bring more value to the experience instead of being a long, boring form.</>,
                  <><strong>Baby Experts</strong> — actual humans users can call or message — are a massive USP.</>,
                  <><strong>Dashboard and Checklist</strong> are great features; they&rsquo;re just not delivering the value they should currently.</>,
                  <><strong>Navigation</strong> needs improvement, through the catalogue and informational pages. More cross-linking is needed.</>,
                  <>Users want to add <strong>products from other sites</strong> to their list. The option existed but was limited and hidden.</>,
                  <>The <strong>blog</strong> gets great organic traffic — but it ends there. People are not moving further into the website.</>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: ORANGE }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                <MediaPlaceholder aspectRatio="4/3" label="Audit screenshot" />
                <MediaPlaceholder aspectRatio="4/3" label="Heatmap" />
                <MediaPlaceholder aspectRatio="4/3" label="Interview notes" />
              </div>
            </section>

            {/* Homepage */}
            <section
              id="homepage"
              className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
            >
              <SectionLabel>Homepage Redesign</SectionLabel>
              <SectionHeading>Less text, more doing</SectionHeading>
              <div style={bodyStyle} className="flex flex-col gap-4">
                <p>
                  The homepage is one of the website&rsquo;s entry points and needed clearer messaging and more actionable elements. Busy, on-the-go users — 85% on mobile — view LittleList differently from wedding gift lists, which are usually explored at home on bigger screens.
                </p>
                <p className="font-medium">A few key conceptual changes vs. the old version:</p>
                <ul className="flex flex-col gap-2 pl-1">
                  {[
                    "Less text, more actionable elements.",
                    "Enough actionable elements within the first screen to grab users who don't scroll.",
                    "Clear messaging about what LittleList does.",
                    "Improved mobile experience.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                        style={{ background: ORANGE }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Results 3 weeks after launch already indicated higher acquisition quality and more engaged users — likely because the homepage now clearly communicates what LittleList is and what you can do here. More actionable links drove users into categories and products, positively impacting browsing depth, engagement, and add-to-list rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <MediaPlaceholder aspectRatio="4/3" label="Old homepage" />
                <MediaPlaceholder aspectRatio="4/3" label="New homepage" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6 pt-6 border-t border-black/10">
                <StatBlock value="+75%" label="add-to-list value" />
                <StatBlock value="+54%" label="avg engagement time" />
                <StatBlock value="−14%" label="bounce rate" />
                <StatBlock value="+12%" label="page views" />
                <StatBlock value="+99%" label="add-to-list quantity" />
                <StatBlock value="+32%" label="add-to-list per user" />
                <StatBlock value="+55%" label="lists published" />
                <StatBlock value="+89%" label="sale value" />
              </div>
            </section>

            {/* Onboarding */}
            <section
              id="onboarding"
              className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
            >
              <SectionLabel>Onboarding</SectionLabel>
              <SectionHeading>From form to personalisation quiz</SectionHeading>
              <div style={bodyStyle} className="flex flex-col gap-4">
                <p>
                  Only about 35% of users who started onboarding actually finished it. Looking at data, interviews, and a bit of intuition — there wasn&rsquo;t enough value or expectation-setting around whether the product would solve their problem, or at least bring them some joy.
                </p>
                <p>
                  The old onboarding was a simple form which, once completed, led to a generic &ldquo;Thank you for registering&rdquo; page with some popular products.
                </p>
                <p>
                  We replaced the form with a <strong>personalisation quiz</strong> — a win-win: a source of personalisation and curiosity for users, and more completed onboardings (plus more knowledge about our users) for us.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <MediaPlaceholder aspectRatio="9/16" label="Old onboarding" />
                <MediaPlaceholder aspectRatio="9/16" label="Quiz step 1" />
                <MediaPlaceholder aspectRatio="9/16" label="Personalised TYFR" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6 pt-6 border-t border-black/10">
                <StatBlock value="35% → 80%" label="onboarding completion" />
                <StatBlock value="13% → 38%" label="TYFR add-to-list" />
                <StatBlock value="45% → 53%" label="first-session add-to-list" />
                <StatBlock value="+24%" label="returning users" />
              </div>
            </section>

            {/* Blog */}
            <section
              id="blog"
              className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
            >
              <SectionLabel>Blog</SectionLabel>
              <SectionHeading>Blog changes didn&rsquo;t work out</SectionHeading>
              <div style={bodyStyle} className="flex flex-col gap-4">
                <p>
                  Blog articles were getting a large amount of organic hits, so we planned a &ldquo;quick win&rdquo;: a small informational block, cross-links to related content, and more readable formatting.
                </p>
                <p>
                  It turned out that readers landing on &ldquo;Top baby names&rdquo;-type articles (our most popular) and people who actually became users were two different audiences — blog readers mostly visited for fun and left after one article. The best we achieved with the first iteration was readers moving on to a couple more articles, but no conversions.
                </p>
                <p>
                  Given other priorities, we moved on — with the plan to return to the blog with more time for deeper research.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <MediaPlaceholder aspectRatio="4/3" label="Old blog post" />
                <MediaPlaceholder aspectRatio="4/3" label="New blog post" />
              </div>
            </section>

            {/* Dashboard & Checklist */}
            <section
              id="dashboard"
              className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
            >
              <SectionLabel>Dashboard & Checklist</SectionLabel>
              <SectionHeading>From dead-end to discovery hub</SectionHeading>
              <div style={bodyStyle} className="flex flex-col gap-4">
                <p>
                  After registration, users landed on a dashboard meant to be their organisational hub. It wasn&rsquo;t working — 51 seconds average before bouncing, frequent U-turns. A full rebuild wasn&rsquo;t possible due to developer availability, so we iterated:
                </p>
                <p>
                  Cleaned up the layout, improved mobile nav, and gave users clear starting points — personalised recommendations, Baby Experts booking, and a checklist progress bar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <MediaPlaceholder aspectRatio="16/10" label="Old dashboard (desktop)" />
                <MediaPlaceholder aspectRatio="16/10" label="New dashboard (desktop)" />
                <MediaPlaceholder aspectRatio="9/16" label="Old dashboard (mobile)" />
                <MediaPlaceholder aspectRatio="9/16" label="New dashboard (mobile)" />
              </div>

              <h3
                className="text-[20px] font-semibold mt-4"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                The Checklist — trapped in the wrong format
              </h3>
              <div style={bodyStyle} className="flex flex-col gap-4">
                <p>
                  The checklist was one of LittleList&rsquo;s most loved features, trapped in the wrong format. It lived as a floating popup that looked like a chatbot icon — users kept dismissing it, and it was unusable on mobile. Data showed 10K clicks/month from 1.7K users but only 6% converted to Add-to-List (Hotjar confirmed most clicks were accidental). Yet the feature was highly requested in interviews — so the value was there.
                </p>
                <p>
                  We gave it a proper home. Logged-out users see an animated landing page designed to make the checklist an incentive to register. Logged-in users get it as a dedicated dashboard tab, connected to their list with a sticky &ldquo;Back to Checklist&rdquo; button to keep them browsing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <MediaPlaceholder aspectRatio="9/16" label="Old checklist popup" />
                <MediaPlaceholder aspectRatio="9/16" label="New checklist tab" />
              </div>

              <div
                className="rounded-[4px] p-5 my-2"
                style={{ background: GREEN }}
              >
                <p style={calloutStyle}>
                  Checklist interactions went from <strong>not even appearing in the site&rsquo;s top 10 events</strong> to ranking in the top 5 — a direct result of moving it from a dismissable popup to a dedicated page with proper visibility.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 pt-6 border-t border-black/10">
                <StatBlock value="+71%" label="dashboard page views (2 months)" />
                <StatBlock value="+25%" label="share_your_list events" />
                <StatBlock value="+108%" label="group gifting" />
              </div>
            </section>

            {/* Outcome */}
            <section
              id="outcome"
              className="rounded-[4px] p-6 md:p-10 flex flex-col gap-6"
              style={{ background: INK, color: "#fff" }}
            >
              <SectionLabel>Outcome</SectionLabel>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.875rem, 3.2vw, 2.625rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                }}
              >
                From concept to product
              </h2>
              <div
                style={{
                  ...bodyStyle,
                  color: "rgba(255,255,255,0.85)",
                }}
                className="flex flex-col gap-4"
              >
                <p>
                  More than a year of teamwork, collaboration with users, and constant exploration moved LittleList from a good concept to a more flexible, usable product that started to match the rhythm and needs of its users — and it paid off: more engagement, retention, and trust have already led to more top-ups and pledges.
                </p>
                <p>
                  There&rsquo;s still a long way to go for LittleList to become an everyday planning tool and a widely recognisable registry + store + planning solution for expecting families. But the first steps have been made, the acquisition funnel is unblocked, and LittleList is ready to take the next step.
                </p>
              </div>

              <h3
                className="text-[15px] uppercase tracking-[0.22em] font-semibold mt-4"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Headline outcomes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6 pt-2">
                <StatBlock inverted value="+374%" label="pledges" />
                <StatBlock inverted value="+101%" label="page views" />
                <StatBlock inverted value="+128%" label="published lists" />
                <StatBlock inverted value="0.6% → 2.4%" label="conversion rate (~4×)" />
              </div>

              <div className="mt-4">
                <MediaPlaceholder aspectRatio="16/9" label="Outcome overview / final shot" />
              </div>
            </section>
          </div>

          {/* Right column — sticky sidebar */}
          <aside className="lg:w-[300px] xl:w-[340px] shrink-0">
            <div className="lg:sticky lg:top-28 flex flex-col">
              {/* White top section — project info */}
              <div className="bg-white rounded-t-[4px] pt-5 px-5 pb-6 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      color: "rgba(0,0,0,0.6)",
                    }}
                  >
                    Project
                  </span>
                  <span
                    className="text-[24px] font-semibold leading-tight"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    LittleList
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-instrument-serif), serif",
                      fontSize: "15px",
                      lineHeight: 1.45,
                    }}
                  >
                    Baby registry &amp; baby shopping platform. Turning overwhelm into clarity for both LittleList and expectant parents.
                  </p>
                  <a
                    href="https://www.littlelist.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-medium rounded-full px-4 py-2 w-fit hover:opacity-80 transition-opacity mt-1"
                    style={{ background: GREEN, color: INK, fontFamily: "var(--font-inter-tight)" }}
                  >
                    Visit Website
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {sidebarTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] rounded-[4px] px-2 py-1"
                      style={{
                        fontFamily: "var(--font-inter-tight)",
                        background: CREAM,
                        color: INK,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dark bottom — scroll nav */}
              <div
                className="rounded-b-[4px] pt-3 pb-4 flex flex-col overflow-hidden"
                style={{ background: INK }}
              >
                <div className="px-4 mb-2">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    Sections
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
                          className={`text-[15px] shrink-0 transition-all duration-300 ${
                            activeSection === id
                              ? "font-medium px-3 py-1 rounded-full"
                              : "font-normal"
                          }`}
                          style={{
                            fontFamily: "var(--font-inter-tight)",
                            background: activeSection === id ? GREEN : "transparent",
                            color: activeSection === id ? INK : "rgba(255,255,255,0.8)",
                          }}
                        >
                          {label}
                        </a>
                        {i < sections.length - 1 && (
                          <span className="text-[13px] mx-1 shrink-0" style={{ color: "rgba(255,255,255,0.5)" }}>
                            →
                          </span>
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
