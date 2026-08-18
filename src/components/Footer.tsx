import { useLanguage } from "@/context/LanguageContext";
import logo from "@/assets/logo-light.png";
import { Phone, Instagram, Globe, MapPin, ChevronRight, ArrowUp } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const socials = [
    { icon: Phone, href: "tel:+998998635050", label: "Telefon" },
    { icon: Instagram, href: "https://www.instagram.com/modul_bino/", label: "Instagram" },
    { icon: Globe, href: "https://module-homes.netlify.app/", label: "Veb-sayt" },
  ];

  return (
    <footer className="relative hero-gradient text-primary-foreground overflow-hidden pt-6">
      {/* Background grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container max-w-6xl relative z-10">
        {/* Compact Light Pre-footer CTA Card with readable font */}
        <div className="relative bg-card text-foreground rounded-2xl p-5 md:p-6 mb-6 card-shadow border border-border overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left max-w-xl">
              <span className="inline-block px-3 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-2 border border-accent/20">
                Loyihangiz bormi?
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-foreground tracking-tight">
                Zamonaviy modul bino qurishni rejalashtiryapsizmi?
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mt-1.5 font-normal leading-relaxed">
                Biz bilan bog'laning va bepul konsultatsiya hamda hisob-kitobga ega bo'ling.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
              <a
                href="#contact"
                className="hero-gradient text-primary-foreground px-6 py-3 rounded-full font-heading font-bold text-sm shadow hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>Biz bilan bog'lanish</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+998998635050"
                className="bg-secondary text-secondary-foreground border border-border px-6 py-3 rounded-full font-heading font-semibold text-sm hover:bg-secondary/80 transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>+998 99 863 5050</span>
              </a>
            </div>
          </div>
        </div>

        {/* Compact Footer Main Columns with larger font size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-6 border-b border-primary-foreground/20">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <a href="#hero" aria-label="Modul Bino — Bosh sahifa" className="inline-block group">
              <img
                src={logo}
                alt="Modul Bino — Zamonaviy Modul Qurilish"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                width="140"
                height="40"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="text-primary-foreground/85 text-sm leading-relaxed max-w-sm font-normal">
              {t.footer.slogan}. Ko'chma uylar, ofislar, sanoat inshootlari va modul sanuzllarni loyihalash hamda qurish xizmati.
            </p>

            <div className="pt-1 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-primary-foreground/90 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-primary-foreground uppercase tracking-wider">
              Bo'limlar
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary-foreground/50 group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-sm text-primary-foreground uppercase tracking-wider">
              Bog'lanish
            </h4>
            <div className="space-y-2.5 text-sm text-primary-foreground/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-foreground flex-shrink-0 mt-0.5" />
                <span>Shayhontohur tumani, Jangoh dahasi, 2</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-primary-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:+998998635050" className="block hover:text-primary-foreground transition-colors font-medium">
                    +998 99 863 5050
                  </a>
                  <a href="tel:+998712005051" className="block hover:text-primary-foreground transition-colors font-medium">
                    +998 71 200 5051
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-0.5">
                <Globe className="w-4 h-4 text-primary-foreground flex-shrink-0" />
                <a href="https://module-homes.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors font-medium">
                  modulbino.uz
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Copyright & Back to Top */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/75">
          <p>© 2026 Modul Bino. {t.footer.rights}</p>

          <div className="flex items-center gap-4">
            <span className="font-medium">Zamonaviy modul qurilish</span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Yuqoriga qaytish"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
