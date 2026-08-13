import { motion } from "framer-motion";
import { Phone, MapPin, Globe, Instagram, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: Phone,
      label: t.contact.phone,
      phones: [
        { number: "+998 99 863 5050", href: "tel:+998998635050" },
        { number: "+998 71 200 5051", href: "tel:+998712005051" },
      ],
    },
    {
      icon: Globe,
      label: t.contact.website,
      value: "modulbino.uz",
      href: "https://module-homes.netlify.app/",
    },
    {
      icon: Instagram,
      label: t.contact.instagram,
      value: "@modul_bino",
      href: "https://www.instagram.com/modul_bino/",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: t.contact.addressValue,
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] hero-gradient opacity-[0.05] rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            <span className="w-6 h-px bg-accent inline-block" />
            {t.contact.badge}
            <span className="w-6 h-px bg-accent inline-block" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground mt-2 tracking-tight">
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-card rounded-2xl p-6 card-shadow hover:card-hover-shadow transition-all duration-400 text-center border border-border/50 hover:border-primary/20 hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Gradient bg on hover */}
                <div className="absolute inset-0 hero-gradient opacity-0 group-hover:opacity-[0.04] transition-opacity duration-400" />

                {/* Icon */}
                <div className="relative w-14 h-14 mx-auto mb-4">
                  <div className="absolute inset-0 hero-gradient rounded-2xl opacity-20 group-hover:opacity-35 blur-lg transition-all duration-300" />
                  <div className="relative w-14 h-14 hero-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-foreground mb-2 text-sm tracking-wide">
                  {item.label}
                </h3>

                {item.phones ? (
                  <div className="space-y-1.5">
                    {item.phones.map((phone) => (
                      <a
                        key={phone.number}
                        href={phone.href}
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
                      >
                        {phone.number}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors font-medium group/link"
                  >
                    <span>{item.value}</span>
                    {item.href?.startsWith("http") && (
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all duration-200" />
                    )}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
