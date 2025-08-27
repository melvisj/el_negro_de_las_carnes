import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = false,
  interval = 30000,
  showIndicators = true,
  className = "",
}) => {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Evita índices fuera de rango si cambia el array
  useEffect(() => {
    if (currentIndex >= safeImages.length) setCurrentIndex(0);
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
      <div className={`relative w-full ${className}`}>
        <div className="w-full flex items-center justify-center py-16 text-sm text-white/70">
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
    <div className={`relative w-full ${className}`}>
      {/* Contenedor visual del carrusel */}
      <div className="relative mx-auto w-full max-w-6xl rounded-2xl overflow-hidden">
        {/* Wrapper para centrar la imagen y dar altura mínima sin forzarla */}
        <div className="relative flex items-center justify-center bg-black/10 p-3 md:p-6">
          <img
            src={safeImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="block max-w-full h-auto select-none"
            draggable={false}
            loading="eager"
            // Limita altura sin deformar (no usamos h-full para no estirar)
            style={{ maxHeight: "clamp(220px, 65vh, 680px)" }}
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
        </div>
      </div>

      {/* Indicadores */}
      {showIndicators && safeImages.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {safeImages.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full border border-white/60 cursor-pointer ${
                i === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
