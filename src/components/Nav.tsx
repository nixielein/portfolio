"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const INK = "#000000";
const LOGO_URL =
  "https://res.cloudinary.com/dndgsrgbl/image/upload/v1777556053/logo_placeholder_kl8zsg.svg";
const SCROLL_THRESHOLD = 120;

function DownloadArrow() {
  return (
    <svg width="11" height="14" viewBox="0 0 12 16" fill="none" aria-hidden="true">
      <path
        d="M5.87524 0.000886895C7.1371 -0.0367514 6.9363 1.13148 6.93662 2.00054L6.9363 4.39627L6.9398 12.7685C7.32005 12.3213 10.4034 9.20506 10.6603 9.08304C10.901 8.96865 11.1965 8.97595 11.4387 9.07976C11.6809 9.18351 11.8489 9.36784 11.9378 9.61619C12.022 9.8507 12.0293 10.1319 11.9063 10.3561C11.7125 10.71 11.032 11.3122 10.726 11.6223L8.42891 13.9411L7.2563 15.1384C6.90124 15.5019 6.67781 15.8288 6.18377 15.9864C5.65277 16.0533 5.45548 15.8699 5.11013 15.5122C3.54545 13.8912 1.94689 12.3036 0.373635 10.6913C0.121806 10.433 -0.0161742 10.294 0.00151538 9.90378C0.0140734 9.65318 0.1248 9.4177 0.309377 9.24946C0.520472 9.05705 0.786581 8.97804 1.06808 8.99989C1.23032 9.01137 1.38615 9.06847 1.51788 9.16485C1.63236 9.24817 2.67337 10.3062 2.81097 10.4561C3.47935 11.1851 4.42677 12.017 5.04935 12.7518L5.04559 4.85266L5.04658 2.28495C5.04693 1.81804 5.03596 1.34708 5.05789 0.88114C5.0824 0.36067 5.40575 0.111453 5.87524 0.000886895Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 19.34 19.34" fill="none" aria-hidden="true">
      <path
        d="M18.7574 8.25736C19.5384 9.03841 19.5384 10.3047 18.7574 11.0858L11.0858 18.7574C10.3047 19.5384 9.03841 19.5384 8.25736 18.7574L0.585786 11.0858C-0.195262 10.3047 -0.195262 9.03841 0.585786 8.25736L8.25736 0.585786C9.03841 -0.195262 10.3047 -0.195262 11.0858 0.585786L18.7574 8.25736ZM2.19094 8.25736C1.40989 9.03841 1.40989 10.3047 2.19094 11.0858L8.25736 17.1522C9.03841 17.9333 10.3047 17.9333 11.0858 17.1522L17.1522 11.0858C17.9333 10.3047 17.9333 9.03841 17.1522 8.25736L11.0858 2.19094C10.3047 1.40989 9.03841 1.40989 8.25736 2.19094L2.19094 8.25736Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const SCROLL_RANGE = 240;
    const update = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / SCROLL_RANGE));
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
      setScrolled(progress > 0.5);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase = "text-[20px] hover:opacity-70 transition-opacity";

  return (
    <header
      className="fixed top-3 left-0 right-0 z-50 px-3 pointer-events-none"
      style={{ color: INK }}
    >
      <nav
        className="nav-shrink relative pointer-events-auto flex items-center justify-between mx-auto bg-white p-1.5 md:p-2 rounded-l-[4px] rounded-r-[30px]"
      >
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/work"
            className="bg-black text-white text-[20px] font-medium px-5 h-11 flex items-center rounded-[2px] hover:bg-neutral-800 transition-colors"
          >
            Product Design
          </Link>
          <a
            href="#playground"
            className="flex items-center gap-2 text-[20px] px-5 h-11 rounded-full transition-colors hover:bg-black/5"
            style={{ border: `1px solid ${INK}`, color: INK }}
          >
            Sidequests
            <DiamondIcon />
          </a>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href="/"
            aria-label="Home"
            className={`nav-logo-morph block ${
              scrolled ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <span
              aria-hidden="true"
              className="nav-logo block h-8 md:h-9"
              style={{
                WebkitMaskImage: `url(${LOGO_URL})`,
                maskImage: `url(${LOGO_URL})`,
              }}
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-7">
          <Link href="#about" className={linkBase}>
            About
          </Link>
          <Link href="#contact" className={linkBase}>
            Contact
          </Link>
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-1.5 bg-black text-white text-[20px] font-medium rounded-full pl-5 pr-4 h-11 hover:bg-neutral-800 transition-colors"
          >
            CV
            <DownloadArrow />
          </a>
        </div>

        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{ color: INK }}
        >
          <span className="block w-5 h-px mb-1.5" style={{ background: INK }} />
          <span className="block w-5 h-px mb-1.5" style={{ background: INK }} />
          <span className="block w-5 h-px" style={{ background: INK }} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="pointer-events-auto md:hidden absolute top-16 left-4 right-4 rounded-xl px-6 py-5 flex flex-col gap-3 bg-white shadow-lg"
          style={{ color: INK }}
        >
          <Link
            href="/work"
            className="bg-black text-white rounded-[2px] px-5 py-3 text-center text-[20px] font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Product Design
          </Link>
          <a
            href="#playground"
            className="flex items-center justify-center gap-2 text-[20px] px-5 py-3 rounded-full"
            style={{ border: `1px solid ${INK}` }}
            onClick={() => setMenuOpen(false)}
          >
            Sidequests
            <DiamondIcon />
          </a>
          <Link href="#about" className="text-[20px] py-2" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="#contact" className="text-[20px] py-2" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <a
            href="/cv.pdf"
            download
            className="flex items-center justify-center gap-2 bg-black text-white text-[20px] font-medium rounded-full px-5 py-3"
          >
            CV
            <DownloadArrow />
          </a>
        </div>
      )}
    </header>
  );
}
