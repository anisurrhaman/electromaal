import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Phone, Mail, Zap } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { cn } from '../../utils/utils';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black text-white border-b border-white/10 tech-grid">
      {/* Top Bar */}
      <div className="bg-brand-dark py-1.5 px-4 hidden md:block border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center tech-mono text-[9px] uppercase tracking-widest text-gray-500">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-brand-blue">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-2 animate-pulse"></span>
                System Status: Online
            </span>
            <span className="flex items-center"><Phone className="w-3 h-3 mr-1.5" /> +880 1234 567890</span>
            <span className="flex items-center"><Mail className="w-3 h-3 mr-1.5" /> engineering@electromaal.io</span>
          </div>
          <div>
            <span>Next-Day Shipping Active</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto px-4 py-3 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src="/assets/logo.png" alt="Electromaal Logo" className="h-8 md:h-10 w-auto group-hover:scale-105 transition-transform" />
          </Link>

          {/* Mobile Cart & Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative text-white">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Static on desktop, sticky-ish area on mobile) */}
        <div className="flex-1 max-w-xl md:mx-8 w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search for components, tools, ups..."
              className="w-full pl-10 pr-10 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent text-white placeholder-gray-400 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-3.5 top-2.5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Desktop Nav Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/auth" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Account</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-brand-black border-t border-white/10 transition-all duration-300 overflow-hidden",
        isMenuOpen ? "max-h-screen pb-6 shadow-2xl" : "max-h-0"
      )}>
        <div className="px-6 py-6 space-y-6">
          <div className="flex flex-col space-y-4 font-bold text-sm tracking-widest tech-mono uppercase">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-orange transition-colors">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-orange transition-colors">Shop All</Link>
            <Link to="/shop?category=ICs%20%26%20Semiconductors" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-brand-orange transition-colors">ICs & Semiconductors</Link>
            <Link to="/shop?category=Power%20Modules" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-brand-orange transition-colors">Power Modules</Link>
            <Link to="/shop?category=Battery%20%26%20BMS" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-brand-orange transition-colors">Battery & BMS</Link>
            <Link to="/shop?category=Tools%20%26%20Equipment" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-brand-orange transition-colors">Tools & Equipment</Link>
            <Link to="/shop?category=Passives" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-brand-orange transition-colors">Passives</Link>
            <Link to="/shop?category=Electromaal%20Labs" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-brand-orange transition-colors">Electromaal Labs</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-orange transition-colors">Lab Support</Link>
          </div>
          <div className="pt-6 border-t border-white/10">
            <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="flex items-center text-gray-400 hover:text-white transition-colors">
              <User className="w-5 h-5 mr-3" /> My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Category Bar */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex space-x-6 text-xs font-semibold tech-mono uppercase tracking-wider">
            <Link to="/shop" className="hover:text-brand-blue transition-colors">All Categories</Link>
            <Link to="/shop?category=ICs%20%26%20Semiconductors" className="hover:text-brand-blue transition-colors">ICs & Semiconductors</Link>
            <Link to="/shop?category=Passives" className="hover:text-brand-blue transition-colors">Passives</Link>
            <Link to="/shop?category=Power%20Modules" className="hover:text-brand-blue transition-colors">Power Modules</Link>
            <Link to="/shop?category=Battery%20%26%20BMS" className="hover:text-brand-blue transition-colors">Battery & BMS</Link>
            <Link to="/shop?category=Tools%20%26%20Equipment" className="hover:text-brand-blue transition-colors">Tools & Equipment</Link>
            <Link to="/shop?category=Electromaal%20Labs" className="hover:text-brand-blue transition-colors">Electromaal Labs</Link>
            <Link to="/contact" className="hover:text-brand-blue border-l pl-6 border-gray-200 normal-case tracking-normal">Help Center</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
