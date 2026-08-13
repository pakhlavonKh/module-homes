import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n";

interface LanguageSwitcherProps {
  /** When true the switcher is rendered on a dark/hero background */
  transparent?: boolean;
}

const LANGS: Language[] = ["uz", "ru", "en"];
// Each button is w-9 (36px), no gap between them — pill moves by 36px per step
const PILL_W = 36;
const CONTAINER_PAD = 4; // p-1 = 4px

const LanguageSwitcher = ({ transparent = false }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const activeIndex = LANGS.indexOf(language);

  return (
    <div
      className={`relative flex items-center rounded-full p-1 transition-colors duration-300 ${
        transparent ? "bg-white/10" : "bg-secondary"
      }`}
    >
      {/* Single sliding pill — always in DOM, just moves */}
      <motion.div
        className={`absolute top-1 h-7 rounded-full pointer-events-none ${
          transparent ? "bg-white" : "hero-gradient"
        }`}
        style={{ width: PILL_W, left: CONTAINER_PAD }}
        animate={{ x: activeIndex * PILL_W }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />

      {LANGS.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`relative z-10 w-9 h-7 flex items-center justify-center text-xs font-semibold uppercase transition-colors duration-200 rounded-full ${
            language === lang
              ? transparent
                ? "text-primary"
                : "text-primary-foreground"
              : transparent
              ? "text-white/70 hover:text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
