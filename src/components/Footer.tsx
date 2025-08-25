import React from 'react';
import { Instagram, Music2, Phone } from 'lucide-react';

interface FooterProps {
  text: string;
  background: 'light' | 'dark' | 'primary';
  instagramLink: string;
  tiktokLink: string;
  whatsappLink: string;
}

const Footer: React.FC<FooterProps> = ({ 
  text, 
  background, 
  instagramLink, 
  tiktokLink, 
  whatsappLink 
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
        return 'bg-[#0C1922] text-white';
    }
  };

  return (
    <footer className={`py-20 ${getBackgroundClasses()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          {text}
        </p>
        
        <div className="flex justify-center space-x-8 mb-12">
          <a 
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-lg hover:shadow-xl">
              <Instagram className="w-8 h-8 text-white" />
            </div>
          </a>
          
          <a 
            href={tiktokLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-black p-4 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-lg hover:shadow-xl">
              <Music2 className="w-8 h-8 text-white" />
            </div>
          </a>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-green-500 p-4 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-lg hover:shadow-xl">
              <Phone className="w-8 h-8 text-white" />
            </div>
          </a>
        </div>

        <div className="border-t border-gray-600 pt-8">
          <p className="text-gray-400">
            © 2025 ElNegroDeLasCarnes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;