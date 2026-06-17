import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Truck, ShieldCheck, Zap, Star, Sparkles, Battery, Cpu, Wrench, Layers, ChevronDown } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ui/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 12); // Get more products for 6-column grid
  const summerCollection = MOCK_PRODUCTS.slice(0, 6);
  const offersProducts = MOCK_PRODUCTS.slice(2, 8);
  const hotDealsProducts = MOCK_PRODUCTS.slice(4, 10);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({
    0: true, // Keep first category open by default
  });

  const toggleCategory = (idx: number) => {
    setOpenCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const slides = [
    {
      title: "SUMMER LAB EXPO 2026",
      subtitle: "PREMIUM SEMICONDUCTORS & ICs",
      desc: "Bangladesh's premier inventory of genuine microcontrollers, sensors, resistors & capacitors.",
      tag: "10% OFF SEMICONDUCTORS",
      tagColor: "bg-brand-blue/20 text-brand-blue border border-brand-blue/30",
      bgGradient: "from-brand-dark via-slate-900 to-brand-blue/40",
      link: "/shop?category=ICs %26 Semiconductors",
      image: "/assets/banner.png",
      accentIcon: Cpu
    },
    {
      title: "EXTREME POWER SOLUTIONS",
      subtitle: "BMS & BATTERY PROTECTION CORES",
      desc: "Keep your devices alive. Highly certified 18650 charge managers, active balancers, and converters.",
      tag: "LIMITED STOCK OFFER",
      tagColor: "bg-brand-orange/20 text-brand-orange border border-brand-orange/30",
      bgGradient: "from-brand-dark via-slate-900 to-brand-orange/40",
      link: "/shop?category=Battery %26 BMS",
      image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=1200", 
      accentIcon: Battery
    },
    {
      title: "ELECTROMAAL LABS SPECIAL",
      subtitle: "12V MINI UPS EXCLUSIVES",
      desc: "Our custom engineered router backup units designed by elite Bangladeshi engineers. 4 hours uninterruptible power.",
      tag: "LAB EXCLUSIVE",
      tagColor: "bg-brand-neon/20 text-brand-neon border border-brand-neon/30",
      bgGradient: "from-brand-dark via-slate-900 to-brand-neon/40",
      link: "/shop?category=Electromaal Labs",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200",
      accentIcon: Sparkles
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const categories = [
    {
      name: 'Components',
      sub: ['Resistors', 'Capacitors', 'ICs', 'Transistors']
    },
    {
      name: 'Power',
      sub: ['Batteries', 'Adapters', 'Inverters', 'BMS']
    },
    {
      name: 'Tools',
      sub: ['Soldering', 'Multimeters', 'Oscilloscopes']
    },
    {
      name: 'Arduino',
      sub: ['Boards', 'Sensors', 'Modules', 'Displays']
    },
    {
      name: 'Robotics',
      sub: ['Motors', 'Drivers', 'Chassis', 'Wheels']
    },
    {
      name: 'Wireless',
      sub: ['Bluetooth', 'Wi-Fi', 'RF Modules']
    }
  ];

  const mobileCategories = [
    { name: 'ICs & Chips', icon: Cpu, link: '/shop?category=ICs %26 Semiconductors' },
    { name: 'BMS & Battery', icon: Battery, link: '/shop?category=Battery %26 BMS' },
    { name: 'Power Modules', icon: Sparkles, link: '/shop?category=Power Modules' },
    { name: 'Tools', icon: Wrench, link: '/shop?category=Tools %26 Equipment' },
    { name: 'Labs Core', icon: Layers, link: '/shop?category=Electromaal Labs' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar: Categories */}
        <aside className="w-full lg:w-[180px] flex-shrink-0 hidden lg:block" style={{ width: '180px' }}>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" style={{ width: '180px' }}>
            <div className="bg-brand-blue text-brand-black px-5 py-4 font-extrabold flex items-center tracking-wider text-xs uppercase">
              <Zap className="w-4 h-4 mr-2" />
              Categories Matrix
            </div>
            <div className="divide-y divide-gray-100">
              {categories.map((cat, idx) => {
                const isOpen = !!openCategories[idx];
                return (
                  <div key={idx} className="p-4 hover:bg-gray-50/50 transition-colors">
                    <button 
                      onClick={() => toggleCategory(idx)}
                      className="w-full text-left font-bold text-xs text-brand-dark uppercase tracking-wider hover:text-brand-blue flex justify-between items-center transition-colors focus:outline-none"
                    >
                      <span>{cat.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-blue' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="space-y-1.5 pl-1.5">
                        {cat.sub.map((sub, sIdx) => (
                          <li key={sIdx}>
                            <Link to={`/shop?category=${sub}`} className="text-xs text-gray-500 hover:text-brand-orange transition-colors flex items-center">
                              <span className="w-1 h-1 rounded-full bg-gray-300 mr-1.5"></span>
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-10">
          {/* Hero Banner Section with Right to Left Slider Component */}
          <section className="relative rounded-2xl overflow-hidden shadow-xl bg-brand-black aspect-[21/9] lg:aspect-[12/4]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ x: "100%", opacity: 0.8 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0.8 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Link to={slides[currentSlide].link} className="block w-full h-full relative">
                  {/* Backdrop Background image with parallax scale */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-color-dodge grayscale transition-transform duration-[10000ms] scale-110" 
                    style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                  ></div>
                  {/* Subtle Grid + Color-glowing Layer */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgGradient} opacity-95 tech-grid`}></div>
                  
                  {/* Banner content */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12 text-white z-10 w-full">
                    <div className="max-w-md lg:max-w-lg space-y-2 md:space-y-3.5">
                      <span className={`inline-block px-2 py-0.5 ${slides[currentSlide].tagColor} rounded text-[8px] md:text-[9px] font-bold tracking-widest uppercase tech-mono`}>
                        {slides[currentSlide].tag}
                      </span>
                      <h1 className="text-xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight leading-none uppercase">
                        {slides[currentSlide].title}
                      </h1>
                      <p className="text-[10px] md:text-xs text-gray-400 font-medium leading-relaxed max-w-sm line-clamp-2 md:line-clamp-none">
                        {slides[currentSlide].desc}
                      </p>
                      <div className="inline-flex items-center gap-1 text-brand-orange hover:text-orange-400 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors pt-1">
                        Explore Category <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Accent Glowing Circle for Tech feel */}
                    <div className="hidden md:flex items-center justify-center pr-4">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-white/10 flex items-center justify-center relative bg-white/5 backdrop-blur-sm shadow-2xl">
                        <div className="absolute inset-0 border border-brand-orange/20 rounded-full animate-ping [animation-duration:4s]"></div>
                        {React.createElement(slides[currentSlide].accentIcon, {
                          className: "w-8 h-8 lg:w-12 lg:h-12 text-brand-orange animate-pulse"
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="absolute bottom-3 left-6 z-20 flex space-x-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-brand-orange w-6' : 'bg-white/30 hover:bg-white/50 w-2'}`}
                  title={`Announcement ${idx + 1}`}
                />
              ))}
            </div>
          </section>

          {/* Mobile Category Horizontal Scroll Panel */}
          <section className="lg:hidden">
            <div className="flex items-center space-x-2 mb-3">
              <Layers className="w-4 h-4 text-brand-blue" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-brand-dark">Quick Browse Categories</h3>
            </div>
            <div className="flex overflow-x-auto pb-3 gap-3 scrollbar-none snap-x pointer-events-auto">
              {mobileCategories.map((mCat, idx) => (
                <Link
                  key={idx}
                  to={mCat.link}
                  className="flex flex-col items-center justify-center flex-shrink-0 w-24 h-16 bg-white border border-gray-150 rounded-xl shadow-xs snap-center hover:border-brand-blue transition-colors p-2"
                >
                  {React.createElement(mCat.icon, {
                    className: "w-4 h-4 text-brand-blue mb-1"
                  })}
                  <span className="text-[9px] font-bold text-gray-700 text-center tracking-tight leading-none">{mCat.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Summer Collection Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-brand-orange pl-4">Summer <span className="text-brand-orange">Collection</span></h2>
              <Link to="/shop" className="text-sm font-bold text-brand-blue hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {summerCollection.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Offers Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-brand-blue pl-4">Special <span className="text-brand-blue">Offers</span></h2>
              <Link to="/shop" className="text-sm font-bold text-brand-blue hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {offersProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Hot Deals Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-4 text-red-600">Hot Deals</h2>
              <Link to="/shop" className="text-sm font-bold text-brand-blue hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {hotDealsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Essential Hardware Section (Modified Grid) */}
          <section className="bg-brand-light p-8 rounded-2xl tech-grid">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Essential Hardware</h2>
              <Link to="/list" className="text-sm font-bold text-brand-blue">Catalog [Alt+S]</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
