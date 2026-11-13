import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, "utf-8");

const localizations = [
  {
    lang: "uz",
    subDir: "uz",
    canonicalUrl: "https://modulbino.uz/uz",
    title: "Modul Bino — Zamonaviy Modul Qurilish | Toshkent, O'zbekiston",
    description:
      "O'zbekistonda zamonaviy modul uylar, ko'chma ofislar, sanoat inshootlari va tayyor modul sanuzllar. Tez qurilish (2-4 hafta), 10 yilgacha kafolat va hamyonbop narxlar.",
    keywords:
      "modul qurilish, modul bino, ko'chma uylar, modul ofis, metall konstruksiya, sanoat binolari, modul sanuzel, modul uylar narxi toshkent",
    ogLocale: "uz_UZ",
    altLocales: ["ru_RU", "en_US"],
  },
  {
    lang: "ru",
    subDir: "ru",
    canonicalUrl: "https://modulbino.uz/ru",
    title: "Modul Bino — Современное модульное строительство | Ташкент, Узбекистан",
    description:
      "Модульные дома, мобильные офисы, промышленные здания и готовые сантехнические модули в Узбекистане. Строительство за 2-4 недели, гарантия до 10 лет.",
    keywords:
      "модульное строительство, модульные дома ташкент, мобильные офисы, металлоконструкции узбекистан, промышленные здания, модульные санузлы, быстровозводимые здания",
    ogLocale: "ru_RU",
    altLocales: ["uz_UZ", "en_US"],
  },
  {
    lang: "en",
    subDir: "en",
    canonicalUrl: "https://modulbino.uz/en",
    title: "Modul Bino — Modern Modular Construction | Tashkent, Uzbekistan",
    description:
      "Modern prefabricated modular homes, mobile office cabins, industrial buildings, and prefabricated bathroom units in Uzbekistan. Fast 2-4 week construction with up to 10-year warranty.",
    keywords:
      "modular construction uzbekistan, prefabricated homes tashkent, modular buildings, mobile office containers, industrial metal buildings, prefabricated bathrooms",
    ogLocale: "en_US",
    altLocales: ["uz_UZ", "ru_RU"],
  },
];

for (const loc of localizations) {
  let localizedHtml = baseHtml;

  // 1. Replace <html lang="...">
  localizedHtml = localizedHtml.replace(/<html lang="[^"]*"/i, `<html lang="${loc.lang}"`);

  // 2. Replace <title>
  localizedHtml = localizedHtml.replace(/<title>.*?<\/title>/i, `<title>${loc.title}</title>`);

  // 3. Replace Primary Meta Tags
  localizedHtml = localizedHtml.replace(
    /<meta name="title" content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${loc.title}" />`
  );
  localizedHtml = localizedHtml.replace(
    /<meta name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${loc.description}" />`
  );
  localizedHtml = localizedHtml.replace(
    /<meta name="keywords"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${loc.keywords}" />`
  );

  // 4. Canonical
  localizedHtml = localizedHtml.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${loc.canonicalUrl}" />`
  );

  // 5. Open Graph
  localizedHtml = localizedHtml.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${loc.canonicalUrl}" />`
  );
  localizedHtml = localizedHtml.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${loc.title}" />`
  );
  localizedHtml = localizedHtml.replace(
    /<meta property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${loc.description}" />`
  );
  localizedHtml = localizedHtml.replace(
    /<meta property="og:locale" content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${loc.ogLocale}" />`
  );

  // Remove existing alternate og:locale tags and append the new ones
  localizedHtml = localizedHtml.replace(
    /<meta property="og:locale:alternate"[^>]*>\s*/gi,
    ""
  );
  const altTags = loc.altLocales
    .map((l) => `<meta property="og:locale:alternate" content="${l}" />\n  `)
    .join("");
  localizedHtml = localizedHtml.replace(
    /(<meta property="og:locale"[^>]*>)/i,
    `$1\n  ${altTags.trim()}`
  );

  // 6. Twitter Card
  localizedHtml = localizedHtml.replace(
    /<meta name="twitter:url" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${loc.canonicalUrl}" />`
  );
  localizedHtml = localizedHtml.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${loc.title}" />`
  );
  localizedHtml = localizedHtml.replace(
    /<meta name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${loc.description}" />`
  );

  const targetDir = path.join(distDir, loc.subDir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, "index.html");
  fs.writeFileSync(targetFile, localizedHtml, "utf-8");
  console.log(`Generated ${targetFile} with lang="${loc.lang}"`);
}
