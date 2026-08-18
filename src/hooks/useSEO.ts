import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

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

  useEffect(() => {
    const siteUrl = window.location.origin;
    const ogImageUrl = `${siteUrl}/favi.png`;

    // 1. Document Title
    document.title = t.seo.title;

    // 2. Primary Meta Tags
    setMetaTag("name", "title", t.seo.title);
    setMetaTag("name", "description", t.seo.description);
    setMetaTag("name", "keywords", t.seo.keywords);
    setMetaTag("name", "author", "Modul Bino");
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaTag("name", "theme-color", "#1a365d");

    // 3. Local SEO Geo Tags (Tashkent, Uzbekistan)
    setMetaTag("name", "geo.region", "UZ-TK");
    setMetaTag("name", "geo.placename", "Tashkent");
    setMetaTag("name", "geo.position", "41.3275;69.2401");
    setMetaTag("name", "ICBM", "41.3275, 69.2401");

    // 4. Open Graph Meta Tags
    const ogLocaleMap: Record<string, string> = {
      uz: "uz_UZ",
      ru: "ru_RU",
      en: "en_US",
    };
    const currentLocale = ogLocaleMap[language] || "uz_UZ";

    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", "Modul Bino");
    setMetaTag("property", "og:title", t.seo.title);
    setMetaTag("property", "og:description", t.seo.description);
    setMetaTag("property", "og:url", `${siteUrl}/`);
    setMetaTag("property", "og:image", ogImageUrl);
    setMetaTag("property", "og:image:alt", t.seo.title);
    setMetaTag("property", "og:locale", currentLocale);

    // 5. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", t.seo.title);
    setMetaTag("name", "twitter:description", t.seo.description);
    setMetaTag("name", "twitter:image", ogImageUrl);
    setMetaTag("name", "twitter:image:alt", t.seo.title);

    // 6. Canonical & Hreflang Tags
    setLinkTag("canonical", `${siteUrl}/`);
    setLinkTag("alternate", `${siteUrl}/`, "uz");
    setLinkTag("alternate", `${siteUrl}/`, "ru");
    setLinkTag("alternate", `${siteUrl}/`, "en");
    setLinkTag("alternate", `${siteUrl}/`, "x-default");

    // 7. Update HTML lang attribute
    document.documentElement.lang = language;

    // 8. Dynamic Localized JSON-LD Structured Data (Schema.org)
    const localizedServices = t.products.items.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.title,
        description: item.description,
      },
    }));

    const faqContent =
      language === "ru"
        ? [
            {
              q: "Сколько времени занимает строительство модульного здания?",
              a: "Модульные здания изготавливаются на заводе и доставляются на объект. Монтаж занимает в среднем от 2 до 4 недель.",
            },
            {
              q: "Какая гарантия предоставляется на модульные здания?",
              a: "Компания Modul Bino предоставляет официальную гарантию до 10 лет на все металлоконструкции и модульные строения.",
            },
            {
              q: "Какова сейсмостойкость модульных зданий из металлоконструкций?",
              a: "Модульные здания на металлокаркасе обладают высокой прочностью и эластичностью, выдерживая сейсмические нагрузки до 9 баллов.",
            },
          ]
        : language === "en"
        ? [
            {
              q: "How long does modular building construction take?",
              a: "Modular structures are prefabricated in factory conditions and assembled on-site in approximately 2 to 4 weeks.",
            },
            {
              q: "What warranty is provided on modular buildings?",
              a: "Modul Bino provides an official warranty of up to 10 years on all metal frame and modular structures.",
            },
            {
              q: "How earthquake-resistant are metal frame modular buildings?",
              a: "Steel frame modular buildings are flexible and robust, capable of withstanding seismic activity up to magnitude 9.",
            },
          ]
        : [
            {
              q: "Modul bino qancha vaqtda qurib bitkaziladi?",
              a: "Modul binolar zavod sharoitida tayyorlanib, ob'ektga yetkaziladi va o'rtacha 2-4 hafta ichida to'liq montaj qilib topshiriladi.",
            },
            {
              q: "Modul binolarga qancha muddat kafolat beriladi?",
              a: "Modul Bino barcha metall konstruksiya va modul binolarga 10 yilgacha rasmiy kafolat beradi.",
            },
            {
              q: "Metall konstruksiyali modul binolar zilzilaga chidamliligi qanday?",
              a: "Metall karkasli modul konstruksiyalar elastik va mustahkam bo'lib, 9 ballgacha bo'lgan seysmik zilzilalarga bardosh beradi.",
            },
          ];

    const jsonLdData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HomeAndConstructionBusiness",
          "@id": `${siteUrl}/#organization`,
          name: "Modul Bino",
          alternateName: "Modul Qurilish",
          url: siteUrl,
          logo: ogImageUrl,
          image: ogImageUrl,
          description: t.seo.description,
          telephone: "+998998635050",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jangoh dahasi, 2",
            addressLocality: "Toshkent",
            addressRegion: "Shayhontohur",
            addressCountry: "UZ",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 41.3275,
            longitude: 69.2401,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
          sameAs: [
            "https://www.instagram.com/modul_bino/",
            "https://module-homes.netlify.app/",
          ],
          areaServed: {
            "@type": "Country",
            name: "Uzbekistan",
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: "Modul Bino",
          description: t.seo.description,
          publisher: {
            "@id": `${siteUrl}/#organization`,
          },
          inLanguage: [language],
        },
        {
          "@type": "OfferCatalog",
          "@id": `${siteUrl}/#services`,
          name: t.products.title,
          itemListElement: localizedServices,
        },
        {
          "@type": "FAQPage",
          "@id": `${siteUrl}/#faq`,
          mainEntity: faqContent.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        },
      ],
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(jsonLdData);
    } else {
      const newJsonLdScript = document.createElement("script");
      newJsonLdScript.type = "application/ld+json";
      newJsonLdScript.textContent = JSON.stringify(jsonLdData);
      document.head.appendChild(newJsonLdScript);
    }
  }, [t, language]);
};
