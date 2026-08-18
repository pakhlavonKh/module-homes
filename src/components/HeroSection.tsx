import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import CountUp from "@/components/CountUp";
import heroImg from "@/assets/hero-1.webp";

const heroStats = [
  { end: 100, suffix: "+", label: "Loyihalar" },
  { end: 5,  suffix: "+", label: "Yillik tajriba" },
  { end: 6,   suffix: "",  label: "Mahsulot turi" },
  { end: 100, suffix: "%", label: "Kafolat" },
];

const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* ── Background ────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Modul Bino — Zamonaviy modul binolar va ko'chma uylar"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      {/* ── Subtle grid overlay ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="container relative z-10 pt-20 md:pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary-foreground text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {t.hero.badge}
          </span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[4.5rem] font-heading font-black text-primary-foreground leading-[1.05] mb-6 tracking-tight"
          >
            {t.hero.title}{" "}
            <span className="opacity-75 italic font-extrabold">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-l text-primary-foreground/75 mb-10 max-w-xl leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-8 md:mb-10"
          >
            <a
              href="#products"
              className="group relative bg-primary-foreground text-primary px-8 py-3.5 rounded-full font-heading font-bold text-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              {t.hero.viewProducts}
            </a>
            <a
              href="#contact"
              className="border border-white/30 text-primary-foreground px-8 py-3.5 rounded-full font-heading font-semibold text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
            >
              {t.hero.contactUs}
            </a>
          </motion.div>

          {/* Stats strip with CountUp */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-10"
          >
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col"
              >
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={1.2}
                  className="text-2xl md:text-3xl font-heading font-black text-primary-foreground leading-none tabular-nums"
                />
                <span className="text-xs text-primary-foreground/60 mt-1.5 font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-primary-foreground/40 text-[10px] uppercase tracking-widest font-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/30 overflow-hidden rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;
