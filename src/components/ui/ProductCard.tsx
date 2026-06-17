import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/utils';
import { useCart } from '../../hooks/useCart';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200/80 overflow-hidden group transition-all duration-300 hover:border-brand-orange/60 relative flex flex-col justify-between h-full"
    >
      {/* Circuit Trace Decorative Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-300/80 pointer-events-none group-hover:border-brand-orange/50 transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-300/80 pointer-events-none group-hover:border-brand-orange/50 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-300/80 pointer-events-none group-hover:border-brand-orange/50 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-300/80 pointer-events-none group-hover:border-brand-orange/50 transition-colors"></div>
      
      {/* Subtle Circuit Nodes on Corners */}
      <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-gray-200 pointer-events-none group-hover:bg-brand-orange/30 transition-colors"></div>
      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-gray-200 pointer-events-none group-hover:bg-brand-orange/30 transition-colors"></div>

      <div className="flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Custom Bright Orange Badge in Top-Right Corner */}
          {product.badge && (
            <span className="absolute top-2.5 right-2.5 bg-brand-orange text-brand-black text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 shadow-[0_0_10px_rgba(255,102,0,0.4)] z-20 font-display">
              {product.badge === 'discount' && product.discountPercent ? `${product.discountPercent}% OFF` : product.badge}
            </span>
          )}

          {product.stock < 10 && product.stock > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-brand-black text-brand-orange border border-brand-orange/30 text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider font-mono">
              LOW STOCK: {product.stock}
            </span>
          )}
          
          {/* Accent Overlays */}
          <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/5 transition-colors duration-300"></div>
        </Link>

        {/* Content Box */}
        <div className="p-3 pb-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <Link to={`/shop?category=${product.category}`} className="font-mono text-[8px] uppercase font-bold text-brand-orange hover:underline transition-all">
                {product.category}
              </Link>
              {product.brand && (
                <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold font-sans">
                  {product.brand}
                </span>
              )}
            </div>
            
            <Link to={`/product/${product.id}`} className="block mt-1 text-xs font-bold text-gray-900 group-hover:text-brand-orange transition-colors h-8 line-clamp-2 tracking-tight leading-tight uppercase font-sans">
              {product.name}
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] text-gray-400 uppercase tracking-wider">UNIT_VAL</span>
              <span className="text-sm font-black text-brand-black font-mono">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.specs?.wattage && (
              <span className="bg-gray-100 text-gray-600 font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase">
                {product.specs.wattage}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Every card has a bright orange "Add to Cart" button that spans the full width of the card's bottom */}
      <button
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
        className="w-full py-2.5 bg-brand-orange text-brand-black font-display font-black text-[10px] uppercase tracking-widest text-center hover:bg-white border-t border-brand-orange group-hover:border-white transition-all disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center space-x-1.5 shadow-[0_-2px_10px_rgba(255,102,0,0.1)] active:scale-[0.98]"
        title="Add to Matrix Cart"
      >
        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</span>
      </button>
    </motion.div>
  );
};
