import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "@/pages/Index";
import { translations, Language } from "@/lib/i18n";
import { ru } from "@/locales/ru";

/**
 * Regression tests: each language version must be fully translated.
 * (An ad moderator rejected /ru because Uzbek text hardcoded in components
 * leaked into the Russian page.)
 */

// Latin-script tokens allowed on the Russian page: brand name, Instagram handle/domain, language codes.
const ALLOWED_LATIN = new Set(["modul", "bino", "instagram", "modulbino", "uz", "ru", "en"]);

const latinWords = (text: string) =>
  (text.match(/[A-Za-z]+(?:['ʻʼ‘’][A-Za-z]+)*/g) || []).filter((word) => !ALLOWED_LATIN.has(word.toLowerCase()));

/** Visible text nodes plus alt / aria-label / title attributes inside `root`. */
const collectStrings = (root: ParentNode) => {
  const strings: string[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim();
    if (text && !["SCRIPT", "STYLE"].includes(node.parentElement?.tagName ?? "")) strings.push(text);
  }
  root.querySelectorAll("[alt], [aria-label], [title]").forEach((el) => {
    for (const attr of ["alt", "aria-label", "title"]) {
      const value = el.getAttribute(attr);
      if (value) strings.push(value);
    }
  });
  return strings;
};

const renderPage = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Index />
      </LanguageProvider>
    </MemoryRouter>
  );

/** Renders the page, then opens every product dialog, returning all strings seen. */
const collectPageStrings = (path: string) => {
  renderPage(path);
  const strings = collectStrings(document.body);

  const cards = document.querySelectorAll<HTMLElement>("#products .cursor-pointer");
  expect(cards.length).toBe(ru.products.items.length);
  cards.forEach((card) => {
    fireEvent.click(card);
    const dialog = screen.getByRole("dialog");
    strings.push(...collectStrings(dialog));
    fireEvent.keyDown(dialog, { key: "Escape" });
  });
  return strings;
};

describe("Fully translated language versions", () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = "";
  });
  afterEach(cleanup);

  it("the Russian page (/ru) contains no Uzbek or English text", () => {
    const strings = collectPageStrings("/ru");
    expect(strings.length).toBeGreaterThan(100);

    const offenders = strings.filter((s) => latinWords(s).length > 0);
    expect(offenders).toEqual([]);
  });

  it("shows the strings the moderator flagged in Russian", () => {
    renderPage("/ru");
    expect(screen.getByText(ru.products.subtitle)).toBeInTheDocument();
    expect(screen.getByText(ru.footer.ctaTitle)).toBeInTheDocument();
    expect(screen.getByText(ru.footer.ctaText)).toBeInTheDocument();
    expect(screen.getByText(ru.footer.sectionsTitle)).toBeInTheDocument();
    expect(screen.getByText(`${ru.contact.addressDistrict}, ${ru.contact.addressStreet}`)).toBeInTheDocument();
    const products = within(document.getElementById("products")!);
    for (const item of ru.products.items) {
      expect(products.getAllByText(item.tag).length).toBeGreaterThan(0);
    }
  });

  // Together with the /ru check above this catches a hardcoded string in any script.
  it.each(["/uz", "/en"])("the %s page contains no Russian (Cyrillic) text", (path) => {
    const strings = collectPageStrings(path);
    expect(strings.filter((s) => /[А-Яа-яЁё]/.test(s))).toEqual([]);
  });

  it("runtime JSON-LD on /ru is in Russian", () => {
    renderPage("/ru");
    const jsonLd = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!);
    const [organization, , services, faq] = jsonLd["@graph"];
    expect(organization.address.streetAddress).toBe(ru.contact.addressStreet);
    expect(organization.areaServed.name).toBe(ru.seo.country);
    expect(services.itemListElement[0].itemOffered.name).toBe(ru.products.items[0].title);
    expect(faq.mainEntity[0].name).toBe(ru.seo.faq[0].question);
    expect(document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content")).toBe(ru.common.logoAlt);
  });

  it("every language has the same set of products, each with a tag", () => {
    const languages = Object.keys(translations) as Language[];
    for (const lang of languages) {
      const items = translations[lang].products.items;
      expect(items).toHaveLength(ru.products.items.length);
      items.forEach((item) => expect(item.tag.trim()).not.toBe(""));
      expect(translations[lang].seo.faq).toHaveLength(ru.seo.faq.length);
    }
  });
});
