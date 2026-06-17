import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ui/ProductCard';
import { Filter, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { cn } from '../utils/utils';

const BRANDS = [
  'Electromaal Core',
  'Anker Tech',
  'Rode Audio',
  'Baseus Volt',
  'Acoustic Shield',
];

const WATTAGES = ['20W', '65W', '100W'];

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  const searchParam = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState(catParam || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(200000);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedWattages, setSelectedWattages] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory('All');
    }
  }, [catParam]);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Brand filter
    const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
    
    // Wattage filter - matches wattage key inside specs
    const productWattage = product.specs?.wattage;
    const matchesWattage = selectedWattages.length === 0 || (productWattage && selectedWattages.includes(productWattage));

    return matchesCategory && matchesPrice && matchesSearch && matchesBrand && matchesWattage;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Featured original order
  });

  return (
    <div className="bg-brand-light min-h-screen py-10 font-sans tech-grid">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-brand-black p-6 border border-white/5 shadow-2xl">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-white tracking-widest uppercase">Component <span className="text-brand-neon">Index</span></h1>
            <p className="tech-mono text-[10px] text-brand-blue mt-2 font-bold uppercase tracking-[0.2em]">Total_Modules_Indexed: {sortedProducts.length}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <input 
                    type="text" 
                    placeholder="Search Lab Matrix..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-none text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
                <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
            </div>
            
            <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex md:hidden items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
            >
                <Filter className="w-4 h-4 mr-2" /> Filters
            </button>

            <div className="hidden md:flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-medium uppercase">Sort by:</span>
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={cn(
            "lg:w-64 flex-shrink-0 space-y-6 lg:block",
            isFilterOpen ? "block" : "hidden"
          )}>
            {/* Categories */}
            <div className="bg-white p-6 rounded-b-none rounded-t-2xl border border-gray-150 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-orange"></div>
                <h3 className="font-display font-medium text-xs uppercase tracking-wider text-brand-black mb-4 flex items-center justify-between">
                    <span>CATEGORIES INDEX</span>
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                </h3>
                <div className="space-y-1.5">
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className={cn(
                            "w-full text-left px-3 py-2 rounded text-xs transition-all font-sans font-bold flex items-center justify-between",
                            selectedCategory === 'All' ? "bg-brand-orange text-brand-black" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"
                        )}
                    >
                        <span>ALL MODULES</span>
                        <span className="text-[10px] opacity-60">({MOCK_PRODUCTS.length})</span>
                    </button>
                    {CATEGORIES.map((cat) => {
                        const count = MOCK_PRODUCTS.filter(p => p.category === cat).length;
                        return (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded text-xs transition-all font-sans font-bold flex items-center justify-between",
                                    selectedCategory === cat ? "bg-brand-orange text-brand-black" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"
                                )}
                            >
                                <span>{cat.toUpperCase()}</span>
                                <span className="text-[10px] opacity-60">({count})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Brands Section */}
            <div className="bg-white p-6 border border-gray-150 shadow-xs relative overflow-hidden">
                <h3 className="font-display font-medium text-xs uppercase tracking-wider text-brand-black mb-4 flex items-center justify-between">
                    <span>BRAND MATRIX</span>
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                </h3>
                <div className="space-y-2">
                    {BRANDS.map((brand) => {
                        const isChecked = selectedBrands.includes(brand);
                        const count = MOCK_PRODUCTS.filter(p => p.brand === brand).length;
                        return (
                            <label key={brand} className="flex items-center space-x-2.5 cursor-pointer text-xs font-sans text-gray-600 hover:text-brand-orange transition-colors">
                                <input 
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                        setSelectedBrands(prev => 
                                            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                                        );
                                    }}
                                    className="w-3.5 h-3.5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                                />
                                <span className={cn("text-xs flex-1 uppercase tracking-wide", isChecked ? "font-bold text-brand-black" : "")}>{brand}</span>
                                <span className="text-[9px] text-gray-400 font-mono">({count})</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Technical Specs: Wattage */}
            <div className="bg-white p-6 border border-gray-150 shadow-xs relative overflow-hidden">
                <h3 className="font-display font-medium text-xs uppercase tracking-wider text-brand-black mb-4 flex items-center justify-between">
                    <span>SPECIFICATION CORE</span>
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                </h3>
                <div className="space-y-2">
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-mono mb-2">INTELLIGENT WATTAGE</p>
                    {WATTAGES.map((wattage) => {
                        const isChecked = selectedWattages.includes(wattage);
                        const count = MOCK_PRODUCTS.filter(p => p.specs?.wattage === wattage).length;
                        return (
                            <label key={wattage} className="flex items-center space-x-2.5 cursor-pointer text-xs font-sans text-gray-600 hover:text-brand-orange transition-colors">
                                <input 
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                        setSelectedWattages(prev => 
                                            prev.includes(wattage) ? prev.filter(w => w !== wattage) : [...prev, wattage]
                                        );
                                    }}
                                    className="w-3.5 h-3.5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                                />
                                <span className={cn("text-xs font-mono flex-1", isChecked ? "font-bold text-brand-black" : "")}>{wattage}</span>
                                <span className="text-[9px] text-gray-400 font-mono">({count})</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-t-none rounded-b-2xl border border-gray-150 shadow-xs">
                <h3 className="font-display font-medium text-xs uppercase tracking-wider text-brand-black mb-4 flex items-center justify-between">
                    <span>PRICE RANGE</span>
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                </h3>
                <input 
                    type="range" 
                    min="0" 
                    max="6000" 
                    step="50"
                    value={priceRange > 6000 ? 6000 : priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
                <div className="flex justify-between items-center mt-3">
                    <span className="text-[10px] text-gray-400 font-mono">UP_TO</span>
                    <span className="font-bold text-xs text-brand-orange font-mono">৳{priceRange.toLocaleString()}</span>
                </div>
            </div>
            
            {/* Reset Shortcut */}
            {(selectedCategory !== 'All' || selectedBrands.length > 0 || selectedWattages.length > 0 || priceRange < 200000) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrands([]);
                  setSelectedWattages([]);
                  setPriceRange(200000);
                }}
                className="w-full py-2 bg-brand-black text-brand-orange font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-brand-black transition-all border border-brand-orange/20"
              >
                CLEAR ALL FILTERS
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-gray-300">
                    <Search className="w-12 h-12 text-brand-orange/40 mx-auto mb-4" />
                    <h3 className="text-sm font-display font-black text-brand-black uppercase tracking-wider">No matching components found</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">The specifications requested do not match the telemetry index. Re-tune filters or reset.</p>
                    <button 
                        onClick={() => {
                            setSelectedCategory('All');
                            setSelectedBrands([]);
                            setSelectedWattages([]);
                            setPriceRange(200000);
                            setSearchQuery('');
                        }}
                        className="mt-6 px-6 py-2.5 bg-brand-orange text-brand-black rounded-none font-display font-black text-xs uppercase tracking-widest hover:bg-brand-black hover:text-brand-orange hover:border-brand-orange border border-transparent transition-all"
                    >
                        RESET FILTERS CORE
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
