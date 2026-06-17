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
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-200 overflow-hidden group transition-all duration-300 hover:border-brand-blue"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <span className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-wider rounded shadow-sm z-10 font-sans">
          40% OFF
        </span>
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-brand-orange text-white text-[9px] font-bold px-2 py-1 uppercase tech-mono">
            Low Stock: {product.stock}
          </span>
        )}
        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-300"></div>
      </Link>

      <div className="p-3">
        <Link to={`/shop?category=${product.category}`} className="tech-mono text-[8px] uppercase font-bold text-brand-blue hover:text-brand-orange transition-colors">
          {product.category}
        </Link>
        <Link to={`/product/${product.id}`} className="block mt-0.5 text-xs font-bold text-gray-900 line-clamp-2 hover:text-brand-blue transition-colors h-8 tracking-tight leading-tight">
          {product.name}
        </Link>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-col mb-3">
            <span className="tech-mono text-[8px] text-gray-400 uppercase">Unit Price</span>
            <span className="text-sm font-bold text-brand-dark tech-mono">{formatPrice(product.price)}</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className="py-2 px-1 bg-brand-dark text-white rounded text-[9px] font-bold hover:bg-brand-blue transition-colors disabled:bg-gray-300 flex items-center justify-center"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3 h-3 mr-1" /> Add
            </button>
            <button
              onClick={() => {
                addToCart(product);
                navigate('/checkout');
              }}
              disabled={product.stock === 0}
              className="py-2 px-1 bg-brand-orange text-brand-black rounded text-[9px] font-bold hover:bg-orange-400 transition-colors disabled:bg-gray-300 flex items-center justify-center"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
