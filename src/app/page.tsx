import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Work />
      <Contact />
      <footer className="border-t border-neutral-100 py-8 px-6 max-w-6xl mx-auto">
        <p className="text-[13px] text-neutral-400">© 2026 Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
