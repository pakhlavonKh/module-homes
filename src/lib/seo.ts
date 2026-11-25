import type { Language, TranslationType } from "@/lib/i18n";

/**
 * SEO helpers shared by the React app (useSEO, at runtime) and by the
 * post-build script (scripts/generate-localized-html.js), so the HTML served
 * for /uz, /ru and /en is already fully translated before any JS runs.
 */

export const SITE_URL = "https://modulbino.uz";

export const OG_LOCALES: Record<Language, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

interface StructuredDataOptions {
  t: TranslationType;
  language: Language;
  /** Site origin, e.g. https://modulbino.uz */
  siteUrl: string;
  /** Canonical URL of the current page */
  pageUrl: string;
}

/** Localized Schema.org JSON-LD for the landing page. */
export const buildStructuredData = ({ t, language, siteUrl, pageUrl }: StructuredDataOptions) => {
  const imageUrl = `${siteUrl}/favi.png`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}/#organization`,
        name: "Modul Bino",
        alternateName: t.seo.alternateName,
        url: siteUrl,
        logo: imageUrl,
        image: imageUrl,
        description: t.seo.description,
        telephone: "+998998635050",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: t.contact.addressStreet,
          addressLocality: t.seo.city,
          addressRegion: t.contact.addressDistrict,
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
        sameAs: ["https://www.instagram.com/modulbino/", "https://module-homes.netlify.app/"],
        areaServed: {
          "@type": "Country",
          name: t.seo.country,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: pageUrl,
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
        itemListElement: t.products.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.description,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: t.seo.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
};

const escapeAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replaces the first match, failing loudly so a renamed tag in index.html can't silently ship untranslated. */
const replaceTag = (html: string, pattern: RegExp, replacement: string, label: string) => {
  if (!pattern.test(html)) {
    throw new Error(`localizeHtml: ${label} not found in index.html`);
  }
  // A replacer function keeps "$" sequences in the content (e.g. "$$") literal.
  return html.replace(pattern, () => replacement);
};

const metaPattern = (attr: "name" | "property", key: string) =>
  new RegExp(`<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s+content="[^"]*"\\s*\\/?>`, "i");

interface LocalizeHtmlOptions {
  t: TranslationType;
  language: Language;
  siteUrl?: string;
}

/**
 * Turns the built index.html into the page served at /<language>: translated
 * <html lang>, title, meta/OG/Twitter tags, canonical URL and JSON-LD.
 */
export const localizeHtml = (html: string, { t, language, siteUrl = SITE_URL }: LocalizeHtmlOptions) => {
  const pageUrl = `${siteUrl}/${language}`;
  const title = escapeAttribute(t.seo.title);
  const description = escapeAttribute(t.seo.description);
  const imageAlt = escapeAttribute(t.common.logoAlt);

  const metaTags: [attr: "name" | "property", key: string, content: string][] = [
    ["name", "title", title],
    ["name", "description", description],
    ["name", "keywords", escapeAttribute(t.seo.keywords)],
    ["property", "og:url", pageUrl],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:image:alt", imageAlt],
    ["name", "twitter:url", pageUrl],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image:alt", imageAlt],
  ];

  let out = replaceTag(html, /<html lang="[^"]*"/i, `<html lang="${language}"`, "<html lang>");
  out = replaceTag(out, /<title>[\s\S]*?<\/title>/i, `<title>${escapeText(t.seo.title)}</title>`, "<title>");
  out = replaceTag(
    out,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${pageUrl}" />`,
    "canonical link"
  );

  for (const [attr, key, content] of metaTags) {
    out = replaceTag(out, metaPattern(attr, key), `<meta ${attr}="${key}" content="${content}" />`, `meta ${key}`);
  }

  // og:locale, followed by og:locale:alternate for the other two languages.
  out = out.replace(/^[ \t]*<meta\s+property="og:locale:alternate"[^>]*>[ \t]*\r?\n/gim, "");
  const alternates = (Object.keys(OG_LOCALES) as Language[])
    .filter((lang) => lang !== language)
    .map((lang) => `\n  <meta property="og:locale:alternate" content="${OG_LOCALES[lang]}" />`)
    .join("");
  out = replaceTag(
    out,
    metaPattern("property", "og:locale"),
    `<meta property="og:locale" content="${OG_LOCALES[language]}" />${alternates}`,
    "meta og:locale"
  );

  const jsonLd = JSON.stringify(buildStructuredData({ t, language, siteUrl, pageUrl }), null, 2)
    // Never let content close the <script> element early.
    .replace(/</g, "\\u003c");
  out = replaceTag(
    out,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${jsonLd}\n  </script>`,
    "JSON-LD script"
  );

  return out;
};
