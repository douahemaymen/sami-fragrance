import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { CheckoutModal } from './CheckoutModal';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart?: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutSuccess = () => {
    if (onClearCart) {
      onClearCart();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex justify-between items-center bg-gray-50">
            <h2 className="font-serif text-2xl">Votre Panier</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <ShoppingBag size={64} className="opacity-20" />
                <p>Votre panier est vide</p>
                <button onClick={onClose} className="text-gold-600 hover:underline">
                  Retourner à la boutique
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                        <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{item.price} TND</p>

                      <div className="flex items-center space-x-3 border inline-flex rounded-md p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 rounded"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-bold text-xl">{total.toFixed(2)} DT</span>
              </div>
              <p className="text-xs text-gray-500 mb-4 text-center">Livraison calculée lors de la confirmation.</p>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-black text-gold-400 py-4 uppercase tracking-widest hover:bg-black/90 hover:text-gold-300 transition-colors rounded-lg font-bold border-2 border-black"
              >
                Finaliser la Commande
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={total}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};