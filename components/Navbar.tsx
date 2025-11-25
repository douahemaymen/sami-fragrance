import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Phone } from 'lucide-react';
import { CartItem } from '../types';
import logo from '../assets/logo.png';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItems, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ease-out ${isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-lg py-4'
          : 'bg-white/95 backdrop-blur-sm py-6'
        }`}
      style={{
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Section - Élégant et Minimaliste */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-4 group relative"
          >
            <div className={`relative transition-all duration-500 ${isScrolled ? 'w-11 h-11' : 'w-14 h-14'
              }`}>
              {/* Cercle de fond subtil */}
              <div className="absolute inset-0 bg-black/5 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>

              <img
                src={logo}
                alt="PARFUM Logo"
                className="relative w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="hidden sm:block">
              <div className={`font-serif font-bold tracking-[0.15em] transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-2xl'
                } text-black`}>
                SAMI
              </div>
              <div className="text-[0.6rem] tracking-[0.25em] text-black/50 font-light uppercase mt-0.5">
                Fragrance
              </div>
            </div>
          </button>

          {/* Desktop Navigation - Design Épuré et Sophistiqué */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { id: 'home', label: 'Accueil' },
              { id: 'collection', label: 'Collection' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative px-6 py-2.5 text-sm font-medium tracking-wide text-black/80 hover:text-black transition-all duration-300 group overflow-hidden"
              >
                {/* Texte du lien */}
                <span className="relative z-10 inline-block group-hover:-translate-y-0.5 transition-transform duration-300">
                  {link.label}
                </span>

                {/* Ligne de soulignement élégante */}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-black group-hover:w-[70%] transition-all duration-500 ease-out"></span>

                {/* Effet de fond subtil au survol */}
                <span className="absolute inset-0 bg-black/[0.02] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-lg"></span>
              </button>
            ))}
          </div>

          {/* Actions - Boutons Premium */}
          <div className="flex items-center space-x-3">
            {/* Bouton Panier - Design Minimaliste Premium */}
            <button
              onClick={onOpenCart}
              className="relative group"
            >
              <div className={`relative px-4 py-2.5 rounded-full transition-all duration-300 border ${isScrolled
                  ? 'bg-black/[0.03] hover:bg-black/[0.06] border-black/10 hover:border-black/20'
                  : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/10 hover:border-black/20'
                } hover:shadow-md`}>
                <ShoppingBag
                  size={18}
                  className="text-black/80 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                  strokeWidth={1.5}
                />

                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Button - Élégant */}
            <button
              className={`md:hidden px-3 py-2.5 rounded-full transition-all duration-300 border ${isScrolled
                  ? 'bg-black/[0.03] hover:bg-black/[0.06] border-black/10 hover:border-black/20'
                  : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/10 hover:border-black/20'
                } hover:shadow-md`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={18} className="text-black/80" strokeWidth={1.5} />
              ) : (
                <Menu size={18} className="text-black/80" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Design Moderne et Épuré */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl shadow-2xl border-t border-black/5">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-2">
            {[
              { id: 'home', label: 'Accueil' },
              { id: 'collection', label: 'Collection' },
              { id: 'contact', label: 'Contact' }
            ].map((link, index) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative px-6 py-4 text-base font-medium tracking-wide text-black/80 hover:text-black transition-all duration-300 group rounded-xl hover:bg-black/[0.03] text-left"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Indicateur vertical au survol */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-black group-hover:h-[60%] transition-all duration-300 rounded-r"></span>
              </button>
            ))}

            {/* Contact dans le menu mobile */}
            <div className="pt-6 mt-4 border-t border-black/5">
              <a
                href="tel:50997060"
                className="flex items-center justify-center space-x-3 px-6 py-4 bg-black/[0.04] hover:bg-black/[0.08] rounded-xl border border-black/10 hover:border-black/20 transition-all duration-300 group"
              >
                <Phone
                  size={18}
                  className="text-black/80 group-hover:text-black group-hover:rotate-12 transition-all duration-300"
                  strokeWidth={1.5}
                />
                <span className="text-black/80 group-hover:text-black font-semibold tracking-wide">50 997 060</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};