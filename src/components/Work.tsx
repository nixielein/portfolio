interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  color: string;
}

const projects: Project[] = [
  { id: 1, title: "Banking App",       category: "Mobile · Product Design", year: "2025", color: "#e8e4ff" },
  { id: 2, title: "Design System",     category: "Web · Design System",     year: "2025", color: "#fde8d8" },
  { id: 3, title: "Dashboard",         category: "Web · Data Visualisation", year: "2024", color: "#d8f0e8" },
  { id: 4, title: "Brand Identity",    category: "Branding · Visual",        year: "2024", color: "#fdf4d8" },
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-6 max-w-6xl mx-auto">

      {/* Section header */}
      <div className="flex items-end justify-between mb-16">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tight leading-tight">
          Recent work
        </h2>
        <span className="text-[13px] text-neutral-400 mb-2">{projects.length} projects</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Thumbnail placeholder */}
            <div
              className="h-72 w-full transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundColor: project.color }}
            />

            {/* Meta */}
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="text-[18px] font-medium text-black">{project.title}</h3>
                <p className="text-[13px] text-neutral-400 mt-0.5">{project.category}</p>
              </div>
              <span className="text-[13px] text-neutral-400 mt-0.5">{project.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
