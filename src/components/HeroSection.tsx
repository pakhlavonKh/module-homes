import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import heroImg from "@/assets/hero-1.webp";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Modul bino" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      <div className="container relative z-10 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-primary-foreground leading-tight mb-6">
            {t.hero.title}{" "}
            <span className="opacity-80">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg font-light">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-primary-foreground text-primary px-8 py-3.5 rounded-lg font-heading font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {t.hero.viewProducts}
            </a>
            <a
              href="#contact"
              className="border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-heading font-semibold text-sm hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
            >
              {t.hero.contactUs}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-6 h-6 text-primary-foreground/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
