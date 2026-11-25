import { uz } from "@/locales/uz";
import { en } from "@/locales/en";
import { ru } from "@/locales/ru";

export type Language = "uz" | "en" | "ru";

/**
 * Every piece of text shown on the site (including alt texts, aria-labels and
 * SEO structured data) must live here, so each language version is fully
 * translated. Do not hardcode user-facing strings in components.
 */
export type TranslationType = {
  seo: {
    title: string;
    description: string;
    keywords: string;
    image: string;
    /** Alternate business name used in Schema.org structured data */
    alternateName: string;
    city: string;
    country: string;
    faq: { question: string; answer: string }[];
  };
  common: {
    /** Alt text of the Modul Bino logo */
    logoAlt: string;
    menu: string;
    close: string;
    loading: string;
    backToTop: string;
    /** aria-labels of the language switcher buttons */
    switchLanguage: Record<Language, string>;
  };
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
    callUs: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    viewProducts: string;
    contactUs: string;
    imageAlt: string;
    stats: {
      projects: string;
      experience: string;
      productTypes: string;
      warranty: string;
    };
    cards: {
      range: { title: string; subtitle: string };
      delivery: { title: string; subtitle: string };
    };
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    details: string;
    consultation: string;
    advantages: string;
    /** Used in image alt texts: "<product> — <photo> 2" */
    photo: string;
    previousPhoto: string;
    nextPhoto: string;
    items: {
      title: string;
      description: string;
      tag: string;
      fullDescription?: string;
      features?: string[];
    }[];
  };
  about: {
    badge: string;
    title: string;
    description: string;
    features: { title: string; desc: string }[];
    whyMetal: {
      title: string;
      items: string[];
    };
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    addressDistrict: string;
    addressStreet: string;
    instagram: string;
    website: string;
  };
  footer: {
    rights: string;
    slogan: string;
    description: string;
    ctaBadge: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    sectionsTitle: string;
    contactTitle: string;
    tagline: string;
  };
  notFound: {
    message: string;
    backHome: string;
  };
};

export const translations: Record<Language, TranslationType> = {
  uz,
  en,
  ru,
};

export type Translations = TranslationType;
