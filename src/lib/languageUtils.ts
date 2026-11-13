import { Language } from "@/lib/i18n";

export const getLanguageFromPath = (pathname: string): Language => {
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/uz" || pathname.startsWith("/uz/")) return "uz";
  return "uz";
};

export const detectBrowserLanguage = (): Language => {
  try {
    const saved = localStorage.getItem("user_lang");
    if (saved === "ru" || saved === "en" || saved === "uz") {
      return saved as Language;
    }
  } catch {
    // localStorage might be unavailable in private browsing or restricted environments
  }

  if (typeof navigator !== "undefined") {
    const navLangs = navigator.languages || [navigator.language || ""];
    for (const l of navLangs) {
      const lower = (l || "").toLowerCase();
      if (lower.startsWith("ru")) return "ru";
      if (lower.startsWith("en")) return "en";
      if (lower.startsWith("uz")) return "uz";
    }
  }

  return "uz";
};

export const getPathForLanguage = (
  targetLang: Language,
  currentPathname: string,
  search: string = "",
  hash: string = ""
): string => {
  let cleanPath = currentPathname;
  if (cleanPath === "/ru" || cleanPath === "/en" || cleanPath === "/uz") {
    cleanPath = "/";
  } else if (cleanPath.startsWith("/ru/")) {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath.startsWith("/en/")) {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath.startsWith("/uz/")) {
    cleanPath = cleanPath.slice(3);
  }

  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }

  const langPrefix = `/${targetLang}`;
  const basePath = cleanPath === "/" ? langPrefix : `${langPrefix}${cleanPath}`;

  return `${basePath}${search}${hash}`;
};
