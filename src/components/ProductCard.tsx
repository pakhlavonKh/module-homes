import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

const ProductCard = ({ title, description, image, index }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-hover-shadow transition-shadow duration-300"
  >
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6">
      <h3 className="font-heading font-bold text-xl text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default ProductCard;
