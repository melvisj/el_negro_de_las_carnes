import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
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

  // --- Swipe state ---
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const deltaXRef = useRef(0);

  // Evita índices fuera de rango si cambia el array
  useEffect(() => {
    if (currentIndex >= safeImages.length) setCurrentIndex(0);
  }, [safeImages.length, currentIndex]);

  // Auto-play (pausa mientras se arrastra)
  useEffect(() => {
    if (!autoPlay || safeImages.length <= 1 || isDragging) return;
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeImages.length);
    }, Math.max(2000, interval));
    return () => window.clearInterval(id);
  }, [autoPlay, interval, safeImages.length, isDragging]);

  if (safeImages.length === 0) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="w-full flex items-center justify-center py-16 text-sm text-white/70">
          No hay imágenes para mostrar
        </div>
      </div>
    );
  }

  const goPrev = useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length),
    [safeImages.length]
  );
  const goNext = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % safeImages.length),
    [safeImages.length]
  );

  // Accesibilidad: flechas de teclado
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  // --- Pointer Events (touch + mouse) ---
  const onPointerDown = (e: React.PointerEvent) => {
    if (safeImages.length <= 1) return;

    // ⚠️ Si el down viene de una flecha, NO iniciamos swipe
    const target = e.target as HTMLElement;
    if (target.closest("[data-skip-swipe]")) return;

    // solo botón izquierdo / primario
    if (e.button !== 0) return;

    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    deltaXRef.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    // Si el movimiento vertical domina mucho, ignoramos (dejamos hacer scroll)
    if (Math.abs(dy) > Math.abs(dx) * 1.2) return;

    deltaXRef.current = dx;
    if (containerRef.current) {
      const imgWrap = containerRef.current.querySelector<HTMLDivElement>("[data-imgwrap]");
      if (imgWrap) {
        imgWrap.style.transition = "none";
        imgWrap.style.transform = `translateX(${dx * 0.25}px)`;
      }
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const width = containerRef.current?.offsetWidth ?? 600;
    const threshold = Math.max(40, Math.min(120, Math.round(width * 0.15)));
    const passed = Math.abs(deltaXRef.current) > threshold;

    if (containerRef.current) {
      const imgWrap = containerRef.current.querySelector<HTMLDivElement>("[data-imgwrap]");
      if (imgWrap) {
        imgWrap.style.transition = "transform 200ms ease-out";
        imgWrap.style.transform = "translateX(0px)";
      }
    }

    if (passed) {
      if (deltaXRef.current < 0) goNext();
      else goPrev();
    }

    deltaXRef.current = 0;
  };

  return (
    <div className={`relative w-full ${className}`} onKeyDown={onKeyDown} tabIndex={0}>
      {/* Contenedor visual del carrusel */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-6xl rounded-2xl overflow-hidden select-none"
        style={{
          touchAction: "pan-y",
          WebkitUserSelect: "none",
          userSelect: "none",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Wrapper para animar el arrastre */}
        <div
          data-imgwrap
          className="relative flex items-center justify-center bg-black/10 p-3 md:p-6"
          style={{ transition: "transform 200ms ease-out" }}
        >
          <img
            src={safeImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="block max-w-full h-auto"
            draggable={false}
            loading="eager"
            style={{ maxHeight: "clamp(220px, 65vh, 680px)" }}
          />
        </div>

        {/* Controles */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              data-skip-swipe
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white backdrop-blur-md transition z-10"
              aria-label="Anterior"
            >
              <ChevronLeft />
            </button>

            <button
              type="button"
              data-skip-swipe
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white backdrop-blur-md transition z-10"
              aria-label="Siguiente"
            >
              <ChevronRight />
            </button>
          </>
        )}
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
