import React from 'react';
import { Phone } from 'lucide-react';

interface FloatingWhatsAppProps {
  link: string;
  position?: 'right-center' | 'right-bottom' | 'left-center' | 'left-bottom';
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ 
  link, 
  position = 'right-center' 
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'right-center':
        return 'right-6 top-1/2 transform -translate-y-1/2';
      case 'right-bottom':
        return 'right-6 bottom-6';
      case 'left-center':
        return 'left-6 top-1/2 transform -translate-y-1/2';
      case 'left-bottom':
        return 'left-6 bottom-6';
      default:
        return 'right-6 top-1/2 transform -translate-y-1/2';
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-50 ${getPositionClasses()} bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`}
      aria-label="Contactar por WhatsApp"
    >
      <Phone className="w-6 h-6" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </a>
  );
};

export default FloatingWhatsApp;