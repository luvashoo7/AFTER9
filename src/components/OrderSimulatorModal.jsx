import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, Clock, RotateCcw, Zap, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSimulatorModal = () => {
  const { activeOrder, isCheckoutModalOpen, setIsCheckoutModalOpen, processDoorstepReturn } = useCart();
  const [orderStage, setOrderStage] = useState('assigned'); // 'assigned', 'on_way', 'doorstep_inspect', 'completed', 'returned'

  useEffect(() => {
    if (!isCheckoutModalOpen) return;

    setOrderStage('assigned');

    const timer1 = setTimeout(() => {
      setOrderStage('on_way');
    }, 2800);

    const timer2 = setTimeout(() => {
      setOrderStage('doorstep_inspect');
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isCheckoutModalOpen]);

  if (!isCheckoutModalOpen || !activeOrder) return null;

  const handleAcceptDoorstep = () => {
    setOrderStage('completed');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a3e635', '#10b981', '#ffffff', '#a78bfa'],
    });
  };

  const handleReturnDoorstep = () => {
    processDoorstepReturn('Customer returned entire order during doorstep inspection');
    setOrderStage('returned');
  };

  const returnDeliveryCharge = 29;
  const productSubtotal = activeOrder.subtotal || 0;
  const calculatedRefund = Math.max(0, productSubtotal - (activeOrder.discount || 0));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0a0a14] border-2 border-[#a3e635]/35 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Modal */}
        <button
          onClick={() => setIsCheckoutModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
              LIVE NIGHT COMMERCE TELEMETRY
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Order #{activeOrder.orderId || activeOrder.id}
          </h3>
          <p className="text-xs font-mono text-slate-400">
            {activeOrder.sector || 'Greater Noida Pilot Zone'} • Doorstep Open-Box Active
          </p>
        </div>

        {/* Dynamic Stage Content */}
        <div className="py-6 space-y-6">
          
          {/* Stage Progress Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className={`p-2 rounded-xl border ${orderStage !== 'assigned' ? 'bg-[#10101e] text-[#bef264] border-[#a3e635]/40' : 'bg-[#a3e635] text-[#06060a] font-black'}`}>
              1. Dispatched
            </div>
            <div className={`p-2 rounded-xl border ${orderStage === 'on_way' ? 'bg-[#a3e635] text-[#06060a] font-black' : orderStage === 'doorstep_inspect' || orderStage === 'completed' ? 'bg-[#10101e] text-[#bef264] border-[#a3e635]/40' : 'bg-[#0f0f1a] text-slate-500 border-white/5'}`}>
              2. Rider On Route
            </div>
            <div className={`p-2 rounded-xl border ${orderStage === 'doorstep_inspect' ? 'bg-[#a3e635] text-[#06060a] font-black animate-pulse' : orderStage === 'completed' ? 'bg-emerald-500 text-black font-black' : orderStage === 'returned' ? 'bg-rose-500 text-white font-black' : 'bg-[#0f0f1a] text-slate-500 border-white/5'}`}>
              3. Doorstep Check
            </div>
          </div>

          {/* STAGE 1: ASSIGNED */}
          {orderStage === 'assigned' && (
            <div className="text-center space-y-4 py-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#a3e635]/10 border border-[#a3e635] text-[#a3e635] flex items-center justify-center mx-auto animate-spin">
                <Zap className="w-8 h-8 fill-current" />
              </div>
              <div>
                <p className="font-display font-black text-xl text-white uppercase">Packing In Greater Noida Hub...</p>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Chilling cold drinks & securing snacks for open-box inspection.
                </p>
              </div>
            </div>
          )}

          {/* STAGE 2: ON ROUTE */}
          {orderStage === 'on_way' && (
            <div className="text-center space-y-4 py-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#a78bfa]/20 border border-[#a78bfa] text-[#a78bfa] flex items-center justify-center mx-auto animate-bounce">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <p className="font-display font-black text-xl text-white uppercase">Rider Vikram S. Is 3 Mins Away</p>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Navigating Pari Chowk corridor with branded AFTER 9 night bag.
                </p>
              </div>
            </div>
          )}

          {/* STAGE 3: DOORSTEP INSPECTION */}
          {orderStage === 'doorstep_inspect' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                <p className="text-xs font-mono font-black text-[#bef264] uppercase">
                  📦 RIDER HAS ARRIVED AT YOUR DOORSTEP!
                </p>
                <p className="text-xs text-slate-300 font-mono">
                  Please unseal and inspect items with rider before accepting or paying.
                </p>
              </div>

              {/* Order Items Inspection Summary */}
              <div className="max-h-40 overflow-y-auto space-y-2 p-3 rounded-2xl bg-[#0e0e1a] border border-white/10">
                {activeOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200">{item.qty || item.quantity}x {item.name || item.title}</span>
                    <span className="text-[#bef264]">Verified Fresh ✓</span>
                  </div>
                ))}
              </div>

              {/* Dual Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAcceptDoorstep}
                  className="w-full bg-[#a3e635] hover:bg-[#bef264] text-[#06060a] font-black text-xs py-3.5 rounded-2xl uppercase tracking-wider shadow-lime-glow flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  ACCEPT ORDER (EVERYTHING PERFECT)
                </button>

                <button
                  onClick={handleReturnDoorstep}
                  className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-xs py-3 rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  RETURN ENTIRE ORDER TO RIDER
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: COMPLETED */}
          {orderStage === 'completed' && (
            <div className="text-center space-y-4 py-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lime-glow">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div>
                <p className="font-display font-black text-2xl text-white uppercase">Enjoy Your Night Order!</p>
                <p className="text-xs text-slate-300 font-mono mt-1">
                  Verified & accepted at doorstep. Paid ₹{activeOrder.total}. Zero blind acceptance.
                </p>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="btn-primary px-8 py-3 rounded-xl text-xs font-black uppercase"
              >
                Close & Continue Exploring
              </button>
            </div>
          )}

          {/* STAGE 5: RETURNED (WITH DELIVERY RETURN FEE DETAILS) */}
          {orderStage === 'returned' && (
            <div className="text-center space-y-4 py-4 animate-in zoom-in-95 font-mono">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto">
                <RotateCcw className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-black text-2xl text-white uppercase">Instant Return Processed!</p>
                <p className="text-xs text-slate-300">
                  Package handed back to rider. ₹{calculatedRefund} refund credited to source in 90 seconds.
                </p>
              </div>

              {/* Transparent Delivery Return Charge Notice */}
              <div className="p-4 rounded-2xl bg-[#121224] border border-white/10 text-left space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Product Items Refunded:</span>
                  <span className="text-emerald-400 font-bold">₹{productSubtotal} (100%)</span>
                </div>
                <div className="flex justify-between text-rose-300">
                  <span>Rider Midnight Trip Transit Fee:</span>
                  <span>-₹{returnDeliveryCharge}</span>
                </div>
                <div className="pt-1.5 border-t border-white/10 flex justify-between text-white font-bold">
                  <span>Net Reversal to UPI:</span>
                  <span className="text-[#a3e635]">₹{calculatedRefund}</span>
                </div>
                <p className="text-[10px] text-slate-500 pt-1 leading-normal italic">
                  *Nominal ₹29 delivery return charge is retained to fairly compensate our electric rider for midnight transit.
                </p>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="btn-secondary px-8 py-3 rounded-xl text-xs font-mono"
              >
                Close Window
              </button>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>“Whatever you need after 9.”</span>
          <span className="text-[#a3e635]">AFTER 9 GREATER NOIDA</span>
        </div>

      </div>
    </div>
  );
};
