import React, { useMemo, useState } from "react";

type RawLocation = {
  title: string;        // Nombre corto para el selector (ej: "San Diego")
  address: string;      // Dirección completa
  embedUrl?: string;    // Opcional: URL de Google Maps Embed
  mapsLink?: string;    // Opcional: URL directa a Google Maps / Cómo llegar
};

type MapSectionProps = {
  title?: string;
  locations: RawLocation[];
  background?: "light" | "dark" | "primary";
};

const bgByKind: Record<NonNullable<MapSectionProps["background"]>, string> = {
  light: "bg-slate-50 text-slate-900",
  dark: "bg-slate-900 text-white",
  primary: "bg-red-700 text-white",
};

// Arma URLs seguras si no vienen provistas
function withComputedLinks(loc: RawLocation) {
  const embed =
    loc.embedUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(loc.address)}&output=embed`;

  const directions =
    loc.mapsLink ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      loc.address
    )}`;

  const view =
    loc.mapsLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`;

  return {
    ...loc,
    embedUrl: embed,
    mapsLink: directions,
    viewLink: view,
  };
}

const MapSection: React.FC<MapSectionProps> = ({
  title = "¿Dónde estamos?",
  locations,
  background = "light",
}) => {
  const bg = bgByKind[background] || bgByKind.light;

  const items = useMemo(() => locations.map(withComputedLinks), [locations]);
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const current = items[Math.min(active, items.length - 1)];

  return (
    <section id="ubicacion" className={`${bg} py-12 md:py-16`}>
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>

        {/* Selector de ubicación */}
        {items.length > 1 && (
          <div className="mt-4 inline-flex rounded-full bg-white/70 text-slate-900 ring-1 ring-black/10 p-1 gap-1">
            {items.map((loc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  i === active
                    ? "bg-slate-900 text-white"
                    : "hover:bg-white/80"
                }`}
              >
                {loc.title}
              </button>
            ))}
          </div>
        )}

        {/* Dirección activa */}
        <p className="mt-3 opacity-80 text-base md:text-lg">{current.address}</p>

        {/* Mapa */}
        <div className="mt-6 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/10">
          <iframe
            key={current.embedUrl} // fuerza refresco al cambiar
            src={current.embedUrl}
            className="w-full"
            style={{ aspectRatio: "16/9", border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            title={`Mapa ${current.title}`}
          />
        </div>

        {/* Acciones */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={current.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium shadow-sm ring-1 ring-black/10 hover:shadow transition bg-white text-slate-900"
          >
            Cómo llegar con Google Maps
          </a>
          <a
            href={current.viewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium shadow-sm ring-1 ring-black/10 hover:shadow transition bg-white/80 text-slate-900"
          >
            Abrir ubicación en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
