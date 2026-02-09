import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";

import mobileHome from "@/assets/mobile.jpg";
import oneStory from "@/assets/one-story.jpg";
import twoStory from "@/assets/two-story.jpg";
import office from "@/assets/office.jpg";
import industrial from "@/assets/industrial.jpg";
import sanuzel from "@/assets/sanuzel.jpg";

const productImages = [mobileHome, oneStory, twoStory, office, industrial, sanuzel];

const ProductsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            {t.products.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground mt-3">
            {t.products.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.products.items.map((product, i) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              image={productImages[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
