import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Phone, Mail, Zap } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { cn } from '../../utils/utils';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount, setCartOpen } = useCart();
  const navigate = useNavigate();

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black text-white border-b border-white/10 tech-grid">
      {/* Top Bar */}
      <div className="bg-brand-black/90 py-2 px-4 hidden md:block border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center tech-mono text-[9px] uppercase tracking-widest text-gray-400">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-brand-orange font-bold">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-2 animate-pulse shadow-[0_0_8px_#FF6600]"></span>
              SYSTEM STATUS: ACTIVE
            </span>
            <span className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Phone className="w-3 h-3 mr-1.5 text-brand-orange" /> +880 1234 567890
            </span>
            <span className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Mail className="w-3 h-3 mr-1.5 text-brand-orange" /> engineering@electromaal.io
            </span>
          </div>
          <div className="font-bold text-brand-orange">
            NEXT-DAY SHIPPING ACTIVE
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo (Tech-Industrial Orbitron Design) */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-brand-orange flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(255,102,0,0.4)] group-hover:rotate-6 transition-transform duration-300">
              <Zap className="w-5 h-5 text-brand-black fill-brand-black" />
            </div>
            <span className="font-display font-black text-xl tracking-wider text-white group-hover:text-brand-orange transition-colors">
              ELECTRO<span className="text-brand-orange">MAAL</span>
            </span>
          </Link>

          {/* Mobile Cart & Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={() => setCartOpen(true)} 
              className="relative text-white hover:text-brand-orange transition-colors focus:outline-none"
              aria-label="Open Cart Drawer"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-brand-black text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-[0_0_8px_#FF6600]">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-brand-orange transition-colors">
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Prominent Wide Search Bar in Center) */}
        <div className="flex-1 max-w-2xl md:mx-12 w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="SEARCH THE INDUSTRIAL MATRIX (COMPONENTS, TOOLS, UPS...)"
              className="w-full pl-11 pr-10 py-3 bg-brand-dark/40 hover:bg-brand-dark/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-500 uppercase font-sans text-xs tracking-wider transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-4.5 top-3.5 text-gray-500 hover:text-brand-orange transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <Search className="absolute left-4 top-3 text-brand-orange w-5 h-5" />
          </div>
        </div>

        {/* Desktop Nav Actions */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/auth" className="flex flex-col items-center text-gray-400 hover:text-brand-orange transition-colors group">
            <User className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest uppercase mt-1">Account</span>
          </Link>
          <button 
            onClick={() => setCartOpen(true)} 
            className="flex flex-col items-center text-gray-400 hover:text-brand-orange transition-colors relative group focus:outline-none"
            aria-label="Open Cart Drawer"
          >
            <ShoppingCart className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest uppercase mt-1">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-brand-black text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-[0_0_10px_rgba(255,102,0,0.5)]">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-brand-black/95 border-b border-white/10 transition-all duration-300 overflow-hidden z-50",
        isMenuOpen ? "max-h-screen pb-6 shadow-2xl" : "max-h-0"
      )}>
        <div className="px-6 py-6 space-y-6">
          <div className="flex flex-col space-y-4 font-bold text-xs tracking-wider tech-mono uppercase">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-orange transition-colors">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-orange transition-colors">Shop All</Link>
            <Link to="/shop?category=ICs%20%26%20Semiconductors" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-brand-orange transition-colors">ICs & Semiconductors</Link>
            <Link to="/shop?category=Power%20Modules" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-brand-orange transition-colors">Power Modules</Link>
            <Link to="/shop?category=Battery%20%26%20BMS" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-brand-orange transition-colors">Battery & BMS</Link>
            <Link to="/shop?category=Tools%20%26%20Equipment" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-brand-orange transition-colors">Tools & Equipment</Link>
            <Link to="/shop?category=Passives" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-brand-orange transition-colors">Passives</Link>
            <Link to="/shop?category=Electromaal%20Labs" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-brand-orange transition-colors">Electromaal Labs</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-orange transition-colors">Lab Support</Link>
          </div>
          <div className="pt-6 border-t border-white/15">
            <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="flex items-center text-gray-400 hover:text-brand-orange transition-colors font-bold text-xs uppercase tracking-wider">
              <User className="w-5 h-5 mr-3 text-brand-orange" /> My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Category Bar */}
      <div className="hidden md:block bg-brand-black border-t border-white/10">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-wrap items-center justify-between text-[11px] font-bold font-display uppercase tracking-wider text-gray-400">
            <div className="flex items-center space-x-5">
              <Link to="/shop" className="hover:text-brand-orange transition-colors">All Categories</Link>
              <span className="text-white/15 select-none">|</span>
              <Link to="/shop?category=ICs%20%26%20Semiconductors" className="hover:text-brand-orange transition-colors">ICs & Semiconductors</Link>
              <span className="text-white/15 select-none">|</span>
              <Link to="/shop?category=Passives" className="hover:text-brand-orange transition-colors">Passives</Link>
              <span className="text-white/15 select-none">|</span>
              <Link to="/shop?category=Power%20Modules" className="hover:text-brand-orange transition-colors">Power Modules</Link>
              <span className="text-white/15 select-none">|</span>
              <Link to="/shop?category=Battery%20%26%20BMS" className="hover:text-brand-orange transition-colors">Battery & BMS</Link>
              <span className="text-white/15 select-none">|</span>
              <Link to="/shop?category=Tools%20%26%20Equipment" className="hover:text-brand-orange transition-colors">Tools & Equipment</Link>
              <span className="text-white/15 select-none">|</span>
              <Link to="/shop?category=Electromaal%20Labs" className="hover:text-brand-orange transition-colors">Electromaal Labs</Link>
            </div>
            <div>
              <Link to="/contact" className="text-brand-orange hover:text-white transition-colors hover:scale-105 duration-200 block">Help Center</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
