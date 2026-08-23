import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Tag, MapPin } from 'lucide-react';
import { PILOT_ZONES } from '../data/products';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total,
    totalItemsCount,
    applyPromo,
    appliedDiscount,
    promoMessage,
    placeOrder
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');
  const [selectedSector, setSelectedSector] = useState(PILOT_ZONES[0].name);
  const [addressNote, setAddressNote] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputPromo) {
      applyPromo(inputPromo);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    placeOrder({
      sector: selectedSector,
      addressNote: addressNote || 'Hostel / Flat Doorstep'
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#090912] h-full border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-hidden z-10">
        
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

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#121220] border border-white/10 flex items-center justify-center mx-auto text-2xl">
                🌙
              </div>
              <p className="font-display font-bold text-white text-base">Your Midnight Bag is Empty</p>
              <p className="text-xs text-slate-400 font-mono max-w-xs mx-auto">
                Explore 2 AM Cravings, ₹10 Corner, or Grab a Midnight Bundle.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase"
              >
                Browse Midnight Drops
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#0f0f1c] border border-white/5 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#07070e] overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-white line-clamp-1 group-hover:text-[#bef264] transition-colors">
                      {item.name || item.title}
                    </h4>
                    <p className="text-[11px] font-mono text-[#bef264] font-bold">
                      ₹{item.price} <span className="text-slate-500 font-normal">x {item.quantity}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-[#17172a] rounded-xl px-2 py-1 border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-xs text-slate-300 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-black text-white px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-xs text-slate-300 hover:text-[#bef264]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout & Summary Area */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            
            {/* Greater Noida Sector Picker */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#a3e635]" /> Delivering In Greater Noida Pilot:
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-[#0f0f1c] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-[#a3e635]"
              >
                {PILOT_ZONES.map((zone) => (
                  <option key={zone.name} value={zone.name}>
                    {zone.name} ({zone.eta})
                  </option>
                ))}
              </select>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputPromo}
                  onChange={(e) => setInputPromo(e.target.value)}
                  placeholder="Code: AFTER9PILOT or MIDNIGHT"
                  className="w-full bg-[#0f0f1c] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none focus:border-[#a3e635]"
                />
              </div>
              <button
                type="submit"
                className="btn-secondary px-3 py-2 rounded-xl text-xs font-mono font-bold"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p className="text-[11px] font-mono text-[#bef264]">{promoMessage}</p>
            )}

            {/* Price Breakdown */}
            <div className="p-3.5 rounded-2xl bg-[#0f0f1c] border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery (Pilot Zone)</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                <span className="font-display">Total Due</span>
                <span className="text-[#bef264] font-black font-display">₹{total}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lime-glow flex items-center justify-center gap-2 group"
            >
              <span>PLACE NIGHT ORDER (₹{total})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
              <span>Doorstep Open-Box Inspection Guaranteed</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
