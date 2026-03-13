export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-16">
      <div className="max-w-4xl">
        <p className="text-[14px] text-neutral-400 tracking-widest uppercase mb-6">
          Product Designer
        </p>
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-medium leading-[1.05] tracking-tight text-black mb-8">
          Crafting digital
          <br />
          <span className="text-neutral-400">experiences</span> that
          <br />
          feel inevitable.
        </h1>
        <p className="text-[18px] text-neutral-500 leading-relaxed max-w-xl mb-10">
          I design products people love — from early concepts to polished interfaces.
          Currently open to new projects.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#work"
            className="inline-flex items-center gap-2 bg-black text-white text-[15px] font-medium rounded-full px-6 py-3 hover:bg-neutral-800 transition-colors"
          >
            View work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center text-[15px] font-medium text-black border border-neutral-200 rounded-full px-6 py-3 hover:bg-neutral-50 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
