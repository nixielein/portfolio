type InfoItem = {
  label: string;
  value: string;
};

type Metric = {
  category: string;
  value: string;
  label: string;
};

type CaseStudyIntroProps = {
  info: InfoItem[];
  description: React.ReactNode;
  metricsLabel?: string;
  metrics: Metric[];
  variant?: "dark" | "light";
};

export default function CaseStudyIntro({
  info,
  description,
  metricsLabel = "Some of the numbers:",
  metrics,
  variant = "light",
}: CaseStudyIntroProps) {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-col gap-10">
      {/* Info cards */}
      <div className="flex flex-col sm:flex-row gap-2">
        {info.map((item) => (
          <div
            key={item.label}
            className={`flex flex-col gap-2 rounded-2xl p-4 bg-[#141414] text-white transition-colors hover:bg-[#a1ff62] hover:text-[#141414] ${
              item.label === "Role" || item.label === "Year"
                ? "shrink-0"
                : "flex-1"
            }`}
          >
            <span className="text-[14px] font-semibold leading-[21px]">
              {item.label}
            </span>
            <span className="text-[14px] font-normal leading-[21px]">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className={`text-[16px] font-light leading-[1.7] ${
        isDark ? "text-[#f1f1f1]" : "text-[#4a4a4a]"
      }`}>
        {description}
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-6">
        <span className={`text-[16px] ${isDark ? "text-[#9f9f9f]" : "text-[#7a7a7a]"}`}>{metricsLabel}</span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span className={`text-[11px] uppercase ${isDark ? "text-[#9f9f9f]" : "text-[#7a7a7a]"}`}>
                {m.category}
              </span>
              <span className={`text-[clamp(3rem,5vw,5rem)] font-medium leading-[1] ${
                isDark ? "text-[#f1f1f1]" : "text-[#232423]"
              }`}>
                {m.value}
              </span>
              <span className={`text-[15px] ${isDark ? "text-[#9f9f9f]" : "text-[#7a7a7a]"}`}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
