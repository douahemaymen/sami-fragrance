import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { ContactSection } from '../components/ContactSection';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ products, onAddToCart }) => {
  return (
    <>
      <Hero />

      {/* Collection Section */}
      <section id="collection" className="py-20 md:py-32 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold-600 uppercase tracking-widest text-sm font-bold">Notre Catalogue</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 text-black-900">Collections Exclusives</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-black/50 text-lg">Chargement des produits...</p>
            </div>
          )}
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img
                      src="/SamiFragrance.jpg"
              alt="About Sami Fragrance"
              className="w-full h-[500px] object-cover shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-10">
            <h3 className="font-serif text-4xl mb-6">L'Esprit Sami Fragrance</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Né d'une passion pour les senteurs orientales et la parfumerie moderne, Sami Fragrance incarne le luxe accessible.
              Nous sélectionnons les meilleures essences pour créer des parfums qui marquent les esprits.
            </p>
            <ul className="space-y-4 text-gray-800">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>Essences naturelles de haute qualité</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>Fabrication locale tunisienne</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>Tenue longue durée</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

