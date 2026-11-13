import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { getLanguageFromPath, getPathForLanguage, detectBrowserLanguage } from "@/lib/languageUtils";
import { useSEO } from "@/hooks/useSEO";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ru } from "@/locales/ru";
import { uz } from "@/locales/uz";
import { en } from "@/locales/en";

const TestComponent = () => {
  const { language } = useLanguage();
  useSEO();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <LanguageSwitcher />
    </div>
  );
};

describe("Language Context and SEO integration", () => {
  beforeEach(() => {
    document.title = "";
    document.documentElement.lang = "";
    document.head.innerHTML = "";
  });

  it("detects language from URL path correctly", () => {
    expect(getLanguageFromPath("/")).toBe("uz");
    expect(getLanguageFromPath("")).toBe("uz");
    expect(getLanguageFromPath("/uz")).toBe("uz");
    expect(getLanguageFromPath("/uz/")).toBe("uz");
    expect(getLanguageFromPath("/uz/some-page")).toBe("uz");
    expect(getLanguageFromPath("/ru")).toBe("ru");
    expect(getLanguageFromPath("/ru/")).toBe("ru");
    expect(getLanguageFromPath("/ru/some-page")).toBe("ru");
    expect(getLanguageFromPath("/en")).toBe("en");
    expect(getLanguageFromPath("/en/")).toBe("en");
    expect(getLanguageFromPath("/en/some-page")).toBe("en");
    expect(getLanguageFromPath("/other")).toBe("uz");
  });

  it("constructs correct target URLs when switching languages", () => {
    expect(getPathForLanguage("uz", "/")).toBe("/uz");
    expect(getPathForLanguage("ru", "/")).toBe("/ru");
    expect(getPathForLanguage("en", "/")).toBe("/en");

    expect(getPathForLanguage("uz", "/ru")).toBe("/uz");
    expect(getPathForLanguage("en", "/ru")).toBe("/en");
    expect(getPathForLanguage("ru", "/en")).toBe("/ru");
    expect(getPathForLanguage("uz", "/en")).toBe("/uz");

    expect(getPathForLanguage("ru", "/", "", "#products")).toBe("/ru#products");
    expect(getPathForLanguage("uz", "/ru", "", "#contact")).toBe("/uz#contact");
    expect(getPathForLanguage("en", "/ru", "", "#about")).toBe("/en#about");

    expect(getPathForLanguage("ru", "/", "?gclid=test123", "#products")).toBe("/ru?gclid=test123#products");
    expect(getPathForLanguage("uz", "/ru", "?utm_source=google", "")).toBe("/uz?utm_source=google");
    expect(getPathForLanguage("en", "/uz", "?utm_source=google", "")).toBe("/en?utm_source=google");
  });

  it("initializes directly in Russian when route is /ru", () => {
    render(
      <MemoryRouter initialEntries={["/ru"]}>
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("current-lang").textContent).toBe("ru");
    expect(document.documentElement.lang).toBe("ru");
    expect(document.title).toBe(ru.seo.title);

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe(ru.seo.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute("content")).toBe("ru_RU");

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toContain("/ru");
  });

  it("initializes directly in English when route is /en", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("current-lang").textContent).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(en.seo.title);

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe(en.seo.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute("content")).toBe("en_US");

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toContain("/en");
  });

  it("initializes directly in Uzbek when route is /uz", () => {
    render(
      <MemoryRouter initialEntries={["/uz"]}>
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("current-lang").textContent).toBe("uz");
    expect(document.documentElement.lang).toBe("uz");
    expect(document.title).toBe(uz.seo.title);

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe(uz.seo.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute("content")).toBe("uz_UZ");

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toContain("/uz");
  });

  it("switches correctly between languages", () => {
    localStorage.setItem("user_lang", "uz");

    render(
      <MemoryRouter initialEntries={["/uz"]}>
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("current-lang").textContent).toBe("uz");

    // Click EN
    const enButton = screen.getByRole("button", { name: /switch language to en/i });
    act(() => {
      fireEvent.click(enButton);
    });

    expect(screen.getByTestId("current-lang").textContent).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(en.seo.title);
    expect(localStorage.getItem("user_lang")).toBe("en");

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute("content")).toBe("en_US");

    // Click RU
    const ruButton = screen.getByRole("button", { name: /switch language to ru/i });
    act(() => {
      fireEvent.click(ruButton);
    });

    expect(screen.getByTestId("current-lang").textContent).toBe("ru");
    expect(document.documentElement.lang).toBe("ru");
    expect(document.title).toBe(ru.seo.title);
    expect(localStorage.getItem("user_lang")).toBe("ru");

    // Click UZ
    const uzButton = screen.getByRole("button", { name: /switch language to uz/i });
    act(() => {
      fireEvent.click(uzButton);
    });

    expect(screen.getByTestId("current-lang").textContent).toBe("uz");
    expect(document.documentElement.lang).toBe("uz");
    expect(document.title).toBe(uz.seo.title);
    expect(localStorage.getItem("user_lang")).toBe("uz");
  });

  it("detects browser language from navigator", () => {
    localStorage.clear();

    const originalLanguages = navigator.languages;
    try {
      Object.defineProperty(navigator, "languages", {
        value: ["ru-RU", "ru"],
        configurable: true,
      });
      expect(detectBrowserLanguage()).toBe("ru");

      Object.defineProperty(navigator, "languages", {
        value: ["en-US", "en"],
        configurable: true,
      });
      expect(detectBrowserLanguage()).toBe("en");

      Object.defineProperty(navigator, "languages", {
        value: ["uz-UZ"],
        configurable: true,
      });
      expect(detectBrowserLanguage()).toBe("uz");
    } finally {
      Object.defineProperty(navigator, "languages", {
        value: originalLanguages,
        configurable: true,
      });
    }
  });

  it("respects user_lang in localStorage over browser language", () => {
    localStorage.setItem("user_lang", "ru");
    expect(detectBrowserLanguage()).toBe("ru");

    localStorage.setItem("user_lang", "uz");
    expect(detectBrowserLanguage()).toBe("uz");

    localStorage.clear();
  });
});
