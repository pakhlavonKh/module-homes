import { uz } from "@/locales/uz";
import { en } from "@/locales/en";
import { ru } from "@/locales/ru";

export type Language = "uz" | "en" | "ru";

export type TranslationType = {
  seo: {
    title: string;
    description: string;
    keywords: string;
    image: string;
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
  };
  products: {
    badge: string;
    title: string;
    items: { title: string; description: string }[];
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
    addressValue: string;
    instagram: string;
    website: string;
  };
  footer: {
    rights: string;
    slogan: string;
  };
};

export const translations: Record<Language, TranslationType> = {
  uz,
  en,
  ru,
};

export type Translations = TranslationType;
