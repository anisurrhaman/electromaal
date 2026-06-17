import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Truck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock checkout processing
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert('Order placed successfully! Order ID: EM-' + Math.floor(Math.random() * 1000000));
      navigate('/');
    }, 2000);
  };

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-brand-blue underline">Go back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4">
        {/* Progress Tracker */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            {['Shipping', 'Payment', 'Review'].map((s, idx) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors",
                    step > idx + 1 ? "bg-green-500 text-white" : step === idx + 1 ? "bg-brand-blue text-white" : "bg-white text-gray-400 border border-gray-200"
                  )}>
                    {step > idx + 1 ? '✓' : idx + 1}
                  </div>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    step === idx + 1 ? "text-brand-blue" : "text-gray-400"
                  )}>{s}</span>
                </div>
                {idx < 2 && <div className={cn("flex-grow h-px mx-4 mb-6", step > idx + 1 ? "bg-green-500" : "bg-gray-200")}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Checkout Forms */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Truck className="w-6 h-6 mr-3 text-brand-blue" /> Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Full Name</label>
                    <input type="text" placeholder="e.g. Anisul Islam" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-blue" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Phone Number</label>
                    <input type="tel" placeholder="+880" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-blue" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Delivery Address</label>
                    <textarea rows={3} placeholder="Street, Holding, Area..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-blue"></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">City</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-blue">
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                      <option>Rajshahi</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Postal Code</label>
                    <input type="text" placeholder="1212" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-blue" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full mt-10 py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue/90 transition-all">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-brand-blue" /> Payment Method
                </h2>
                <div className="space-y-4">
                  {[
                    { id: 'bkash', name: 'bKash / Rocket / Nagad', icon: '📱' },
                    { id: 'card', name: 'Credit or Debit Card', icon: '💳' },
                    { id: 'cod', name: 'Cash on Delivery', icon: '🚚' }
                  ].map((method) => (
                    <label key={method.id} className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-brand-blue has-[:checked]:bg-blue-50/50">
                      <input type="radio" name="payment" value={method.id} defaultChecked={method.id === 'bkash'} className="w-4 h-4 text-brand-blue" />
                      <span className="ml-4 text-2xl">{method.icon}</span>
                      <span className="ml-4 font-bold text-gray-800">{method.name}</span>
                    </label>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded-lg text-xs leading-relaxed flex items-start">
                    <ShieldCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Your payment data is encrypted and secure. We do not store your full card details or mobile wallet PIN.</span>
                </div>

                <div className="flex gap-4 mt-10">
                    <button onClick={() => setStep(1)} className="flex-grow py-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all">
                        Back to Shipping
                    </button>
                    <button onClick={() => setStep(3)} className="flex-grow py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue/90 transition-all">
                        Review Order
                    </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                 <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                 <div className="space-y-6">
                    <div className="pb-6 border-b border-gray-100">
                        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-3">Shipping To</h3>
                        <p className="text-sm font-medium text-gray-800">Anisul Islam</p>
                        <p className="text-sm text-gray-500">Level 5, Basundhara City, Panthapath, Dhaka</p>
                        <p className="text-sm text-gray-500">+880 1234 567890</p>
                    </div>
                    <div className="pb-6 border-b border-gray-100">
                        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-3">Payment Method</h3>
                        <p className="text-sm font-medium text-gray-800">bKash / Mobile Wallet</p>
                    </div>
                 </div>

                 <div className="flex gap-4 mt-10">
                    <button onClick={() => setStep(2)} className="flex-grow py-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all">
                        Back to Payment
                    </button>
                    <button 
                        onClick={handlePlaceOrder} 
                        disabled={isProcessing}
                        className="flex-grow py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange/90 transition-all flex items-center justify-center shadow-lg shadow-brand-orange/20"
                    >
                        {isProcessing ? 'Processing...' : 'Place Final Order'} <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Side Cart Summary */}
          <div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-32">
                <h3 className="font-bold border-b border-gray-100 pb-4 mb-4">Order Summary</h3>
                <div className="max-h-60 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-3">
                            <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 flex-shrink-0 overflow-hidden">
                                <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-xs font-bold truncate text-gray-800">{item.name}</p>
                                <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-xs font-bold text-brand-blue">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>Shipping</span>
                        <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>Tax (VAT 5%)</span>
                        <span>{formatPrice(cartTotal * 0.05)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-brand-blue pt-3 border-t border-gray-100">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal * 1.05)}</span>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <Lock className="w-3 h-3 mr-2" /> Secure Checkout 
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper inside file for simplicity
function cn(...inputs: any) {
    return inputs.filter(Boolean).join(' ');
}
