import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div 
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 uppercase tracking-widest z-10">
            Nouveau
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Quick Add Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-0 right-0 bg-gold-500 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-black"
        >
          <Plus size={24} />
        </button>
      </div>

      <div 
        className="p-6 text-center cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <span className="text-gray-500 text-xs uppercase tracking-wider">{product.category}</span>
        <h3 className="font-serif text-xl my-2 text-gray-900 group-hover:text-gold-600 transition-colors">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3 h-10">{product.description}</p>
        <div className="text-lg font-bold text-black">
          {product.price.toFixed(2)} TND
        </div>
      </div>
    </div>
  );
};