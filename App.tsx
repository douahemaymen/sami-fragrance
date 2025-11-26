import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CartSidebar } from './components/CartSidebar';
import { Home } from './pages/Home';
import { ProductDetail } from './components/ProductDetail';
import { database } from './firebase.config';
import { ref, onValue } from 'firebase/database';
import { CartItem, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Charger les produits depuis Firebase
  useEffect(() => {
    const perfumesRef = ref(database, 'perfumes');
    const unsubscribe = onValue(perfumesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList = Object.entries(data).map(([id, perfume]: [string, any]) => ({
          id: parseInt(id.replace(/\D/g, '')) || Math.random(), // Générer un ID numérique
          name: perfume.name,
          price: perfume.price,
          description: perfume.description,
          image: perfume.image,
        }));
        setProducts(productsList);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
        />

        <main>
          <Routes>
            <Route 
              path="/" 
              element={<Home products={products} onAddToCart={addToCart} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetail products={products} onAddToCart={addToCart} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
