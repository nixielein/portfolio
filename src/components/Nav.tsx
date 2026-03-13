"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Home">
          <div className="size-8 bg-black rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13 L8 3 L13 13 M5.5 9.5 H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-medium text-[15px] tracking-tight">Portfolio</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[14px] text-neutral-500 hover:text-black transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="/cv.pdf"
            download
            className="text-[14px] font-medium bg-black text-white rounded-full px-4 py-2 hover:bg-neutral-800 transition-colors"
          >
            Download CV
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-black mb-1.5" />
          <span className="block w-5 h-px bg-black mb-1.5" />
          <span className="block w-5 h-px bg-black" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[15px] text-neutral-700"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="/cv.pdf"
            download
            className="text-[14px] font-medium bg-black text-white rounded-full px-4 py-2 text-center"
          >
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
