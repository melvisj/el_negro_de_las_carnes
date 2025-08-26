import React from 'react';
import Carousel from './Carousel';

interface CarouselSectionProps {
  title: string;
  images: string[];
  background: 'light' | 'dark' | 'primary';
  id?: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ 
  title, 
  images, 
  background,
  id
}) => {
  const getBackgroundClasses = () => {
    switch (background) {
      case 'light':
        return 'bg-[#E2E2E3] text-[#0C1922]';
      case 'dark':
        return 'bg-[#0C1922] text-white';
      case 'primary':
        return 'bg-[#A21825] text-white';
      default:
        return 'bg-[#E2E2E3] text-[#0C1922]';
    }
  };

  return (
    <section id={id} className={`py-20 ${getBackgroundClasses()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <Carousel
          images={images}
          autoPlay={true}
          interval={30000}
          className="aspect-16-9 lg:aspect-21-9 rounded-2xl shadow-2xl bg-[#0B1620]"
        />

        </div>
      </div>
    </section>
  );
};

export default CarouselSection;