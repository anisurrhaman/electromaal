import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight, Lock, Zap } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/utils';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    itemCount 
  } = useCart();
  
  const navigate = useNavigate();

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Slightly dimmed overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-brand-black/45 backdrop-blur-[2px] z-[9900]"
          />

          {/* Slide-out Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[440px] bg-brand-black text-white z-[9950] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border-l border-brand-orange/20 relative"
          >
            {/* Architectural circuit accents on background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none tech-grid" />
            
            {/* Top-right subtle circuit trace line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent z-10" />

            {/* Header section with technical aesthetic */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-brand-dark/90 relative">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shadow-[0_0_10px_rgba(255,102,0,0.2)]">
                  <ShoppingCart className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <h2 className="font-display font-black text-xs uppercase tracking-widest text-white leading-none">
                    LAB CART SYSTEM
                  </h2>
                  <p className="text-[8px] font-mono text-gray-400 mt-1 uppercase tracking-wider">
                    MODULE INDEX // {itemCount} ACTIVE UNITS
                  </p>
                </div>
              </div>

              {/* Sharp edge Close Button */}
              <button 
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center border border-white/10 text-gray-400 hover:text-brand-orange hover:border-brand-orange/40 transition-all rounded-none bg-brand-black hover:bg-brand-black/80 group"
              >
                <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
              </button>
            </div>

            {/* Content Area - Scrollable list of items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border border-dashed border-white/10 flex items-center justify-center bg-white/5">
                      <ShoppingCart className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-orange rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-[8px] font-black text-brand-black">!</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-white">
                      CART TELEMETRY EMPTY
                    </h3>
                    <p className="text-[10px] text-gray-400 font-sans mt-1.5 max-w-xs mx-auto">
                      No hardware nodes have been staged for checkout. Browse categories to initialize items.
                    </p>
                  </div>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="px-5 py-2.5 bg-brand-orange text-brand-black font-display font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all rounded-none"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={item.id}
                    className="group bg-brand-dark/30 border border-white/5 hover:border-brand-orange/20 p-4 transition-all relative flex gap-4"
                  >
                    {/* Tiny Corner Nodes decor */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/20 group-hover:border-brand-orange/40" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/20 group-hover:border-brand-orange/40" />

                    {/* Image / Thumbnail Container */}
                    <div className="w-[72px] h-[72px] bg-brand-dark/80 border border-white/10 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                      {item.badge && (
                        <span className="absolute top-0 right-0 bg-brand-orange text-brand-black text-[6px] font-black uppercase tracking-wider px-1">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Meta & Info details */}
                    <div className="flex-grow flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[7px] font-mono font-bold text-brand-orange uppercase bg-brand-orange/10 px-1 py-0.5 tracking-wider">
                            {item.category}
                          </span>
                          {item.brand && (
                            <span className="text-[7px] font-sans font-bold text-gray-400 uppercase tracking-widest truncate max-w-[120px]">
                              {item.brand}
                            </span>
                          )}
                        </div>
                        <h4 className="text-[11px] font-sans font-bold text-white mt-1 group-hover:text-brand-orange transition-colors uppercase leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-mono text-gray-400">
                            {formatPrice(item.price)}
                          </span>
                          {item.specs?.wattage && (
                            <span className="text-[7px] font-mono bg-white/5 border border-white/10 text-gray-400 px-1 font-bold">
                              {item.specs.wattage}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Adjusters Row */}
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
                        <div className="flex items-center border border-white/10 bg-brand-black overflow-hidden select-none">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-[10px]"
                            title="Decrement Quantity"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-7 text-center font-mono text-[10px] text-white bg-brand-black/40 font-bold border-x border-white/5">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-[10px]"
                            title="Increment Quantity"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Trash icon */}
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-1.5 border border-transparent hover:border-red-500/20 transition-all rounded-none"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sticky/Fixed Footer Section inside the drawer */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 bg-brand-dark p-6 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.4)] relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-brand-orange/30" />
                
                {/* Breakdowns */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono tracking-wider">
                    <span>HARDWARE NODES</span>
                    <span>{itemCount} UNITS</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono tracking-wider">
                    <span>LAB ESTIMATE VAT</span>
                    <span>INCLUDED</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-display font-black text-[11px] uppercase tracking-widest text-white">
                      TOTAL ESTIMATED VALUE
                    </span>
                    <span className="font-mono font-black text-sm text-brand-orange shadow-orange/10">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>

                {/* Secure checkout info indicator */}
                <div className="flex items-center justify-center space-x-1.5 py-1.5 bg-white/[0.02] border border-white/5">
                  <Lock className="w-3 h-3 text-brand-orange stroke-[2.5]" />
                  <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">
                    EM-SECURE ENCRYPTED CHECKOUT PIPELINE
                  </span>
                </div>

                {/* Call to Action: Large, highly visible, bold orange '#FF6600' button */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-brand-orange text-brand-black hover:bg-white hover:text-brand-black border border-brand-orange hover:border-white font-display font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,102,0,0.15)] group active:scale-[0.98]"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
