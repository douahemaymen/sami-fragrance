import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl mb-6">SAMI FRAGRANCE</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          L'essence de la beauté tunisienne. Des parfums authentiques pour des moments inoubliables.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-8">
          <a href="#" className="hover:text-gold-500">Mentions Légales</a>
          <a href="#" className="hover:text-gold-500">Politique de Confidentialité</a>
          <a href="#" className="hover:text-gold-500">Livraison & Retours</a>
        </div>
        <div className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Sami Fragrance. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};