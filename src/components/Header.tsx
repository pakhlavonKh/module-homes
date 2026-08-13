import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/logo.webp";
import logoLight from "@/assets/logo-light.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumbers = [
    { number: "+998 99 863 5050", link: "tel:+998998635050" },
    { number: "+998 71 200 5051", link: "tel:+998712005051" },
  ];

  const navLinks = [
    // min-w values chosen to match the widest translation for each slot:
    // home:    "Bosh sahifa" (UZ) ~88px
    // products:"Mahsulotlar" (UZ) ~88px
    // about:   "Biz haqimizda" (UZ) ~104px
    // contact: "Kontakty" (RU) ~80px
    { label: t.nav.home,     href: "#hero",    minW: "min-w-[88px]"  },
    { label: t.nav.products, href: "#products", minW: "min-w-[88px]"  },
    { label: t.nav.about,    href: "#about",   minW: "min-w-[108px]" },
    { label: t.nav.contact,  href: "#contact", minW: "min-w-[76px]"  },
  ];

  // When transparent (at top): white text + light logo
  // When scrolled (glass bg): dark text + dark logo
  const isTransparent = !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "glass shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">

        {/* Logo — switches between light and dark variant */}
        <a href="#hero" className="flex items-center gap-2 group">
          <img
            src={isTransparent ? logoLight : logo}
            alt="MODUL BINO"
            className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative text-sm font-medium transition-colors duration-200 group py-1 text-center ${link.minW} ${
                isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <motion.span
                key={link.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {link.label}
              </motion.span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ${
                  isTransparent ? "bg-white" : "hero-gradient"
                } ${
                  activeLink === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}

          {/* Language switcher */}
          <div className={isTransparent ? "transparent-lang" : ""}>
            <LanguageSwitcher transparent={isTransparent} />
          </div>

          {/* Call button — pill shape */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="relative hero-gradient text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                <Phone className="w-4 h-4" />
                {t.nav.callUs}
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-56 glass-card border-border/50 shadow-xl">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  {t.nav.callUs}
                </p>
                <div className="space-y-2">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone.number}
                      href={phone.link}
                      className="flex items-center gap-2 text-sm text-accent hover:text-primary font-medium transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full hero-gradient flex-shrink-0" />
                      {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </nav>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher transparent={isTransparent} />
          <button
            className={`p-1.5 rounded-lg transition-colors ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-secondary"
            }`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden glass border-b border-border/50 overflow-hidden"
          >
            <div className="container py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors px-3 py-2.5 rounded-lg"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-2 pt-3 border-t border-border/50 space-y-2">
                <button className="hero-gradient text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 justify-center w-full">
                  <Phone className="w-4 h-4" />
                  {t.nav.callUs}
                </button>
                <div className="bg-secondary/40 rounded-xl p-3 space-y-2">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone.number}
                      href={phone.link}
                      className="flex items-center justify-center gap-2 text-sm text-accent hover:text-primary font-medium transition-colors py-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full hero-gradient flex-shrink-0" />
                      {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
