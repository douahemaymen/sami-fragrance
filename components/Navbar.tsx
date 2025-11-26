import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Phone, Search } from 'lucide-react';
import { CartItem, Product } from '../types';
import { database } from '../firebase.config';
import { ref, onValue } from 'firebase/database';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItems, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const perfumesRef = ref(database, 'perfumes');
      const unsubscribe = onValue(perfumesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const allProducts = Object.entries(data).map(([id, perfume]: [string, any]) => ({
            id: parseInt(id.replace(/\D/g, '')) || Math.random(),
            name: perfume.name,
            price: perfume.price,
            description: perfume.description,
            image: perfume.image,
            category: perfume.category || 'Unisexe'
          }));

          const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );

          setSearchResults(filtered);
          setShowSearchResults(true);
        } else {
          setSearchResults([]);
          setShowSearchResults(true);
        }
      });

      return () => unsubscribe();
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

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

  const handleProductClick = (productId: number) => {
    setSearchQuery('');
    setShowSearchResults(false);
    navigate(`/product/${productId}`);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-out bg-white shadow-md ${isScrolled ? 'py-3' : 'py-4'
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Section - Élégant et Minimaliste */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 group relative"
          >
            <div className={`relative transition-all duration-500 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              }`}>
              <img
                src="/logo.png"
                alt="PARFUM Logo"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="hidden sm:block">
              <div className={`font-serif font-bold tracking-[0.15em] transition-all duration-500 ${isScrolled ? 'text-lg' : 'text-xl'
                } text-gray-900`}>
                SAMI
              </div>
              <div className="text-[0.55rem] tracking-[0.3em] text-gray-600 font-medium uppercase">
                Fragrance
              </div>
            </div>
          </button>

          {/* Desktop Navigation - Design Épuré et Sophistiqué */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { id: 'home', label: 'Accueil' },
              { id: 'collection', label: 'Collection' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative px-5 py-2 text-sm font-semibold tracking-wide text-gray-800 hover:text-black transition-all duration-300 group"
              >
                <span className="relative z-10">
                  {link.label}
                </span>
                {/* Ligne de soulignement */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-black group-hover:w-[60%] transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
              <input
                type="text"
                placeholder="Rechercher un parfum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">{product.price} TND</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showSearchResults && searchResults.length === 0 && searchQuery.trim().length > 0 && (
              <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50">
                <p className="text-gray-500 text-sm text-center">Aucun produit trouvé</p>
              </div>
            )}
          </div>

          {/* Actions - Boutons Premium */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile Only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <Search size={20} className="text-gray-800" strokeWidth={2} />
            </button>

            {/* Bouton Panier - Design Minimaliste Premium */}
            <button
              onClick={onOpenCart}
              className="relative group px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <ShoppingBag
                size={20}
                className="text-gray-800 group-hover:text-black transition-colors duration-300"
                strokeWidth={2}
              />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button - Élégant */}
            <button
              className="md:hidden px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-gray-800" strokeWidth={2} />
              ) : (
                <Menu size={20} className="text-gray-800" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Design Moderne et Épuré */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-3">
            {/* Search Bar - Mobile */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
              <input
                type="text"
                placeholder="Rechercher un parfum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              />
            </div>

            {/* Search Results - Mobile */}
            {searchQuery.trim().length > 0 && searchResults.length > 0 && (
              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">Résultats</p>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors duration-200 rounded-lg border border-gray-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">{product.price} TND</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchQuery.trim().length > 0 && searchResults.length === 0 && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm text-center">Aucun produit trouvé</p>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'collection', label: 'Collection' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="px-4 py-3 text-base font-semibold tracking-wide text-gray-800 hover:text-black hover:bg-gray-100 transition-all duration-300 rounded-lg text-left w-full"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Contact dans le menu mobile */}
            <div className="pt-4 mt-2 border-t border-gray-200">
              <a
                href="tel:50997060"
                className="flex items-center justify-center space-x-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                <Phone
                  size={18}
                  className="text-gray-800"
                  strokeWidth={2}
                />
                <span className="text-gray-800 font-bold tracking-wide">50 997 060</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
