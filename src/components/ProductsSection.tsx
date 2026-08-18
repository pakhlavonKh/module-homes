import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";

import mobileHome from "@/assets/mobile.webp";
import oneStory from "@/assets/one-story.webp";
import twoStory from "@/assets/two-story.webp";
import office from "@/assets/office.webp";
import industrial from "@/assets/industrial.webp";
import sanuzel from "@/assets/sanuzel.webp";

const productImages = [mobileHome, oneStory, twoStory, office, industrial, sanuzel];
const productTags = ["Ko'chma", "Bir qavatli", "Ikki qavatli", "Ofis", "Sanoat", "Sanuzel"];

const ProductsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-16 md:py-24 relative">
      {/* Subtle top divider */}
      <div className="section-divider mb-0" />

      <div className="container max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-px bg-accent inline-block" />
            {t.products.badge}
            <span className="w-6 h-px bg-accent inline-block" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-heading font-black text-foreground mt-1 tracking-tight">
            {t.products.title}
          </h2>
          <p className="text-muted-foreground mt-2.5 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Har qanday ehtiyoj uchun zamonaviy modul binolar
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.products.items.map((product, i) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              image={productImages[i]}
              index={i}
              tag={productTags[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
