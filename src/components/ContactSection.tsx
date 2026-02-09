import { motion } from "framer-motion";
import { Phone, MapPin, Globe, Instagram } from "lucide-react";
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
              <motion.div
                key={item.label}
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
                {item.phones ? (
                  <div className="space-y-2">
                    {item.phones.map((phone) => (
                      <a
                        key={phone.number}
                        href={phone.href}
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {phone.number}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    <p>{item.value}</p>
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
