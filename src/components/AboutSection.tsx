import { motion } from "framer-motion";
import { Shield, Clock, Award, Wrench, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const featureIcons = [Clock, Shield, Award, Wrench];

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              {t.about.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground mt-3 mb-6">
              {t.about.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t.about.description}
            </p>

            {/* Why Metal Construction */}
            <div className="bg-background rounded-xl p-6 card-shadow">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">
                {t.about.whyMetal.title}
              </h3>
              <ul className="space-y-3">
                {t.about.whyMetal.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {t.about.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-xl p-6 card-shadow"
                >
                  <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
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
