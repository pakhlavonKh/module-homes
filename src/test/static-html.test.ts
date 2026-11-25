import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { localizeHtml } from "@/lib/seo";
import { translations } from "@/lib/i18n";
import { ru } from "@/locales/ru";
import { uz } from "@/locales/uz";

/**
 * The HTML served for /ru (generated after `vite build` by
 * scripts/generate-localized-html.js) must be Russian before any JS runs:
 * this is what "view source" and crawlers see.
 */
const sourceHtml = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf-8");
const ALLOWED_LATIN = new Set(["modul", "bino", "uz", "ru", "en"]);

const metaContent = (html: string, attr: "name" | "property", key: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.querySelector(`meta[${attr}="${key}"]`)?.getAttribute("content");
};

const jsonLdOf = (html: string) =>
  JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);

/** Human-readable string values of the JSON-LD (skips ids, URLs, enums and codes). */
const jsonLdTexts = (value: unknown, key = ""): string[] => {
  if (typeof value === "string") {
    const machineKeys = /^(@type|@context|@id|url|logo|image|telephone|priceRange|addressCountry|opens|closes|sameAs|dayOfWeek|inLanguage)$/;
    return machineKeys.test(key) ? [] : [value];
  }
  if (Array.isArray(value)) return value.flatMap((v) => jsonLdTexts(v, key));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => jsonLdTexts(v, k));
  return [];
};

describe("localizeHtml (static HTML per language)", () => {
  const html = localizeHtml(sourceHtml, { t: ru, language: "ru" });

  it("sets <html lang>, title, canonical and Open Graph locale for /ru", () => {
    expect(html).toContain('<html lang="ru">');
    expect(html).toContain(`<title>${ru.seo.title}</title>`);
    expect(html).toContain('<link rel="canonical" href="https://modulbino.uz/ru" />');
    expect(metaContent(html, "name", "description")).toBe(ru.seo.description);
    expect(metaContent(html, "name", "keywords")).toBe(ru.seo.keywords);
    expect(metaContent(html, "property", "og:url")).toBe("https://modulbino.uz/ru");
    expect(metaContent(html, "property", "og:title")).toBe(ru.seo.title);
    expect(metaContent(html, "property", "og:image:alt")).toBe(ru.common.logoAlt);
    expect(metaContent(html, "name", "twitter:image:alt")).toBe(ru.common.logoAlt);
    expect(metaContent(html, "property", "og:locale")).toBe("ru_RU");

    const alternates = [...html.matchAll(/<meta property="og:locale:alternate" content="([^"]+)"/g)].map((m) => m[1]);
    expect(alternates).toEqual(["uz_UZ", "en_US"]);
  });

  it("puts Russian structured data (JSON-LD) in the /ru page", () => {
    const data = jsonLdOf(html);
    const texts = jsonLdTexts(data);
    expect(texts).toContain(ru.seo.faq[0].question);
    expect(texts).toContain(ru.products.items[0].title);

    const withLatin = texts.filter((s) =>
      (s.match(/[A-Za-z]+/g) || []).some((w) => !ALLOWED_LATIN.has(w.toLowerCase()))
    );
    expect(withLatin).toEqual([]);
    expect(data["@graph"][0].priceRange).toBe("$$");
  });

  it("leaves no Uzbek SEO text in the /ru page head", () => {
    const head = html.slice(0, html.indexOf("</head>"));
    for (const uzText of [uz.seo.title, uz.seo.description, uz.common.logoAlt, uz.seo.faq[0].question]) {
      expect(head).not.toContain(uzText);
    }
  });

  it("produces valid output for every language", () => {
    for (const [lang, t] of Object.entries(translations)) {
      const out = localizeHtml(sourceHtml, { t, language: lang as keyof typeof translations });
      expect(out).toContain(`<html lang="${lang}">`);
      expect(jsonLdOf(out)["@graph"][3].mainEntity).toHaveLength(t.seo.faq.length);
    }
  });

  it("escapes attribute values", () => {
    const t = { ...ru, seo: { ...ru.seo, title: 'A "quoted" & <b>bold</b> title' } };
    const out = localizeHtml(sourceHtml, { t, language: "ru" });
    expect(out).toContain('<meta property="og:title" content="A &quot;quoted&quot; &amp; &lt;b&gt;bold&lt;/b&gt; title" />');
    expect(out).toContain("<title>A \"quoted\" &amp; &lt;b&gt;bold&lt;/b&gt; title</title>");
  });

  it("fails loudly if index.html is missing a tag it must translate", () => {
    const withoutKeywords = sourceHtml.replace(/<meta name="keywords"[\s\S]*?\/>/, "");
    expect(() => localizeHtml(withoutKeywords, { t: ru, language: "ru" })).toThrow(/keywords/);
  });
});
