import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, Clock, ShoppingBag, RotateCcw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const OrderHistoryModal = () => {
  const { isOrdersModalOpen, setIsOrdersModalOpen } = useAuth();
  const { pastOrders, reorderItems } = useCart();

  if (!isOrdersModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOrdersModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
              NOCTURNAL ORDER LEDGER
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#a3e635]" />
            Midnight Orders ({pastOrders.length})
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Past midnight deliveries, open-box verification receipts & re-orders
          </p>
        </div>

        {/* Orders List */}
        <div className="py-4 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {pastOrders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">🌙</span>
              <p className="text-sm font-bold text-slate-300 font-display">No Midnight Orders Yet</p>
              <p className="text-xs text-slate-500 font-mono">Your late night cravings history will appear here.</p>
            </div>
          ) : (
            pastOrders.map((order) => {
              const isReturned = order.status?.includes('Returned');
              return (
                <div
                  key={order.id || order.orderId}
                  className="p-5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-3 hover:border-white/20 transition-all"
                >
                  {/* Order Header Row */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm text-white">
                          #{order.id || order.orderId}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isReturned
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-[#a3e635]/15 text-[#bef264] border border-[#a3e635]/30'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {order.date} • {order.sector || 'Greater Noida'}
                      </p>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-sm font-black text-white">₹{order.total}</span>
                      <p className="text-[10px] text-slate-500">{order.paymentMethod || 'UPI'}</p>
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div className="space-y-1.5 font-mono text-xs text-slate-300">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span>{item.qty || item.quantity}x {item.name || item.title}</span>
                        <span className="text-slate-400">₹{(item.price || 0) * (item.qty || item.quantity || 1)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Open-Box Status Receipt */}
                  <div className="p-2.5 rounded-xl bg-[#090a12] border border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
                      {order.openBoxStatus || 'Doorstep Open-Box Verified'}
                    </span>
                    {order.refundAmount && (
                      <span className="text-emerald-400 font-bold">
                        Refunded ₹{order.refundAmount}
                      </span>
                    )}
                  </div>

                  {/* Re-order Button */}
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => {
                        reorderItems(order);
                        setIsOrdersModalOpen(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#a3e635]/10 hover:bg-[#a3e635] text-[#bef264] hover:text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all border border-[#a3e635]/30"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Re-order to Midnight Bag</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 text-center text-[11px] font-mono text-slate-500">
          Greater Noida Central Dark Store • Pari Chowk Live Telemetry
        </div>

      </div>
    </div>
  );
};
