import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import CTASection from './components/CTASection';
import CarouselSection from './components/CarouselSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// 👇 Contenido editable por Decap CMS
import branding from './content/branding.json';
import home from './content/home.json';

const App: React.FC = () => {
  // Arrays que vienen del CMS (con fallback a [])
  const productsFromCMS =
    (home?.productsCarousel ?? []).map((i) => i.image).filter(Boolean);

  const combosFromCMS =
    (home?.combosCarousel ?? []).map((i) => i.image).filter(Boolean);

  return (
    <div className="min-h-screen">
      <Header logo={branding.logo} />

      <HeroSection
        title="Calidad Premium en cada corte"
        subtitle="Desde Santiago, te traemos carnes de Categoría V, frescas y de origen nacional."
        logo={branding.logo}
        heroRightImage={branding.heroRightImage}
      />

      <ContentSection
        title="Sabor directo a tu puerta"
        text="El auténtico sabor de nuestras carnes llega fresco y rápido hasta tu casa. ¡Preparado para encender la parrilla sin moverte!"
        background="light"
      />

      <CarouselSection
        id="productos"
        title="Nuestros Productos"
        images={productsFromCMS}
        background="dark"
      />

      <ContentSection
        title="Origen 100% nacional, calidad que se siente"
        text="Trabajamos solo con novillos jóvenes de Categoría V, para asegurar frescura, sabor y jugosidad en cada bocado."
        background="light"
      />

      <CTASection
        title="Haz tu pedido por WhatsApp y llévate calidad a domicilio"
        text="Selecciona tu combo o corte favorito y recibe nuestras mejores piezas directo en tu puerta. ¡Listo para asar!"
        buttonText="Pedir por WhatsApp"
        buttonLink="https://wa.me/56987575067"
        background="primary"
      />

      <CarouselSection
        id="combos"
        title="Nuestros Combos"
        images={combosFromCMS}
        background="light"
      />

      <Footer
        text="Síguenos para más tips, recetas y promociones carnivoras"
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
