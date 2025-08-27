import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import CTASection from './components/CTASection';
import CarouselSection from './components/CarouselSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Contenido CMS (Decap)
import branding from './content/branding.json';
import home from './content/home.json';

// Tipos robustos para elementos del CMS
type ImageLike =
  | string
  | { image?: string | null }
  | null
  | undefined;

// Cache-buster simple (sin depender de defines del bundler)
const BUILD_ID =
  (typeof window !== 'undefined' && (window as any).__BUILD_ID__) ||
  (import.meta as any)?.env?.VITE_BUILD_ID ||
  Date.now().toString(36);

const bust = (url: string) =>
  url ? `${url}${url.includes('?') ? '&' : '?'}v=${BUILD_ID}` : url;

// Normaliza arrays de imágenes que pueden venir como string o como objeto { image }
const toUrl = (item: ImageLike): string => {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item.image ?? '';
};

const normalizeImages = (arr?: ImageLike[]): string[] => {
  const urls = (arr ?? [])
    .map(toUrl)
    .map(u => (typeof u === 'string' ? u.trim() : ''))
    .filter((u): u is string => !!u);

  // cache-busting + de-duplicado preservando orden
  const withBust = urls.map(bust);
  const seen = new Set<string>();
  return withBust.filter(u => (seen.has(u) ? false : (seen.add(u), true)));
};

const App: React.FC = () => {
  // Lee y normaliza desde el CMS
  const productsFromCMS = normalizeImages((home as any)?.productsCarousel);
  const combosFromCMS   = normalizeImages((home as any)?.combosCarousel);

  return (
    <div className="min-h-screen">
      <Header logo={(branding as any)?.logo} />

      <HeroSection
        title="Calidad Premium para tu parrilla"
        subtitle="Cortes seleccionados, frescura garantizada y despacho rápido."
        logo={(branding as any)?.logo}
        heroRightImage={(branding as any)?.heroRightImage}
      />

      <ContentSection
        title="El auténtico sabor de nuestras carnes llega fresco hasta tu casa"
        text="¡Listo para encender la parrilla sin moverte!"
        background="light"
      />

      {productsFromCMS.length > 0 && (
        <CarouselSection
          id="productos"
          title="Nuestros Productos"
          images={productsFromCMS}
          background="dark"
        />
      )}

      {combosFromCMS.length > 0 && (
        <CarouselSection
          id="combos"
          title="Combos y Ofertas"
          images={combosFromCMS}
          background="light"
        />
      )}

      <CTASection
        title="¿Listo para tu pedido?"
        text="Escríbenos por WhatsApp y te asesoramos al instante."
        buttonText="Pedir por WhatsApp"
        buttonLink="https://wa.me/56987575067"
        background="primary"
      />

      <Footer
        text="Síguenos en redes para novedades, ofertas y recetas."
        background="dark"
        instagramLink="https://www.instagram.com/elnegrodelascarnes.cl"
        tiktokLink="https://www.tiktok.com/@elnegrodelascarnes.cl"
        whatsappLink="https://wa.me/56987575067"
      />

      <FloatingWhatsApp
        link="https://wa.me/56987575067"
        position="right-center"
      />
    </div>
  );
};

export default App;
