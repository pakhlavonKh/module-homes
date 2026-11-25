import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n";

interface LanguageSwitcherProps {
  /** When true the switcher is rendered on a dark/hero background */
  transparent?: boolean;
}

const LANGS: Language[] = ["uz", "ru", "en"];
// Compact pill: one button wide (w-8 = 2rem), inside the container's p-1 (0.25rem).
// Sizes are in rem and the offset in % of the pill, so it stays aligned when the layout scales.
const PILL_W = "2rem";
const CONTAINER_PAD = "0.25rem";

const LanguageSwitcher = ({ transparent = false }: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();
  const activeIndex = LANGS.indexOf(language);

  return (
    <div
      className={`relative flex items-center rounded-full p-1 transition-colors duration-300 ${
        transparent ? "bg-white/10" : "bg-[#0B2E17]/[0.06] border border-[#0B2E17]/[0.05]"
      }`}
    >
      {/* Single sliding pill — always in DOM, just moves */}
      <motion.div
        className={`absolute top-1 h-7 rounded-full pointer-events-none ${
          transparent ? "bg-white" : "bg-[#0B2E17]"
        }`}
        style={{ width: PILL_W, left: CONTAINER_PAD }}
        animate={{ x: `${activeIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />

      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-label={t.common.switchLanguage[lang]}
          className={`relative z-10 w-8 h-7 flex items-center justify-center text-[0.6875rem] sm:text-xs font-semibold uppercase transition-colors duration-200 rounded-full cursor-pointer ${
            language === lang
              ? transparent
                ? "text-[#0B2E17]"
                : "text-white font-bold"
              : transparent
              ? "text-white/70 hover:text-white"
              : "text-[#3F5247] hover:text-[#0B2E17]"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
