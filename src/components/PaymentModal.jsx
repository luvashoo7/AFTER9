import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  X, ShieldCheck, MapPin, Zap, CreditCard, Banknote, 
  Sparkles, Heart, Tag, ArrowRight, CheckCircle2, ChevronRight, Wallet 
} from 'lucide-react';

export const PaymentModal = () => {
  const { 
    isPaymentModalOpen, setIsPaymentModalOpen, cart, subtotal, deliveryFee, 
    tipAmount, setTipAmount, appliedDiscount, total, promoCode, setPromoCode, 
    applyPromo, promoMessage, placeOrder 
  } = useCart();
  const { activeAddress, setIsAddressModalOpen, user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'doorstep' | 'wallet'
  const [upiApp, setUpiApp] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'custom'
  const [customUpiId, setCustomUpiId] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [useWallet, setUseWallet] = useState(false);

  if (!isPaymentModalOpen) return null;

  const tipOptions = [0, 5, 10, 15, 20];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromo(couponInput);
    }
  };

  const effectiveItems = cart.length > 0 ? cart : [
    { id: 'demo-1', name: 'Red Bull Energy Drink (Pack of 4)', price: 460, mrp: 500, quantity: 1, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60' },
    { id: 'demo-2', name: 'Doritos Sizzlin\' Hot Nachos', price: 50, mrp: 55, quantity: 2, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60' }
  ];

  const effectiveSubtotal = cart.length > 0 ? subtotal : 560;
  const effectiveDeliveryFee = cart.length > 0 ? deliveryFee : 0;
  const rawTotal = effectiveSubtotal + effectiveDeliveryFee + tipAmount - appliedDiscount;
  const walletDeduction = useWallet ? Math.min(rawTotal, user?.walletBalance || 0) : 0;
  const finalTotal = Math.max(0, rawTotal - walletDeduction);

  const handleConfirmOrder = () => {
    placeOrder({
      sector: activeAddress?.sector || 'Pari Chowk Central Hub',
      address: activeAddress,
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiApp.toUpperCase()})` : paymentMethod === 'doorstep' ? 'Pay on Open-Box Inspection' : paymentMethod === 'wallet' ? 'Night Wallet' : 'Cards/NetBanking',
      tip: tipAmount,
    });
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsPaymentModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
              10-15 MINS DISPATCH CHECKOUT
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            MIDNIGHT <span className="text-[#a3e635]">PAYMENT</span>
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Greater Noida Dark Store • 100% Zero-Blind Open-Box Guarantee
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="py-4 space-y-5 max-h-[65vh] overflow-y-auto pr-1">
          
          {/* ORDER ITEMS MINI SUMMARY */}
          <div className="p-3.5 rounded-2xl bg-[#0e0e1a] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 font-bold">
              <span>ORDER ITEMS ({effectiveItems.length})</span>
              <span className="text-[#bef264]">⚡ 10-15m ETA</span>
            </div>
            <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
              {effectiveItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={item.image} alt={item.name} className="w-7 h-7 rounded-lg object-cover border border-white/10 shrink-0" />
                    <span className="text-white truncate">{item.quantity || 1}x {item.name}</span>
                  </div>
                  <span className="text-[#a3e635] font-bold shrink-0">₹{(item.price || 0) * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 1. DELIVERY ADDRESS BANNER */}
          <div 
            onClick={() => setIsAddressModalOpen(true)}
            className="p-3.5 rounded-2xl bg-[#0f0f1c] border border-white/10 hover:border-[#a3e635]/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#a3e635]/10 text-[#a3e635] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase font-display">
                    {activeAddress?.title || 'Selected Drop Location'}
                  </span>
                  <span className="text-[10px] font-mono text-[#bef264]">⚡ 10-15m ETA</span>
                </div>
                <p className="text-xs text-slate-300 font-mono truncate max-w-xs sm:max-w-md">
                  {activeAddress?.flatNo}, {activeAddress?.sector}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#a3e635] group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* 2. NIGHT RIDER TIP SELECTOR */}
          <div className="p-4 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                NIGHT RIDER TIP
              </span>
              <span className="text-[11px] text-slate-400">100% goes to your electric rider</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {tipOptions.map((tip) => (
                <button
                  key={tip}
                  type="button"
                  onClick={() => setTipAmount(tip)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    tipAmount === tip
                      ? 'bg-[#a3e635] text-black font-black border-[#a3e635] shadow-lime-glow'
                      : 'bg-[#141424] text-slate-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {tip === 0 ? 'None' : `₹${tip}`}
                </button>
              ))}
            </div>
          </div>

          {/* 3. PAYMENT METHODS */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              CHOOSE PAYMENT MODE
            </label>

            {/* UPI OPTION */}
            <div 
              onClick={() => setPaymentMethod('upi')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'upi'
                  ? 'bg-[#121824] border-[#a3e635] shadow-lime-glow'
                  : 'bg-[#0f0f1c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#a3e635]/10 text-[#a3e635] flex items-center justify-center font-bold font-mono text-xs">
                    UPI
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-display">Instant UPI Payment</h4>
                    <p className="text-[11px] text-slate-400 font-mono">Google Pay, PhonePe, Paytm, Any App</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#a3e635] bg-[#a3e635]' : 'border-white/30'}`}>
                  {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-4 gap-2">
                  {[
                    { id: 'gpay', name: 'GPay' },
                    { id: 'phonepe', name: 'PhonePe' },
                    { id: 'paytm', name: 'Paytm' },
                    { id: 'custom', name: 'Other UPI' },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpiApp(app.id);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border ${
                        upiApp === app.id
                          ? 'bg-[#a3e635] text-black border-[#a3e635]'
                          : 'bg-[#18182a] text-slate-300 border-white/10'
                      }`}
                    >
                      {app.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PAY ON OPEN-BOX INSPECTION */}
            <div 
              onClick={() => setPaymentMethod('doorstep')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'doorstep'
                  ? 'bg-[#121824] border-[#a3e635] shadow-lime-glow'
                  : 'bg-[#0f0f1c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-display flex items-center gap-1.5">
                      <span>Pay on Doorstep Inspection</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-mono">
                        ZERO RISK
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">Open box → Verify items → Pay Cash or UPI to rider</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'doorstep' ? 'border-[#a3e635] bg-[#a3e635]' : 'border-white/30'}`}>
                  {paymentMethod === 'doorstep' && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
              </div>
            </div>

            {/* CARDS & NETBANKING */}
            <div 
              onClick={() => setPaymentMethod('card')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'bg-[#121824] border-[#a3e635] shadow-lime-glow'
                  : 'bg-[#0f0f1c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-display">Credit / Debit Card</h4>
                    <p className="text-[11px] text-slate-400 font-mono">Visa, Mastercard, RuPay & NetBanking</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#a3e635] bg-[#a3e635]' : 'border-white/30'}`}>
                  {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
              </div>
            </div>

            {/* NIGHT WALLET (₹250 BONUS) */}
            {user?.walletBalance > 0 && (
              <div 
                onClick={() => setUseWallet(!useWallet)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  useWallet
                    ? 'bg-purple-950/40 border-[#a78bfa] shadow-purple-glow'
                    : 'bg-[#0f0f1c] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-[#a78bfa] flex items-center justify-center">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase font-display">
                        Apply Night Wallet Credits (₹{user.walletBalance} Available)
                      </h4>
                      <p className="text-[11px] text-purple-300 font-mono">Instant deduction from total</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${useWallet ? 'border-[#a78bfa] bg-[#a78bfa]' : 'border-white/30'}`}>
                    {useWallet && <div className="w-2 h-2 rounded-full bg-black" />}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. PROMO CODE INPUT */}
          <form onSubmit={handleApplyCoupon} className="space-y-1.5">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Promo Code (AFTER9PILOT / MIDNIGHT)"
                className="flex-1 bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#18182a] hover:bg-[#a3e635] text-slate-300 hover:text-black font-mono text-xs font-bold rounded-xl border border-white/10 transition-colors"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className="text-xs font-mono text-[#bef264]">{promoMessage}</p>
            )}
          </form>

          {/* 5. DETAILED BILL SUMMARY */}
          <div className="p-4 rounded-2xl bg-[#0a0a14] border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Item Subtotal ({effectiveItems.length} items)</span>
              <span>₹{effectiveSubtotal}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Midnight Priority Dispatch</span>
              <span>{effectiveDeliveryFee === 0 ? <strong className="text-[#a3e635]">FREE</strong> : `₹${effectiveDeliveryFee}`}</span>
            </div>

            {tipAmount > 0 && (
              <div className="flex justify-between text-rose-300">
                <span>Rider Midnight Tip</span>
                <span>₹{tipAmount}</span>
              </div>
            )}

            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Coupon Savings</span>
                <span>-₹{appliedDiscount}</span>
              </div>
            )}

            {useWallet && (
              <div className="flex justify-between text-purple-300">
                <span>Night Wallet Credit Applied</span>
                <span>-₹{walletDeduction}</span>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex justify-between text-white font-black text-sm">
              <span>TO PAY NOW</span>
              <span className="text-[#a3e635] font-display text-base">₹{finalTotal}</span>
            </div>
          </div>

        </div>

        {/* Footer Checkout Action */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <button
            onClick={handleConfirmOrder}
            className="w-full btn-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lime-glow"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>PLACE MIDNIGHT ORDER (₹{finalTotal}) →</span>
          </button>

          <p className="text-center text-[10px] font-mono text-slate-500">
            Doorstep open-box inspection starts upon rider arrival. Reject anytime with zero hassle.
          </p>
        </div>

      </div>
    </div>
  );
};
