import { useLanguage } from "@/context/LanguageContext";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="hero-gradient py-10">
      <div className="container text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src={logo}
            alt="MODUL BINO"
            className="h-10 w-auto brightness-0 invert opacity-90"
          />
        </div>
        <p className="text-primary-foreground/80 text-sm font-medium mb-2">
          {t.footer.slogan}
        </p>
        <p className="text-primary-foreground/60 text-sm">
          © 2026 Modul Bino. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
