import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/logo.webp";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobilePhones, setShowMobilePhones] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const { t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside of the header
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setShowMobilePhones(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  const phoneNumbers = [
    { number: "+998 99 863 5050", link: "tel:+998998635050" },
    { number: "+998 71 200 5051", link: "tel:+998712005051" },
  ];

  const navLinks = [
    { label: t.nav.home, href: "#hero", minW: "min-w-[88px]" },
    { label: t.nav.products, href: "#products", minW: "min-w-[88px]" },
    { label: t.nav.about, href: "#about", minW: "min-w-[108px]" },
    { label: t.nav.contact, href: "#contact", minW: "min-w-[76px]" },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300"
    >
      {/* Floating White Pill Bar */}
      <div
        className={`w-full max-w-[1280px] mx-auto rounded-full backdrop-blur-xl border pointer-events-auto transition-all duration-300 ${
          scrolled || open
            ? "bg-white/95 border-[#0B2E17]/[0.12] shadow-[0_12px_36px_rgba(11,46,23,0.1)]"
            : "bg-white/80 border-[#0B2E17]/[0.08] shadow-[0_8px_30px_rgba(11,46,23,0.06)]"
        } flex items-center justify-between h-13 sm:h-14 md:h-16 px-3.5 sm:px-5 md:px-6`}
      >
        {/* Brand Logo (Colour version for light background) */}
        <a href="#hero" aria-label="Modul Bino — Bosh sahifa" className="flex items-center gap-2 group flex-shrink-0">
          <img
            src={logo}
            alt="Modul Bino — Zamonaviy Modul Qurilish"
            className="h-6 sm:h-8 md:h-9 w-auto transition-all duration-300 group-hover:scale-105"
            width="140"
            height="36"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative text-sm font-medium transition-colors duration-200 group py-1 text-center ${link.minW} ${
                activeLink === link.href ? "text-[#0B2E17] font-semibold" : "text-[#3F5247] hover:text-[#0B2E17]"
              }`}
            >
              <span className="block">{link.label}</span>
              <span
                className={`absolute bottom-0 left-0 h-[2.5px] rounded-full transition-all duration-300 bg-[#A8E063] ${
                  activeLink === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher transparent={false} />

          {/* Call button — Deep Green Background, White Text */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="relative bg-[#145C2B] text-white hover:bg-[#0B2E17] px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 overflow-hidden group cursor-pointer transition-all duration-300 shadow-[0_4px_16px_rgba(20,92,43,0.2)] hover:shadow-[0_8px_24px_rgba(20,92,43,0.35)] hover:-translate-y-0.5">
                <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{t.nav.callUs}</span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-56 backdrop-blur-xl bg-white border border-[#0B2E17]/[0.08] shadow-2xl text-[#0B2E17] rounded-2xl p-4">
              <div className="space-y-3">
                <p className="text-sm font-bold text-[#0B2E17] font-heading">
                  {t.nav.callUs}
                </p>
                <div className="space-y-2">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone.number}
                      href={phone.link}
                      className="flex items-center gap-2 text-sm text-[#145C2B] hover:text-[#0B2E17] font-medium transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145C2B] flex-shrink-0" />
                      {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher transparent={false} />
          <button
            aria-label="Menyu"
            className="p-1.5 rounded-lg text-[#0B2E17] hover:bg-[#0B2E17]/[0.06] transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden max-w-[1280px] mx-auto mt-2 rounded-2xl backdrop-blur-2xl bg-white/95 border border-[#0B2E17]/[0.08] shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium transition-colors px-3 py-2.5 rounded-xl flex items-center justify-between ${
                    activeLink === link.href
                      ? "text-[#145C2B] bg-[#E4F2D3]/40 font-bold"
                      : "text-[#3F5247] hover:text-[#0B2E17] hover:bg-[#0B2E17]/[0.04]"
                  }`}
                >
                  <span>{link.label}</span>
                  {activeLink === link.href && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8E063]" />
                  )}
                </a>
              ))}
              <div className="mt-2 pt-3 border-t border-[#0B2E17]/[0.08] space-y-2">
                <button
                  onClick={() => setShowMobilePhones(!showMobilePhones)}
                  className="bg-[#145C2B] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 justify-center w-full cursor-pointer transition-all duration-200 shadow-[0_4px_16px_rgba(20,92,43,0.2)]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.nav.callUs}</span>
                </button>
                <AnimatePresence>
                  {showMobilePhones && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#0B2E17]/[0.04] rounded-xl p-3 space-y-2 mt-1 border border-[#0B2E17]/[0.06]">
                        {phoneNumbers.map((phone) => (
                          <a
                            key={phone.number}
                            href={phone.link}
                            className="flex items-center justify-center gap-2 text-sm text-[#145C2B] hover:text-[#0B2E17] font-medium transition-colors py-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#145C2B] flex-shrink-0" />
                            {phone.number}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
