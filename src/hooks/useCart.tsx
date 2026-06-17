import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('electromaal_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('electromaal_cart', JSON.stringify(cart));
  }, [cart]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success', image?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, image }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    addToast(
      quantity > 1 
        ? `Added ${quantity}x "${product.name}" to Lab Cart` 
        : `Added "${product.name}" to Lab Cart`, 
      'success', 
      product.image
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount, toasts, removeToast }}
    >
      {children}

      {/* Sleek Auto-dismissing Toast Stack */}
      <div className="fixed bottom-24 md:bottom-8 right-4 z-[9999] flex flex-col gap-3 max-w-[340px] w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 p-3 bg-brand-dark/95 text-white shadow-2xl rounded-xl border border-white/10 glass-card pointer-events-auto transition-all duration-300"
            style={{
              animation: 'slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {toast.image && (
              <img src={toast.image} className="w-10 h-10 object-cover rounded-lg border border-white/10 flex-shrink-0" alt="" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold leading-tight">{toast.message}</p>
              <span className="text-[8px] uppercase tracking-wider text-brand-orange tech-mono">Lab System</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Custom Slide-in animation style */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
