import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Tag, MapPin, Heart, ChevronRight } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    tipAmount,
    setTipAmount,
    total,
    totalItemsCount,
    applyPromo,
    appliedDiscount,
    promoMessage,
    setIsPaymentModalOpen,
  } = useCart();

  const { activeAddress, setIsAddressModalOpen, user, openLoginModal } = useAuth();
  const [inputPromo, setInputPromo] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputPromo.trim()) {
      applyPromo(inputPromo);
    }
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) return;
    if (!user?.isLoggedIn) {
      setIsCartOpen(false);
      openLoginModal();
      return;
    }
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[110] flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#090912] h-full border-l border-white/10 shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-hidden z-10">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="brand-nine text-sm font-black px-2 py-0.5 rounded-lg bg-[#a3e635] text-[#06060a]">
              9
            </span>
            <div>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                MIDNIGHT BAG ({totalItemsCount})
              </h3>
              <p className="text-[10px] font-mono text-[#bef264]">
                Doorstep Open-Box Inspection Enabled
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-[#121220] text-slate-400 hover:text-white border border-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Address Banner */}
        <div 
          onClick={() => setIsAddressModalOpen(true)}
          className="my-3 p-3 rounded-2xl bg-[#0f0f1c] border border-white/10 hover:border-[#a3e635]/50 transition-all cursor-pointer flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#a3e635]/10 text-[#a3e635]">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-white font-display uppercase truncate">
                {activeAddress?.title || 'Drop Point'}: <span className="text-[#bef264]">{activeAddress?.sector || 'Pari Chowk Hub'}</span>
              </p>
              <p className="text-[10px] text-slate-400 font-mono truncate">
                {activeAddress?.flatNo || 'Select delivery address'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#a3e635] font-bold shrink-0">CHANGE</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-2.5 pr-1">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#121220] border border-white/10 flex items-center justify-center mx-auto text-2xl">
                🌙
              </div>
              <p className="font-display font-bold text-white text-base">Your Midnight Bag is Empty</p>
              <p className="text-xs text-slate-400 font-mono max-w-xs mx-auto">
                Explore 2 AM Cravings, ₹10 Corner, or Grab a Midnight Bundle.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase"
                >
                  Browse Midnight Drops
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsPaymentModalOpen(true);
                  }}
                  className="px-6 py-2 rounded-xl text-xs font-mono font-bold text-[#bef264] hover:underline flex items-center justify-center gap-1.5"
                >
                  💳 Preview Payment & Checkout Sheet →
                </button>
              </div>
            </div>
          ) : (
            cart.map((item) => {
              const itemKey = item.cartKey || item.id;
              return (
                <div
                  key={itemKey}
                  className="p-3 rounded-2xl bg-[#0f0f1c] border border-white/5 flex items-center justify-between gap-3 group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover border border-white/5 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white uppercase font-display truncate">
                      {item.name}
                    </h4>
                    {item.selectedVariant && (
                      <p className="text-[10px] font-mono text-purple-300">
                        {item.selectedVariant.name}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="text-[#a3e635] font-bold">₹{item.price}</span>
                      {item.mrp && <span className="text-slate-500 line-through text-[10px]">₹{item.mrp}</span>}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#141424] border border-white/10 rounded-xl px-2 py-1 shrink-0">
                    <button
                      onClick={() => updateQuantity(itemKey, -1)}
                      className="text-slate-400 hover:text-white"
                      title="Decrease quantity"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-rose-400" /> : <Minus className="w-3 h-3" />}
                    </button>
                    <span className="text-xs font-black font-mono text-white min-w-[14px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(itemKey, 1)}
                      className="text-slate-400 hover:text-white"
                      title="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Bottom Controls & Bill */}
        {cart.length > 0 && (
          <div className="pt-3 border-t border-white/10 space-y-3">
            
            {/* Quick Tip Selector */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                Rider Tip:
              </span>
              <div className="flex gap-1.5">
                {[0, 10, 20].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipAmount(t)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono border transition-all ${
                      tipAmount === t
                        ? 'bg-[#a3e635] text-black font-black border-[#a3e635]'
                        : 'bg-[#121222] text-slate-400 border-white/10'
                    }`}
                  >
                    {t === 0 ? 'None' : `₹${t}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-3.5 rounded-2xl bg-[#0e0e1a] border border-white/5 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Midnight Dispatch</span>
                <span>{deliveryFee === 0 ? <strong className="text-[#a3e635]">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              {tipAmount > 0 && (
                <div className="flex justify-between text-rose-300">
                  <span>Rider Tip</span>
                  <span>₹{tipAmount}</span>
                </div>
              )}
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Savings</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="pt-1.5 border-t border-white/10 flex justify-between text-white font-black text-sm">
                <span>Total</span>
                <span className="text-[#a3e635]">₹{total}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToPayment}
              className="w-full btn-primary py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow"
            >
              <span>PROCEED TO PAYMENT (₹{total})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
              <span>100% Zero-Blind Open-Box Guaranteed</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
