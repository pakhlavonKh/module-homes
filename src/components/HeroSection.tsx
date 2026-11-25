import { useRef } from "react";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CountUp from "@/components/CountUp";
import featuredBuildingImg from "@/assets/two-story.webp";

const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const stats = [
    { end: 100, suffix: "+", label: t.hero.stats.projects },
    { end: 5, suffix: "+", label: t.hero.stats.experience },
    { end: 9, suffix: "", label: t.hero.stats.productTypes },
    { end: 100, suffix: "%", label: t.hero.stats.warranty },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] lg:min-h-[min(100svh,56.25rem)] flex flex-col justify-between pt-20 sm:pt-22 lg:pt-24 pb-3 sm:pb-4 lg:pb-5 overflow-hidden bg-[#F5F7F2]"
    >
      {/* ── Subtle Radial Tint (#E4F2D3 at ~40% opacity) behind Image Area ── */}
      <div
        className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[18.75rem] sm:w-[32.5rem] h-[18.75rem] sm:h-[32.5rem] rounded-full bg-[#E4F2D3] opacity-40 blur-[5rem] sm:blur-[8.125rem] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Main 2-Column Hero Container (shared site width / px-4 sm:px-6 lg:px-8) ── */}
      <div className="w-full max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center my-auto">
          {/* ── Left Column (~48% = 6 cols on lg) ────────────────────── */}
          <div className="min-w-0 lg:col-span-6 flex flex-col items-start w-full">
            {/* Pill Badge (White bg, thin border, lime animated dot, dark text) */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#0B2E17]/[0.08] text-[#0B2E17] text-xs sm:text-sm font-medium shadow-[0_2px_8px_rgba(11,46,23,0.04)] mb-3 sm:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8E063] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A8E063]" />
              </span>
              <span>{t.hero.badge}</span>
            </div>

            {/* Headline: Line 1 in --ink (#0B2E17), Line 2 in --green (#145C2B) with Lime Underline */}
            <h1
              className="font-heading font-bold tracking-tight mb-3 sm:mb-4 leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.5rem)" }}
            >
              <span className="text-[#0B2E17] block">{t.hero.title}</span>
              <span className="relative inline-block text-[#145C2B] mt-1">
                <span className="relative z-10">{t.hero.titleHighlight}</span>
                <span
                  className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 h-2 sm:h-2.5 bg-[#A8E063] -z-0 rounded-sm opacity-90"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Description: --text (#3F5247), 16-17px, max-width 500px */}
            <p className="text-[#3F5247] text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed max-w-[31.25rem] mb-5 sm:mb-6 font-normal">
              {t.hero.description}
            </p>

            {/* 2 Buttons (Both 52-56px high, pill radius) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Primary: --green (#145C2B) background, white text, arrow icon, hover lift & soft green shadow */}
              <a
                href="#products"
                className="h-[3.25rem] sm:h-[3.5rem] px-6 sm:px-8 rounded-full bg-[#145C2B] text-white font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(20,92,43,0.22)] hover:shadow-[0_12px_32px_rgba(20,92,43,0.35)] hover:bg-[#0B2E17] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>{t.hero.viewProducts}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              {/* Secondary: transparent, 1.5px solid --ink (#0B2E17) border, --ink text, hover fill */}
              <a
                href="#contact"
                className="h-[3.25rem] sm:h-[3.5rem] px-6 sm:px-8 rounded-full border-[1.5px] border-[#0B2E17] text-[#0B2E17] font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#0B2E17]/[0.06] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>{t.hero.contactUs}</span>
              </a>
            </div>
          </div>

          {/* ── Right Column (~52% = 6 cols on lg) ───────────────────── */}
          <div className="min-w-0 lg:col-span-6 relative mt-5 lg:mt-0 px-2 sm:px-4 w-full">
            {/* Lime-tinted rounded shape offset down and right for depth */}
            <div
              className="absolute inset-x-2 sm:inset-x-4 inset-y-0 translate-x-2 sm:translate-x-5 translate-y-2 sm:translate-y-5 rounded-[1.75rem] bg-[#E4F2D3] -z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Modular Building Photo with 28px Radius & Soft Large Shadow (grows on large screens, bounded by screen height) */}
            <div className="relative rounded-[1.75rem] overflow-visible shadow-[0_24px_60px_rgba(11,46,23,0.16)] bg-white aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10.5] max-h-[21.25rem] xl:max-h-[23.75rem] min-[1440px]:max-h-[min(30rem,calc(100svh-17rem))] w-full group">
              <img
                src={featuredBuildingImg}
                alt={t.hero.imageAlt}
                className="w-full h-full object-cover rounded-[1.75rem] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Floating Glass Card 1 (Sitting on top-left edge, half outside) */}
              <div
                className="absolute -top-3.5 -left-2 sm:-left-5 bg-white border border-[#0B2E17]/[0.08] rounded-xl p-2 sm:p-2.5 shadow-[0_12px_28px_rgba(11,46,23,0.08)] flex items-center gap-2 sm:gap-2.5 z-20 pointer-events-none animate-float-1"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E4F2D3] flex items-center justify-center text-[#145C2B] flex-shrink-0">
                  <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[0.6875rem] sm:text-xs font-bold font-heading text-[#0B2E17] leading-tight">
                    {t.hero.cards.range.title}
                  </p>
                  <p className="text-[0.5625rem] sm:text-[0.625rem] text-[#3F5247] font-medium mt-0.5">
                    {t.hero.cards.range.subtitle}
                  </p>
                </div>
              </div>

              {/* Floating Glass Card 2 (Sitting on bottom-right edge, half outside) */}
              <div
                className="absolute -bottom-3.5 right-0 sm:-right-5 bg-white border border-[#0B2E17]/[0.08] rounded-xl p-2 sm:p-2.5 shadow-[0_12px_28px_rgba(11,46,23,0.08)] flex items-center gap-2 sm:gap-2.5 z-20 pointer-events-none animate-float-2"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E4F2D3] flex items-center justify-center text-[#145C2B] flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[0.6875rem] sm:text-xs font-bold font-heading text-[#0B2E17] leading-tight">
                    {t.hero.cards.delivery.title}
                  </p>
                  <p className="text-[0.5625rem] sm:text-[0.625rem] text-[#3F5247] font-medium mt-0.5">
                    {t.hero.cards.delivery.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: Pinned Glassmorphism Stats Bar ─────────────────── */}
        <div
          className="w-full bg-white border border-[#0B2E17]/[0.08] rounded-2xl shadow-[0_8px_28px_rgba(11,46,23,0.05)] p-2.5 sm:p-3.5 lg:p-4 mt-4 lg:mt-5"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-[#0B2E17]/[0.08]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center text-center p-2 sm:p-2.5 ${
                  i === 1 ? "border-l lg:border-l-0 border-[#0B2E17]/[0.08]" : ""
                } ${i === 3 ? "border-l lg:border-l-0 border-[#0B2E17]/[0.08]" : ""}`}
              >
                <div className="flex items-baseline justify-center">
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={1.5}
                    className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-heading font-bold text-[#145C2B] leading-none tracking-tight tabular-nums"
                  />
                </div>
                <span className="text-[0.625rem] sm:text-[0.6875rem] text-[#3F5247] font-semibold uppercase tracking-[0.08em] mt-1 font-body">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
