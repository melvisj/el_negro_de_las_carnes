// src/App.tsx
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import CTASection from './components/CTASection';
import CarouselSection from './components/CarouselSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// 👇 Contenido editable por Decap CMS (Netlify CMS)
import branding from './content/branding.json';

const App: React.FC = () => {
  // Si más adelante quieres mover estos arrays al CMS, se puede.
  const productImages = [
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756177608/WhatsApp_Image_2025-08-25_at_11.04.54_PM_f0jcgi.jpg",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078775/Primera_vacuno_corte_v_zaltwv.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078776/Segunda_precios_1_tzv2qq.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078776/tercera_precios_2_sjkorq.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078771/cuarta_subproductos_bji0u2.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078776/quinta_precios_3_pfasee.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078776/sexta_cerdo_f1ls3q.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078776/septima_precios_4_f7sxme.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078773/octava_pollo_cdrij8.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078772/novena_precios_5_c3ef1o.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078771/decima_cortes_parrileros_n1jeix.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078773/onceava_precios_6_v083vb.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078772/doceava_chorizos_x9dng3.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078776/treceava_precios_7_bqa4qx.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078771/catorceava_embutidos_kbkidy.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078776/quinceava_precios_8_cxmgbm.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078772/diecisieteava_cecinas_drqbj3.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078771/dieciochoava_precios_10_vsp1gp.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078771/diecinueveava_productos_don_70_wn6pkh.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078778/vigesima_precios_11_qbbeb7.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078778/vigesimaprimera_masas_congeladas_vmoiv1.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078779/vigesimosegunda_precios_12_za8nmx.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078781/vigesimotercera_contacto_sofpfu.png"
  ];

  const comboImages = [
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078779/vigesimoquinta_combos_ucvl0w.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078781/vigesimosexta_combo_1_sou95z.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078781/vigesimoseptima_combo_2_usgs6v.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078779/vigesimooctava_combo_3_xffbfa.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078779/vigesimonovena_combo_4_xoewug.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078778/treinteava_combo_5_elxvxw.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078778/trigesimoprimera_combo_6_nqqvlz.png",
    "https://res.cloudinary.com/db3zlgzix/image/upload/v1756078778/trigesimosegunda_combo_7_ebhlyz.png"
  ];

  return (
    <div className="min-h-screen">
      {/* Si tu Header ya no usa logo (texto tipográfico), puede ignorar esta prop */}
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
        images={productImages.slice(1)}
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
        images={comboImages}
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
