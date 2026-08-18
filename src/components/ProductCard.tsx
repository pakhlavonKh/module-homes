import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  tag?: string;
}

const ProductCard = ({ title, description, image, tag }: ProductCardProps) => (
  <div className="group bg-card rounded-xl md:rounded-2xl overflow-hidden card-shadow hover:card-hover-shadow transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/20">
    {/* Image wrapper */}
    <div className="relative overflow-hidden aspect-[16/10]">
      <img
        src={image}
        alt={`${title} — Modul Bino`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        style={{ willChange: "transform" }}
      />
      {/* Gradient overlay — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Tag chip */}
      {tag && (
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-white text-[11px] font-semibold border border-white/15">
          {tag}
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 hero-gradient opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end justify-end p-3">
        <div className="flex items-center gap-1 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          Batafsil
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-4 sm:p-5">
      <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2">{description}</p>
    </div>
  </div>
);

export default ProductCard;
