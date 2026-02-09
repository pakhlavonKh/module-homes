export type Language = "uz" | "en" | "ru";

type TranslationType = {
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
  uz: {
    nav: {
      home: "Bosh sahifa",
      products: "Mahsulotlar",
      about: "Biz haqimizda",
      contact: "Aloqa",
      callUs: "Bog'lanish",
    },
    hero: {
      badge: "Zamonaviy modul qurilish",
      title: "Modul Bino —",
      titleHighlight: "kelajak qurilishi",
      description:
        "Ko'chma uylar, ofis binolari, sanoat inshootlari va modul sanuzllar — tez, sifatli va arzon narxlarda.",
      viewProducts: "Mahsulotlarni ko'rish",
      contactUs: "Biz bilan bog'lanish",
    },
    products: {
      badge: "Mahsulotlar",
      title: "Bizning xizmatlar",
      items: [
        {
          title: "Ko'chma uylar",
          description:
            "Tez o'rnatiladigan, qulay va zamonaviy ko'chma uylar. Har qanday sharoitga moslashtiriladi.",
        },
        {
          title: "Bir qavatli uylar",
          description:
            "Modul texnologiyasi asosida qurilgan zamonaviy bir qavatli yashash uylari.",
        },
        {
          title: "Ikki qavatli uylar",
          description:
            "Keng va shinam ikki qavatli modul uylar — oila uchun ideal tanlov.",
        },
        {
          title: "Ofis binolari",
          description:
            "Zamonaviy dizaynli modul ofis binolari. Tez qurish va yuqori sifat kafolati.",
        },
        {
          title: "Sanoat binolari",
          description:
            "Ishlab chiqarish va ombor uchun mo'ljallangan mustahkam sanoat inshootlari.",
        },
        {
          title: "Modul sanuzel",
          description:
            "To'liq jihozlangan tayyor modul sanitary uzellari — tez o'rnatish va arzon narx.",
        },
      ],
    },
    about: {
      badge: "Biz haqimizda",
      title: "Modul qurilish sohasida ishonchli hamkor",
      description:
        "Biz zamonaviy modul texnologiyalari asosida turli xil binolar — yashash uylari, ofislar, sanoat inshootlari va modul sanuzllarni loyihalash, ishlab chiqarish va o'rnatish bo'yicha xizmat ko'rsatamiz.",
      features: [
        { title: "Tez qurilish", desc: "2-4 hafta ichida tayyor" },
        { title: "Yuqori sifat", desc: "Xalqaro standartlar" },
        { title: "Kafolat", desc: "10 yilgacha kafolat" },
        { title: "To'liq xizmat", desc: "Loyiha + qurilish + o'rnatish" },
      ],
      whyMetal: {
        title: "Nega aynan metall konstruksiya?",
        items: [
          "Tez quriladi",
          "Mustahkam va uzoq xizmat qiladi",
          "Zilzilaga chidamli",
          "Xarajat jihatdan tejamkor",
          "Zamonaviy dizayn imkoniyati",
        ],
      },
    },
    contact: {
      badge: "Aloqa",
      title: "Biz bilan bog'laning",
      phone: "Telefon",
      email: "Email",
      address: "Manzil",
      addressValue: "Shayhontohur tumani, Jangoh dahasi,2",
      instagram: "Instagram",
      website: "Veb-sayt",
    },
    footer: {
      rights: "Barcha huquqlar himoyalangan.",
      slogan: "Sifat — bizning asosiy tamoyilimiz.",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About Us",
      contact: "Contact",
      callUs: "Call Us",
    },
    hero: {
      badge: "Modern modular construction",
      title: "Modul Bino —",
      titleHighlight: "the future of building",
      description:
        "Mobile homes, office buildings, industrial facilities, and prefabricated bathroom units — fast, quality, and affordable.",
      viewProducts: "View Products",
      contactUs: "Contact Us",
    },
    products: {
      badge: "Products",
      title: "Our Services",
      items: [
        {
          title: "Mobile homes",
          description:
            "Quick to install, convenient and modern mobile homes. Adaptable to any conditions.",
        },
        {
          title: "Single-story houses",
          description:
            "Modern single-story residential houses built with modular technology.",
        },
        {
          title: "Two-story houses",
          description:
            "Spacious and cozy two-story modular homes — the ideal choice for families.",
        },
        {
          title: "Office buildings",
          description:
            "Modern design modular office buildings. Fast construction with quality guarantee.",
        },
        {
          title: "Industrial buildings",
          description:
            "Durable industrial facilities designed for manufacturing and warehousing.",
        },
        {
          title: "Prefabricated bathroom units",
          description:
            "Fully equipped modular sanitary units — quick installation at affordable prices.",
        },
      ],
    },
    about: {
      badge: "About Us",
      title: "A reliable partner in modular construction",
      description:
        "We provide design, manufacturing, and installation services for various buildings — residential houses, offices, industrial facilities, and modular bathroom units using modern modular technologies.",
      features: [
        { title: "Fast construction", desc: "Ready in 2-4 weeks" },
        { title: "High quality", desc: "International standards" },
        { title: "Warranty", desc: "Up to 10 years warranty" },
        { title: "Full service", desc: "Design + construction + installation" },
      ],
      whyMetal: {
        title: "Why metal construction?",
        items: [
          "Quick to build",
          "Strong and long-lasting",
          "Earthquake resistant",
          "Cost-effective",
          "Modern design possibilities",
        ],
      },
    },
    contact: {
      badge: "Contact",
      title: "Get in Touch",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressValue: "Shayhontohur District, Jangoh Street, 2",
      instagram: "Instagram",
      website: "Website",
    },
    footer: {
      rights: "All rights reserved.",
      slogan: "Quality is our main principle.",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      products: "Продукция",
      about: "О нас",
      contact: "Контакты",
      callUs: "Позвонить",
    },
    hero: {
      badge: "Современное модульное строительство",
      title: "Modul Bino —",
      titleHighlight: "будущее строительства",
      description:
        "Мобильные дома, офисные здания, промышленные объекты и модульные санузлы — быстро, качественно и доступно.",
      viewProducts: "Смотреть продукцию",
      contactUs: "Связаться с нами",
    },
    products: {
      badge: "Продукция",
      title: "Наши услуги",
      items: [
        {
          title: "Мобильные дома",
          description:
            "Быстро устанавливаемые, удобные и современные мобильные дома. Адаптируются к любым условиям.",
        },
        {
          title: "Одноэтажные дома",
          description:
            "Современные одноэтажные жилые дома, построенные по модульной технологии.",
        },
        {
          title: "Двухэтажные дома",
          description:
            "Просторные и уютные двухэтажные модульные дома — идеальный выбор для семьи.",
        },
        {
          title: "Офисные здания",
          description:
            "Модульные офисные здания современного дизайна. Быстрое строительство с гарантией качества.",
        },
        {
          title: "Промышленные здания",
          description:
            "Прочные промышленные объекты для производства и складирования.",
        },
        {
          title: "Модульные санузлы",
          description:
            "Полностью оборудованные модульные санузлы — быстрая установка по доступным ценам.",
        },
      ],
    },
    about: {
      badge: "О нас",
      title: "Надёжный партнёр в модульном строительстве",
      description:
        "Мы предоставляем услуги по проектированию, производству и монтажу различных зданий — жилых домов, офисов, промышленных объектов и модульных санузлов с использованием современных модульных технологий.",
      features: [
        { title: "Быстрое строительство", desc: "Готово за 2-4 недели" },
        { title: "Высокое качество", desc: "Международные стандарты" },
        { title: "Гарантия", desc: "До 10 лет гарантии" },
        { title: "Полный сервис", desc: "Проект + строительство + монтаж" },
      ],
      whyMetal: {
        title: "Почему металлоконструкции?",
        items: [
          "Быстрое строительство",
          "Прочность и долговечность",
          "Сейсмоустойчивость",
          "Экономичность",
          "Современные дизайнерские решения",
        ],
      },
    },
    contact: {
      badge: "Контакты",
      title: "Свяжитесь с нами",
      phone: "Телефон",
      email: "Email",
      address: "Адрес",
      addressValue: "Шайхонтохурский район, улица Джангох, дом 2",
      instagram: "Instagram",
      website: "Веб-сайт",
    },
    footer: {
      rights: "Все права защищены.",
      slogan: "Качество — наш главный принцип.",
    },
  },
};

export type Translations = TranslationType;
