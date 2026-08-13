import { motion } from "framer-motion";
import { Shield, Clock, Award, Wrench, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CountUp from "@/components/CountUp";

const featureIcons = [Clock, Shield, Award, Wrench];

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { end: 100, suffix: "+", label: "Loyihalar" },
    { end: 5,  suffix: "+", label: "Yillik tajriba" },
    { end: 6,   suffix: "",  label: "Mahsulot turi" },
    { end: 100, suffix: "%", label: "Kafolat" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Dot pattern decoration */}
      <div className="absolute inset-0 dot-pattern opacity-60" />
      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 hero-gradient opacity-[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 hero-gradient opacity-[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative">
        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 p-8 bg-background rounded-2xl card-shadow border border-border/50"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <CountUp
                end={s.end}
                suffix={s.suffix}
                duration={2}
                className="text-3xl md:text-4xl font-heading font-black text-gradient leading-none tabular-nums"
              />
              <span className="text-xs text-muted-foreground mt-1.5 font-medium uppercase tracking-wider">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-[0.2em]">
              <span className="w-6 h-px bg-accent inline-block" />
              {t.about.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-foreground mt-3 mb-5 tracking-tight">
              {t.about.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              {t.about.description}
            </p>

            {/* Why Metal — modernized */}
            <div className="relative bg-background rounded-2xl p-6 card-shadow border-l-4 border-l-accent border border-border/50">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full hero-gradient inline-block" />
                {t.about.whyMetal.title}
              </h3>
              <ul className="space-y-2.5">
                {t.about.whyMetal.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right column — feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {t.about.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-background rounded-2xl p-6 card-shadow hover:card-hover-shadow transition-all duration-400 border border-border/50 hover:border-primary/20 hover:-translate-y-1"
                >
                  {/* Glow icon */}
                  <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 hero-gradient rounded-xl opacity-20 group-hover:opacity-40 blur-md transition-all duration-300" />
                    <div className="relative w-12 h-12 hero-gradient rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
