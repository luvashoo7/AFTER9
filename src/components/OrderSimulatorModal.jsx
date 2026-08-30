import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  X,
  ShieldCheck,
  Clock,
  RotateCcw,
  Zap,
  Check,
  ArrowRight,
  Copy,
  CheckCircle2,
  PackageCheck,
  ShoppingBag,
  History,
  MapPin,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSimulatorModal = () => {
  const { activeOrder, isCheckoutModalOpen, setIsCheckoutModalOpen, processDoorstepReturn } = useCart();
  const { setIsOrdersModalOpen } = useAuth();

  const [viewMode, setViewMode] = useState('placed'); // 'placed' | 'telemetry'
  const [orderStage, setOrderStage] = useState('assigned'); // 'assigned', 'on_way', 'doorstep_inspect', 'completed', 'returned'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCheckoutModalOpen) return;
    setViewMode('placed');
    setOrderStage('assigned');

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#a3e635', '#10b981', '#ffffff', '#a78bfa'],
    });
  }, [isCheckoutModalOpen]);

  // Automated stage transition only when user enters live telemetry mode
  useEffect(() => {
    if (viewMode !== 'telemetry') return;

    setOrderStage('assigned');

    const timer1 = setTimeout(() => {
      setOrderStage('on_way');
    }, 3000);

    const timer2 = setTimeout(() => {
      setOrderStage('doorstep_inspect');
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [viewMode]);

  if (!isCheckoutModalOpen || !activeOrder) return null;

  const orderNum = activeOrder.orderNumber || activeOrder.orderId || activeOrder.id || 'A9-ORDER';

  const handleCopyOrderNum = () => {
    navigator.clipboard?.writeText(orderNum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    processDoorstepReturn(activeOrder.items || [], 'Customer returned entire order during doorstep inspection');
    setOrderStage('returned');
  };

  const returnDeliveryCharge = 29;
  const productSubtotal = activeOrder.subtotal || 0;
  const calculatedRefund = Math.max(0, productSubtotal - (activeOrder.discount || 0));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0a0a14] border-2 border-[#a3e635]/40 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col justify-between">
        
        {/* Close Modal */}
        <button
          onClick={() => setIsCheckoutModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* VIEW 1: ORDER PLACED CONFIRMATION (DEFAULT INITIAL VIEW) */}
        {/* ========================================================================= */}
        {viewMode === 'placed' && (
          <div className="space-y-5 overflow-y-auto pr-1">
            
            {/* Success Icon & Heading */}
            <div className="text-center space-y-2 pt-2">
              <div className="w-16 h-16 rounded-full bg-[#a3e635]/15 border-2 border-[#a3e635] text-[#a3e635] flex items-center justify-center mx-auto shadow-lime-glow">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-[#bef264] uppercase tracking-wider bg-[#a3e635]/10 px-2.5 py-1 rounded-full border border-[#a3e635]/30">
                  🎉 Order Placed Successfully
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-2">
                  THANK YOU FOR ORDERING!
                </h3>
              </div>
            </div>

            {/* Order Number & ETA Pill */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121222] border border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Order ID:</span>
                <span className="text-white font-black text-sm">#{orderNum}</span>
                <button
                  onClick={handleCopyOrderNum}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white"
                  title="Copy Order ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#a3e635]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center gap-1 text-[#bef264] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>10-15 mins ETA</span>
              </div>
            </div>

            {/* Ordered Items Summary */}
            <div className="p-3.5 rounded-2xl bg-[#0d0d18] border border-white/10 space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-b border-white/5 pb-2">
                <span>ITEMS IN YOUR MIDNIGHT BAG</span>
                <span className="text-[#a3e635]">{activeOrder.items?.length || 1} Item(s)</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                {activeOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-7 h-7 rounded-lg object-cover border border-white/10 shrink-0" />
                      )}
                      <span className="text-white truncate">
                        {item.quantity || 1}x {item.name || item.title}
                      </span>
                    </div>
                    <span className="text-[#a3e635] font-bold shrink-0">
                      ₹{(item.price || item.unitPrice || 0) * (item.quantity || 1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Payment Details */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-3 rounded-2xl bg-[#121222] border border-white/5 space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#a3e635]" /> Delivery Point
                </span>
                <p className="text-white font-bold truncate">
                  {activeOrder.sector || 'Pari Chowk Central Hub'}
                </p>
                <p className="text-slate-500 text-[10px]">Greater Noida Pilot Zone</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#121222] border border-white/5 space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#a3e635]" /> Payment Paid
                </span>
                <p className="text-[#a3e635] font-black text-sm">
                  ₹{activeOrder.total || activeOrder.totalAmount}
                </p>
                <p className="text-slate-500 text-[10px]">{activeOrder.paymentMethod || 'UPI (Instant)'}</p>
              </div>
            </div>

            {/* Open Box Guarantee Notice */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span>Doorstep Open-Box Inspection guaranteed before unsealing.</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setViewMode('telemetry')}
                className="w-full bg-[#a3e635] hover:bg-[#bef264] text-[#06060a] font-black text-xs py-3.5 rounded-2xl uppercase tracking-wider shadow-lime-glow flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <span>⚡ Track Live Telemetry & Open-Box Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setIsOrdersModalOpen(true);
                  }}
                  className="w-full bg-[#141424] hover:bg-[#1c1c30] text-slate-300 border border-white/10 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 font-mono"
                >
                  <History className="w-3.5 h-3.5 text-[#a3e635]" />
                  <span>Order History</span>
                </button>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="w-full bg-[#141424] hover:bg-[#1c1c30] text-slate-300 border border-white/10 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 font-mono"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#bef264]" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: LIVE TELEMETRY & DOORSTEP INSPECTION SIMULATOR */}
        {/* ========================================================================= */}
        {viewMode === 'telemetry' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
                  <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
                    LIVE NIGHT COMMERCE TELEMETRY
                  </span>
                </div>
                <button
                  onClick={() => setViewMode('placed')}
                  className="text-xs font-mono text-slate-400 hover:text-white underline"
                >
                  View Summary
                </button>
              </div>
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                Order #{orderNum}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                {activeOrder.sector || 'Greater Noida Pilot Zone'} • Doorstep Open-Box Active
              </p>
            </div>

            {/* Dynamic Stage Content */}
            <div className="py-2 space-y-6">
              
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

              {/* STAGE 5: RETURNED */}
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
          </div>
        )}

        {/* Footer info */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>“Whatever you need after 9.”</span>
          <span className="text-[#a3e635]">AFTER 9 GREATER NOIDA</span>
        </div>

      </div>
    </div>
  );
};
