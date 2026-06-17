import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { formatPrice } from '../utils/utils';
import { useCart } from '../hooks/useCart';
import { 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronLeft, 
  Heart, 
  Share2, 
  Check, 
  Settings, 
  MessageSquare, 
  AlertCircle,
  ThumbsUp,
  User,
  BadgePercent,
  Cpu,
  Clock,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/utils';
import { ProductCard } from '../components/ui/ProductCard';

interface UserReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
  likedByUser?: boolean;
}

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  
  // Custom reviews list state
  const [customReviews, setCustomReviews] = useState<UserReview[]>([]);
  
  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  // Scroll to top and reset state when dynamic product ID URL changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
      setIsFavorite(false);
      setHasSubmittedReview(false);
      setIsReviewFormOpen(false);
      setNewComment('');
      setNewAuthor('');
      setNewRating(5);
      
      // Auto-generate some professional custom reviews based on the product properties
      const defaultReviews: UserReview[] = [
        {
          id: 'rev-1',
          author: 'Sazedur Rahman (Lab Assistant)',
          rating: 5,
          date: '2026-05-12',
          comment: `Using this ${product.name} inside our robotics development core. The electrical stability and performance is absolutely superb, zero thermal issues even after continuous 12 hours run.`,
          verified: true,
          likes: 18,
        },
        {
          id: 'rev-2',
          author: 'Tanvir Hossain',
          rating: Math.round(product.rating),
          date: '2026-04-29',
          comment: `Best component pricing found in Bangladesh. Ordered 15 items overall, all verified genuine and well pack. Rapid delivery within 48 hours in Chattogram. Will buy again!`,
          verified: true,
          likes: 7,
        }
      ];
      setCustomReviews(defaultReviews);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl border border-gray-150">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-gray-800">Product Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The engineering component you are looking for does not exist or has been relocated.</p>
          <Link to="/shop" className="px-6 py-3 bg-brand-blue text-brand-black font-bold uppercase tracking-wider text-xs rounded-xl inline-block hover:bg-brand-neon transition-colors">
            Return to Core Index
          </Link>
        </div>
      </div>
    );
  }

  // Calculate promotional items details
  const discountPercent = 40; // Default gorgeous 40% discount matching Gadget999 image
  const originalPrice = Math.round(product.price * 1.6);
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

  // Specifications builder based on item categories
  const getCategorySpecifications = () => {
    switch (product.category) {
      case 'Power Modules':
      case 'Battery & BMS':
        return [
          { name: 'Module Architecture', value: 'Switching Solid-State' },
          { name: 'Nominal Conversion Rate', value: '92% - 96% Efficient' },
          { name: 'Integrated Protection', value: 'Thermal Overload, Short-Circuit Cut-off' },
          { name: 'Mounting Style', value: 'Through-hole PCB & Soldier Pins' },
          { name: 'Recommended Load Limit', value: '80% Duty Cycle continuous operational runtime' },
          { name: 'Compliance Index', value: 'RoHS, UL-94V0 Lead-free Standard' }
        ];
      case 'Electromaal Labs':
        return [
          { name: 'Power Inputs', value: 'Double Integrated Buck-Boost circuit' },
          { name: 'Cell Compatibility', value: 'Grade-A High-Capacity 18650 Lithium' },
          { name: 'Safety Certification', value: 'Smart BMS Active Auto-balancing Core' },
          { name: 'Case Material', value: 'Premium Anti-Fire Polycarbonate ABS Shielding' },
          { name: 'Engineered Location', value: 'Dhaka R&D Lab Division, Bangladesh' }
        ];
      case 'ICs & Semiconductors':
        return [
          { name: 'Core Processor clock', value: '240MHz ultra-low-noise microchip' },
          { name: 'Memory Configuration', value: '520KB SRAM Internal + 4MB Flash external' },
          { name: 'Wireless Standard', value: '802.11 b/g/n Wi-Fi & Bluetooth v4.2 BLE' },
          { name: 'Onboard Pins', value: 'Gold electroplated GPIO expansion lines' },
          { name: 'Interface Protocol', value: 'SPI, I2C, UART, DAC standard' }
        ];
      case 'Tools & Equipment':
        return [
          { name: 'Heating Response Time', value: 'Under 8 seconds stable start' },
          { name: 'Temperature Spectrum', value: '150°C to 480°C calibration accuracy' },
          { name: 'Display System', value: 'OLED graphical diagnostic interface' },
          { name: 'Input Rating Voltage', value: 'DC 24V 3A stable adaptor path' },
          { name: 'Automatic Sleep Mode', value: 'Built-in motion sensor 5-minute standby' }
        ];
      default:
        return [
          { name: 'Item Core Standard', value: 'Professional Industrial Tolerance grade' },
          { name: 'Material Composition', value: 'Corrosion resilient copper alloy pins' },
          { name: 'Reliability metrics', value: 'MTTF 50,000 Hours continuous' },
          { name: 'Ambient Temperature limit', value: '-20°C to 85°C working capacity' }
        ];
    }
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Product link copied to clipboard! Share with your lab engineers.');
  };

  const handleLikeReview = (reviewId: string) => {
    setCustomReviews(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        if (rev.likedByUser) {
          return { ...rev, likes: rev.likes - 1, likedByUser: false };
        } else {
          return { ...rev, likes: rev.likes + 1, likedByUser: true };
        }
      }
      return rev;
    }));
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRevItem: UserReview = {
      id: Math.random().toString(),
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment,
      verified: true,
      likes: 0
    };

    setCustomReviews(prev => [newRevItem, ...prev]);
    setHasSubmittedReview(true);
    setTimeout(() => {
      setIsReviewFormOpen(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50/70 min-h-screen pb-24 md:pb-10 font-sans text-gray-800" style={{ paddingTop: '15px' }}>
      <div className="container mx-auto px-4" style={{ width: '1420px', maxWidth: '100%' }}>
        
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-100 shadow-xs overflow-x-auto whitespace-nowrap scrollbar-none mx-auto" style={{ width: '1400px', maxWidth: '100%', marginBottom: '13px' }}>
          <Link to="/" className="hover:text-brand-blue font-medium transition-colors flex items-center">
            Home
          </Link>
          <ChevronLeft className="w-3 h-3 mx-2 rotate-180 text-gray-400 flex-shrink-0" />
          <Link to="/shop" className="hover:text-brand-blue font-medium transition-colors">
            Shop Index
          </Link>
          <ChevronLeft className="w-3 h-3 mx-2 rotate-180 text-gray-400 flex-shrink-0" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-blue font-medium transition-colors">
            {product.category}
          </Link>
          <ChevronLeft className="w-3 h-3 mx-2 rotate-180 text-gray-400 flex-shrink-0" />
          <span className="text-gray-800 font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Presentation Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden mx-auto" style={{ width: '1400px', maxWidth: '100%', marginBottom: '20px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8" style={{ paddingBottom: '32px' }}>
            
            {/* Left Portion: Dynamic Media Gallery */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square max-h-[380px] md:max-h-[440px] mx-auto bg-gray-50 rounded-2xl overflow-hidden border border-gray-155 shadow-inner group">
                <img 
                  src={activeImage || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sale / Discount Floating Tag */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  <span className="bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md flex items-center gap-1">
                    <BadgePercent className="w-3.5 h-3.5" />
                    {discountPercent}% OFF
                  </span>
                  {product.stock < 15 && product.stock > 0 && (
                    <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                      Low Stock
                    </span>
                  )}
                </div>

                {/* Heart Button inside main image */}
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all active:scale-90 z-10 border",
                    isFavorite 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"
                  )}
                  title="Shortlist Component"
                >
                  <Heart className={cn("w-4 h-4", isFavorite ? "fill-current" : "")} />
                </button>
              </div>

              {/* interactive gallery thumbnails switcher */}
              <div className="grid grid-cols-5 gap-3 max-w-[380px] md:max-w-[440px] mx-auto">
                {[
                  product.image,
                  'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600',
                  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600',
                  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600',
                  'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?q=80&w=600',
                ].map((imgSrc, idx) => {
                  const isSelected = activeImage === imgSrc;
                  return (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(imgSrc)}
                      className={cn(
                        "aspect-square rounded-xl bg-gray-50 overflow-hidden cursor-pointer border-2 transition-all p-0.5 hover:shadow-xs",
                        isSelected ? "border-brand-orange scale-102" : "border-gray-200/50 hover:border-gray-300"
                      )}
                    >
                      <img 
                        src={imgSrc} 
                        alt="" 
                        className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity" 
                        referrerPolicy="no-referrer" 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Portion: Interactive Product Info Area */}
            <div className="lg:col-span-7 flex flex-col justify-between relative">
              <div>
                {/* Share Button (absolute positioned, eliminating extra blank rows/spacing) */}
                <div className="absolute top-0 right-0 z-10">
                  <button 
                    onClick={handleShareClick}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                    title="Share product with builders"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-display font-black text-brand-dark mt-0 pr-8 tracking-tight leading-tight uppercase">
                  {product.name}
                </h1>

                {/* Rating line */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((starIdx) => (
                      <Star 
                        key={starIdx} 
                        className={cn(
                          "w-4 h-4",
                          starIdx <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"
                        )} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    {product.rating} <span className="text-gray-300 font-normal">({product.reviews} reviews)</span>
                  </span>
                  
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  
                  {/* Stock active tag with pulse dot */}
                  <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                    <span>{product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}</span>
                  </div>
                </div>

                {/* Gorgeous Price Display Area */}
                <div className="mt-6 p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white border border-gray-150 rounded-2xl flex flex-col justify-center">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold tech-mono mb-1">Guaranteed Lab Pricing</span>
                  <div className="flex items-baseline gap-3.5">
                    <span className="text-3xl md:text-4xl font-extrabold text-brand-orange tech-mono font-display">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm md:text-base text-gray-400 line-through tech-mono">
                      {formatPrice(originalPrice)}
                    </span>
                    <span className="text-[10px] font-extrabold bg-red-100 text-red-600 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Save ৳{(originalPrice - product.price)}
                    </span>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <p className="mt-5 text-sm text-gray-600 leading-relaxed max-w-xl">
                  {product.description} Verified genuine silicon chip set architecture. Fully calibrated for extreme load limits in Bangladeshi academic laboratories, custom embedded DIY projects, and commercial prototyping setups.
                </p>

                {/* Key specs short snippet */}
                <div className="mt-6 grid grid-cols-2 gap-3 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Check className="w-4 h-4 text-brand-orange" />
                    <span>Expert Tested</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Check className="w-4 h-4 text-brand-orange" />
                    <span>Official Warranty</span>
                  </div>
                </div>

              </div>

              {/* Action Board (Quantity slider & Cart, Buy items) */}
              <div className="mt-6 space-y-4">
                
                {/* Desktop view actions */}
                <div className="hidden md:flex items-center gap-4">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 overflow-hidden shrink-0">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-3.5 text-gray-500 hover:bg-gray-100 transition-colors font-extrabold text-lg select-none"
                    >-</button>
                    <span className="px-3 py-3.5 font-bold w-12 text-center text-brand-dark text-sm border-x border-gray-200 select-none tech-mono">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-3.5 text-gray-500 hover:bg-gray-100 transition-colors font-extrabold text-lg select-none"
                    >+</button>
                  </div>

                  {/* Add to Cart */}
                  <button 
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.stock === 0}
                    className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white border-2 border-brand-dark text-brand-dark font-extrabold rounded-xl hover:bg-brand-dark hover:text-white hover:border-brand-dark active:scale-98 transition-all uppercase tracking-wide text-xs"
                  >
                    <ShoppingCart className="w-4 h-4" /> 
                    <span>Add to Cart</span>
                  </button>

                  {/* Buy Now */}
                  <button 
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate('/checkout');
                    }}
                    disabled={product.stock === 0}
                    className="flex-1 px-6 py-3.5 bg-brand-orange text-brand-black font-extrabold rounded-xl hover:bg-orange-400 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-orange/30 active:scale-98 transition-all duration-300 uppercase tracking-wide text-xs text-center shadow-lg shadow-brand-orange/10"
                  >
                    Buy Now
                  </button>

                </div>

                {/* Mobile Sticky Bottom Bar (Fridges/Sticks securely at bottom of viewport) */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-t border-white/10 p-4 pb-5 flex items-center gap-3 shadow-2xl">
                  {/* Small Quality counter */}
                  <div className="flex items-center border border-white/15 rounded-lg bg-white/5 overflow-hidden">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-2 text-white font-extrabold select-none"
                    >-</button>
                    <span className="px-2 py-2 font-bold w-8 text-center text-white text-xs border-x border-white/15 tech-mono">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-2 text-white font-extrabold select-none"
                    >+</button>
                  </div>

                  {/* Add to Cart mobile button */}
                  <button 
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.stock === 0}
                    className="flex-1 py-3 bg-white/12 border border-white/20 text-white font-bold rounded-lg text-[11px] uppercase tracking-wider active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>

                  {/* Buy Now mobile brand button */}
                  <button 
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate('/checkout');
                    }}
                    disabled={product.stock === 0}
                    className="flex-grow py-3 bg-brand-orange text-brand-black font-black rounded-lg text-[11px] uppercase tracking-wider active:scale-95 transition-all text-center flex items-center justify-center"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Secure checkout assurances strip */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-150 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> SECURE CHECKOUT</span>
                  <span>7 DAYS REPLACEMENT POLICY</span>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Brand Value Propositions Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto" style={{ width: '1400px', maxWidth: '100%', height: '100px', marginBottom: '20px', marginRight: '0px' }}>
          <div className="bg-white p-2 h-full rounded-2xl border border-gray-150 text-center flex flex-col items-center justify-center shadow-xs overflow-hidden" style={{ width: '355px', height: '100px', maxWidth: '100%' }}>
            <div className="w-8 h-8 rounded-full bg-brand-blue/15 flex items-center justify-center text-brand-blue mb-1.5 flex-shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-[11px] text-brand-dark mb-0.5 leading-tight">Dhaka & BD Delivery</h4>
            <p className="text-[9px] text-gray-400 line-clamp-2 leading-tight">Next-day delivery inside Dhaka; 2-3 days nationwide.</p>
          </div>
          <div className="bg-white p-2 h-full rounded-2xl border border-gray-150 text-center flex flex-col items-center justify-center shadow-xs overflow-hidden" style={{ height: '100px' }}>
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-brand-orange mb-1.5 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-[11px] text-brand-dark mb-0.5 leading-tight">100% Original</h4>
            <p className="text-[9px] text-gray-400 line-clamp-2 leading-tight">Tested and certified directly by distributors.</p>
          </div>
          <div className="bg-white p-2 h-full rounded-2xl border border-gray-150 text-center flex flex-col items-center justify-center shadow-xs overflow-hidden" style={{ height: '100px' }}>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-1.5 flex-shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-[11px] text-brand-dark mb-0.5 leading-tight">7 Days Lab Warranty</h4>
            <p className="text-[9px] text-gray-400 line-clamp-2 leading-tight">Worry-free claims for hardware damages.</p>
          </div>
          <div className="bg-white p-2 h-full rounded-2xl border border-gray-150 text-center flex flex-col items-center justify-center shadow-xs overflow-hidden" style={{ height: '100px' }}>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1.5 flex-shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-[11px] text-brand-dark mb-0.5 leading-tight">Consultation</h4>
            <p className="text-[9px] text-gray-400 line-clamp-2 leading-tight">Chat with specialist Bangladeshi makers.</p>
          </div>
        </div>

        {/* Tab-driven Specifications, Description, Customer Reviews Matrix */}
        <div className="bg-white rounded-3xl border border-gray-200/85 shadow-sm p-4 md:p-8 mb-16 mx-auto" style={{ width: '1400px', maxWidth: '100%' }}>
          <div className="flex border-b border-gray-150 overflow-x-auto whitespace-nowrap gap-6 md:gap-10 scrollbar-none mb-6">
            <button 
              onClick={() => setActiveTab('description')}
              className={cn(
                "pb-4 font-bold text-xs md:text-sm uppercase tracking-wider text-left transition-colors border-b-2 relative",
                activeTab === 'description' ? "text-brand-orange border-brand-orange" : "text-gray-400 border-transparent hover:text-gray-600"
              )}
            >
              Detailed Specs Summary
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={cn(
                "pb-4 font-bold text-xs md:text-sm uppercase tracking-wider text-left transition-colors border-b-2 relative",
                activeTab === 'specs' ? "text-brand-orange border-brand-orange" : "text-gray-400 border-transparent hover:text-gray-600"
              )}
            >
              Technical Parametres Table
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={cn(
                "pb-4 font-bold text-xs md:text-sm uppercase tracking-wider text-left transition-colors border-b-2 relative flex items-center gap-1.5",
                activeTab === 'reviews' ? "text-brand-orange border-brand-orange" : "text-gray-400 border-transparent hover:text-gray-600"
              )}
            >
              Verified Reviews ({customReviews.length})
            </button>
          </div>

          <div className="py-2">
            
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6 text-sm text-gray-600 leading-relaxed max-w-3xl">
                <div>
                  <h3 className="font-bold text-base text-brand-dark mb-3">Architectural Overview</h3>
                  <p>
                    The <strong className="text-brand-dark">{product.name}</strong> incorporates state-of-the-art semiconductor substrate paths, delivering outstanding heat tolerance and stable voltage regulation metrics under peak development boards load. Designed exclusively for professional research labs, tech enthusiasts, and DIY workspace creators, it easily satisfies the demands of high frequency operations.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-base text-brand-dark mb-3">Key Utility Guidelines</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Optimal performance is observed with standard DC filter decapacitors added to power input.</li>
                    <li>Always verify input polarity before soldering power connections; inverted current can damage microcontrollers.</li>
                    <li>Perfect for coupling with Arduino models, ESP32 nodes, or custom lithium charge setups.</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 flex items-start gap-3 mt-4 text-xs text-gray-500">
                  <AlertCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-700 block mb-0.5">Engineering Disclaimer</strong>
                    Ensure your ambient working zone matches regular static control levels before handling unshielded semiconductor chips to prevent ESD damage.
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Parameters Table Tab */}
            {activeTab === 'specs' && (
              <div className="max-w-2xl border border-gray-150 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150">
                      <th className="py-3 px-4 font-bold text-brand-dark select-none">Technical Metric</th>
                      <th className="py-3 px-4 font-bold text-brand-dark select-none">Tested Capacity value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {getCategorySpecifications().map((spec, sIdx) => (
                      <tr 
                        key={sIdx} 
                        className={cn(
                          "transition-colors hover:bg-gray-50/50",
                          sIdx % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                        )}
                      >
                        <td className="py-3 px-4 font-bold text-gray-500 uppercase tracking-tight text-[11px] tech-mono">{spec.name}</td>
                        <td className="py-3 px-4 text-gray-700 font-medium">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Customer Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-3xl">
                
                {/* Header section with ratings & Write a Review toggler */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-150">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl md:text-5xl font-black text-brand-dark tech-mono">
                      {product.rating}
                    </span>
                    <div>
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((st) => (
                          <Star 
                            key={st} 
                            className={cn(
                              "w-3.5 h-3.5",
                              st <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"
                            )} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 font-semibold mt-1">Based on {customReviews.length} real reviews</p>
                    </div>
                  </div>
                  {!isReviewFormOpen && !hasSubmittedReview && (
                    <button 
                      onClick={() => setIsReviewFormOpen(true)}
                      className="px-4 py-2 bg-brand-dark text-white rounded-lg text-xs font-bold hover:bg-brand-blue hover:text-brand-black transition-all flex items-center gap-1.5 self-start sm:self-auto uppercase tracking-wider"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Write a Review
                    </button>
                  )}
                </div>

                {/* Submitting form widget */}
                <AnimatePresence>
                  {isReviewFormOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white p-5 rounded-2xl border border-gray-200 shadow-inner"
                    >
                      <h4 className="font-extrabold text-xs text-brand-dark uppercase tracking-wider mb-4 pb-1 border-b border-gray-100 flex items-center justify-between">
                        <span>Contribute Product Feedback</span>
                        <button onClick={() => setIsReviewFormOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs">Cancel</button>
                      </h4>
                      {hasSubmittedReview ? (
                        <div className="py-6 text-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2 text-lg">✓</div>
                          <p className="text-xs font-bold text-green-700">Review Submitted Successfully!</p>
                          <p className="text-[11px] text-gray-400 mt-1">Calculating and rendering metrics dynamically...</p>
                        </div>
                      ) : (
                        <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tech-mono mb-1">Your Name</label>
                              <input 
                                type="text"
                                required
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                                placeholder="e.g. Sazzadul Alim"
                                className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-brand-blue"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tech-mono mb-1">Product Star Rating</label>
                              <select 
                                value={newRating}
                                onChange={(e) => setNewRating(Number(e.target.value))}
                                className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-brand-blue bg-white"
                              >
                                <option value="5">★★★★★ Outstanding (5/5)</option>
                                <option value="4">★★★★☆ Good (4/5)</option>
                                <option value="3">★★★☆☆ Satisfactory (3/5)</option>
                                <option value="2">★★☆☆☆ Sub-optimal (2/5)</option>
                                <option value="1">★☆☆☆☆ Faulty (1/5)</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tech-mono mb-1">Detailed Technical Feedback Message</label>
                            <textarea 
                              required
                              rows={3}
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Review the circuit performance, build, package quality, and accuracy..."
                              className="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-brand-blue"
                            ></textarea>
                          </div>
                          <button 
                            type="submit"
                            className="px-5 py-2.5 bg-brand-orange text-brand-black text-xs font-extrabold rounded-lg hover:bg-orange-400 uppercase tracking-widest"
                          >
                            Post Verified Review
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reviews Feed list */}
                <div className="divide-y divide-gray-100">
                  {customReviews.map((rev) => (
                    <div key={rev.id} className="py-5 first:pt-1 last:pb-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          {/* Name & status flags */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-brand-dark flex items-center gap-1">
                              <User className="w-3 h-3 text-gray-400" />
                              {rev.author}
                            </span>
                            {rev.verified && (
                              <span className="text-[8px] bg-green-50 text-green-700 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5 text-green-600" />
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          
                          {/* Rating score row */}
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <div className="flex text-amber-500">
                              {[1, 2, 3, 4, 5].map((st) => (
                                <Star 
                                  key={st} 
                                  className={cn(
                                    "w-3 h-3",
                                    st <= rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                                  )} 
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-400 font-semibold">{rev.date}</span>
                          </div>

                          {/* Message Content */}
                          <p className="text-xs text-gray-600 mt-2.5 leading-relaxed bg-gray-50/40 p-2.5 rounded-lg border border-gray-100/50">
                            {rev.comment}
                          </p>
                          
                          {/* Like actions */}
                          <div className="flex items-center gap-1.5 mt-3 select-none">
                            <button 
                              onClick={() => handleLikeReview(rev.id)}
                              className={cn(
                                "flex items-center gap-1 hover:text-brand-blue text-[10px] font-bold pb-0.5 px-2 py-0.5 rounded-md transition-all active:scale-90 border",
                                rev.likedByUser 
                                  ? "text-brand-blue bg-brand-blue/5 border-brand-blue/10" 
                                  : "text-gray-400 bg-white border-gray-150"
                              )}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>Helpful ({rev.likes})</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* RELATED COMPONENT matrix block catalog */}
        <div className="pt-2">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-8">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-orange animate-pulse" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                Recommended <span className="text-brand-orange">Alternatives</span>
              </h2>
            </div>
            <Link to="/shop" className="text-xs font-bold text-brand-blue hover:underline flex items-center">
              Catalog View <ChevronLeft className="w-3 h-3 ml-1 rotate-180" />
            </Link>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white border border-gray-150 rounded-2xl">
              <Cpu className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400 font-medium">No direct category alternatives found right now.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
