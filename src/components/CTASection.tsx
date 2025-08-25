import React from 'react';

interface CTASectionProps {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  background: 'light' | 'dark' | 'primary';
}

const CTASection: React.FC<CTASectionProps> = ({ 
  title, 
  text, 
  buttonText, 
  buttonLink, 
  background 
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
        return 'bg-[#A21825] text-white';
    }
  };

  const getButtonClasses = () => {
    switch (background) {
      case 'light':
        return 'bg-[#A21825] hover:bg-[#8B1520] text-white';
      case 'dark':
        return 'bg-[#A21825] hover:bg-[#8B1520] text-white';
      case 'primary':
        return 'bg-white hover:bg-gray-100 text-[#A21825]';
      default:
        return 'bg-white hover:bg-gray-100 text-[#A21825]';
    }
  };

  return (
    <section className={`py-20 ${getBackgroundClasses()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
          {text}
        </p>
        <a 
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block ${getButtonClasses()} font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default CTASection;