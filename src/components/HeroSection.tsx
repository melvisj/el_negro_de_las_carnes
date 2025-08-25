import React from 'react';
import Carousel from './Carousel';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  logo: string;
  carouselImages: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  subtitle, 
  logo, 
  carouselImages 
}) => {
  return (
    <section className="relative min-h-screen bg-[#0C1922] text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-32">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <img 
              src={logo} 
              alt="ElNegroDeLasCarnes" 
              className="h-24 w-auto mx-auto lg:mx-0 mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <a 
              href="https://wa.me/56987575067"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#A21825] hover:bg-[#8B1520] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Pedir por WhatsApp
            </a>
          </div>

          {/* Right Content - Carousel */}
          <div className="lg:w-1/2 lg:pl-12">
            <div className="max-w-md mx-auto lg:max-w-full">
              <Carousel 
                images={carouselImages} 
                autoPlay={true}
                interval={4000}
                className="h-96 lg:h-[500px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-[#E2E2E3]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;