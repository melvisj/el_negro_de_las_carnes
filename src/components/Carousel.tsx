import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  className?: string; // se mezcla con el wrapper
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = false,
  interval = 30000,
  showIndicators = true,
  className = "",
}) => {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Evita índices fuera de rango si cambia el array
  useEffect(() => {
    if (currentIndex >= safeImages.length) {
      setCurrentIndex(0);
    }
  }, [safeImages.length, currentIndex]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || safeImages.length <= 1) return;
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeImages.length);
    }, Math.max(2000, interval));
    return () => window.clearInterval(id);
  }, [autoPlay, interval, safeImages.length]);

  if (safeImages.length === 0) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <div className="w-full h-full flex items-center justify-center text-sm text-white/70">
          No hay imágenes para mostrar
        </div>
      </div>
    );
  }

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Imagen */}
      <img
        src={safeImages[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-contain md:object-cover select-none"
        draggable={false}
        loading="eager"
      />

      {/* Controles */}
      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white backdrop-blur-md transition"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white backdrop-blur-md transition"
            aria-label="Siguiente"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Indicadores */}
      {showIndicators && safeImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {safeImages.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full border border-white/60 cursor-pointer ${i === currentIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
