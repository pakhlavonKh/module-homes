import { motion } from "framer-motion";
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
    <section id="products" className="py-24 md:py-32 relative">
      {/* Subtle top divider */}
      <div className="section-divider mb-0" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            <span className="w-6 h-px bg-accent inline-block" />
            {t.products.badge}
            <span className="w-6 h-px bg-accent inline-block" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground mt-2 tracking-tight">
            {t.products.title}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base leading-relaxed">
            Har qanday ehtiyoj uchun zamonaviy modul binolar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
