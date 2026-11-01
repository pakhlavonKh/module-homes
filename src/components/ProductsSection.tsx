import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";

import mobileHome from "@/assets/mobile.webp";
import oneStory from "@/assets/one-story.webp";
import twoStory from "@/assets/two-story.webp";
import office from "@/assets/office.webp";
import industrial from "@/assets/industrial.webp";
import sanuzel from "@/assets/sanuzel.webp";

import platform3 from "@/assets/platform3.jpg";
import platform1 from "@/assets/platform.jpg";
import platform2 from "@/assets/platform2.jpg";
import platform4 from "@/assets/platform4.jpg";
import platform5 from "@/assets/platform5.jpg";
import platform6 from "@/assets/platform6.jpg";

import freightElevator2 from "@/assets/freightElevator2.jpg";
import freightElevator1 from "@/assets/freightElevator.jpg";

import furniture from "@/assets/furniture.png";

const productImages = [
  mobileHome,
  oneStory,
  twoStory,
  office,
  industrial,
  sanuzel,
  platform3,
  freightElevator2,
  furniture,
];

const productGalleries: (string[] | undefined)[] = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  [platform3, platform2, platform1, platform4, platform5, platform6],
  [freightElevator2, freightElevator1],
  [furniture],
];

const fallbackTags = [
  "Ko'chma",
  "Bir qavatli",
  "Ikki qavatli",
  "Ofis",
  "Sanoat",
  "Sanuzel",
  "Platforma",
  "Lift",
  "Mebel",
];

const ProductsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-16 md:py-20 lg:py-24 relative">
      {/* Subtle top divider */}
      <div className="section-divider mb-0" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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
            Har qanday ehtiyoj uchun zamonaviy modul binolar va metall konstruksiyalar
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {t.products.items.map((product, i) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              fullDescription={product.fullDescription}
              features={product.features}
              image={productImages[i] || mobileHome}
              gallery={productGalleries[i]}
              index={i}
              tag={product.tag || fallbackTags[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
