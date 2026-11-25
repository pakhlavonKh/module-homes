/**
 * Post-build step: writes dist/<lang>/index.html (/uz, /ru, /en) with the
 * <html lang>, title, meta/OG/Twitter tags, canonical URL and Schema.org JSON-LD
 * fully translated, so each language page is correct before any JS runs.
 *
 * Texts come straight from src/locales (loaded through Vite), so the static
 * HTML always matches what the React app renders for that language.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

/** Loads the TypeScript translation + SEO modules with the project's Vite config (aliases etc.). */
const loadModules = async () => {
  const vite = await createServer({
    root: projectRoot,
    logLevel: "error",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const { translations } = await vite.ssrLoadModule("/src/lib/i18n.ts");
    const { localizeHtml } = await vite.ssrLoadModule("/src/lib/seo.ts");
    return { translations, localizeHtml };
  } finally {
    await vite.close();
  }
};

const { translations, localizeHtml } = await loadModules();
const baseHtml = fs.readFileSync(indexPath, "utf-8");

for (const [lang, t] of Object.entries(translations)) {
  const html = localizeHtml(baseHtml, { t, language: lang });

  const targetDir = path.join(distDir, lang);
  fs.mkdirSync(targetDir, { recursive: true });

  const targetFile = path.join(targetDir, "index.html");
  fs.writeFileSync(targetFile, html, "utf-8");
  console.log(`Generated ${path.relative(projectRoot, targetFile)} with lang="${lang}"`);
}
