import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ui/ProductCard';
import { Filter, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { cn } from '../utils/utils';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  const searchParam = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState(catParam || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(200000);
  const [searchQuery, setSearchQuery] = useState(searchParam);
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
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
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
            "lg:w-64 flex-shrink-0 space-y-8 lg:block",
            isFilterOpen ? "block" : "hidden"
          )}>
            {/* Categories */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center"><SlidersHorizontal className="w-4 h-4 mr-2 text-brand-blue" /> Categories</h3>
                <div className="space-y-2">
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                            selectedCategory === 'All' ? "bg-brand-blue text-white font-semibold" : "text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        All Products
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                                selectedCategory === cat ? "bg-brand-blue text-white font-semibold" : "text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-4">Price Range</h3>
                <input 
                    type="range" 
                    min="0" 
                    max="200000" 
                    step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">Up to</span>
                    <span className="font-bold text-brand-blue">৳{priceRange.toLocaleString()}</span>
                </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-gray-300">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">No products found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                    <button 
                        onClick={() => {
                            setSelectedCategory('All');
                            setPriceRange(200000);
                            setSearchQuery('');
                        }}
                        className="mt-6 px-6 py-2 bg-brand-blue text-white rounded-lg font-bold"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
