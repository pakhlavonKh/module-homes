import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const useSEO = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const siteUrl = window.location.origin;

    // Update document title
    document.title = t.seo.title;

    // Update or create meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute("content", t.seo.description);

    // Update or create meta keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement("meta");
      keywordsMeta.setAttribute("name", "keywords");
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute("content", t.seo.keywords);

    // Update robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // Update open graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", t.seo.title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", t.seo.description);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement("meta");
      ogImage.setAttribute("property", "og:image");
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute("content", `${siteUrl}${t.seo.image}`);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", siteUrl);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", "website");

    // Add Twitter Card meta tags
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement("meta");
      twitterCard.setAttribute("name", "twitter:card");
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute("content", "summary_large_image");

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement("meta");
      twitterTitle.setAttribute("name", "twitter:title");
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute("content", t.seo.title);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement("meta");
      twitterDescription.setAttribute("name", "twitter:description");
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute("content", t.seo.description);

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement("meta");
      twitterImage.setAttribute("name", "twitter:image");
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute("content", `${siteUrl}${t.seo.image}`);

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", siteUrl);

    // Add JSON-LD structured data for organization
    const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Modul Bino",
      url: siteUrl,
      logo: `${siteUrl}/src/assets/logo.png`,
      description: t.seo.description,
      image: `${siteUrl}${t.seo.image}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: "UZ",
        addressLocality: "Tashkent",
        addressRegion: "Shayhontohur",
        streetAddress: "Jangoh Street, 2",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: "+998998635050",
      },
      sameAs: [
        "https://www.instagram.com/modul_bino/",
      ],
    };

    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(jsonLdData);
    } else {
      const newJsonLdScript = document.createElement("script");
      newJsonLdScript.type = "application/ld+json";
      newJsonLdScript.textContent = JSON.stringify(jsonLdData);
      document.head.appendChild(newJsonLdScript);
    }

    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [t, language]);
};
