import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a 
            href="https://wa.me/56987575067" 
            className="font-brand text-xl md:text-2xl tracking-wide text-brandDark"
            >
            EL NEGRO
            </a>
            <a 
            href="https://wa.me/56987575067" 
            className="font-brand text-xl md:text-2xl tracking-wide text-brandRed"
            >
            DE LAS CARNES
            </a>

          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#productos" 
              className="text-gray-700 hover:text-[#A21825] transition-colors duration-200"
            >
              Productos
            </a>
            <a 
              href="#combos" 
              className="text-gray-700 hover:text-[#A21825] transition-colors duration-200"
            >
              Combos
            </a>
            <a 
              href="https://wa.me/56987575067" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#A21825] text-white px-6 py-2 rounded-full hover:bg-[#8B1520] transition-colors duration-200"
            >
              Pedir Ahora
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a 
              href="#productos" 
              className="block px-3 py-2 text-gray-700 hover:text-[#A21825]"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </a>
            <a 
              href="#combos" 
              className="block px-3 py-2 text-gray-700 hover:text-[#A21825]"
              onClick={() => setIsMenuOpen(false)}
            >
              Combos
            </a>
            <a 
              href="https://wa.me/56987575067" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mx-3 mt-4 bg-[#A21825] text-white px-6 py-2 rounded-full text-center hover:bg-[#8B1520]"
            >
              Pedir Ahora
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;