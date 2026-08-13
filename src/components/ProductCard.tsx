import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  tag?: string;
}

const ProductCard = ({ title, description, image, index, tag }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-hover-shadow transition-all duration-500 hover:-translate-y-1.5 border border-border/50 hover:border-primary/20"
  >
    {/* Image wrapper */}
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        style={{ willChange: "transform" }}
      />
      {/* Gradient overlay — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Tag chip */}
      {tag && (
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs font-semibold border border-white/15">
          {tag}
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 hero-gradient opacity-0 group-hover:opacity-70 transition-opacity duration-400 flex items-end justify-end p-4">
        <div className="flex items-center gap-1.5 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          Batafsil
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default ProductCard;
