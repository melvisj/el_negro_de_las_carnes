import React from 'react';

interface ContentSectionProps {
  title: string;
  text?: string;
  background: 'light' | 'dark' | 'primary';
  children?: React.ReactNode;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  title, 
  text, 
  background, 
  children, 
  className = "" 
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
    <section className={`py-20 ${getBackgroundClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          {text && (
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              {text}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default ContentSection;