import { Shield, Clock, Award, Wrench, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const featureIcons = [Clock, Shield, Award, Wrench];

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-12 lg:py-10 bg-card overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

      <div className="container max-w-6xl relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left column — Intro & Why Metal */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 text-accent font-semibold text-[11px] uppercase tracking-[0.2em] mb-2.5">
              <span className="w-6 h-px bg-accent/60 inline-block" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-[2.5rem] font-heading font-bold text-foreground leading-[1.15] tracking-tight mb-3.5">
              {t.about.title}
            </h2>

            <p className="text-muted-foreground text-sm md:text-[0.925rem] leading-relaxed mb-5 max-w-lg">
              {t.about.description}
            </p>

            {/* Why Metal — Integrated Information Panel */}
            <div className="bg-background rounded-xl p-4 sm:p-5 border border-border/80 border-l-[3px] border-l-accent shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)]">
              <h3 className="font-heading font-bold text-sm sm:text-base text-foreground mb-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block flex-shrink-0" />
                <span>{t.about.whyMetal.title}</span>
              </h3>
              <ul className="space-y-2">
                {t.about.whyMetal.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-xs sm:text-[13px] text-muted-foreground/90 font-medium"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0 stroke-[2]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — 2×2 Feature Cards */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {t.about.features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={f.title}
                    className="group bg-background rounded-xl md:rounded-2xl p-5 sm:p-6 border border-border/80 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[140px] sm:min-h-[155px] lg:min-h-[165px]"
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <h3 className="font-heading font-bold text-sm sm:text-base text-foreground mb-1 group-hover:text-accent transition-colors duration-200 tracking-tight">
                        {f.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
