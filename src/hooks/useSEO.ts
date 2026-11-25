import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n";
import { buildStructuredData, OG_LOCALES } from "@/lib/seo";

const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setLinkTag = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hreflang) {
      element.setAttribute("hreflang", hreflang);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

export const useSEO = () => {
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const siteUrl = window.location.origin;
    const ogImageUrl = `${siteUrl}/favi.png`;

    let langPath = "/";
    if (location.pathname.startsWith("/ru")) {
      langPath = "/ru";
    } else if (location.pathname.startsWith("/en")) {
      langPath = "/en";
    } else if (location.pathname.startsWith("/uz")) {
      langPath = "/uz";
    } else if (language === "ru") {
      langPath = "/ru";
    } else if (language === "en") {
      langPath = "/en";
    } else if (location.pathname === "/") {
      langPath = "/";
    } else {
      langPath = `/${language}`;
    }

    const canonicalUrl = `${siteUrl}${langPath}`;

    // 1. Document Title
    document.title = t.seo.title;

    // 2. Primary Meta Tags
    setMetaTag("name", "title", t.seo.title);
    setMetaTag("name", "description", t.seo.description);
    setMetaTag("name", "keywords", t.seo.keywords);
    setMetaTag("name", "author", "Modul Bino");
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaTag("name", "theme-color", "#1C811B");

    // 3. Local SEO Geo Tags (Tashkent, Uzbekistan)
    setMetaTag("name", "geo.region", "UZ-TK");
    setMetaTag("name", "geo.placename", "Tashkent");
    setMetaTag("name", "geo.position", "41.3275;69.2401");
    setMetaTag("name", "ICBM", "41.3275, 69.2401");

    // 4. Open Graph Meta Tags
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", "Modul Bino");
    setMetaTag("property", "og:title", t.seo.title);
    setMetaTag("property", "og:description", t.seo.description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", ogImageUrl);
    setMetaTag("property", "og:image:alt", t.common.logoAlt);
    setMetaTag("property", "og:locale", OG_LOCALES[language]);

    // Update alternate locales
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove());
    (Object.keys(OG_LOCALES) as Language[])
      .filter((lang) => lang !== language)
      .forEach((lang) => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:locale:alternate");
        meta.setAttribute("content", OG_LOCALES[lang]);
        document.head.appendChild(meta);
      });

    // 5. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:url", canonicalUrl);
    setMetaTag("name", "twitter:title", t.seo.title);
    setMetaTag("name", "twitter:description", t.seo.description);
    setMetaTag("name", "twitter:image", ogImageUrl);
    setMetaTag("name", "twitter:image:alt", t.common.logoAlt);

    // 6. Canonical & Hreflang Tags
    setLinkTag("canonical", canonicalUrl);
    setLinkTag("alternate", `${siteUrl}/uz`, "uz");
    setLinkTag("alternate", `${siteUrl}/ru`, "ru");
    setLinkTag("alternate", `${siteUrl}/en`, "en");
    setLinkTag("alternate", `${siteUrl}/`, "x-default");

    // 7. Update HTML lang attribute
    document.documentElement.lang = language;

    // 8. Localized JSON-LD Structured Data (Schema.org) — same builder as the static HTML
    const jsonLd = JSON.stringify(buildStructuredData({ t, language, siteUrl, pageUrl: canonicalUrl }));

    const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
      jsonLdScript.textContent = jsonLd;
    } else {
      const newJsonLdScript = document.createElement("script");
      newJsonLdScript.type = "application/ld+json";
      newJsonLdScript.textContent = jsonLd;
      document.head.appendChild(newJsonLdScript);
    }
  }, [t, language, location.pathname]);
};
