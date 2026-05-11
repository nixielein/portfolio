const GREEN = "#a1ff62";
const INK = "#000000";
const CREAM = "#EEEDE3";

type Project = {
  title: string;
  period: string;
  scope: string;
  description: string;
  media?: string;
  stats: { value: string; label: string }[];
  href: string;
};

const projects: Project[] = [
  {
    title: "Littlelist: Fixing Acquisition And Engagement",
    period: "2024–2025",
    scope: "Acquisition Funnel Fix + Growth Focus",
    description:
      "Together with our Product Owner and Purchasing, Marketing, Support, and Content teams, I built a phased improvement strategy and executed it over the next year. Each release made an impact, and we saw consistent growth across key metrics.",
    media:
      "https://res.cloudinary.com/dndgsrgbl/video/upload/v1777634372/ll_cover_dnbpno.mov",
    stats: [
      { value: "~6X", label: "conversion rate" },
      { value: "+128%", label: "published lists" },
      { value: "+374%", label: "pledges" },
      { value: "+101%", label: "page views" },
    ],
    href: "/work/littlelist",
  },
  {
    title: "Drovo: Full App Redesign",
    period: "2023",
    scope: "B2C Acquisition + Retention & B2B Growth",
    description:
      "The project had two main goals: ensuring Driver satisfaction and engagement with the App, and improving the Advertiser experience by expanding the pool of available drivers and offering a wider range of vehicle types and service areas.",
    stats: [
      { value: "+50%", label: "new campaigns in 2 months" },
      { value: "2.5×", label: "longer app lifespan" },
    ],
    href: "/work/drovo",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-white rounded-[4px] p-6 md:p-10 flex flex-col gap-7 md:gap-9">
      <header className="flex flex-col gap-3">
        <h3
          className="leading-[1.15]"
          style={{
            fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "28px",
            letterSpacing: "-0.015em",
          }}
        >
          {project.title}
        </h3>
        <p
          className="tracking-[0.22em] uppercase opacity-70"
          style={{
            fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "10px",
          }}
        >
          <span>{project.period}</span>
          <span className="mx-2 opacity-60" aria-hidden>·</span>
          <span>{project.scope}</span>
        </p>
      </header>

      <p
        style={{
          fontFamily: "var(--font-instrument-serif), serif",
          fontSize: "clamp(1.0625rem, 1.4vw, 1.375rem)",
          lineHeight: 1.45,
          letterSpacing: "-0.005em",
        }}
      >
        {project.description}
      </p>

      <div
        className="aspect-[16/10] bg-neutral-100 rounded-[4px] overflow-hidden flex items-center justify-center"
        aria-label={`${project.title} preview`}
      >
        {project.media ? (
          /\.(mp4|webm|mov)(\?|$)/i.test(project.media) || project.media.includes("/video/") ? (
            <video
              src={project.media}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              aria-label={project.title}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.media}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <span className="text-neutral-400 text-[11px] tracking-[0.22em] uppercase">
            Image / Video Placeholder
          </span>
        )}
      </div>

      <div
        className={`grid gap-x-5 gap-y-6 ${
          project.stats.length <= 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"
        }`}
      >
        {project.stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div
              className="font-semibold"
              style={{
                fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                fontSize: "clamp(1.875rem, 2.5vw, 2.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              {stat.value}
            </div>
            <div
              className="opacity-80"
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
                lineHeight: 1.3,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <a
        href={project.href}
        className="self-start mt-auto inline-flex items-center bg-black text-white rounded-full px-6 py-3 text-[15px] font-medium hover:bg-neutral-800 transition-colors"
      >
        View Project
      </a>
    </article>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="featured-projects"
      className="px-6 md:px-12 pt-24 md:pt-32 pb-24 md:pb-32"
      style={{ background: CREAM, color: INK }}
    >
      <p
        className="max-w-[1100px] mx-auto text-center mb-20 md:mb-28"
        style={{
          fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
          fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)",
          lineHeight: 2.2,
        }}
      >
        I like messy problems, unclear journeys, and the kind of product work that needs both structure and good judgement. My strength is bringing direction: shaping clearer flows, improving existing experiences, and finding the balance between user needs and business goals.
      </p>

      <div className="text-center mb-12">
        <h2 className="relative inline-block">
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="200"
              cy="50"
              rx="190"
              ry="42"
              stroke={GREEN}
              strokeWidth="3"
              fill="none"
              transform="rotate(-2.5 200 50)"
            />
          </svg>
          <span
            className="relative inline-block px-12 py-4"
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.875rem, 3.2vw, 2.625rem)",
            }}
          >
            Featured Projects
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6 md:gap-8 max-w-[1400px] mx-auto">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}
