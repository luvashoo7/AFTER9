import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, CheckCircle2, RotateCcw, Zap, HelpCircle } from 'lucide-react';

export const RefundsModal = () => {
  const { isRefundsModalOpen, setIsRefundsModalOpen, setIsHelpModalOpen } = useAuth();
  const { refunds } = useCart();

  if (!isRefundsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsRefundsModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              INSTANT 90-SEC UPI REVERSAL
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Doorstep Refunds ({refunds.length})
          </h3>
          <p className="text-xs font-mono text-slate-400">
            100% Zero-Blind Open-Box inspection refunds credited immediately to your bank
          </p>
        </div>

        {/* Refunds List */}
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {refunds.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">🛡️</span>
              <p className="text-sm font-bold text-slate-300 font-display">No Refund Logs</p>
              <p className="text-xs text-slate-500 font-mono">
                When you return any item during doorstep check, instant reversals will appear here.
              </p>
            </div>
          ) : (
            refunds.map((ref) => (
              <div
                key={ref.id}
                className="p-5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-3 hover:border-white/20 transition-all"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-sm text-white">
                        {ref.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> CREDITED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Order #{ref.orderId} • {ref.timestamp}
                    </p>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-base font-black text-emerald-400">₹{ref.amount}</span>
                    <p className="text-[10px] text-slate-500">Instant UPI</p>
                  </div>
                </div>

                {/* Items & Reason */}
                <div className="space-y-1 text-xs font-mono">
                  <div className="text-slate-200">
                    <strong>Item:</strong> {ref.item}
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Reason:</strong> {ref.reason}
                  </p>
                  {ref.returnDeliveryChargeDeducted > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#141424] border border-white/5 text-[10.5px] text-slate-300 space-y-0.5">
                      <div className="flex justify-between text-slate-400">
                        <span>Product Subtotal Refunded:</span>
                        <span className="text-white">₹{ref.amount} (100%)</span>
                      </div>
                      <div className="flex justify-between text-rose-300">
                        <span>Rider Midnight Trip Compensation:</span>
                        <span>-₹{ref.returnDeliveryChargeDeducted}</span>
                      </div>
                      <p className="text-[9.5px] text-slate-500 pt-0.5 italic">
                        *Covers electric rider transit fee for dispatched midnight round-trip.
                      </p>
                    </div>
                  )}
                </div>

                {/* UTR reference */}
                <div className="p-2 rounded-xl bg-[#090a12] border border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>UTR / REF: <strong className="text-slate-200">{ref.utrNumber}</strong></span>
                  <span className="text-emerald-400 font-bold">{ref.status}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Need Help CTA */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Queries about your refund?</span>
          <button
            onClick={() => {
              setIsRefundsModalOpen(false);
              setIsHelpModalOpen(true);
            }}
            className="text-[#a3e635] hover:underline font-bold"
          >
            Contact Night Support →
          </button>
        </div>

      </div>
    </div>
  );
};
