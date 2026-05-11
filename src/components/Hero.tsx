const CREAM = "#EEEDE3";
const ORANGE = "#FD7B03";
const INK = "#000000";
const GREEN = "#a1ff62";
const LOGO_URL =
  "https://res.cloudinary.com/dndgsrgbl/image/upload/v1777556053/logo_placeholder_kl8zsg.svg";

function PhraseUnderline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className="absolute left-[1%] right-[-2%] -bottom-[0.1em] w-[101%] h-[0.18em] pointer-events-none"
    >
      <path
        d="M 2 8 Q 50 1, 110 5 T 198 3"
        stroke={GREEN}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: 240,
          strokeDashoffset: 240,
          animation: "hero-underline-draw 1.1s cubic-bezier(0.65, 0, 0.35, 1) 0.5s forwards",
        }}
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-between px-8 md:px-16 pt-20 md:pt-24 pb-32 md:pb-36"
      style={{
        background: `linear-gradient(to bottom, ${CREAM} 0%, ${CREAM} 72%, ${ORANGE} 100%)`,
        color: INK,
      }}
    >
      <div
        aria-hidden="true"
        className="hero-dragon mt-20 md:mt-28"
        style={{
          WebkitMaskImage: `url(${LOGO_URL})`,
          maskImage: `url(${LOGO_URL})`,
        }}
      />

      <div className="flex flex-col items-center text-center gap-3 md:gap-4 max-w-[1100px]">
        <h1
          style={{
            fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
            fontWeight: 500,
            color: INK,
            fontSize: "clamp(2rem, 5.5vw, 60px)",
            lineHeight: "normal",
            letterSpacing: 0,
          }}
        >
          Hi, I&rsquo;m Kseniia
        </h1>

        <h2
          style={{
            fontFamily: "var(--font-instrument-serif), serif",
            fontWeight: 400,
            color: INK,
            fontSize: "clamp(1.75rem, 5.5vw, 60px)",
            lineHeight: 64 / 60,
            letterSpacing: "-0.3px",
          }}
        >
          Senior Product Designer specialising in{" "}
          <span className="relative inline-block">
            complex consumer
            <PhraseUnderline />
          </span>{" "}
          products.
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
        <span
          className="rounded-full px-5 py-2.5 bg-white"
          style={{ color: INK }}
        >
          Based in London · No UK sponsorship needed
        </span>
        <span aria-hidden style={{ color: INK }} className="opacity-50">·</span>
        <span
          className="rounded-full px-5 py-2.5 bg-white"
          style={{ color: INK }}
        >
          Currently at The Cambium Group
        </span>
      </div>
    </section>
  );
}
