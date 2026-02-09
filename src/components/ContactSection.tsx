import { motion } from "framer-motion";
import { Phone, MapPin, Globe, Instagram } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+998 99 958 50 50",
      subValue: "+998 77 294 52 52",
      href: "tel:+998999585050",
    },
    {
      icon: Globe,
      label: t.contact.website,
      value: "modulbino.uz",
      href: "https://modulbino.uz",
    },
    {
      icon: Instagram,
      label: t.contact.instagram,
      value: "@modul_bino",
      href: "https://instagram.com/modul_bino",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: t.contact.addressValue,
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t.contact.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground mt-3">
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 card-shadow hover:card-hover-shadow transition-shadow duration-300 text-center group"
              >
                <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-1 text-sm">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground">{item.value}</p>
                {item.subValue && (
                  <p className="text-sm text-muted-foreground">{item.subValue}</p>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
