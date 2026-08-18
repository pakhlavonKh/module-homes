import { Phone, MapPin, Globe, Instagram, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-10 md:py-16 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        {/* Refined Minimalist Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-3 text-accent font-semibold text-xs uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-accent/60 inline-block" />
            <span>{t.contact.badge}</span>
            <span className="w-8 h-px bg-accent/60 inline-block" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-heading font-bold text-foreground tracking-tight leading-tight">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mt-3 font-normal leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Unified 2×2 Architectural Contact Panel */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl md:rounded-3xl border border-border/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-border/70">
            {/* Quadrant 1: Telefon */}
            <div className="p-6 md:p-8 lg:p-10 md:border-r md:border-b border-border/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-muted-foreground mb-4">
                  <Phone className="w-4 h-4 text-accent stroke-[1.75] flex-shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t.contact.phone}</span>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:+998998635050"
                    className="block font-heading font-semibold text-lg md:text-xl text-foreground hover:text-accent transition-colors duration-200 tracking-tight"
                  >
                    +998 99 863 5050
                  </a>
                  <a
                    href="tel:+998712005051"
                    className="block font-heading font-semibold text-lg md:text-xl text-foreground hover:text-accent transition-colors duration-200 tracking-tight"
                  >
                    +998 71 200 5051
                  </a>
                </div>
              </div>
            </div>

            {/* Quadrant 2: Instagram */}
            <a
              href="https://www.instagram.com/modul_bino/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 md:p-8 lg:p-10 md:border-b border-border/70 flex flex-col justify-between transition-colors duration-200 hover:bg-muted/25"
            >
              <div>
                <div className="flex items-center justify-between text-muted-foreground mb-4">
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-accent stroke-[1.75] flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t.contact.instagram}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
                <div className="font-heading font-semibold text-lg md:text-xl text-foreground group-hover:text-accent transition-colors duration-200 tracking-tight">
                  @modul_bino
                </div>
              </div>
            </a>

            {/* Quadrant 3: Veb-sayt */}
            <a
              href="https://module-homes.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 md:p-8 lg:p-10 md:border-r border-border/70 flex flex-col justify-between transition-colors duration-200 hover:bg-muted/25"
            >
              <div>
                <div className="flex items-center justify-between text-muted-foreground mb-4">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-accent stroke-[1.75] flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t.contact.website}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
                <div className="font-heading font-semibold text-lg md:text-xl text-foreground group-hover:text-accent transition-colors duration-200 tracking-tight">
                  modulbino.uz
                </div>
              </div>
            </a>

            {/* Quadrant 4: Manzil */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 text-accent stroke-[1.75] flex-shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t.contact.address}</span>
                </div>
                <div className="font-heading font-semibold text-lg md:text-xl text-foreground leading-snug tracking-tight">
                  <p>Shayhontohur tumani,</p>
                  <p className="text-muted-foreground font-medium text-base md:text-lg mt-0.5">Jangoh dahasi, 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
