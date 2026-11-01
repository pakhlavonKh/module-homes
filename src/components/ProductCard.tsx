import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  tag?: string;
  fullDescription?: string;
  features?: string[];
  gallery?: string[];
}

const ProductCard = ({
  title,
  description,
  image,
  tag,
  fullDescription,
  features,
  gallery,
}: ProductCardProps) => {
  const [open, setOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const { language } = useLanguage();

  const allImages = gallery && gallery.length > 0 ? gallery : [image];

  const detailText = language === "ru" ? "Подробнее" : language === "en" ? "Details" : "Batafsil";
  const contactText =
    language === "ru" ? "Заказать консультацию" : language === "en" ? "Get a consultation" : "Bog'lanish";
  const advantagesText =
    language === "ru" ? "Основные преимущества" : language === "en" ? "Key advantages" : "Asosiy afzalliklari";

  const nextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div
        onClick={() => {
          setActiveImgIndex(0);
          setOpen(true);
        }}
        className="group bg-card rounded-xl md:rounded-2xl overflow-hidden card-shadow hover:card-hover-shadow transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30 cursor-pointer flex flex-col h-full"
      >
        {/* Image wrapper */}
        <div className="relative overflow-hidden aspect-[16/10] flex-shrink-0 bg-white">
          <img
            src={image}
            alt={`${title} — Modul Bino`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            style={{ willChange: "transform" }}
          />
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Tag chip */}
          {tag && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
              {tag}
            </span>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 hero-gradient opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-end justify-end p-3">
            <div className="flex items-center gap-1.5 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
              <span>{detailText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-primary font-medium">
            <span>{detailText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[92vh] md:max-h-[85vh] p-0 gap-0 border-border bg-card overflow-hidden rounded-2xl flex flex-col md:flex-row shadow-2xl">
          {/* Left Column: Image Viewer */}
          <div className="w-full md:w-[48%] flex flex-col bg-white md:border-r border-border/70 flex-shrink-0 relative overflow-hidden">
            <div className="relative w-full h-64 sm:h-72 md:h-full md:min-h-[420px] bg-white flex items-center justify-center overflow-hidden p-2 sm:p-4">
              <img
                src={allImages[activeImgIndex]}
                alt={`${title} — foto ${activeImgIndex + 1}`}
                className="w-full h-full object-contain transition-all duration-300"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center backdrop-blur-sm border border-border/80 transition-all z-10 cursor-pointer shadow-md hover:scale-105"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center backdrop-blur-sm border border-border/80 transition-all z-10 cursor-pointer shadow-md hover:scale-105"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white/95 text-foreground text-xs font-semibold border border-border/80 backdrop-blur-md shadow-sm z-10">
                    {activeImgIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails row if multiple images */}
            {allImages.length > 1 && (
              <div className="flex gap-2 p-2.5 bg-muted/30 overflow-x-auto border-t border-border/70 flex-shrink-0">
                {allImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative flex-shrink-0 w-14 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                      idx === activeImgIndex
                        ? "border-primary scale-105 shadow-md"
                        : "border-border/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full md:w-[52%] flex flex-col justify-between p-5 sm:p-7 overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-card">
            <div className="space-y-4">
              <DialogHeader className="text-left space-y-2">
                {tag && (
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                      {tag}
                    </span>
                  </div>
                )}
                <DialogTitle className="text-xl sm:text-2xl font-heading font-bold text-foreground tracking-tight leading-snug">
                  {title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                  {fullDescription || description}
                </DialogDescription>
              </DialogHeader>

              {/* Key Advantages / Features */}
              {features && features.length > 0 && (
                <div className="rounded-xl bg-background p-4 sm:p-5 border border-border/80 space-y-2.5">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    <span>{advantagesText}</span>
                  </h4>
                  <ul className="space-y-2">
                    {features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-foreground/90 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 stroke-[2]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="pt-4 mt-4 border-t border-border/60 flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto flex-1 hero-gradient text-primary-foreground px-5 py-2.5 rounded-xl font-heading font-bold text-sm text-center shadow hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{contactText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+998998635050"
                className="w-full sm:w-auto bg-secondary text-secondary-foreground border border-border px-4 py-2.5 rounded-xl font-heading font-semibold text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+998 99 863 5050</span>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
