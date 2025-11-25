import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ products, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Produit non trouvé</h2>
          <button
            onClick={() => navigate('/')}
            className="text-gold-500 hover:text-gold-600 underline transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square bg-gray-100">
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-2 uppercase tracking-widest z-10">
                Nouveau
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="text-gold-600 text-sm uppercase tracking-widest mb-2">
              {product.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mb-6 text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="text-3xl font-bold text-black mb-8">
              {product.price.toFixed(2)} TND
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-700 font-medium">Quantité:</span>
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gold-500 text-white py-4 px-8 uppercase tracking-widest text-sm font-bold hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ajouter au panier
            </button>

            {/* Product Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-lg mb-4">Informations produit</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span>Essences naturelles de haute qualité</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span>Fabrication locale tunisienne</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span>Tenue longue durée</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span>Flacon élégant de 100ml</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
